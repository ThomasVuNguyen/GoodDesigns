#!/usr/bin/env python3
"""Turn the WIRED World Fair page into WiredWorldFair/dist.

Usage: python3 WiredWorldFair/tools/build.py [saved.html]

Without an argument the live page is fetched. WIRED serves the festival as an
embeddable fragment (scoped to .wwf-embed) inside its article template. The
fragment is kept as delivered and given a page of its own. The template's ads,
tracking, and site chrome are left out. The fragment's stylesheet, runtime,
fonts, and images are saved under dist/assets/ and pointed to locally.
"""

from __future__ import annotations

import json
import re
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import quote
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
PAGE = "https://www.wired.com/wiredworldfair/"
EMBED = "https://interactive.wired.com/wired-world-fair/assets/"
HOST_FONTS = "https://www.wired.com/.design/fonts/"
UA = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
}
CONTAINER = '<div class="interactive-override-container interactive-override-container--all">'
# The WIRED template rules that still reach the embed, found by diffing the
# computed style of every embed element and the template's :hover/:focus rules.
# Everything else the embed styles itself.
HOST_BODY = (
    "body{margin:0;-webkit-font-smoothing:antialiased;line-break:normal}"
    "img{border:0;max-width:100%;height:auto;vertical-align:bottom}"
    "pre{overflow:auto}"
    "a{transition-property:color,background,text-shadow;transition-duration:.2s;transition-timing-function:ease-in-out}"
    "a:hover,a:active{outline:0}"
    "button:hover,button:focus{text-decoration:underline}"
)

manifest: dict[str, dict[str, str]] = {}


def fetch(url: str) -> bytes:
    with urlopen(Request(url, headers=UA), timeout=120) as response:
        return response.read()


def save(url: str, rel: str, role: str) -> str:
    """Download url to dist/<rel> once and return rel."""
    path = DIST / rel
    if not path.exists() or path.stat().st_size == 0:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(fetch(url))
    manifest[rel] = {"role": role, "source": url}
    return rel


def extract_fragment(html: str) -> str:
    """The embed, from its container to the end of its <noscript> note."""
    start = html.index(CONTAINER) + len(CONTAINER)
    end = html.index("</noscript>", start) + len("</noscript>")
    return html[start:end]


def head_meta(html: str) -> dict[str, str]:
    title = re.search(r"<title>([^<]*)</title>", html).group(1)
    description = re.search(r'<meta name="description" content="([^"]*)"', html).group(1)
    return {"title": title, "description": description}


def decode_cf_email(hexstr: str) -> str:
    """Cloudflare's email obfuscation: the first byte is an XOR key for the rest."""
    data = bytes.fromhex(hexstr)
    return bytes(b ^ data[0] for b in data[1:]).decode()


def decode_emails(fragment: str) -> str:
    # The host's email-decode script would turn these into mailto: links on load.
    fragment = re.sub(
        r'<span class="__cf_email__" data-cfemail="([0-9a-f]+)">\[email&#160;protected\]</span>',
        lambda m: decode_cf_email(m.group(1)),
        fragment,
    )
    return re.sub(
        r'href="/cdn-cgi/l/email-protection#([0-9a-f]+)"',
        lambda m: f'href="mailto:{decode_cf_email(m.group(1))}"',
        fragment,
    )


def role_for(rel: str) -> str:
    folder = rel.split("/")[1]
    return {
        "fonts": "font",
        "site": "festival map texture",
        "speakers": "speaker portrait",
        "sponsors": "partner logo",
        "works": "experience image",
    }.get(folder, "asset")


def localize_embed(fragment: str) -> str:
    """Every embed asset keeps its published path under assets/."""
    urls = sorted(set(re.findall(re.escape(EMBED) + r'[^"\'\s)?]+', fragment)))
    urls = [u for u in urls if not u.endswith(("embed.css", "embed.js"))]

    def one(url: str) -> None:
        rel = "assets/" + url[len(EMBED):]
        save(url, rel, role_for(rel))

    with ThreadPoolExecutor(8) as pool:
        list(pool.map(one, urls))
    for url in sorted(urls, key=len, reverse=True):
        fragment = fragment.replace(url, "assets/" + url[len(EMBED):])

    css_url = re.search(re.escape(EMBED) + r"embed\.css\?v=\w+", fragment).group(0)
    # Fetched every run: the saved copy has its font URLs rewritten.
    css = fetch(css_url).decode()
    manifest["assets/embed.css"] = {"role": "embed stylesheet", "source": css_url}
    for font in sorted(set(re.findall(re.escape(EMBED) + r"fonts/[^\")]+", css))):
        rel = "assets/" + font[len(EMBED):]
        save(font, rel, "font")
        css = css.replace(font, "fonts/" + font.rsplit("/", 1)[1])
    (DIST / "assets/embed.css").write_text(css)
    fragment = fragment.replace(css_url, "assets/embed.css")

    # The fragment loads its runtime through an <img> onerror trick so the
    # template's sanitizer keeps it. Here it is a plain script.
    js_url = re.search(re.escape(EMBED) + r"embed\.js\?v=\w+", fragment).group(0)
    save(js_url, "assets/embed.js", "embed runtime")
    fragment = re.sub(r'<img src="' + re.escape(js_url) + r'"[^>]*>', '<script src="assets/embed.js"></script>', fragment)
    return fragment


def save_host_fonts() -> str:
    """The template's WIRED Mono Bold, which the schedule and ticket prices use.

    The embed's own stylesheet defines only the regular weight.
    """
    name = "WiredMono-Bold.woff2"
    save(HOST_FONTS + quote(f"WIRED Mono/{name}"), f"assets/fonts/{name}", "font (from the WIRED template)")
    return (
        '@font-face{font-family:"WIRED Mono";src:url("assets/fonts/WiredMono-Bold.woff2")format("woff2");'
        "font-weight:700;font-display:swap}"
    )


def page(meta: dict[str, str], fragment: str, host_fonts: str) -> str:
    fragment = fragment.replace('<meta charset="utf-8">\n', "", 1)
    return f"""<!doctype html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{meta["title"]}</title>
<meta name="description" content="{meta["description"]}">
<link rel="icon" href="assets/favicon.ico">
<style>{host_fonts}{HOST_BODY}</style>
</head>
<body>
<div id="app-root"><div>{CONTAINER}{fragment}
</div></div></div>
</body>
</html>
"""


def main() -> None:
    html = Path(sys.argv[1]).read_text() if len(sys.argv) > 1 else fetch(PAGE).decode()
    DIST.mkdir(exist_ok=True)
    meta = head_meta(html)
    fragment = extract_fragment(html)
    fragment = decode_emails(fragment)
    fragment = localize_embed(fragment)
    host_fonts = save_host_fonts()
    save("https://www.wired.com/verso/static/wired-us/assets/favicon.ico", "assets/favicon.ico", "favicon")
    out = page(meta, fragment, host_fonts)
    leftovers = sorted(set(re.findall(r'(?:src|srcset|href)="(https://(?:interactive|www)\.wired\.com/[^"]*\.(?:css|js|woff2|webp|png|svg|jpg))', out)))
    assert not leftovers, leftovers
    assert "cdn-cgi" not in out and "__cf_email__" not in out
    (DIST / "index.html").write_text(out)
    (ROOT / "assets-manifest.json").write_text(json.dumps(dict(sorted(manifest.items())), indent=2) + "\n")
    print(f"wrote dist/index.html, {len(manifest)} assets")


if __name__ == "__main__":
    main()
