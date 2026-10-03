# GoodDesigns

A personal collection of high-fidelity, self-contained recreations of websites and product experiences worth studying and reusing as design references.

## Designs

- [Allia homepage](./Allia/) — responsive local capture of the Allia homepage with mirrored media, fonts, navigation, carousel, and FAQ.
- [Town homepage](./Town/) — static recreation of the Town homepage with the reference layout, sticky header, filters, persona tabs, mobile menu and floating prompt bar; imagery and fonts are linked from the reference CDN.
- [Cloudflare homepage](./Cloudflare/) — responsive local capture of the current Cloudflare homepage, with locally mirrored assets and page interactions.
- [Cloudflare Git Challenge](./CloudflareGitChallenge/) — responsive capture of the competition page, including its animated Tetris hero, mobile navigation, and finalist sections.
- [PostHog homepage](./PostHog/) — responsive local capture of the PostHog homepage with mirrored assets and reconstructed interactions.
- [Notion product page](./Notion/) — responsive reconstruction of `notion.com/product`, including local fonts, imagery, navigation, motion, feature cards, testimonials, CTA, and footer.

Each design lives in its own folder with local run instructions.

## Gallery (Firebase Hosting)

`gallery/` is a browsable index of every recreation with an in-page viewer and a link to each site's folder in this repo. It deploys to the `gooddesigns` site in Firebase project `starmind`.

```bash
node scripts/build-gallery.mjs          # assembles public/ (gitignored) from gallery/ + each <Site>/dist
firebase deploy --only hosting          # publishes it
```

To add a site, append it to `gallery/sites.json`, rebuild, then refresh thumbnails with `npx -p playwright node scripts/capture-thumbs.mjs <slug>` (needs Chrome installed). The build script rewrites root-absolute asset paths (`/assets/...`) so every site works under `/sites/<slug>/`.

## Recreating another site

Agents should follow the gated [website cloning workflow](./.agents/workflows/clone-perfectly.md). It turns a reference URL into a page inventory, self-contained implementation, fixed-viewport comparison loop, browser-health checks, and reusable handoff instead of relying on a one-shot visual guess.

## Usage note

These recreations are for design study and prototyping. Before publishing derivative work, replace third-party trademarks, copy, customer logos, photography, and other assets with materials you have permission to use.
