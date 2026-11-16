#!/usr/bin/env python3
"""Rebuild Granola/dist/ from https://www.granola.ai/ and all of its pages.

granola.ai is a Next.js App Router site (webpack build). Every page is server-rendered: the HTML holds the markup and
the React Server Components flight data (self.__next_f), and the client chunks hydrate it. The script keeps all of it:

- every page: the sitemap's URLs plus every internal link found on those pages (job posts, /contact/sales, ...),
  each saved as dist/<route>/index.html
- the webpack runtime and every chunk it can load (read from its chunk map, so lazy chunks are included), the CSS
  and the Next-hosted fonts
- the public files the pages and chunks name (/homepageAssets/, /blogImages/, /team/, videos, logos, ...)
- the files the pages request at runtime that no source names directly (tools/extra-assets.txt)

What it changes:
- next/image is switched to unoptimized, so images load from their original files instead of the /_next/image
  optimizer, which a static host does not have. Remote images that went through the optimizer (pbs.twimg.com avatars,
  absolute www.granola.ai URLs) are saved under /_ext/<host>/.
- Links to captured routes stay local. Links to anything else (the app, docs, other hosts' pages) open the live site.
- Analytics never load: shim.js blocks scripts from other hosts and the site's own analytics routes (Vercel Insights,
  the Dub proxy, AppsFlyer, /api/monitoring) and drops beacons.
- Client-side navigation falls back to full page loads: shim.js answers the router's RSC requests with a non-RSC
  response, which makes Next.js load the target page's HTML.

Run from anywhere: python3 Granola/tools/capture.py   (CAPTURE_CACHE=<dir> reuses downloads between runs)
"""
import concurrent.futures, hashlib, html, json, os, re, shutil, subprocess, urllib.parse

BASE = 'https://www.granola.ai'
TOOLS = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(TOOLS)
OUT = os.path.join(ROOT, 'dist')
CACHE = os.environ.get('CAPTURE_CACHE')
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0 Safari/537.36'
manifest = {}
seen_assets, missing = set(), []


def fetch(url, headers=None):
    """(status, final URL, content type, body), with curl; cached under CAPTURE_CACHE."""
    key = url + (json.dumps(headers, sort_keys=True) if headers else '')
    f = CACHE and os.path.join(CACHE, hashlib.sha1(key.encode()).hexdigest())
    if f and os.path.exists(f + '.meta'):
        m = json.load(open(f + '.meta'))
        return m['code'], m['url'], m['ct'], open(f, 'rb').read() if os.path.exists(f) else b''
    tmp = (f or os.path.join(OUT, '.tmp-' + hashlib.sha1(url.encode()).hexdigest()))
    os.makedirs(os.path.dirname(tmp), exist_ok=True)
    hdr = [a for k, v in (headers or {}).items() for a in ('-H', f'{k}: {v}')]
    r = subprocess.run(['curl', '-gsSL', '--retry', '3', '--max-time', '300', '-A', UA, *hdr, '-o', tmp,
                        '-w', '%{http_code} %{url_effective} %{content_type}', url], capture_output=True, text=True)
    code, eff, ct = (r.stdout.split(' ', 2) + ['', ''])[:3]
    body = open(tmp, 'rb').read() if os.path.exists(tmp) else b''
    if f and code and code != '000':  # a failed transfer is retried next run
        json.dump({'code': int(code or 0), 'url': eff, 'ct': ct}, open(f + '.meta', 'w'))
    else:
        os.path.exists(tmp) and os.remove(tmp)
    return int(code or 0), eff, ct, body


def save(path, data, source):
    p = os.path.join(OUT, urllib.parse.unquote(path).lstrip('/'))
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'wb').write(data if isinstance(data, bytes) else data.encode())
    manifest[urllib.parse.unquote(path)] = source


# ---------------------------------------------------------------------------------------------------------------------
# 1. Pages

LINK = re.compile(r'(?:href="|\\"href\\":\\"|href:")(/[^"\\#?]*)')


def route_of(path):
    """A page route for a link path, or None for assets and server routes."""
    path = path.rstrip('/') or '/'
    if re.search(r'\.[A-Za-z0-9]{2,12}$', path) or re.match(r'/(_next|api|_vercel|_proxy|cdn-cgi)(/|$)', path):
        return None
    return path


def discover():
    _, _, _, sitemap = fetch(BASE + '/sitemap.xml')
    todo = {'/'} | {route_of(urllib.parse.urlsplit(u).path or '/') for u in re.findall(r'<loc>([^<]+)</loc>', sitemap.decode())}
    todo.discard(None)
    seen, pages, skipped = set(), {}, {}
    while todo:
        batch, todo = sorted(todo - seen), set()
        seen.update(batch)
        with concurrent.futures.ThreadPoolExecutor(12) as pool:
            for route, (code, eff, ct, body) in zip(batch, pool.map(lambda r: fetch(BASE + r), batch)):
                if code != 200 or 'html' not in ct or urllib.parse.urlsplit(eff).netloc != 'www.granola.ai':
                    skipped[route] = f'{code} {eff}'
                    continue
                html = body.decode('utf8')
                pages[route] = html
                todo |= {r for r in map(route_of, LINK.findall(html)) if r and r not in seen}
    return pages, skipped


# ---------------------------------------------------------------------------------------------------------------------
# 2. Rewrites

IMAGE = re.compile(r'/_next/image\?url=((?:[^&"\'\s\\]|&#x27;|&#39;)+)((?:(?:&amp;|&|\\u0026)(?:w|q|dpl)=\w+)+)')
EXT_DIR = '/_ext/'
MAX_W = 2048
renditions = {}  # image source -> {'w': widest use (capped), 'q': quality, 'local': local path}


def collect_images(html):
    """Note every image a page sends through the /_next/image optimizer, with the widest width it asks for."""
    for m in IMAGE.finditer(html):
        src = image_src(m.group(1))
        params = dict(re.findall(r'(w|q)=(\d+)', m.group(2)))
        r = renditions.setdefault(src, {'w': 0, 'q': params.get('q', '75')})
        r['w'] = max(r['w'], min(int(params.get('w', MAX_W)), MAX_W))


def fetch_renditions():
    """Save each image as the optimizer's rendition at its widest use: the files are the size the live pages load.
    Remote sources (Airtable attachments, X avatars) are signed or expiring URLs, and some originals run to 40 MB."""
    def one(item):
        src, r = item
        url = f"{BASE}/_next/image?url={urllib.parse.quote(src, safe='')}&w={r['w']}&q={r['q']}"
        return src, url, fetch(url, {'Accept': 'image/avif;q=0,image/webp,image/*'})
    with concurrent.futures.ThreadPoolExecutor(12) as pool:
        for src, url, (code, _, ct, body) in pool.map(one, sorted(renditions.items())):
            if code != 200:
                missing.append(f'{code} {url}')
                renditions[src]['local'] = src if src.startswith('/') else None
                continue
            if src.startswith(BASE + '/') and '?' not in src:
                local = src[len(BASE):]
            elif src.startswith('/') and '?' not in src:
                local = src
            else:
                ext = {'image/webp': '.webp', 'image/png': '.png', 'image/jpeg': '.jpg', 'image/gif': '.gif',
                       'image/svg+xml': '.svg', 'image/avif': '.avif'}.get(ct.split(';')[0].strip(), '.webp')
                # Remote files, and generated images such as /api/og?title=...: a name per source URL.
                host = urllib.parse.urlsplit(src).netloc or urllib.parse.urlsplit(src).path.strip('/').replace('/', '-')
                local = EXT_DIR + host + '/' + hashlib.sha1(src.encode()).hexdigest()[:16] + ext
            renditions[src]['local'] = local
            save(local, body, url)
            seen_assets.add(urllib.parse.unquote(local))


def unoptimize(text):
    """/_next/image?url=... becomes the local file; remote image URLs elsewhere in the page (flight data) too."""
    def repl(m):
        src = image_src(m.group(1))
        return urllib.parse.quote(renditions[src]['local'] or src, safe='/@()+~[]%')
    text = IMAGE.sub(repl, text)
    for src, r in renditions.items():
        if r['local'] and (src.startswith('https://') or '?' in src):
            for form in (src, src.replace('&', '\\u0026'), html.escape(src)):
                text = text.replace(f'"{form}"', f'"{r["local"]}"').replace(f'\\"{form}\\"', f'\\"{r["local"]}\\"')
    return text


# Media the pages load straight from other hosts: Luma event covers and videos on Granola's S3 bucket. The embedded
# tweets keep their pbs.twimg.com media: react-tweet parses those URLs (new URL(media_url_https)) to build its own.
REMOTE_MEDIA = re.compile(r'https://(?:images\.lumacdn\.com|granola-marketing-assets\.s3\.us-east-1\.amazonaws\.com)/[^"\'\s\\)<>]+')
remote_media = {}


def fetch_remote_media(pages):
    urls = {html.unescape(u) for page in pages.values() for u in REMOTE_MEDIA.findall(page)}
    with concurrent.futures.ThreadPoolExecutor(8) as pool:
        for url, (code, _, ct, body) in zip(sorted(urls), pool.map(fetch, sorted(urls))):
            if code != 200:
                missing.append(f'{code} {url}')
                continue
            ext = os.path.splitext(urllib.parse.urlsplit(url).path)[1].lower()
            if ext not in ('.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.webm', '.mov', '.svg', '.avif'):
                ext = {'image/webp': '.webp', 'image/png': '.png', 'image/jpeg': '.jpg', 'image/gif': '.gif',
                       'image/avif': '.avif', 'video/mp4': '.mp4'}.get(ct.split(';')[0].strip(), '')
            local = EXT_DIR + urllib.parse.urlsplit(url).netloc + '/' + hashlib.sha1(url.encode()).hexdigest()[:16] + ext
            remote_media[url] = local
            save(local, body, url)
            if ext in ('.mp4', '.mov', '.webm') and len(body) > 25_000_000:
                shrink_video(local)


def shrink_video(local):
    """Re-encode a large video to at most 1920 px wide, H.264 CRF 24, AAC 128k, faststart (the update posts' 4K
    60 fps screen recordings run to 188 MB, over GitHub's 100 MB file limit; they play in a ~700 px column)."""
    p = os.path.join(OUT, local.lstrip('/'))
    tmp = p + '.tmp.mp4'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', p, '-vf', "scale='min(1920,iw)':-2", '-c:v', 'libx264',
                    '-crf', '24', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k',
                    '-movflags', '+faststart', tmp], check=True)
    os.replace(tmp, p)
    manifest[local] += ' (re-encoded: max 1920 px wide, H.264 CRF 24)'


def localize_media(text):
    for url, local in remote_media.items():
        for form in (url, html.escape(url, quote=False), url.replace('&', '\\u0026')):
            text = text.replace(form, local)
    return text


def image_src(value):
    return urllib.parse.unquote(html.unescape(value))


def links(text, routes):
    """Keep links to captured routes; send the rest to the live site."""
    def repl(m):
        path = m.group(2)
        r = route_of(urllib.parse.urlsplit(path).path)
        if r is None or r in routes:
            return m.group(0)
        return m.group(1) + BASE + path
    text = re.sub(r'(href=")(/[^"]*)(?=")', repl, text)
    text = re.sub(r'(\\"href\\":\\")(/[^"\\]*)(?=\\")', repl, text)
    return re.sub(r'(\bhref:")(/[^"]*)(?=")', repl, text)


# granola.ai's clone canaries. A component in the root layout runs, on any HTTPS host other than granola.ai, an IIFE that
# loads api.granola.ai/v1/static-assets/payments.js?l=<page URL>&r=<referrer>&h=<host>&p=<path>. The global stylesheet
# has a background url(api.granola.ai/v1/static-assets/payments.gif?source=css-integrity...). Both are removed from the
# files; CANARY then checks that nothing of them is left anywhere in dist/.
CANARY_JS = re.compile(r'\(\(\)=>\{let \w+=window\.location\.hostname\.toLowerCase\(\).*?granolaCloneCanary="1".*?\}\)\(\)', re.S)
CANARY = re.compile(rb'granolaCloneCanary|clone-canary|api\.granola\.ai/v1/static-assets|css-integrity')


def patch_js(text, routes):
    text = CANARY_JS.sub('void 0', text)
    # Sentry stays off: with no DSN it sends nothing. (It fetches through a native fetch taken from a hidden iframe,
    # past shim.js, to the /api/monitoring tunnel.)
    text = re.sub(r'dsn:"https://[^"]*@[^"]*\.sentry\.io/\d+"', 'dsn:""', text)
    # Components render by usePathname() (the footer CTA's text differs on /, /mcp, /enterprise, ...). In the gallery the
    # build prefixes route literals such as "/mcp" with /sites/<slug>, matching the real path, but leaves "/" alone, so
    # the site root (/sites/<slug> or /sites/<slug>/) answers "/". Elsewhere usePathname() is unchanged.
    text = re.sub(r'(\w+\("usePathname\(\)"\),)(\(0,\w+\.useContext\)\(\w+\.PathnameContext\))\}',
                  r'\1(e=>"string"==typeof e&&/^\/sites\/[^/]+\/?$/.test(e)?"/":e)(\2)}', text)
    # next/image: load the original files; the /_next/image optimizer does not exist on a static host.
    text = text.replace('path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1',
                        'path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0')
    return links(text, routes)


# ---------------------------------------------------------------------------------------------------------------------
# 3. Assets

ASSET = r'(?i:css|js|mjs|woff2?|otf|ttf|png|jpe?g|webp|svg|avif|gif|ico|mp4|webm|mov|mp3|json|webmanifest|lottie|riv|pdf|txt)'
PATHS = re.compile(r'''(?<![\w.:/)\]])(/(?!/)[A-Za-z0-9_\-./%@()+~]+?\.''' + ASSET + r''')(?=[?"'`\s\\),#&]|$)''')


def chunk_map(text):
    """Every file webpack's runtime can load: its explicit chunk names, and names x hashes."""
    files = set(re.findall(r'"(static/chunks/[^"]+\.js)"', text))
    m = re.search(r'"static/chunks/"\+\(\(\{([^}]*)\}\)\[e\]\|\|e\)\+"\."\+\(\{([^}]*)\}\)\[e\]\+"\.js"', text)
    if m:
        names = dict(re.findall(r'(\d+):"([^"]+)"', m.group(1)))
        for cid, h in re.findall(r'(\d+):"([^"]+)"', m.group(2)):
            files.add(f'static/chunks/{names.get(cid, cid)}.{h}.js')
    for m in re.finditer(r'"static/css/"\+\(\{([^}]*)\}\)\[e\]\+"\.css"', text):
        files |= {f'static/css/{h}.css' for _, h in re.findall(r'(\d+):"([^"]+)"', m.group(1))}
    return {'/_next/' + f for f in files}


# Not saved: analytics scripts (Vercel Insights, the Dub proxy, AppsFlyer) and Vercel BotID's client (a UUID path).
SKIP = re.compile(r'^/(_vercel|_proxy)/|^/scripts/appsflyer|^/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/')


def crawl(paths, routes):
    queue = {p for p in paths if not SKIP.match(p)}
    while queue:
        batch = sorted(p for p in queue if p not in seen_assets)
        queue = set()
        seen_assets.update(batch)
        with concurrent.futures.ThreadPoolExecutor(16) as pool:
            results = list(pool.map(lambda p: (p, fetch(BASE + urllib.parse.quote(p, safe='/@()+~[]'))), batch))
        for p, (code, eff, ct, body) in results:
            if code != 200 or urllib.parse.urlsplit(eff).netloc != 'www.granola.ai' or 'text/html' in ct:
                missing.append(f'{code} {p}')
                continue
            if p.endswith(('.js', '.css', '.mjs')):
                text = body.decode('utf8', 'ignore')
                found = set(PATHS.findall(text))
                if p.endswith('.css'):
                    found |= {os.path.normpath(os.path.join(os.path.dirname(p), u))
                              for u in re.findall(r'url\((?:"|\')?(\.\.?/[^)"\'?#]+)', text)}
                if '/webpack-' in p:
                    found |= chunk_map(text)
                queue |= {p for p in (urllib.parse.unquote(f.split('?')[0]) for f in found) if not SKIP.match(p)} - seen_assets
                if p.endswith(('.js', '.mjs')):
                    text = patch_js(text, routes)
                else:
                    # The stylesheet's clone canary (see CANARY_JS).
                    text = re.sub(r'url\(https://api\.granola\.ai/[^)]*\)', 'none', text)
                body = text.encode()
            save(p, body, BASE + p)


# ---------------------------------------------------------------------------------------------------------------------

def main():
    if os.path.exists(OUT):
        shutil.rmtree(OUT)
    pages, skipped = discover()
    routes = set(pages)
    print(len(pages), 'pages;', 'not captured:', skipped)
    for page in pages.values():
        collect_images(page)
    fetch_renditions()
    print(len(renditions), 'images from the optimizer')
    fetch_remote_media(pages)
    print(len(remote_media), 'media files from other hosts')

    asset_paths = set()
    for route, page in sorted(pages.items()):
        page = links(localize_media(unoptimize(page)), routes)
        # Preload hints for third-party scripts (Plausible, Tally, iubenda) and AppsFlyer would still fetch them.
        page = re.sub(r'<link rel="preload" href="(?:https?://|/scripts/appsflyer)[^"]+" as="script"/>', '', page)
        asset_paths |= {urllib.parse.unquote(p.split('?')[0]) for p in PATHS.findall(page)}
        # Attribute paths may contain spaces ("/blogImages/brand-announcement/Instagram post - 43.png").
        asset_paths |= {urllib.parse.unquote(html.unescape(p)) for p in re.findall(r'(?:src|href|poster)="(/(?!/)[^"?#]+\.' + ASSET + r')"', page)}
        page = page.replace('<head>', '<head><script src="/shim.js"></script>', 1)
        save('/index.html' if route == '/' else route + '/index.html', page, BASE + route)

    extra = [l.strip() for l in open(os.path.join(TOOLS, 'extra-assets.txt')) if l.strip() and not l.startswith('#')]
    # API answers the pages fetch after load (shim.js serves them): /api/images lists the /jobs photo wall.
    for name in sorted(os.listdir(os.path.join(TOOLS, 'api'))):
        body = open(os.path.join(TOOLS, 'api', name)).read()
        save('/api-snapshots/' + name, body, BASE + '/api/' + name.rsplit('.', 1)[0])
        extra += [p for p in re.findall(r'"(/[^"]+\.' + ASSET + ')"', body)]
    crawl({p for p in asset_paths | set(extra) if not p.startswith(EXT_DIR)}, routes)

    shutil.copy(os.path.join(TOOLS, 'shim.js'), os.path.join(OUT, 'shim.js'))
    left = [os.path.relpath(os.path.join(d, f), OUT) for d, _, fs in os.walk(OUT) for f in fs
            if f.endswith(('.html', '.js', '.css')) and CANARY.search(open(os.path.join(d, f), 'rb').read())]
    if left:
        raise SystemExit('clone canary still present (granola.ai changed it; update CANARY_JS): ' + ', '.join(left))
    json.dump(dict(sorted(manifest.items())), open(os.path.join(ROOT, 'assets-manifest.json'), 'w'), indent=1)
    if missing:
        print('not saved:', len(missing), *sorted(missing)[:60], sep='\n  ')
    print(len(manifest), 'files saved to', OUT)


if __name__ == '__main__':
    main()
