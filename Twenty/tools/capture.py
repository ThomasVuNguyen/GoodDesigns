#!/usr/bin/env python3
"""Rebuild Twenty/dist from https://twenty.com/partners/become.

Saves the server-rendered Next.js (Turbopack) page, its stylesheets, every JS chunk (found by scanning the page
and each chunk for /_next/static paths), fonts, images and the three.js GLB models, so the original React app
hydrates locally and its halftone scenes render from local files.
Run from anywhere: python3 Twenty/tools/capture.py
"""
import os, re, json, urllib.parse, urllib.request

BASE = 'https://twenty.com'
PAGE = '/partners/become'
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124.0 Safari/537.36'}
OUT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'dist'))
manifest = {}

def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read()

def save(path, data):
    p = os.path.join(OUT, path.lstrip('/'))
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'wb').write(data)
    manifest[path] = BASE + path

DPL = r'\?dpl=[A-Za-z0-9_-]+'

# Other twenty.com routes are not captured. Absolute URLs make next/link treat them as external, so it does not
# prefetch their RSC payloads (which would 404 locally) and a click opens the live page.
ROUTES = ['product', 'pricing', 'partners', 'customers', 'why-twenty', 'terms', 'releases', 'privacy-policy', 'halftone', 'apps']

def external_routes(text):
    for r in ROUTES + ['']:
        for q in ('"', '\\"'):
            text = text.replace(f'href={q}/{r}{q}', f'href={q}{BASE}/{r}{q}')
            text = text.replace(f'{q}href{q}:{q}/{r}{q}', f'{q}href{q}:{q}{BASE}/{r}{q}')
        text = text.replace(f'href:"/{r}"', f'href:"{BASE}/{r}"')
    return text

def patch_html(text):
    text = re.sub(DPL, '', text)
    text = external_routes(text)
    # analytics and Cloudflare beacons are not part of the page
    text = re.sub(r'<script[^>]*(?:cloudflareinsights|googletagmanager|cdn-cgi)[^>]*>\s*</script>', '', text)
    return text

def patch_js(text):
    text = re.sub(DPL, '', text)
    text = external_routes(text)
    # next/image's optimizer does not exist statically: serve the original files (the Resources menu thumbnails)
    text = text.replace('dangerouslyAllowSVG:!1,unoptimized:!1}', 'dangerouslyAllowSVG:!1,unoptimized:!0}')
    text = text.replace('qualities:[75],unoptimized:!1,', 'qualities:[75],unoptimized:!0,')
    # The capture is served under another pathname (/ locally, /sites/twenty-partners/ in the gallery). Pin
    # usePathname() to the source route so the header marks Partners as the current section, as on the live page.
    text = re.sub(r'return \w+\.useDynamicRouteParams\?\.\("usePathname\(\)"\),\(0,\w+\.useContext\)\(\w+\.PathnameContext\)', 'return"%s"' % PAGE, text)
    # Menu items are active when the pathname matches their href; compare without the twenty.com prefix added above.
    text = re.sub(r'(\w)===(\w)\.href\|\|\1\.startsWith\(`\$\{\2\.href\}/`\)',
                  lambda m: '%s===%s.href.replace("%s","")||%s.startsWith(`${%s.href.replace("%s","")}/`)' % (m[1], m[2], BASE, m[1], m[2], BASE), text)
    # The partner application and client brief forms never send anything: submissions resolve as accepted locally.
    text = re.sub(r'fetch\("/api/(?:partner-application|client-brief)",\{body:JSON\.stringify\(\w+\),headers:\{"Content-Type":"application/json"\},method:"POST"\}\)', 'Promise.resolve({ok:!0})', text)
    return text

EXT = r'(?:css|js|woff2?|otf|ttf|png|jpe?g|webp|svg|avif|gif|ico|mp4|webm|json|webmanifest|glb|gltf|wasm|bin|hdr|ktx2|lottie)'
PATH = r'/(?:_next/static/[^"\'`\s\\)?]+|[A-Za-z0-9_./%-]+\.EXT)'.replace('EXT', EXT)
seen = set()

def crawl(p):
    p = urllib.parse.unquote(p.split('?')[0])
    if p in seen or p.startswith('//') or p in manifest:
        return
    seen.add(p)
    try:
        data = get(BASE + urllib.parse.quote(p))
    except Exception as e:
        print('skip', p, e)
        return
    if p.endswith(('.js', '.css')):
        text = data.decode('utf8', 'ignore')
        if p.endswith('.css'):  # url(../media/x.woff2) relative to the stylesheet
            for m in set(re.findall(r'url\((?:"|\')?(\.\./[^)"\'?#]+)', text)):
                crawl(os.path.normpath(os.path.join(os.path.dirname(p), m)))
        for m in set(re.findall(r'''["'`(](%s)''' % PATH, text)):
            crawl(m)
        for m in set(re.findall(r'''["'`](static/(?:chunks|media)/[^"'`\s\\)?]+\.(?:js|css|woff2?|png|svg))''', text)):
            crawl('/_next/' + m)
    if p.endswith('.js'):
        data = patch_js(data.decode('utf8', 'ignore')).encode()
    elif p.endswith('.css'):
        data = re.sub(DPL, '', data.decode('utf8', 'ignore')).encode()
    save(p, data)

html = get(BASE + PAGE).decode()
for m in set(re.findall(r'''["'`(=](%s)''' % PATH, html)):
    crawl(m)
extra = os.path.join(os.path.dirname(__file__), 'extra-assets.txt')
if os.path.exists(extra):
    for line in open(extra):
        if line.strip() and not line.startswith('#'):
            crawl(line.strip())

save('/index.html', patch_html(html).encode())
json.dump(manifest, open(os.path.join(os.path.dirname(OUT), 'assets-manifest.json'), 'w'), indent=1)
print(len(manifest), 'files saved to', OUT)
