# fal.ai homepage recreation

Reference: https://fal.ai/ — captured October 1, 2026. The reference title was **Generative AI | Run Image, Video, 3D and Audio Models | fal**.

## Run locally

From the GoodDesigns repository root:

```bash
python3 -m http.server 8772 --directory Fal/dist
```

Open `http://localhost:8772/`. The page is also compatible with the repository's gallery builder at `/sites/fal/`.

## Structure and reuse

- `dist/index.html` preserves the reference's server-rendered homepage structure and copy.
- `dist/assets/css/` contains the seven stylesheets used by that structure, including its design tokens, typography, spacing, colors, and breakpoints. `dist/assets/manifest.json` maps all 55 local font, image, and stylesheet files to their original URLs and roles.
- `dist/overrides.css` contains local menu styles and the corrections required after removing the original runtime.
- `dist/interactions.js` implements the announcement dismissal, desktop dropdowns, mobile menu, privacy choice panel, sticky-header colors, and animated pixel blocks.
- `tools/capture.py` can regenerate the static HTML, stylesheets, and assets. It preserves `overrides.css` and `interactions.js`.

The page includes the hero, customer logos, model gallery, product cards, developer benefits, enterprise section, testimonials, call to action, and full footer. It uses the reference's responsive `md` and `lg` breakpoints (768px and 1024px), with local visual checks at **1280 × 900** and **390 × 844**.

## Intentional differences

- Links beyond this one-page recreation go to the public fal.ai site. The homepage logo stays local and in-page anchors work locally.
- The live site's Next.js runtime, analytics, and tracking are absent. The developer code example and enterprise card heights are stored in their observed settled states.
- The hero's small animated pixel blocks use a local approximation of the live animation. The privacy choice panel is a local demonstration and does not set preferences on fal.ai.

This copy is for design study and prototyping. fal's name, illustrations, model imagery, customer logos, and copy belong to their respective owners. Replace them with licensed material before publishing a derivative product site.
