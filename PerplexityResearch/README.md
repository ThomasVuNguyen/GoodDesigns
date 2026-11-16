# Perplexity Frontier Research

A local capture of the Perplexity Frontier Research landing page for design study.

- **Reference:** https://research.perplexity.ai/
- **Page title:** Frontier Research | Perplexity
- **Captured:** 2026-11-16
- **Run:** from the repository root, `python3 -m http.server 4321 --directory PerplexityResearch/dist`, then open `http://127.0.0.1:4321/`.
- **Rebuild:** `python3 PerplexityResearch/tools/capture.py` fetches the live page again and rewrites `dist/` and `assets-manifest.json`. Set `CAPTURE_CACHE=<dir>` to reuse downloads between runs. The script downloads with `curl`, because the Cloudflare layer in front of the site returns 403 to Python's own HTTP client.

## How it is built

research.perplexity.ai is a host alias. The live server maps it to the `/hub/research` route of Perplexity's marketing app (`marketingHostRouteAliases`). That app is a React app built with Vite (rolldown). The server renders the whole page, then the browser hydrates it from these globals:

- `window.__PPL_INITIAL_SERVER_ROUTE__`: the route (`/hub/research`) and locale
- `window.__PPL_INITIAL_SERVER_DATA__`: the dehydrated React Query cache, which holds the Research journal posts from Sanity

The client picks its route from `__PPL_INITIAL_SERVER_ROUTE__` and not from the URL. As a result, the same HTML hydrates correctly at `/` and under the gallery's `/sites/perplexity-research/`.

The capture keeps the original app and runs it from local files. Nothing is reimplemented. Desktop and mobile get the same HTML, and one responsive page covers both.

- `dist/index.html`: the server-rendered page, with `<script src="/shim.js">` added first in `<head>`.
- `dist/assets/`: the app's module graph from `pplx-marketing-static.perplexity.ai/assets/`.
  - It covers every module in the entry's module map, plus the files those modules import. So menus, dialogs and lazy sections resolve locally as well.
  - It also holds the stylesheet `style-DB4xR1CH.css` and the KaTeX fonts that stylesheet declares.
  - The page itself is `research-Bqo3q07t.js`. The entry is `index.html-Dgjh-_1B.js`.
- `dist/_agi_assets/`: the files from `frontend-cdn.perplexity.ai/_agi_assets/`.
  - `fonts/`: the variable fonts the stylesheet declares.
  - `marketing/hub/research/papers/`: the 30 paper thumbnails shown on hover in "Example works".
  - `marketing/hub/research/andrew-wilson.webp`: the portrait in the closing band.
- `dist/sanity/images/aqo64vfr/production/`: the Sanity images the page shows. The 7 Research journal images use the 720 px rendition. The 2 featured cards in the Resources menu use the 480 px rendition. Those are the files the page requests at 1280 px. Each is saved under the asset's own file name, and the static server ignores the `?w=…` query.
- `dist/api-snapshots/`: the JSON the page's own API calls returned on the capture date. `shim.js` serves them.
- `dist/shim.js`: answers the page's network calls locally (see below).
- `assets-manifest.json`: maps each saved file to its source URL.
- `tools/`:
  - `capture.py` makes the capture.
  - `shim.js` is copied into `dist/`.
  - `api/` holds the recorded API answers.
  - `extra-assets.txt` lists the files the page requests at runtime. They were recorded from the live page at 1280 and 390 px, with a full scroll at each width.

### Page inventory

| Section | Notes |
| --- | --- |
| Header | Sticky, 56 px (`--pplx-marketing-header-height`). Products, Business and Resources open mega-menus on hover. The Resources menu shows a featured blog card from Sanity. On mobile a menu button opens the full-screen menu. |
| Hero | "The frontier is still open". Rings of kernel code (`pplx-kernels`, `pplx-garden`) rotate behind the headline. The corner button with the code icon is labelled "Code in the rings". The research-loop steps under the rings are screen-reader text. |
| Our vision | Dark band with the essay set in the right column. |
| The work | The six-area map (Multi-agent orchestration over Pre-training, Continual learning, Reinforcement learning, Systems and Frontier evals) stays sticky on desktop. Each card darkens while its section is in view. The left column has the six research areas, each with an "Example works" list, and hovering an item shows that paper's thumbnail. Multi-agent orchestration has the orbiting orchestrator diagram. |
| Waves | The "a question / a measurement / more questions / more measurements" line drawing. |
| Open by default | Three link lists: Papers & writing, Models & weights, Code & data. |
| Join us | Three role cards. The first is dark and has the "Where", "Compensation" and "Timeline" rows. |
| Research journal | Seven posts. Hovering a row swaps the image on the right. |
| Closing band | "Join us in building what comes next." over an arc of code, with the research lead's byline and social links. |
| Footer | Link columns, social icons, store badges, and the large "AI for the curious" wordmark. |
| Cookie banner | Perplexity's own banner. "Got it" and "Decline optional" dismiss it. |

### Reusable parts

- **Type:**
  - `pplxSans` is Curious Sans: body text, 16/22.4 and 20/28 px.
  - `pplxSerif` is Curious Serif: section headings, 36/43.2 and 48/57.6 px, weight 500.
  - `pplxSansMono` is Curious Mono: the 12 px eyebrow labels, with 0.96 px tracking.
  - The `@font-face` rules are in `assets/style-DB4xR1CH.css`.
- **Colour:**
  - light base `#f4f3ee`
  - dark base `#151513`
  - raised dark `#232321`
  - journal base `#fbfbfb`
  - text `#27251e`, with 65 % opacity for secondary text
  - The design tokens are the custom properties on `:root` and `[data-color-scheme]` in the stylesheet.
- **Spacing:** the `nimbus-*` utilities (`nimbus-py-72`, `nimbus-pt-56` and so on) read `--nimbus-spacing-*`.
- **Components:**
  - `NimbusSection-*.js` is the section wrapper.
  - `Header-*.js` and `HeaderLogo-*.js` are the header and its mega-menus.
  - `Footer-*.js` is the footer.
  - The research page's own components (the code rings, the area map, the orchestrator, the waves, the journal) are all in `research-Bqo3q07t.js`.
- **Breakpoints:** Tailwind defaults. The sticky area map and the hover thumbnails appear at `lg` (1024 px). Below that the page stacks into one column, and the thumbnails stay hidden (0×0), as they are live.

## What the capture changes

- **URLs:**
  - Module and asset URLs on `pplx-marketing-static`, `frontend-cdn` and `cdn.sanity.io` become root-absolute local paths. That includes the `r2Asset()` helper's base and the base of the Sanity image-URL builder.
  - Relative links to other routes (`/hub/...`) point at `https://www.perplexity.ai/`.
  - The gallery build prefixes the root-absolute paths with `/sites/perplexity-research`.
- **Analytics:** removed from the HTML:
  - the `count` loader
  - Unify (`/unifyintent.js`)
  - the `edge.perplexity.ai/image` pixel
  - Cloudflare's challenge iframe
  - the `preconnect` and `hreflang` links
- **`shim.js` network calls:**
  - It answers the app's own API calls from `api-snapshots/`:
    - `/api/auth/session`: signed out
    - `/rest/user/info`
    - `/rest/models/config/v2`
    - `/rest/visitor/consent-requirement`: this is what shows the cookie banner
    - `/rest/event/analytics`
    - `/marketing/api/sanity`: the two featured posts by slug, plus the Research journal list
  - The app refetches the journal list after hydration because the dehydrated copy is older than its stale time. Its snapshot is the same data the HTML embeds.
  - Other calls to `/rest/` and `/cdn-cgi/` answer `{}`. Calls to other hosts (Datadog RUM, Singular, Eppo, Unify, `count.perplexity.ai`) answer `{}`, beacons are dropped, and scripts and images from other hosts never load.
- **Left out:**
  - The 50 translation bundles (about 31 MB). The page loads one only for a locale other than en-US, and en-US strings are built in.
  - Sanity images the page never shows: the journal data lists 11 posts but shows 7.

## Checks

Run on the capture date at 1280×900 and 390×844, both at `/` and under `/sites/perplexity-research/` with the gallery's path rewrite:

- Full-page screenshots match the live page pixel for pixel, apart from frames of the animated code rings and the orchestrator, and anti-aliasing in the waves drawing. Page heights match: 14,524 px desktop and 16,660 px mobile.
- These states were screenshotted against the live page in the same state and match:
  - the three mega-menus
  - the cookie banner and "Got it"
  - a paper-thumbnail hover
  - an area-map card hover
  - a journal hover
  - an open-work link hover
  - the footer
  - the mobile menu and its Products panel
- No console errors, no failed requests, no horizontal overflow, and no requests off the local host.
- The only images reported as not loaded are the lazy paper thumbnails at 390 px. They are 0×0 there, and the live page reports the same.

## Known differences

- The journal images are the 720 px renditions. On a 2× display the live page loads the 1320 px rendition for the 520 px slot.
- Links to other Perplexity pages, the "Apply now" job posting, arXiv, Hugging Face and GitHub open the live sites.

## Licensing

Everything on the page belongs to Perplexity AI, Inc. or the respective rights holders. That includes the copy, the Perplexity marks, the Curious and GT Canon typefaces, the paper thumbnails, the illustrations, the portrait and the app code. The capture is for private design study. Before publishing anything built from it, replace the copy, logos, fonts, images and research references with material you are allowed to use.
