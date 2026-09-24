# Aside homepage recreation

A self-contained static recreation of the Aside homepage for local design study.

- **Reference:** https://aside.com/
- **Captured:** 2026-09-24
- **Run:** `python3 -m http.server 8000 --directory dist` from this folder, then open `http://localhost:8000`.
- **Responsive review sizes:** 1280 × 900 desktop and 390 × 844 mobile.

## Structure

- `dist/index.html` — server-rendered page content and original layout.
- `dist/assets/` — locally stored page images, brand marks, fonts, and source stylesheets.
- `dist/app.js` — lightweight menu behavior for the static page.
- `dist/overrides.css` — menu behavior and reduced-motion support.

The two source stylesheets retain the original utility and component styles. The page's text, ordering, images, and layout come from its captured server-rendered HTML. The header menus and mobile navigation work locally; framework-driven benchmark chart transitions and remote product routes are not reproduced. The main content does not load code, fonts, or images from the reference host at runtime. Links to Aside's other pages remain outgoing links.

## Reuse and asset notes

The layout can be reused as a static page, and its source CSS defines the original color, typography, spacing, and responsive utility rules. Reusable UI pieces include the header navigation, browser mockup, feature sections, benchmark rows, security cards, and grouped footer links.

This is a local study copy. Aside names, copy, interface imagery, marks, and source fonts remain owned by their respective owners. Replace them with licensed materials before publishing a derivative or using it commercially. The original homepage and its routes may change after the capture date.
