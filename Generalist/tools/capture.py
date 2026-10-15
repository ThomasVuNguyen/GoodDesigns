#!/usr/bin/env python3
"""Rebuild Generalist/dist from the live https://generalistai.com/blog/gen-1.5 post."""
import os, re, json, shutil, urllib.request, urllib.parse

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
DIST = os.path.join(ROOT, 'dist')
ORIGIN = 'https://generalistai.com'
PAGE = ORIGIN + '/blog/gen-1.5'
THREE = 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/'
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/130 Safari/537.36'}
manifest = {}


def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=120).read()


def save(url, rel=None):
    rel = rel or urllib.parse.urlparse(url).path.lstrip('/')
    if rel not in manifest:
        out = os.path.join(DIST, rel)
        os.makedirs(os.path.dirname(out), exist_ok=True)
        with open(out, 'wb') as f:
            f.write(get(url))
        manifest[rel] = url
    return rel


def must_sub(pattern, repl, text, flags=0):
    out, n = re.subn(pattern, repl, text, flags=flags)
    if not n:
        raise SystemExit(f'pattern not found: {pattern}')
    return out


shutil.rmtree(DIST, ignore_errors=True)
os.makedirs(DIST)
html = get(PAGE).decode()

# Every /assets/… file the page names (styles, scripts, favicons, cover frame, videos).
for path in sorted(set(re.findall(r'"(/assets/[^"?#]+)"', html))):
    save(ORIGIN + path)

# Fonts and images the stylesheets name.
for rel in [r for r in list(manifest) if r.endswith('.css')]:
    css = open(os.path.join(DIST, rel), encoding='utf-8').read()
    for ref in re.findall(r'url\(\s*["\']?([^"\')]+)["\']?\s*\)', css):
        if ref.startswith(('data:', '#')):
            continue
        save(urllib.parse.urljoin(ORIGIN + '/' + rel, ref).split('#')[0].split('?')[0])

# The web manifest's icons.
wm = 'assets/favicon/site.webmanifest'
for icon in json.loads(open(os.path.join(DIST, wm), encoding='utf-8').read()).get('icons', []):
    save(urllib.parse.urljoin(ORIGIN + '/' + wm, icon['src']))

# three.js for the cover: the module and the core it imports, served locally.
cover = 'assets/pages/blog/gen-1.5/assets/cover.js'
save(THREE + 'three.module.min.js', 'assets/vendor/three/three.module.min.js')
core = open(os.path.join(DIST, 'assets/vendor/three/three.module.min.js'), encoding='utf-8').read()
for dep in sorted(set(re.findall(r'from\s*["\']\./([^"\']+)["\']', core))):
    save(THREE + dep, 'assets/vendor/three/' + dep)
js = open(os.path.join(DIST, cover), encoding='utf-8').read()
# import() in a classic script resolves against the script's own URL.
js = js.replace(THREE + 'three.module.min.js', '../../../../vendor/three/three.module.min.js')
open(os.path.join(DIST, cover), 'w', encoding='utf-8').write(js)

# --- Rewrite the document ---
# Analytics (Google Analytics, Leadfeeder) go.
html = must_sub(r'\s*<script async src="https://www\.googletagmanager\.com/[^"]*"></script>\s*<script>\s*window\.dataLayer[\s\S]*?</script>', '\n', html)
html = must_sub(r'\s*<script>\s*\(function \(ss, ex\)[\s\S]*?</script>', '\n', html)
# Assets become relative to the page, so it works from any folder.
html = html.replace('"/assets/', '"assets/')
# Other site pages are not captured: they go to the public site.
html = re.sub(r'href="/([^"]*)"', rf'href="{ORIGIN}/\1"', html)

leftover = re.findall(r'(?:href|src)="/[^"]*"', html)
if leftover:
    raise SystemExit(f'root-absolute references left: {sorted(set(leftover))}')
open(os.path.join(DIST, 'index.html'), 'w', encoding='utf-8').write(html)

with open(os.path.join(ROOT, 'assets-manifest.json'), 'w') as f:
    json.dump(manifest, f, indent=2, sort_keys=True)
print(len(manifest), 'assets')
