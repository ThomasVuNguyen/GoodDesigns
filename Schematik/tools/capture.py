#!/usr/bin/env python3
"""Rebuild this folder's dist/ from one page of https://www.schematik.io.

schematik.io is a server-rendered Next.js (App Router, webpack) site. The script keeps the server HTML with its flight
data, the original stylesheets and fonts, the webpack runtime with every chunk it can load, and every image, video and
3D model the page or its code references. The page's own React code then hydrates and runs from local files.

What it changes:
- next/image is switched to unoptimized, so images load from their original files instead of /_next/image.
- Links to other routes point at the live site, so Next.js does not prefetch routes the capture does not have.
- usePathname() is pinned to the live route, because the capture is served from / or from the gallery's /sites/<slug>/.
- PostHog is never initialised, and shim.js answers the logged-out auth calls locally and blocks other hosts.
- The hero's 3D board model, hosted on Vercel Blob, is saved under models/.

Run from anywhere: python3 <Folder>/tools/capture.py   (CAPTURE_CACHE=<dir> reuses downloads between runs)
"""
import hashlib, json, os, re, shutil, time, urllib.parse, urllib.request

BASE = 'https://www.schematik.io'
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
PAGE = open(os.path.join(ROOT, 'tools', 'page.txt')).read().strip()  # '/' or '/ssk1'
OUT = os.path.join(ROOT, 'dist')
CACHE = os.environ.get('CAPTURE_CACHE')
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0 Safari/537.36'}
BLOB = 'https://tfvg9prl3arlawj9.public.blob.vercel-storage.com/'
manifest = {}


def get(url):
    f = CACHE and os.path.join(CACHE, hashlib.sha1(url.encode()).hexdigest())
    if f and os.path.exists(f):
        return open(f, 'rb').read()
    for attempt in range(4):
        try:
            data = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=120).read()
            break
        except Exception:
            if attempt == 3:
                raise
            time.sleep(3)
    if f:
        os.makedirs(CACHE, exist_ok=True)
        open(f, 'wb').write(data)
    return data


def save(path, data, source):
    p = os.path.join(OUT, path.lstrip('/'))
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'wb').write(data)
    manifest[path] = source


# /_next/image?url=%2Fx.webp&w=384&q=75&dpl=... -> /x.webp
IMG = re.compile(r'/_next/image\?url=([^&"\'\s\\]+)(?:&amp;|&|\\u0026)w=\d+(?:&amp;|&|\\u0026)q=\d+(?:(?:&amp;|&|\\u0026)dpl=\w+)?')
DPL = re.compile(r'\?dpl=dpl_\w+')


def unopt(text):
    return DPL.sub('', IMG.sub(lambda m: urllib.parse.unquote(m.group(1)), text))


# Other routes open on the live site; assets (anything with a file extension) and in-page anchors stay local.
ROUTE = r'/(?!_next/)(?![^"\\?#]*\.[a-z0-9]{2,12}(?:[?#"\\]|$))[^"\\]*'


def model_path(url):
    return '/models/' + urllib.parse.unquote(url.rsplit('/', 1)[1]).replace(' ', '-')


def patch_js(text):
    text = unopt(text)
    text = text.replace('dangerouslyAllowSVG:!1,unoptimized:!1}', 'dangerouslyAllowSVG:!1,unoptimized:!0}')
    # Served from / or /sites/<slug>/; the layout chooses its chrome from the pathname, so report the live route.
    text = re.sub(r'function (\w+)\(\)\{return (\w+)\?\.\("usePathname\(\)"\),\(0,(\w+)\.useContext\)\((\w+)\.PathnameContext\)\}',
                  lambda m: f'function {m.group(1)}(){{return{json.dumps(PAGE)}}}', text)
    # No analytics: PostHog's init returns early without a key.
    text = re.sub(r'let (\w+)="phc_\w+";function', r'let \1="";function', text)
    for url in set(re.findall(re.escape(BLOB) + r'[^"\'`\s]+', text)):
        text = text.replace(url, model_path(url))
    # The starter-kit banner and page switch from "pre-launch" to "live" at a launch date; keep the captured phase.
    text = re.sub(r'\?\?\(\w+>=\w+\?"live":"pre-launch"\)', '??"pre-launch"', text)
    text = re.sub(r'(\w)="/ssk1",(\w)="ssk1_phase"', r'\1="https://www.schematik.io/ssk1",\2="ssk1_phase"', text)
    # Hard-coded route links in client components (header, footer, cards) open on the live site.
    text = re.sub(r'(\bhref:")(' + ROUTE + ')"', lambda m: m.group(1) + BASE + m.group(2) + '"', text)
    return text


ASSET = r'(?:css|js|woff2?|otf|ttf|png|jpe?g|webp|svg|avif|gif|ico|mp4|webm|json|webmanifest|glb|gltf|stl|wasm|riv|lottie)'
PATHS = re.compile(r'''["'`(=]((?:/_next/static/[^"'`\s\\?#]+?\.(?:js|css|woff2?|ttf|otf|png|svg|jpe?g|webp|avif|gif))|(?:/(?!/)[A-Za-z0-9_./%@-]+\.ASSET))(?=[?"'`\s\\)#])'''.replace('ASSET', ASSET))
seen = set()
# Assets the page requests at runtime (recorded from the live page at four viewports with a full scroll). Chunks are
# shared by every route, so a media path that appears only inside JavaScript is saved only when this list has it.
EXTRA = set(l.strip() for l in open(os.path.join(ROOT, 'tools', 'extra-assets.txt')) if l.strip())


def crawl(p, from_js=False):
    p = urllib.parse.unquote(p.split('?')[0].split('#')[0])
    if p in seen or p.startswith('//') or not p.startswith('/'):
        return
    if from_js and not p.startswith('/_next/') and p not in EXTRA:
        return
    seen.add(p)
    try:
        data = get(BASE + urllib.parse.quote(p))
    except Exception as e:
        print('skip', p, e)
        return
    if p.endswith(('.js', '.css')):
        text = data.decode('utf8', 'ignore')
        if p.endswith('.css'):
            for m in set(re.findall(r'url\((?:"|\')?(\.\./[^)"\'?#]+)', text)):
                crawl(os.path.normpath(os.path.join(os.path.dirname(p), m)))
        for m in set(PATHS.findall(text)):
            crawl(m, p.endswith('.js'))
        for m in set(re.findall(r'''["'`](static/(?:chunks|media|css)/[^"'`\s\\)?]+\.(?:js|css|woff2?|png|svg))''', text)):
            crawl('/_next/' + m)
        if p.endswith('.js'):
            for url in set(re.findall(re.escape(BLOB) + r'[^"\'`\s]+', text)):
                if model_path(url) in EXTRA:
                    save(model_path(url), get(url), url)
            text = patch_js(text)
        else:
            text = unopt(text)
        data = text.encode()
    save(p, data, BASE + p)


def all_chunks(js):
    """Every async chunk the webpack runtime can request: explicit names plus the id -> name/hash maps."""
    body = re.search(r'\.u=e=>(.*?),\w\.miniCssF', js, re.S).group(1)
    files = re.findall(r'"(static/chunks/[^"]+\.js)"', body)
    maps = re.findall(r'\(\{([^}]*)\}\)\[e\]', body)
    names = dict(re.findall(r'(\d+):"([^"]+)"', maps[0])) if len(maps) > 1 else {}
    hashes = dict(re.findall(r'(\d+):"([^"]+)"', maps[-1]))
    files += [f'static/chunks/{names.get(k, k)}.{h}.js' for k, h in hashes.items()]
    css = re.search(r'miniCssF=e=>"(static/css/[^"]+\.css)"', js)
    return ['/_next/' + f for f in files] + (['/_next/' + css.group(1)] if css else [])


def absolutize_links(text):
    text = re.sub(r'(<a\b[^>]*?\bhref=")(' + ROUTE + ')"', lambda m: m.group(1) + BASE + m.group(2) + '"', text)
    text = re.sub(r'(\\"href\\":\\")(' + ROUTE + r')\\"', lambda m: m.group(1) + BASE + m.group(2) + '\\"', text)
    return text


def main():
    if os.path.isdir(OUT):
        shutil.rmtree(OUT)
    html = get(BASE + PAGE).decode()
    html = absolutize_links(unopt(html))
    for m in set(PATHS.findall(html)):
        crawl(m)
    for f in ('/favicon.ico', '/favicon.svg', '/site.webmanifest', '/apple-touch-icon.png'):
        crawl(f)
    webpack = next(p for p in manifest if '/chunks/webpack-' in p)
    for p in all_chunks(open(os.path.join(OUT, webpack.lstrip('/'))).read()):
        crawl(p)
    for p in sorted(EXTRA):
        if not p.startswith('/models/'):
            crawl(p)
    # Images inside a webmanifest
    for p in [p for p in manifest if p.endswith('.webmanifest')]:
        for src in re.findall(r'"src"\s*:\s*"(/[^"]+)"', open(os.path.join(OUT, p.lstrip('/'))).read()):
            crawl(src)

    shim = os.path.join(ROOT, 'tools', 'shim.js')
    save('/shim.js', open(shim, 'rb').read(), 'local')
    html = html.replace('<head>', '<head><script src="/shim.js"></script>', 1)
    save('/index.html', html.encode(), BASE + PAGE)
    with open(os.path.join(ROOT, 'assets-manifest.json'), 'w') as f:
        json.dump(dict(sorted(manifest.items())), f, indent=1)
    print(len(manifest), 'files saved to', OUT)


if __name__ == '__main__':
    main()
