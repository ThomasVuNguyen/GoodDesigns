# One becomes two

Static capture of [One becomes two](https://kevintngo.github.io/statechart-art/one-becomes-two/) by Kevin Ngo, part of *statechart art*: the life of one cell drawn as a statechart, modelled in TLA+ and checked by TLC.

- Reference: https://kevintngo.github.io/statechart-art/one-becomes-two/
- Captured: 2026-11-01

## Run locally

```bash
python3 -m http.server 8865 --directory OneBecomesTwo/dist
```

Then open http://localhost:8865/.

## Structure

```
dist/
  index.html            page markup and all CSS (inline <style>)
  tiles/                16 illustrated wall tiles, 1080w and 2160w webp via srcset
  cells/                3 animation frames per state for the stepper's microscope view
  js/step.mjs           stepper UI: spotlight, gold route and token, microscope canvas, trail
  js/cellcycle.mjs      the cell-cycle state machine (init, actions, key)
  js/view.mjs           state and step wording
  js/chart.json         node and edge geometry for the spotlight and route (fetched on first open)
  fonts/                Kevin Sans Regular and Bold (woff2)
  favicon.ico, icon-*.png, apple-touch-icon.png, site.webmanifest, og.jpg
```

## Sections and interactions

- One tall `.wall` (max 960px) of stacked tiles: title, interphase, the two checks, copying, held, apoptosis, the mitosis phases, endings, colophon.
- Credits on the title tile are transparent text positioned over the drawn lettering, so the links are real and selectable.
- "Step through the chart" opens the stepper: right sidebar (360px) at 900px and up, bottom sheet below. Each move advances a gold token along the route and moves the spotlight; Back, Play, Start again and Close; a "path so far" list.
- "Read the chart as text" is a `<details>` that lists every state and step.

## Tokens

Defined inline in `index.html`: page `#191614`, paper `#f5f1e7`, text `#efe6d6`, gold `#f0c86a` / `#e2b33f`, red `#c4453a`. Breakpoint 900px.

## Verification

At 1280x900 and 390x844 the page and the open stepper match the reference pixel for pixel, except for the animated microscope canvas, which differs only by animation frame. No console errors, no broken images, no horizontal overflow, and no requests leave localhost.

## Licensing

The code and drawings are published under the MIT license at https://github.com/kevintngo/statechart-art. Keep the credits and license link when reusing.
