// Assembles ./public for Firebase Hosting: the gallery shell plus every site's dist/ under /sites/<slug>/.
// Some recreations reference assets with root-absolute paths (/assets/x.png). Those only resolve when the
// site is served from "/", so paths whose first segment exists in that site's dist/ are prefixed with /sites/<slug>.
import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'public');
const manifest = JSON.parse(await readFile(path.join(root, 'gallery/sites.json'), 'utf8'));

const REWRITE_EXT = new Set(['.html', '.css', '.js']);

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
  const re = new RegExp(`(["'\`(=,\\s])/(${names.join('|')})(?=[/"'?#)\\s\\\\]|$)`, 'g');
  return (text) => text.replace(re, `$1${prefix}/$2`);
}

await rm(out, { recursive: true, force: true });
await mkdir(path.join(out, 'sites'), { recursive: true });

// Gallery shell
await cp(path.join(root, 'gallery'), out, { recursive: true });

let rewritten = 0;
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
    const after = rewrite(before);
    if (after !== before) {
      await writeFile(file, after);
      rewritten++;
    }
  }
  console.log(`✓ ${site.slug}`);
}
console.log(`Built ${manifest.sites.length} sites into public/ (${rewritten} files had paths rewritten)`);
