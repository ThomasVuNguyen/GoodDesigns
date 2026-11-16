# Mastra · Homepage

A local capture of the Mastra homepage for design study.

- **Reference:** https://mastra.ai/
- **Page title:** TypeScript AI Framework for Agents and Apps | Mastra
- **Captured:** 2026-11-16
- **Run:** from the repository root, `python3 -m http.server 4320 --directory Mastra/dist`, then open `http://127.0.0.1:4320/`.
- **Rebuild:** `python3 Mastra/tools/capture.py` fetches the live page again and rewrites `dist/` and `assets-manifest.json`. Set `CAPTURE_CACHE=<dir>` to reuse downloads between runs.

## How it is built

mastra.ai is a Next.js App Router site built with Turbopack and styled with Tailwind v4 plus the site's own `ds-*` component classes. The server HTML holds the whole page. The React app hydrates it and runs everything interactive:

- the Product / Solutions / Resources dropdowns and the mobile menu
- the announcement lip, which hides on scroll down and returns on scroll up
- the hero's animated product mock-ups
- the framework tabs (Agents, Workflows, Harness, Memory, Server, Factory), with WebGL grain and a three.js scene in Factory
- the observability tabs (Evals, Metrics, Datasets, Traces, Signals)
- the customer-story cards, with hover videos for Salesforce and MongoDB
- the use-case cards' animations: the chat, the voice bars and the log stream
- the FAQ accordion
- the "Copy agent prompt" button, which writes the quick-start prompt to the clipboard
- the footer shader and the "FULLY OPERATIONAL" status

The capture keeps all of this and runs it from local files. Nothing is reimplemented. Desktop and mobile get the same HTML, and one responsive page covers both.

- `dist/index.html`: the server-rendered page and its flight data, with `<script src="/shim.js">` added first in `<head>`.
- `dist/_next/static/immutable/`:
  - the Turbopack runtime and every chunk the page loads (`chunks/*.js`)
  - the CSS (`chunks/*.css`)
  - the fonts and imported media (`media/`): Greed and CommitMono, the tab previews, the book covers, the customer photos and posters
- `dist/icons/sprite.svg`, `dist/logos-centered.svg`, `dist/logos-full.svg`: the icon and customer-logo sprites.
- `dist/brand/mastra-logo-morphing.json`: the logo animation.
- `dist/new-brand/`: the footer shader's fallback images.
- `dist/videos/case-studies/`: the Salesforce and MongoDB hover clips.
- `dist/fonts/Orbitron.ttf`: the face the Factory tab's 3D text loads.
- `dist/images/`: the Signals panel and a lesson illustration.
- `dist/favicon/new-brand/`: the icons.
- `dist/shim.js`: answers the page's network calls locally (see below).
- `assets-manifest.json`: maps each saved file to its source URL.
- `tools/`:
  - `capture.py` makes the capture and applies every patch below.
  - `shim.js` is copied into `dist/`, with `consent-init.json` inlined.
  - `extra-assets.txt` lists the same-host files the page requests at runtime that no file names statically. It was recorded from the live page at 1280 and 390 px, with a full scroll at each width.

### Reusable parts

- **Tokens:** `chunks/21b-w85m5lgdy.css` is the Tailwind build. Its `:root` holds:
  - the type stacks: `--font-sans` (Greed) and `--font-mono` (CommitMono)
  - the Tailwind scale, with `--text-base: 17px`
  - the design-system colours `--color-ds-*`:
    - `surface-bg #080808`
    - `surface-antigrid #0f0f0f`
    - `surface-elevation-sm #171717`
    - `border-antigrid #1c1c1c`
    - `main-white #f0f0f0`
    - `main-gray #939393`
    - `green #7aff78`, the "observe" highlight
    - `orange #fdac53`, the announcement lip
    - `blue`, `purple`, `pink`, `red`, `yellow`
- **Fonts:**
  - `chunks/1re0slxr72nbi.css` holds the `@font-face` rules for Greed (variable) and CommitMono 500/550.
  - `chunks/3gb0tb3v514tx.css` holds Orbitron.
- **Components:**
  - `1_--kn-lmf7z7.css`: the header, dropdowns and announcement lip (`.desktop-navigation--*`, `.nav-dropdown-*`, `.announcement-lip--*`)
  - `1a80ibulcobtm.css`: the section shells, including the notched tab stage (`.ds-section--notch`, `.ds-section--stage-content`) and the hero (`.ds-product-hero`)
  - `347udxc2vmbxa.css`: the buttons (`.ds-button--filled`, `--transparent`, `--accent`)
  - `0muft-8a80sd0.css`: the customer and use-case card grids (`.ds-card-grid-*`)
  - `3bucjthnhnmw4.css`: the feature tabs and the use-case animations (`.feature-tabs-section-*`, `.auc-*`)
  - `3l-4jj81zpd-v.css`: the book and release boxes (`.box--*`)
  - `164goi-shwi7k.css`: the FAQ (`.ds-faq__*`)
  - `2e2yaeptff3pu.css`: the footer newsletter field (`.nlf-*`)
- **Breakpoints:** Tailwind's `40rem`, `48rem` and `64rem`. The desktop navigation and the multi-column grids switch on at `64rem`. Hover effects are gated by `@media (hover:hover)`, and the motion respects `prefers-reduced-motion`.

## What the capture script changes

- **Analytics:** the consent manager (c15t, hosted at `*.inth.app`) gets its script list from one chunk. That list is emptied: Google Tag Manager, GA4, PostHog, HubSpot and Reo.dev. GTM is what loaded the LinkedIn, X, Meta, Google Ads, Warmly and Swan tags, so those never load either. Vercel Web Analytics' injector returns before it adds its script.
- **`shim.js`:**
  - The consent manager's `/init` call gets the answer a US visitor gets live: jurisdiction `NONE` and policy `world_no_banner`, so no cookie banner shows. The visitor's region is removed from the saved answer.
  - `/api/auth/hint` answers `{"authed":false}`, so the header shows Log in / Sign Up as it does for a signed-out visitor.
  - `/api/status` answers `{"status":"operational"}`.
  - The footer newsletter form posts to `/api/newsletter`, which a static capture does not have. `shim.js` answers that call with a 503, so nothing is sent.
  - Other calls to other hosts answer `{}`, beacons are dropped, and scripts from other hosts never load.
- **Images:** next/image is switched to `unoptimized`. The server HTML's `/_next/image?url=…` sources are unwrapped to the original files, because a static host has no image optimizer.
- **Links:**
  - Route links are made absolute in the HTML, the flight data and the client chunks. This covers the nav, the footer, the customer stories, the books, the blog posts, the logo's `/`, the header's "Get Demo" constant and a component's default `href`. They open the live site, and the Next.js router does not prefetch routes the capture lacks.
  - The footer's `llms.txt` link also points to the live site, so its 8.7 MB companion file is not copied.
- **Paths:** assets keep their root-absolute paths. The gallery build prefixes them with `/sites/mastra`, including the Turbopack chunk base `"/_next/"` and the three.js font path.

## Verification (2026-11-16)

Checked against the live page in Chrome at 1280×900 and 390×844, at `/` and under `/sites/mastra/` with the gallery's path rewrite:

- **Height:** the document heights match live, 9,471 px and 12,229 px.
- **Desktop pixel diff:** after a full scroll, no 600 px band differs by more than 0.5%.
- **Mobile pixel diff:** only the top 1,200 px differs, at 0.7%. That is the announcement marquee's scroll position.
- **Requests:** none go to another host, and none fail.
- **Console errors:** 0.
- **Overflow:** no horizontal overflow.
- **Broken images:** none. Fifteen lazy images sit in closed menus and inactive tabs and do not start loading until they show, live and here alike. With them forced to load eagerly, all of them load.
- **Interactions:** the following behave the same as live:
  - the Product dropdown
  - every framework and observability tab
  - the FAQ accordion
  - the mobile menu
  - the copy-prompt button, which copies the same prompt
- **Tab screenshots:** the observability tabs differ by 0%. The framework tabs differ by about 2.7%, from the animated grain and the announcement lip's hide timing.

## Intentional differences

- Route links, `llms.txt` and the logo open the live site.
- The footer newsletter form sends nothing. Its submit gets the shim's 503, so no success message appears, and the site's own handler logs "Error submitting form" to the console. Live, the address would be subscribed.
- "Log in" and "Sign Up" always show the signed-out state.

## Licensing

The Mastra name, logo, Greed and CommitMono fonts, copy, product screenshots, customer logos, customer photos and videos belong to Mastra and their respective owners. This capture is for private design study. Before any public or commercial reuse, replace the brand, fonts, copy, logos and photography with material you are allowed to publish. The layout, tokens and component structure described above are the reusable parts.
