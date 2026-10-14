#!/usr/bin/env python3
"""Rebuild TeamworkGraph/dist from the live https://teamworkgraph.com/ microsite.

The site is a client-rendered Parcel/React app. This keeps the original bundle and
mirrors every file in its Parcel bundle manifest, localizes fonts and the CSS reset,
removes OneTrust/Marketo, and adds assets/local/twg-local.js, which answers the few
API calls the page makes from a snapshot taken at capture time.
"""
import concurrent.futures as cf
import json
import os
import re
import urllib.request

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
DIST = os.path.join(ROOT, 'dist')
ASSETS = os.path.join(DIST, 'assets')
SITE = 'https://teamworkgraph.com'
DS_CDN = 'https://ds-cdn.prod-east.frontend.public.atl-paas.net/assets/'
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124 Safari/537.36'}
manifest = {}


def get(url, data=None, headers=None):
    req = urllib.request.Request(url, data=data, headers={**UA, **(headers or {})})
    return urllib.request.urlopen(req, timeout=60).read()


def save(url, rel, role):
    out = os.path.join(DIST, rel)
    if not (os.path.exists(out) and os.path.getsize(out)):
        os.makedirs(os.path.dirname(out), exist_ok=True)
        with open(out, 'wb') as f:
            f.write(get(url))
    manifest[rel] = {'role': role, 'source': url}
    return rel


html = get(SITE + '/').decode()
runtime_name = re.search(r'/assets/(index\.runtime\.[0-9a-f]+\.js)', html).group(1)
entry_name = re.search(r'/assets/(index\.[0-9a-f]+\.js)', html).group(1)
css_name = re.search(r'/assets/(index\.[0-9a-z]+\.css)', html).group(1)

# 1. Every file in the Parcel bundle manifest (entry, lazy icon chunks, images, CSS).
runtime = get(f'{SITE}/assets/{runtime_name}').decode()
names = set()
for m in re.finditer(r"JSON\.parse\('(\[.*?\])'\)", runtime):
    names.update(json.loads(m.group(1))[1::2])
names |= {runtime_name, css_name}
names |= set(re.findall(r'/assets/((?:favicon|apple-touch-icon)[^"]+\.png)', html))


def role_for(n):
    if n in (runtime_name, entry_name): return 'Parcel runtime / React app entry bundle'
    if n.endswith('.js'): return 'lazy Parcel chunk (mostly @atlaskit icons)'
    if n.endswith('.css'): return 'compiled stylesheet'
    if 'favicon' in n or 'apple-touch' in n: return 'favicon'
    return 'page image'


with cf.ThreadPoolExecutor(16) as ex:
    list(ex.map(lambda n: save(f'{SITE}/assets/{n}', f'assets/{n}', role_for(n)), sorted(names)))

# 2. Fonts and the Atlaskit CSS reset.
for sheet in ('atlassian-fonts', 'brand-fonts'):
    css = get(f'{DS_CDN}font-rules/v6/{sheet}.css').decode()
    for url in sorted(set(re.findall(re.escape(DS_CDN) + r'fonts/[^)\s]+', css))):
        save(url, 'assets/vendor/fonts/' + url[len(DS_CDN) + len('fonts/'):], 'font')
    css = css.replace(DS_CDN + 'fonts/', 'fonts/')
    os.makedirs(os.path.join(ASSETS, 'vendor'), exist_ok=True)
    open(os.path.join(ASSETS, 'vendor', sheet + '.css'), 'w').write(css)
    manifest[f'assets/vendor/{sheet}.css'] = {'role': 'Atlassian @font-face rules', 'source': f'{DS_CDN}font-rules/v6/{sheet}.css'}
for face in ('InterVariable', 'InterVariable-Italic'):
    save(f'https://rsms.me/inter/font-files/{face}.woff2?v=4.1', f'assets/vendor/fonts/inter/{face}.woff2', 'font')
open(os.path.join(ASSETS, 'vendor', 'inter.css'), 'w').write(
    '/* Inter (rsms.me/inter v4.1), trimmed to the variable font the page loads. "Inter" maps to the same file. */\n' + ''.join(
        f"@font-face{{font-family:{fam};font-style:{st};font-weight:100 900;font-display:swap;src:url('fonts/inter/{f}.woff2') format('woff2')}}\n"
        for fam in ('InterVariable', "'Inter var'", 'Inter')
        for st, f in (('normal', 'InterVariable'), ('italic', 'InterVariable-Italic'))))
save('https://unpkg.com/@atlaskit/css-reset@8.4.6/dist/bundle.css', 'assets/vendor/css-reset.css', 'Atlaskit CSS reset')

# 3. Bundle patches: the router works below a sub-path (/sites/<slug>/ in the gallery),
#    and Sentry stays off (it fetches through a clean iframe, which the shim cannot see).
PATCHES = [
    ('T=(0,l.createBrowserHistory)()', 'T=(0,l.createBrowserHistory)({basename:window.__TWG_BASE__||""})'),
    ('environment:e,enabled:"dev"!==e,', 'environment:e,enabled:!1,'),
]
entry_path = os.path.join(ASSETS, entry_name)
entry = open(entry_path).read()
for old, new in PATCHES:
    if old in entry:
        entry = entry.replace(old, new)
    elif new not in entry:
        raise SystemExit(f'patch target not found: {old}')
open(entry_path, 'w').write(entry)

# 4. API snapshot answered locally by twg-local.js.
snapshot = json.load(open(os.path.join(ROOT, 'tools', 'api-snapshot.json')))
snapshot.pop('_note', None)
snapshot['metricsGlobal'] = json.loads(get(SITE + '/gateway/api/twg-api/v1/microsite/metrics/global'))
shim_src = open(os.path.join(ROOT, 'tools', 'twg-local.template.js')).read()
os.makedirs(os.path.join(ASSETS, 'local'), exist_ok=True)
open(os.path.join(ASSETS, 'local', 'twg-local.js'), 'w').write(
    shim_src.replace('/*SNAPSHOT*/null', json.dumps(snapshot, separators=(',', ':'))))
manifest['assets/local/twg-local.js'] = {'role': 'local API snapshot + analytics blocker (generated from tools/twg-local.template.js)', 'source': 'local'}

# 5. Page shells. Each route has its own prerendered shell (title, description, canonical);
#    cli.html / benchmark.html are served at /cli and /benchmark by Firebase cleanUrls.
def localize(html):
    html = html.replace('<script src="/assets/' + runtime_name, '<script src="/assets/local/twg-local.js"></script><script src="/assets/' + runtime_name)
    html = html.replace('https://npmcdn.com/@atlaskit/css-reset/dist/bundle.css', '/assets/vendor/css-reset.css')
    html = html.replace('https://rsms.me/inter/inter.css', '/assets/vendor/inter.css')
    html = re.sub(r'<link rel="preconnect"[^>]*>', '', html)
    html = re.sub(r'<link rel="preload" href="https://ds-cdn[^"]+/fonts/([^"]+)"', r'<link rel="preload" href="/assets/vendor/fonts/\1"', html)
    html = re.sub(r'<link rel="preload stylesheet" href="https://ds-cdn[^"]+/font-rules/v6/([a-z-]+\.css)" as="style" crossorigin>',
                  r'<link rel="stylesheet" href="/assets/vendor/\1">', html)
    html = re.sub(r'<script src="https://atl-onetrust-wrapper[^>]*></script>', '', html)
    html = re.sub(r'<script type="text/plain" class="optanon-category-[^"]*">.*?</script>', '', html, flags=re.S)
    leftovers = re.findall(r'<(?:script|link)[^>]*(?:src|href)="(https?://[^"]+)"(?![^>]*rel="canonical")', html)
    leftovers = [u for u in leftovers if 'teamworkgraph.com/' not in u and 'atlassian.com/platform' not in u]
    if leftovers:
        raise SystemExit(f'unlocalized resources: {leftovers}')
    return html


open(os.path.join(DIST, 'index.html'), 'w').write(localize(html))
for route in ('cli', 'benchmark'):
    open(os.path.join(DIST, route + '.html'), 'w').write(localize(get(f'{SITE}/{route}').decode()))

json.dump(dict(sorted(manifest.items())), open(os.path.join(ROOT, 'assets-manifest.json'), 'w'), indent=1)
print(len(manifest), 'files')
