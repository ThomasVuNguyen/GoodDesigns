# Every.to Clone

## Reference
- **URL**: https://every.to/
- **Capture date**: September 17, 2026
- **Page title**: Every

## Run Locally
```bash
cd dist
python3 -m http.server 8095
# Open http://localhost:8095
```

## Folder Structure
```
Every/
├── README.md
└── dist/
    ├── index.html          # Main page
    ├── style.css           # All styles
    └── assets/
        ├── every-logo-white.svg
        ├── every-logo.svg
        ├── favicon-dark.svg
        ├── handshake.png
        ├── icons/
        │   ├── arrow-out.svg
        │   ├── arrow-right.svg
        │   ├── apple-podcasts.svg
        │   ├── burger.svg
        │   ├── search.svg
        │   ├── spotify.svg
        │   └── youtube.svg
        ├── images/
        │   ├── hero-token-math.jpg   # Hero featured article
        │   ├── folders.jpg           # Sidebar article 1
        │   ├── ai-writing.jpg        # Sidebar article 2
        │   ├── mini-vibe-check.jpg   # Recent essay 1
        │   ├── computer-use.jpg      # Recent essay 2
        │   ├── ai-work.jpg           # Recent essay 3
        │   ├── anthropic-warning.jpg # Recent essay 4
        │   ├── laura-entis.jpg       # Author avatar
        │   ├── katie-parrott.jpg     # Author avatar
        │   ├── mike-taylor.png       # Author avatar
        │   ├── spiral-cover.png      # Product card
        │   ├── spiral-icon.png       # Product icon
        │   ├── cora-cover.png        # Product card
        │   ├── cora-icon.png         # Product icon
        │   ├── sparkle-cover.png     # Product card
        │   └── sparkle-icon.png      # Product icon
        └── thesis/
            ├── hero-sky.jpg          # Thesis banner desktop
            └── hero-sky-mobile.jpg   # Thesis banner mobile
```

## Implemented Sections
1. **Header** — Sticky on desktop, hamburger + search left, sign in + subscribe right, centered "Every" logo overlapping border
2. **Thesis Banner** — "What comes After automation?" with sky background, event details, CTAs
3. **Hero Grid** — 3-column responsive layout (sidebar articles / featured hero / recent essays)
4. **Built by Every** — Product cards grid (Spiral, Cora, Sparkle) with gradient overlays
5. **Newsletter CTA** — Email subscribe form centered
6. **Consultancy** — Card linking to Every Consultancy
7. **Podcast** — AI & I podcast section with platform links (YouTube, Spotify, Apple)
8. **Footer** — Logo, column links (Publications, Products, Company, Legal), copyright, social

## Interactions
- Hamburger menu opens slide-in drawer (left)
- Close drawer with ✕, overlay click, or Escape key
- Image hover: subtle scale(1.02)
- Arrow icons translate-x on hover
- Link opacity transitions on hover
- Newsletter form input focus highlight

## Responsive Breakpoints
- **Mobile**: < 640px (single column, stacked layout)
- **Tablet**: 640px – 975px (2-column products)
- **Medium**: 976px – 1098px (2-column hero grid)
- **Desktop**: ≥ 1099px (full 3-column hero grid)
- **Container max**: 1280px

## Design Tokens
Located in `style.css` `:root`:
- Colors: `--color-bg`, `--color-text`, `--color-text-muted`, `--color-border`, `--color-everyblue`
- Fonts: `--font-sans` (Inter), `--font-serif` (Newsreader)
- Transitions: `--ease-swift`, `--duration-fast`, `--duration-slow`

## Reusable Components
- `.card-image` + `.card-meta` + `.card-author` — Article card pattern
- `.product-card` — Product showcase card with gradient overlay
- `.thesis-btn` — CTA button with arrow icon
- `.podcast-link` — Platform link with icon
- `.drawer` — Slide-in mobile menu

## Known Intentional Differences
- Hand-drawn decorative letter styling uses italic serif instead of custom font
- No JavaScript-based client-side routing (static page)
- Tracking/analytics scripts omitted
- reCAPTCHA omitted
- Third-party video (thesis rock animation) omitted
- All links point to `#` (clone is for design reference only)

## Licensing
- SVG icons and logos downloaded from every.to are their property
- Article images from CloudFront CDN are editorial content owned by Every Media, Inc.
- Google Fonts (Inter, Newsreader) are licensed under SIL Open Font License
- This clone is for personal design reference only
