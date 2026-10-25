# The Kiln

A static, faithfully verified multi-page clone of [thekiln.com](https://thekiln.com/) for the GoodDesigns gallery.

## Reference

- **URL:** https://thekiln.com/
- **Captured:** October 2026
- **Stack:** Semantic HTML5, CSS3, Vanilla JS, Google Fonts (`DM Sans`), responsive layout

## Description

The Kiln is a GTM (Go-To-Market) engineering services company (acquired by 2X). The site showcases their automation services including Sales & GTM Engineering, Marketing & Growth, and RevOps, along with comprehensive case studies, dedicated recruiting offerings, toolstack guides, tutorials, testimonials, and a contact scheduler.

## Implemented Pages & Routes

1. **Homepage** (`/` -> `index.html`)
   - Sticky header, 2X acquisition announcement bar
   - Hero with headline, decorative graphics, and primary CTA
   - Client logo trust marquee / grid (Notion, TwelveLabs, ReDocs, Cognition, Antimetal, LendingOne, Sendoso, etc.)
   - Services breakdown cards (Sales/GTM, Marketing/Growth, RevOps)
   - "How We Work" custom engineering process cards
   - Featured case studies (Azuga, Sendoso)
   - Services timeline
   - Testimonial carousel
   - Book a demo CTA banner & comprehensive footer

2. **Case Studies Directory** (`/case-studies/`)
   - Hub header and headline
   - Grid of 10 primary case study cards with client logos, titles, and links to full case studies
   - Book a demo CTA and footer

3. **12 Individual Case Study Pages** (`/case-studies/<slug>/`)
   - `how-crescendo-grew-quarterly-pipeline-by-14m-in-4-months-with-the-kiln`
   - `how-twelvelabs-consolidated-a-fragmented-revops-stack-into-an-efficient-gtm-engine`
   - `troc`
   - `how-adroll-eliminated-a-3-day-signal-lag-with-a-scalable-signal-engine`
   - `how-azuga-transformed-640-hours-per-week-of-manual-work-into-a-scalable-data-engine`
   - `how-sendoso-created-an-ai-forward-scalable-gtm-motion-with-the-kiln`
   - `how-hologram-s-gtm-efficiency-was-improved-by-90-with-the-kiln`
   - `how-daxko-completely-transformed-their-gtm-motion-with-the-kiln`
   - `how-loxo-used-ai-powered-market-mapping-to-prioritize-200-000-accounts`
   - `clientell`
   - `how-redocs-transformed-their-lead-enrichment-outreach-with-the-kiln`
   - `antimetal`
   - Includes back navigation, client logo, headline, executive quote pullout, 3 key performance metric blocks, complete article body sections (Overview, Challenge, Approach, Results), and "More case studies" grid.

4. **Recruiting Landing Page** (`/recruiting/`)
   - Hero: "Hire world-class GTM Engineers the right way"
   - Problem comparison matrix ("Hiring firms aren't well-suited" vs "Why companies choose The Kiln")
   - 5-step process walkthrough cards (Approach, Criteria, Selection, Fit, Hired)
   - Specialized benefits cards (Specialized expertise, Proven track record, Beyond hiring)
   - CTA banner & footer

5. **Contact / Talk With Us** (`/contact/`)
   - Direct scheduler interface embedding the live Calendly booking widget with fallback support

6. **Toolstack Guide** (`/toolstack/`)
   - Categorized GTM tool recommendations with quick navigation pills
   - 9 categories: Lead enrichment, Intent data, Email sequencing, Multi-channel campaigns, AI copywriting, LinkedIn outreach, Photo personalization, Lead sourcing, Workflow automation
   - Detailed tool cards with ratings, in-depth reviews, pricing details, and direct links

7. **Tutorials / Learn Hub** (`/learn/`)
   - Free video tutorials and webinars library with 68 lessons covering cold email copywriting, Clay table waterfall workflows, outbound channels, and lead generation

8. **Kind Words / Testimonials Wall** (`/kind-words/`)
   - Client reviews and market leader quotes with author avatars, roles, and companies

9. **Blogs Hub & Posts** (`/blogs/`)
   - Blog directory with article cards
   - Individual blog posts:
     - `sales-tools-wont-save-you`
     - `cold-email-copywriting-a-quick-guide`

10. **Job Board** (`/job-board/`)
    - Careers and open role showcase for GTM engineers

## Local Run

```bash
cd TheKiln/dist
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

## Design System & Tokens

- **Font Family:** `'DM Sans', sans-serif`
- **Primary Color:** `#000000` / `#111111`
- **Background Color:** `#ffffff`
- **Card Background:** `#f5f5f0` (warm off-white)
- **Dark Sections:** `#1a1a1a`
- **Announcement Blue:** `#015870`
- **Border Radius:** `16px` for cards, `100px` for pills/buttons
- **Breakpoints:**
  - Desktop: `>= 810px` (optimized for `1280px` standard desktop)
  - Mobile: `<= 809px` (optimized for `390px` mobile viewport)
