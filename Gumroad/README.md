# Gumroad homepage recreation

A local capture of the Gumroad marketing homepage ("Go from 0 to $1") for design study.

- **Reference:** https://gumroad.com/
- **Page title:** Earn your first dollar online with Gumroad
- **Captured:** 2026-10-11 (America/New_York)
- **Run:** from the repository root, `python3 -m http.server 8851 --directory Gumroad/dist`, then open `http://localhost:8851/`.
- **Review sizes:** 1280 × 900 desktop and 390 × 844 mobile. Full-page height matches the reference exactly at both (7,825 px / 10,593 px); fewer than 0.3% of pixels differ, all in the animated coin/marquee/Lottie areas.
- **Checks (both viewports):** 0 console errors, no horizontal overflow, 0 requests to any external host. The "incomplete" images are `loading="lazy"` marquee icons that are equally incomplete on the live site.

## Structure and reuse

- `dist/index.html` — the server-rendered page, with Tailwind utility classes and the two inline scripts (hero coin parallax; mobile menu) left intact.
- `dist/assets/vite/assets/entrypoints/design-*.css` — the compiled Tailwind stylesheet and its design tokens (colors, ABC Favorit type scale, hard-shadow buttons).
- `dist/assets/fonts/` — ABC Favorit (Regular, Italic, Bold, Bold Italic) woff2.
- `dist/assets/images/` — illustrations, coins, creator portraits, category icons and logos.
- `dist/assets/ext/unpkg.com/…/lottie-player.js` — local copy of the Lottie player that animates `images/about/gumhead.json`.
- `assets-manifest.json` — maps each saved file to its source URL.
- `tools/capture.py` — rebuilds `dist/` from the live site.

## What the capture script changes

Cloudflare Rocket Loader, SRI hashes, the Cloudflare analytics beacon and DNS-prefetch hints are removed; every `assets.gumroad.com` and unpkg reference is rewritten to a local path. Site routes that are not captured (`/signup`, `/pricing`, `/discover`, …) point at the public gumroad.com URL.

## Known differences

- Only the homepage is captured; the marketplace search and the email-subscribe form post to gumroad.com.
- The dark-mode styles ship in the stylesheet but are driven by the viewer's `prefers-color-scheme`, as on the live site.

Gumroad names, marks, illustrations, creator portraits and copy belong to their owners. Replace them with licensed material before publishing a derivative or using it commercially.
