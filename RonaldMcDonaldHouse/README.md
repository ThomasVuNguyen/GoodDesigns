# Ronald McDonald House homepage recreation

Reference: [https://ronaldmcdonaldhouse.org/](https://ronaldmcdonaldhouse.org/) — captured October 5, 2026. Page title: **Home | Ronald McDonald House**.

## Run locally

```bash
python3 -m http.server 8790 --directory RonaldMcDonaldHouse/dist
```

Open [http://localhost:8790/](http://localhost:8790/).

## Structure and reuse

- `source.html` — the captured server-rendered Sitecore SXA response (the live site sits behind a Cloudflare challenge, so it was fetched through a real Chrome session).
- `dist/index.html` — the page with trackers, Cloudflare scripts and Google Tag Manager removed and every asset localized.
- `dist/assets/site/` — the original SXA stylesheet (`dest/sxa/css/rmh-sxa.min.css`, which holds all design tokens and component classes), jQuery/Foundation/SXA scripts that drive the nav, mobile menu, counters and carousel, the Audrey Display/Text fonts, and UI images.
- `dist/assets/media/` — content imagery (hero, story tiles, logos, social icons, badges).
- `tools/plan.py` lists every required asset URL and its local path (`tools/assets-plan.json`, which doubles as the asset manifest); `tools/build.py` regenerates `dist/index.html` and rewrites CSS `url(...)` references.

## Sections and interactions

Header with mega-menu dropdowns, search and Donate; cookie banner; hero; mission statement; impact counters; 280 programs map; "Your generosity" donate block; 87-cents stat; scrollable stories carousel with arrows; email signup and social follow; footer with ratings badges. Original breakpoints are preserved (Foundation `medium`/`large`); the mobile menu is the original slide-in panel.

## Verification

Compared live and local at **1280 × 900** and **390 × 844**: page heights match exactly (8,010 px and 9,871 px), full-page mean pixel difference < 0.13/255. Dropdown menu, mobile menu and carousel arrow behave the same on both. Local load has zero console errors, zero failed requests, zero requests to any external host, and no horizontal overflow.

## Intentional differences

- Analytics/advertising tags, Cloudflare beacons and the visitor-identification script are removed.
- Internal navigation links point at the public `ronaldmcdonaldhouse.org` pages; forms and search post to the original site.

## Licensing

Logos, photography, fonts (Audrey) and copy belong to Ronald McDonald House Charities. This is a design study; replace all of them before any public or commercial reuse.
