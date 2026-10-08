# GoodDesigns

A personal collection of high-fidelity, self-contained recreations of websites and product experiences worth studying and reusing as design references.

## Designs

- [Allia homepage](./Allia/) — responsive local capture of the Allia homepage with mirrored media, fonts, navigation, carousel, and FAQ.
- [Town homepage](./Town/) — static recreation of the Town homepage with the reference layout, sticky header, filters, persona tabs, mobile menu and floating prompt bar; imagery and fonts are linked from the reference CDN.
- [Cloudflare homepage](./Cloudflare/) — responsive local capture of the current Cloudflare homepage, with locally mirrored assets and page interactions.
- [Cloudflare Git Challenge](./CloudflareGitChallenge/) — responsive capture of the competition page, including its animated Tetris hero, mobile navigation, and finalist sections.
- [PostHog homepage](./PostHog/) — responsive local capture of the PostHog homepage with mirrored assets and reconstructed interactions.
- [Cloudflare Sandbox SDK](./Sandbox/) — responsive local capture of `sandbox.cloudflare.com`, with its outlined-type hero, animated feature diagrams, example tabs, and testimonials running on the original React islands.
- [OpenAI Developers](./OpenAIDevelopers/) — responsive local capture of `developers.openai.com`, with its DevDay hero, model cards, nav dropdowns, theme toggle, and local OpenAI Sans fonts.
- [Plasmidsaurus homepage](./Plasmidsaurus/) — responsive local capture of `plasmidsaurus.com`, with mirrored fonts, illustrations, videos, and the two embedded React demo apps.
- [Socratica](./Socratica/) — responsive local capture of `socratica.info`, with its rotating doodle wordmark, nav overlay, and local Tiempos/Geist fonts.
- [HeyPCB](./HeyPCB/) — responsive local capture of `heypcb.ai`, hydrated from the original Next.js chunks with its 3D board viewer and local Geist fonts.
- [F13](./F13/) — responsive local capture of `f13.com`, hydrated from the original Next.js chunks with its animated hero carousel and local Saans fonts.
- [Foglamp](./Foglamp/) — responsive local capture of `foglamp.dev`, hydrated from the original Next.js chunks with its dashboard hero and local Inter fonts.
- [Muse Gadgets](./MuseGadgets/) — responsive local capture of `gadgets.muse.ai`, hydrated from the original Next.js chunks with its ASCII hero, project carousel, and WebGL Home Link viewer.
- [Paul Kalkbrenner design study](./PaulKalkbrenner/) — responsive study of the artist homepage, with a typographic grid, album tabs, tour listings, gallery carousel, video archive and original replacement imagery.
- [Ronald McDonald House](./RonaldMcDonaldHouse/) — responsive local capture of `ronaldmcdonaldhouse.org`, with its mega-menu, mobile menu, impact counters, stories carousel, and local Audrey fonts.
- [Glide Classic](./GlideClassic/) — responsive local capture of `glideapps.com/classic`, hydrated from the original Next.js chunks with its hero video, use-case carousel, pillar tabs and local videos.
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
