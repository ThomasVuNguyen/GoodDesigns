# Jules homepage clone

A self-contained static clone of the Jules (Google's autonomous coding agent) homepage, made for the GoodDesigns gallery.

- **Reference:** https://jules.google/ (homepage only)
- **Page title:** `Jules - An Autonomous Coding Agent`
- **Captured:** 2026-10-29 (Astro v5.7.12 build)
- **Viewports checked:** desktop 1280×900, mobile 390×844
- **Run:** `python3 -m http.server 4183 --directory Jules/dist` from the repository root, then open http://localhost:4183/

This is a rendered-page capture. The Astro server HTML, the compiled Tailwind stylesheet and the four `client:only` Preact islands are kept, and every file is served from `dist/assets/`. The page makes no runtime requests to jules.google or any other host. All paths are relative (`assets/...` and `./assets/js/...` for the island modules), so the page works under the gallery's `/sites/<slug>/` prefix.

## Structure

```
Jules/
  README.md
  dist/
    index.html                  Astro server HTML (tracking removed, paths made relative)
    assets/
      css/index.ly5R4s0Y.css    compiled Tailwind v4 stylesheet: tokens, pixel patterns, keyframes
      css/local.css             local override: horizontal-overflow clip (see Intentional differences)
      js/*.js                   Astro Preact renderer, the four islands and their shared chunks
      fonts/*.woff2             Roboto Mono variable, latin + latin-ext subsets
      img/                      comic panels, avatars, squid sprites, plan meters, favicon, og image
      manifest.json             every local file -> role, size and source URL
```

The JS files keep their Astro hash names because the chunks import each other by file name. `CodeEditorViewport2` and `Capabilities` had root-absolute image strings (`"/squid.png"`, `"/jules-pixelated.png"`, `"/thought-bubble.png"`), which are rewritten to `assets/img/...`. Every other chunk is byte-for-byte unchanged. The inline Astro island loader in `index.html` is unchanged too. It imports `component-url`/`renderer-url` relative to the document, so those attributes now read `./assets/js/...`.

## Sections (top to bottom)

1. **Header** (absolute, over the hero): purple squid mark (hidden on mobile), cyan-outlined "Plans" anchor and the purple "Try Jules" button.
2. **Hero logo** (`HeroLogo` island): a canvas that draws "jules" in ASCII art with "An Autonomous Coding Agent" under it. Characters are knocked out of the logo in pink, cyan, amber and purple, drift and slow down, and an `@` robot carries them back to their slots. There is a separate narrower ASCII logo on mobile (≤768px).
3. **Code editor** (`CodeEditorViewport2` island): a dark editor panel on a dotted shadow pad. On desktop, the squid agent sprite moves between lines, shows a thought bubble and rewrites code with an ink-flash effect. On mobile, a status bar at the bottom types out what Jules is doing ("Applying: ..."). On desktop, the "Jules does coding tasks you don't want to do." card with five task chips hangs off the right edge of the editor. On mobile, the card comes after the editor, without its frame.
4. **Comic strip:** "More time for the code you want to write, and everything else." with four 112×112 pixel-art panels (computer, bike, book, tennis). The book panel is desktop only.
5. **Capabilities** (`Capabilities` island): the big brain squid on an animated pixel-wave background with swimming fish, plus four bubbles: GitHub Integration, Test Suite, Virtual Machine, Available Anywhere (with CLI and API links).
6. **How it works, steps 1–4:** prompt panel (repo and branch selectors, prompt), a plan chat between the Jules and "you" avatars, a diff of `package.json` (next 10.2.3 → 15.4.5), and "Publish Branch". The numbered badges are desktop only, and dotted dividers sit between the steps.
7. **Plans** (`#plans`): heading, intro and three cards (Jules, Jules in Pro, Jules in Ultra), each with a pixel meter.
8. **Footer actions** (`FooterActions` island): "Try Jules" and "Documentation" buttons on a pixel-wave background.
9. **Footer:** Google Labs logo, Terms of Service, Privacy Policy.

## Interactions (all run locally from the original island code)

| Behaviour | Where |
| --- | --- |
| ASCII logo: random ejections every 700 ms, damped drift, the `@` robot picks pieces up and puts them back. The `p` key pauses and resumes the animation. | `HeroLogo.*.js` |
| Code editor sequence: the squid moves (700 ms), thinks (thought bubble) and edits lines (ink flash and tentacle sweep). On mobile, the status bar types out each step. | `CodeEditorViewport2.*.js` |
| Hovering a capability bubble opens the squid's eye (opacity 0 → 1, scale 75% → 100%) and points it toward that bubble (tl/tr/bl/br translate ±8px). | Tailwind `:has()` classes on the Capabilities container |
| Hovering the squid's brain swings in the "Brought to life with Gemini 3 Pro and the AIDA team." label (rotate 30° → 0, scale 75% → 100%, 200 ms). | same |
| Pixel-wave backgrounds with drifting fish and randomly flickering pattern tiles in Capabilities and the footer actions | `general.*.js` (`PixelBackground`) |
| Diff lines: the line number brightens from purple-700 to purple-400 on row hover | CSS `group-hover` |
| Hover colours: "Try Jules" purple-500 → purple-400, "Documentation" fuchsia-50 → fuchsia-100, footer links purple-200 → white | CSS |
| "Plans" jumps to `#plans` | in-page anchor |
| `prefers-reduced-motion`: the Pro and Ultra animated GIF meters swap to static PNGs (`motion-reduce:` classes) | CSS |

**Links:** "Try Jules" → https://jules.google.com/. "Documentation" → https://jules.google/docs. CLI → https://jules.google/docs/cli/reference. API → https://developers.google.com/jules/api. "Gemini 3 Pro model" → deepmind.google. Footer → labs.google.com, policies.google.com/terms and policies.google.com/privacy. All of them stay public external links.

## Tokens and reusable parts

All in `assets/css/index.ly5R4s0Y.css` (Tailwind v4 output):

- **Colours:** `:root` custom properties `--color-purple-*`, `--color-fuchsia-*`, `--color-cyan-*` and `--color-amber-*` (oklch). The page background is `#1d0245`, set on `body`. Prompt fields use `#09051c`, the Ultra badge `#d0b9ff`, and the code keyword colour is `--color-text-keyword: #ff79c6`. The four accent pairs (fuchsia-400, cyan-400, amber-400, purple-400) are reused for task chips, step badges, capability icons and the logo's ejected pieces (`#E1308D #0FD3D3 #F0C642 #472394`).
- **Type:** Roboto Mono Variable for everything (`body { font: 15px/1.5 "Roboto Mono Variable", "SF Mono", ... }`), weights 500/700/900. The hero canvas draws in `SF Mono, monospace`, bold, 16px.
- **Pixel primitives:** `.rounded-pixel-sm` and `.rounded-pixel-lg` (stepped pixel corners), `.pattern-dot-three` (the dotted section dividers), `.pattern-square-light` (the dotted drop-shadow pads behind cards), `.pattern-tentacle` (the editor's ink sweep), and `.pixelated-img` (`image-rendering: pixelated` / `crisp-edges`, on every sprite and comic panel).
- **Motion:** `@keyframes squid-bob`, `squid-pulse`, `ink-appear`, `ink-appear-tentacle`, `line-ink-flash`, `ping-visual`, `pulse`.
- **Breakpoints:** Tailwind defaults: `md` 48rem (768px) switches between the mobile and desktop layouts, `lg` 64rem puts the plans in three columns, `xl` 80rem hangs the hero card half outside the editor. The hero canvas switches logos at `max-width: 768px`.
- **Components:** the bubble card (`p-6 md:border-4 rounded-pixel-sm` plus a theme triple such as `bg-purple-900 text-purple-200 border-purple-800`, optionally with a `pattern-square-light` shadow pad), the task chip (`text-sm font-bold p-2 bg-*-400 border-b-2 border-*-500 text-*-950`), the step row (badge + copy + 600px panel), the plan card, and the corner-notched badge ("Pro", "Ultra": 3px squares in the background colour at each corner).

## Assets

`dist/assets/manifest.json` lists every file with its role, size and source URL. `dist/` is about 340 KB. The pixel art is tiny indexed PNGs, so nothing was re-encoded. Only the Latin and Latin Extended subsets of Roboto Mono are kept. The Cyrillic, Greek and Vietnamese `@font-face` rules were removed because the page has no such glyphs. The live page also references `plan-01.gif`, but it returns 404 there, and both of that card's images point to `plan-01.png`, so the clone does the same.

## Removed

- Google Tag Manager (`GTM-M9MLWSXV`) `<script>` and `<noscript>` iframe, and a `google-analytics` `<meta>` tag.
- The duplicate `<title>` element.

## Intentional differences

- **Horizontal overflow at exactly 1280px:** on the live page, the hero's "don't want to do" card uses `xl:translate-x-1/2`, which pushes its shadow pad 30px past a 1280px viewport (`scrollWidth` 1310), so the page scrolls sideways. `local.css` sets `overflow-x: clip` on `html, body`. The view at scroll 0 is identical, and the page just can't be dragged sideways.
- **Randomness:** the hero ejections, the robot's path, the fish and the flickering pattern tiles are random on every load, both live and locally. Side-by-side checks therefore compare layout, type and imagery, not the positions of animated pieces.
- `og:image` points to the local copy (`assets/img/og-image.png`), not an absolute jules.google URL.

## Verification (2026-10-29, headless Playwright Chromium)

- Full-page captures at 1280×900 and 390×844, live and local, compared side by side. Page heights match exactly (desktop 4723px, mobile 5487px). The pixel diff is 0.14% (desktop) and 0.08% (mobile), all of it in the randomly animated canvases.
- With every non-localhost request blocked: 0 broken images, no horizontal overflow, 0 console errors and 0 outside requests at both viewports.
- Interactions checked on both pages with the same script: the hero canvas animates and `p` freezes it, the code editor text changes over time and the squid sprite shows, the capability hover opens the squid eye (translate −8px/−8px), the brain hover shows the label, "Try Jules" changes colour on hover, "Plans" scrolls `#plans` to the top, and reduced motion shows the three PNG meters.
- Pixel art at 220px (comics), 640px (squid) and 48px (avatars) renders nearest-neighbour in both, confirmed in a zoomed crop.

## Licensing

Jules, the squid character, the comic panels and all copy, illustrations and logos (Google, Google Labs, Gemini, DeepMind) belong to Google. The island scripts are Google's compiled site code. This folder is a private design-study reference only. Before any public or commercial reuse, replace the artwork, copy, logos and the animation code with material you are licensed to publish, and keep only the layout patterns and pixel-UI ideas. Preact (MIT), Astro's island loader (MIT) and Roboto Mono (Apache 2.0 / OFL via Fontsource) are open source.
