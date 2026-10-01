#!/usr/bin/env python3
"""Make the captured Allia homepage runnable without remote design assets."""

from concurrent.futures import ThreadPoolExecutor, as_completed
from hashlib import sha256
from html import unescape
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, urlopen
import json
import re

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
ASSETS = DIST / "assets"
MODULES = DIST / "vendor" / "framer"
SOURCE = (ROOT / "source.html").read_text().replace("&amp;", "&")
SITE_PREFIX = "https://framerusercontent.com/sites/5Ol4wUIGjQ5Bwf3SSGYO4A/"
URL_RE = re.compile(r"https?://[^\s\"'<>\\)`,;]+")
IMPORT_RE = re.compile(r"(?:from\s*|import\s*\(|import\s*)[\"'`](\./[^\"'`]+\.mjs)[\"'`]")
DOMAINS = {"framerusercontent.com", "fonts.gstatic.com", "unpkg.com"}


def urls(text):
    return {unescape(match.group(0)) for match in URL_RE.finditer(text)
            if urlparse(unescape(match.group(0))).netloc in DOMAINS}


def fetch(url):
    if urlparse(url).path.endswith(".mjs") and url.startswith(SITE_PREFIX):
        existing = module_path(url)
    else:
        existing = asset_path(url)
    if existing.exists():
        return existing.read_bytes()
    req = Request(url, headers={"User-Agent": "Mozilla/5.0 (compatible; Allia design-study capture)"})
    try:
        with urlopen(req, timeout=45) as response:
            return response.read()
    except Exception as exc:
        raise RuntimeError(f"Could not download {url}") from exc


def module_path(url):
    return MODULES / url.removeprefix(SITE_PREFIX)


def asset_path(url):
    suffix = Path(urlparse(url).path).suffix or ".bin"
    name = Path(urlparse(url).path).stem[:28]
    digest = sha256(url.encode()).hexdigest()[:12]
    return ASSETS / f"{name}-{digest}{suffix}"


def replace_urls(text, relative_prefix):
    def replace(match):
        original = match.group(0)
        url = unescape(original)
        if urlparse(url).netloc not in DOMAINS or not Path(urlparse(url).path).suffix:
            return original
        if url.startswith(SITE_PREFIX) and urlparse(url).path.endswith(".mjs"):
            return relative_prefix + "vendor/framer/" + module_path(url).name
        return relative_prefix + "assets/" + asset_path(url).name
    return URL_RE.sub(replace, text)


def main():
    ASSETS.mkdir(parents=True, exist_ok=True)
    MODULES.mkdir(parents=True, exist_ok=True)
    source_urls = urls(SOURCE)
    module_urls = {u for u in source_urls if u.startswith(SITE_PREFIX) and urlparse(u).path.endswith(".mjs")}
    module_urls.add(SITE_PREFIX + "script_main.D19jTZn7.mjs")
    pending = module_urls.copy()
    module_data = {}
    while pending:
        batch = pending - module_data.keys()
        if not batch:
            break
        with ThreadPoolExecutor(max_workers=12) as pool:
            futures = {pool.submit(fetch, url): url for url in batch}
            for future in as_completed(futures):
                url = futures[future]
                module_data[url] = future.result().decode("utf-8")
        pending = set()
        for url in batch:
            body = module_data[url]
            for relative in IMPORT_RE.findall(body):
                dependency = SITE_PREFIX + relative.removeprefix("./")
                if dependency not in module_data:
                    pending.add(dependency)

    all_urls = source_urls.copy()
    for body in module_data.values():
        all_urls.update(urls(body))
    asset_urls = {u for u in all_urls if not (u.startswith(SITE_PREFIX) and urlparse(u).path.endswith(".mjs"))}
    # A preconnect target is a host, not a downloadable file.
    asset_urls = {u for u in asset_urls if Path(urlparse(u).path).suffix in
                  {".woff2", ".jpg", ".jpeg", ".png", ".webp", ".svg", ".json", ".css", ".avif", ".gif"}}
    with ThreadPoolExecutor(max_workers=16) as pool:
        futures = {pool.submit(fetch, url): url for url in asset_urls}
        for future in as_completed(futures):
            url = futures[future]
            asset_path(url).write_bytes(future.result())
    expected_assets = {asset_path(url) for url in asset_urls}
    for extra in ASSETS.iterdir():
        if extra.is_file() and extra.name != "manifest.json" and extra not in expected_assets:
            extra.unlink()

    for url, body in module_data.items():
        # The Framer chunks import one another by relative filename. Preserve those
        # imports and replace only external media URLs.
        # These URL literals become DOM attributes at runtime, so they resolve
        # against the page URL rather than the module file's location.
        module_path(url).write_text(replace_urls(body, "./"))

    html = SOURCE
    html = re.sub(r'<script>\(function\(w,d,s,l,i\).*?</script>', '', html, flags=re.S)
    html = re.sub(r'<script async src="https://events\.framer\.com/[^>]*></script>', '', html)
    html = re.sub(r'<script>try\{if\(localStorage\.getItem\("__framer_force_showing_editorbar_since"\).*?</script>', '', html, flags=re.S)
    html = re.sub(r'<noscript><iframe src="https://www\.googletagmanager\.com/.*?</iframe></noscript>', '', html, flags=re.S)
    html = re.sub(r'<link href="https://fonts\.gstatic\.com" rel="preconnect" crossorigin>', '', html)
    html = replace_urls(html, "./")
    # Only the homepage is cloned. These links intentionally open the public routes.
    html = re.sub(r'href="\./(?!assets/|vendor/|\")([^"]+)"', r'href="https://allia.health/\1"', html)
    # Framer defers images in inactive carousel slides and responsive variants.
    # Resolve them from the local bundle so every image is available offline.
    eager_images = '''<script>
    (() => {
      const loadImages = () => document.querySelectorAll('img[loading="lazy"]')
        .forEach(image => { image.loading = 'eager' });
      loadImages();
      new MutationObserver(loadImages).observe(document.documentElement, {
        childList: true, subtree: true, attributes: true, attributeFilter: ['loading']
      });
    })();
    </script>'''
    html = html.replace("</body>", eager_images + "</body>")
    html = "\n".join(line.rstrip(" \t") for line in html.splitlines()) + "\n"
    (DIST / "index.html").write_text(html)
    manifest = {"reference": "https://allia.health/", "assets": {
        str(asset_path(url).relative_to(DIST)): url for url in sorted(asset_urls)
    }, "framer_modules": sorted(module_path(url).name for url in module_data)}
    (ASSETS / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"Saved {len(asset_urls)} assets and {len(module_data)} Framer modules")


if __name__ == "__main__":
    main()
