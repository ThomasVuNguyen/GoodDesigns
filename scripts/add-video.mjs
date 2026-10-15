// Adds a YouTube or X video to gallery/videos.json and saves its thumbnail to gallery/thumbs/videos/<slug>.jpg.
// Usage: node scripts/add-video.mjs <url> ["optional note"]
//   https://www.youtube.com/watch?v=ID, https://youtu.be/ID, https://www.youtube.com/shorts/ID
//   https://x.com/<user>/status/ID, https://twitter.com/<user>/status/ID
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const listPath = path.join(root, 'gallery/videos.json');
const [input, note] = process.argv.slice(2);
if (!input) { console.error('Usage: node scripts/add-video.mjs <youtube or x url> ["note"]'); process.exit(1); }

const url = new URL(input);
const host = url.hostname.replace(/^(www|m|mobile)\./, '');
const today = new Date().toLocaleDateString('en-CA');
const json = async (u) => { const r = await fetch(u); if (!r.ok) throw new Error(`${r.status} ${u}`); return r.json(); };

let video, thumbUrls;
if (host === 'youtube.com' || host === 'youtu.be') {
  const id = host === 'youtu.be' ? url.pathname.slice(1) : url.searchParams.get('v') || url.pathname.split('/')[2];
  if (!/^[\w-]{11}$/.test(id || '')) throw new Error(`No YouTube video id in ${input}`);
  const o = await json(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}`);
  video = { slug: `youtube-${id}`, platform: 'youtube', id, url: `https://www.youtube.com/watch?v=${id}`, title: o.title, author: o.author_name, authorUrl: o.author_url };
  thumbUrls = [`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`, `https://i.ytimg.com/vi/${id}/hqdefault.jpg`];
} else if (host === 'x.com' || host === 'twitter.com') {
  const [, user, , id] = url.pathname.split('/');
  if (!/^\d+$/.test(id || '')) throw new Error(`No post id in ${input}`);
  // FxTwitter's public API returns the post's text, author and video poster.
  const { tweet } = await json(`https://api.fxtwitter.com/${user}/status/${id}`);
  const media = tweet.media?.videos?.[0];
  if (!media) throw new Error(`Post ${id} has no video`);
  // The title is the post's first line, without a trailing t.co link.
  const text = tweet.text.replace(/\s*https:\/\/t\.co\/\S+$/, '').trim().split(/\n+/)[0].trim();
  video = { slug: `x-${id}`, platform: 'x', id, url: `https://x.com/${tweet.author.screen_name}/status/${id}`, title: text.length > 90 ? `${text.slice(0, 88).trimEnd()}…` : text || `Post by @${tweet.author.screen_name}`, author: `${tweet.author.name} (@${tweet.author.screen_name})`, authorUrl: `https://x.com/${tweet.author.screen_name}` };
  thumbUrls = [media.thumbnail_url].filter(Boolean);
} else {
  throw new Error(`Only YouTube and X links are supported (got ${host})`);
}
if (note) video.note = note;
video.added = today;

let thumb;
for (const u of thumbUrls) { const r = await fetch(u); if (r.ok) { thumb = Buffer.from(await r.arrayBuffer()); break; } }
if (!thumb) throw new Error('Could not download a thumbnail');
await mkdir(path.join(root, 'gallery/thumbs/videos'), { recursive: true });
await writeFile(path.join(root, `gallery/thumbs/videos/${video.slug}.jpg`), thumb);

const list = JSON.parse(await readFile(listPath, 'utf8').catch(() => '{"videos":[]}'));
const at = list.videos.findIndex((v) => v.slug === video.slug);
if (at >= 0) list.videos[at] = { ...list.videos[at], ...video, added: list.videos[at].added };
else list.videos.push(video);
await writeFile(listPath, `{\n  "videos": [\n${list.videos.map((v) => `    ${JSON.stringify(v)}`).join(',\n')}\n  ]\n}\n`);
console.log(`${at >= 0 ? 'Updated' : 'Added'} ${video.slug}: ${video.title} — ${video.author}`);
