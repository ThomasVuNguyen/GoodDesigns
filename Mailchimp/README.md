# Mailchimp · Homepage

A local capture of the Mailchimp homepage for design study.

- **Reference:** https://mailchimp.com/
- **Page title:** Email & SMS Marketing Platform | Mailchimp
- **Captured:** 2026-11-13
- **Run:** from the repository root, `python3 -m http.server 4180 --directory Mailchimp/dist`, then open `http://127.0.0.1:4180/`.
- **Rebuild:** `python3 Mailchimp/tools/capture.py` fetches the live page again and rewrites `dist/` and `assets-manifest.json`. Set `CAPTURE_CACHE=<dir>` to reuse downloads between runs.

## How it is built

The homepage is server-rendered HTML. A webpack bundle (`index.*.js` plus 187 lazy chunks) adds the behavior: the mega-menu, the side menu, the personalized card grid and its survey, the stat carousel, the case-study carousel, the pricing card and the marquees. Several of those parts are React islands hydrated from JSON `<script>` tags in the page. The capture keeps the server HTML, the original stylesheets, every chunk and every image, so the page's own code runs from local files. It does not reimplement anything.

- `dist/index.html`: the server-rendered page with its JSON data islands
- `dist/release/plums/cxp/css/`: the original stylesheets (`critical`, `common`, `below-fold`, and one file per module)
- `dist/release/plums/cxp/js/`, `dist/release/plums/chunks/js/`: the webpack runtime, `experiment-loader`, and every lazy chunk
- `dist/cdn/product/fonts/mailchimp/`: Means (serif headlines), Graphik and Tally (UI and body), all 20 weights the CSS declares
- `dist/ctf/images/…`: Contentful images. Each size or format variant (`?w=768&q=70`, `&fm=avif`) is saved as its own file, for example `hero_standard_1920x1080_temp_solution_1x.q70-w768.webp`, so `srcset` and `<picture>` choose the same files they choose live.
- `dist/assets/intuit/`: Intuit-hosted SVGs (logo, footer brand row, nav icons) and favicons
- `dist/forms/pricing/index.html`: the JSON the pricing card fetches from `/forms/pricing/?currency=USD`
- `dist/ex.js`: the A/B assignment script, pinned (see below)
- `assets-manifest.json`: each saved file mapped to its source URL
- `tools/capture.py`: the capture script and every patch listed below

### Reusable parts

Design tokens and components live in the source CSS, not in new code. The class names are readable BEM, unlike most captures in this repo, so they can be studied directly:

- Global type and color: `common.*.css` (`.h1`–`.h6`, `.ctaPrimary`, `.ctaSecondary`, background classes such as `.backgroundCoconut` and `.backgroundPeppercorn`)
- Header: `.iaNav__*` in `critical.*.css`
- Hero: `.cxpMarketingHero__*`
- Card grid: `p23_horizontal_grid-less.*.css`, `spotlight_card_grid-less.*.css`
- Marquees: `marquee_carousel-less.*.css`, `logo_carousel-less.*.css`
- Pricing card: `single_plan-less.*.css`, `dual_plan_module-less.*.css`

Brand colors are named classes: `.backgroundPeppercorn` `#231e15` (text, dark bands), `.backgroundCavendish` `#ffe01b` (primary CTA and highlights), `.backgroundCoconut` `#fff` (cards).

## What the capture script changes

- Removed: Google Tag Manager (served through `/metrics/`), gtag, Optimizely, OneTrust and the cookie-preferences manager, Google One Tap, FullStory, BrightEdge, Akamai mPulse, Akamai bot detection, and the LivePerson chat loader.
- Bugsnag: the page config is dropped, so `index.js` builds its fallback "noop" client. That client is kept because its React plugin provides the error boundary every island renders inside. Session capture is turned off, so it sends nothing.
- The Google Analytics user-id lookup (`POST /forms/gauid/`) resolves empty instead of calling the server.
- `/ex.js` is generated per visitor on the live site and splits the homepage 50/50 for the "GPS everywhere" test. It is pinned to variant 1 (`IXP2_T_1685989`), the variant in the reference screenshots. That variant adds the "Find the right plan" button under the hero CTA.
- Personalization survey: live, the "Customize my experience" button appears and the "Make Mailchimp work for you" survey opens once only after OneTrust analytics consent. Locally, consent is treated as given, so the button shows as it does in the reference. The survey stays closed until the button is clicked, as for a visitor who has already dismissed it. Answers are written to the `pzn_survey_data` cookie without the consent check. The page then swaps in the matching hero (five variants are in the HTML) and reorders the cards, as it does live.
- Root-relative links (`/pricing/`, `/features/…`) are made absolute, so clicks open the live site. Asset references are relative to the page, so the folder works at `/` and under the gallery's `/sites/mailchimp/`.

## Sections and interactions

In order: announcement bar; header with three mega-menus (Industries and Solutions, Integrations, Resources), Pricing, phone CTA, Start Free Trial, Log In and the side menu; hero with stars and review-site logos; "Recommended for your business" card grid (a swipe carousel with dots on mobile) and the "Customize my experience" survey; customer logo marquee; the vertical stat carousel ("Peak Season"); the case-study carousel; Request demo / Sign Up; the Standard plan pricing card with contacts select, offer radios and currency select; the integrations marquee (three rows); the dark "Millions of users" CTA band; disclaimers; related links; the footer with link columns, Intuit brand row, app badges, social links and the language select.

Checked on localhost against the live page, in the same variant:

- The mega-menus open on click, close on Escape and outside click, and replace each other.
- The side menu opens on desktop and mobile, drills into a second level, goes back and closes.
- "Customize my experience" opens the survey. Its industry dropdown and checkboxes work. Submitting "Professional services" swaps the hero to "Connect with clients and grow your business faster" and reorders the cards to Get more sales / Understand your results / Design with ease / Reach your audience. Live does the same.
- The stat carousel, case-study carousel and mobile card carousel advance.
- The pricing contacts select changes the plan.

Breakpoints and responsive behavior come from the source stylesheets (`48em` and `62em` are the main ones). Below `48em` the header collapses to the logo, Start Free Trial and the menu button, and the card grid becomes a carousel. At wide desktop widths (1440px, the gallery thumbnail size) the header adds the Intuit brand strip, "Switch to Mailchimp", the search link and the EN language picker, whose menu was checked against live.

## Verification

- Viewports: 1280 × 900 and 390 × 844, compared against fresh screenshots of the live page in the same A/B variant. Document heights match exactly, 6,807px on desktop and 7,519px on mobile. Section positions match to the pixel. A spot check at 1440 × 900 also matches (5,948px on both).
- A pixel diff is identical except for the logo and integration marquees, which animate on their own clock, the header phone number, and the third-party widgets listed below.
- Both viewports, also served under `/sites/mailchimp/` with the gallery build's path rewrite applied: 0 console errors (including 25 seconds after load), 0 failed requests, 0 requests to any non-local host, no broken images, and no horizontal overflow.
- Screenshots: `screenshots/desktop.jpg`, `screenshots/mobile.jpg`.

## Known differences

- **Phone number:** the server HTML shows +1 (800) 315-5939. Live, a third-party call-tracking script swaps in a different 855 number on each visit. The local copy keeps the server number.
- **Overlays:** the OneTrust cookie banner, the auto-opening survey, LivePerson's "Chat with Sales" button and the "Feedback" tab are not shown.
- **Variant:** the "Find the right plan" button is from variant 1 of a live A/B test. Visitors in the control group don't see it.
- Other mailchimp.com routes are not captured. Their links open the live site. Log In, sign-up and plan links leave the capture.
- Prices are those served on the capture date.

Mailchimp's name, logo, copy, photography, illustrations, fonts (Means, Graphik, Tally), customer logos, case studies and testimonials belong to Intuit Mailchimp and the respective companies and people. They are kept here for private design study. Replace them with licensed material before publishing anything derived from this page.
