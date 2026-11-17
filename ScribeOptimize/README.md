# Scribe Optimize

A local capture of Scribe's Optimize product page for design study.

- **Reference:** https://scribe.com/optimize
- **Page title:** Scribe Optimize: AI-powered workflow intelligence
- **Captured:** 2026-11-16 (Webflow's "Last Published" stamp: Mon Nov 16 2026 16:57:50 GMT)
- **Run:** from the repository root, `python3 -m http.server 4321 --directory ScribeOptimize/dist`, then open `http://127.0.0.1:4321/`.
- **Rebuild:** `python3 ScribeOptimize/tools/capture.py` fetches the live page again and rewrites `dist/` and `assets-manifest.json`. It needs `ffmpeg` for the videos. Set `CAPTURE_CACHE=<dir>` to reuse downloads between runs.

## How it is built

scribe.com is a Webflow site, and the published HTML holds the whole page. The capture keeps that HTML and its inline scripts, and runs the page's own code from local files. Nothing is reimplemented. Desktop and mobile get the same HTML, and one responsive page covers both.

The scripts that run the page:

- jQuery 3.5.1 and the Webflow runtime chunks (nav, the AI-curve slider, IX2)
- GSAP 3.15 and ScrollTrigger (feature accordions, scroll reveals)
- Swiper 11 and the Mast component scripts from `nocodesupplyco/mast` (accordion, modal, slider, inline video, tabs)
- an inline `<lottie-player>` element that loads lottie-web 5.13.0 lazily and plays the Lottie JSONs
- inline scripts for the nav dropdown panel, the nav colour over dark sections and the feature accordions

## Folder structure

- `dist/index.html`: the published page, with tracking removed and asset paths made relative.
- `dist/assets/css/`: the Webflow site stylesheet (`marketing-mast.webflow.shared.*.min.css`).
- `dist/assets/fonts/`: ABC Diatype (Regular, Italic, Medium, Bold) and ABC Marist Regular.
- `dist/assets/images/`: logos, icons, nav thumbnails, textured backgrounds and portraits.
- `dist/assets/lottie/`: the hero circles, the feature-accordion animations and the AI roadmap animation. Their images are embedded as data URIs.
- `dist/assets/js/`: `webflow/` (runtime chunks), `gsap/`, `mast/`, jQuery, Swiper and lottie-web.
- `dist/assets/video/`: the two customer videos, re-encoded (see Known differences).
- `assets-manifest.json`: maps each saved file to its source URL and role, and records the versions the floating CDN tags resolved to.
- `tools/capture.py`: makes the capture and applies every change listed below.

Every asset path is relative (`assets/...`), so the page works at `/` and under `/sites/scribe-optimize/` without the gallery's path rewrite.

## What the capture script changes

- **Tracking:** these scripts are removed, with their preconnect, preload, prefetch and prerender hints:
  - Intellimize (Webflow Optimize)
  - VWO / Wingify, which hides `<body>` until it answers
  - OneTrust
  - Google Tag Manager
  - Mixpanel, plus the click tracker and the link decorator that call it
  - Influ2 and Navattic (the page has no Navattic embed)
  - the Cloudflare challenge script
- **Phosphor icons:** the unpkg stylesheet is dropped, because no element on the page uses it.
- **Libraries:** the CDN copies are saved locally. `swiper@11` resolved to 11.2.10. `mast@latest` has no tags, so the saved files are the default branch as jsDelivr served it on the capture date. The Lottie loader's cdnjs fallback is removed, because the local copy is the only one.
- **Links:** root-relative route links (`/pricing`, `/customers`, `/solutions/...`) point to `https://scribe.com/...`, so they open the live site. Links that were already absolute are unchanged.
- **og:image** stays a remote URL. It is link-preview metadata, not part of the page.

## Sections and interactions

In order:

1. **Header:**
   - the logo and Solutions, Product, Customers and Resources, each opening a shared dropdown panel on hover
   - Enterprise and Pricing
   - Sign in and Get started
   - Below 992 px the hamburger opens a full-screen menu with accordion groups.
2. **Hero:** "Your AI roadmap starts here. See, analyze, and improve how your business works.", with Request demo and Take a tour, and the looping circles Lottie.
3. **Logo bar:** "Trusted by 94% of the Fortune 500" and a scrolling logo row.
4. **Havas Media Network quote:** Elliot Bellanger, with the customer video (native controls).
5. **AI adoption curve:** "Wherever you are on the AI curve, go further, faster". It has the curve chart and a four-step Webflow slider (Discover, Centralize, Automate, Agents) with dots.
6. **Capture how work actually gets done:** a three-item feature accordion with the integrations Lottie.
7. **Understand how work really happens:** two Lottie cards (opportunities, top issues).
8. **Turn insight into impact:** a three-item feature accordion with the recommendations Lottie, and Request demo and Explore recommendations.
9. **Security and compliance, built in:** redaction, scale and compliance tiles, and More about security.
10. **New York Life quote:** Brian Williams, with the customer video.
11. **Use cases:** four cards (Drive AI transformation, Find what to automate, Cut costs across the stack, Build your business case) with Learn more buttons.
12. **Recommendations:** a six-item grid (Process standardization through Agentic automation).
13. **CTA card:** "Get your AI roadmap in 7 days", with the arrow artwork.
14. **Footer:** the compliance badges, the Get Scribe, Product, Company, Legal, Security, Follow Scribe and Follow our CEO columns, and the copyright row.

**Breakpoints:** Webflow's 991 / 767 / 479 px, plus a 1440 px+ rule. Below 768 px an inline script removes `.u-sm-d-none` on load, as it does live.

### Reusable parts

- **Tokens:** the stylesheet's `:root` holds the design system:
  - colours: `--_color---neutral--*` and `--global--*`
  - fluid type: `--_typography---h1`…`h6` and `paragraph-*`, built from min/max rem `clamp()`s between `--_layout---fluid--min` and `--fluid--max`
  - fonts: `--_typography---fonts--heading-font` (ABC Marist) and `primary-font` (ABC Diatype)
  - line heights: `--_typography---line-height--*`
- **Components:** Webflow component classes carry them:
  - `.header_navbar-component` / `[data-nav-dropdown]`: the nav and its panels
  - `.button` with `w-variant-*`: primary and secondary buttons
  - `.logo-garden_*`: the logo bar
  - `.feature-accordion_section` / `.accordion_item` / `.feature-accordion_img`: the feature accordions
  - `.slider.w-slider`: the AI-curve slider
  - `.lottie_component`: the Lottie embeds
  - `.section_spacer-component`: vertical rhythm

## Checks (2026-11-16)

These were run against live at 1280×900 and 390×844 in Chrome via Playwright:

- **Document heights** after a full scroll: 10,012 px and 14,408 px on both.
- **Full-page pixel diff:** differences only in animated areas, which were at different frames: the logo marquee position, the Lottie animations and the videos' buffered bars.
- **Console:** 0 errors on local.
- **Network:** no requests leave localhost, and no responses are ≥ 400.
- **Images:** 154 images, all of them forced to load: 0 broken. No horizontal overflow.
- **Interactions with the same results on live and local:**
  - all four nav dropdowns, with the same panel sizes: Solutions 849×288, Product 991×236, Customers 545×200 and Resources 522×238
  - the slider's right arrow, which moves to "2. Centralize"
  - the feature accordion: clicking the third item opens it and closes the first
  - the customer video plays
  - the mobile menu opens and closes
- **Gallery path:** the same checks pass under `/sites/scribe-optimize/`.

## Known differences

- **Customer videos:** the originals are 1920×1080 and 193 MB and 75 MB, which is too large for git. They are re-encoded to 1280×720 H.264 (CRF 26) with AAC audio, 11 MB and 5 MB, at the same length. The player renders them at no more than about 560 px wide.
- No analytics, A/B testing (Intellimize, VWO) or consent manager loads, so any experiment variant served live is not reproduced. The capture shows the published control.
- Route links open the live site.

## Licensing

Everything here belongs to Colony Labs, Inc. (dba Scribe) or the respective owners: the copy, the Scribe brand, the illustrations, the Lottie animations, the videos, the customer quotes and portraits, and the customer logos. ABC Diatype and ABC Marist are commercial fonts from Dinamo and are licensed to Scribe. jQuery, GSAP, Swiper, lottie-web and the Mast scripts are under their own licences.

This capture is for private design study. For anything published, replace the brand, copy, fonts, logos, images, animations and videos with material you are allowed to use. Keep the Webflow layout classes and the tokens listed above as the reusable structure.
