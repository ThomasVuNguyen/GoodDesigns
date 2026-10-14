#!/usr/bin/env python3
"""Rebuild TheOdin/dist from the live https://the-odin.com/ store.

Inputs: tools/pages.txt (routes to capture) and .cache/snapshot/*.json from snapshot.cjs (runtime assets,
app-injected stylesheets, rendered Judge.me widgets, recorded section responses).
Output: dist/<route>/index.html for every route, mirrored assets under dist/cdn/, recorded responses under
dist/odin-local/replay/, product JSON under dist/odin-local/data/, and assets-manifest.json.
"""
import concurrent.futures as cf
import glob
import hashlib
import html as htmllib
import json
import os
import re
import shutil
import sys
import urllib.error
import urllib.parse
import urllib.request

ORIGIN = 'https://the-odin.com'
ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
DIST = os.path.join(ROOT, 'dist')
CACHE = os.path.join(ROOT, '.cache')
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36'
MAX_WIDTH = 2560
MAX_DOWNLOAD = 12 * 1024 * 1024
RASTER = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'}
CT_EXT = {'image/webp': '.webp', 'image/png': '.png', 'image/jpeg': '.jpg', 'image/gif': '.gif', 'image/avif': '.avif'}
MIRROR_HOSTS = ('the-odin.com', 'www.the-odin.com', 'cdn.shopify.com', 'fonts.googleapis.com', 'fonts.gstatic.com')
SHOP_FILES = '/s/files/1/0755/8345/5367/files/'

PAGES = [l.strip() for l in open(os.path.join(ROOT, 'tools', 'pages.txt')) if l.strip()]
LOCAL_ROUTES = {urllib.parse.urlsplit(p).path.rstrip('/') or '/' for p in PAGES if '?' not in p}

manifest = {}   # local path -> source url
url_map = {}    # absolute source url -> local path (or None when unavailable)


def page_key(p):
    return 'home' if p == '/' else p.lstrip('/').replace('/', '__').replace('?', '__').replace('=', '__').replace('&', '__')


def page_out(p):
    """Local file for a captured route; /blogs/blog?page=2 becomes /blogs/blog/page-2/."""
    u = urllib.parse.urlsplit(p)
    route = u.path.rstrip('/')
    q = urllib.parse.parse_qs(u.query)
    if 'page' in q:
        route += '/page-' + q['page'][0]
    return route + '/' if route else '/'


def fetch(url, accept='*/*'):
    req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept': accept})
    with urllib.request.urlopen(req, timeout=90) as r:
        return r.read(), r.headers.get('Content-Type', '')


def cached(name, url, accept='*/*'):
    p = os.path.join(CACHE, 'http', hashlib.sha1((accept + url).encode()).hexdigest()[:20])
    if os.path.exists(p):
        meta = json.load(open(p + '.json'))
        return open(p, 'rb').read(), meta['ct']
    os.makedirs(os.path.dirname(p), exist_ok=True)
    body, ct = fetch(url, accept)
    open(p, 'wb').write(body)
    json.dump({'url': url, 'ct': ct}, open(p + '.json', 'w'))
    return body, ct


# ---------------------------------------------------------------- URL normalisation

def absolute(raw, base=ORIGIN + '/'):
    u = htmllib.unescape(raw.replace('\\/', '/').replace('\\u0026', '&'))
    if u.startswith('//'):
        u = 'https:' + u
    elif not u.startswith('http'):
        u = urllib.parse.urljoin(base, u)
    return u.replace('http://', 'https://', 1).replace('://www.the-odin.com', '://the-odin.com', 1)


def canonical(url):
    """Collapse equivalent CDN spellings and cap oversized image widths."""
    s = urllib.parse.urlsplit(url)
    path = s.path
    if s.netloc == 'cdn.shopify.com' and path.startswith(SHOP_FILES):
        return canonical(ORIGIN + '/cdn/shop/files/' + path[len(SHOP_FILES):] + ('?' + s.query if s.query else ''))
    q = [(k, v) for k, v in urllib.parse.parse_qsl(s.query) if k not in ('v',)]
    ext = os.path.splitext(path)[1].lower()
    if s.netloc == 'the-odin.com' and path.startswith('/cdn/shop/'):
        if ext not in RASTER:
            q = []  # svg/pdf ignore Shopify's image transform params
        elif not any(k == 'width' for k, _ in q):
            q.append(('width', '1920'))  # originals are multi-megabyte PNGs
    out = []
    for k, v in q:
        if k == 'width' and v.isdigit() and int(v) > MAX_WIDTH:
            v = str(MAX_WIDTH)
        out.append((k, v))
    query = urllib.parse.urlencode(sorted(out))
    return urllib.parse.urlunsplit(('https', s.netloc, path, query, ''))


def is_shop_image(url):
    s = urllib.parse.urlsplit(url)
    return s.netloc == 'the-odin.com' and s.path.startswith('/cdn/shop/') and os.path.splitext(s.path)[1].lower() in RASTER


def planned_local(url, content_type=''):
    s = urllib.parse.urlsplit(url)
    q = dict(urllib.parse.parse_qsl(s.query))
    stem, ext = os.path.splitext(s.path)
    if s.netloc == 'the-odin.com':
        base = stem
    else:
        base = '/cdn/ext/' + s.netloc + stem
    if is_shop_image(url):
        suffix = ''.join(f'_{k[0]}{v}' for k, v in sorted(q.items()) if k in ('width', 'height', 'crop', 'pad_color'))
        new_ext = CT_EXT.get(content_type.split(';')[0].strip(), ext.lower())
        if new_ext != ext.lower():
            suffix = '-' + ext.lstrip('.').lower() + suffix
        return base + suffix + new_ext
    if s.query:
        base += '-' + hashlib.sha1(s.query.encode()).hexdigest()[:8]
    if not ext:
        ext = '.css' if 'css' in content_type else '.js' if 'javascript' in content_type else ''
    return base + ext


# ---------------------------------------------------------------- discovery and rewriting

HOSTS = r'(?:www\.)?(?:the-odin\.com|cdn\.shopify\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)'
URLCH = r'(?:\\/|\\u0026|[^\s"\'<>()\\,`])'
ABS_RE = re.compile(r'(?:https?:)?(?:\\/|/){2}' + HOSTS + r'(?:\\/|/)' + URLCH + '*')
REL_RE = re.compile(r'(?<=[\s"\'(=,])((?:\\/|/)cdn(?:\\/|/)(?:shop|shopifycloud|fonts)(?:\\/|/)' + URLCH + '*)')


def wanted(url):
    s = urllib.parse.urlsplit(url)
    if s.netloc not in MIRROR_HOSTS:
        return False
    if s.path.lower().endswith('.pdf'):
        return False  # protocol PDFs (10-17 MB each) stay linked to the store
    if s.netloc == 'the-odin.com':
        return s.path.startswith('/cdn/') and not re.search(r'/cdn/(wpm|s/trekkie|shopifycloud/(checkout-web|storefront/assets/storefront|shop-js|portable-wallets/latest/(?!accelerated-checkout-backwards-compat)))', s.path)
    if s.netloc == 'cdn.shopify.com':
        return not re.search(r'/(shopifycloud/(storefront|shop-js|arrive-server|checkout-web)|storefront/web-components/account)', s.path)
    return True


def strip_trailing(raw):
    # srcset/style tails such as "&amp;width=832" are part of the url; trailing ";" or "&quot" is not
    return re.sub(r'(&quot;?|&#39;?|;)+$', '', raw)


def discover(text, base=ORIGIN + '/'):
    found = set()
    for m in ABS_RE.finditer(text):
        found.add(canonical(absolute(strip_trailing(m.group(0)), base)))
    for m in REL_RE.finditer(text):
        found.add(canonical(absolute(strip_trailing(m.group(1)), base)))
    if base.endswith('.css'):
        for m in re.finditer(r'url\(\s*["\']?([^"\')]+)["\']?\s*\)', text):
            if not m.group(1).startswith(('data:', '#')):
                found.add(canonical(absolute(m.group(1), base)))
        for m in re.finditer(r'@import\s+["\']([^"\']+)["\']', text):
            found.add(canonical(absolute(m.group(1), base)))
    return {u for u in found if wanted(u)}


def rewrite(text, base=ORIGIN + '/'):
    def sub(raw):
        tail = raw[len(strip_trailing(raw)):]
        u = canonical(absolute(strip_trailing(raw), base))
        local = url_map.get(u)
        if local and is_shop_image(u) and '?' in raw:
            local += '?v=1'  # theme JS appends "&width=…" to image URLs; keep a query for it to extend
        return (local + tail) if local else raw

    text = ABS_RE.sub(lambda m: sub(m.group(0)), text)
    text = REL_RE.sub(lambda m: sub(m.group(1)), text)
    if base.endswith('.css'):
        def cssurl(m):
            raw = m.group(2)
            if raw.startswith(('data:', '#', '/cdn/')):
                return m.group(0)
            local = url_map.get(canonical(absolute(raw, base)))
            return f'url({m.group(1)}{local}{m.group(1)})' if local else m.group(0)
        text = re.sub(r'url\(\s*(["\']?)([^"\')]+)\1\s*\)', cssurl, text)
    return text


def download(url):
    try:
        accept = 'image/webp,image/svg+xml,image/*;q=0.8,*/*;q=0.5' if is_shop_image(url) else '*/*'
        body, ct = cached(url, url, accept)
    except urllib.error.HTTPError as e:
        print('  !', e.code, url, file=sys.stderr)
        return url, None, None
    except Exception as e:  # noqa: BLE001 - report and continue
        print('  !', type(e).__name__, url, file=sys.stderr)
        return url, None, None
    if len(body) > MAX_DOWNLOAD:
        print('  ! too large, linking to source', len(body), url, file=sys.stderr)
        return url, None, None
    return url, body, ct


def mirror(urls):
    """Download every url (and everything their CSS/JS references) into dist/."""
    pending = {u for u in urls if u not in url_map}
    texts = []
    while pending:
        with cf.ThreadPoolExecutor(16) as pool:
            results = list(pool.map(download, sorted(pending)))
        pending = set()
        for url, body, ct in results:
            if body is None:
                url_map[url] = None
                continue
            local = planned_local(url, ct)
            url_map[url] = local
            manifest[local] = url
            out = os.path.join(DIST, local.lstrip('/'))
            os.makedirs(os.path.dirname(out), exist_ok=True)
            open(out, 'wb').write(body)
            if local.endswith(('.css', '.js')):
                texts.append((out, url))
                text = body.decode('utf-8', 'replace')
                pending |= {u for u in discover(text, url) if u not in url_map}
    for out, url in texts:
        text = open(out, encoding='utf-8', errors='replace').read()
        open(out, 'w').write(rewrite(text, url))


# ---------------------------------------------------------------- HTML cleanup

DROP_SCRIPT_SRC = re.compile(r'trekkie|shop\.app|checkouts/internal|origin_trials|load_feature|shopify_pay|chimpstatic|judge|jdgm|shop-js|webmcp|web-pixels|wpm|web-components/account|page-view-event|perf-kit|portable-wallets|importmap-polyfill|es-modules-shim|privacy-banner|hcaptcha', re.I)
DROP_INLINE = re.compile(r'ShopifyAnalytics|trekkie|webPixelsManager|web-pixels|monorail|jdgm|judgeme|shopify-features|__st\s*=|Shopify\.PaymentButton|chimpstatic|webmcp|performance\.mark\(.shopify|BOOMR|window\.ShopifyPay|shopifyPayLogin|sendBeacon|consentManagement|privacyBanner|customerPrivacy|_shopify_essential|shop-js|SignInWithShop|captcha|featureAssets|loadFeatures', re.I)


def clean_html(html, snap):
    # Scripts: keep the theme runtime, drop analytics, checkout, account and third-party widgets.
    def script(m):
        tag, body = m.group(1), m.group(2)
        src = re.search(r'\ssrc=["\']([^"\']*)["\']', tag)
        typ = re.search(r'\stype="([^"]*)"', tag)
        if src:
            return '' if DROP_SCRIPT_SRC.search(src.group(1)) else m.group(0)
        if typ and typ.group(1) in ('application/ld+json', 'speculationrules'):
            return '' if typ.group(1) == 'speculationrules' else m.group(0)
        if typ and typ.group(1) == 'application/json':
            return '' if re.search(r'id="(shop-js-analytics|apple-pay-shop-capabilities|shopify-features|shopify-customer-account-data)"', tag) else m.group(0)
        if 'Shopify.routes.root' in body:  # store globals the theme reads; keep minus the Shop sign-in lines
            kept = '\n'.join(l for l in body.split('\n') if not re.search(r'shopJsCdnBaseUrl|SignInWithShop', l))
            return tag + kept + '</script>'
        return '' if DROP_INLINE.search(body) else m.group(0)
    html = re.sub(r'(<script\b[^>]*>)(.*?)</script>', script, html, flags=re.S)
    html = re.sub(r'<link[^>]+rel="?(?:preconnect|dns-prefetch|prefetch|ucp)"?[^>]*>\s*', '', html)
    html = re.sub(r'<link[^>]+href="[^"]*(?:shop\.app|judge\.me|jdgm|portable-wallets/latest/(?!accelerated))[^"]*"[^>]*>\s*', '', html)
    html = re.sub(r'\s+integrity="[^"]*"', '', html)
    html = re.sub(r'<shopify-accelerated-checkout[^>]*>.*?</shopify-accelerated-checkout>', '', html, flags=re.S)
    html = re.sub(r'<shopify-accelerated-checkout-cart[^>]*>.*?</shopify-accelerated-checkout-cart>', '', html, flags=re.S)
    html = re.sub(r'<div id="shopify-block-[^"]*mailchimp[^"]*".*?</div>\s*', '', html, flags=re.S | re.I)

    # Judge.me renders its review widget with Vue; freeze the rendered result instead of running it.
    for bid, outer in (snap.get('islands') or {}).items():
        start = html.find(f'id="{bid}"')
        if start < 0:
            continue
        open_at = html.rfind('<', 0, start)
        end = matching_close(html, open_at)
        if end > 0:
            mobile = (snap.get('islands_m') or {}).get(bid)
            frozen = strip_vue(outer)
            if mobile and strip_vue(mobile) != frozen:
                # Judge.me lays out (and clamps) differently on phones; ship both renders, CSS picks one.
                mobile = strip_vue(mobile).replace(f'id="{bid}"', f'id="{bid}-m"', 1)
                frozen = f'<div class="odin-island odin-island--desktop">{frozen}</div><div class="odin-island odin-island--mobile">{mobile}</div>'
            html = html[:open_at] + frozen + html[end:]

    # Stylesheets the apps add at runtime (Judge.me widget CSS, its star font, product navigation).
    extra = []
    for node in snap.get('head') or []:
        href = re.search(r'href="([^"]+)"', node)
        if href and ('shop.app' in href.group(1) or 'portable-wallets' in href.group(1)):
            continue
        if href and htmllib.unescape(href.group(1)).split('?')[0].replace('https:', '') in html.replace('https:', ''):
            continue
        if not href:
            body = re.sub(r'^<style[^>]*>|</style>$', '', node, flags=re.S)
            if body.strip() == '' or body[:400] in html or 'GTStandard' in body:
                continue
        extra.append(node)
    if extra:
        html = html.replace('</head>', '\n<!-- app stylesheets captured from the rendered page -->\n' + '\n'.join(extra) + '\n</head>', 1)
    return html


def matching_close(html, open_at):
    """Index just past the element that starts at open_at (div/section nesting aware)."""
    tag = re.match(r'<([a-zA-Z0-9-]+)', html[open_at:]).group(1)
    depth, i = 0, open_at
    pat = re.compile(rf'<(/?){tag}\b[^>]*>', re.I)
    for m in pat.finditer(html, open_at):
        depth += -1 if m.group(1) else 1
        if depth == 0:
            return m.end()
    return -1


def strip_vue(outer):
    # keep data-v-* attributes: Judge.me's Vue stylesheets are scoped to them
    return re.sub(r'<script\b.*?</script>', '', outer, flags=re.S)


# ---------------------------------------------------------------- links

LIVE_ONLY = re.compile(r'^/(account|customer_authentication|checkout|checkouts|policies|apps|services|tools|cart/(?!$))')


def rewrite_links(html):
    def href(m):
        attr, quote, raw = m.group(1), m.group(2), m.group(3)
        u = htmllib.unescape(raw)
        if u.startswith(('#', 'mailto:', 'tel:', 'javascript:', 'data:')):
            return m.group(0)
        s = urllib.parse.urlsplit(absolute(u) if u.startswith(('/', 'http')) and not u.startswith('/cdn/') else u)
        if s.netloc and s.netloc not in ('the-odin.com', 'www.the-odin.com'):
            return m.group(0)
        if not s.path.startswith('/') or s.path.startswith('/cdn/'):
            return m.group(0)
        path = re.sub(r'^/collections/[^/]+/products/', '/products/', s.path)
        q = urllib.parse.parse_qs(s.query)
        route = path.rstrip('/') or '/'
        if route == '/blogs/blog' and 'page' in q:
            local = page_out(f'/blogs/blog?page={q["page"][0]}')
        elif route in LOCAL_ROUTES and not LIVE_ONLY.search(path):
            local = path + ('?' + s.query if s.query else '')
        elif route.startswith('/search'):
            local = '/search' + ('?' + s.query if s.query else '')
        else:
            local = ORIGIN + path + ('?' + s.query if s.query else '')
        if s.fragment:
            local += '#' + s.fragment
        return f'{attr}={quote}{htmllib.escape(local, quote=False)}{quote}'
    html = re.sub(r'\b(href|action)=(["\'])([^"\']*)\2', href, html)
    return html


# ---------------------------------------------------------------- main

def load_snapshot(p):
    data = {'assets': [], 'replays': [], 'head': [], 'islands': {}}
    for suffix in ('', '.m'):
        f = os.path.join(CACHE, 'snapshot', page_key(p) + suffix + '.json')
        if not os.path.exists(f):
            continue
        d = json.load(open(f))
        data['assets'] += d['assets']
        data['replays'] += d['replays']
        if not suffix:
            data['head'] = d['head']
            data['islands'] = d['islands']
        else:
            data['islands_m'] = d['islands']
    return data


SHIM = '<script src="/odin-local/shim.js"></script>\n<link rel="stylesheet" href="/odin-local/overrides.css">\n'


def main():
    os.makedirs(DIST, exist_ok=True)
    pages = {}
    all_urls = set()
    for p in PAGES:
        body, _ = cached('page', ORIGIN + p, 'text/html')
        snap = load_snapshot(p)
        html = clean_html(body.decode('utf-8'), snap)
        pages[p] = (html, snap)
        all_urls |= discover(html)
        all_urls |= {canonical(u) for u in snap['assets'] if wanted(canonical(u))}
        for r in snap['replays']:
            all_urls |= discover(r['body'])
    for f in glob.glob(os.path.join(CACHE, 'cart', '*.json')):
        all_urls |= discover(open(f).read().replace('\\"', '"'))
    print(len(all_urls), 'asset urls')
    mirror(all_urls)

    replay_index = {}
    shutil.rmtree(os.path.join(DIST, 'odin-local', 'replay'), ignore_errors=True)
    for p, (html, snap) in pages.items():
        html = rewrite(html)
        html = rewrite_links(html)
        html = re.sub(r'(<head[^>]*>)', r'\1\n' + SHIM, html, count=1)
        out = os.path.join(DIST, page_out(p).lstrip('/'), 'index.html')
        os.makedirs(os.path.dirname(out), exist_ok=True)
        open(out, 'w').write(html)
        for r in snap['replays']:
            store_replay(replay_index, r['url'], r['ct'], r['body'])

    extra = os.path.join(CACHE, 'recorded.json')
    if os.path.exists(extra):
        for r in json.load(open(extra)):
            store_replay(replay_index, r['url'], r['ct'], r['body'])
    json.dump(replay_index, open(os.path.join(DIST, 'odin-local', 'replay', 'index.json'), 'w'), indent=0, sort_keys=True)

    cart_dir = os.path.join(DIST, 'odin-local', 'cart')
    os.makedirs(cart_dir, exist_ok=True)
    for f in glob.glob(os.path.join(CACHE, 'cart', '*.json')):
        d = json.load(open(f))
        d['sections'] = {k: rewrite_links(rewrite(v)) for k, v in (d.get('sections') or {}).items()}
        d['items'] = json.loads(rewrite(json.dumps(d.get('items', []))))
        json.dump(d, open(os.path.join(cart_dir, os.path.basename(f)), 'w'))

    data_dir = os.path.join(DIST, 'odin-local', 'data', 'products')
    os.makedirs(data_dir, exist_ok=True)
    for p in PAGES:
        if p.startswith('/products/'):
            body, _ = cached('json', ORIGIN + p + '.js', 'application/json')
            open(os.path.join(data_dir, p.split('/')[-1] + '.json'), 'w').write(rewrite(body.decode()))

    json.dump(manifest, open(os.path.join(ROOT, 'assets-manifest.json'), 'w'), indent=1, sort_keys=True)
    missing = sorted(u for u, l in url_map.items() if l is None)
    print(len(manifest), 'assets mirrored;', len(missing), 'unavailable;', len(replay_index), 'replays')


def replay_key(url):
    s = urllib.parse.urlsplit(url)
    path = re.sub(r'^/collections/[^/]+/products/', '/products/', s.path).rstrip('/') or '/'
    q = sorted((k, v) for k, v in urllib.parse.parse_qsl(s.query, keep_blank_values=True) if k not in ('_', 'v'))
    return path + ('?' + urllib.parse.urlencode(q) if q else '')


def store_replay(index, url, ct, body):
    k = replay_key(url)
    if '?' not in k:
        return  # plain page loads are served by the static pages
    if 'html' in ct:
        body = rewrite_links(rewrite(body))
        # search-result links carry per-request tracking params; dropping them lets identical results dedupe
        body = re.sub(r'\?_pos=[^"&\s]*((?:&amp;|&)_[a-z]+=[^"&\s]*)*', '', body)
        body = re.sub(r'(?:&amp;|&)_(?:pos|sid|ss|psq|fid|v)=[^"&\s]*', '', body)
        s = urllib.parse.urlsplit(url)
        q = dict(urllib.parse.parse_qsl(s.query)).get('q')
        if s.path.startswith('/search') and q and not q.startswith('id:'):
            # the shim puts the typed query back where the recorded term was echoed
            qu, qh = urllib.parse.quote_plus(q), htmllib.escape(q)
            for a, b in ((f'q={qu}&', 'q=__ODIN_QU__&'), (f'q={qu}"', 'q=__ODIN_QU__"'), (f'value="{qh}"', 'value="__ODIN_QH__"'),
                         (f'\u201c{qh}\u201d', '\u201c__ODIN_QH__\u201d'), (f'&ldquo;{qh}&rdquo;', '&ldquo;__ODIN_QH__&rdquo;')):
                body = body.replace(a, b)
    else:
        body = rewrite(body)
    name = hashlib.sha1(body.encode()).hexdigest()[:16] + ('.json' if 'json' in ct else '.html')
    out = os.path.join(DIST, 'odin-local', 'replay', name)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, 'w').write(body)
    index[k] = {'file': name, 'ct': ct.split(';')[0]}


if __name__ == '__main__':
    main()
