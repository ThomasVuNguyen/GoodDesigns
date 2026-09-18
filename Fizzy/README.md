# Fizzy — Clone

> Reference: https://www.fizzy.do/  
> Captured: September 17, 2026

## Run Locally

```bash
cd Fizzy/dist
npx -y serve .
```

Then open `http://localhost:3000` in your browser.

## Folder Structure

```
Fizzy/
├── README.md
└── dist/
    ├── index.html              # Main page
    └── assets/
        ├── audio/              # Easter egg audio files (shift+hover footer bars)
        │   ├── B3.mp3
        │   ├── C3.mp3
        │   ├── D4.mp3
        │   ├── E3.mp3
        │   ├── F4.mp3
        │   └── G3.mp3
        ├── css/                # Modular CSS (18 files)
        │   ├── reset.css       # CSS reset
        │   ├── root.css        # Design tokens (oklch colors, spacing, typography)
        │   ├── fonts.css       # @font-face declarations
        │   ├── elements.css    # Base element styles
        │   ├── common.css      # Shared component styles (logo, headers)
        │   ├── space.css       # Spacing utility classes
        │   ├── button.css      # Button component
        │   ├── buttons.css     # Button group layout
        │   ├── cluster.css     # Feature image cluster
        │   ├── columns.css     # Two-column letter layout
        │   ├── details.css     # FAQ accordion
        │   ├── footer.css      # Footer with animated SVG bars
        │   ├── graph.css       # Graph paper background section
        │   ├── headline.css    # Section headline component
        │   ├── main.css        # Main content area
        │   ├── modal.css       # Video/image lightbox modal
        │   ├── nav.css         # Sticky navigation bar
        │   ├── roadblock.css   # Error/info page layout
        │   ├── target.css      # Hash anchor highlight animation
        │   ├── text.css        # Long-form text layout
        │   └── visual.css      # Image/video figure component
        ├── fonts/              # Local font files (woff2)
        │   ├── Cartridge-*.woff2  # Cartridge (buttons)
        │   ├── Scorekard-*.woff2  # Scorekard (headings, details)
        │   └── Inter-*.woff2     # Inter (body text)
        ├── images/             # All images (png, webp, jpg, svg)
        └── js/                 # JavaScript modules
            ├── script.js       # Entry point
            └── modules/
                ├── footer.js   # Audio easter egg on SVG bars
                ├── modal.js    # Image/video lightbox
                ├── nav.js      # Sticky nav on scroll
                ├── target.js   # Hash anchor highlighting
                └── video.js    # Inline video playback
```

## Implemented Sections (in order)

1. **Sticky Nav** — Logo, tagline, Sign in / Sign up buttons; becomes fixed on scroll
2. **Hero Board** — Full-width Fizzy board screenshot with bottom fade
3. **Headline** — "Kanban as it should be. Not as it has been."
4. **Two-Column Letter** — Jason Fried's letter with signature and avatar
5. **Videos Section** — Two video thumbnails that open in lightbox modal
6. **Features** — "Little things, big difference" with scattered feature screenshots
7. **Open Source Section** — Graph-paper background with "View source" GitHub button
8. **FAQ Accordion** — 5 expandable details/summary questions
9. **Help Link** — Link to help.fizzy.do
10. **CTA** — "Yeah, why not, I'll try Fizzy!" with sign-up button
11. **Footer** — Animated SVG bars (color on hover), brand logos, legal links

## Interactions

- **Sticky nav**: Adds box-shadow when scrolled past 0
- **Video modal**: Click play button → opens `<dialog>` with video player
- **FAQ accordion**: Native `<details>` with animated chevron rotation
- **Footer SVG bars**: Hover changes gradient colors; Shift+hover plays audio notes
- **Hover states**: All buttons, links, and interactive elements have transitions
- **Dark mode**: Full dark theme via `prefers-color-scheme: dark`
- **Hash anchors**: Elements highlighted with yellow flash animation

## Responsive Breakpoints

- **Base**: Mobile-first
- **48em (768px)**: Nav center text visible, columns side-by-side, larger type scale
- **64em (1024px)**: Larger padding, `<br>` elements shown, video grid columns

## Design Tokens (Reusable)

All in `root.css`:
- **Colors**: Full oklch palette (red, yellow, lime, green, aqua, blue, violet, purple, pink) with 7 shades each
- **Typography**: Inter (body), Scorekard (headings), Cartridge (buttons)
- **Spacing**: 9-step scale from `xxx-small` to `xxx-large`
- **Shadows**: 4 shadow presets (default, cluster, pill, pill-hover)
- **Transition**: Single shared easing `0.125s cubic-bezier(0.37, 1, 0.74, 1)`

## Reusable Components

- `.button` — Pill-shaped CTA with outline and icon variants
- `.headline` — Centered section header with optional content and footer
- `.visual` — Image/video figure with shadow, border-radius, and caption
- `.details` — Expandable FAQ cards
- `.cluster` — Absolutely-positioned image collage
- `.columns` — Tilted card with two-column text
- `.graph` — Graph-paper background container

## Licensing Note

This clone contains third-party assets (logos, fonts, images, copy) owned by 37signals. For reuse, replace branded content with your own materials.
