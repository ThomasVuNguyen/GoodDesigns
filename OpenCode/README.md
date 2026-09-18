# OpenCode Data — Clone

**Reference URL:** https://opencode.ai/data  
**Capture Date:** September 18, 2026  
**Local URL:** http://localhost:8096/

## Run Locally

```bash
cd OpenCode/dist
python3 -m http.server 8096
```

Then open http://localhost:8096/ in your browser.

## Folder Structure

```
OpenCode/
├── README.md
└── dist/
    ├── index.html          # Main page
    ├── styles.css           # All CSS (theme tokens, layouts, components)
    ├── app.js               # Data rendering & interactivity
    └── assets/
        ├── IBMPlexMono-Regular.woff2
        ├── IBMPlexMono-Medium.woff2
        ├── IBMPlexMono-SemiBold.woff2
        └── IBMPlexMono-Bold.woff2
```

## Implemented Sections

1. **Header** — Sticky top bar with "DATA" SVG wordmark, section navigation links, GitHub stars badge, "Try OpenCode" CTA button, mobile hamburger menu
2. **Hero** — "Model Data" heading (64px), subtitle text, "Updated" timestamp badge, dot-pattern decorative grid
3. **Top Models** — Stacked bar chart showing daily token usage by model, with color-coded segments, rotated date labels, and Tokens/Users + 1M/2M filter controls
4. **Leaderboard** — Ranked cards: top 3 as "featured" (larger, with rank badge), remainder as "compact" cards. Shows model name, token count, and change percentage
5. **Session Cost** — Table of average cost per coding session by model (sorted cheapest-first)
6. **Token Cost** — Table of per-million-token pricing (output, input, cached, total)
7. **Cache Ratio** — Table of prompt cache hit rates per model
8. **Market Share** — Stacked bar chart by model author (DeepSeek, Meta, Zhipu, Xiaomi, etc.)
9. **Retention** — Week-over-week user retention by model with visual retention markers
10. **Geo Breakdown** — Country table with flag emojis, token volume, and share percentage
11. **Footer** — Links grid (Resources, Community, Company, Legal), dot-pattern divider, status indicator, light/system/dark theme toggle

## Responsive Breakpoints

- **Mobile** (`< 768px`): Single-column, compact tables, hamburger menu
- **Tablet/Desktop** (`≥ 768px`): Section nav visible, 2-column hero layout, GitHub badge
- **Large Desktop** (`≥ 1200px`): Reduced horizontal padding
- **XL** (`≥ 1440px`): Full-width hero

## Design Tokens & Reusable Components

### CSS Custom Properties (in `styles.css`)
All colors, spacing, and semantic values are defined as CSS custom properties on `[data-page="stats"]`:
- `--stats-bg`, `--stats-layer`, `--stats-layer-2` — background tiers
- `--stats-line`, `--stats-line-strong` — border colors
- `--stats-text`, `--stats-muted`, `--stats-faint` — text hierarchy
- `--stats-accent` — blue accent for links/focus
- `--stats-hero-pattern` — dot-grid background color
- Dark theme overrides all tokens

### Reusable Patterns
- **Dot pattern** — CSS mask on `[data-slot="hero-pattern"]` and `[data-slot="footer-pattern"]`
- **Leader cards** — `[data-component="leader-card"]` with `data-size="featured|compact"`
- **Data tables** — `.table-head` / `.table-row` grid with configurable column templates
- **Section titles** — `[data-slot="section-title"]` with bold+muted pattern
- **Usage filter buttons** — `[data-component="usage-filter"]` with product/range variants

## Asset Manifest

| File | Role | Source |
|------|------|--------|
| IBMPlexMono-Regular.woff2 | Body text (400) | opencode.ai CDN |
| IBMPlexMono-Medium.woff2 | Labels/headings (500) | opencode.ai CDN |
| IBMPlexMono-SemiBold.woff2 | Titles (600) | opencode.ai CDN |
| IBMPlexMono-Bold.woff2 | Emphasis (700) | opencode.ai CDN |

## Known Intentional Differences

- Data is a representative snapshot from Sep 18 2026, not live-updating
- Chart tooltips (hover popovers) are simplified — the reference uses complex absolute-positioned tooltip components
- The reference site uses SolidJS with server-side rendering; this clone is static HTML + vanilla JS
- Some very minor interactive states (scroll-linked animations, intersection observers) are not replicated
- Mobile sheet filters are not implemented (desktop filter buttons work)

## Licensing

Font files (IBM Plex Mono) are under the SIL Open Font License.  
The "DATA" wordmark SVG and "OpenCode" branding are trademarks of Anomaly.  
Data content is publicly available on opencode.ai/data.
