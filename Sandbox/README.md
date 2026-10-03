# Cloudflare Sandbox SDK recreation

A local capture of the Cloudflare Sandbox SDK landing page for design study.

- **Reference:** https://sandbox.cloudflare.com/
- **Page title:** Sandbox SDK
- **Captured:** 2026-10-02 (America/New_York)
- **Run:** from this folder, `python3 -m http.server 8770 --directory dist`, then open `http://localhost:8770/`.
- **Review sizes:** 1280 × 900 desktop and 390 × 844 mobile.

## Structure and reuse

- `dist/index.html` — the page's server-rendered Astro markup, copy and inline SVG illustrations.
- `dist/_astro/` — the page stylesheet (Tailwind output, design tokens as CSS variables) and the React island scripts (`Header`, `features`, `example`, `footer`, `text-shadow`, `code-sample`, `grid`) with their shared runtime.
- `dist/fonts/` — Inter (variable, roman and italic) and IBM Plex Mono, both local.
- `assets-manifest.json` — maps every saved file to its source URL.
- `tools/capture.py` — rebuilds `dist/` from the live site (`python3 Sandbox/tools/capture.py`).

Reusable parts: the repeated outlined-title (`TextShadow`), the bordered grid cells with dotted/hatched fills, the corner-bracketed code panel, and the feature and testimonial cards. Colors and fonts are set through CSS variables in the stylesheet.

## Sections and interactions

Hero title and sticky header with copy-install button, intro with code panel and routed-path diagram, Features grid, Examples (tabbed code panel; stacked accordion on mobile), Testimonials, and the closing Get Started / install CTA. Copy buttons write to the clipboard and show a “Copied!” state. Responsive layout switches at Tailwind's `sm`, `md` and `lg` breakpoints (640/768/1024 px).

## Known differences

- Animated diagrams differ by frame from still screenshots.
- Links leave to the public Cloudflare/GitHub destinations; `og:` meta tags still name the reference URL.
- No analytics scripts were present, and none were added.

Cloudflare names, marks, copy and artwork belong to their owners. Replace them with licensed material before publishing a derivative or using it commercially.
