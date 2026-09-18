# ProPublica Clone

A pixel-perfect clone of [propublica.org](https://www.propublica.org/) with exact font matching.

**Captured**: September 17, 2026

## Fonts

This clone uses ProPublica's exact typefaces, downloaded from `assets.propublica.org`:

| Font Family | Role | CSS Variable | Files |
|---|---|---|---|
| **Feature Headline** | Headlines (H1–H3, hero text) | `--p-fonts-hed` | Variable font (wght/wdth/opsz), 2 files |
| **Brut Grotesque** | Body, UI, navigation | `--p-fonts-sans` | Static weights 400–900, 6 files |
| **Tiempos Text** | Article prose | `--p-fonts-serif` | Regular, Medium, Semibold, Bold (+ italic), 5 files |
| **Graphik Condensed** | Condensed labels | `--p-fonts-condensed` | Regular + Bold, 2 files |

> **⚠️ Licensing**: These are commercial typefaces (Klim Type Foundry, Commercial Type). They are included here for reference/educational purposes only. Do not use in production without proper licensing.

## Design Tokens

Extracted from ProPublica's CSS custom properties:

- **Type scale**: 12 steps from `0.625rem` to `5rem`
- **Spacing**: 10 steps from `0.25rem` to `5rem`
- **Colors**: Full warm palette with semantic mappings
- **Grid**: 14-column fluid grid with 5 responsive breakpoints

## Running

```bash
cd dist
python3 -m http.server 3030
# or
npx serve .
```

Then open [http://localhost:3030](http://localhost:3030)

## Structure

```
ProPublica/
├── dist/
│   ├── index.html          # Full homepage
│   ├── styles.css           # All CSS (tokens, fonts, components)
│   └── assets/
│       ├── fonts/           # 15 .woff2 font files
│       └── images/          # Hero and article images
└── README.md
```

## Reference

- **Source**: https://www.propublica.org/
- **Architecture**: WordPress + Svelte components
- **CSS system**: Custom properties prefixed `--p-`
