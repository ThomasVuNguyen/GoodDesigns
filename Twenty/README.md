# Twenty · Become a partner

A local capture of Twenty's partner program page for design study.

- **Reference:** https://twenty.com/partners/become
- **Page title:** Become a Twenty Partner — Join the Open Source CRM Ecosystem
- **Captured:** 2026-11-12
- **Run:** from the repository root, `python3 -m http.server 4174 --directory Twenty/dist`, then open `http://127.0.0.1:4174/`.
- **Rebuild:** `python3 Twenty/tools/capture.py` fetches the live page again and rewrites `dist/` and `assets-manifest.json`.

## How it is built

The page is a Next.js (Turbopack) app whose artwork is drawn live by three.js: the halftone hero photo, the testimonial portraits, the blue dashed quote mark you can drag, the rotating figure behind the FAQ, and the footer scene. A frozen DOM cannot reproduce those scenes, so this capture follows the same approach as `Whim/`. It keeps the server-rendered HTML with its RSC payload and every JS chunk, stylesheet, font, image and GLB model, so the original React app hydrates locally and renders the scenes from local files.

- `dist/index.html` — the server-rendered page and its RSC payload
- `dist/_next/static/` — JS chunks, stylesheets and the seven fonts (Host Grotesk, Aleo, Inter, Azeret Mono, VT323)
- `dist/images/` — halftone sources (hero, testimonials, promo, environment map), logo bar, Resources menu previews
- `dist/models/` — `quote.glb`, `faq.glb`, `footer.glb`, `hourglass.glb`
- `assets-manifest.json` — each saved file mapped to its source URL
- `tools/capture.py` — the capture script and every patch listed below

Design tokens and components live in the source's own CSS chunks under `dist/_next/static/chunks/*.css`, which are hashed class names. Use the rendered page and the screenshots as the reference for reuse, not the class names.

## What the capture script changes

- The `?dpl=` deployment query is stripped from every URL.
- Links to other twenty.com routes (Product, Pricing, Customers, Partners, Why Twenty, Apps, Releases, Halftone, Privacy, Terms, the logo) are made absolute. `next/link` then treats them as external, so it does not prefetch their RSC payloads (which would 404 locally) and a click opens the live page. The Resources menu still marks Partners as the current section.
- `usePathname()` is pinned to `/partners/become`, because the capture is served from `/` locally and `/sites/twenty-partners/` in the gallery.
- `next/image` is set to unoptimized, so the Resources menu previews load their original files.
- The partner application (`/api/partner-application`) and client brief (`/api/client-brief`) forms never send anything. Their submit call resolves as accepted locally.

## Sections and interactions

In order: header with the Resources dropdown, GitHub and Discord counts; hero ("Become our partner") with the halftone photo; the dark testimonial band (three quotes, prev/next, `1/3` counter, draggable quote mark); the "Trusted by" logo bar; Customer Stories; "Ready to grow with Twenty?"; the FAQ accordion over the rotating halftone figure; the footer with its language picker.

Verified on localhost against the live page: the Resources dropdown opens on hover, the testimonial carousel advances to `2/3`, FAQ items expand, "Become a partner" opens the five-step application dialog and validates each step, and the mobile menu opens and closes. The final submit was checked by reading the patched code, not by completing all five steps in a browser.

Breakpoints and responsive behavior come from the source stylesheets. At 390px the header collapses to a full-screen menu.

## Verification

- 1280 × 900 and 390 × 844, against fresh screenshots of the live page. Document heights match exactly: 5,518px desktop and 6,559px mobile.
- A pixel diff is identical outside the three.js scenes, which animate on their own clock. The FAQ figure is the clearest example: the same model at a different rotation.
- Both viewports have 0 console errors, 0 failed requests, 0 requests to any non-local host, no broken images, and no horizontal overflow. The same holds when the site is served under a `/sites/twenty-partners/` prefix with the gallery build's path rewrite applied.
- Screenshots: `screenshots/desktop.jpg`, `screenshots/mobile.jpg`.

## Known differences

- Other twenty.com routes are not captured; their links open the live site.
- Application and client-brief submissions go nowhere.
- The language picker links to the live localized pages.

Twenty's name, logo, copy, photography, 3D models, customer logos and testimonials belong to Twenty and the respective companies and people. They are kept here for private design study. Replace them with licensed material before publishing anything derived from this page.
