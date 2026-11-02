#!/usr/bin/env python3
"""Rebuild AdoptAI/dist from https://www.adopt.ai/.

Saves the server-rendered Next.js (Turbopack) page with its RSC payload, so the original React app hydrates
locally, plus every JS chunk (found by scanning the page and each chunk for /_next/static paths), the
stylesheet, fonts, /images/ files and the Strapi media the page uses (saved under dist/media/).

The RSC payload is decoded, edited and re-emitted as one chunk, with the byte lengths of its text rows
recomputed, so Strapi URLs and internal links can be rewritten without breaking hydration.

Run from anywhere: python3 AdoptAI/tools/capture.py
"""
import json, os, re, urllib.parse, urllib.request

BASE = 'https://www.adopt.ai'
STRAPI = 'https://committed-crown-591b42a6a0.media.strapiapp.com/'
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/130.0 Safari/537.36'}
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.abspath(os.path.join(HERE, '..', 'dist'))
manifest = {}


def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read()


def save(path, data, source):
    p = os.path.join(OUT, path.lstrip('/'))
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'wb') as f:
        f.write(data)
    manifest[path] = source


# ---------------------------------------------------------------- text rewrites shared by HTML, payload, JS

def unwrap_next_image(text):
    """/_next/image?url=<enc>&w=..&q=.. -> the original file URL."""
    def img(m):
        return urllib.parse.unquote(m.group(1))
    return re.sub(r'/_next/image\?url=([^&"\'\s\\]+)(?:(?:&amp;|&|\\u0026)(?:w|q)=\d+)+', img, text)


strapi_files = set()


def localise_media(text):
    def media(m):
        strapi_files.add(m.group(1))
        return '/media/' + m.group(1)
    return re.sub(re.escape(STRAPI) + r'([A-Za-z0-9_.-]+)', media, text)


INTERNAL = r'(?:about-us|blog|book-a-demo|for-cpa-firms|for-finance-teams|free-tools|glossary|guides|our-story|pricing|security|skills|use-case|integrations)'


def externalise_links(text):
    """Internal page routes are not captured: point them at the public site (no prefetch, plain navigation).
    "/" (the logo) becomes the public home too; local.js turns a click on it into scroll-to-top."""
    return re.sub(r'(\bhref"?\s*[:=]\s*")/((?:%s)(?:/[^"\\?#]*)?)?(?=["?#])' % INTERNAL,
                  lambda m: m.group(1) + BASE + '/' + (m.group(2) or ''), text)


# ---------------------------------------------------------------- crawl static files

EXT = r'(?:css|js|woff2?|otf|ttf|png|jpe?g|webp|svg|avif|gif|ico|mp4|webm|json|webmanifest)'
PATH = r'/(?:_next/static/[^"\'`\s\\)?]+|images/[A-Za-z0-9_./-]+\.%s)' % EXT
seen = set()


def crawl(p):
    p = p.split('?')[0]
    if p in seen or p.startswith('//'):
        return
    seen.add(p)
    try:
        data = get(BASE + p)
    except Exception as e:
        print('skip', p, e)
        return
    if p.endswith(('.js', '.css')):
        text = data.decode('utf8', 'ignore')
        for m in set(re.findall(r'''["'`(](%s)''' % PATH, text)):
            crawl(m)
        # the turbopack runtime references chunks as "static/chunks/x.js" (relative to /_next/)
        for m in set(re.findall(r'''["'`](static/(?:chunks|media)/[^"'`\s\\)?]+\.(?:js|css|woff2?|png|svg))''', text)):
            crawl('/_next/' + m)
        text = localise_media(unwrap_next_image(text))
        if p.endswith('.js'):
            text = externalise_links(text)
            # no image optimizer on a static host: next/image renders the (local) src as given
            text = text.replace('path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1',
                                'path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0')
            # header/menu tone comes from the pathname; the gallery serves this home page at /sites/<slug>/
            text = text.replace('"chromeToneForPathname",0,function(e){return',
                                '"chromeToneForPathname",0,function(e){if(e&&0===e.indexOf("/sites/"))e="/";return')
        data = text.encode()
    save(p, data, BASE + p)


html = get(BASE + '/').decode()
for m in set(re.findall(r'''["'`(=](%s)''' % PATH, html)):
    crawl(m)

# ---------------------------------------------------------------- page HTML

# third-party scripts: CookieYes consent manager and Google Tag Manager. GTM's loader is injected on the
# client from the RSC payload, which strip_trackers() handles; only its preconnect and noscript are HTML.
html = re.sub(r'<link rel="preconnect" href="https://(?:cdn-cookieyes\.com|www\.googletagmanager\.com)"/>', '', html)
html = re.sub(r'<script id="cookieyes"[^>]*></script>', '', html)
html = re.sub(r'<noscript><iframe src="https://www\.googletagmanager\.com[^<]*</iframe></noscript>', '', html)

# RSC payload: decode every [1,"..."] push, edit the rows, emit a single push at the first one's place
PUSH = re.compile(r'<script>self\.__next_f\.push\((\[1,.*?\])\)</script>', re.S)
parts = [json.loads(m.group(1))[1] for m in PUSH.finditer(html)]
payload = ''.join(parts)


# The CMS "custom code" entries 200-202 are Google Tag Manager (server noscript + a deferred client loader)
# and the CookieYes banner. Their rendered elements become null and the entries leave the client props.
TRACKER_IDS = {200, 201, 202}
TRACKER_KEYS = tuple('custom-code-%d-' % n for n in TRACKER_IDS)


def strip_trackers(row):
    m = re.match(r'([0-9a-f]+:)(I?)(.*?)(\n?)$', row, re.S)
    if not m or not re.search(r'custom-code-20[0-2]-|"id":20[0-2],', m.group(3)):
        return row

    def walk(v):
        if isinstance(v, list):
            if len(v) == 4 and v[0] == '$' and isinstance(v[2], str) and v[2].startswith(TRACKER_KEYS):
                return None
            return [walk(x) for x in v if not (isinstance(x, dict) and x.get('id') in TRACKER_IDS and 'code' in x)]
        if isinstance(v, dict):
            return {k: walk(x) for k, x in v.items()}
        return v
    value = walk(json.loads(m.group(3)))
    return m.group(1) + m.group(2) + json.dumps(value, ensure_ascii=False, separators=(',', ':')) + m.group(4)


def edit_payload(payload):
    """Rows are newline-terminated, except text rows ("id:T<hex byte length>,<text>"). Those are copied
    byte for byte: they only hold JSON-LD here, and a root path inside one would be lengthened by the
    gallery's /sites/<slug> rewrite, which breaks the stream."""
    b, out, i = payload.encode('utf8'), [], 0
    text_row = re.compile(rb'([0-9a-f]+):T([0-9a-f]+),')
    while i < len(b):
        m = text_row.match(b, i)
        if m:
            n = int(m.group(2), 16)
            out.append(b[i:m.end() + n])
            i = m.end() + n
            continue
        j = b.find(b'\n', i)
        j = len(b) if j < 0 else j + 1
        row = strip_trackers(b[i:j].decode('utf8'))
        out.append(externalise_links(localise_media(unwrap_next_image(row))).encode('utf8'))
        i = j
    return b''.join(out).decode('utf8')


new_payload = edit_payload(payload)
first = True


def replace_push(m):
    global first
    if first:
        first = False
        return '<script>self.__next_f.push(%s)</script>' % json.dumps([1, new_payload]).replace('</', '<\\/')
    return ''


html = localise_media(unwrap_next_image(html))
html = externalise_links(html)
html = PUSH.sub(replace_push, html)
html = html.replace('</body>', '<script src="/local.js"></script></body>', 1)

# ---------------------------------------------------------------- media

for name in sorted(strapi_files):
    if os.path.exists(os.path.join(OUT, 'media', name)) and name.endswith('.mp4'):
        manifest['/media/' + name] = STRAPI + name  # videos are re-encoded in place; keep them
        continue
    try:
        save('/media/' + name, get(STRAPI + name), STRAPI + name)
    except Exception as e:
        print('skip media', name, e)

for p in ('/favicon.ico', '/icon.svg'):
    crawl(p)

save('/index.html', html.encode(), BASE + '/')
with open(os.path.join(OUT, '..', 'assets-manifest.json'), 'w') as f:
    json.dump(dict(sorted(manifest.items())), f, indent=1)
print(len(manifest), 'files saved to', OUT, '| media:', len(strapi_files))
