# ProPublica · Nonprofit Explorer organization page

A local capture of one Nonprofit Explorer organization page, kept for design study.

- **Reference:** https://projects.propublica.org/nonprofits/organizations/521115801
- **Page title:** Jerome G & Annette S Zimmerman Foundation Inc - Nonprofit Explorer - ProPublica
- **Captured:** 2026-11-14. The page footer says the data was last updated on October 22, 2026.
- **Run:** from the repository root, run `python3 -m http.server 4190 --directory ProPublicaNonprofitExplorer/dist`, then open `http://127.0.0.1:4190/`.
- **Rebuild:** `python3 ProPublicaNonprofitExplorer/tools/capture.py` fetches the live page again and rewrites `dist/` and `assets-manifest.json`. Set `CAPTURE_CACHE=<dir>` to reuse downloads between runs.

This is a different site from the `ProPublica/` folder, which recreates the www.propublica.org homepage.

## How it is built

The page is server-rendered by Rails. A Svelte 5 bundle (`hydrate-svelte-components-*.js`) hydrates the islands. Each island has a `<script type="application/json" class="svelte-config">` tag that names the component and its props, followed by a `display: contents` host holding the server-rendered markup. The capture keeps the server HTML, both original stylesheets, the fonts and the first-party scripts, so the page's own code runs from local files. It does not reimplement anything.

- `dist/index.html`: the server-rendered page, including the Svelte config tags and the JSON-LD
- `dist/assets/css/application-*.css`: the Nonprofit Explorer stylesheet (layout, filing cards, tables, CSS-only toggles, ad slots)
- `dist/assets/css/svelte-styles-*.css`: the scoped styles of the Svelte components (header, menu overlay, search, buttons, modal, charts, footer)
- `dist/assets/fonts/`: every font file the stylesheets declare (136 files). That covers Feature Headline (variable, used for headlines), Brut Grotesque (UI and body, in the `WEB` and `WEBL` cuts), Tiempos Text, Tiempos Headline, Graphik, Graphik Condensed and StateFace. Only a handful load on this page; the rest are kept so no `@font-face` points off-site.
- `dist/assets/js/`: `hydrate-svelte-components` (islands), `organizations` (the Schedules selects and the "view more people" and audit toggles), `underscore`, and the tiny `config`, `utils` and `application` files
- `dist/assets/js/local-shim.js`: an added script, described below
- `dist/assets/img/`: the three featured-series photos shown in the navigation menu
- `assets-manifest.json`: each saved file mapped to its source URL
- `tools/capture.py`: the capture script and every patch listed below

### Reusable parts

Design tokens and components are in the source CSS, not in new code:

- Tokens: custom properties on `:root` in `application-*.css`. Colors are semantic tokens such as `--color-accent-70` (themeable through `light-dark()`; blue on this page, used by Subscribe and View Filing) and grays such as `--gray-10`. Spacing is `--spacing-*` and type sizes are `--scale*`. Font stacks are `--p-fonts-hed`, `--p-fonts-sans` and `--p-fonts-serif`. The `text-hed-*` classes set the headline sizes.
- Layout helpers: `.grid-container`, plus the `.stack` flex utilities (`stack--row`, `stack--justify-between`, `stack--collapse-*`, `stack__item-*`)
- Header and menu: `LookupSiteHeader` and `.site-header-overlay__*` in `svelte-styles-*.css`
- Summary charts: the `OrgSummaryCharts` island draws four LayerCake bar charts from one data array of `[year, revenue, expenses, assets, liabilities]` rows
- Filing card: `section.single-filing-period`, containing `.padded-box` panels, the `.revenue` summary, table rows with inline percentage bars, and the `.document-links` side card
- CSS-only toggles: `.read-more-wrapper` / `.read-more-state` / `.read-more-trigger`. A hidden checkbox and a `<label>` whose text comes from `::after`. These drive "Show more", the 501(c)(3) definition on mobile and "View More Financial Data" on mobile.
- Accordions: native `<details>` and `<summary>` in `#about-this-data`

Breakpoints come from the source stylesheets. Below the tablet breakpoint the header shows only the Nonprofit Explorer title, the bell and a search button that opens the search bar. The summary cards stack in two columns, the document card moves above the financials, the financial breakdown hides behind "+ View More Financial Data", and the footer columns become accordions.

## What the capture script changes

- **Removed:** Google Tag Manager and Sailthru (both loaded by `beacons.js`), the `dataLayer` setup, Parse.ly, Convert experiments and the BuySellAds ad loader with its whole Prebid stack, plus the `parsely-section` and site-verification metas and the IE-only legacy stylesheet.
- **Newsletter roadblock:** the `NewsletterModal` island is removed. Live, it tries to fetch a partial from www.propublica.org, which CORS blocks, and it loads reCAPTCHA and the funnel scripts. The bundle's inline `<script>` block for reCAPTCHA, `utils.js`, `user-funnel.js` and `recaptcha-init.js` is replaced with an empty comment, so nothing can load them.
- **Fetch shim** (`assets/js/local-shim.js`, loaded first): the Subscribe button calls three JSON endpoints. The shim gives the answers an anonymous visitor gets live. `csrf-token.json` returns a token. `subscriptions.json` returns 403 (not signed in), so the button opens the email form. `send-verification-email` returns 200, so submitting shows "Check your inbox". No request leaves the page.
- **Menu photos:** the three featured-series image URLs inside the Svelte bundle are rewritten to `assets/img/`.
- **Links:** root-relative links are made absolute to https://projects.propublica.org, so a click opens the live site. That covers filings, schedules, PDFs, XML, the Florida breadcrumb, contact and the API. The three search endpoints in the `SubnavSearch` props are made absolute the same way, so searching submits to the live site. Asset references are relative to the page, so the folder works at `/` and under the gallery's `/sites/propublica-nonprofit-explorer/`.
- Source-map comments are stripped from the scripts.

## Sections and interactions

In order: the black ProPublica header with the menu button and Donate button. The sticky Nonprofit Explorer subnav with breadcrumb, notifications bell and the Nonprofits / People / Filing Text search. The organization name, location, tax-exemption date and EIN. Subscribe. Type of Nonprofit. Four summary charts (Revenue, Expenses, Total Assets, Total Liabilities, 2011–2025). Tax Filings by Year with "Show more" and the "See an issue with the data?" box. 25 fiscal-year sections from 2025 down to 2001: full financials for 2011–2025, PDF-only cards for 2001–2010, and an ad slot after every third year. Then the Nonprofit Explorer credits and About This Data accordions, and the ProPublica footer.

Checked on localhost against the live page, with the same steps run on both:

- The menu overlay opens with search, the About and Contact links, Topics We Cover and Our Biggest Series, and closes with its close button.
- The Subscribe modal opens and closes on Escape. Locally only, submitting an email shows "Check your inbox". I did not submit on live because it sends a real email.
- The search type select switches between Nonprofits, People and Filing Text.
- Show more / Show less, the About This Data accordions, chart hover, and on mobile the search toggle, the 501(c)(3) definition, "View More Financial Data" and the footer accordions all work.
- The Schedules selects navigate to the live schedule pages.

## Verification

- Viewports: 1280 × 900 and 390 × 844. The live page was loaded with only propublica.org hosts allowed, so its ad slots render unfilled just like the local copy. Every viewport from top to bottom, 24 on desktop and 21 on mobile, is pixel-identical to localhost. Document heights match exactly: 21,286px on desktop and 17,389px on mobile. Every interaction state listed above is also pixel-identical, apart from the Subscribe submit, which was only tested locally.
- Health checks ran on both viewports with every non-local request blocked, at `/` and under `/sites/propublica-nonprofit-explorer/`. Results: 0 console errors, 0 failed requests, 0 attempted external requests, and no horizontal overflow. Two menu photos report as not loaded on mobile. That is because they are lazy images in menu cards hidden at that width, the same as live. They load on desktop.
- Screenshots: `screenshots/desktop.jpg`, `screenshots/mobile.jpg`. These were stitched from tall viewport captures with the sticky subnav unpinned, because Chrome's full-page capture repeats tiles on pages taller than 16,384px.

## Known differences

- **Ads:** live, BuySellAds and Google Ad Manager fill the six "Advertisement" bands. The size changes per auction: 728×90, 970×250, 300×250, or left empty. The local copy shows the empty state, so each band is about 80px tall instead of 170–330px.
- **Newsletter roadblock:** not shown (see above).
- Only this organization page is captured. Search, filings, schedules, state pages and the rest of propublica.org open the live site.
- The financial figures are those served on the capture date.

ProPublica's name, wordmark, page copy, series photography and editorial content belong to ProPublica. The fonts (Feature Headline, Brut Grotesque, Tiempos, Graphik) are commercial typefaces licensed to ProPublica. The filing data is drawn from public IRS records. Everything here is kept for private design study. Replace the brand assets and fonts with licensed material before publishing anything derived from this page.
