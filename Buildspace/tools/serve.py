#!/usr/bin/env python3
"""Static server for Buildspace/dist that mirrors Firebase Hosting's cleanUrls.

Pages are stored as ``letter.html`` but the live site's routes are extensionless
(``/letter``), and Framer's router resolves its relative links against the current
route. Serving ``/letter`` from ``letter.html`` keeps those URLs identical to the
live site, both in a browser and after a reload.

    python3 Buildspace/tools/serve.py [port]
"""

import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

DIST = Path(__file__).resolve().parents[1] / "dist"


class CleanUrlsHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIST), **kwargs)

    def translate_path(self, path):
        resolved = super().translate_path(path)
        candidate = Path(resolved)
        if candidate.is_dir():
            candidate = candidate / "index.html"
        if not candidate.exists():
            html = candidate.with_name(candidate.name + ".html")
            if html.exists():
                candidate = html
        return str(candidate)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt, *args):
        pass


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 4187
    print(f"http://localhost:{port}/  (serving {DIST})")
    ThreadingHTTPServer(("127.0.0.1", port), CleanUrlsHandler).serve_forever()
