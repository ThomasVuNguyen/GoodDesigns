# PostHog homepage recreation

Reference: https://posthog.com/ — captured September 29, 2026. The reference page title was **PostHog - your product’s context layer**.

## Run locally

From the repository root:

```bash
python3 -m http.server 8766 --directory PostHog/dist
```

Open `http://localhost:8766/`.

## Structure and reuse

- `dist/index.html` contains the server-rendered homepage structure and hydrated-only menu, toast, and counter templates.
- `dist/styles.css` contains the reference design tokens, responsive breakpoints, and component styles.
- `dist/script.js` restores the visible interactions without the Gatsby runtime: header menus, carousel and demos, toast, drawer, cloud picker, copy buttons, and scroll annotations.
- `dist/assets/manifest.json` maps the 68 local fonts and images to their reference URLs. `dist/vendor/` contains the annotation library.
- `capture.mjs` regenerates the captured HTML, CSS, assets, and templates from the reference site. It needs Node.js, Playwright, and Chrome. It leaves the hand-maintained `dist/script.js` in place.

The page uses the source's container-based responsive rules. It was compared at **1280 × 900** and **390 × 844**. Homepage sections include the desktop-style navigation, hero, three-slide demo, social proof, context warehouse, pricing, company details, reading links, and final call to action.

## Intentional differences

- Links to pages outside this one-page recreation open the public PostHog site.
- The live page's playful visitor and signup counts change at runtime; this capture shows the values observed during visual review.
- Live promotional notifications can appear and disappear. Their timing and count are not reproduced.
- Analytics and third-party tracking scripts were removed. Fonts, images, and visual scripts used by this page load locally.

This is a design-study copy. The PostHog name, artwork, customer logos, and copy belong to their respective owners; replace them before reusing this layout as your own product site.
