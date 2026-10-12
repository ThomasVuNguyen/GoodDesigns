#!/usr/bin/env python3
"""Rebuild Gumroad/dist from the live https://gumroad.com/ homepage."""
import os, re, sys, json, urllib.request, urllib.parse, hashlib

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
DIST = os.path.join(ROOT, 'dist')
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124 Safari/537.36'}
manifest = {}

def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read()

def local_path(url):
    u = urllib.parse.urlparse(url)
    p = u.path.lstrip('/')
    if u.netloc == 'assets.gumroad.com':
        return 'assets/' + p
    return 'assets/ext/' + u.netloc + '/' + p

def save(url):
    rel = local_path(url)
    if rel not in manifest:
        out = os.path.join(DIST, rel)
        os.makedirs(os.path.dirname(out), exist_ok=True)
        data = get(url)
        open(out, 'wb').write(data)
        manifest[rel] = url
    return rel

html = get('https://gumroad.com/').decode()
os.makedirs(DIST, exist_ok=True)

# stylesheet(s)
for css_url in set(re.findall(r'https://assets\.gumroad\.com/[^"\']+\.css', html)):
    rel = save(css_url)
    css = open(os.path.join(DIST, rel)).read()
    base = css_url
    def furl(m):
        raw = m.group(2)
        if raw.startswith('data:') or raw.startswith('#'): return m.group(0)
        full = urllib.parse.urljoin(base, raw)
        if urllib.parse.urlparse(full).netloc != 'assets.gumroad.com': return m.group(0)
        return 'url(' + m.group(1) + '/' + save(full.split('?')[0].split('#')[0]) + m.group(1) + ')'
    css = re.sub(r'url\((["\']?)([^)"\']+)\1\)', furl, css)
    open(os.path.join(DIST, rel), 'w').write(css)

# lottie player + animation
lp = 'https://unpkg.com/@lottiefiles/lottie-player@2.0.12/dist/lottie-player.js'
save(lp)

# every other assets.gumroad.com reference in the HTML (strip HTML-escaped tails)
for u in sorted(set(re.findall(r'https://assets\.gumroad\.com/[A-Za-z0-9_./\-]+\.(?:svg|png|jpg|jpeg|webp|json|woff2|woff|ttf|ico|mp4|webm)', html))):
    save(u)

# rewrite
html = re.sub(r'https://assets\.gumroad\.com/[A-Za-z0-9_./\-]+', lambda m: '/' + local_path(m.group(0)), html)
html = html.replace(lp, '/' + local_path(lp))
# strip Cloudflare rocket loader, SRI, csrf and analytics-ish bits
html = re.sub(r'<script[^>]*rocket-loader[^>]*></script>', '', html)
html = re.sub(r'\s+integrity="[^"]*"', '', html)
html = re.sub(r'\s+crossorigin="[^"]*"', '', html)
html = re.sub(r'type="[0-9a-f]+-text/javascript"', '', html)
html = re.sub(r'<script[^>]*cloudflareinsights[^>]*>(</script>)?', '', html)
html = re.sub(r'<link rel="dns-prefetch"[^>]*>\n?', '', html)
# internal routes are not captured: send them to the public site
html = re.sub(r'(href|action)="/(?!assets/)([^"]+)"', r'\1="https://gumroad.com/\2"', html)
open(os.path.join(DIST, 'index.html'), 'w').write(html)
json.dump(manifest, open(os.path.join(ROOT, 'assets-manifest.json'), 'w'), indent=2, sort_keys=True)
print(len(manifest), 'assets')
