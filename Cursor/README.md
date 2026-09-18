# Cursor.com Clone

A pixel-perfect, self-contained clone of [cursor.com](https://cursor.com) — the AI-powered code editor homepage.

**Reference URL**: https://cursor.com  
**Capture Date**: September 18, 2026  
**Page Title**: Cursor — The new way to build software

## Quick Start

```bash
cd Cursor/dist
npx -y serve -l 8090
```

Then open [http://localhost:8090](http://localhost:8090)

## Folder Structure

```
Cursor/
├── README.md              # This file
└── dist/                  # Static build output
    ├── index.html         # Main page markup
    ├── styles.css         # Complete design system + responsive styles
    ├── script.js          # Interactivity (scroll animations, mobile menu, tabs)
    └── assets/            # All media served locally
        ├── fonts/         # Inter & EB Garamond font files
        ├── logos/         # Cursor logo, partner logos
        ├── screenshots/   # Product demo screenshots
        ├── testimonials/  # Testimonial author avatars
        └── wallpapers/    # Hero background imagery
```

## Implemented Sections (in order)

1. **Sticky Header** — Logo, nav links (Models, Product, Enterprise, Pricing, Resources), Sign in, Contact sales, Download buttons
2. **Hero** — Headline, dual CTA buttons (Download + Request a Demo), product demo screenshot with CLI overlay
3. **Agentic Development** — "Agents turn ideas into code" feature block with questions UI mockup
4. **Background Agent** — Full-width card showing agent-based development workflow
5. **Knows Your Codebase** — Split layout with feature description and product screenshot
6. **Natural Conversation** — Chat-style interface mockup
7. **Works Where You Do** — Multi-tool integration showcase (Slack, email, docs)
8. **Testimonials (Row 1)** — Diana Hu (Y Combinator), Jensen Huang (NVIDIA), Andrej Karpathy (Eureka Labs)
9. **"The new way to build software"** — Serif italic heading (EB Garamond)
10. **Testimonials (Row 2)** — Patrick Collison (Stripe), shadcn, Greg Brockman (OpenAI)
11. **Stay on the Frontier** — Three feature cards: Models, Agents, Enterprise
12. **Applied Research Team** — Team photo with "Join us" CTA
13. **Recent Highlights** — Four blog post preview cards
14. **Final CTA** — Download prompt with CLI install command
15. **Footer** — Product, Resources, Company, Legal columns + social links

## Interactive Behaviors

| Feature | Behavior |
|---------|----------|
| **Sticky Header** | Stays fixed at top on scroll |
| **Mobile Menu** | Hamburger toggle shows/hides nav at ≤1023px |
| **Scroll Animations** | Elements fade-in/slide-up via IntersectionObserver |
| **CLI Copy** | Click to copy `curl` install command to clipboard |
| **Hover States** | Nav links, buttons, cards all have hover transitions |

## Responsive Breakpoints

| Breakpoint | Layout Changes |
|------------|---------------|
| `≤1023px` | Mobile header with hamburger menu; stacked layouts |
| `≤768px` | Grid columns collapse to single column; demo CLI hidden |
| `≤640px` | Testimonial grid to single column |
| `≤480px` | Tighter padding, smaller typography |

## Design Tokens (CSS Variables)

Located in `:root` at the top of `styles.css`:

- **Colors**: `--color-bg`, `--color-text-pri`, `--color-accent` (#d4541e coral), `--color-border-*`
- **Typography**: `--font-sans` (Inter), `--font-serif` (EB Garamond)
- **Spacing**: `--space-*` scale from 4px to 96px
- **Radii**: `--radius-sm/md/lg/xl`
- **Shadows**: `--shadow-card`, `--shadow-float`
- **Container**: `--container-max` (1280px)

## Reusable Components

- `.feature-card` — Rounded card with title, description, link, and media
- `.testimonial-card` — Quote block with avatar, name, and title
- `.window-chrome` — macOS-style window header with dots and title bar
- `.highlight-card` — Blog post preview with date, category, and author
- `.feature-link` — Coral-colored action link with arrow icon

## Known Intentional Differences

- **Images**: Product screenshots and avatars are locally-hosted approximations
- **Dynamic Content**: No real API calls; all content is static HTML
- **Videos**: Static screenshots replace any animated/video content from the live site
- **Links**: All navigation links are `#` anchors (non-functional routing)

## Asset Licensing

This clone is for **personal reference and learning purposes only**. The following assets are property of Anysphere Inc. (Cursor) and should be replaced before any public or commercial use:

- Cursor logo and brand marks
- Product screenshots
- Testimonial photos and quotes
- Marketing copy

Replace these with your own assets when adapting the layout for other projects.

## Browser Compatibility

Tested and verified:
- ✅ Zero broken images
- ✅ Zero horizontal overflow
- ✅ Zero console errors
- ✅ All local assets load without network dependency on cursor.com
