# Notion product page reference

A self-contained, responsive reconstruction of `https://www.notion.com/product`, captured on September 16, 2026.

## Run locally

From this folder:

```bash
python3 -m http.server 4173 --directory dist
```

Then open `http://127.0.0.1:4173/`.

## Structure

- `dist/index.html` — complete page structure and copy
- `dist/styles.css` — design tokens, desktop/mobile layout, cards, menus, and motion
- `dist/script.js` — hero word loop, dropdown navigation, and mobile menu
- `dist/assets/` — local fonts and media; `manifest.json` records their original public URLs

The page has no package dependencies and makes no runtime requests to Notion. For public reuse, replace Notion trademarks, copy, customer logos, and photography with assets you have permission to publish.
