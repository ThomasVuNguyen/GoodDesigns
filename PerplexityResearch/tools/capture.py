#!/usr/bin/env python3
"""Rebuild PerplexityResearch/dist/ from https://research.perplexity.ai/.

research.perplexity.ai is a host alias of www.perplexity.ai/hub/research, one route of Perplexity's marketing app: a
Vite (rolldown) build of a React app that the server renders and the browser hydrates. The server HTML carries the
whole page plus the route and the React Query state (`__PPL_INITIAL_SERVER_ROUTE__`, `__PPL_INITIAL_SERVER_DATA__`).
The script keeps all of it and runs it from local files:

- the server HTML, unchanged apart from the edits listed below
- every module in the app's module map (pplx-marketing-static.perplexity.ai/assets/), with the files those modules
  import and the stylesheet with its fonts
- the fonts, paper thumbnails and portrait on frontend-cdn.perplexity.ai/_agi_assets/ that the page uses
- the Sanity images of the Research journal and of the Resources menu, as local files
- the JSON answers of the API calls the page makes after hydration (tools/api/), which shim.js serves

What it changes:
- Module and asset URLs become root-absolute local paths (/assets/, /_agi_assets/, /sanity/images/...).
- Analytics never load: the count loader, Unify, the edge.perplexity.ai pixel and Cloudflare's challenge are removed
  from the HTML; Datadog RUM, Singular, Eppo and the app's own event calls are answered locally by shim.js.
- Links stay on perplexity.ai. Relative links to other routes (`/hub/...`) point at www.perplexity.ai.

Run from anywhere: python3 PerplexityResearch/tools/capture.py   (CAPTURE_CACHE=<dir> reuses downloads between runs)
"""
import concurrent.futures, hashlib, json, os, posixpath, re, shutil, subprocess, urllib.parse

PAGE = 'https://research.perplexity.ai/'
STATIC = 'https://pplx-marketing-static.perplexity.ai/assets/'
CDN = 'https://frontend-cdn.perplexity.ai/_agi_assets/'
SANITY = 'https://cdn.sanity.io/images/aqo64vfr/production/'
TOOLS = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(TOOLS)
OUT = os.path.join(ROOT, 'dist')
CACHE = os.environ.get('CAPTURE_CACHE')
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0 Safari/537.36'
manifest = {}


def get(url, headers=None):
    """Download with curl: Cloudflare in front of research.perplexity.ai turns Python's own HTTP client away (403)."""
    f = CACHE and os.path.join(CACHE, hashlib.sha1(url.encode()).hexdigest())
    if f and os.path.exists(f):
        return open(f, 'rb').read()
    cmd = ['curl', '-sSfL', '--retry', '3', '--max-time', '120', '-A', UA]
    for k, v in (headers or {}).items():
        cmd += ['-H', f'{k}: {v}']
    data = subprocess.run(cmd + [url], check=True, capture_output=True).stdout
    if f:
        os.makedirs(CACHE, exist_ok=True)
        open(f, 'wb').write(data)
    return data


def save(path, data, source):
    p = os.path.join(OUT, path.lstrip('/'))
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'wb').write(data if isinstance(data, bytes) else data.encode())
    if source:
        manifest[path] = source


def localize(text):
    """Point every URL of the three asset hosts at its local copy."""
    text = text.replace(STATIC, '/assets/').replace(CDN, '/_agi_assets/')
    # Sanity: the data's image URLs and the image-URL builder's base (it composes /images/<project>/<dataset>/<file>).
    text = text.replace('https://cdn.sanity.io/images/', '/sanity/images/').replace('`https://cdn.sanity.io`', '`/sanity/`')
    return re.sub(r'\n?//# sourceMappingURL=\S+\s*$', '\n', text)


def main():
    if os.path.exists(OUT):
        shutil.rmtree(OUT)
    html = get(PAGE).decode()

    # 1. The module graph. Start from every URL the entry lists (its module map covers the whole marketing app, so
    #    lazy routes, menus and dialogs resolve locally too), then follow each file's own imports.
    seen, queue, missing = set(), set(re.findall(re.escape(STATIC) + r'([\w./-]+\.\w+)', html)), []
    cdn_paths = set(re.findall(re.escape(CDN) + r'([\w./-]+\.\w+)', html))

    # Leave out the 50 translation bundles (about 31 MB). The entry loads one only for a locale other than en-US, whose
    # strings are built in, and the locale routes (/de, /ja, ...) are not part of this capture.
    entry = re.search(r'<script type="module" crossorigin src="' + re.escape(STATIC) + r'([\w.-]+)"', html).group(1)
    translations = re.findall(r'"[\w-]+":async\(\)=>\(await \w+\(async\(\)=>\{let\{default:e\}=await import\(`\./([\w.-]+)`\)',
                              get(STATIC + entry).decode())
    assert len(translations) > 40, 'translation map not found in ' + entry
    seen.update(translations)

    def fetch(name):
        try:
            return get(STATIC + name)
        except subprocess.CalledProcessError:
            return None

    while queue:
        batch, queue = sorted(queue - seen), set()
        seen.update(batch)
        with concurrent.futures.ThreadPoolExecutor(16) as pool:
            files = dict(zip(batch, pool.map(fetch, batch)))
        for name, data in files.items():
            if data is None:
                missing.append(name)
                continue
            if name.endswith(('.js', '.css', '.mjs')):
                text = data.decode()
                queue |= set(re.findall(re.escape(STATIC) + r'([\w./-]+\.\w+)', text))
                here = posixpath.dirname(name)
                for rel in re.findall(r'["\'`(](\.\.?/[\w./-]+\.(?:js|css|mjs|svg|png|webp|jpg|woff2?|ttf|json|wasm))', text):
                    queue.add(posixpath.normpath(posixpath.join(here, rel)))
                if name.endswith('.css'):
                    cdn_paths |= set(re.findall(re.escape(CDN) + r'([\w./-]+\.\w+)', text))
                save('/assets/' + name, localize(text), STATIC + name)
            else:
                save('/assets/' + name, data, STATIC + name)
        queue -= seen
    if missing:
        print('not served (left out):', *missing)
    print(f'{len(seen) - len(translations) - len(missing)} files from {STATIC}')

    # 2. frontend-cdn assets: the fonts the stylesheet declares, the images in the HTML, and the extra files the page
    #    requests at runtime (recorded in extra-assets.txt from the live page at 1280 and 390 px, scrolled top to bottom).
    extra = [l.strip() for l in open(os.path.join(TOOLS, 'extra-assets.txt')) if l.strip() and not l.startswith('#')]
    cdn_paths |= {u[len(CDN):] for u in extra if u.startswith(CDN)}
    with concurrent.futures.ThreadPoolExecutor(16) as pool:
        for p, data in zip(sorted(cdn_paths), pool.map(lambda p: get(CDN + p), sorted(cdn_paths))):
            save('/_agi_assets/' + p, data, CDN + p)
    print(f'{len(cdn_paths)} files from {CDN}')

    # 3. Sanity images. The page asks for them with sizing parameters (?w=720&q=80&fit=max&auto=format); the local
    #    copy is that rendition, saved under the asset's own file name. A static server ignores the query string.
    #    The rendition is the one the page requested at 1280 px (extra-assets.txt), so the journal's line drawings are
    #    scaled the same way; failing that, the HTML's src. Images the data names but the page never shows (the journal
    #    lists 7 of its 11 posts) are left out.
    sanity = {}
    for u in [*[u for u in extra if u.startswith(SANITY)], *re.findall(re.escape(SANITY) + r'[\w.-]+\?[^"\s\\]*', html)]:
        sanity.setdefault(urllib.parse.urlsplit(u).path.rsplit('/', 1)[1], u.replace('&amp;', '&'))
    for name, u in sorted(sanity.items()):
        data = get(u, {'Accept': 'image/webp,image/*'})
        save('/sanity/images/aqo64vfr/production/' + name, data, u)
    print(f'{len(sanity)} files from {SANITY}')

    # 4. The page itself.
    html = re.sub(r'<script async src="https://r2cdn\.perplexity\.ai/js/count/[^"]+"[^>]*></script>', '', html)
    html = html.replace('<script src="/unifyintent.js" async></script>', '')
    html = html.replace('<img src="https://edge.perplexity.ai/image" style="display:none" alt=""/>', '')
    html = re.sub(r'<script>\(function\(\)\{function c\(\)\{var b=a\.contentDocument.*?</script>', '', html, flags=re.S)
    html = re.sub(r'<link rel="preconnect"[^>]*>', '', html)
    html = re.sub(r'<link rel="alternate" hreflang[^>]*>', '', html)
    # Links to other routes of the marketing app open on www.perplexity.ai.
    html = re.sub(r'href="/(?!/|assets/|_agi_assets/|sanity/|favicon)', 'href="https://www.perplexity.ai/', html)
    html = localize(html)
    html = html.replace('<head>', '<head><script src="/shim.js"></script>', 1)
    save('/index.html', html, PAGE)

    for name in ('favicon.svg', 'favicon.ico'):
        save('/' + name, get('https://research.perplexity.ai/' + name), 'https://research.perplexity.ai/' + name)
    shutil.copy(os.path.join(TOOLS, 'shim.js'), os.path.join(OUT, 'shim.js'))
    # The Research journal list: the same data the HTML embeds, which the app asks for again after hydration.
    state = json.loads(re.search(r'window\.__PPL_INITIAL_SERVER_DATA__=(\{.*?\});window\.__PPL_INITIAL_SESSION__', html).group(1))
    landing = next(q['state']['data'] for q in state['queries'] if q['queryKey'][1] == 'sanity/blog/research')
    save('/api-snapshots/sanity-blog-landing.json', json.dumps(landing, ensure_ascii=False), None)
    for name in sorted(os.listdir(os.path.join(TOOLS, 'api'))):
        save('/api-snapshots/' + name, localize(open(os.path.join(TOOLS, 'api', name)).read()), None)

    json.dump(dict(sorted(manifest.items())), open(os.path.join(ROOT, 'assets-manifest.json'), 'w'), indent=1)
    print('wrote', OUT)


if __name__ == '__main__':
    main()
