// Adds an X post to gallery/posts.json and captures its thumbnail to gallery/thumbs/posts/<slug>.jpg.
// Usage: node scripts/add-post.mjs <x url> ["optional note"]
//   https://x.com/<user>/status/ID, https://twitter.com/<user>/status/ID
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const listPath = path.join(root, 'gallery/posts.json');
const [input, note] = process.argv.slice(2);
if (!input) { console.error('Usage: node scripts/add-post.mjs <x url> ["note"]'); process.exit(1); }

const url = new URL(input);
const host = url.hostname.replace(/^(www|m|mobile)\./, '');
const today = new Date().toLocaleDateString('en-CA');
const json = async (u) => { const r = await fetch(u); if (!r.ok) throw new Error(`${r.status} ${u}`); return r.json(); };

if (host !== 'x.com' && host !== 'twitter.com') {
  throw new Error(`Only X/Twitter links are supported (got ${host})`);
}

const [, user, , id] = url.pathname.split('/');
if (!/^\d+$/.test(id || '')) throw new Error(`No post id in ${input}`);

// FxTwitter's public API returns the post's text, author, and engagement.
const { tweet } = await json(`https://api.fxtwitter.com/${user}/status/${id}`);

// The title is the post's first line, stripped of URLs and trailing colons.
const rawTitle = tweet.text
  .replace(/\s*https:\/\/t\.co\/\S+$/g, '')
  .trim()
  .split(/\n+/)[0]
  .replace(/[:\s]+$/, '')
  .trim();

const post = {
  slug: `x-${id}`,
  platform: 'x',
  id,
  url: `https://x.com/${tweet.author.screen_name}/status/${id}`,
  title: rawTitle.length > 90 ? `${rawTitle.slice(0, 88).trimEnd()}…` : rawTitle || `Post by @${tweet.author.screen_name}`,
  author: `${tweet.author.name} (@${tweet.author.screen_name})`,
  authorUrl: `https://x.com/${tweet.author.screen_name}`,
};

if (note) post.note = note;
post.added = today;

async function getChromium() {
  try {
    const pw = await import('playwright');
    return pw.chromium;
  } catch {}
  const homedir = process.env.HOME || '';
  try {
    const npxDir = path.join(homedir, '.npm/_npx');
    for (const d of readdirSync(npxDir)) {
      const p = path.join(npxDir, d, 'node_modules/playwright/index.mjs');
      if (existsSync(p)) {
        const pw = await import(p);
        return pw.chromium;
      }
    }
  } catch {}
  throw new Error('Playwright not found');
}

async function captureThumbnail(postId, destPath) {
  const chromium = await getChromium();
  const chromeExe = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const launchOptions = existsSync(chromeExe) ? { executablePath: chromeExe } : {};
  const browser = await chromium.launch(launchOptions);
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 750 }, deviceScaleFactor: 2 });
    await page.goto(`https://platform.twitter.com/embed/Tweet.html?id=${postId}&dnt=true`, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      document.documentElement.style.background = '#faf8f3';
      document.body.style.background = '#faf8f3';
      document.body.style.display = 'flex';
      document.body.style.alignItems = 'center';
      document.body.style.justifyContent = 'center';
      document.body.style.minHeight = '100vh';
      const app = document.getElementById('app');
      if (app) {
        app.style.width = '550px';
        app.style.margin = '0 auto';
        app.style.transform = 'scale(1.65)';
        app.style.transformOrigin = 'center center';
      }
    });
    await page.waitForTimeout(500);
    await mkdir(path.dirname(destPath), { recursive: true });
    await page.screenshot({ path: destPath, type: 'jpeg', quality: 86 });
  } finally {
    await browser.close();
  }
}

const thumbPath = path.join(root, `gallery/thumbs/posts/${post.slug}.jpg`);
console.log(`Capturing thumbnail for ${post.slug}...`);
await captureThumbnail(id, thumbPath);

const list = JSON.parse(await readFile(listPath, 'utf8').catch(() => '{"posts":[]}'));
const at = list.posts.findIndex((p) => p.slug === post.slug);
if (at >= 0) list.posts[at] = { ...list.posts[at], ...post, added: list.posts[at].added };
else list.posts.push(post);

await writeFile(listPath, `{\n  "posts": [\n${list.posts.map((p) => `    ${JSON.stringify(p)}`).join(',\n')}\n  ]\n}\n`);
console.log(`${at >= 0 ? 'Updated' : 'Added'} ${post.slug}: ${post.title} — ${post.author}`);
