#!/usr/bin/env python3
"""Serve Reservoir/dist with clean URLs (/nodes -> nodes.html), as Firebase Hosting does.

Usage: python3 Reservoir/tools/serve.py [port]   (default 8864)
"""
import os, sys, http.server, functools

DIST = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'dist')


class Handler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        full = super().translate_path(path)
        if not os.path.exists(full) and os.path.exists(full + '.html'):
            return full + '.html'
        return full


port = int(sys.argv[1]) if len(sys.argv) > 1 else 8864
http.server.ThreadingHTTPServer(('', port), functools.partial(Handler, directory=DIST)).serve_forever()
