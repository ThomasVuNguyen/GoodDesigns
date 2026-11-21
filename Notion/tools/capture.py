#!/usr/bin/env python3
"""Rebuild Notion/dist/ from https://www.notion.com/ and every English page on it.

notion.com is a Next.js Pages Router site built with Turbopack. Each page is server-rendered (getServerSideProps): the
HTML carries the markup and its props in __NEXT_DATA__, and the client chunks hydrate it. The capture keeps all of it
and runs the original code from local files.

What it saves:
- every English page: the URLs in notion.com's sitemaps (root, blog, customers, help, md, releases, use-case, feature)
  plus every internal link found on them, each as dist/<route>/index.html. Not captured: the template marketplace
  (/templates/<slug>, 17,000 pages), the 21 translated sites, and the app (/login, /signup, @creator profiles).
- every client chunk the build manifest and the chunks name, the CSS, and the fonts under /front-static/
- the images and videos the pages show:
  - Contentful (images.ctfassets.net, videos.ctfassets.net) under /_ctf/<asset id>/. JPEGs and PNGs are saved as
    the WebP rendition Contentful serves the live pages, at the widest width any page asks for (capped at 2048 px)
  - Notion's S3 bucket, notion.so and app.notion.com icons, and YouTube thumbnails, under /_ext/<host>/
  - /front-static/ images that went through the /_next/image optimizer, as the optimizer's rendition at their path

What it changes:
- next/image is switched to unoptimized: the /_next/image optimizer does not exist on a static host.
- Links to captured routes stay local. Links to anything else (the app, templates, other languages) open the live site.
- Network calls after load go through shim.js: /front-api answers come from recordings (tools/api/), analytics and
  every other host are blocked, and the router's /_next/data requests fail, so in-site navigation is a full page load.

Run: python3 Notion/tools/capture.py   (CAPTURE_CACHE=<dir> reuses downloads between runs)
     python3 Notion/tools/capture.py /a-new-shape-for-work   adds or refreshes those routes in the existing dist/
"""
import concurrent.futures, hashlib, html, json, os, re, shutil, subprocess, sys, urllib.parse

BASE = 'https://www.notion.com'
HOST = 'www.notion.com'
TOOLS = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(TOOLS)
OUT = os.path.join(ROOT, 'dist')
CACHE = os.environ.get('CAPTURE_CACHE')
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0 Safari/537.36'
SITEMAPS = ['sitemap-root', 'blog/sitemap', 'customers/sitemap', 'help/sitemap', 'md/sitemap', 'releases/sitemap',
            'use-case/sitemap', 'feature/sitemap']
LOCALES = set('ar da de en-gb en-us es es-es fi fr he id it ja ko nb nl pt sv th vi zh-cn zh-tw'.split())
MAX_W = 2048
manifest, missing = {}, []
seen_assets = set()


def fetch(url, headers=None):
    """(status, final URL, content type, body), with curl; cached under CAPTURE_CACHE."""
    key = url + (json.dumps(headers, sort_keys=True) if headers else '')
    f = CACHE and os.path.join(CACHE, hashlib.sha1(key.encode()).hexdigest())
    if f and os.path.exists(f + '.meta'):
        m = json.load(open(f + '.meta'))
        return m['code'], m['url'], m['ct'], open(f, 'rb').read() if os.path.exists(f) else b''
    tmp = f or os.path.join(OUT, '.tmp-' + hashlib.sha1(key.encode()).hexdigest())
    os.makedirs(os.path.dirname(tmp), exist_ok=True)
    hdr = [a for k, v in (headers or {}).items() for a in ('-H', f'{k}: {v}')]
    # Contentful file names can hold non-ASCII characters ("Notion’s timeline view.png"); send them percent-encoded.
    wire = urllib.parse.quote(url, safe=":/?&=%#~@!$'()*+,;[]")
    r = subprocess.run(['curl', '-gsSL', '--retry', '3', '--max-time', '300', '-A', UA, *hdr, '-o', tmp,
                        '-w', '%{http_code} %{url_effective} %{content_type}', wire], capture_output=True, text=True)
    code, eff, ct = (r.stdout.split(' ', 2) + ['', ''])[:3]
    body = open(tmp, 'rb').read() if os.path.exists(tmp) else b''
    if f and code and code != '000':  # a failed transfer is retried next run
        json.dump({'code': int(code or 0), 'url': eff, 'ct': ct}, open(f + '.meta', 'w'))
    elif not f and os.path.exists(tmp):
        os.remove(tmp)
    return int(code or 0), eff, ct, body


def save(path, data, source):
    path = urllib.parse.unquote(path)
    p = os.path.join(OUT, path.lstrip('/'))
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'wb').write(data if isinstance(data, bytes) else data.encode())
    manifest[path] = source


def pool_map(fn, items, n=16):
    with concurrent.futures.ThreadPoolExecutor(n) as pool:
        return list(pool.map(fn, items))


# ---------------------------------------------------------------------------------------------------------------------
# 1. Pages

def page_path(path):
    """The route for a link path that names a page (captured or not), or None for files and server routes."""
    path = urllib.parse.unquote(path.split('#')[0].split('?')[0]).rstrip('/') or '/'
    if re.search(r'\.[A-Za-z0-9]{2,8}$', path) or ':' in path or '{' in path:
        return None
    if re.match(r'/(_next|_ctf|_ext|api|front-api|front-static|api-snapshots|_vercel|cdn-cgi)(/|$)', path):
        return None
    return path


def capturable(route):
    first = route.split('/')[1].lower()
    return not (first in LOCALES or re.match(r'/(invite|embed|login|signup|logout)(/|$)', route)
                or route.startswith('/@') or re.match(r'/templates/.+', route))


# Pages notion.com answers 404 for, read from the Internet Archive's copy of the original server-rendered HTML (the id_
# form serves the bytes as captured). Each copy names the chunks of the build it came from.
ARCHIVED = {
    # "A new shape for work", a field guide. It went up on 2026-11-21 and answered 404 that afternoon, while the root
    # sitemap still listed it and the build (c8cf2d22…) still shipped its code. This copy is from that build.
    '/a-new-shape-for-work': 'https://web.archive.org/web/20261121085323id_/https://www.notion.com/a-new-shape-for-work',
}


def fetch_page(route):
    code, eff, ct, body = fetch(BASE + urllib.parse.quote(route))
    if code == 404 and route in ARCHIVED:
        code, _, ct, body = fetch(ARCHIVED[route])
        eff = BASE + route
    return code, eff, ct, body


def discover():
    todo = set(ARCHIVED)
    for s in SITEMAPS:
        _, _, _, body = fetch(f'{BASE}/{s}.xml')
        todo |= {page_path(urllib.parse.urlsplit(u).path or '/') for u in re.findall(r'<loc>([^<]+)</loc>', body.decode())}
    todo = {r for r in todo if r and capturable(r)}
    seen, pages, skipped = set(), {}, {}
    while todo:
        batch, todo = sorted(todo - seen), set()
        seen.update(batch)
        for route, (code, eff, ct, body) in zip(batch, pool_map(fetch_page, batch, 12)):
            u = urllib.parse.urlsplit(eff)
            # Redirects (/calendar -> /product/calendar) are not pages of their own; the target is captured on its own.
            if code != 200 or 'html' not in ct or u.netloc != HOST or (u.path.rstrip('/') or '/') != route:
                skipped[route] = f'{code} {eff}'
                if code == 200 and u.netloc == HOST:
                    REDIRECTS[route] = u.path.rstrip('/') or '/'
                continue
            text = body.decode('utf8')
            pages[route] = text
            # Articles link to each other with absolute URLs too (https://www.notion.com/help/custom-agents).
            todo |= {r for r in map(page_path, re.findall(r'href="(?:https://www\.notion\.com)?(/[^"#?]*)', text))
                     if r and r not in seen and capturable(r)}
    return pages, skipped


# ---------------------------------------------------------------------------------------------------------------------
# 2. Media

CTF = re.compile(r'(?:https:)?//(images|videos)\.ctfassets\.net/([\w-]+)/([\w.-]+)/([\w-]+)/([^"\'\s\\)<>?&,]+)'
                 r'((?:\?|\\u0026|&amp;|&)(?:(?:w|h|q|fm|fit|f)=\w+(?:&amp;|&|\\u0026)?)+)?')
EXT_HOSTS = r'(?:s3[.-]us-west-2\.amazonaws\.com/public\.notion-static\.com|www\.notion\.so|app\.notion\.com|dev\.notion\.so|library\.notion\.com|img\.youtube\.com)'
EXT = re.compile(r'https://' + EXT_HOSTS + r'/[^"\'\s\\)<>?]+\.(?:png|jpe?g|webp|gif|svg|mp4|webm|avif)')
NEXT_IMAGE = re.compile(r'/_next/image\?url=((?:[^&"\'\s\\]|&#x27;|&#39;)+)((?:(?:&amp;|&|\\u0026)(?:w|q|dpl)=\w+)+)')
ctf, ext_media, optimized = {}, {}, {}
EXTRA_FILES = {'/icons/headset_gray.svg': 'https://app.notion.com/icons/headset_gray.svg'}
videos = []
CONTENT = {'help', 'blog', 'releases', 'customers'}


def ctf_key(m):
    return f'https://{m.group(1)}.ctfassets.net/{m.group(2)}/{m.group(3)}/{m.group(4)}/{m.group(5)}'


def collect_media(text, section='code'):
    for m in CTF.finditer(text):
        r = ctf.setdefault(ctf_key(m), {'w': 0, 'q': 0, 'kind': m.group(1), 'id': m.group(3), 'name': urllib.parse.unquote(m.group(5)), 'sections': set()})
        r['sections'].add(section)
        q = dict(re.findall(r'(w|q)=(\d+)', m.group(6) or ''))
        r['w'] = max(r['w'], min(int(q.get('w', MAX_W)), MAX_W))
        r['q'] = max(r['q'], int(q.get('q', 0)))
    for u in EXT.findall(text):
        ext_media.setdefault(html.unescape(u), None)
    for m in NEXT_IMAGE.finditer(text):
        src = urllib.parse.unquote(html.unescape(m.group(1)))
        # Remote images sent through the optimizer: the client's loader returns their src, so they are saved as files.
        if CTF.fullmatch(src) or EXT.fullmatch(src):
            collect_media(src, section)
            continue
        if src.startswith('https://'):  # Vimeo posters and other remote files named without an extension
            ext_media.setdefault(src, None)
            continue
        q = dict(re.findall(r'(w|q)=(\d+)', m.group(2)))
        r = optimized.setdefault(src, {'w': 0, 'q': q.get('q', '75')})
        r['w'] = max(r['w'], min(int(q.get('w', MAX_W)), MAX_W))


def fetch_media():
    def one_ctf(item):
        url, r = item
        stem, ext = os.path.splitext(r['name'])
        if r['kind'] == 'images' and ext.lower() in ('.jpg', '.jpeg', '.png'):
            # The rendition the live pages load (fm=webp), at the widest width any page uses.
            src = f"{url}?w={r['w'] or MAX_W}&q={r['q'] or 75}&fm=webp"
            local = f"/_ctf/{r['id']}/{stem}.webp"
        else:
            src, local = url, f"/_ctf/{r['id']}/{r['name']}"
        return url, src, local, fetch(src)

    for url, src, local, (code, _, ct, body) in pool_map(one_ctf, sorted(ctf.items())):
        if code != 200:
            missing.append(f'{code} {src}')
            continue
        if not os.path.splitext(local)[1]:  # some Contentful files have no extension ("google-drive-icon-19632")
            local += {'image/png': '.png', 'image/jpeg': '.jpg', 'image/webp': '.webp', 'image/gif': '.gif',
                      'image/svg+xml': '.svg', 'image/avif': '.avif', 'video/mp4': '.mp4'}.get(ct.split(';')[0].strip(), '')
        # The GIFs in release notes and blog posts (270 MB) are saved as animated WebP when that is smaller.
        if local.lower().endswith('.gif'):
            webp = to_webp(body, 'gif')
            if webp:
                local, body, src = local[:-4] + '.webp', webp, src + ' (converted: animated WebP, lossy q70)'
        ctf[url]['local'] = local
        save(local, body, src)
        if local.endswith(('.mp4', '.webm', '.mov')):
            videos.append((local, ctf[url]['sections']))
    # The product pages' videos keep their quality. The ~1,000 clips inside help articles, blog posts, release notes
    # and customer stories (1.3 GB as served) are re-encoded smaller; they play in a column at most ~900 px wide.
    # Encodes run after all files are saved, so they never race the saves.
    def shrink(item):
        local, sections = item
        size = os.path.getsize(os.path.join(OUT, local.lstrip('/')))
        if sections <= CONTENT and size > 300_000:
            shrink_video(local, 1280, 28)
        elif size > 25_000_000:
            shrink_video(local, 1920, 24)
    pool_map(shrink, videos, 6)

    def local_ext(url, ct):
        u = urllib.parse.urlsplit(url)
        ext = os.path.splitext(u.path)[1].lower()
        if not re.fullmatch(r'\.(png|jpe?g|webp|gif|svg|mp4|webm|avif)', ext):
            ext = {'image/png': '.png', 'image/jpeg': '.jpg', 'image/webp': '.webp', 'image/gif': '.gif',
                   'image/svg+xml': '.svg', 'image/avif': '.avif'}.get(ct.split(';')[0].strip(), '.jpg')
        return f'/_ext/{u.netloc}/{hashlib.sha1(url.encode()).hexdigest()[:16]}{ext}'
    urls = sorted(ext_media)
    def one_ext(url):
        code, _, ct, body = fetch(url)
        local, note = local_ext(url, ct), ''
        # Template previews and creator photos on S3 are full-size PNGs (up to 6 MB): large ones are saved as WebP.
        if code == 200 and local.endswith(('.png', '.jpg', '.jpeg')) and len(body) > 150_000:
            webp = to_webp(body, 'image')
            if webp:
                local, body, note = os.path.splitext(local)[0] + '.webp', webp, ' (converted: WebP q80, at most 1600 px wide)'
        return url, code, local, body, note
    for url, code, local, body, note in pool_map(one_ext, urls, 8):
        if code != 200:
            missing.append(f'{code} {url}')
            continue
        ext_media[url] = local
        save(local, body, url + note)

    def one_opt(item):
        src, r = item
        url = f"{BASE}/_next/image?url={urllib.parse.quote(src, safe='')}&w={r['w']}&q={r['q']}"
        return src, url, fetch(url, {'Accept': 'image/avif;q=0,image/webp,image/*'})
    for src, url, (code, _, ct, body) in pool_map(one_opt, sorted(optimized.items())):
        if code != 200 or not src.startswith('/'):
            # Remote sources go through the media maps above; a failed rendition falls back to the original file.
            optimized[src]['local'] = None
            continue
        optimized[src]['local'] = src
        save(src, body, url)
        seen_assets.add(src)


def to_webp(body, kind):
    """Smaller WebP for a GIF (animated, lossy q70) or a large PNG/JPEG (q80, at most 1600 px wide), or None when the
    WebP is not smaller. Cached under CAPTURE_CACHE."""
    key = hashlib.sha1(body + kind.encode()).hexdigest()
    out = os.path.join(CACHE or OUT, 'webp-' + key + '.webp')
    if not os.path.exists(out):
        src = out + ('.gif' if kind == 'gif' else '.img')
        open(src, 'wb').write(body)
        cmd = (['gif2webp', '-lossy', '-q', '70', '-m', '4', '-mt', src, '-o', out] if kind == 'gif' else
               ['cwebp', '-q', '80', '-m', '4', '-mt', src, '-o', out])
        if kind != 'gif':
            w = subprocess.run(['sips', '-g', 'pixelWidth', src], capture_output=True, text=True).stdout.split()
            if w and w[-1].isdigit() and int(w[-1]) > 1600:
                cmd[1:1] = ['-resize', '1600', '0']
        r = subprocess.run(cmd, capture_output=True)
        os.remove(src)
        if r.returncode != 0 or not os.path.exists(out):
            open(out, 'wb').close()
    data = open(out, 'rb').read()
    return data if 0 < len(data) < len(body) * 0.9 else None


def shrink_video(local, width, crf):
    """Re-encode a video to at most `width` px wide, H.264 at `crf`, faststart. Kept only when smaller.
    Encodes are cached under CAPTURE_CACHE by source file."""
    p = os.path.join(OUT, local.lstrip('/'))
    src = open(p, 'rb').read()
    key = CACHE and os.path.join(CACHE, 'enc-' + hashlib.sha1(src + f'{width}/{crf}'.encode()).hexdigest() + '.mp4')
    if not (key and os.path.exists(key)):
        tmp = (key or p) + '.tmp.mp4'
        r = subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', p, '-vf', f"scale='min({width},iw)':-2", '-c:v', 'libx264',
                            '-crf', str(crf), '-preset', 'medium', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '96k',
                            '-movflags', '+faststart', tmp])
        if r.returncode != 0:
            os.path.exists(tmp) and os.remove(tmp)
            return
        if not key:
            key = tmp
        else:
            os.replace(tmp, key)
    if os.path.getsize(key) < len(src):
        shutil.copy(key, p)
        manifest[local] += f' (re-encoded: max {width} px wide, H.264 CRF {crf})'


def localize(text):
    def ctf_repl(m):
        r = ctf.get(ctf_key(m))
        return r['local'] if r and r.get('local') else m.group(0)
    text = CTF.sub(ctf_repl, text)

    def ext_repl(m):
        return ext_media.get(html.unescape(m.group(0))) or m.group(0)
    text = EXT.sub(ext_repl, text)
    plain = None
    for url, local in ext_media.items():
        if local and not EXT.fullmatch(url):
            plain = plain if plain is not None else text.replace('\\u0026', '&').replace('&amp;', '&')
            if url in plain:
                for form in (url, url.replace('&', '\\u0026'), html.escape(url, quote=False)):
                    text = text.replace(form, local)

    def opt_repl(m):
        src = urllib.parse.unquote(html.unescape(m.group(1)))
        if src in optimized and optimized[src].get('local'):
            return optimized[src]['local']
        c = CTF.match(src)
        if c and ctf.get(ctf_key(c), {}).get('local'):
            return ctf[ctf_key(c)]['local']
        return ext_media.get(src) or m.group(0)
    text = NEXT_IMAGE.sub(opt_repl, text)
    # Absolute links to the site's own files (og images, /front-static/ icons in props).
    return re.sub(r'https://www\.notion\.com(/(?:front-static|_next)/)', r'\1', text)


# ---------------------------------------------------------------------------------------------------------------------
# 3. Links

REDIRECTS = {}  # route -> where notion.com redirects it (/integrations -> /connections)


def links(text, routes):
    """Keep links to captured routes; send links to other pages (the app, templates, translations) to the live site.
    A link to a route that redirects to a captured page points at that page."""
    def repl(m):
        path = m.group(2)
        r = page_path(path)
        if r is None or r in routes:
            return m.group(0)
        if REDIRECTS.get(r) in routes:
            return m.group(1) + REDIRECTS[r] + path[len(r.rstrip('/')):] if path.startswith(r) else m.group(1) + REDIRECTS[r]
        return m.group(1) + BASE + path
    # Absolute links to captured pages (articles link to each other with full URLs) become local.
    def local(m):
        r = page_path(m.group(2))
        return m.group(1) + m.group(2) if r is not None and (r in routes or REDIRECTS.get(r) in routes) else m.group(0)
    text = re.sub(r'(href="|"(?:href|url|uri|link|ctaUrl|ctaLink|buttonUrl)":")https://www\.notion\.com(/[^"\\]*)(?=")', local, text)
    text = re.sub(r'(href=")(/[^"]*)(?=")', repl, text)
    # Props (__NEXT_DATA__ and flight-style JSON) and JS literals.
    text = re.sub(r'("(?:href|url|uri|link|path|ctaUrl|ctaLink|buttonUrl)":")(/[^"\\]*)(?=")', repl, text)
    return re.sub(r'(\bhref:")(/[^"]*)(?=")', repl, text)


NEXT_LOADER = 'return`${e.path}?url=${encodeURIComponent(t)}&w=${r}&q=${a}${t.startsWith("/")&&s?`&dpl=${s}`:""}`'


def patch_js(text, routes):
    # next/image: the /_next/image optimizer does not exist on a static host, so its default loader returns the file
    # itself (saved as the optimizer's widest rendition at the same path). Switching to `unoptimized` instead would
    # drop the <source> elements of art-directed <picture>s and break hydration (React error #418).
    text = text.replace(NEXT_LOADER, 'return t')
    # Sentry stays off: with no DSN it sends nothing.
    text = re.sub(r'(dsn:)"https://[^"]*@[^"]*\.ingest\.sentry\.io/\d+"', r'\1""', text)
    return links(localize(text), routes)


# ---------------------------------------------------------------------------------------------------------------------
# 4. Code, styles and fonts

ASSET = r'(?i:css|js|mjs|woff2?|otf|ttf|png|jpe?g|webp|svg|avif|gif|ico|mp4|webm|mov|mp3|json|webmanifest|lottie|riv|pdf|txt|wasm)'
PATHS = re.compile(r'''(?<![\w.:/)\]])(/(?:_next|front-static|cdn-cgi/scripts)/[A-Za-z0-9_\-./%@()+~]+?\.''' + ASSET + r''')(?=[?"'`\s\\),#&]|$)''')
CHUNKS = re.compile(r'"(static/(?:chunks|media|css)/[^"]+\.' + ASSET + ')"')
SKIP = re.compile(r'^/_vercel/|/__front-admin|\.module\.scss\.d'
                  # The code names every language's copy of an illustration (fr-FR.gif, ko-KR.mp4); keep only en-US.
                  r'|^/front-static/.*[/_.-](?!en-US)[a-z]{2}-[A-Z]{2}[/_.]')


def crawl(paths, routes):
    queue = {p for p in paths if not SKIP.search(p)}
    while queue:
        batch = sorted(p for p in queue if p not in seen_assets)
        queue = set()
        seen_assets.update(batch)
        for p, (code, eff, ct, body) in zip(batch, pool_map(lambda p: fetch(BASE + urllib.parse.quote(p, safe='/@()+~[]')), batch)):
            if code != 200 or urllib.parse.urlsplit(eff).netloc != HOST or 'text/html' in ct:
                missing.append(f'{code} {p}')
                continue
            if p.endswith(('.js', '.css', '.mjs')):
                text = body.decode('utf8', 'ignore')
                found = set(PATHS.findall(text)) | {'/_next/' + c for c in CHUNKS.findall(text)}
                if p.endswith('.css'):
                    found |= {os.path.normpath(os.path.join(os.path.dirname(p), u))
                              for u in re.findall(r'url\((?:"|\')?(\.\.?/[^)"\'?#]+)', text)}
                    found |= set(re.findall(r'url\((?:"|\')?(/(?:_next|front-static)/[^)"\'?#]+)', text))
                queue |= {f for f in (urllib.parse.unquote(x.split('?')[0]) for x in found) if not SKIP.search(f)} - seen_assets
                if p.endswith(('.js', '.mjs')):
                    collect_media(text)
                    text = patch_js(text, routes)
                else:
                    text = localize(text)
                body = text.encode()
            save(p, body, BASE + p)


# ---------------------------------------------------------------------------------------------------------------------

def main():
    if os.path.exists(OUT):
        shutil.rmtree(OUT)
    pages, skipped = discover()
    routes = set(pages)
    print(len(pages), 'pages;', len(skipped), 'links not captured (redirects, app routes, 404s)')
    for route, page in pages.items():
        collect_media(page, route.split('/')[1] or 'home')
    # The answers pages ask for after load, recorded on the capture date (tools/api/; shim.js serves them):
    # /front-api/... and the app's template search, whose results carry images of their own.
    api_dir = os.path.join(TOOLS, 'api')
    snapshots = {os.path.relpath(os.path.join(d, n), api_dir): open(os.path.join(d, n), encoding='utf8').read()
                 for d, _, files in os.walk(api_dir) for n in files}
    for body in snapshots.values():
        collect_media(body, 'templates')

    asset_paths = set()
    build_ids = set()
    for page in pages.values():
        asset_paths |= {urllib.parse.unquote(p.split('?')[0]) for p in PATHS.findall(page)}
        build_ids |= set(re.findall(r'/_next/static/([0-9a-f]{40})/_buildManifest\.js', page))
    for b in build_ids:
        asset_paths |= {f'/_next/static/{b}/_buildManifest.js', f'/_next/static/{b}/_ssgManifest.js'}

    # Code first: the chunks name media of their own (the hero illustrations, the footer art).
    crawl(asset_paths, routes)
    if not any(NEXT_LOADER in fetch(BASE + p)[3].decode('utf8', 'ignore') for p in manifest if p.endswith('.js')):
        raise SystemExit('next/image default loader not found (Next.js changed it; update NEXT_LOADER)')
    fetch_media()
    print(len(ctf), 'Contentful files,', len(ext_media), 'files from other hosts,', len(optimized), 'optimizer images')
    # The chunks were saved before the media maps were complete; localize them again.
    for p in [p for p in manifest if p.endswith(('.js', '.mjs'))]:
        f = os.path.join(OUT, p.lstrip('/'))
        before = open(f, encoding='utf8').read()
        after = patch_js(before, routes)
        if after != before:
            open(f, 'w', encoding='utf8').write(after)

    for route, page in sorted(pages.items()):
        save_page(route, page, routes)

    for rel, body in sorted(snapshots.items()):
        source = ('https://app.notion.com/api/v3/' + rel[len('app-api/'):] if rel.startswith('app-api/') else BASE + '/front-api/' + rel)
        save('/api-snapshots/' + rel, links(localize(body), routes), source.rsplit('.', 1)[0])
    shutil.copy(os.path.join(TOOLS, 'shim.js'), os.path.join(OUT, 'shim.js'))
    # Root-relative files the live site redirects to the app (one custom agent template's headset icon).
    for path, url in EXTRA_FILES.items():
        code, _, _, body = fetch(url)
        save(path, body, url) if code == 200 else missing.append(f'{code} {url}')

    report([OUT])


def save_page(route, page, routes):
    page = links(localize(page), routes)
    # Third-party script preloads (Vercel Insights, Transcend consent, Google sign-in) would still fetch them.
    page = re.sub(r'<link rel="preload" href="(?:https?://|/_vercel/)[^"]+" as="script"[^>]*/>', '', page)
    page = re.sub(r'<link rel="(?:preconnect|dns-prefetch)" href="https?://[^"]+"[^>]*/>', '', page)
    # The help center's survey embed (/embed/help/sprig-survey) is not part of the site.
    page = re.sub(r'(<iframe\b[^>]*\ssrc=")/embed/[^"]*', r'\1about:blank', page)
    page = page.replace('<head>', '<head><script src="/shim.js"></script>', 1)
    save('/index.html' if route == '/' else route + '/index.html', page, BASE + route)


def report(dirs):
    # Anything left pointing at Contentful or the S3 bucket is a file the capture missed.
    left = {}
    for top in dirs:
        for d, _, fs in os.walk(top):
            for f in fs:
                if f.endswith(('.html', '.js', '.css')):
                    for u in set(re.findall(r'(?:images|videos)\.ctfassets\.net/[^"\'\s\\)]{0,80}|public\.notion-static\.com/[^"\'\s\\)]{0,60}',
                                            open(os.path.join(d, f), encoding='utf8', errors='ignore').read())):
                        left.setdefault(u, os.path.relpath(os.path.join(d, f), OUT))
    json.dump(dict(sorted(manifest.items())), open(os.path.join(ROOT, 'assets-manifest.json'), 'w'), indent=1)
    if left:
        print('remote media still referenced:', len(left), *sorted(f'{v}: {k}' for k, v in left.items())[:30], sep='\n  ')
    if missing:
        print('not saved:', len(missing), *sorted(missing)[:60], sep='\n  ')
    print(len(manifest), 'files in', OUT)


def add(only):
    """Add or refresh the given routes in the existing dist/ without crawling the rest of the site. Code and media
    already saved are kept; the pages' links to other captured routes stay local."""
    manifest.update(json.load(open(os.path.join(ROOT, 'assets-manifest.json'))))
    seen_assets.update(manifest)
    routes = {p[:-len('/index.html')] or '/' for p in manifest if p.endswith('/index.html')}
    pages = {}
    for route in only:
        code, eff, ct, body = fetch_page(route)
        if code != 200 or 'html' not in ct:
            raise SystemExit(f'{route}: {code} {eff}')
        pages[route] = body.decode('utf8')
    routes |= set(pages)
    asset_paths = set()
    for route, page in pages.items():
        collect_media(page, route.split('/')[1] or 'home')
        asset_paths |= {urllib.parse.unquote(p.split('?')[0]) for p in PATHS.findall(page)}
    before = set(manifest)
    crawl(asset_paths, routes)
    fetch_media()
    print(len(ctf), 'Contentful files,', len(ext_media), 'files from other hosts,', len(optimized), 'optimizer images')
    for p in [p for p in set(manifest) - before if p.endswith(('.js', '.mjs'))]:
        f = os.path.join(OUT, p.lstrip('/'))
        open(f, 'w', encoding='utf8').write(patch_js(open(f, encoding='utf8').read(), routes))
    for route, page in sorted(pages.items()):
        save_page(route, page, routes)
    report([os.path.join(OUT, r.lstrip('/')) for r in pages])


if __name__ == '__main__':
    add(sys.argv[1:]) if sys.argv[1:] else main()
