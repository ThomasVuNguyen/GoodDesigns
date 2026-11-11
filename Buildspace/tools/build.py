#!/usr/bin/env python3
"""Make the captured buildspace pages runnable without remote design assets.

Six pages of buildspace.so are captured from their server-rendered Framer HTML.
This script localises every asset and Framer module, removes analytics, points
in-page links at the sibling local pages and writes ``dist/``.
"""

from concurrent.futures import ThreadPoolExecutor, as_completed
from hashlib import sha256
from html import unescape
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.error import HTTPError
from urllib.request import Request, urlopen
import json
import re

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "source"
DIST = ROOT / "dist"
ASSETS = DIST / "assets"
MODULES = DIST / "vendor" / "framer"
# Unmodified module bodies are kept so a rebuild always sees the original URLs.
RAW_MODULES = SOURCE / "modules"

SITE_PREFIX = "https://framerusercontent.com/sites/6CKNzZgBl1991Vxn1iOw2K/"
URL_RE = re.compile(r"https?://[^\s\"'<>\\)`,;]+")
IMPORT_RE = re.compile(r"(?:from\s*|import\s*\(|import\s*)[\"'`](\./[^\"'`]+\.mjs)[\"'`]")
# Framer resolves some images as new URL("assets/512/x.png", "<module url>").href.
NEW_URL_RE = re.compile(r"new URL\(\s*([\"'])([^\"']+)\1\s*,\s*([\"'])([^\"']+)\3\s*\)\.href")
DOMAINS = {"framerusercontent.com", "fonts.gstatic.com", "i.ytimg.com"}

# slug -> (source file, local page file, original route)
# Pages keep the live site's extensionless routes (see tools/serve.py and Firebase's
# cleanUrls), because Framer resolves "./faq" against the current route's directory:
# "/nw" + "./faq" is "/faq", but "/nw/" + "./faq" would be "/nw/faq".
PAGES = {
    "index": ("index.html", "index.html", ""),
    "letter": ("letter.html", "letter.html", "letter"),
    "nw": ("nw.html", "nw.html", "nw"),
    "faq": ("faq.html", "faq.html", "faq"),
    "hyper": ("hyper.html", "hyper.html", "hyper"),
    "demoday": ("demoday.html", "s4/demoday.html", "s4/demoday"),
}

# Routes that exist locally; every other captured link goes back to buildspace.so.
LOCAL_ROUTES = {route for _, _, route in PAGES.values()}
SITE_ORIGIN = "https://buildspace.so/"


def resolve_new_urls(text):
    """Fold new URL(rel, base).href into the absolute URL it resolves to."""
    return NEW_URL_RE.sub(
        lambda m: json.dumps(urljoin(m.group(4), m.group(2))), text)


def urls(text):
    return {unescape(match.group(0)) for match in URL_RE.finditer(text)
            if urlparse(unescape(match.group(0))).netloc in DOMAINS}


def module_path(url):
    return MODULES / url.removeprefix(SITE_PREFIX)


# A 1x1 transparent WebP. Deleted YouTube videos have no thumbnail on the live
# page either, so the empty card is reproduced rather than invented.
MISSING_PLACEHOLDER = bytes.fromhex(
    "524946461a000000574542505650384c0d0000002f00000010071011118888fe0700")
MISSING_THUMBS = set()


def asset_path(url):
    parsed = urlparse(url)
    suffix = Path(parsed.path).suffix or ".bin"
    if parsed.netloc == "i.ytimg.com":
        video_id = Path(parsed.path).parent.name
        return ASSETS / f"yt-{video_id}{suffix}"
    name = Path(parsed.path).stem[:28]
    digest = sha256(url.encode()).hexdigest()[:12]
    return ASSETS / f"{name}-{digest}{suffix}"


def fetch(url):
    if url.startswith(SITE_PREFIX) and urlparse(url).path.endswith(".mjs"):
        existing = RAW_MODULES / module_path(url).name
    else:
        existing = asset_path(url)
    if existing.exists() and existing.stat().st_size:
        return existing.read_bytes()
    req = Request(url, headers={"User-Agent": "Mozilla/5.0 (compatible; buildspace design-study capture)"})
    try:
        with urlopen(req, timeout=60) as response:
            return response.read()
    except HTTPError as exc:
        body = exc.read()
        if exc.headers.get("Content-Type", "").startswith("image/") and body:
            # Deleted YouTube videos answer 404 with a valid 120x90 "unavailable" image,
            # and Chromium paints that body. Keep it so the card looks like the live page.
            MISSING_THUMBS.add(url)
            return body
        raise RuntimeError(f"Could not download {url}") from exc
    except Exception as exc:
        raise RuntimeError(f"Could not download {url}") from exc


def replace_urls(text, relative_prefix):
    def replace(match):
        original = match.group(0)
        url = unescape(original)
        parsed = urlparse(url)
        if parsed.netloc not in DOMAINS or not Path(parsed.path).suffix:
            return original
        if url.startswith(SITE_PREFIX) and parsed.path.endswith(".mjs"):
            return relative_prefix + "vendor/framer/" + module_path(url).name
        return relative_prefix + "assets/" + asset_path(url).name
    return URL_RE.sub(replace, text)


# Framer's YouTube components build thumbnail URLs at runtime. The cards' own
# markup is localised by replace_urls, but the video modal asks i.ytimg.com again,
# so the template is pointed at the same local files (all captured thumbs are webp).
YOUTUBE_THUMB_RE = re.compile(
    r"`\$\{[A-Za-z_$][\w$]*\}\$\{([A-Za-z_$][\w$]*)\}/(?:hq|sd|maxres)default\.\$\{[A-Za-z_$][\w$]*\}`")


def localise_youtube_thumbs(body):
    return YOUTUBE_THUMB_RE.sub(lambda m: "`/assets/yt-${%s}.webp`" % m.group(1), body)


ANALYTICS_MARKERS = (
    "posthog",
    "dataLayer",
    "TiktokAnalyticsObject",
    "__framer_force_showing_editorbar",
    "report_posthog_click",
)
ANALYTICS_SRC = re.compile(
    r'<script[^>]+src="https://(?:www\.googletagmanager\.com|events\.framer\.com|analytics\.tiktok\.com)[^"]*"[^>]*></script>\s*')


def strip_analytics(html):
    html = ANALYTICS_SRC.sub("", html)

    def drop_script(match):
        if any(marker in match.group(3) for marker in ANALYTICS_MARKERS):
            return ""
        return match.group(0)

    html = re.sub(r"(<script([^>]*)>)(.*?)(</script>)", drop_script, html, flags=re.S)
    html = re.sub(r'<noscript><iframe src="https://www\.googletagmanager\.com/.*?</iframe></noscript>', "", html, flags=re.S)
    html = re.sub(r'<link href="https://fonts\.gstatic\.com" rel="preconnect" crossorigin>', "", html)
    return html


ROUTE_GUARD = r"""<script>
    // Routes outside this capture go to the live site; the six local routes are left
    // to Framer's own router, which resolves them exactly as the live site does.
    // SITE is the prefix this copy is served under: "" locally, "/sites/buildspace"
    // inside the gallery.
    (() => {
      const ROUTE = %s;
      const LOCAL = new Set(%s);
      const path = location.pathname.replace(/\/$/, '');
      const SITE = ROUTE ? (path.endsWith(ROUTE) ? path.slice(0, -ROUTE.length) : '') : path;
      document.addEventListener('click', (event) => {
        const anchor = event.target.closest && event.target.closest('a[href]');
        if (!anchor) return;
        const href = anchor.getAttribute('href');
        if (!href || /^(#|mailto:|tel:|https?:)/i.test(href)) return;
        const url = new URL(href, location.href);
        const rest = url.pathname.startsWith(SITE) ? url.pathname.slice(SITE.length) : url.pathname;
        if (LOCAL.has(rest.replace(/\/$/, '') || '/')) return;
        event.stopPropagation();
        anchor.setAttribute('href', 'https://buildspace.so' + rest);
      }, true);
    })();
    </script>"""


def rewrite_links(html):
    """Point the captured routes at their sibling files, everything else at buildspace.so."""
    def replace(match):
        prefix, href = match.group(1), match.group(2)
        if href.startswith("#") or href.startswith("mailto:") or href.startswith("http"):
            return match.group(0)
        if href.startswith("/assets/") or href.startswith("/vendor/"):
            return match.group(0)
        path = href[2:] if href.startswith("./") else href[3:] if href.startswith("../") else href.lstrip("/")
        if path.rstrip("/") in LOCAL_ROUTES:
            return match.group(0)
        return f'{prefix}="{SITE_ORIGIN}{path}"'

    return re.sub(r'(href|src)="((?:\./|\.\./|/)[^"]*)"', replace, html)


def main():
    ASSETS.mkdir(parents=True, exist_ok=True)
    MODULES.mkdir(parents=True, exist_ok=True)
    RAW_MODULES.mkdir(parents=True, exist_ok=True)

    sources = {slug: resolve_new_urls((SOURCE / src).read_text().replace("&amp;", "&"))
               for slug, (src, _, _) in PAGES.items()}

    # 1. Walk the Framer module graph reachable from every page.
    pending = set()
    for body in sources.values():
        pending |= {u for u in urls(body)
                    if u.startswith(SITE_PREFIX) and urlparse(u).path.endswith(".mjs")}
    module_data = {}
    while True:
        batch = pending - module_data.keys()
        if not batch:
            break
        with ThreadPoolExecutor(max_workers=12) as pool:
            futures = {pool.submit(fetch, url): url for url in batch}
            for future in as_completed(futures):
                url = futures[future]
                body = resolve_new_urls(future.result().decode("utf-8"))
                module_data[url] = body
                (RAW_MODULES / module_path(url).name).write_text(body)
        pending = set()
        for url in batch:
            for relative in IMPORT_RE.findall(module_data[url]):
                pending.add(SITE_PREFIX + relative.removeprefix("./"))

    # 2. Collect and download every referenced asset.
    all_urls = set()
    for body in sources.values():
        all_urls |= urls(body)
    for body in module_data.values():
        all_urls |= urls(body)
    asset_urls = {u for u in all_urls
                  if not (u.startswith(SITE_PREFIX) and urlparse(u).path.endswith(".mjs"))}
    asset_urls = {u for u in asset_urls if Path(urlparse(u).path).suffix in
                  {".woff2", ".woff", ".jpg", ".jpeg", ".png", ".webp", ".svg", ".json",
                   ".css", ".avif", ".gif", ".mp4", ".webm", ".ico", ".mp3", ".m4a",
                   ".wav", ".ogg", ".vtt", ".json", ".framercms"}}
    with ThreadPoolExecutor(max_workers=16) as pool:
        futures = {pool.submit(fetch, url): url for url in asset_urls}
        for future in as_completed(futures):
            url = futures[future]
            asset_path(url).write_bytes(future.result())

    # 3. Rewrite the module bodies (media URLs only; imports stay by filename).
    # Asset paths are root-absolute: modules are shared by pages at different depths,
    # and the gallery build prefixes "/assets" and "/vendor" with "/sites/<slug>".
    patched = 0
    for url, body in module_data.items():
        body = replace_urls(body, "/")
        body, count = YOUTUBE_THUMB_RE.subn(lambda m: "`/assets/yt-${%s}.webp`" % m.group(1), body)
        patched += count
        module_path(url).write_text(body)
    print(f"Patched {patched} YouTube thumbnail templates to local files")

    # 4. Rewrite each page.
    eager_images = """<script>
    (() => {
      const loadImages = () => document.querySelectorAll('img[loading="lazy"]')
        .forEach(image => { image.loading = 'eager' });
      loadImages();
      new MutationObserver(loadImages).observe(document.documentElement, {
        childList: true, subtree: true, attributes: true, attributeFilter: ['loading']
      });
    })();
    </script>"""
    for slug, (_, out_path, route) in PAGES.items():
        html = sources[slug]
        html = strip_analytics(html)
        html = replace_urls(html, "/")
        html = rewrite_links(html)
        guard = ROUTE_GUARD % (
            json.dumps("/" + route if route else ""),
            sorted({"/" if not r else "/" + r for _, _, r in PAGES.values()}),
        )
        if slug != "demoday":
            html = html.replace("</body>", eager_images + guard + "</body>")
        else:
            html = html.replace("</body>", guard + "</body>")
        html = "\n".join(line.rstrip(" \t") for line in html.splitlines()) + "\n"
        destination = DIST / out_path
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(html)
        print(f"{out_path}: {len(html) / 1e6:.1f} MB")

    manifest = {
        "reference": SITE_ORIGIN,
        "pages": {out_path: f"{SITE_ORIGIN}{route}" for _, out_path, route in PAGES.values()},
        "assets": {str(asset_path(url).relative_to(DIST)): url for url in sorted(asset_urls)},
        "framer_modules": sorted(module_path(url).name for url in module_data),
    }
    (ASSETS / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"Saved {len(asset_urls)} assets and {len(module_data)} Framer modules")
    if MISSING_THUMBS:
        print(f"{len(MISSING_THUMBS)} deleted-video thumbnails saved from YouTube's 404 placeholder image")


if __name__ == "__main__":
    main()
