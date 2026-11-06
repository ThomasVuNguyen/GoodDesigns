#!/usr/bin/env python3
"""Rebuild Dessn/dist from https://www.dessn.com/.

Saves the server-rendered TanStack Start page with its dehydrated router state, so the original React app
hydrates locally. Also saves every Vite chunk and stylesheet the app can reach, and every other file
(logos, fonts, images) the homepage uses. Media on files.dessn.ai is saved under dist/media/ and Google
Fonts under dist/fonts/google/. Analytics (GTM, PostHog, Cloudflare RUM, Vercel insights) is neutralised.

dessn.com redeploys often, and an old build's chunks 404 soon after. So all code is fetched in parallel right
after the HTML, and the capture starts over if any chunk is missing.

Run from anywhere: python3 Dessn/tools/capture.py
"""
import hashlib, json, os, re, shutil, sys, urllib.error, urllib.request
from concurrent.futures import ThreadPoolExecutor

BASE = 'https://www.dessn.com'
MEDIA = 'https://files.dessn.ai/media/'
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/130.0 Safari/537.36'}
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.abspath(os.path.join(HERE, '..', 'dist'))

EXT = r'(?:css|js|woff2?|otf|ttf|png|jpe?g|webp|svg|avif|gif|ico|mp4|webm|vtt|json)'
# root-absolute file paths such as "/assets/x.js", "/agent-logos/claude.svg", "/noyo.png"
ROOT_PATH = re.compile(r'''(?<=["'`(\s,])(/(?!/)[A-Za-z0-9_./-]+?\.%s)(?=[?"'`)\s#\\])''' % EXT)
MEDIA_URL = re.compile(re.escape(MEDIA) + r'([A-Za-z0-9_.-]+)')
SKIP = ('/_vercel', '/cdn-cgi', '/media/', '/fonts/google/', '/static/', '/v1/')


def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=120).read()


def scan(text):
    return [m.group(1) for m in ROOT_PATH.finditer(text)]


files = {}      # local path -> bytes
manifest = {}   # local path -> source URL
media = set()
gfonts = {}


def put(path, data, source):
    files[path] = data
    manifest[path] = source


def localise_gfonts(text):
    """Each fonts.googleapis.com stylesheet URL -> a local copy under /fonts/google/ with local woff2 files."""
    def css(m):
        url = m.group(0)
        if url not in gfonts:
            real = url.replace('&amp;', '&')
            body = get(real).decode()
            for f in sorted(set(re.findall(r'https://fonts\.gstatic\.com/[^)]+', body))):
                name = '/fonts/google/%s.woff2' % hashlib.sha1(f.encode()).hexdigest()[:16]
                put(name, get(f), f)
                body = body.replace(f, name)
            local = '/fonts/google/fonts-%d.css' % len(gfonts)
            put(local, body.encode(), real)
            gfonts[url] = local
        return gfonts[url]
    return re.sub(r'https://fonts\.googleapis\.com/css2\?[^"\')\s]+', css, text)


def rewrite_code(text):
    media.update(MEDIA_URL.findall(text))
    text = text.replace(MEDIA, '/media/').replace('"https://files.dessn.ai/media"', '"/media"')
    # Vercel Web Analytics injects /_vercel/insights/script.js: point it at an empty script
    text = text.replace('"/_vercel/insights/script.js"', '"data:text/javascript,"')
    return localise_gfonts(text)


def code_refs(path, text):
    base_dir = path.rsplit('/', 1)[0]
    refs = [r for r in scan(text) if r.endswith(('.js', '.css'))]
    refs += [base_dir + '/' + r for r in re.findall(r'''["']\./([A-Za-z0-9_.-]+\.(?:js|css))["']''', text)]
    refs += ['/' + r for r in re.findall(r'''["'](assets/[A-Za-z0-9_.-]+\.(?:js|css))["']''', text)]
    return refs


class Missing(Exception):
    pass


def fetch_code(path):
    try:
        return path, get(BASE + path).decode('utf-8', 'replace')
    except urllib.error.HTTPError as e:
        if e.code == 404:
            raise Missing(path)
        raise


def capture():
    files.clear(); manifest.clear(); media.clear(); gfonts.clear()
    html = get(BASE + '/').decode('utf-8')

    # 1. all code, breadth-first and in parallel
    code = {}
    frontier = {p for p in scan(html) if p.startswith('/assets/') and p.endswith(('.js', '.css'))}
    with ThreadPoolExecutor(24) as pool:
        while frontier:
            for path, text in pool.map(fetch_code, sorted(frontier)):
                code[path] = text
            frontier = {r for p in frontier for r in code_refs(p, code[p])} - set(code)
            frontier = {p for p in frontier if p.startswith('/assets/')}
    print('code files:', len(code))

    # 2. which chunks the "/" route loads: the entry, the route's preloads and their static imports
    entry = re.search(r'<script type="module" async="" src="(/assets/[^"]+)"', html).group(1)
    home = re.search(r'"/":\$R\[\d+\]=\{preloads:\$R\[\d+\]=\[([^\]]*)\]', html).group(1)
    queue, chunks = [entry] + re.findall(r'"([^"]+)"', home), set()
    while queue:
        c = queue.pop()
        if c in chunks or c not in code:
            continue
        chunks.add(c)
        queue += ['/assets/' + r for r in re.findall(r'(?:from|import)\s*"\./([A-Za-z0-9_.-]+\.js)"', code[c])]

    # 3. other files: those named in the HTML, in any stylesheet, or in a homepage chunk. Other routes' chunks
    # name ~1,500 images for /customers, /blog and so on; those are not saved.
    wanted = set(scan(html))
    for path, text in code.items():
        if path.endswith('.css'):
            wanted.update(scan(text))
            base_dir = path.rsplit('/', 1)[0]
            for r in re.findall(r'url\((?!["\']?(?:data:|https?:|/|#))["\']?([^)"\']+)', text):
                wanted.add(os.path.normpath(base_dir + '/' + r))
        elif path in chunks:
            wanted.update(scan(text))
    wanted.update(['/favicon.ico', '/favicon-16x16.png', '/favicon-32x32.png', '/apple-touch-icon.png'])
    wanted = {p.split('?')[0] for p in wanted if not p.endswith(('.js', '.css')) and not p.startswith(SKIP)}

    def fetch_file(path):
        try:
            data = get(BASE + path)
        except Exception as e:
            return path, None, str(e)
        if data[:15].lower().startswith(b'<!doctype html'):
            return path, None, 'html fallback'
        return path, data, None

    with ThreadPoolExecutor(16) as pool:
        for path, data, err in pool.map(fetch_file, sorted(wanted)):
            if err:
                print('skip', path, err)
            elif path.endswith('.svg'):
                put(path, rewrite_code(data.decode('utf-8', 'replace')).encode(), BASE + path)
            else:
                put(path, data, BASE + path)

    # The client entry sets the router's basepath to "" (the site is served from "/"). Set it to the folder the
    # page is served from instead, so "/" also matches under the gallery's /sites/dessn/. Intent preloading is
    # turned off: other routes are not captured.
    patches = [
        (re.compile(r'(\.update\(\{)basepath:"",(serializationAdapters:)'),
         r'\1basepath:location.pathname.replace(/\/(index\.html)?$/,""),\2'),
        (re.compile(r'(\w+\(\{routeTree:\w+,)defaultPreload:"intent",'), r'\1defaultPreload:!1,'),
        # Vite's preload helper builds "/" + "assets/x.js"; resolve against the chunk's own URL instead
        (re.compile(r'(="modulepreload",\w+=function\(\w\)\{return)"/"\+(\w)\}'),
         r'\1 new URL("../"+\2,import.meta.url).pathname}'),
    ]
    for pattern, repl in patches:
        hits = [p for p in code if pattern.search(code[p])]
        if len(hits) != 1:
            sys.exit('patch target %s found in %d chunks' % (pattern.pattern, len(hits)))
        code[hits[0]] = pattern.sub(repl, code[hits[0]])

    for path, text in code.items():
        put(path, rewrite_code(text).encode(), BASE + path)

    # 4. the page
    media.update(MEDIA_URL.findall(html))
    html = localise_gfonts(html.replace(MEDIA, '/media/'))

    # React renders the analytics tags, so they stay in place (removing them breaks hydration); only their
    # inline bodies are emptied. The GTM <noscript> iframe never loads with JS on.
    def blank(m):
        return m.group(1) + '/* analytics removed */' + m.group(3)
    html = re.sub(r'(<script>)(\s*window\.dataLayer.*?)(</script>)', blank, html, flags=re.S)
    html = re.sub(r'(<script>)(\(function\(w,d,s,l,i\).*?)(</script>)', blank, html, flags=re.S)
    html = re.sub(r'(<script>)(\s*!\(function \(t, e\)(?:(?!</script>).)*?posthog.*?)(</script>)', blank, html, flags=re.S)
    # Cloudflare injects its RUM beacon at the edge, outside React's tree
    html = re.sub(r'<script[^>]*static\.cloudflareinsights\.com[^>]*>\s*</script>', '', html)
    html = re.sub(r'<link rel="preconnect"[^>]*fonts\.(?:googleapis|gstatic)\.com[^>]*/?>', '', html)
    # local.js runs before the app: it keeps the consent banner closed, and sends links to routes that are
    # not captured to www.dessn.com
    html = re.sub(r'(<head>)', r'\1<script src="/local.js"></script>', html, count=1)
    put('/index.html', html.encode(), BASE + '/')
    with open(os.path.join(HERE, 'local.js'), 'rb') as f:
        files['/local.js'] = f.read()

    for name in sorted(media):
        put('/media/' + name, get(MEDIA + name), MEDIA + name)
    return len(chunks)


for attempt in range(1, 6):
    try:
        n = capture()
        break
    except Missing as e:
        print('attempt %d: %s is gone (the site redeployed mid-capture), starting over' % (attempt, e))
else:
    sys.exit('gave up after 5 attempts')

shutil.rmtree(OUT, ignore_errors=True)
for path, data in files.items():
    p = os.path.join(OUT, path.lstrip('/'))
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'wb') as f:
        f.write(data)
with open(os.path.join(HERE, '..', 'assets-manifest.json'), 'w') as f:
    json.dump(dict(sorted(manifest.items())), f, indent=1)
print('%d files, %d homepage chunks, media: %s' % (len(files), n, sorted(media)))
