# Cloudflare Git Challenge recreation

A local capture of Cloudflare's “Build the next GitHub” competition page for design study.

- **Reference:** https://www.cloudflare.com/git-competition/
- **Page title:** Build the next GitHub | Cloudflare Challenge
- **Captured:** 2026-10-02 (America/New_York)
- **Run:** from this folder, `python3 -m http.server 8765 --directory dist`, then open `http://localhost:8765/`.
- **Review sizes:** 1280 × 900 desktop and 390 × 844 mobile.

## Structure and reuse

- `dist/index.html` preserves the source page's rendered section structure and copy.
- `dist/_astro/`, `dist/fonts/`, `dist/git-competition/`, `dist/icons.svg`, and `dist/favicon.ico` contain the page's local styles, scripts, fonts, illustrations, and icons.
- `assets-manifest.json` maps each mirrored file to its original URL.
- `tools/capture.py` rebuilds the capture from the live reference. It removes the analytics and consent SDK scripts while keeping the page runtime.

The reusable layout follows the original page's design tokens in `dist/_astro/_styles.j4nz2_GF.css` and page styles in `dist/_astro/index.Cm-titPL.css`. Its repeated groups are the step cards, finalist cards, buttons, and footer columns. The source breakpoints switch the header to a drawer and stack the cards at mobile widths.

## Sections and interactions

The page includes the Cloudflare navigation, challenge hero and playable Tetris field, “How it works” steps, rules link, finalist prize and experience sections, trademark note, and full footer. The menu, search panel, game controls, keyboard input, and theme behavior use locally mirrored scripts. Links outside this one-page capture lead to Cloudflare's public routes. Search results use Cloudflare's public search API when queried.

The reference privacy-choice button did not open a dialog during the capture, and the same control has no local consent service after removing the third-party consent SDK. The animated Tetris and finalist artwork will differ by frame from still reference screenshots.

This is a study copy. Cloudflare names, marks, copy, and visual assets belong to their owners. Replace them with licensed materials before publishing a derivative or using it commercially.
