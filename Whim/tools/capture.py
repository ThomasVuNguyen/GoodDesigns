#!/usr/bin/env python3
"""Rebuild Whim/dist from https://www.whim.com/.

Saves the server-rendered Next.js (Turbopack) page, its stylesheets, every JS chunk (found by scanning the page
and each chunk for /_next/static paths), fonts and images, so the original React app hydrates locally.
Run from anywhere: python3 Whim/tools/capture.py
"""
import os, re, json, subprocess, urllib.parse, urllib.request
BASE = 'https://www.whim.com'
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124.0 Safari/537.36'}
OUT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'dist'))
manifest = {}

def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA)).read()

def save(path, data):
    p = os.path.join(OUT, path.lstrip('/'))
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'wb').write(data)
    manifest[path] = BASE + path

html = get(BASE + '/').decode()

# next/image optimizer URLs -> the original file (the optimizer does not exist statically)
IMG = r'/_next/image\?url=[^"\'\s\\]*?(?:&amp;|&)w=\d+(?:&amp;|&)q=\d+(?:(?:&amp;|&)dpl=[A-Za-z0-9_]+)?'
def unopt(m):
    return urllib.parse.unquote(re.search(r'url=([^&\\"]+)', m.group(0)).group(1))
html = re.sub(IMG, unopt, html)

def patch_js(text):
    text = re.sub(IMG, unopt, text)
    text = re.sub(r'\?dpl=[A-Za-z0-9_]+', '', text)
    text = text.replace('dangerouslyAllowSVG:!1,unoptimized:!1}', 'dangerouslyAllowSVG:!1,unoptimized:!0}')
    # the capture is served under another pathname (e.g. /sites/whim/); pin usePathname() so server and client agree
    text = re.sub(r'return"u"<typeof window&&\w+&&\w+\("usePathname\(\)"\),\w+\}', 'return"/"}', text)
    # no analytics: PostHog is never loaded; the waitlist form posts to a local stub
    text = text.replace('["loadPostHog",0,function(){', '["loadPostHog",0,function(){return;')
    text = text.replace('https://new.fragileapi.com/integrations/whim/email-list', '/api/email-list.json')
    # testimonial videos live on Vercel Blob: served from /media/testimonials/
    text = text.replace('https://wzckrku31ojnbwei.public.blob.vercel-storage.com/testimonials', '/media/testimonials')
    return text

EXT = r'(?:css|js|woff2?|otf|ttf|png|jpe?g|webp|svg|avif|gif|ico|mp4|webm|json|webmanifest|glb|gltf|wasm|bin|hdr|ktx2|lottie)'
PATH = r'/(?:_next/static/[^"\'`\s\\)?]+|[A-Za-z0-9_./%-]+\.EXT)'.replace('EXT', EXT)
seen = set()
def crawl(p):
    p = urllib.parse.unquote(p.split('?')[0])
    if p in seen or p.startswith('//') or p in manifest: return
    seen.add(p)
    try: data = get(BASE + urllib.parse.quote(p))
    except Exception as e:
        print('skip', p, e); return
    if p.endswith(('.js', '.css')):
        text = data.decode('utf8', 'ignore')
        if p.endswith('.css'):  # url(../media/x.woff2) relative to the stylesheet
            for m in set(re.findall(r'url\((?:"|\')?(\.\./[^)"\'?#]+)', text)):
                crawl(os.path.normpath(os.path.join(os.path.dirname(p), m)))
        for m in set(re.findall(r'''["'`(](%s)''' % PATH, text)): crawl(m)
        for m in set(re.findall(r'''["'`](static/(?:chunks|media|immutable/chunks|immutable/media)/[^"'`\s\\)?]+\.(?:js|css|woff2?|png|svg))''', text)): crawl('/_next/' + m)
    if p.endswith('.js'):
        data = patch_js(data.decode('utf8', 'ignore')).encode()
    save(p, data)

for m in set(re.findall(r'''["'`(=](%s)''' % PATH, html)): crawl(m)
crawl('/favicon.ico')
for l in open(os.path.join(os.path.dirname(__file__), 'extra-assets.txt')):
    if l.strip(): crawl(l.strip())

# testimonial posters, captions and word timings are built from template strings, so scan the chunk for them
BLOB = 'https://wzckrku31ojnbwei.public.blob.vercel-storage.com'
for chunk in list(manifest):
    if not chunk.endswith('.js'): continue
    text = open(os.path.join(OUT, chunk.lstrip('/'))).read()
    if '/media/testimonials' not in text: continue
    dirs = dict(re.findall(r'\b([a-z])="(/business-v2/testimonials/thumbnail-refresh-[0-9-]+)"', text))
    for d in set(dirs.values()):
        for f in set(re.findall(r'`\$\{[a-z]\}/([A-Za-z0-9._-]+\.(?:jpg|png|webp))`', text)): crawl(d + '/' + f)
    for v in set(re.findall(r'`\$\{[a-z]\}/([A-Za-z0-9._-]+)\.mp4`', text)):
        for rel in ('%s.vtt' % v, 'word-timings/%s.json' % v): crawl('/business-v2/testimonials/' + rel)
        # originals total ~355 MB; re-encode to 540p so the capture stays small (skipped when already done)
        dest = os.path.join(OUT, 'media/testimonials/%s.mp4' % v)
        if not os.path.exists(dest):
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            src = dest + '.src'
            try:
                open(src, 'wb').write(get('%s/testimonials/%s.mp4' % (BLOB, v)))
                subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', src, '-vf', 'scale=-2:540', '-r', '24',
                                '-c:v', 'libx264', '-crf', '31', '-preset', 'medium', '-c:a', 'aac', '-b:a', '64k',
                                '-movflags', '+faststart', dest], check=True)
            except Exception as e: print('skip video', v, e)
            finally:
                if os.path.exists(src): os.remove(src)
        manifest['/media/testimonials/%s.mp4' % v] = '%s/testimonials/%s.mp4 (re-encoded to 540p)' % (BLOB, v)
save('/api/email-list.json', b'{"ok":true}')
save('/index.html', html.encode())
json.dump(manifest, open(os.path.join(os.path.dirname(OUT), 'assets-manifest.json'), 'w'), indent=1)
print(len(manifest), 'files saved to', OUT)
