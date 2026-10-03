# OpenAI Developers homepage recreation

A local capture of the OpenAI Developers homepage for design study.

- **Reference:** https://developers.openai.com/
- **Page title:** OpenAI Developers
- **Captured:** 2026-10-02 (America/New_York)
- **Run:** from this folder, `python3 -m http.server 8790 --directory dist`, then open `http://localhost:8790/`.
- **Review sizes:** 1280 × 900 desktop and 390 × 844 mobile. Page height matches the reference at both (3367 px / 5548 px).

## Structure and reuse

- `dist/index.html` — the page's server-rendered Astro markup and copy.
- `dist/_astro/` — the four page stylesheets (design tokens as CSS variables, light/dark themes) and the Astro island/module scripts with their shared chunks.
- `dist/js/` — theme, scroll, animate and copy helpers.
- `dist/fonts/`, `dist/cdn/` — OpenAI Sans (woff and woff2, all weights) and KaTeX fonts, all local.
- `dist/images/`, `dist/cdn/`, `dist/ytimg/` — the images, SVG wordmarks and the DevDay video thumbnail used by the page.
- `assets-manifest.json` — maps every saved file to its source URL.
- `tools/capture.py` — rebuilds `dist/` from the live site (`python3 OpenAIDevelopers/tools/capture.py`).

Reusable parts: the sticky header with its dropdown nav, theme toggle and search; the DevDay hero banner with its interactive mascot; the model cards; the product tile row; and the carousel and blog-card sections.

## Sections and interactions

Header (nav dropdowns, theme toggle, search, mobile menu), DevDay hero, model cards, product tiles, and the sections below them through the footer, running on the original islands and scripts. The body is the scroll container, as on the reference.

## Known differences

- The hero mascot animates and picks its pose at random, so stills differ by frame.
- Analytics/Speed Insights, the Astro client router and the ChatKit script were removed, so the “Ask AI” launcher does not open a chat.
- Internal links keep their original public destinations (`developers.openai.com`); the DevDay video still embeds YouTube on click.
- The DevDay countdown reads the real clock, so its state depends on when the page is opened.

OpenAI names, marks, copy, fonts and artwork belong to their owners. Replace them with licensed material before publishing a derivative or using it commercially.
