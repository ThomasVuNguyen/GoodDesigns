# Arc Institute Tools

A local capture of the Arc Institute Tools Portal: the blue hero with its lab photo, the "New to Arc's tools?" band, the search-by-lab filter, and the illustrated tool cards for Software & Tools (Machine Learning, Bioinformatics) and Atlases.

- **Reference:** https://arcinstitute.org/tools
- **Page title:** Arc Tools Hub | Arc Institute
- **Captured:** 2026-10-16 (America/New_York)
- **Run:** from this folder, `python3 -m http.server 8871 --directory dist`, then open `http://localhost:8871/`.
- **Rebuild from the live site:** `python3 ArcInstitute/tools/capture.py`

## Structure and reuse

- `dist/index.html` — the server-rendered Next.js (pages router) document. The original React app hydrates locally.
- `dist/_next/static/` — the stylesheets (CSS modules, e.g. `ToolListItem_*`, `Hub_*`, `Hero_*`), the JS chunks the page loads, the hero photo and the card illustrations.
- `dist/fonts/` — Tiempos Headline (headings and wordmark) and IBM Plex Sans and Mono (`fonts/plex/plex.css`, a local copy of the Google Fonts stylesheet).
- `dist/data/sanity-navbar.json`, `sanity-banner.json` — the live site fetches the navbar and the announcement banner from Sanity after load. These are its two responses, and an inline shim at the top of `<head>` answers those requests from these files.
- `dist/images/` — the mega-menu photos from those responses, saved at 1600 px wide.
- `assets-manifest.json` — maps every saved file to its source URL.
- `tools/capture.py` — rebuilds `dist/`. The site redeploys and changes chunk hashes, so re-run the script rather than patching files. `tools/sanity-queries.json` holds the two Sanity query URLs.

The capture script changes the original code in these places:

- Google Analytics, Vercel Web Analytics and the Cloudflare beacon never load.
- `next/image` is set to `unoptimized`, so images load from their original files. There is no image optimizer on a static host.
- `usePathname()` returns the page route `/tools` rather than the serving URL. The layout drops its wrapper on `/`, so without this change the page fails to hydrate when served at `/`.
- Cloudflare's email obfuscation is replaced with the plain `mailto:` link React renders.

## Interactions

All of these work locally: the hover mega-menus (About, Programs, Science, Technology, Careers), closing the banner, the search-by-lab filter, and the mobile menu. Tool cards and other internal links open the matching page on arcinstitute.org in a new tab. Next.js route prefetching is turned off, because those pages are not captured.

## Verification (2026-10-16)

Desktop is 1280 × 900 and mobile is 390 × 844 @2x.

- The full-page screenshots are pixel-identical to the reference at both sizes. The page is 8,205 px tall on desktop and 10,741 px on mobile.
- The search filter (typing "Hsu"), the closed banner and the open mobile menu are pixel-identical to the reference. The open mega-menus differ only by JPEG recompression in the photo (0.1–0.5% of pixels).
- Desktop has no horizontal overflow. Mobile has the same 6 px horizontal overflow as the reference.
- At both sizes there are 0 console errors, 0 broken images and 0 requests to any other host.

## Licensing

Arc Institute's name, wordmark, copy, photography and illustrations belong to Arc Institute. Tiempos is a commercial typeface (Klim Type Foundry). Replace them with licensed material before publishing a derivative or using it commercially.
