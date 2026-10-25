# You Can Just Build Things [with hardware]

**Reference:** <https://youcanjustbuildthings.openai.chatgpt.site>  
**Captured:** 2026-10-24  

OpenAI's community showcase for hardware projects built with Codex. A dark-themed product hunt-style gallery with an interactive hero, project cards, and upvoting.

## Run locally

```bash
cd dist
python3 -m http.server 8765
# → http://localhost:8765
```

Or any static file server (`npx serve dist`, VS Code Live Server, etc.).

## Folder structure

```
YouCanJustBuildThings/
├── README.md
└── dist/
    ├── index.html              Static page with baked-in content
    ├── local.js                Interactions (menu, search, upvotes, parallax)
    ├── style.css               Main styles
    ├── openai-theme.css        OpenAI design tokens
    ├── dark-theme.css          Dark mode overrides
    ├── cad-hero.css            CAD grid hero background
    ├── hero-polish.css         Hero device layout & transitions
    ├── responsive.css          Breakpoints (mobile ↔ desktop)
    ├── mobile-projects.css     Mobile project card layout
    ├── motion.css              Animation & entrance effects
    ├── project-sharing.css     Share actions
    ├── card-navigation.css     Card click regions
    ├── thumbnail-crop.css      Thumbnail framing logic
    ├── thumbnail-display.css   Thumbnail display variants
    ├── submission-form.css     Submission form styles
    ├── submission-cover.css    Submission cover images
    ├── learn-carousel.css      Learn section carousel
    ├── participants.css        Participant profiles
    ├── project-markdown.css    Project detail markdown
    ├── review-edit.css         Review editing styles
    ├── favicon.svg             Site favicon
    ├── fonts/
    │   ├── OpenAISans-Regular.woff2
    │   ├── OpenAISans-Medium.woff2
    │   ├── OpenAISans-Semibold.woff2
    │   └── OpenAISans-Bold.woff2
    ├── brand/
    │   ├── openai-blossom-white.svg    OpenAI logo
    │   └── icons/                      UI icons (menu, close, filter, search, chevron)
    └── assets/
        ├── hero/cutouts/       Device product shots (CoreS3, StickS3, AtomS3R)
        ├── concepts/           Concept art (Raspberry Pi 5)
        ├── thumbnails/         21 project thumbnail images
        ├── realtime-esp32-korvo.png
        ├── imagegencam-parts.png
        └── reflect-installed.png
```

## Sections & interactions

| Section | Desktop | Mobile |
|---------|---------|--------|
| Header | OpenAI logo · Explore / Learn / Share nav with selection pill · Sign in | Hamburger menu |
| Hero | Title "You can just build things [with hardware]" · Device images with hover parallax · CTAs | Stacked layout, devices below |
| Community Builds | Sort tabs (Most upvoted / Newest) · Search bar · Build status filter · 24 project cards with rank, thumbnail, title, description, social profile, upvote | Card layout adapts |
| Footer | Explore · Learn · Share · Sign in links | Same |

## Responsive breakpoints

- **Desktop:** ≥1024px — full header nav, wide project cards with side thumbnails
- **Tablet:** 640–1023px — compact nav, adjusted card layout
- **Mobile:** <640px — hamburger menu, stacked hero, square thumbnails

## Design tokens & reusable components

- **Font:** OpenAI Sans (Regular, Medium, Semibold, Bold) — `@font-face` in `style.css`
- **Colors:** Black `#000` bg, `#f3f3f4` text, `#3B82F6` accent blue, `#17191c` card bg
- **Selection pill:** Animated nav indicator (`has-selection-pill` class)
- **Project row:** Repeatable card component (`.project-row`)
- **Vote button:** `.vote` with pressed state
- **Thumbnail framing:** Crop and display system for different aspect ratios

## Known intentional differences

1. **3D scene removed:** The reference uses Three.js (r186) for an interactive 3D hero with tiltable device models. This clone uses the site's built-in static fallback images instead.
2. **Project detail links:** Point to the live reference domain since detail pages are fully dynamic.
3. **Search is local-only:** Filters the baked-in 24 project cards by text match; the reference queries an API.
4. **Upvotes are local-only:** Vote counts change visually but aren't persisted.
5. **"Load more" disabled:** The 24 projects shown are baked in; the reference loads more from an API.

## Licensing

- **OpenAI Sans font:** Proprietary to OpenAI.
- **OpenAI logo & brand assets:** OpenAI trademarks.
- **Project thumbnails:** User-submitted content from OpenAI's community showcase.
- This clone is for personal study and design reference only.
