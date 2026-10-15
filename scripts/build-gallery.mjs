// Assembles ./public for Firebase Hosting: the gallery shell plus every site's dist/ under /sites/<slug>/.
// Some recreations reference assets with root-absolute paths (/assets/x.png). Those only resolve when the
// site is served from "/", so paths whose first segment exists in that site's dist/ are prefixed with /sites/<slug>.
import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'public');
const manifest = JSON.parse(await readFile(path.join(root, 'gallery/sites.json'), 'utf8'));

const REWRITE_EXT = new Set(['.html', '.css', '.js', '.mjs']);

// Rybbit analytics, added to every full HTML document of every site. Not to the HTML some sites fetch
// rather than open: fragments without </head>, and The ODIN's recorded responses under odin-local/.
// A page framed by another site page (an embed) skips it, so only the page a visitor opened counts;
// a site shown in the gallery viewer still counts.
const RYBBIT_SRC = 'https://rybbit.beenex.org/api/script.js?siteId=c0f0d113f98d';
const RYBBIT_TAG = `<script>(function(){try{if(window.parent!==window&&window.parent.location.pathname.indexOf('/sites/')===0)return}catch(e){}var s=document.createElement('script');s.src='${RYBBIT_SRC}';s.defer=true;document.head.appendChild(s)})()</script>`;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

function rewriter(slug, topLevel) {
  const prefix = `/sites/${slug}`;
  const names = [...topLevel].sort((a, b) => b.length - a.length).map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  // A root-absolute path is one that follows a quote, "(" or whitespace-delimited url context and is not protocol-relative.
  const re = new RegExp(`(["'\`(=,;\\s])/(${names.join('|')})(?=[/"'?#)\\s\\\\]|$)`, 'g');
  return (text) => text.replace(re, `$1${prefix}/$2`);
}

await rm(out, { recursive: true, force: true });
await mkdir(path.join(out, 'sites'), { recursive: true });

// Gallery shell
await cp(path.join(root, 'gallery'), out, { recursive: true });
// Fingerprint the shell's CSS and JS so a deploy never pairs new HTML with a cached old script.
{
  const indexPath = path.join(out, 'index.html');
  let index = await readFile(indexPath, 'utf8');
  for (const file of ['app.css', 'app.js']) {
    const hash = createHash('sha256').update(await readFile(path.join(out, file))).digest('hex').slice(0, 10);
    index = index.replace(`"${file}"`, `"${file}?v=${hash}"`);
  }
  await writeFile(indexPath, index);
}

let rewritten = 0;
let tracked = 0;
for (const site of manifest.sites) {
  const dist = path.join(root, site.folder, 'dist');
  if (!existsSync(dist)) throw new Error(`Missing ${site.folder}/dist`);
  const dest = path.join(out, 'sites', site.slug);
  await cp(dist, dest, { recursive: true });

  const topLevel = new Set((await readdir(dist)).filter((n) => n !== 'index.html'));
  const rewrite = rewriter(site.slug, topLevel);
  for await (const file of walk(dest)) {
    if (!REWRITE_EXT.has(path.extname(file))) continue;
    const before = await readFile(file, 'utf8');
    let after = rewrite(before);
    // Right after the opening <head>: a page's first </head> can sit inside a comment.
    if (path.extname(file) === '.html' && /<\/head>/i.test(after) && !file.includes(`${path.sep}odin-local${path.sep}`)) {
      after = after.replace(/<head\b[^>]*>/i, (head) => head + RYBBIT_TAG);
      tracked++;
    }
    // Framer image URLs in mirrored modules resolve against the document, not the module file.
    if (path.extname(file) === '.mjs' && topLevel.has('assets')) {
      after = after.replaceAll('../../assets/', `/sites/${site.slug}/assets/`);
    }
    if (after !== before) {
      await writeFile(file, after);
      rewritten++;
    }
  }
  console.log(`✓ ${site.slug}`);
}
console.log(`Built ${manifest.sites.length} sites, ${tracked} pages with Rybbit, into public/ (${rewritten} files had paths rewritten)`);
