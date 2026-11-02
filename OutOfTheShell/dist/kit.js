// kit.js — paper and dry media, laid down pixel by pixel. Everything is measured in millimetres on one tall wall
// (180 mm wide); a sheet is a window onto that wall at `ppm` pixels per millimetre, so a thread that crosses two sheets
// is the same thread on both. Paper is a height field (`tooth`): light pressure only catches the crests, so the grain
// shows; pressure reaches into the pits and fills them. The drawing is seeded, so the same code draws the same picture.
(function (root) {
  'use strict';

  // ---------- numbers
  function hash(s) { let h = 2166136261 >>> 0; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) {
    let a = hash(String(seed));
    const R = () => { a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    R.gauss = (m = 0, s = 1) => { const u = 1 - R(), v = R(); return m + s * Math.sqrt(-2 * Math.log(u)) * Math.cos(6.2831853 * v); };
    R.range = (a0, b0) => a0 + (b0 - a0) * R();
    R.pick = (arr) => arr[(R() * arr.length) | 0];
    return R;
  }
  const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
  const smooth = (e0, e1, x) => { const t = clamp((x - e0) / (e1 - e0)); return t * t * (3 - 2 * t); };
  const hex = (h) => { h = h.replace('#', ''); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; };
  const C = (c) => (typeof c === 'string' ? hex(c) : c);
  // band-limited wander: a sum of a few sines with random phases, roughly unit amplitude
  function wander(R, lamMin, lamMax, n = 3) {
    const parts = []; for (let i = 0; i < n; i++) { const lam = lamMin * Math.pow(lamMax / lamMin, (i + R()) / n); parts.push([6.2831853 / lam, R() * 6.2831853, 1 / Math.sqrt(n) * (0.6 + 0.8 * R())]); }
    return (s) => { let v = 0; for (const [k, p, a] of parts) v += a * Math.sin(k * s + p); return v; };
  }

  // ---------- paper
  const PAPERS = {
    cream:   { base: '#f3ecdb', depth: 0.5, fibre: 0.55, tone: 2.6 },
    hot:     { base: '#f6f1e5', depth: 0.3, fibre: 0.4, tone: 1.8 },
    kraft:   { base: '#b48d63', depth: 0.75, fibre: 0.9, tone: 4.2, flecks: true },
    teal:    { base: '#123b3f', depth: 0.55, fibre: 0.55, tone: 2.4 },
    navy:    { base: '#1b2747', depth: 0.55, fibre: 0.55, tone: 2.6 },
    black:   { base: '#171719', depth: 0.55, fibre: 0.55, tone: 2.2 },
    plum:    { base: '#4a2a40', depth: 0.55, fibre: 0.6, tone: 2.6 },
    peach:   { base: '#f0cfae', depth: 0.5, fibre: 0.55, tone: 2.6 },
    sage:    { base: '#c9d3b6', depth: 0.5, fibre: 0.55, tone: 2.6 },
    graph:   { base: '#f1f4ef', depth: 0.45, fibre: 0.45, tone: 2.0, grid: '#86b4b0' },
  };
  function boxBlur(src, tmp, W, H, r) {
    const k = 1 / (2 * r + 1);
    for (let y = 0; y < H; y++) { const o = y * W; let acc = 0; for (let x = -r; x <= r; x++) acc += src[o + clamp(x, 0, W - 1)]; for (let x = 0; x < W; x++) { tmp[o + x] = acc * k; acc += src[o + Math.min(W - 1, x + r + 1)] - src[o + Math.max(0, x - r)]; } }
    for (let x = 0; x < W; x++) { let acc = 0; for (let y = -r; y <= r; y++) acc += tmp[clamp(y, 0, H - 1) * W + x]; for (let y = 0; y < H; y++) { src[y * W + x] = acc * k; acc += tmp[Math.min(H - 1, y + r + 1) * W + x] - tmp[Math.max(0, y - r) * W + x]; } }
  }
  // smooth value noise from a coarse grid, added into out
  function coarse(out, W, H, cell, amp, R) {
    const gw = Math.ceil(W / cell) + 3, gh = Math.ceil(H / cell) + 3, g = new Float32Array(gw * gh);
    for (let i = 0; i < g.length; i++) g[i] = R() * 2 - 1;
    const inv = 1 / cell;
    for (let y = 0; y < H; y++) {
      const fy = y * inv, y0 = fy | 0, ty = fy - y0, sy = ty * ty * (3 - 2 * ty);
      for (let x = 0; x < W; x++) {
        const fx = x * inv, x0 = fx | 0, tx = fx - x0, sx = tx * tx * (3 - 2 * tx), i = y0 * gw + x0;
        const top = g[i] + (g[i + 1] - g[i]) * sx, bot = g[i + gw] + (g[i + gw + 1] - g[i + gw]) * sx;
        out[y * W + x] += amp * (top + (bot - top) * sy);
      }
    }
  }

  function Sheet(o) {
    const ppm = o.ppm, W = Math.round(o.w * ppm), H = Math.round(o.h * ppm), N = W * H;
    const S = { W, H, ppm, ox: o.x || 0, oy: o.y || 0, w: o.w, h: o.h, seed: o.seed };
    const spec = PAPERS[o.paper] || PAPERS.cream, base = hex(spec.base), R = rng(o.seed + ':paper');
    const t = new Float32Array(N), tmp = new Float32Array(N);
    for (let i = 0; i < N; i++) t[i] = R();
    boxBlur(t, tmp, W, H, 1); boxBlur(t, tmp, W, H, 1);
    let m = 0, v = 0; for (let i = 0; i < N; i += 5) m += t[i]; m /= Math.ceil(N / 5);
    for (let i = 0; i < N; i += 5) v += (t[i] - m) ** 2; v = Math.sqrt(v / Math.ceil(N / 5)) || 1;
    for (let i = 0; i < N; i++) t[i] = (t[i] - m) / v * 0.6;
    coarse(t, W, H, Math.max(3, Math.round(0.5 * ppm)), 0.42, R);
    coarse(t, W, H, Math.max(8, Math.round(2.6 * ppm)), 0.3, R);
    coarse(t, W, H, Math.round(9 * ppm), 0.16, R);
    // short curved fibres along the machine direction
    const nFib = Math.round(o.w * o.h * 0.6 * spec.fibre), dir = R() * 0.5 - 0.25;
    for (let k = 0; k < nFib; k++) {
      let x = R() * W, y = R() * H, a = dir + R.gauss(0, 0.7); const len = Math.min(8, Math.exp(R.gauss(0.45, 0.55))) * ppm, amp = (R() < 0.62 ? 1 : -0.8) * (0.5 + R() * 0.6), da = R.gauss(0, 0.05);
      for (let s = 0; s < len; s += 0.7) {
        const xi = x | 0, yi = y | 0; if (xi > 0 && yi > 0 && xi < W - 1 && yi < H - 1) t[yi * W + xi] += amp * Math.sin(Math.PI * s / len) ** 0.6;
        x += Math.cos(a) * 0.7; y += Math.sin(a) * 0.7; a += da;
      }
    }
    m = 0; v = 0; for (let i = 0; i < N; i += 5) m += t[i]; m /= Math.ceil(N / 5);
    for (let i = 0; i < N; i += 5) v += (t[i] - m) ** 2; v = Math.sqrt(v / Math.ceil(N / 5)) || 1;
    for (let i = 0; i < N; i++) t[i] = clamp(0.5 + (t[i] - m) / v * 0.21);
    // the scanned tone: base, a little pulp mottle, the tooth catching the light
    const rgb = new Float32Array(N * 3), mot = new Float32Array(N);
    coarse(mot, W, H, Math.round(45 * ppm), 0.55, R); coarse(mot, W, H, Math.round(11 * ppm), 0.5, R);
    const lum = (base[0] * 0.3 + base[1] * 0.59 + base[2] * 0.11) / 255, ts = spec.tone * (0.55 + 0.45 * lum), ms = 0.5 + 0.9 * lum;
    for (let i = 0; i < N; i++) { const d = (t[i] - 0.5) * ts + mot[i] * ms; rgb[3 * i] = base[0] + d; rgb[3 * i + 1] = base[1] + d * 0.97; rgb[3 * i + 2] = base[2] + d * 0.92; }
    if (spec.flecks) for (let k = 0, nf = Math.round(o.w * o.h * 0.05); k < nf; k++) {
      const dark = R() < 0.6, c = dark ? [98, 68, 42] : [214, 184, 146], al = dark ? 0.1 + R() * 0.14 : 0.12 + R() * 0.16;
      let x = R() * W, y = R() * H, a = R() * 6.28; const steps = (0.8 + R() * 2.6) * ppm;
      for (let s = 0; s < steps; s++) { const xi = x | 0, yi = y | 0; if (xi >= 0 && yi >= 0 && xi < W && yi < H) { const j = 3 * (yi * W + xi); for (let q = 0; q < 3; q++) rgb[j + q] += (c[q] - rgb[j + q]) * al; } x += Math.cos(a) * 0.8; y += Math.sin(a) * 0.8; a += R.gauss(0, 0.06); }
    }
    S.tooth = t; S.rgb = rgb; S.depth = spec.depth; S.base = base;
    if (spec.grid) { // printed grid in wall millimetres, so it lines up across sheets
      const ink = hex(spec.grid);
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const gx = x / ppm + S.ox, gy = y / ppm + S.oy;
        const fx = Math.abs(gx - Math.round(gx)), fy = Math.abs(gy - Math.round(gy));
        const major = (Math.round(gx) % 5 === 0 && fx * ppm < 0.6) || (Math.round(gy) % 5 === 0 && fy * ppm < 0.6);
        const minor = fx * ppm < 0.35 || fy * ppm < 0.35;
        if (!major && !minor) continue;
        const i = y * W + x, a = (major ? 0.5 : 0.22) * (0.55 + 0.9 * t[i]), j = 3 * i;
        for (let q = 0; q < 3; q++) rgb[j + q] += (ink[q] - rgb[j + q]) * a;
      }
    }
    return S;
  }

  // ---------- media
  // reachB / reachK: how far the tip reaches into the tooth at no / full pressure. soft: how sharp the contact is.
  const MEDIA = {
    pencil: { r: 0.2, reachB: 0.26, reachK: 0.9, soft: 0.3, opac: 0.86, edge: 0.45 },
    hard:   { r: 0.14, reachB: 0.2, reachK: 0.75, soft: 0.28, opac: 0.7, edge: 0.4 },
    pastel: { r: 1.1, reachB: 0.06, reachK: 1.0, soft: 0.26, opac: 0.92, edge: 0.6 },
    gel:    { r: 0.32, reachB: 0.78, reachK: 0.3, soft: 0.1, opac: 0.97, edge: 0.2 },
    ink:    { r: 0.18, reachB: 0.92, reachK: 0.15, soft: 0.2, opac: 1, edge: 0.1, multiply: true },
    // gouache-like cover for glass and paper tags: it sits on the crests and the pits alike
    cover:  { r: 0.3, reachB: 0.97, reachK: 0.1, soft: 0.16, opac: 0.97, edge: 0.1 },
  };
  const contact = (h, reach, soft) => clamp((h - (1 - reach)) / soft + 0.5);

  function catmull(pts, ds) {
    if (pts.length < 3) return pts.slice();
    const out = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      const n = Math.max(2, Math.ceil(Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) / ds));
      for (let k = 0; k < n; k++) {
        const t = k / n, t2 = t * t, t3 = t2 * t;
        out.push([0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
                  0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)]);
      }
    }
    out.push(pts[pts.length - 1].slice());
    return out;
  }
  // what the hand did with the line it aimed at: bow, tremor, a tapering pressure, all in wall mm
  function handPath(pts, o, R) {
    const curve = o.straight ? pts : catmull(pts, 0.4);
    const out = []; const cum = [0];
    for (let i = 1; i < curve.length; i++) cum.push(cum[i - 1] + Math.hypot(curve[i][0] - curve[i - 1][0], curve[i][1] - curve[i - 1][1]));
    const L = cum[cum.length - 1] || 0.01, step = o.step || 0.12;
    const wb = wander(R, Math.max(6, L * 0.9), Math.max(20, L * 3.5), 2), wm = wander(R, 2.5, 14, 3), wh = wander(R, 0.5, 2.6, 3), wp = wander(R, 5, 40, 3);
    const trem = o.tremor ?? 1, bow = Math.min(1.4, L * 0.004) * trem * (o.bow ?? 1);
    let seg = 0;
    for (let s = 0; s <= L; s += step) {
      while (seg < curve.length - 2 && cum[seg + 1] < s) seg++;
      const a = curve[seg], b = curve[seg + 1] || a, span = cum[seg + 1] - cum[seg] || 1e-6, u = clamp((s - cum[seg]) / span);
      let dx = b[0] - a[0], dy = b[1] - a[1]; const dl = Math.hypot(dx, dy) || 1; dx /= dl; dy /= dl;
      const off = bow * wb(s) + 0.07 * trem * wm(s) + 0.02 * trem * wh(s);
      const ta = o.taper === false ? 1 : Math.min(smooth(0, Math.min(3, L * 0.3), s), smooth(0, Math.min(5, L * 0.4), L - s));
      const p = clamp((o.pressure ?? 0.6) * (0.3 + 0.7 * ta) * (1 + 0.14 * wp(s)), 0.03, 1);
      out.push([a[0] + (b[0] - a[0]) * u - dy * off, a[1] + (b[1] - a[1]) * u + dx * off, p, dx, dy]);
    }
    return out;
  }

  // one stroke: the deposit is collected in a map (max within the stroke, so the footprints do not pile up), then laid
  // over the paper once
  function stroke(S, pts, o = {}) {
    const M = Object.assign({}, MEDIA[o.media || 'pencil'], o.tool || {});
    const R = rng(o.seed || (S.seed + ':' + pts[0][0].toFixed(2) + ',' + pts[0][1].toFixed(2) + ':' + pts.length));
    const path = handPath(pts, o, R), ppm = S.ppm, rBase = (o.r ?? M.r) * ppm;
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    for (const q of path) { const x = (q[0] - S.ox) * ppm, y = (q[1] - S.oy) * ppm; if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y; }
    const pad = rBase * 1.6 + 2; x0 = Math.max(0, Math.floor(x0 - pad)); y0 = Math.max(0, Math.floor(y0 - pad)); x1 = Math.min(S.W - 1, Math.ceil(x1 + pad)); y1 = Math.min(S.H - 1, Math.ceil(y1 + pad));
    if (x1 < x0 || y1 < y0) return;
    const bw = x1 - x0 + 1, bh = y1 - y0 + 1, map = new Float32Array(bw * bh), t = S.tooth, wr = wander(R, 1.5, 12, 3);
    for (let k = 0; k < path.length; k++) {
      const [mx, my, p] = path[k], cx = (mx - S.ox) * ppm, cy = (my - S.oy) * ppm;
      const r = Math.max(0.55, rBase * (0.75 + 0.35 * p) * (1 + 0.05 * wr(k * 0.12)));
      const reachP = M.reachB + M.reachK * p;
      const xa = Math.max(x0, Math.floor(cx - r - 1)), xb = Math.min(x1, Math.ceil(cx + r + 1)), ya = Math.max(y0, Math.floor(cy - r - 1)), yb = Math.min(y1, Math.ceil(cy + r + 1));
      for (let y = ya; y <= yb; y++) for (let x = xa; x <= xb; x++) {
        const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy); let cov = r + 0.5 - d; if (cov <= 0) continue; if (cov > 1) cov = 1;
        const q = d / r, reach = reachP * (1 - M.edge * (q > 1 ? 1 : q * q));
        const a = cov * contact(t[y * S.W + x], reach, M.soft) * M.opac * (o.alpha ?? 1);
        const j = (y - y0) * bw + (x - x0); if (a > map[j]) map[j] = a;
      }
    }
    lay(S, map, x0, y0, bw, bh, C(o.color || '#3c3c42'), M.multiply);
  }
  function lay(S, map, x0, y0, bw, bh, col, multiply) {
    const rgb = S.rgb;
    for (let y = 0; y < bh; y++) for (let x = 0; x < bw; x++) {
      const a = map[y * bw + x]; if (a <= 0.002) continue;
      const j = 3 * ((y + y0) * S.W + x + x0);
      if (multiply) for (let q = 0; q < 3; q++) rgb[j + q] *= 1 - a * (1 - col[q] / 255);
      else for (let q = 0; q < 3; q++) rgb[j + q] += (col[q] - rgb[j + q]) * a;
    }
  }

  // a rubbed area of pastel or pencil: `inside(x, y)` in wall mm returns 0..1. The pigment runs in lanes along `angle`
  // and catches on the tooth; `pressure` decides how far into the pits it reaches.
  function rub(S, inside, box, o = {}) {
    const M = Object.assign({}, MEDIA[o.media || 'pastel'], o.tool || {}), ppm = S.ppm, col = C(o.color);
    const x0 = Math.max(0, Math.floor((box[0] - S.ox) * ppm)), y0 = Math.max(0, Math.floor((box[1] - S.oy) * ppm));
    const x1 = Math.min(S.W - 1, Math.ceil((box[2] - S.ox) * ppm)), y1 = Math.min(S.H - 1, Math.ceil((box[3] - S.oy) * ppm));
    if (x1 < x0 || y1 < y0) return;
    const R = rng(o.seed || (S.seed + ':rub:' + box.join(',') + (o.color || '')));
    const ang = o.angle ?? -0.6, ca = Math.cos(ang), sa = Math.sin(ang), lane = wander(R, 0.35, 3.2, 4), lane2 = wander(R, 4, 18, 3), along = wander(R, 3, 14, 3);
    const p = o.pressure ?? 0.55, t = S.tooth, rgb = S.rgb;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
      const gx = x / ppm + S.ox, gy = y / ppm + S.oy; const inn = inside(gx, gy); if (inn <= 0) continue;
      const u = gx * ca + gy * sa, v = -gx * sa + gy * ca;
      const pp = clamp(p * (1 + 0.22 * lane(v) + 0.12 * lane2(v) + 0.1 * along(u)), 0, 1);
      const a = inn * contact(t[y * S.W + x], M.reachB + M.reachK * pp, M.soft) * M.opac * (o.alpha ?? 1); if (a <= 0.002) continue;
      const j = 3 * (y * S.W + x);
      if (M.multiply) for (let q = 0; q < 3; q++) rgb[j + q] *= 1 - a * (1 - col[q] / 255);
      else for (let q = 0; q < 3; q++) rgb[j + q] += (col[q] - rgb[j + q]) * a;
    }
  }
  // hatching: parallel strokes across a shape, broken where they leave it
  function hatch(S, inside, box, o = {}) {
    const ang = o.angle ?? 0.8, gap = o.gap ?? 0.9, R = rng(o.seed || (S.seed + ':hatch:' + box.join(',')));
    const ca = Math.cos(ang), sa = Math.sin(ang), cx = (box[0] + box[2]) / 2, cy = (box[1] + box[3]) / 2, rad = Math.hypot(box[2] - box[0], box[3] - box[1]) / 2;
    for (let v = -rad; v <= rad; v += gap * (0.8 + 0.4 * R())) {
      let run = [];
      const flush = () => { if (run.length > 1) stroke(S, [run[0], run[run.length - 1]], Object.assign({}, o, { seed: undefined, straight: true, bow: 0.3 })); run = []; };
      for (let u = -rad; u <= rad; u += 0.3) {
        const x = cx + u * ca - v * sa, y = cy + u * sa + v * ca;
        if (inside(x, y) > 0.5 && R() > (o.skip ?? 0.004)) run.push([x, y]); else flush();
      }
      flush();
    }
  }

  // lettering: the type is set in Kevin Sans and then laid down through the tooth like a soft pencil or gel pen
  let mk = null;
  function maskCanvas(w, h) {
    if (typeof OffscreenCanvas !== 'undefined') return new OffscreenCanvas(w, h);
    const c = document.createElement('canvas'); c.width = w; c.height = h; return c;
  }
  function measure(text, size, weight) {
    if (!mk) mk = maskCanvas(8, 8).getContext('2d');
    mk.font = `${weight || 400} ${size}px "Kevin Sans"`; mk.letterSpacing = `${size * 0.06}px`;
    return mk.measureText(text).width;
  }
  // o.wrap (mm): break into lines no wider than that. o.fit (mm): shrink the type until the widest line fits.
  function wrap(text, sizeMm, weight, maxMm) {
    const out = [];
    for (const para of String(text).split('\n')) {
      let line = '';
      for (const word of para.split(' ')) { const next = line ? line + ' ' + word : word; if (line && measure(next, sizeMm * 10, weight) / 10 > maxMm) { out.push(line); line = word; } else line = next; }
      out.push(line);
    }
    return out;
  }
  function write(S, text, x, y, o = {}) {
    const ppm = S.ppm, weight = o.weight || 400;
    let sizeMm = o.size || 4;
    if (o.fit) { const wMax = Math.max(...String(text).split('\n').map((l) => measure(l, sizeMm * 10, weight) / 10)); if (wMax > o.fit) sizeMm *= o.fit / wMax; }
    const size = sizeMm * ppm, lines = o.wrap ? wrap(text, sizeMm, weight, o.wrap) : String(text).split('\n'), lh = (o.lh || 1.22) * size;
    const widths = lines.map((l) => measure(l, size, weight)), tw = Math.max(...widths);
    const pad = Math.ceil(size * 0.6), w = Math.ceil(tw + pad * 2), h = Math.ceil(lh * lines.length + pad * 2);
    let px = (x - S.ox) * ppm, py = (y - S.oy) * ppm;
    const align = o.align || 'left'; if (align === 'center') px -= tw / 2; else if (align === 'right') px -= tw;
    if (o.middle) py -= (lh * lines.length) / 2;
    const ox = Math.floor(px - pad), oy = Math.floor(py - pad);
    if (ox > S.W || oy > S.H || ox + w < 0 || oy + h < 0) return { w: tw / ppm, h: lh * lines.length / ppm };
    const cv = maskCanvas(w, h), g = cv.getContext('2d');
    g.font = `${weight} ${size}px "Kevin Sans"`; g.letterSpacing = `${size * 0.06}px`; g.textBaseline = 'top'; g.fillStyle = '#000';
    if (o.rot) { g.translate(w / 2, h / 2); g.rotate(o.rot); g.translate(-w / 2, -h / 2); }
    lines.forEach((l, i) => { const lx = align === 'center' ? (tw - widths[i]) / 2 : align === 'right' ? tw - widths[i] : 0; g.fillText(l, px - ox + lx, py - oy + i * lh + size * 0.08); });
    const im = g.getImageData(0, 0, w, h).data, M = Object.assign({}, MEDIA[o.media || 'gel'], o.tool || {}), col = C(o.color || '#2a2622');
    const map = new Float32Array(w * h), t = S.tooth, pr = o.pressure ?? 0.75;
    for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) {
      const a0 = im[4 * (yy * w + xx) + 3] / 255; if (!a0) continue; const X = xx + ox, Y = yy + oy; if (X < 0 || Y < 0 || X >= S.W || Y >= S.H) continue;
      map[yy * w + xx] = a0 * contact(t[Y * S.W + X], M.reachB + M.reachK * pr, M.soft) * M.opac;
    }
    // clip the map to the sheet before laying it
    const cx0 = Math.max(0, ox), cy0 = Math.max(0, oy), cx1 = Math.min(S.W, ox + w), cy1 = Math.min(S.H, oy + h), cw = cx1 - cx0, ch = cy1 - cy0;
    if (cw > 0 && ch > 0) { const sub = new Float32Array(cw * ch); for (let yy = 0; yy < ch; yy++) for (let xx = 0; xx < cw; xx++) sub[yy * cw + xx] = map[(yy + cy0 - oy) * w + xx + cx0 - ox]; lay(S, sub, cx0, cy0, cw, ch, col, M.multiply); }
    return { w: tw / ppm, h: lh * lines.length / ppm };
  }

  // a soft wash under everything (cast shadow, glow): a gaussian-ish falloff, laid flat with a breath of tooth
  function glow(S, cx, cy, rx, ry, o = {}) {
    const col = C(o.color), a0 = o.alpha ?? 0.3, ppm = S.ppm;
    const x0 = Math.max(0, Math.floor((cx - rx * 1.6 - S.ox) * ppm)), x1 = Math.min(S.W - 1, Math.ceil((cx + rx * 1.6 - S.ox) * ppm));
    const y0 = Math.max(0, Math.floor((cy - ry * 1.6 - S.oy) * ppm)), y1 = Math.min(S.H - 1, Math.ceil((cy + ry * 1.6 - S.oy) * ppm));
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
      const dx = (x / ppm + S.ox - cx) / rx, dy = (y / ppm + S.oy - cy) / ry, d2 = dx * dx + dy * dy; if (d2 > 2.56) continue;
      const a = a0 * Math.exp(-d2 * 1.6) * (0.75 + 0.5 * S.tooth[y * S.W + x]); const j = 3 * (y * S.W + x);
      if (o.multiply) for (let q = 0; q < 3; q++) S.rgb[j + q] *= 1 - a * (1 - col[q] / 255); else for (let q = 0; q < 3; q++) S.rgb[j + q] += (col[q] - S.rgb[j + q]) * a;
    }
  }

  function pixels(S) {
    const N = S.W * S.H, out = new Uint8ClampedArray(N * 4);
    for (let i = 0; i < N; i++) { out[4 * i] = S.rgb[3 * i]; out[4 * i + 1] = S.rgb[3 * i + 1]; out[4 * i + 2] = S.rgb[3 * i + 2]; out[4 * i + 3] = 255; }
    return out;
  }

  // shape helpers in wall mm
  const ellipse = (cx, cy, rx, ry, rot = 0, soft = 0.25) => (x, y) => {
    const c = Math.cos(rot), s = Math.sin(rot), dx = x - cx, dy = y - cy, u = (dx * c + dy * s) / rx, v = (-dx * s + dy * c) / ry;
    const d = Math.sqrt(u * u + v * v); return clamp((1 - d) * Math.min(rx, ry) / soft + 0.5);
  };
  const ellipsePts = (cx, cy, rx, ry, rot = 0, n = 40, a0 = 0, a1 = 6.2832, R = null, wob = 0) => {
    const out = [], c = Math.cos(rot), s = Math.sin(rot);
    for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n, k = 1 + (R ? (R() - 0.5) * wob : 0); const u = Math.cos(a) * rx * k, v = Math.sin(a) * ry * k; out.push([cx + u * c - v * s, cy + u * s + v * c]); }
    return out;
  };
  // a closed polygon's inside test with a soft edge
  const poly = (pts, soft = 0.2) => {
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; for (const p of pts) { x0 = Math.min(x0, p[0]); y0 = Math.min(y0, p[1]); x1 = Math.max(x1, p[0]); y1 = Math.max(y1, p[1]); }
    const f = (x, y) => {
      if (x < x0 - 1 || x > x1 + 1 || y < y0 - 1 || y > y1 + 1) return 0;
      let inside = false, dmin = 1e9;
      for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
        const [xi, yi] = pts[i], [xj, yj] = pts[j];
        if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
        const ex = xj - xi, ey = yj - yi, l2 = ex * ex + ey * ey || 1, tt = clamp(((x - xi) * ex + (y - yi) * ey) / l2), dx = xi + ex * tt - x, dy = yi + ey * tt - y; dmin = Math.min(dmin, dx * dx + dy * dy);
      }
      const d = Math.sqrt(dmin); return clamp(((inside ? d : -d) / soft) + 0.5);
    };
    f.box = [x0, y0, x1, y1]; return f;
  };

  root.Kit = { rng, hash, clamp, smooth, hex, wander, Sheet, stroke, rub, hatch, write, measure, glow, pixels, ellipse, ellipsePts, poly, catmull, PAPERS };
})(typeof self !== 'undefined' ? self : this);
