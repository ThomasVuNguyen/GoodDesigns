# Clone Website — Reference Examples

Real examples from the GoodDesigns repository showing how each implementation
path plays out in practice.

---

## Rendered-Page Capture: teenage engineering EP–35

**When this path was chosen:** The reference is a React Router app, but its
server-rendered HTML already contains the entire visible page. Keeping that
markup preserved geometry and copy better than rebuilding.

**What was done:**

1. Saved the server-rendered HTML and the page's own CSS files
   (`root.css`, `layout.css`, `te013.css`, component stylesheets).
2. Removed React, analytics, and tracking scripts (Google Tag Manager, Google
   Ads, Monotype tracking loader, `/_api/mw/track` pixel).
3. Re-implemented interactions locally in two JS files:
   - `page.js` — the hold-on typing effect and sign-up flow, run with a small
     `$` shim replacing the original framework.
   - `site.js` — pinwheel navigation physics, mobile header show/hide, menu,
     modal, search overlay, country selector.
4. Captured `<template>` elements from the live DOM for menu, modal, and search
   overlays (which only exist in the hydrated DOM, not the server markup).
5. Downloaded all fonts (`.woff2`), images (multi-resolution `.webp` tiles),
   SVGs, and the favicon into `dist/assets/`.
6. Created `assets/manifest.json` mapping each file to its role, size, and
   source URL.
7. Added `css/local.css` for local overrides (agree-button hover text color,
   focus rings).

**Folder structure:**

```
TeenageEngineeringEP35/
  README.md
  dist/
    index.html
    assets/
      css/*.css         (page's own stylesheets)
      css/local.css     (local overrides)
      js/page.js        (hold-on + sign-up scripts)
      js/site.js        (site interactions)
      data/search-index.json
      fonts/*.woff2
      img/              (tiles, SVGs, favicon)
      manifest.json
```

---

## Wayback Machine Recovery: Holly Li

**When this path was chosen:** The live site returned HTTP 402 (paywalled), so
the Internet Archive was the only source.

**What was done:**

1. Created a retry helper (`tools/wayback-fetch.sh`) that downloads from a
   specific Wayback snapshot with exponential backoff:
   ```bash
   #!/bin/bash
   for i in 1 2 3 4 5 6; do
     c=$(curl -sL -m 90 \
       "https://web.archive.org/web/20260612174030id_/https://www.thisishollyli.com$1" \
       -o "$2" -w "%{http_code}" 2>/dev/null)
     [ "$c" = 200 ] && [ -s "$2" ] && exit 0
     [ "$c" = 404 ] && [ $i -ge 2 ] && break
     sleep $((i*8))
   done
   echo "FAIL $1 ($c)"; rm -f "$2"; exit 1
   ```
2. Kept the Vite shell and React bundle as-is (the whole UI is rendered by a
   single JS bundle).
3. Made one edit to the bundle: added a `basename` for React Router so it works
   under the gallery's `/sites/<slug>` path.
4. Created `assets-manifest.json` mapping every saved file to its Wayback URL.

**Known differences documented in README:**

- Only a handful of images were archived — others show as broken/blank.
- Adobe Fonts and Google Fonts still load from CDNs.
- The site is desktop-only by design (shows a red notice below 768px).
- Sub-routes need a server that falls back to `index.html`.

---

## Asset Manifest Format

Each cloned site includes `assets-manifest.json` mapping local paths to source
URLs:

```json
{
  "/assets/airplane.png": "https://web.archive.org/web/20260612174030/https://www.thisishollyli.com/assets/airplane.png",
  "/fonts/YorickTrial-Regular.otf": "https://web.archive.org/web/20260612174030/https://www.thisishollyli.com/fonts/YorickTrial-Regular.otf",
  "/index.html": "https://web.archive.org/web/20260612174030/https://www.thisishollyli.com/"
}
```

Or with structured metadata (TE EP-35 style):

```json
{
  "role": "background tile, row 1",
  "size": "512×512",
  "source": "https://teenage.engineering/..."
}
```

---

## Gallery Entry Format

Each site needs an entry in `gallery/sites.json`:

```json
{
  "slug": "teenage-engineering-ep-35",
  "name": "teenage engineering EP–35",
  "folder": "TeenageEngineeringEP35",
  "reference": "https://teenage.engineering/products/ep-35",
  "tagline": "Life is fantastic! · one render whose shadow runs four screens...",
  "captured": "2026-10-29"
}
```

The `folder` field must match the actual directory name. The `slug` is used for
URL routing and thumbnail filenames.

---

## Browser Health Check Script

Run this at both desktop and mobile viewports before marking a clone complete:

```js
const brokenImages = [...document.images]
  .filter((img) => !img.complete || img.naturalWidth === 0)
  .map((img) => img.currentSrc || img.src);

const horizontalOverflow =
  document.documentElement.scrollWidth > window.innerWidth;

({ brokenImages, horizontalOverflow });
```

Both must pass: `brokenImages` empty, `horizontalOverflow` false, plus zero
console errors.
