"""Capture the server-rendered Cloudflare challenge page for local design study."""

from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path
from urllib.parse import unquote, urljoin, urlparse


SOURCE = "https://www.cloudflare.com/git-competition/"
ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
ASSET_ROOTS = ("/_astro/", "/fonts/", "/git-competition/icon-", "/git-competition/PaperMonoVariable.woff2", "/icons.svg", "/favicon.ico")
RESOURCE_RE = re.compile(
    r"(?:[\"'(=]|url\()(?:\\?\"|\\?')?"
    r"(?P<path>/(?:_astro/|fonts/|git-competition/(?:icon-|PaperMonoVariable\.woff2)|icons\.svg|favicon\.ico)[^\"'\s)<>\\]*)"
)
RELATIVE_MODULE_RE = re.compile(r"(?:from\s*|import\s*\(|import\s*|new URL\s*\()\s*[\"'](?P<path>\.{1,2}/[^\"']+)[\"']")
CSS_URL_RE = re.compile(r"url\(\s*[\"']?(?P<path>[^)\"']+)")


def fetch(url: str) -> bytes:
    result = subprocess.run(
        ["curl", "--fail", "--location", "--silent", "--show-error", url],
        capture_output=True,
        check=True,
    )
    return result.stdout


def local_path(url: str) -> Path | None:
    parsed = urlparse(url)
    if parsed.netloc and parsed.netloc != "www.cloudflare.com":
        return None
    path = parsed.path
    if not path.startswith(ASSET_ROOTS):
        return None
    target = DIST / unquote(path).lstrip("/")
    return target if target.resolve().is_relative_to(DIST.resolve()) else None


def strip_tracking(html: str) -> str:
    def script_replacer(match: re.Match[str]) -> str:
        tag = match.group(0)
        tracking = (
            "otSDKStub.js",
            "/_b/v/latest/entry.js",
            "zarazScriptSrc",
            "window.redwood=",
            "var OneTrust=",
            "document.modelContext",
        )
        return "" if any(marker in tag for marker in tracking) else tag

    html = re.sub(r"<script\b[^>]*>[\s\S]*?</script>", script_replacer, html)
    html = re.sub(r'<link rel="preconnect" href="https://(?:imagedelivery\.net|ot\.www\.cloudflare\.com)"[^>]*>', "", html)

    # Routes outside this one-page capture continue to Cloudflare's public site.
    html = re.sub(
        r'(<a\b[^>]*?\bhref=")(/[^"#]+)(")',
        lambda m: m.group(1) + "https://www.cloudflare.com" + m.group(2) + m.group(3),
        html,
    )
    # Astro hydrates the shared menus after parsing, so correct their links too.
    html = html.replace(
        "</body>",
        """<script>
        (() => {
          const fixLinks = () => document.querySelectorAll('a[href^="/"]').forEach((link) => {
            link.href = 'https://www.cloudflare.com' + link.getAttribute('href');
          });
          fixLinks();
          new MutationObserver(fixLinks).observe(document.body, {childList: true, subtree: true});
        })();
        </script></body>""",
    )
    return html


def references(text: str, base: str) -> set[str]:
    urls = {urljoin(SOURCE, m.group("path")) for m in RESOURCE_RE.finditer(text)}
    if base.endswith(".css"):
        urls |= {urljoin(base, m.group("path")) for m in CSS_URL_RE.finditer(text)}
    if base.endswith(".js"):
        urls |= {urljoin(base, m.group("path")) for m in RELATIVE_MODULE_RE.finditer(text)}
    return {url for url in urls if local_path(url) is not None}


def main() -> None:
    DIST.mkdir(parents=True, exist_ok=True)
    source = fetch(SOURCE).decode("utf-8")
    html = strip_tracking(source)
    (DIST / "index.html").write_text(html)

    pending = list(references(html, SOURCE))
    seen: set[str] = set()
    manifest: list[dict[str, str]] = []
    failures: list[str] = []
    while pending:
        url = pending.pop()
        if url in seen:
            continue
        seen.add(url)
        target = local_path(url)
        if target is None:
            continue
        try:
            data = fetch(url)
        except subprocess.CalledProcessError as error:
            failures.append(f"{url}: {error.stderr.decode().strip()}")
            continue
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(data)
        manifest.append({"path": str(target.relative_to(DIST)), "source": url})
        if target.suffix in {".js", ".css"}:
            pending.extend(references(data.decode("utf-8", errors="replace"), url) - seen)

    (ROOT / "assets-manifest.json").write_text(json.dumps(sorted(manifest, key=lambda x: x["path"]), indent=2) + "\n")
    print(f"Captured {len(manifest)} local assets")
    if failures:
        print("Failed assets:\n" + "\n".join(failures))


if __name__ == "__main__":
    main()
