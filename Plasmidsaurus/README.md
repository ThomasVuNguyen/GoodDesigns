# Plasmidsaurus homepage recreation

A local capture of the Plasmidsaurus homepage for design study.

- **Reference:** https://plasmidsaurus.com/
- **Page title:** Plasmidsaurus – Sequencing as a Service company
- **Captured:** 2026-10-02 (America/New_York)
- **Run:** from this folder, `python3 -m http.server 8771 --directory dist`, then open `http://localhost:8771/`.
- **Review sizes:** 1280 × 900 desktop and 390 × 844 mobile.

## Structure and reuse

- `dist/index.html` — the server-rendered page markup and copy (sections: `PageSection--mainHeader`, `iconMarquee`, `columnarExplainer`, `bigVideo`, `textCarousel`, `productFeature`, `interactiveResults`, `threeColumnFeature`, `oneColumnFeature`, `map`, `howTo`, `bigCta`, then `Footer`).
- `dist/assets/css/main.css` — the site stylesheet (Tailwind utilities plus the `Header-*`, `Button`, `PageSection`, `BlobBackground` and `Footer-*` components; colors and fonts are CSS variables at the top). `newsletter-form.css` and `overrides.css` are the only additions.
- `dist/assets/js/main.js` — the site bundle (GSAP, Swiper, nav, reveal and hero-title animation) and `jquery-3.7.1.min.js`.
- `dist/assets/fonts/` — Rubik and Inconsolata, local.
- `dist/assets/img`, `dist/assets/video` — every illustration, GIF, Instagram poster/reel and hero/how-to video the page uses.
- `dist/embed/plasmid_demo`, `dist/embed/dropbox_map` — the two React demo apps the page embeds as iframes, mirrored with their JS, CSS and sample GenBank files.
- `assets-manifest.json` — maps every saved file to its source URL.
- `tools/capture.py` — rebuilds `dist/` from the live site (`python3 Plasmidsaurus/tools/capture.py`); `tools/snapshot-form.mjs` regenerates the static newsletter-form snapshot (needs playwright + Chrome).

## Sections and interactions

Announcement bar, sticky header with hover mega-menus and a mobile slide-out menu, rotating hero title and animated plasmid map, service icon marquee, reveal-on-scroll sections, autoplaying videos, text carousel, interactive results demo ("Click to interact"), dropbox map demo, how-to steps, and the footer with newsletter form and Instagram slider. Responsive layout follows the site's Tailwind-style breakpoints (`md` 768 px and up is the desktop layout).

## Known differences

- Hero title, plasmid map, and footer slider are animated/time-driven, so any still frame differs from the live page.
- Internal links go to the public `plasmidsaurus.com` pages; only the homepage is captured.
- Removed: Cookiebot, Google Tag Manager, Mixpanel, VWO, Intercom, and the hidden `app.plasmidsaurus.com` login-state iframe. No request leaves localhost.
- The newsletter form is a static snapshot of HubSpot's rendered form; submitting does nothing.
- The embedded demo apps' API calls (feature flags, multimer analysis) return empty 404s, exactly as they do on the live page; React error #419 from the demo's streaming render is suppressed.
- `.Header { overflow-x: clip }` stops the closed mega-menu panels from adding sideways scroll (the live page scrolls ~80px sideways on desktop).

Plasmidsaurus names, marks, copy, illustrations, and Instagram media belong to their owners. Replace them with licensed material before publishing a derivative or using it commercially.
