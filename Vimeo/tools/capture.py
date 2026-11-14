#!/usr/bin/env python3
"""Rebuild Vimeo/dist from https://vimeo.com/.

vimeo.com is a server-rendered Next.js (App Router) page styled with styled-components and Tailwind. This script
keeps the server HTML and the Next.js flight data, the original stylesheets, the webpack runtime with every chunk it
can load, the web fonts, and every image, Lottie file and background video the page or its data references. The
page's own JavaScript (mega-menus, mobile menu, tabs, accordions, carousels, scroll animations) then runs from local
files. Tracking, consent, bot-detection and session endpoints are removed or answered locally (see shim.js).

Run from anywhere: python3 Vimeo/tools/capture.py   (CAPTURE_CACHE=<dir> reuses downloads between runs)
"""
import hashlib, html, json, os, re, shutil, subprocess, tempfile, urllib.parse, urllib.request

BASE = 'https://vimeo.com/'
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'}
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
OUT = os.path.join(ROOT, 'dist')
CACHE = os.environ.get('CAPTURE_CACHE')
CDN = 'https://f.vimeocdn.com/cms/_next/'
DEAD = 'data:video/mp4,'
# Vimeo-made films that open in a modal and are not DRM-protected play from local copies (tools/player.html).
# The other modal films (Vimeo's DRM-protected clips and the third-party Staff Picks) stay Vimeo embeds that load
# only when their modal opens.
LOCAL_PLAYERS = {'1070507470': '3ef796e429'}
manifest = {}
cache = {}
types = {}

EXT = {'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/avif': '.avif', 'image/gif': '.gif',
       'image/svg+xml': '.svg', 'video/mp4': '.mp4', 'application/json': '.json', 'font/woff2': '.woff2',
       'image/x-icon': '.ico', 'image/vnd.microsoft.icon': '.ico', 'text/plain': '.txt'}


def get(url):
    """Download url once (optionally through the on-disk cache). Returns (bytes, content type)."""
    if url not in cache:
        f = CACHE and os.path.join(CACHE, hashlib.sha1(url.encode()).hexdigest())
        if f and os.path.exists(f) and url != BASE:
            data = open(f, 'rb').read()
            ctype = open(f + '.type').read()
        else:
            r = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=120)
            data, ctype = r.read(), r.headers.get('content-type', '').split(';')[0].strip()
            if f and url != BASE:
                os.makedirs(CACHE, exist_ok=True)
                open(f, 'wb').write(data)
                open(f + '.type', 'w').write(ctype)
        cache[url] = (data, ctype)
    return cache[url]


def save(path, data, source):
    p = os.path.join(OUT, path)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'wb') as f:
        f.write(data)
    manifest[path] = source


def tag(query):
    """A short, stable suffix for a URL's query, so each size or crop variant is its own file."""
    return '.' + hashlib.sha1(query.encode()).hexdigest()[:8] if query else ''


# ---------------------------------------------------------------- media

def local_path(url):
    """The dist-relative path for a media URL, or None if it is not one we keep."""
    u = urllib.parse.urlsplit(url)
    host, path, q = u.netloc, u.path, u.query
    if host == 'f.vimeocdn.com' and path.startswith('/cms/'):
        return path.lstrip('/')
    if host == 'f.vimeocdn.com' and (path == '/logo.svg' or path.startswith('/svg/')):
        return 'f' + path
    if host == 'i.vimeocdn.com' and path.startswith(('/custom_asset/', '/favicon/', '/video/', '/portrait/')):
        return 'i' + path + tag(q) + '{ext}'
    if host == 'vimeo.bynder.com' and path.startswith(('/transform/', '/m/', '/asset/')):
        stem, ext = os.path.splitext(path)
        if path.startswith('/transform/'):
            stem, ext = path, ''
        return 'bynder' + urllib.parse.unquote(stem).replace(' ', '-') + tag(q) + (ext or '{ext}')
    if host == 'vimeo.com' and path.startswith('/icons/'):
        return path.lstrip('/')
    if host == 'player.vimeo.com' and path.startswith('/progressive_redirect/playback/'):
        parts = path.split('/')  # /progressive_redirect/playback/<id>/rendition/<r>/file.mp4
        return f'video/{parts[3]}-{parts[5]}.mp4' if len(parts) == 7 else None
    if host == 'player.vimeo.com' and path.startswith('/video/') and path.split('/')[2] in LOCAL_PLAYERS:
        return 'player/' + path.split('/')[2] + '.html'
    if host == 'fonts.gstatic.com':
        return 'fonts' + path
    return None


def local_media(url):
    """Download a media URL once and return its dist-relative path, or None to leave the URL alone."""
    url = url.rstrip('\\')
    if url in types:
        return types[url]
    path = local_path(url)
    if not path:
        return None
    if path.startswith('player/'):
        types[url] = path if save_player(path[7:-5]) else None
        return types[url]
    if path.startswith('cms/_next/'):
        save_next(path[len('cms/_next/'):])
        types[url] = path
        return path
    try:
        data, ctype = get(url)
    except Exception as e:
        print('skip', url, e)
        # Vimeo's 1440p renditions answer 403 on the live page too, which leaves their posters showing. An empty
        # data URL keeps that look without a failed request.
        types[url] = DEAD if '/progressive_redirect/' in url else None
        return types[url]
    if '{ext}' in path:
        path = path.replace('{ext}', EXT.get(ctype, '.bin'))
    if path not in manifest:
        save(path, data, url)
    types[url] = path
    return path


def save_player(vid):
    """Write player/<id>.html with the film (downloaded once with yt-dlp, 720p H.264) and its poster."""
    path = f'player/{vid}.html'
    if path in manifest:
        return True
    src = f'https://player.vimeo.com/video/{vid}?h={LOCAL_PLAYERS[vid]}'
    film = os.path.join(CACHE or tempfile.gettempdir(), f'player-{vid}.mp4')
    if not os.path.exists(film):
        subprocess.run(['yt-dlp', '-q', '--no-warnings', '--referer', BASE, '-f', 'bv*[height<=720][vcodec^=avc1]+ba/b[height<=720]',
                        '--merge-output-format', 'mp4', '-o', film, src], check=True)
    save(f'video/{vid}-720p.mp4', open(film, 'rb').read(), src)
    meta = json.loads(get(f'https://vimeo.com/api/oembed.json?url={urllib.parse.quote(f"https://vimeo.com/{vid}/{LOCAL_PLAYERS[vid]}", safe="")}')[0])
    poster = local_media(re.sub(r'_\d+x\d+', '_1280x720', meta['thumbnail_url']))
    page = open(os.path.join(ROOT, 'tools', 'player.html')).read()
    page = page.replace('{id}', vid).replace('{title}', html.escape(meta['title'])).replace('{poster}', '../' + poster)
    save(path, page.encode(), src)
    return True


# Absolute media URLs as they appear in HTML, in JSON (\/ and \u0026 escapes) and in JS string literals.
MEDIA = re.compile(r'https:(?:\\?/){2}(?:f\.vimeocdn\.com(?:\\?/)(?:cms|logo\.svg|svg)|i\.vimeocdn\.com|vimeo\.bynder\.com'
                   r'(?:\\?/)(?:transform|m|asset)|vimeo\.com(?:\\?/)icons|player\.vimeo\.com(?:\\?/)progressive_redirect'
                   r'|player\.vimeo\.com(?:\\?/)video(?:\\?/)(?:' + '|'.join(LOCAL_PLAYERS) + r')\b'
                   r'|fonts\.gstatic\.com)(?:\\?/)?(?:[^"\'\s,)<>\\`]|,(?![\s\d])|\\/|\\u0026|&amp;)*')


def localize(text, prefix=''):
    """Point every kept media URL in text at its local copy. prefix is the path from the text's file back to dist/."""
    def repl(m):
        raw = m.group(0)
        url = raw.replace('\\/', '/').replace('\\u0026', '&').replace('&amp;', '&')
        path = local_media(url)
        if not path:
            return raw
        out = path if path == DEAD else prefix + path
        if path.startswith('player/') and '?' in url:
            # keep the player query, escaped the way the source escaped it, so server and client markup match
            q = url.split('?', 1)[1]
            out += '?' + (q.replace('&', '&amp;') if '&amp;' in raw else q.replace('&', '\\u0026') if '\\u0026' in raw else q)
        return out.replace('/', '\\/') if '\\/' in raw else out
    return MEDIA.sub(repl, text)


# ---------------------------------------------------------------- Next.js flight data

def parse_flight(stream):
    """Split the flight stream into rows; T rows carry an explicit UTF-8 byte length."""
    buf, i, rows = stream.encode(), 0, []
    while i < len(buf):
        colon = buf.index(b':', i)
        rid = buf[i:colon].decode()
        if buf[colon + 1:colon + 2] == b'T':
            comma = buf.index(b',', colon)
            n = int(buf[colon + 2:comma], 16)
            rows.append([rid, 'T', buf[comma + 1:comma + 1 + n].decode()])
            i = comma + 1 + n
        else:
            nl = buf.index(b'\n', colon)
            rows.append([rid, '', buf[colon + 1:nl].decode()])
            i = nl + 1
    return rows


def serialize_flight(rows):
    out = []
    for rid, kind, text in rows:
        out.append(f'{rid}:T{len(text.encode()):x},{text}' if kind == 'T' else f'{rid}:{text}\n')
    return ''.join(out)


def push_script(payload):
    """A flight push, escaped the way Next.js escapes it for an inline script."""
    s = json.dumps([1, payload], ensure_ascii=False, separators=(',', ':'))
    s = s.replace('<', '\\u003c').replace('>', '\\u003e').replace('&', '\\u0026').replace('\u2028', '\\u2028').replace('\u2029', '\\u2029')
    return f'<script>self.__next_f.push({s})</script>'


# Relative site links become absolute, so clicks leave the capture for the live page instead of a missing local route.
def absolutize_links(text):
    text = re.sub(r'(href=")/(?!/)', r'\1https://vimeo.com/', text)
    text = re.sub(r'(\\?"href\\?":\\?")/(?!/)', r'\1https://vimeo.com/', text)
    return text


# ---------------------------------------------------------------- JavaScript and CSS

def css_var_urls(text):
    """url() inside a custom property resolves against the stylesheet that uses the var(), cms/_next/static/css/."""
    return re.sub(r'(--[\w-]+(?:\\?")?:(?:\\?")?url\()(?=(?:bynder|i|f|icons)/)', r'\1../../../../', text)


def fix_js(path, text):
    if os.path.basename(path).startswith('webpack-'):
        # chunks load relative to the page, so the folder works at / and under the gallery's /sites/vimeo/
        text = text.replace(f'.p="{CDN}"', '.p="cms/_next/"')
    text = text.replace(CDN, 'cms/_next/')
    text = text.replace('"https://player.vimeo.com/api/player.js"', '"player/api.js"')
    # useVimeoPlayerAudioTrack adds ?audiotrack= with new URL(src), which needs an absolute URL; local players are
    # page-relative, so resolve them against the page and hand them back relative.
    text = text.replace('n=new URL(t),i=r[a]||r.Default;return n.searchParams.set("audiotrack",i),n.toString()',
                        'n=new URL(t,document.baseURI),i=r[a]||r.Default;return n.searchParams.set("audiotrack",i),/^https?:/.test(t)?n.toString():t.split("?")[0]+n.search')
    # Live, a layout effect swaps the hero and "video solution" plan buttons for a single "Join free" button, but only
    # when the URL matches vimeo.com; test the live homepage URL instead so the capture shows the same buttons.
    text = text.replace('if(!a.test(window.location.href))return;', 'if(!a.test("https://vimeo.com/"))return;')
    text = text.replace('t.setAttribute("href","/join")', 't.setAttribute("href","https://vimeo.com/join")')
    # The Icon component builds "/icons/<name>.svg#<name>"; make it page-relative.
    text = text.replace('"/icons/".concat(', '"icons/".concat(')
    return localize(text)


def fix_css(path, text):
    depth = path.count('/')
    up = '../' * depth
    return localize(text, up)  # CDN font and image URLs go through save_next/local_media with the path back to dist/


def save_next(rel):
    """Save one file under cms/_next/ (rel is relative to _next/, e.g. static/chunks/x.js)."""
    path = 'cms/_next/' + rel
    if path in manifest:
        return
    data, _ = get(CDN + urllib.parse.quote(rel))
    if rel.endswith('.js'):
        data = fix_js(path, data.decode()).encode()
        for m in set(re.findall(r'static/(?:chunks|css|media)/[\w\-./()\[\]@]+?\.(?:js|css|woff2?|ttf|svg|png|jpg|webp)', data.decode())):
            save_next(m)
    elif rel.endswith('.css'):
        text = data.decode()
        for m in set(re.findall(r'url\(([^)]+)\)', text)):
            m = m.strip('\'"')
            if m.startswith('../media/'):
                save_next('static/media/' + m[9:])
        data = fix_css(path, text).encode()
    save(path, data, CDN + rel)


def all_chunks(webpack_js):
    """Every async chunk the webpack runtime can request, from its chunk-name and chunk-hash maps."""
    body = re.search(r'\.u=e=>(.*?),\w\.miniCssF', webpack_js, re.S).group(1)
    files = re.findall(r'"(static/chunks/[^"]+\.js)"', body)
    maps = re.findall(r'\(\{([^}]*)\}\)\[e\]', body)
    names = dict(re.findall(r'(\d+):"([^"]+)"', maps[0])) if len(maps) > 1 else {}
    hashes = dict(re.findall(r'(\d+):"([^"]+)"', maps[-1]))
    files += [f'static/chunks/{names.get(k, k)}.{h}.js' for k, h in hashes.items()]
    css = re.search(r'miniCssF=e=>"(static/css/[^"]+\.css)"', webpack_js)
    return files + ([css.group(1)] if css else [])


# ---------------------------------------------------------------- the page

def main():
    if os.path.isdir(OUT):
        shutil.rmtree(OUT)
    page, _ = get(BASE)
    page = page.decode()

    # Google Fonts (Fragment Mono) becomes a local stylesheet.
    def google_css(m):
        url = html.unescape(m.group(1))
        css = urllib.request.urlopen(urllib.request.Request(url, headers=UA)).read().decode()
        save('fonts/fragment-mono.css', localize(css, '../').encode(), url)
        return '<link href="fonts/fragment-mono.css" rel="stylesheet"/>'
    page = re.sub(r'<link href="(https://fonts\.googleapis\.com/css2[^"]+)" rel="stylesheet"/>', google_css, page)
    page = re.sub(r'<link rel="preconnect" href="https://fonts\.g[^"]+"[^>]*/>', '', page)

    # Flight data: parse, localize, absolutize links, drop the consent/tag-manager script, then re-emit as one push.
    pushes = re.findall(r'<script>self\.__next_f\.push\((\[1,.*?\])\)</script>', page, re.S)
    rows = parse_flight(''.join(json.loads(p)[1] for p in pushes))
    for row in rows:
        if row[1] == 'T' and 'CONSENT_REQUIRED' in row[2]:
            row[2] = '/* consent and tag manager removed for the local capture */'
        else:
            text = absolutize_links(localize(row[2]))
            # Script components for Elfsight and Transcend consent, and the Google Fonts preconnects, are dropped.
            text = re.sub(r'\["\$","\$L\w+",(?:null|"[^"]*"),\{"src":"https://(?:static\.elfsight\.com|transcend-cdn\.com)[^}]*\}\]', 'null', text)
            text = re.sub(r'\["\$","link","\d+",\{"rel":"preconnect","href":"https://fonts\.(?:googleapis|gstatic)\.com"[^}]*\}\]', 'null', text)
            text = re.sub(r'"href":"https://fonts\.googleapis\.com/css2[^"]*"', '"href":"fonts/fragment-mono.css"', text)
            text = text.replace('"p":"https://f.vimeocdn.com/cms"', '"p":"cms"')
            text = re.sub(r'\["\$","link","\d+",\{"rel":"(?:preconnect|dns-prefetch)","href":"//[^"]*"\}\]', 'null', text)
            row[2] = css_var_urls(text)
    first = True

    def replace_push(m):
        nonlocal first
        if first:
            first = False
            return push_script(serialize_flight(rows))
        return ''
    page = re.sub(r'<script>self\.__next_f\.push\(\[1,.*?\]\)</script>', replace_push, page, flags=re.S)

    # Tracking, consent, widgets and bot detection.
    page = re.sub(r'<script>\(self\.__next_s=self\.__next_s\|\|\[\]\)\.push\(\["https://(?:static\.elfsight\.com|transcend-cdn\.com)[^<]*</script>', '', page)
    page = re.sub(r'<script>\(self\.__next_s=self\.__next_s\|\|\[\]\)\.push\(\[0,\{"children":"\\n\(function \(\) \{\\n  var CONSENT_REQUIRED.*?</script>', '', page, flags=re.S)
    page = re.sub(r'<link rel="preload" href="https://(?:static\.elfsight\.com|transcend-cdn\.com)[^>]*/>', '', page)
    page = re.sub(r'<script>\(function\(\)\{window\[\'__CF\$cv\$params\'\].*?</script>', '', page, flags=re.S)
    page = re.sub(r'<script>window\.__CF\$cv\$params.*?</script>', '', page, flags=re.S)
    page = re.sub(r'<link rel="(?:preconnect|dns-prefetch)" href="//[^"]+"/>', '', page)

    # Next.js assets: every script and stylesheet in the page, plus every chunk the runtime can load.
    for rel in sorted(set(re.findall(r'https://f\.vimeocdn\.com/cms/_next/(static/[^"\\\s]+?\.(?:js|css|woff2|ttf))', page))):
        save_next(rel)
    webpack = next(p for p in manifest if '/chunks/webpack-' in p)
    for rel in all_chunks(get(CDN + webpack[len('cms/_next/'):])[0].decode()):
        try:
            save_next(rel)
        except Exception as e:
            print('skip chunk', rel, e)
    page = page.replace(CDN, 'cms/_next/').replace("assetPrefix: 'https://f.vimeocdn.com/cms'", "assetPrefix: 'cms'") \
               .replace("nextPublicAssetPrefix: 'https://f.vimeocdn.com/cms'", "nextPublicAssetPrefix: 'cms'")

    # Media in attributes (src, srcset, poster, preload hints) and the remaining HTML.
    page = css_var_urls(absolutize_links(localize(page)))

    # Icons the Icon component loads from /icons/ by name.
    for name in sorted(set(re.findall(r'\b(icon-[a-z0-9-]+)', page))):
        try:
            data, ctype = get(f'https://vimeo.com/icons/{name}.svg')
            if ctype == 'image/svg+xml':
                save(f'icons/{name}.svg', data, f'https://vimeo.com/icons/{name}.svg')
        except Exception:
            pass
    save('player/api.js', open(os.path.join(ROOT, 'tools', 'player-api.js'), 'rb').read(), 'local stand-in for https://player.vimeo.com/api/player.js')

    # The shim answers the session, logging and tag-manager endpoints locally and stops third-party beacons.
    shim = open(os.path.join(ROOT, 'tools', 'shim.js')).read()
    save('shim.js', shim.encode(), 'local')
    page = page.replace('<head>', '<head><script src="shim.js"></script>', 1)

    save('index.html', page.encode(), BASE)
    with open(os.path.join(ROOT, 'assets-manifest.json'), 'w') as f:
        json.dump(dict(sorted(manifest.items())), f, indent=1)
    print(len(manifest), 'files')


if __name__ == '__main__':
    main()
