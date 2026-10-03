#!/usr/bin/env python3
"""Rebuild Plasmidsaurus/dist from https://plasmidsaurus.com/.

Saves the rendered page, main.css/main.js, jQuery, fonts, every image/video the page references, and the two
embedded demo apps (plasmid_demo, dropbox_map), then strips consent/analytics/chat/A-B-testing scripts.
Run from anywhere: python3 Plasmidsaurus/tools/capture.py
"""
import os, re, json, hashlib, html as htmllib, urllib.request, urllib.parse
from concurrent.futures import ThreadPoolExecutor
BASE = 'https://plasmidsaurus.com'
LAMBDA = 'https://cgoaupomtlt4zyb33k7ywzsuvy0upezc.lambda-url.us-west-2.on.aws'
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124.0 Safari/537.36'}
OUT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'dist'))
manifest = {}

def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=120).read()

def save(path, data, src):
    p = os.path.join(OUT, path.lstrip('/'))
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'wb').write(data)
    manifest[path] = src

def local_name(url, folder):
    u = urllib.parse.urlparse(url)
    base = os.path.basename(u.path) or 'file'
    stem, ext = os.path.splitext(base)
    fm = urllib.parse.parse_qs(u.query).get('fm', [''])[0]
    if fm and fm != 'gif' and ext.lower() not in ('.svg', '.mp4'): ext = '.' + {'jpg': 'jpg'}.get(fm, fm)
    h = hashlib.md5(url.encode()).hexdigest()[:6]
    return f'/assets/{folder}/{re.sub(r"[^A-Za-z0-9_-]", "-", stem)}-{h}{ext}'

# ---- page ---------------------------------------------------------------
page = get(BASE + '/').decode()
# consent, tag manager, mixpanel, HubSpot, VWO, Intercom, GTM iframe
page = re.sub(r'<script id="Cookiebot".*?</script>', '', page, flags=re.S)
page = re.sub(r'<!-- Google Tag Manager -->\s*<script>.*?</script>', '', page, flags=re.S)
page = re.sub(r'<noscript><iframe src="https://www.googletagmanager.com.*?</noscript>', '', page, flags=re.S)
page = re.sub(r'<script type="text/javascript">\s*window\.mixpanelToken.*?</script>', '', page, flags=re.S)
page = re.sub(r"<script type='text/javascript' id='vwoCode'>.*?</script>", '', page, flags=re.S)
page = re.sub(r'<link rel="preconnect" href="https://dev\.visualwebsiteoptimizer\.com"\s*/>', '', page)
page = re.sub(r'<script>\s*window\.intercomSettings.*?</script>\s*<script>\s*\(function\(\)\{var w=window;var ic=.*?</script>', '', page, flags=re.S)
page = re.sub(r'\?1790721462', '', page)

# internal links point at the live public pages (this capture covers the home page only)
page = re.sub(r'(<a\b[^>]*?\bhref=")/(?!assets/|favicon)([^"]*)"', lambda m: f'{m.group(1)}{BASE}/{m.group(2)}"', page)

# jQuery
save('/assets/js/jquery-3.7.1.min.js', get('https://code.jquery.com/jquery-3.7.1.min.js'), 'https://code.jquery.com/jquery-3.7.1.min.js')
page = re.sub(r'<script\s+src="https://code\.jquery\.com/jquery-3\.7\.1\.min\.js".*?</script>', '<script src="/assets/js/jquery-3.7.1.min.js"></script>', page, flags=re.S)

# site css/js/fonts
css = get(BASE + '/assets/css/main.css').decode()
for u in sorted(set(re.findall(r"url\('?(/assets/[^)'\"]+)'?\)", css))):
    save(u, get(BASE + u), BASE + u)
save('/assets/css/main.css', css.encode(), BASE + '/assets/css/main.css')
js = get(BASE + '/assets/js/main.js')
save('/assets/js/main.js', js, BASE + '/assets/js/main.js')
for u in sorted(set(re.findall(r'(?:href|src)="(/assets/[^"?]+)"', page))):
    if u not in manifest:
        try: save(u, get(BASE + u), BASE + u)
        except Exception as e: print('skip', u, e)
for u in ('/favicon.png',):
    save(u, get(BASE + u), BASE + u)

# remote media -> local
remote = set()
for m in re.finditer(r'https://(?:plasmid-saurus\.(?:transforms|files)\.svdcdn\.com|servd-plasmid-saurus\.b-cdn\.net|scontent\.cdninstagram\.com)/[^"\s)]+', page):
    remote.add(m.group(0))
def folder_for(u):
    if u.endswith('.mp4') or '.mp4?' in u: return 'video'
    return 'img'
def fetch_remote(u):
    real = htmllib.unescape(u)
    return u, get(real)
mapping = {}
with ThreadPoolExecutor(8) as ex:
    for u, data in ex.map(fetch_remote, sorted(remote)):
        real = htmllib.unescape(u)
        name = local_name(real, folder_for(real))
        save(name, data, real.split('?')[0])
        mapping[u] = name
for u in sorted(mapping, key=len, reverse=True):
    page = page.replace(u, mapping[u])
# srcset with several widths of the same file collapse to distinct hashed names, so nothing else to fix

# ---- embedded demo apps -------------------------------------------------
def mirror_app(name):
    root = f'/embed/{name}'
    h = get(f'{LAMBDA}/iframes/{name}').decode()
    s3 = {}
    # presigned genbank files are inlined as strings; keep them local
    # signed URLs first: the bare (unsigned) form of the same key returns 403 and reuses the signed download
    for m in sorted(set(re.findall(r'https://plasmidsaurus-prod\.s3\.amazonaws\.com/[A-Za-z0-9_./%-]+\.(?:gbk|gb|dna|tsv)(?:\?[A-Za-z0-9%=&_.~-]*)?', h)), key=len, reverse=True):
        key = re.sub(r'[^A-Za-z0-9_./-]', '_', urllib.parse.unquote(urllib.parse.urlparse(m).path))
        loc = f'{root}/s3{key}'
        if loc not in manifest:
            try: save(loc, get(m), m.split('?')[0])
            except Exception as e: print('s3 skip', key, e); continue
        s3[m] = loc
    for m in sorted(s3, key=len, reverse=True): h = h.replace(m, s3[m])
    seen = set()
    def crawl(p):
        if p in seen: return
        seen.add(p)
        try: data = get(LAMBDA + p)
        except Exception as e: print('skip', p, e); return
        save(f'{root}{p}', data, LAMBDA + p)
        if p.endswith('.js') or p.endswith('.css'):
            txt = data.decode('utf8', 'ignore')
            d = os.path.dirname(p)
            for r in re.findall(r'''["'`]\./([A-Za-z0-9_.@-]+\.(?:js|css|woff2|svg|png|webp|jpg))["'`]''', txt):
                crawl(os.path.normpath(os.path.join(d, r)))
            for r in re.findall(r'url\((/assets/[^)"\']+)\)', txt): crawl(r)
            for r in re.findall(r'''["'`](/assets/[A-Za-z0-9_.@-]+\.(?:js|css|woff2|svg|png|webp|jpg))["'`]''', txt): crawl(r)
    for p in sorted(set(re.findall(r'(?:href|src)="(/assets/[^"]+)"', h))): crawl(p)
    h = re.sub(r'''(["'`(])/assets/''', rf'\1{root}/assets/', h)
    for f in [k for k in manifest if k.startswith(root + '/assets/') and k.endswith(('.js', '.css'))]:
        fp = os.path.join(OUT, f.lstrip('/'))
        t = open(fp, encoding='utf8').read()
        t2 = re.sub(r'''(["'`(])/assets/''', rf'\1{root}/assets/', t)
        t2 = t2.replace('function(e){return`/`+e}', 'function(e){return`' + root + '/`+e}')  # vite preload base
        if t2 != t: open(fp, 'w', encoding='utf8').write(t2)
    # TanStack Router hydrates against the original route, so present that path inside the frame
    h = h.replace('<head>', f'<head><script>history.replaceState(null,"","/iframes/{name}");addEventListener("error",function(e){{if(/#419/.test(e.message))e.preventDefault()}});(function(f){{window.fetch=function(u,o){{var s=typeof u==="string"?u:u.url;return /feature-flags\\/api|multimer-analysis/.test(s)?Promise.resolve(new Response("{{}}",{{status:404}})):f.apply(this,arguments)}}}})(window.fetch)</script>', 1)
    save(f'{root}/index.html', h.encode(), f'{LAMBDA}/iframes/{name}')
    return f'{root}/index.html'
demo = mirror_app('plasmid_demo')
dmap = mirror_app('dropbox_map')
page = page.replace(f'{LAMBDA}/iframes/plasmid_demo', demo).replace(f'{LAMBDA}/iframes/dropbox_map', dmap)

# newsletter form: HubSpot renders it at runtime; use the static snapshot from tools/snapshot-form.mjs (submit disabled)
tools = os.path.dirname(__file__)
form = open(os.path.join(tools, 'newsletter-form.html'), encoding='utf8').read()
form = re.sub(r'<script.*?</script>', '', form, flags=re.S)
form = re.sub(r'<link[^>]*>', '', form)
form = re.sub(r'<input type="hidden"[^>]*>', '', form)
form = re.sub(r'action="https://forms\.hsforms\.com[^"]*"', 'action="#" onsubmit="return false"', form)
form = re.sub(r'\s+target="submission_handler[^"]*"', '', form)
fcss = open(os.path.join(tools, 'newsletter-form.css'), encoding='utf8').read()
fcss = re.sub(r'@font-face\s*\{[^}]*\}', '', fcss)
fcss = re.sub(r'url\(https://www\.gstatic\.com[^)]*\)', 'none', fcss)
save('/assets/css/newsletter-form.css', fcss.encode(), 'HubSpot form (snapshot)')
page = re.sub(r'<script src="https://js\.hsforms\.net[^>]*></script>\s*<div class="hs-form-html"[^>]*></div>',
              lambda m: '<div class="hs-form-html">' + form + '</div>', page)
# the closed mega-menu panels sit off-screen and widen the page (the reference scrolls sideways too); clip them
save('/assets/css/overrides.css', b'/* clone-only: the invisible closed nav dropdowns overflow the viewport on desktop */\n.Header { overflow-x: clip; }\n', 'clone override')
page = page.replace('</head>', '<link rel="stylesheet" href="/assets/css/newsletter-form.css">\n<link rel="stylesheet" href="/assets/css/overrides.css">\n</head>', 1)
# hidden login-state iframe to app.plasmidsaurus.com (redirects signed-in visitors away) and the empty lightbox <img>
page = re.sub(r'<iframe\s+src="https://app\.plasmidsaurus\.com/user/redirect-if-logged-in".*?</iframe>', '', page, flags=re.S)
page = re.sub(r'(<img\s+)src=""(\s+alt=""\s+class="[^"]*"\s+data-image-lightbox-img)', r'\1src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="\2', page)
save('/index.html', page.encode(), BASE + '/')
open(os.path.join(os.path.dirname(OUT), 'assets-manifest.json'), 'w').write(json.dumps(manifest, indent=1))
print(len(manifest), 'files saved to', OUT)
