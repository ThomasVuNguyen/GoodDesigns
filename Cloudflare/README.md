# Cloudflare homepage recreation

A local, self-contained capture of the Cloudflare homepage for design study.

- **Reference:** https://www.cloudflare.com/
- **Page title:** Cloudflare: Build for the agent era
- **Captured:** 2026-09-24
- **Run:** `python3 -m http.server 8000 --directory dist` from this folder, then open `http://localhost:8000/?theme=light`.
- **Responsive review sizes:** 1280 × 900 desktop and 390 × 844 mobile.

## Structure

- `dist/index.html` — captured server-rendered home page, with tracking removed.
- `dist/_astro/`, `dist/fonts/`, `dist/static/`, `dist/companies/`, and other root folders — locally mirrored stylesheets, page scripts, fonts, logos, and media.

The page preserves Cloudflare's captured page copy, layout, assets, and first-party page interactions. Its header menus, mobile menu, search panel, customer-story carousel, and pricing/product controls are driven by the locally mirrored page scripts. Analytics and consent SDK integrations were removed. Navigation links lead to Cloudflare's public routes, while the Cloudflare logo returns to the top of this local page.

## Reusable structure and responsive behavior

The page is a single server-rendered HTML document with Cloudflare's original CSS and page scripts. Its repeated pieces include the fixed navigation, full-width hero, regional network visualization, customer-story slider, pricing cards, developer plan comparison, CTA panel, and grouped footer. The captured stylesheet supplies the original color, type, spacing, and breakpoint tokens; mobile navigation and section stacking switch at the source breakpoints.

`assets-manifest.json` maps mirrored files to their source URLs. Page fonts, CSS, icons, customer marks, hero media, and scripts load from this folder. The clone targets the 1280 × 900 desktop and 390 × 844 mobile review sizes.

## Reuse and asset notes

This is a local study copy. Cloudflare names, copy, visual design, marks, customer logos, and media remain owned by their respective owners. Replace them with licensed materials before publishing a derivative or using it commercially. The original homepage and its routes may change after the capture date.
