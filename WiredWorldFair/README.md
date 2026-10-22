# WIRED World Fair

A local capture of WIRED's festival page. WIRED serves it as an embeddable fragment, scoped to `.wwf-embed`, inside its article template. The fragment is kept as delivered and given a page of its own. The template's ads, tracking, consent banner, and site chrome are left out. The fragment's stylesheet, runtime, fonts, and images are saved under `dist/`.

- **Reference:** https://www.wired.com/wiredworldfair/
- **Page title:** WIRED World Fair: A Festival of the Future | WIRED
- **Captured:** 2026-10-22. The fragment is the build of 2026-10-20 (`df0bd8b`, `embed.css?v=3358fa72ec`, `embed.js?v=ff46c73e9f`).
- **Run:** from the repository root, `python3 -m http.server 8791 --directory WiredWorldFair/dist`, then open `http://localhost:8791/`.
- **Rebuild:** `python3 WiredWorldFair/tools/build.py [saved.html]`. Without an argument it fetches the live page.
- **Reviewed at:** 1280 × 900 and 390 × 844.

## Structure

```
dist/index.html                  the fragment, in a page with the template rules it relies on
dist/assets/embed.css            the fragment's stylesheet (font URLs made relative)
dist/assets/embed.js             the fragment's runtime, unchanged
dist/assets/fonts/               WIRED Sans Regular, WIRED Mono Regular, and WIRED Mono Bold from the template
dist/assets/site/                map textures for the festival plan
dist/assets/speakers/photos/     lineup portraits
dist/assets/sponsors/            partner logos
dist/assets/works/               experience images
dist/assets/favicon.ico
tools/build.py                   rebuilds dist/ from the page
assets-manifest.json             source URL and role of each saved file
```

The embed assets keep the folder layout they have on `interactive.wired.com/wired-world-fair/assets/`.

## What the build changes

- The fragment loads its runtime through an `<img>` whose `onerror` injects a script, so WIRED's template keeps it. Here it is a plain `<script src="assets/embed.js">`.
- Cloudflare's email obfuscation is decoded at build time into the `mailto:` links and addresses the template's `email-decode` script would produce.
- The template still reaches the fragment through a few global rules. `HOST_BODY` in `tools/build.py` copies them: font smoothing and `line-break` on the body, the image and `pre` rules, the link color transition, and the underline on hovered and focused buttons. The footer's countdown button shows that underline on the reference. These rules were found by diffing the computed style of every element inside `.wwf-embed` against the reference, and by listing the template's `:hover`/`:focus` rules that match embed elements. After the copy, all 1,368 elements on desktop and all 1,244 on mobile have the same computed style as the reference.
- WIRED Mono Bold comes from the template's `@font-face`. The fragment's stylesheet defines only the regular weight.

## Sections and interactions

In order: nav, hero (lockup, sponsor, spinning star, date and venue), About, Lineup, Experiences, Festival Map, Schedule, Tickets, Partners, FAQ, and the footer.

All behavior comes from WIRED's own runtime, running from local files.

| Behavior | Notes |
| --- | --- |
| Hero and lineup boards | The halftone city map and the speaker portraits are ASCII art drawn into `<pre>` elements. The map and city data are in `embed.js`. |
| Nav | Section anchors. At 1100px and below, the links fold into a menu button that slides a panel open. Tickets stays in the bar. |
| Lineup | Exclusive accordion (`details name="lineup"`). Opening a row shows its speakers' photos, which load lazily. |
| Experiences | Some cards have a “Read more” toggle. Cards with three images cycle through them, dissolving each change through an ASCII grid drawn from the image on a canvas. |
| Festival map | Moving over the map brings up the street grid. Pointing at a space on the plan names it. |
| Schedule | A time grid with one column per room, for the screening night and the festival day. |
| FAQ | Exclusive accordion (`details name="faq"`). |
| Countdown | The footer's “Miami, Florida” button changes to the number of days until the festival. |

## Breakpoints, tokens, and reusable pieces

The stylesheet's breakpoints are 1800px, 1100px, 860px, 760px, 700px, 640px, 600px, and 560px. It also responds to `hover: none`, `prefers-reduced-motion`, and `prefers-color-scheme: dark`.

Tokens are custom properties on `.wwf-embed`, at the top of `embed.css`:

- **Color:** `--orange` (#f85300), `--violet-brand` (#5744df), `--gradient` (orange to violet), `--ink`, `--paper`, `--rule`, `--mute`
- **Type:** `--text` (WIRED Sans), `--data` (WIRED Mono), `--grid` (system monospace), and the `--step-*` scale
- **Space:** `--s1` through `--s5` (8, 16, 24, 48, and 96px)
- **Motion:** `--ease-out`, `--ease-in-out`, and `--ease-mech` (`steps(12)`)

Main component classes: `.nav`, `.menupanel`, `.hero`, `.lockup`, `.band`, `.lineup`, `.board`, `.works`/`.work`, `.sitemap`/`.plan`, `.sched`/`.sgrid`, `.tiers`/`.tier`, `.sponsors`, and `.faq`. Icons and the logo are the `<symbol>` sprite at the top of the fragment.

## Checks

At both viewports, viewport screenshots taken every 900px (844px on mobile) down the page match the reference pixel for pixel, except the hero. Its star and logo animate, and two loads of the reference differ from each other there by more than the clone differs from either. Page height is 26,175px on desktop and 23,920px on mobile, the same as the reference.

These interactions were run on both pages and showed no pixel difference: the nav jump to Schedule, the mobile menu, opening lineup rows, “Read more”, hovering the festival map, opening an FAQ answer, and hovering and clicking the countdown.

After a full scroll with every lineup row opened, all 41 images load. Nothing overflows horizontally, and the console has no errors. With every request outside localhost blocked, the page makes none.

## Intentional differences

- WIRED's article template is not included. On the reference it adds no visible chrome, only ads, analytics, the consent banner, and Google sign-in.
- Ticket links still go to `events.wired.com`. Footer and social links still go to wired.com and WIRED's social accounts.

## Licensing

The design, copy, fonts (WIRED Sans and WIRED Mono), speaker photos, artwork images, and partner logos belong to WIRED, Condé Nast, and the respective artists and partners. This capture is for study. Before publishing anything built from it, replace the fonts, images, logos, and copy with material you are allowed to use. The layout, tokens, and runtime structure are the reusable parts.
