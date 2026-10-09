# Holly Li homepage recreation

A local capture of `thisishollyli.com` for design study, recovered from the Internet Archive because the live site now returns HTTP 402.

- **Reference:** https://www.thisishollyli.com/
- **Snapshot:** https://web.archive.org/web/20260612174030/https://www.thisishollyli.com/ (JS/CSS bundle from the 2026-02-11 capture)
- **Page title:** Holly Li.
- **Captured:** 2026-10-09 (America/New_York)
- **Run:** from this folder, `python3 -m http.server 8841 --directory dist`, then open `http://localhost:8841/` at a desktop width.

## Structure and reuse

- `dist/index.html` — the Vite shell; the whole UI is rendered by `dist/assets/index-5bb9e49e.js` (React + React Router).
- `dist/assets/index-0810e34d.css` — stylesheet and `@font-face` rules.
- `dist/fonts/`, `dist/assets/*.otf` — the display and text fonts that were archived.
- `assets-manifest.json` — maps each saved file to its Wayback URL.
- `tools/wayback-fetch.sh` — the retrying fetch helper used to pull files from the archive.

## What was changed

One edit to the bundle: the router gets a `basename` derived from `/sites/<slug>` so the app also works when served under the gallery path. At `/` it is empty.

## Known differences

- The Wayback Machine only holds a handful of the site's images (airplane, Athens Ohio, Odd Job, Warren Buffett, one AIOS shot); every other photo, GIF and project preview shows as a broken/blank image.
- The site is desktop-only by design: below 768 px wide it shows the author's red "desktop only" notice.
- Adobe Fonts (Typekit) and Google Fonts (Yorick/Fondamento) still load from their CDNs.
- Sub-routes (`/axis`, `/design`, …) work via in-app navigation; direct links need a server that falls back to `index.html`.

Holly Li's name, writing, artwork and fonts belong to their owners. Replace them with licensed material before publishing a derivative or using it commercially.
