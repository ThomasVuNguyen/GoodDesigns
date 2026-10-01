# Allia homepage recreation

Reference: [https://allia.health/](https://allia.health/) — captured October 1, 2026. The page title was **Allia — The Operating System for Behavioral Health Practices**.

## Run locally

From the repository root:

```bash
python3 -m http.server 8767 --directory Allia/dist
```

Open [http://localhost:8767/](http://localhost:8767/).

## Structure and reuse

- `dist/index.html` holds the complete rendered homepage, its responsive Framer CSS, and the original section structure. Its CSS variables and repeated Framer component classes provide the design tokens and reusable patterns.
- `dist/assets/` holds all referenced fonts, images, icons, and the small Lenis stylesheet. `manifest.json` maps each local asset to its captured URL.
- `dist/vendor/framer/` holds the locally mirrored Framer modules used for menus, carousel, FAQ, motion, and responsive variants.
- `source.html` is the captured HTML response with line endings normalized. `tools/build.py` removes analytics, localizes assets and modules, and writes `dist/` from that capture.
- `reference/` contains desktop and mobile screenshots used for visual comparison.

The homepage includes the sticky navigation, hero, social proof, fragmented-software metrics, feature sections, testimonial carousel, intake-to-discharge workflow, privacy cards, FAQ, final call to action, and footer. The source's responsive breakpoints are 760 px and 1024 px. Product and Network menus, the mobile menu, carousel, and FAQ retain their original behavior.

## Visual verification

Compared live and local pages at **1280 × 900** and **390 × 844**, including full-page captures after scrolling to reveal animations. The page heights matched exactly: 10,361 px desktop and 12,690 px mobile. Top viewport mean absolute pixel differences were below 2 on the 0–255 color scale. Local browser checks found no broken images, horizontal overflow, or console errors after the page was traversed.

## Intentional differences

- Links to unscoped pages go to the public Allia site. The logo returns to this local homepage.
- Analytics and tracking code were removed. Design media, fonts, and the runtime load locally.
- Some live metrics, marquee text, scroll effects, and carousel state vary with timing, so full-page screenshots can differ slightly while the section geometry remains the same.

This is a design-study copy. Allia's name, trademarks, copy, photos, and illustrations belong to their respective owners. Replace them with licensed material before publishing a derivative product site.
