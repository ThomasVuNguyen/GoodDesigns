// Serves Notion/dist the way Firebase Hosting serves the gallery: /pricing answers with pricing/index.html, without
// redirecting to /pricing/.
// Usage: node Notion/tools/serve.mjs [port] [--gallery]
//   --gallery serves the capture under /sites/notion/ with the gallery build's path rewrite applied on the fly
//   (scripts/build-gallery.mjs), to check the capture as it runs on gooddesigns.web.app.
import http from 'node:http';
import { createReadStream, existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const port = Number(process.argv.find((a) => /^\d+$/.test(a)) || 4340);
const gallery = process.argv.includes('--gallery');
const prefix = gallery ? '/sites/notion' : '';
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.gif': 'image/gif', '.avif': 'image/avif', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime', '.pdf': 'application/pdf',
  '.webmanifest': 'application/manifest+json', '.txt': 'text/plain', '.wasm': 'application/wasm',
};

// The same rewrite as scripts/build-gallery.mjs: root-absolute paths whose first segment exists in dist/ get the prefix.
const names = readdirSync(dist).filter((n) => n !== 'index.html').sort((a, b) => b.length - a.length).map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
const re = new RegExp(`(["'\`(=,;\\s])/(${names.join('|')})(?=[/"'?#)\\s\\\\]|$)`, 'g');
const rewrite = (text) => text.replace(re, `$1${prefix}/$2`);

http.createServer((req, res) => {
  let rel;
  try { rel = decodeURIComponent(new URL(req.url, 'http://x').pathname); } catch { res.writeHead(400).end(); return; }
  if (gallery) {
    if (!rel.startsWith(prefix)) { res.writeHead(302, { location: prefix + '/' }).end(); return; }
    rel = rel.slice(prefix.length) || '/';
  }
  let file = path.join(dist, rel);
  if (!file.startsWith(dist)) { res.writeHead(403).end(); return; }
  if (existsSync(file) && statSync(file).isDirectory()) file = path.join(file, 'index.html');
  else if (!existsSync(file) && existsSync(file + '.html')) file += '.html';
  if (!existsSync(file)) {
    res.writeHead(404, { 'content-type': 'text/html' }).end('<h1>404</h1>');
    return;
  }
  const ext = path.extname(file).toLowerCase();
  const type = types[ext] || 'application/octet-stream';
  if (gallery && ['.html', '.css', '.js', '.mjs'].includes(ext)) {
    const body = Buffer.from(rewrite(readFileSync(file, 'utf8')));
    res.writeHead(200, { 'content-type': type, 'content-length': body.length }).end(body);
    return;
  }
  const { size } = statSync(file);
  const range = /bytes=(\d*)-(\d*)/.exec(req.headers.range || '');
  if (range) {
    const start = range[1] ? Number(range[1]) : 0;
    const end = range[2] ? Number(range[2]) : size - 1;
    res.writeHead(206, { 'content-type': type, 'content-range': `bytes ${start}-${end}/${size}`, 'accept-ranges': 'bytes', 'content-length': end - start + 1 });
    createReadStream(file, { start, end }).pipe(res);
    return;
  }
  res.writeHead(200, { 'content-type': type, 'content-length': size, 'accept-ranges': 'bytes' });
  createReadStream(file).pipe(res);
}).listen(port, () => console.log(`Notion capture on http://127.0.0.1:${port}${prefix}/`));
