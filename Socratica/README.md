# Socratica homepage recreation

A local capture of the Socratica homepage for design study.

- **Reference:** https://socratica.info/
- **Page title:** Socratica
- **Captured:** 2026-10-02 (America/New_York)
- **Run:** from this folder, `python3 -m http.server 8791 --directory dist`, then open `http://localhost:8791/`.
- **Review sizes:** 1280 × 900 desktop and 390 × 844 mobile. Page height matches the reference at both (6156 px / 4175 px).

## Structure and reuse

- `dist/index.html` — the page's server-rendered Astro markup and copy.
- `dist/_astro/` — the stylesheet (design tokens as CSS variables), the hero doodle-switcher island and its React runtime, the hand-drawn doodle PNGs, and local fonts (Tiempos Headline, Geist, Geist Mono, FiveBySeven, Conte).
- `assets-manifest.json` — maps every saved file to its source URL.
- `tools/capture.py` — rebuilds `dist/` from the live site (`python3 Socratica/tools/capture.py`).

## Sections and interactions

Hero with the rotating outlined/doodle wordmark and "current art" credit, the "Dive deeper" smooth scroll, the full-screen nav overlay (open/close with fade), and the sections below through the footer. Screenshots match the reference below the hero at both sizes.

## Known differences

- The hero wordmark picks a random doodle on each load, so the hero differs between any two renders (reference included).
- The Cloudflare analytics beacon was removed.
- Internal links keep their public destinations (`socratica.info`, `map.socratica.info`, etc.).
- The reference logs one React hydration error (#418) from its own island; the local copy logs the same one.

Socratica names, marks, copy, fonts and artwork belong to their owners. Replace them with licensed material before publishing a derivative or using it commercially.
