# Atlassian Teamwork Graph

Local capture of Atlassian's Teamwork Graph microsite, running on its original Parcel/React bundle.

## Reference

- URL: https://teamworkgraph.com/
- Page title: "Atlassian Teamwork Graph"
- Captured: October 14, 2026, around 6:30 p.m. EDT (bundle `index.8a13420a.js`; the server reported it as last modified October 13, 2026)
- In scope: the home page. The CLI and Benchmark pages come with the same bundle, so the nav links to `/cli` and `/benchmark` also work locally.

## Run locally

From the GoodDesigns repository root:

    python3 -m http.server 4329 --directory TeamworkGraph/dist

Open [http://localhost:4329/](http://localhost:4329/). Clicking CLI and Benchmark in the nav works. `python3 -m http.server` has no clean URLs, so to reload `/cli` or `/benchmark` directly, open `/cli.html` or `/benchmark.html`. Firebase Hosting serves these files at `/cli` and `/benchmark`.

To rebuild `dist/` from the live site, run `python3 tools/capture.py`.

## Folder structure

- `dist/index.html`, `dist/cli.html`, `dist/benchmark.html` are the original page shells for each route. Their titles, descriptions and canonical links are unchanged. Fonts and the CSS reset load locally, and OneTrust and Marketo are removed.
- `dist/assets/` holds every file listed in the Parcel bundle manifest: the runtime, the React entry bundle, compiled CSS, about 1,000 lazy `@atlaskit` icon chunks, hero avatars and app icons, connector logos, agent tiles and the decorative scribbles.
- `dist/assets/vendor/` holds the Atlassian Sans, Atlassian Mono, Charlie Display/Text and Inter Variable fonts, their `@font-face` CSS, and the Atlaskit CSS reset.
- `dist/assets/local/twg-local.js` is generated from `tools/twg-local.template.js`. It runs before the bundle.
- `tools/api-snapshot.json` is the logged-out API state the page renders from.
- `assets-manifest.json` maps each saved file to its role and source URL.

## How the capture runs offline

The page has only a `<div id="pillar-root">` until React renders it. Rebuilding the hero graph animation, the scroll-driven story and the explorer by hand would be a guess, so the original bundle runs unchanged except for two patches made in `capture.py`:

1. `createBrowserHistory()` gets `basename: window.__TWG_BASE__`. As a result, routing works both at `/` and under the gallery's `/sites/teamwork-graph/`.
2. Sentry's `enabled` flag is set to `false`. Sentry fetches through a clean iframe, which bypasses the shim.

`twg-local.js` intercepts `fetch`, XHR and `sendBeacon`:

- The logged-out `CurrentUser` GraphQL query, the `metrics/global` counters, and the Statsig client key and experiment values are answered from the snapshot. These feature gates decide which sections appear.
- Analytics (GASv3, Statsig exposure logging), consent and every other `/gateway/` call return an empty `{}`.

With requests to every non-local host blocked, the page renders identically and makes no external requests.

## Sections and interactions

The home page sections, in order:

1. Header with About, CLI and Benchmark, plus Sign up and Log in
2. Animated graph hero
3. Scroll-pinned feature story ("Every signal from your work…", "The context engine…", "Context, wherever work happens") with previous and next controls
4. Count-up metrics
5. Connector carousel ("The more you connect…") and Browse connectors
6. "Every agent, grounded in the right context", with CLI and MCP demo panels and "Works with" chips
7. Benchmark (44% and 48%) with Join the waitlist
8. "Tour our demo" sample-question tabs, each drawing a graph explorer
9. Atlassian footer and language picker

Verified locally:

- Sign up and Log in open the auth modal; Escape closes it.
- The feature story's previous and next controls work.
- The sample-question tabs re-draw the explorer graph.
- The mobile menu has "Pages" and "On this page" groups.
- CLI and Benchmark navigation works, including the back button.

The About chevron is inert on the live site as well.

"See your graph preview" and "Log in with work email" go to the real `id.atlassian.com` login. The Benchmark waitlist form submits into the shim, so nothing is sent. All other links point to their public Atlassian destinations.

## Responsive behavior and tokens

Breakpoints, colors, spacing and type all come from the compiled Atlaskit/Compiled CSS in `dist/assets/index.z7gwl3.css` and `LoggedOutView.*.css`, using Atlassian Design System tokens (`--ds-*`). The page background is `#111213`. Desktop (1280px) and mobile (390px) layouts are both the original ones. The mobile layout swaps the nav for the hamburger menu and stacks the story, demo and footer columns.

## Verification

Fresh screenshots of the reference and the local copy were taken on October 14, 2026, at 1280×900 and 390×844 and compared section by section as the inner scroll container moved. The scroll height matched exactly: 8,305px on desktop and 9,967px on mobile. Static sections are pixel-identical. The hero differs only in where its drifting nodes happen to be at that moment.

Checks run on both `/` and `/sites/teamwork-graph/`:

- No broken images
- No horizontal overflow
- No console errors
- No requests outside localhost

## Known differences and licensing

- The metric counters show the snapshot taken at capture time, not live numbers.
- There are no analytics, Sentry, cookie banner or Marketo.

All copy, the Teamwork Graph and Atlassian marks, the third-party app logos, the avatar photography and the Charlie and Atlassian Sans fonts belong to Atlassian or their respective owners. This capture is for design study only. Replace these assets before publishing anything derived from it.
