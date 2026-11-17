#!/usr/bin/env python3
"""Rebuild ScribeOptimize/dist/ from https://scribe.com/optimize.

scribe.com is a Webflow site. The published HTML holds the whole page; Webflow's runtime (jQuery, the Webflow/IX2
chunks), GSAP + ScrollTrigger, Swiper, the Mast component scripts (accordion, modal, slider, inline video, tabs) and the
page's own inline scripts (nav dropdowns, nav colour on scroll, the lazy <lottie-player>, the feature accordions, the
AI-curve slider) run it. The script keeps all of that and runs it from local files:

- the published HTML, with its inline scripts
- the Webflow stylesheet and its fonts, every image, icon and Lottie JSON the page references
- the Webflow scripts, GSAP, jQuery, Swiper, the Mast scripts and lottie-web (pinned versions)
- the two customer videos, re-encoded to 1280 px H.264 so they fit in git (the originals are 193 MB and 75 MB)

What it changes:
- Tracking never loads: Intellimize, VWO (Wingify), OneTrust, Google Tag Manager, Mixpanel, Influ2, Navattic, the
  Cloudflare challenge script, the click tracker and the Mixpanel link decorator are removed, with their
  preconnect / preload / prefetch / prerender hints.
- The Phosphor icon stylesheet is dropped: no element on the page uses it.
- Root-relative route links open on the live site (https://scribe.com/...). In-page anchors stay.
- Every asset reference is relative (assets/...), so the page works at / and under /sites/<slug>/.

Run from anywhere: python3 ScribeOptimize/tools/capture.py   (CAPTURE_CACHE=<dir> reuses downloads between runs)
"""
import hashlib, json, os, re, shutil, subprocess, tempfile, time, urllib.parse, urllib.request

PAGE = 'https://scribe.com/optimize'
LIVE = 'https://scribe.com'
WF = 'https://cdn.prod.website-files.com'
SITE = '6a0c94b351f88b926e7c69db'
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
OUT = os.path.join(ROOT, 'dist')
CACHE = os.environ.get('CAPTURE_CACHE')
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0 Safari/537.36'}

# Third-party libraries, pinned to what the floating tags resolved to on the capture date.
LIBS = {
    'https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=' + SITE: 'assets/js/jquery-3.5.1.min.js',
    'https://cdn.jsdelivr.net/gh/nocodesupplyco/mast@b014a1b/accordion.min.js': 'assets/js/mast/accordion.min.js',
    'https://cdn.jsdelivr.net/gh/nocodesupplyco/mast@e3479b3/modal.min.js': 'assets/js/mast/modal.min.js',
    'https://cdn.jsdelivr.net/gh/nocodesupplyco/mast@latest/slider.min.js': 'assets/js/mast/slider.min.js',
    'https://cdn.jsdelivr.net/gh/nocodesupplyco/mast@latest/inline-video.min.js': 'assets/js/mast/inline-video.min.js',
    'https://cdn.jsdelivr.net/gh/nocodesupplyco/mast@latest/tabs.min.js': 'assets/js/mast/tabs.min.js',
    'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js': 'assets/js/swiper-bundle.min.js',
    'https://cdn.jsdelivr.net/npm/lottie-web@5.13.0/build/player/lottie_svg.min.js': 'assets/js/lottie_svg.min.js',
}
# The floating tags above, resolved through jsDelivr's API so the README can name the version saved.
RESOLVE = {'gh/nocodesupplyco/mast': 'latest', 'npm/swiper': '11'}
VIDEOS = {
    'https://colony-labs-public.s3.us-east-2.amazonaws.com/videos/06_Customer+Video_Elliot+v6.mp4': 'assets/video/customer-elliot.mp4',
    'https://colony-labs-public.s3.us-east-2.amazonaws.com/videos/02_Customer+Video_Brian+v6.mp4': 'assets/video/customer-brian.mp4',
}
WF_CHECKBOX = ('https://d3e54v103j8qbb.cloudfront.net/static/custom-checkbox-checkmark.589d534424.svg',
               'assets/images/custom-checkbox-checkmark.svg')
manifest = {}


def get(url):
    f = CACHE and os.path.join(CACHE, hashlib.sha1(url.encode()).hexdigest())
    if f and os.path.exists(f):
        return open(f, 'rb').read()
    for attempt in range(4):
        try:
            data = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=600).read()
            break
        except Exception:
            if attempt == 3:
                raise
            time.sleep(3)
    if f:
        os.makedirs(CACHE, exist_ok=True)
        open(f, 'wb').write(data)
    return data


def save(path, data, source, role):
    p = os.path.join(OUT, path)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'wb').write(data)
    manifest[path] = {'source': source, 'role': role}


def local_name(url):
    """cdn.prod.website-files.com URL -> path under dist/."""
    u = urllib.parse.urlsplit(url)
    parts = u.path.lstrip('/').split('/')
    name = re.sub(r'[^A-Za-z0-9._-]+', '-', urllib.parse.unquote(parts[-1]))
    if parts[0] == 'gsap':
        return 'assets/js/gsap/' + name
    if parts[1:2] == ['js']:
        return 'assets/js/webflow/' + name
    if parts[1:2] == ['css']:
        return 'assets/css/' + name
    ext = name.rsplit('.', 1)[-1].lower()
    folder = {'woff2': 'fonts', 'woff': 'fonts', 'ttf': 'fonts', 'otf': 'fonts', 'json': 'lottie'}.get(ext, 'images')
    return f'assets/{folder}/{name}'


def role_of(path):
    return {'fonts': 'font', 'lottie': 'Lottie animation', 'images': 'image', 'css': 'Webflow site stylesheet'}.get(
        path.split('/')[1], 'script')


WF_URL = re.compile(r'https://cdn\.prod\.website-files\.com/[^"\'\s,)<>\\]+')


def localize_wf(text, prefix=''):
    """Download every Webflow CDN URL in text and point it at the local copy (relative to prefix)."""
    def repl(m):
        url = m.group(0)
        path = local_name(url)
        if path not in manifest:
            data = get(url)
            if path.endswith('.css'):
                text = localize_wf(data.decode(), '../../')
                if WF_CHECKBOX[0] in text:
                    save(WF_CHECKBOX[1], get(WF_CHECKBOX[0]), WF_CHECKBOX[0], "Webflow's checkbox tick")
                    text = text.replace(WF_CHECKBOX[0], '../../' + WF_CHECKBOX[1])
                data = text.encode()
            save(path, data, url, role_of(path))
        return prefix + path
    return WF_URL.sub(repl, text)


def resolve_versions():
    out = {}
    for pkg, spec in RESOLVE.items():
        try:
            r = json.loads(get(f'https://data.jsdelivr.com/v1/packages/{pkg}/resolved?specifier={spec}'))
            # gh/nocodesupplyco/mast has no tags, so @latest is the default branch and the API names no version.
            out[pkg] = r.get('version') or f'@{spec} (untagged; the default branch on the capture date)'
        except Exception as e:
            out[pkg] = f'unresolved ({e})'
    return out


def save_libs(versions):
    for url, path in LIBS.items():
        src = url
        for pkg, spec in RESOLVE.items():
            if f'/{pkg}@{spec}/' in url and not versions[pkg].startswith(('@', 'unresolved')):
                src = url.replace(f'@{spec}/', f'@{versions[pkg]}/')
        save(path, get(src), src, 'script')


def transcode(url, path):
    """The originals are 1080p and 75-193 MB; re-encode to 1280 px wide H.264 (CRF 26) with AAC audio."""
    with tempfile.TemporaryDirectory() as tmp:
        src = os.path.join(tmp, 'in.mp4')
        dst = os.path.join(tmp, 'out.mp4')
        open(src, 'wb').write(get(url))
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-vf', "scale='min(1280,iw)':-2", '-c:v', 'libx264',
                        '-preset', 'slow', '-crf', '26', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '96k',
                        '-movflags', '+faststart', dst], check=True)
        save(path, open(dst, 'rb').read(), url, 'customer video (re-encoded)')


# Inline scripts removed, each identified by a fragment of its body or src.
DROP_SCRIPTS = [
    'intellimize_data_tracking_type',      # Intellimize opt-out flag
    'window.intellimize=',                 # Intellimize queue stub
    'cdn.intellimize.co/snippet',          # Intellimize loader
    '_wingify_code',                       # VWO, which hides <body> until it answers
    'cdn.cookielaw.org',                   # OneTrust consent
    'GTM-KHG3SC2',                         # Google Tag Manager
    'window.mixpanel = b',                 # Mixpanel
    'influ2.com/tracker',
    'js.navattic.com/embeds.js',           # no Navattic embed on this page
    'Delegated click tracking',            # calls mixpanel.track on [data-tracker] clicks
    'mixpanel.get_distinct_id',            # adds the Mixpanel id to scribehow.com links
    '/cdn-cgi/challenge-platform/',        # Cloudflare bot check
]


def strip_tracking(html):
    def script(m):
        tag = m.group(0)
        return '' if any(k in tag for k in DROP_SCRIPTS) else tag
    html = re.sub(r'<script\b[^>]*>.*?</script>', script, html, flags=re.S)
    # Resource hints for trackers and for routes the capture does not have.
    html = re.sub(r'<link\b[^>]*\brel="(?:preconnect|dns-prefetch|preload|prefetch|prerender)"[^>]*/?>', '', html)
    html = re.sub(r'<link\b[^>]*@phosphor-icons[^>]*>', '', html)
    html = html.replace(' data-wf-intellimize-customer-id="117373614"', '')
    return html


def localize_libs(html):
    for url, path in LIBS.items():
        html = html.replace(url, path)
    # Local scripts: drop SRI and CORS attributes (the lottie loader's own integrity check stays; the file is unchanged).
    html = re.sub(r'(<(?:script|link)\b[^>]*?)\s+integrity="[^"]*"', r'\1', html)
    html = re.sub(r'(<(?:script|link)\b[^>]*?)\s+crossorigin="[^"]*"', r'\1', html)
    # The lottie loader falls back to cdnjs if the first copy fails; the local copy is the only one.
    html = html.replace("\n      'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.13.0/lottie_svg.min.js',", '')
    for url, path in VIDEOS.items():
        html = html.replace(url, path)
    return html


def absolutize_links(html):
    # Route links (href="/pricing") open on the live site; "#" anchors and asset paths stay.
    return re.sub(r'(<a\b[^>]*?\bhref=")(/[^"]*)"', lambda m: m.group(1) + LIVE + m.group(2) + '"', html)


def main():
    if os.path.isdir(OUT):
        shutil.rmtree(OUT)
    html = get(PAGE).decode()
    html = strip_tracking(html)
    versions = resolve_versions()
    save_libs(versions)
    html = localize_libs(html)
    # og:image stays remote: it is metadata for link previews, not part of the page.
    og = re.search(r'<meta content="(https://cdn\.prod\.website-files\.com/[^"]+)" property="og:image"/>', html)
    if og:
        html = html.replace(og.group(0), og.group(0).replace(og.group(1), '\0OG\0'))
    html = localize_wf(html)
    if og:
        html = html.replace('\0OG\0', og.group(1))
    html = absolutize_links(html)
    for url, path in VIDEOS.items():
        transcode(url, path)
    save('index.html', html.encode(), PAGE, 'page')
    with open(os.path.join(ROOT, 'assets-manifest.json'), 'w') as f:
        json.dump({'captured_from': PAGE, 'resolved_versions': versions,
                   'files': dict(sorted(manifest.items()))}, f, indent=1)
    print(len(manifest), 'files saved to', OUT, versions)


if __name__ == '__main__':
    main()
