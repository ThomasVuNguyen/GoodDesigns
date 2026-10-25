// Adds an Instagram post to gallery/insta.json and saves its media under gallery/insta/<slug>/.
// Instagram's CDN links expire within days, so every photo, video, poster and the avatar is kept here.
// Usage: npx -p playwright node scripts/add-insta.mjs <instagram post url> ["optional note"]
//   https://www.instagram.com/p/CODE/, https://www.instagram.com/reel/CODE/
import { chromium } from 'playwright';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const listPath = path.join(root, 'gallery/insta.json');
const [input, note] = process.argv.slice(2);
if (!input) { console.error('Usage: npx -p playwright node scripts/add-insta.mjs <instagram url> ["note"]'); process.exit(1); }

const code = new URL(input).pathname.match(/\/(?:p|reel|reels|tv)\/([\w-]+)/)?.[1];
if (!code) throw new Error(`No post code in ${input}`);
const slug = `ig-${code}`;
const today = new Date().toLocaleDateString('en-CA');

// The logged-out post page carries the full media record in its embedded JSON.
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, locale: 'en-US' });
await page.goto(`https://www.instagram.com/p/${code}/`, { waitUntil: 'domcontentloaded', timeout: 45000 });
await page.waitForTimeout(3000);
const post = await page.evaluate((code) => {
  let found = null;
  const walk = (o) => {
    if (found || !o || typeof o !== 'object') return;
    if (o.code === code && o.user && (o.image_versions2 || o.carousel_media)) { found = o; return; }
    for (const k in o) walk(o[k]);
  };
  for (const s of document.querySelectorAll('script[type="application/json"]')) {
    try { walk(JSON.parse(s.textContent)); } catch {}
    if (found) break;
  }
  if (!found) return null;
  const item = (m) => ({
    type: m.video_versions?.length ? 'video' : 'photo',
    width: m.original_width, height: m.original_height,
    image: m.image_versions2?.candidates?.[0]?.url,
    video: m.video_versions?.[0]?.url,
    alt: m.accessibility_caption || '',
  });
  return {
    username: found.user.username, fullName: found.user.full_name, verified: !!found.user.is_verified,
    avatar: found.user.hd_profile_pic_url_info?.url || found.user.profile_pic_url,
    text: found.caption?.text || '', likes: found.like_count, comments: found.comment_count, taken: found.taken_at,
    media: (found.carousel_media || [found]).map(item),
  };
}, code);
await browser.close();
if (!post) throw new Error(`Could not read post ${code}; Instagram may have shown a login wall`);

const dir = path.join(root, 'gallery/insta', slug);
await mkdir(dir, { recursive: true });
await mkdir(path.join(root, 'gallery/thumbs/insta'), { recursive: true });
const save = async (url, file) => {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  const buf = Buffer.from(await r.arrayBuffer());
  await writeFile(path.join(dir, file), buf);
  return buf;
};

const media = [];
for (const [i, m] of post.media.entries()) {
  const n = i + 1;
  const poster = await save(m.image, `${n}.jpg`);
  if (i === 0) await writeFile(path.join(root, `gallery/thumbs/insta/${slug}.jpg`), poster);
  const entry = { type: m.type, width: m.width, height: m.height, poster: `insta/${slug}/${n}.jpg` };
  if (m.type === 'video') { await save(m.video, `${n}.mp4`); entry.src = `insta/${slug}/${n}.mp4`; }
  if (m.alt) entry.alt = m.alt;
  media.push(entry);
}
await save(post.avatar, 'avatar.jpg');

const compact = (n) => n >= 1e6 ? `${+(n / 1e6).toFixed(1)}M` : n >= 1e4 ? `${+(n / 1e3).toFixed(1)}K` : n?.toLocaleString('en-US');
const firstLine = post.text.split(/\n+/)[0].trim();
const entry = {
  slug, platform: 'instagram', id: code, url: `https://www.instagram.com/p/${code}/`,
  title: firstLine.length > 90 ? `${firstLine.slice(0, 88).trimEnd()}…` : firstLine || `Post by @${post.username}`,
  author: `${post.fullName || post.username} (@${post.username})`, authorUrl: `https://www.instagram.com/${post.username}/`,
  authorName: post.fullName || post.username, authorHandle: post.username, authorAvatar: `insta/${slug}/avatar.jpg`, verified: post.verified,
  date: new Date(post.taken * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  text: post.text, likes: compact(post.likes), comments: compact(post.comments), media,
};
if (note) entry.note = note;

const list = JSON.parse(await readFile(listPath, 'utf8').catch(() => '{"insta":[]}'));
const at = list.insta.findIndex((p) => p.slug === slug);
if (at >= 0) list.insta[at] = { ...list.insta[at], ...entry, added: list.insta[at].added };
else list.insta.push({ ...entry, added: today });
await writeFile(listPath, `{\n  "insta": [\n${list.insta.map((p) => `    ${JSON.stringify(p)}`).join(',\n')}\n  ]\n}\n`);
console.log(`${at >= 0 ? 'Updated' : 'Added'} ${slug}: ${entry.title} — ${entry.author} (${media.length} ${media.length === 1 ? 'item' : 'items'})`);
