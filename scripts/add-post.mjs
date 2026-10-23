// Adds an X post to gallery/posts.json and captures its full thumbnail to gallery/thumbs/posts/<slug>.jpg.
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
const json = async (u, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const r = await fetch(u);
      if (r.ok) return await r.json();
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise((res) => setTimeout(res, 1500));
    }
  }
  throw new Error(`Failed fetching ${u}`);
};

if (host !== 'x.com' && host !== 'twitter.com') {
  throw new Error(`Only X/Twitter links are supported (got ${host})`);
}

const [, user, , id] = url.pathname.split('/');
if (!/^\d+$/.test(id || '')) throw new Error(`No post id in ${input}`);

// FxTwitter's public API returns the full post text, author, engagement, and media.
const { tweet } = await json(`https://api.fxtwitter.com/${user}/status/${id}`);

const rawTitle = tweet.text
  .replace(/\s*https:\/\/t\.co\/\S+$/g, '')
  .trim()
  .split(/\n+/)[0]
  .replace(/[:\s]+$/, '')
  .trim();

const fmt = (n) => n == null ? '' : n >= 1e6 ? (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M' : n >= 1e3 ? (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'K' : String(n);
const d = new Date(tweet.created_timestamp * 1000);
const timeStr = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const photos = tweet.media?.photos?.map((p) => p.url) || [];
const videoObj = tweet.media?.videos?.[0];
const video = videoObj?.url || null;
const videoPoster = videoObj?.thumbnail_url || null;

const post = {
  slug: `x-${id}`,
  platform: 'x',
  id,
  url: `https://x.com/${tweet.author.screen_name}/status/${id}`,
  title: rawTitle.length > 90 ? `${rawTitle.slice(0, 88).trimEnd()}…` : rawTitle || `Post by @${tweet.author.screen_name}`,
  author: `${tweet.author.name} (@${tweet.author.screen_name})`,
  authorName: tweet.author.name,
  authorHandle: tweet.author.screen_name,
  authorUrl: `https://x.com/${tweet.author.screen_name}`,
  authorAvatar: tweet.author.avatar_url,
  verified: Boolean(tweet.author.verification?.verified),
  date: `${timeStr} · ${dateStr}`,
  text: tweet.text,
  likes: fmt(tweet.likes),
  reposts: fmt(tweet.retweets),
  bookmarks: fmt(tweet.bookmarks),
  replies: fmt(tweet.replies),
  views: fmt(tweet.views),
};

if (photos.length) post.photos = photos;
if (video) {
  post.video = video;
  if (videoPoster) post.videoPoster = videoPoster;
}

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

async function captureThumbnail(item, destPath) {
  const chromium = await getChromium();
  const chromeExe = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const launchOptions = existsSync(chromeExe) ? { executablePath: chromeExe } : {};
  const browser = await chromium.launch(launchOptions);
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 750 }, deviceScaleFactor: 2 });
    
    let mediaSnippet = '';
    const cardWidth = item.video ? '780px' : (item.photos?.length ? '960px' : '900px');
    const contentFontSize = item.text.length > 350 ? '13px' : '15px';
    const mediaMaxHeight = item.text.length > 200 ? '340px' : '450px';

    if (item.video && item.videoPoster) {
      mediaSnippet = `
        <div class="media-wrap" style="max-height:${mediaMaxHeight};">
          <img src="${item.videoPoster}">
          <div class="play-btn"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M8 5.5v13l11-6.5z"/></svg></div>
        </div>`;
    } else if (item.photos?.length) {
      mediaSnippet = `
        <div class="media-wrap" style="max-height:${mediaMaxHeight};">
          <img src="${item.photos[0]}">
        </div>`;
    }

    const html = `
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        * { box-sizing: border-box; }
        body {
          margin: 0; padding: 20px 28px; width: 1200px; height: 750px;
          background: #faf8f3;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          display: flex; align-items: center; justify-content: center;
        }
        .card {
          width: ${cardWidth}; max-height: 710px;
          background: #ffffff;
          border: 1px solid #dfdbd2;
          border-radius: 18px;
          padding: 22px 26px;
          box-shadow: 0 4px 24px rgba(21, 20, 18, 0.06);
          display: flex; flex-direction: column;
        }
        .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .user { display: flex; align-items: center; gap: 12px; }
        .avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; }
        .name-box { line-height: 1.25; }
        .name { font-weight: 700; font-size: 16px; color: #0f1419; display: flex; align-items: center; gap: 4px; }
        .badge { color: #1d9bf0; display: inline-flex; }
        .handle { font-size: 14px; color: #536471; }
        .x-logo svg { width: 20px; height: 20px; fill: #0f1419; }
        .content {
          font-size: ${contentFontSize};
          line-height: 1.42;
          color: #0f1419;
          white-space: pre-wrap;
          word-break: break-word;
          margin-bottom: ${mediaSnippet ? '12px' : '0'};
        }
        .mention { color: #1d9bf0; text-decoration: none; font-weight: 500; }
        .media-wrap {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #cfd9de;
          display: flex; align-items: center; justify-content: center;
          background: #000;
        }
        .media-wrap img { width: 100%; height: auto; max-height: ${mediaMaxHeight}; object-fit: cover; display: block; }
        .play-btn {
          position: absolute;
          width: 56px; height: 56px;
          border-radius: 50%;
          background: rgba(21, 20, 18, 0.7);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        }
        .play-btn svg { width: 26px; height: 26px; margin-left: 3px; }
        .footer {
          margin-top: 12px;
          padding-top: 10px;
          border-top: 1px solid #eff3f4;
          display: flex;
          gap: 20px;
          font-size: 13px;
          color: #536471;
        }
        .footer b { color: #0f1419; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <div class="user">
            <img class="avatar" src="${item.authorAvatar}">
            <div class="name-box">
              <div class="name">${item.authorName} ${item.verified ? '<span class="badge"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"/></svg></span>' : ''}</div>
              <div class="handle">@${item.authorHandle}</div>
            </div>
          </div>
          <div class="x-logo"><svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></div>
        </div>
        <div class="content">${item.text.replace(/@([a-zA-Z0-9_]+)/g, '<span class="mention">@$1</span>')}</div>
        ${mediaSnippet}
        <div class="footer">
          <span>${item.date}</span>
          ${item.likes ? `<span><b>${item.likes}</b> Likes</span>` : ''}
          ${item.reposts ? `<span><b>${item.reposts}</b> Reposts</span>` : ''}
          ${item.bookmarks ? `<span><b>${item.bookmarks}</b> Bookmarks</span>` : ''}
        </div>
      </div>
    </body>
    </html>`;
    await page.setContent(html);
    await mkdir(path.dirname(destPath), { recursive: true });
    await page.screenshot({ path: destPath, type: 'jpeg', quality: 88 });
  } finally {
    await browser.close();
  }
}

const thumbPath = path.join(root, `gallery/thumbs/posts/${post.slug}.jpg`);
console.log(`Capturing full thumbnail for ${post.slug}...`);
await captureThumbnail(post, thumbPath);

const list = JSON.parse(await readFile(listPath, 'utf8').catch(() => '{"posts":[]}'));
const at = list.posts.findIndex((p) => p.slug === post.slug);
if (at >= 0) list.posts[at] = { ...list.posts[at], ...post, added: list.posts[at].added };
else list.posts.push(post);

await writeFile(listPath, `{\n  "posts": [\n${list.posts.map((p) => `    ${JSON.stringify(p)}`).join(',\n')}\n  ]\n}\n`);
console.log(`${at >= 0 ? 'Updated' : 'Added'} ${post.slug}: ${post.title} — ${post.author}`);
