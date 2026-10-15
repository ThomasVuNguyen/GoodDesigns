#!/usr/bin/env python3
"""Rebuild Reservoir/dist from the live https://withreservoir.com/ page.

The site is one hand-written document served at /, /nodes, /cards, /timeline and /meet;
its script picks the view from the path. Here the same document is written to index.html,
nodes.html, cards.html, timeline.html and meet.html, every path is made relative, and the
router reads the last path segment, so the page works from any folder (localhost root or
/sites/reservoir/ in the gallery).
"""
import os, re, json, shutil, urllib.request, urllib.parse

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
DIST = os.path.join(ROOT, 'dist')
ORIGIN = 'https://withreservoir.com'
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/130 Safari/537.36'}
ROUTES = ['nodes', 'cards', 'timeline', 'meet']
manifest = {}


def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read()


def save(src, rel=None):
    """Download ORIGIN-relative or absolute `src` into dist/<rel>; returns rel."""
    url = urllib.parse.urljoin(ORIGIN + '/', src)
    rel = rel or urllib.parse.urlparse(url).path.lstrip('/')
    if rel not in manifest:
        out = os.path.join(DIST, rel)
        os.makedirs(os.path.dirname(out), exist_ok=True)
        with open(out, 'wb') as f:
            f.write(get(url))
        manifest[rel] = url
    return rel


def must_replace(text, old, new, count=None):
    n = text.count(old)
    if not n or (count is not None and n != count):
        raise SystemExit(f'expected {count or "some"} of {old!r}, found {n}')
    return text.replace(old, new)


shutil.rmtree(DIST, ignore_errors=True)
os.makedirs(DIST)

html = get(ORIGIN + '/').decode()
scripts = {'wall-shapes.js': '/wall-shapes.js', 'meet-assets/journey.js': '/meet/journey.js'}
for rel, src in scripts.items():
    save(src, rel)
save('/meet/us-map.svg', 'meet-assets/us-map.svg')
save('/brand/tokens.css')
for src in sorted(set(re.findall(r'/(?:brand|fonts)/[A-Za-z0-9_./\-]+\.(?:svg|png|ttf|woff2?)', html))):
    save(src)

# Published letters: a snapshot of the API stands in for /api/letters.
letters = json.loads(get(ORIGIN + '/api/letters?limit=60'))
for l in letters.get('letters', []):
    if l.get('image_url'):
        u = urllib.parse.urlparse(l['image_url'])
        l['image_url'] = save(l['image_url'], 'images/letters/' + os.path.basename(u.path))
os.makedirs(os.path.join(DIST, 'api'), exist_ok=True)
with open(os.path.join(DIST, 'api/letters.json'), 'w') as f:
    json.dump(letters, f, ensure_ascii=False, indent=1)
manifest['api/letters.json'] = ORIGIN + '/api/letters?limit=60'

# Every image the page, its scripts and the letters name (picks are chosen by hash: 01–12).
text = html
for rel in scripts:
    text += open(os.path.join(DIST, rel), encoding='utf-8').read()
text += json.dumps(letters)
images = set(re.findall(r'images/[A-Za-z0-9_\-./]+\.(?:jpg|jpeg|png|webp|svg|gif)', text))
images |= {f'images/pick-{i:02d}.jpg' for i in range(1, 13)}
for src in sorted(images):
    save('/' + src)

# --- Rewrite the document ---
# Root-absolute assets become relative.
html = re.sub(r'(["\'(])/(brand|fonts)/', r'\1\2/', html)
html = must_replace(html, '"/wall-shapes.js"', '"wall-shapes.js"', 1)
html = must_replace(html, '"/meet/journey.js"', '"meet-assets/journey.js"', 1)
html = must_replace(html, "'/meet/us-map.svg'", "'meet-assets/us-map.svg'", 1)
html = must_replace(html, "var LETTERS_ENDPOINT = '/api/letters';", "var LETTERS_ENDPOINT = 'api/letters.json';", 1)
# The snapshot is a file: no query string.
html = must_replace(html, "fetch(LETTERS_ENDPOINT + '?limit=60',", 'fetch(LETTERS_ENDPOINT,', 1)

# Router: the view is the last path segment, so the page works under any folder.
route_expr = "('/' + location.pathname.split('/').pop().replace(/(^index)?(\\.html)?$/, ''))"
html = must_replace(html, "location.pathname.replace(/\\/+$/, '') || '/'", route_expr, 2)
html = must_replace(html, 'window.location.assign(ROUTE_OF[name])', 'window.location.assign(ROUTE_OF[name].slice(1))', 1)
for r in ROUTES:
    html = re.sub(r"(location\.(?:assign|replace)\(|replaceState\(null, '', |handToWall\(|fallback \|\| )'/" + r + "'",
                  r"\1'" + r + "'", html)
    html = html.replace(f'href="/{r}"', f'href="{r}"')

# Pages that are not captured go to the public site.
html = html.replace("window.location.assign('/earlyaccess')", f"window.location.assign('{ORIGIN}/earlyaccess')")
html = re.sub(r'href="/(start|earlyaccess|privacy|terms|policies)"', rf'href="{ORIGIN}/\1"', html)

leftover = re.findall(r'''(?:href|src)=["']/[^/"'][^"']*|location\.(?:assign|replace)\('/[^']*''', html)
if leftover:
    raise SystemExit(f'root-absolute references left: {sorted(set(leftover))}')

for name in ['index'] + ROUTES:
    with open(os.path.join(DIST, name + '.html'), 'w', encoding='utf-8') as f:
        f.write(html)

with open(os.path.join(ROOT, 'assets-manifest.json'), 'w') as f:
    json.dump(manifest, f, indent=2, sort_keys=True)
print(len(manifest), 'assets')
