#!/usr/bin/env bash
# Fetch the reference page's server-rendered HTML and stylesheets into $TOWN_SRC (default /tmp/town).
# These are third-party files, so they are kept outside the repository. Then run: python3 tools/build.py
set -euo pipefail
SRC="${TOWN_SRC:-/tmp/town}"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
mkdir -p "$SRC/css"
curl -fsSL -A "$UA" -o "$SRC/index.html" https://www.town.com/
grep -o 'href="/_next/static/[^"]*\.css"' "$SRC/index.html" | sed 's/href="//;s/"//' | sort -u | while read -r path; do
  curl -fsSL -A "$UA" -o "$SRC/css/$(basename "$path")" "https://www.town.com$path"
done
echo "Saved $(ls "$SRC/css" | wc -l | tr -d ' ') stylesheets and index.html to $SRC"
