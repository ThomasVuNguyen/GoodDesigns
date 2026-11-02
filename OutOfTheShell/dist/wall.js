// wall.js — what is drawn on each sheet: the scenes, then the chart's threads, slides and tags over them.
(function (root) {
  'use strict';
  const K = root.Kit, Ch = root.Chart;
  const { rng, stroke, rub, hatch, write, glow, ellipse, ellipsePts, poly } = K;

  const DARK = { teal: 1, navy: 1, black: 1, plum: 1 };
  const INK = '#2b2520', CHALK = '#efe6d6';
  const ink = (S) => (DARK[S.paper] ? CHALK : INK);

  // the lamp at the start of each two-hour segment, 18 Oct 19:45 to 21 Oct 19:57 (from the dataset)
  const LIGHTS = ['88,98,85', '102,94,69', '14,165,95', '13,165,92', '13,164,92', '12,164,91', '12,164,90', '12,159,89', '12,157,88', '12,141,80', '108,99,77', '106,96,77', '103,96,77', '103,95,76', '98,91,74', '87,122,98', '91,118,77', '89,116,76', '87,115,75', '86,115,74', '100,114,65', '106,118,75', '108,119,76', '105,118,76', '109,122,76', '114,128,77', '102,133,91', '103,134,94', '95,136,114', '106,137,94', '106,136,94', '106,135,95', '117,135,87', '113,126,85', '105,121,96', '109,129,103', '113,135,110'].map((s) => s.split(',').map(Number));
  // median motion per segment through the hatching night, 22 Oct 19:47 to 23 Oct 13:48
  const NIGHT = [0.012, 0.0192, 0.0244, 0.0265, 0.0305, 0.0365, 0.0403, 0.0335, 0.0322, 0.0275];
  const NIGHT_T = ['19:47', '21:47', '23:48', '01:47', '03:48', '05:48', '07:48', '09:48', '11:48', '13:48'];
  // the lamp as a pastel stick: the camera saw it through a green-yellow field, so lift it toward what the eye would call it
  const lampColour = ([r, g, b]) => { const m = Math.max(r, g, b) || 1, k = 215 / m, paper = [236, 232, 214]; return [r * k, g * k, b * k].map((v, i) => v + (paper[i] - v) * 0.5); };

  // ---------- drawn things
  function cyst(S, x, y, r, seed, o = {}) {
    const R = rng(seed), rx = r * (1 + R() * 0.08), ry = r * (0.9 + R() * 0.08), rot = R() * 3.14;
    const body = o.body || (o.wet ? '#241c18' : '#3b2b21');
    rub(S, ellipse(x, y, rx, ry, rot, 0.18), [x - r - 1, y - r - 1, x + r + 1, y + r + 1], { color: body, pressure: 0.95, angle: R() * 3, seed: seed + 'b' });
    if (!o.wet) { // the dent of a dry cyst: a pale crescent where the shell has caved in
      const a = R() * 6.28, dx = Math.cos(a) * r * 0.22, dy = Math.sin(a) * r * 0.22;
      rub(S, ellipse(x + dx, y + dy, r * 0.56, r * 0.48, a, 0.25), [x - r, y - r, x + r, y + r], { color: '#7a5940', pressure: 0.5, alpha: 0.75, seed: seed + 'd' });
      stroke(S, ellipsePts(x + dx, y + dy, r * 0.56, r * 0.48, a, 14, a + 0.6, a + 2.6), { color: '#22170f', r: 0.12, pressure: 0.5, seed: seed + 'dl' });
    }
    stroke(S, ellipsePts(x, y, rx, ry, rot, 26, 0, 6.6, R, 0.04), { color: '#1a120d', r: 0.14, pressure: 0.65, seed: seed + 'o' });
    if (o.shine !== false) stroke(S, ellipsePts(x, y, r * 0.62, r * 0.62, 0, 6, 3.7, 4.5), { media: 'gel', color: o.wet ? '#f4efe2' : '#d9c9a9', r: 0.11, alpha: 0.8, seed: seed + 'h' });
    if (o.gold) { stroke(S, ellipsePts(x, y, r + 1.1, r + 1.1, 0, 36, 0, 6.5), { media: 'gel', color: '#e2b33f', r: 0.42, pressure: 0.9, seed: seed + 'g' }); glow(S, x, y, r * 2.2, r * 2.2, { color: '#f6d27a', alpha: 0.18 }); }
  }
  // an empty shell: a pale broken ring
  function shell(S, x, y, r, seed) {
    const R = rng(seed), a = R() * 6.28;
    rub(S, (px, py) => { const d = Math.hypot(px - x, py - y) / r; return d < 1 && d > 0.78 ? K.clamp((1 - d) * 8) * K.clamp((d - 0.78) * 8) : 0; }, [x - r, y - r, x + r, y + r], { color: '#5a4636', pressure: 0.8, seed: seed + 's' });
    stroke(S, ellipsePts(x, y, r, r, 0, 22, a + 0.7, a + 5.6), { color: '#2a1d14', r: 0.12, pressure: 0.6, seed: seed + 'o' });
    stroke(S, ellipsePts(x, y, r * 0.8, r * 0.8, 0, 18, a + 0.9, a + 5.4), { color: '#c9b48a', r: 0.1, pressure: 0.5, media: 'gel', alpha: 0.5, seed: seed + 'i' });
  }
  function eyepiece(S, x, y, r, field, seed, o = {}) {
    rub(S, ellipse(x, y, r * 1.2, r * 1.2, 0, 0.4), [x - r * 1.3, y - r * 1.3, x + r * 1.3, y + r * 1.3], { color: '#141210', pressure: 0.95, seed: seed + 'ring' });
    rub(S, ellipse(x, y, r, r, 0, 0.3), [x - r, y - r, x + r, y + r], { color: field, pressure: 0.85, angle: -0.5, seed: seed + 'f' });
    glow(S, x - r * 0.2, y - r * 0.25, r * 0.7, r * 0.6, { color: '#fffbe8', alpha: o.bright ?? 0.22 });
    rub(S, (px, py) => { const d = Math.hypot(px - x, py - y) / r; return d < 1 ? K.smooth(0.72, 1, d) : 0; }, [x - r, y - r, x + r, y + r], { color: '#2a2018', pressure: 0.6, alpha: 0.55, seed: seed + 'v' });
    stroke(S, ellipsePts(x, y, r, r, 0, 60, 0, 6.35), { color: '#0d0b0a', r: 0.22, pressure: 0.8, seed: seed + 'o' });
  }
  function inDisc(x, y, r) { return (px, py) => Math.hypot(px - x, py - y) < r; }

  // a nauplius: a rounded teardrop body, one dark eye at the front, and two big swimming antennae that fork at the
  // elbow into two oars, each fringed with long setae; the small first antennae point forward
  function nauplius(S, cx, cy, L, rot, seed, o = {}) {
    const R = rng(seed), c = Math.cos(rot), s = Math.sin(rot);
    const P = (u, v) => [cx + (u - L / 2) * c - v * s, cy + (u - L / 2) * s + v * c];
    // half-width along the body, t from the front (0) to the tail (1)
    const hw = (t) => L * (t < 0.34 ? 0.25 * Math.sqrt(Math.max(0, 1 - ((0.34 - t) / 0.34) ** 2)) : 0.25 * Math.cos((t - 0.34) / 0.66 * 1.2) * (1 - 0.55 * (t - 0.34) / 0.66));
    const outline = []; for (let i = 0; i <= 36; i++) { const t = i / 36; outline.push(P(t * L, -hw(t))); }
    for (let i = 36; i >= 0; i--) { const t = i / 36; outline.push(P(t * L, hw(t))); }
    const body = poly(outline, 0.25);
    const limb = o.limb || '#8a5a2c', skin = o.skin || '#dcaa68', thin = L / 46;
    for (const side of [-1, 1]) {
      // second antenna: protopod out sideways, then two rami sweeping back like oars
      const root0 = P(L * 0.24, side * hw(0.24) * 0.85), elbow = P(L * 0.24, side * L * 0.52);
      const proto = [root0, P(L * 0.22, side * L * 0.36), elbow];
      const ramus = (k) => [elbow, P(L * (0.32 + 0.08 * k), side * L * (0.62 - 0.04 * k)), P(L * (0.5 + 0.1 * k), side * L * (0.66 - 0.08 * k))];
      for (const pts of [proto, ramus(0), ramus(1)]) {
        stroke(S, pts, { color: limb, r: 0.5 * thin * 2.2, pressure: 0.85, seed: seed + 'a' + side + pts[2][0].toFixed(1) });
        stroke(S, pts, { color: skin, r: 0.2 * thin * 2.2, pressure: 0.6, alpha: 0.75, seed: seed + 'ai' + side + pts[2][0].toFixed(1) });
      }
      for (const k of [0, 1]) { // setae fanned along the outer half of each ramus
        const r = ramus(k);
        for (let j = 0; j < 7; j++) {
          const t = 0.35 + j * 0.1, ax = r[1][0] + (r[2][0] - r[1][0]) * t, ay = r[1][1] + (r[2][1] - r[1][1]) * t;
          const dx = r[2][0] - r[1][0], dy = r[2][1] - r[1][1], dl = Math.hypot(dx, dy) || 1, len = L * (0.16 + 0.04 * R());
          const bx = ax + (dx / dl) * len * 0.75 + side * (-dy / dl) * len * 0.15 * (k ? -1 : 1), by = ay + (dy / dl) * len * 0.75 + side * (dx / dl) * len * 0.15 * (k ? -1 : 1);
          stroke(S, [[ax, ay], [(ax + bx) / 2 + R.gauss(0, 0.2), (ay + by) / 2 + R.gauss(0, 0.2)], [bx, by]], { media: 'hard', color: limb, r: 0.07, pressure: 0.45, seed: seed + 'st' + side + k + j });
        }
      }
      // first antenna, small and forward, two setae at the tip
      const a1 = [P(L * 0.05, side * hw(0.05) * 0.7), P(-L * 0.04, side * L * 0.16), P(-L * 0.1, side * L * 0.2)];
      stroke(S, a1, { color: limb, r: 0.22 * thin * 2.2, pressure: 0.75, seed: seed + 'an' + side });
      for (let k = 0; k < 2; k++) stroke(S, [a1[2], P(-L * (0.2 + 0.05 * k), side * L * (0.2 + 0.06 * k))], { media: 'hard', color: limb, r: 0.07, pressure: 0.45, seed: seed + 'ans' + side + k });
      // mandible, a short stub behind the antennae
      stroke(S, [P(L * 0.4, side * hw(0.4) * 0.9), P(L * 0.43, side * L * 0.3)], { color: limb, r: 0.28 * thin * 2.2, pressure: 0.7, seed: seed + 'md' + side });
    }
    rub(S, body, body.box, { color: skin, pressure: 0.9, angle: rot + 0.4, seed: seed + 'body' });
    rub(S, (x, y) => body(x, y) * K.clamp(1 - Math.abs((x - cx) * -s + (y - cy) * c) / (L * 0.08)) * K.smooth(0.2, 0.45, ((x - cx) * c + (y - cy) * s) / L + 0.5), body.box, { color: '#b5773a', pressure: 0.6, alpha: 0.65, seed: seed + 'gut' });
    hatch(S, (x, y) => body(x, y) * (((x - cx) * -s + (y - cy) * c) > L * 0.04 ? 1 : 0), body.box, { angle: rot + 1.2, gap: Math.max(0.6, L / 60), color: '#a86b33', r: 0.08, pressure: 0.3, media: 'hard', seed: seed + 'sh' });
    for (let k = 0; k < 5; k++) { const t = 0.6 + k * 0.075; stroke(S, [P(t * L, -hw(t) * 0.85), P((t + 0.02) * L, 0), P(t * L, hw(t) * 0.85)], { color: '#8a5a2c', r: 0.08, pressure: 0.4, seed: seed + 'seg' + k }); }
    stroke(S, outline, { color: '#5e3b1d', r: 0.18, pressure: 0.7, seed: seed + 'out' });
    const eye = P(L * 0.09, 0);
    rub(S, ellipse(eye[0], eye[1], L * 0.045, L * 0.05, rot, 0.12), [eye[0] - L * 0.1, eye[1] - L * 0.1, eye[0] + L * 0.1, eye[1] + L * 0.1], { color: '#170f0c', pressure: 1, seed: seed + 'eye' });
    stroke(S, [P(L * 0.075, -L * 0.018), P(L * 0.08, -L * 0.014)], { media: 'gel', color: '#f6efe0', r: Math.max(0.08, L / 300), seed: seed + 'eh' });
    stroke(S, outline.slice(4, 18), { media: 'gel', color: '#fff4dc', r: 0.12, alpha: 0.55, pressure: 0.5, seed: seed + 'shine' });
  }
  // a dark shell split along one side, the embryo pushing out of the crack inside its clear membrane
  function cracked(S, x, y, r, seed) {
    const R = rng(seed);
    rub(S, (px, py) => { const a = Math.atan2(py - y, px - x); return ellipse(x, y, r, r * 0.96, 0, 0.3)(px, py) * (a > 0.25 && a < 1.2 ? 0 : 1); }, [x - r - 1, y - r - 1, x + r + 1, y + r + 1], { color: '#271d17', pressure: 0.95, seed: seed + 'b' });
    stroke(S, ellipsePts(x, y, r, r * 0.96, 0, 40, 1.25, 6.5), { color: '#120c08', r: 0.2, pressure: 0.7, seed: seed + 'o' });
    const bx = x + r * 0.62, by = y + r * 0.55;
    rub(S, ellipse(bx, by, r * 0.55, r * 0.48, 0.7, 0.3), [bx - r, by - r, bx + r, by + r], { color: '#d29b5c', pressure: 0.97, seed: seed + 'em' });
    rub(S, ellipse(bx + r * 0.08, by + r * 0.06, r * 0.32, r * 0.26, 0.7, 0.3), [bx - r, by - r, bx + r, by + r], { color: '#a96b34', pressure: 0.5, alpha: 0.6, seed: seed + 'em2' });
    stroke(S, ellipsePts(bx, by, r * 0.68, r * 0.6, 0.7, 30, 0, 6.4), { media: 'gel', color: '#eef6f2', r: 0.16, alpha: 0.55, pressure: 0.55, seed: seed + 'mem' });
    stroke(S, [[x + r * Math.cos(0.25), y + r * Math.sin(0.25)], [x + r * 0.75, y + r * 0.32], [x + r * 0.62, y + r * 0.5]], { color: '#e8d6b4', r: 0.12, media: 'gel', alpha: 0.8, seed: seed + 'cr' });
    stroke(S, ellipsePts(x, y, r * 0.6, r * 0.6, 0, 8, 3.6, 4.6), { media: 'gel', color: '#f4efe2', r: 0.18, alpha: 0.75, seed: seed + 'h' });
    return [bx, by];
  }
  // umbrella: the empty shell above, the embryo hanging below it in the hatching membrane, its eye already dark
  function umbrella(S, x, y, r, seed) {
    const mx = x + r * 0.15, my = y + r * 1.9;
    rub(S, ellipse(mx, my, r * 1.05, r * 1.3, 0.12, 0.6), [mx - r * 2, my - r * 2, mx + r * 2, my + r * 2], { media: 'cover', color: '#e9f3ef', alpha: 0.16, seed: seed + 'mf' });
    rub(S, ellipse(mx, my + r * 0.1, r * 0.62, r * 0.92, 0.12, 0.3), [mx - r, my - r * 1.4, mx + r, my + r * 1.4], { color: '#d39c5c', pressure: 0.97, seed: seed + 'em' });
    hatch(S, ellipse(mx + r * 0.15, my + r * 0.2, r * 0.45, r * 0.75, 0.12, 0.3), [mx - r, my - r, mx + r, my + r * 1.2], { angle: 1.1, gap: 0.8, color: '#9c6630', r: 0.08, pressure: 0.35, media: 'hard', seed: seed + 'sh' });
    stroke(S, ellipsePts(mx, my + r * 0.1, r * 0.62, r * 0.92, 0.12, 30, 0, 6.4), { color: '#7a4c22', r: 0.16, pressure: 0.6, seed: seed + 'eo' });
    rub(S, ellipse(mx - r * 0.05, my + r * 0.75, r * 0.11, r * 0.12, 0, 0.1), [mx - r, my, mx + r, my + r * 1.5], { color: '#170f0c', pressure: 1, seed: seed + 'eye' });
    stroke(S, ellipsePts(mx, my, r * 1.05, r * 1.3, 0.12, 40, 0, 6.4), { media: 'gel', color: '#f1f8f5', r: 0.17, alpha: 0.6, pressure: 0.5, seed: seed + 'mem' });
    // the shell, split and open at the bottom
    rub(S, (px, py) => ellipse(x, y, r, r * 0.95, 0, 0.3)(px, py) * (py > y + r * 0.45 && Math.abs(px - x - r * 0.1) < r * 0.6 ? 0 : 1), [x - r - 1, y - r - 1, x + r + 1, y + r + 1], { color: '#271d17', pressure: 0.95, seed: seed + 'sb' });
    stroke(S, ellipsePts(x, y, r, r * 0.95, 0, 40, 2.3, 7.1), { color: '#120c08', r: 0.2, pressure: 0.7, seed: seed + 'so' });
    stroke(S, ellipsePts(x, y, r * 0.6, r * 0.6, 0, 8, 3.6, 4.6), { media: 'gel', color: '#f4efe2', r: 0.18, alpha: 0.75, seed: seed + 'h' });
  }
  function filament(S, x, y, len, seed, o = {}) {
    const R = rng(seed), pts = []; let a = R() * 6.28;
    for (let i = 0; i <= 10; i++) { pts.push([x, y]); a += R.gauss(0, 0.5); x += Math.cos(a) * len / 10; y += Math.sin(a) * len / 10; }
    stroke(S, pts, { media: 'gel', color: o.color || '#dcefeb', r: o.r || 0.14, alpha: o.alpha ?? 0.45, pressure: 0.5, seed: seed + 's' });
  }
  function tweezers(S, x, y, seed) {
    for (const side of [-1, 1]) {
      const pts = [[x + side * 1.1, y], [x + side * 3, y - 14], [x + side * 5, y - 34]];
      stroke(S, pts, { color: '#8d9496', r: 0.75, pressure: 0.8, seed: seed + side, media: 'pastel' });
      stroke(S, pts, { color: '#3d4245', r: 0.12, pressure: 0.7, seed: seed + 'o' + side });
      stroke(S, pts.map(([px, py]) => [px - side * 0.3, py]), { media: 'gel', color: '#f2f4f2', r: 0.1, alpha: 0.7, seed: seed + 'h' + side });
    }
  }

  // ---------- the chart's marks
  // route a thread through its corner points with rounded corners
  function rounded(pts, rad = 4) {
    const out = [pts[0]];
    for (let i = 1; i < pts.length - 1; i++) {
      const [ax, ay] = pts[i - 1], [bx, by] = pts[i], [cx, cy] = pts[i + 1];
      const l1 = Math.hypot(bx - ax, by - ay), l2 = Math.hypot(cx - bx, cy - by), r = Math.min(rad, l1 / 2, l2 / 2);
      const p = [bx - (bx - ax) / l1 * r, by - (by - ay) / l1 * r], q = [bx + (cx - bx) / l2 * r, by + (cy - by) / l2 * r];
      for (let k = 0; k <= 6; k++) { const t = k / 6, u = 1 - t; out.push([u * u * p[0] + 2 * u * t * bx + t * t * q[0], u * u * p[1] + 2 * u * t * by + t * t * q[1]]); }
    }
    out.push(pts[pts.length - 1]);
    return out;
  }
  const THREAD = {
    gold: { base: '#d9a43a', twist: '#f7e6b0', edge: '#5a3d12', w: 0.62 },
    red:  { base: '#c4453a', twist: '#f2a596', edge: '#4a1510', w: 0.6 },
    pale: { base: '#e6dcc6', twist: '#fffaf0', edge: '#7d7464', w: 0.5 },
  };
  function thread(S, step) {
    const T = THREAD[step.kind], line = rounded(step.pts), seed = 'thread:' + (step.from || 'start') + '>' + step.to + ':' + step.label;
    // dense resample so the twist can follow the line
    const pts = [line[0]];
    for (let i = 1; i < line.length; i++) { const [ax, ay] = line[i - 1], [bx, by] = line[i], n = Math.max(1, Math.ceil(Math.hypot(bx - ax, by - ay) / 0.5)); for (let k = 1; k <= n; k++) pts.push([ax + (bx - ax) * k / n, ay + (by - ay) * k / n]); }
    // cut the end short of the slide so the arrowhead sits on its edge
    let L = 0; const cum = [0]; for (let i = 1; i < pts.length; i++) { L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); cum.push(L); }
    const body = pts.filter((_, i) => cum[i] < L - 1.6);
    if (body.length < 2) return;
    stroke(S, body, { color: T.edge, r: T.w + 0.18, pressure: 0.8, media: 'pencil', straight: true, taper: false, tremor: 0.3, seed: seed + 'e', alpha: 0.75 });
    stroke(S, body, { color: T.base, r: T.w, pressure: 0.85, media: 'pastel', straight: true, taper: false, tremor: 0.3, seed: seed + 'b' });
    for (let i = 2; i < body.length - 1; i += 3) { // the twist: short diagonal marks across the yarn
      const [x0, y0] = body[i - 1], [x1, y1] = body[i + 1], dl = Math.hypot(x1 - x0, y1 - y0) || 1, tx = (x1 - x0) / dl, ty = (y1 - y0) / dl, nx = -ty, ny = tx, [x, y] = body[i], w = T.w * 0.9;
      stroke(S, [[x - nx * w - tx * 0.35, y - ny * w - ty * 0.35], [x + nx * w + tx * 0.35, y + ny * w + ty * 0.35]], { media: 'gel', color: T.twist, r: 0.13, pressure: 0.6, straight: true, taper: false, tremor: 0.1, alpha: 0.85, seed: seed + 't' + i });
    }
    // arrowhead
    const e = pts[pts.length - 1], b = pts[Math.max(0, pts.length - 6)], dl = Math.hypot(e[0] - b[0], e[1] - b[1]) || 1, tx = (e[0] - b[0]) / dl, ty = (e[1] - b[1]) / dl;
    const tip = [e[0] - tx * 0.4, e[1] - ty * 0.4], back = [tip[0] - tx * 3, tip[1] - ty * 3];
    const head = poly([tip, [back[0] - ty * 1.7, back[1] + tx * 1.7], [back[0] + tx * 0.8, back[1] + ty * 0.8], [back[0] + ty * 1.7, back[1] - tx * 1.7]], 0.15);
    rub(S, head, head.box, { color: T.base, pressure: 0.95, seed: seed + 'hd' });
    stroke(S, [[back[0] - ty * 1.7, back[1] + tx * 1.7], tip, [back[0] + ty * 1.7, back[1] - tx * 1.7]], { color: T.edge, r: 0.14, pressure: 0.7, straight: true, seed: seed + 'ho' });
  }
  // a glass slide: tinted glass, a frosted label at one end, the state written on it
  function slide(S, st) {
    const x0 = st.x - st.w / 2, y0 = st.y - st.h / 2, x1 = st.x + st.w / 2, y1 = st.y + st.h / 2, seed = 'slide:' + st.id;
    const glass = poly([[x0 + 0.8, y0], [x1 - 0.8, y0], [x1, y0 + 0.8], [x1, y1 - 0.8], [x1 - 0.8, y1], [x0 + 0.8, y1], [x0, y1 - 0.8], [x0, y0 + 0.8]], 0.15);
    glow(S, st.x + 1.2, st.y + 2.2, st.w * 0.55, st.h * 0.75, { color: '#000000', alpha: DARK[S.paper] ? 0.35 : 0.16, multiply: true });
    rub(S, glass, glass.box, { media: 'cover', color: st.kind === 'bug' ? '#f3dcd4' : '#e3ece8', pressure: 0.9, angle: 0.3, seed: seed + 'g' });
    rub(S, glass, glass.box, { color: '#c9d8d2', pressure: 0.35, alpha: 0.5, angle: 0.3, seed: seed + 'g2' });
    rub(S, (x, y) => glass(x, y) * (x < x0 + 6 ? 1 : 0), glass.box, { media: 'cover', color: '#fbfaf5', pressure: 0.95, angle: 1.2, seed: seed + 'f' });
    if (st.kind === 'bug') rub(S, (x, y) => glass(x, y) * (x > x1 - 2.2 ? 1 : 0), glass.box, { color: '#c4453a', pressure: 0.9, seed: seed + 'r' });
    stroke(S, [[x0 + 6, y0 + 0.4], [x0 + 6, y1 - 0.4]], { color: '#9aa29e', r: 0.08, pressure: 0.5, straight: true, seed: seed + 'fl' });
    const edge = [[x0 + 0.8, y0], [x1 - 0.8, y0], [x1, y0 + 0.8], [x1, y1 - 0.8], [x1 - 0.8, y1], [x0 + 0.8, y1], [x0, y1 - 0.8], [x0, y0 + 0.8], [x0 + 0.8, y0]];
    stroke(S, edge, { color: '#4d5653', r: 0.17, pressure: 0.75, straight: true, taper: false, tremor: 0.6, seed: seed + 'o' });
    if (st.kind === 'end') stroke(S, [[x0 + 1.2, y0 + 1.2], [x1 - 1.2, y0 + 1.2], [x1 - 1.2, y1 - 1.2], [x0 + 1.2, y1 - 1.2], [x0 + 1.2, y0 + 1.2]], { color: '#6f7774', r: 0.1, pressure: 0.55, straight: true, taper: false, tremor: 0.6, seed: seed + 'o2' });
    stroke(S, [[x0 + 7, y0 + 1.3], [x1 - 3, y0 + 1.3]], { media: 'gel', color: '#ffffff', r: 0.16, alpha: 0.85, straight: true, seed: seed + 'hl' });
    write(S, st.label, x0 + 6 + (st.w - 6) / 2, st.y, { size: 4, fit: st.w - 9.5, weight: 700, align: 'center', middle: true, color: st.kind === 'bug' ? '#7d1f17' : '#24211f', pressure: 0.8 });
  }
  // a paper tag hung on a thread, with the step's words
  function tag(S, step) {
    if (!step.tag) return;
    const [cx, cy] = step.tag, size = 3.1, w = K.measure(step.label, size * 10, 400) / 10 + 4, h = size + 3.2;
    const box = poly([[cx - w / 2, cy - h / 2], [cx + w / 2, cy - h / 2], [cx + w / 2, cy + h / 2], [cx - w / 2, cy + h / 2]], 0.12), seed = 'tag:' + step.label;
    glow(S, cx + 0.6, cy + 1, w * 0.55, h * 0.75, { color: '#000000', alpha: DARK[S.paper] ? 0.3 : 0.12, multiply: true });
    rub(S, box, box.box, { media: 'cover', color: step.kind === 'red' ? '#fbe9e2' : '#f8f1df', pressure: 0.95, seed: seed + 'p' });
    stroke(S, [[cx - w / 2, cy - h / 2], [cx + w / 2, cy - h / 2], [cx + w / 2, cy + h / 2], [cx - w / 2, cy + h / 2], [cx - w / 2, cy - h / 2]], { color: step.kind === 'red' ? '#8f2a20' : '#6e665a', r: 0.12, pressure: 0.65, straight: true, taper: false, seed: seed + 'o' });
    write(S, step.label, cx, cy, { size, align: 'center', middle: true, color: step.kind === 'red' ? '#8f2a20' : '#2b2520', pressure: 0.7, media: 'pencil' });
  }
  function startDot(S, [x, y], kind) {
    rub(S, ellipse(x, y, 1.6, 1.6, 0, 0.12), [x - 3, y - 3, x + 3, y + 3], { color: kind === 'gold' ? '#e2b33f' : '#e6dcc6', pressure: 1, seed: 'start' + x + y });
    stroke(S, ellipsePts(x, y, 1.6, 1.6, 0, 16, 0, 6.4), { color: '#3a2a14', r: 0.12, seed: 'start-o' + x + y });
  }

  function heading(S, text, x, y, o = {}) { return write(S, text, x, y, Object.assign({ size: 7, weight: 700, color: ink(S), pressure: 0.85 }, o)); }
  function note(S, text, x, y, o = {}) { const wrapAt = o.wrap === undefined ? (o.align ? undefined : 168 - x) : o.wrap; return write(S, wrapAt ? String(text).replace(/\n/g, ' ') : text, x, y, Object.assign({ size: 3.3, color: ink(S), pressure: 0.6, media: 'pencil', lh: 1.35 }, o, { wrap: wrapAt })); }

  // ---------- the real thing: frames and clips from the dataset, set into drawn eyepieces, taped prints and film.
  // Positions are wall mm relative to the sheet's top; the page lays the media into the holes the drawing leaves.
  const FIELD = [
    { tile: 'title', kind: 'lens', x: 148, y: 156, r: 17, src: 'img/oct17_cysts_dense.jpg', alt: 'Through the eyepiece: hundreds of dark dry cysts packed on a yellow-green field.' },
    { tile: 'dry', kind: 'lens', x: 34, y: 96, r: 21, src: 'clips/run_oct18.mp4', alt: 'Timelapse through the eyepiece, 18 to 21 October: the cluster under white, orange and green light, picked apart by hand.' },
    { tile: 'water', kind: 'lens', x: 140, y: 74, r: 26, src: 'clips/run_oct21.mp4', alt: 'Timelapse, 21 October: cysts in water, a cloudy patch and a wavy thread; the field wobbles.' },
    { tile: 'cracks', kind: 'print', x: 138, y: 50, w: 40, h: 40, rot: 0.045, src: 'img/hatch_closeup.jpg', alt: 'Photo, 22 October 23:48: a tan embryo part-way out of a dark split cyst.' },
    { tile: 'umbrella', kind: 'print', x: 44, y: 54, w: 42, h: 42, rot: -0.05, src: 'img/oct23_hatch2.jpg', alt: 'Photo, 23 October 03:48: a second embryo further out of its shell, among dark cysts.' },
    { tile: 'nauplius', kind: 'lens', x: 140, y: 66, r: 28, src: 'clips/live_oct23_zoom.mp4', alt: 'Real-time video, 23 October: a nauplius leaves its cyst, a one-to-one crop.' },
    { tile: 'activity', kind: 'lens', x: 146, y: 56, r: 18, src: 'clips/run_oct22.mp4', alt: 'Timelapse of the hatching night, 22 to 23 October, sixty times faster.' },
    { tile: 'endings', kind: 'print', x: 90, y: 102, w: 22, h: 22, rot: 0.06, src: 'img/oct24_nauplius.jpg', alt: 'Photo, 24 October 16:52: an elongated tan nauplius with one dark eye.' },
    ...[0, 1, 2, 3].map((k) => ({ tile: 'camera', kind: 'film', x: 13.5 + k * 11.2 + 5, y: 96, w: 10, h: 11, src: 'img/oct23_threads.jpg', alt: k ? '' : 'The frozen frame, four times: a cyan field full of wavy translucent threads.' })),
  ];
  function frameFor(S, f, top) {
    const y = top + f.y, seed = 'field:' + f.tile + f.x;
    if (f.kind === 'lens') {
      glow(S, f.x + 1.2, y + 2, f.r * 1.35, f.r * 1.35, { color: '#000000', alpha: DARK[S.paper] ? 0.4 : 0.22, multiply: true });
      rub(S, ellipse(f.x, y, f.r * 1.22, f.r * 1.22, 0, 0.2), [f.x - f.r * 1.3, y - f.r * 1.3, f.x + f.r * 1.3, y + f.r * 1.3], { media: 'cover', color: '#1a1714', seed: seed + 'ring' });
      rub(S, (px, py) => { const d = Math.hypot(px - f.x, py - y) / f.r; return d > 1.02 && d < 1.2 ? 0.5 : 0; }, [f.x - f.r * 1.3, y - f.r * 1.3, f.x + f.r * 1.3, y + f.r * 1.3], { color: '#4a4038', pressure: 0.35, seed: seed + 'knurl', angle: 0.2 });
      stroke(S, ellipsePts(f.x, y, f.r * 1.22, f.r * 1.22, 0, 70, 0, 6.35), { color: '#0a0908', r: 0.2, pressure: 0.8, seed: seed + 'o' });
      stroke(S, ellipsePts(f.x, y, f.r * 1.12, f.r * 1.12, 0, 30, 3.5, 4.9), { media: 'gel', color: '#d8cdb8', r: 0.16, alpha: 0.6, seed: seed + 'shine' });
      rub(S, ellipse(f.x, y, f.r, f.r, 0, 0.1), [f.x - f.r, y - f.r, f.x + f.r, y + f.r], { media: 'cover', color: '#0c0a09', seed: seed + 'hole' });
    } else if (f.kind === 'print') {
      const c = Math.cos(f.rot || 0), s2 = Math.sin(f.rot || 0), P = (u, v) => [f.x + u * c - v * s2, y + u * s2 + v * c];
      const bw = f.w / 2 + 2.2, bt = f.h / 2 + 2.2, bb = f.h / 2 + 6;
      const card = [P(-bw, -bt), P(bw, -bt), P(bw, bb), P(-bw, bb)], cp = poly(card, 0.12);
      glow(S, f.x + 1.5, y + 3, bw * 1.15, bb * 1.1, { color: '#000000', alpha: DARK[S.paper] ? 0.45 : 0.22, multiply: true });
      rub(S, cp, cp.box, { media: 'cover', color: '#f7f4ec', seed: seed + 'card' });
      stroke(S, card.concat([card[0]]), { color: '#9a9284', r: 0.1, pressure: 0.5, straight: true, taper: false, seed: seed + 'co' });
      const hole = poly([P(-f.w / 2, -f.h / 2), P(f.w / 2, -f.h / 2), P(f.w / 2, f.h / 2), P(-f.w / 2, f.h / 2)], 0.08);
      rub(S, hole, hole.box, { media: 'cover', color: '#151311', seed: seed + 'hole' });
      for (const side of [-1, 1]) { // masking tape across the two top corners
        const tc = P(side * (bw - 1), -bt + 0.5), a = (f.rot || 0) + side * 0.75, tc0 = Math.cos(a), ts = Math.sin(a), tw = 9, th = 3.4;
        const tape = [[-tw / 2, -th / 2], [tw / 2, -th / 2], [tw / 2, th / 2], [-tw / 2, th / 2]].map(([u, v]) => [tc[0] + u * tc0 - v * ts, tc[1] + u * ts + v * tc0]), tp = poly(tape, 0.2);
        rub(S, tp, tp.box, { media: 'cover', color: '#e9dfbf', alpha: 0.82, seed: seed + 'tape' + side });
        rub(S, tp, tp.box, { color: '#cbbd94', pressure: 0.3, alpha: 0.6, seed: seed + 'tapeg' + side });
      }
    } else if (f.kind === 'film') {
      const hole = poly([[f.x - f.w / 2, y - f.h / 2], [f.x + f.w / 2, y - f.h / 2], [f.x + f.w / 2, y + f.h / 2], [f.x - f.w / 2, y + f.h / 2]], 0.08);
      rub(S, hole, hole.box, { media: 'cover', color: '#0c0a09', seed: seed + 'hole' });
    }
  }

  // ---------- the sheets
  const TITLE_LINES = [
    ['Read from MicroScope-v1, a Pi camera on a microscope eyepiece.', 'https://huggingface.co/datasets/ThomasTheMaker/MicroScope-v1', 'MicroScope-v1'],
    ['Drawn after One becomes two, from statechart art by Kevin Ngo.', 'https://kevintngo.github.io/statechart-art/one-becomes-two/', 'One becomes two'],
    ['Drawn in JavaScript with simulated pencil, pastel and gel pen.', null, null],
    ['Lettering in Kevin Sans, traced from A. V. Hershey’s 1967 fonts.', 'https://github.com/kevintngo/statechart-art', 'Kevin Sans'],
    ['Every state and step checked by walking the chart from its start.', null, null],
  ];
  const TITLE_LAYOUT = { x: 14, y0: 70, lh: 4.6, size: 3.2, button: { x: 116, y: 114, w: 52, h: 18 } };

  const SCENES = {
    title(S, t) {
      heading(S, 'Out of the shell', 14, t.y + 22, { size: 14, fit: 152 });
      write(S, 'Seventeen days of brine shrimp, drawn as a statechart.', 14, t.y + 46, { size: 5.2, fit: 152, color: INK, pressure: 0.8 });
      TITLE_LINES.forEach(([s], i) => note(S, s, TITLE_LAYOUT.x, t.y + TITLE_LAYOUT.y0 + i * TITLE_LAYOUT.lh, { size: TITLE_LAYOUT.size, pressure: 0.55, wrap: 0 }));
      write(S, 'Each glass slide is a state a cyst can be in.\nEach thread is a step it can take.\nWalked from the start, every one:\n' + Ch.check().states + ' states and ' + Ch.check().steps + ' steps.', 14, t.y + 104, { size: 4.4, color: INK, pressure: 0.7, lh: 1.4 });
      // the "step through" tag
      const b = TITLE_LAYOUT.button, bx = b.x, by = t.y + b.y;
      const box = poly([[bx, by], [bx + b.w, by], [bx + b.w, by + b.h], [bx, by + b.h]], 0.12);
      glow(S, bx + b.w / 2 + 1, by + b.h / 2 + 1.6, b.w * 0.55, b.h * 0.7, { color: '#000000', alpha: 0.16, multiply: true });
      rub(S, box, box.box, { media: 'cover', color: '#fbf6ea', pressure: 0.95, seed: 'btn' });
      stroke(S, [[bx, by], [bx + b.w, by], [bx + b.w, by + b.h], [bx, by + b.h], [bx, by]], { color: '#6f655a', r: 0.15, straight: true, taper: false, seed: 'btn-o' });
      stroke(S, [[bx + 0.6, by + b.h + 0.5], [bx + b.w + 0.5, by + b.h + 0.5], [bx + b.w + 0.5, by + 0.6]], { color: '#5a524a', r: 0.35, straight: true, taper: false, seed: 'btn-s' });
      const tri = poly([[bx + 5, by + 5], [bx + 11, by + b.h / 2], [bx + 5, by + b.h - 5]], 0.12);
      rub(S, tri, tri.box, { color: '#e2b33f', pressure: 1, seed: 'btn-t' });
      stroke(S, [[bx + 5, by + 5], [bx + 11, by + b.h / 2], [bx + 5, by + b.h - 5], [bx + 5, by + 5]], { color: '#3a2a14', r: 0.1, straight: true, seed: 'btn-to' });
      write(S, 'Step through\nthe chart', bx + 14, by + b.h / 2, { size: 4.2, middle: true, color: '#1d1a1e', lh: 1.2 });
      // legend
      const lg = [['gold', 'a cyst that hatches'], ['red', 'what broke on the bench'], ['pale', 'every other step']];
      lg.forEach(([k, s], i) => { const yy = t.y + 152 + i * 7; thread(S, { kind: k, pts: [[14, yy], [32, yy]], from: 'legend', to: k, label: s }); write(S, s, 38, yy, { size: 3.8, middle: true, color: INK }); });
      // a slide's worth of dry cysts, one ringed in gold where the thread begins
      rub(S, (x, y) => K.clamp((y - t.y - 176) / 4) , [0, t.y + 174, 180, t.y + 232], { color: '#e9e2c9', pressure: 0.5, alpha: 0.8, seed: 'band' });
      const R = rng('title-band');
      for (let k = 0; k < 150; k++) {
        const x = R() * 180, y = t.y + 184 + R() * 50, r = 2.6 + R() * 0.8;
        if (Math.hypot(x - Ch.START[0], y - Ch.START[1]) < 9) continue;
        cyst(S, x, y, r, 'tb' + k);
      }
      cyst(S, Ch.START[0], Ch.START[1], 3.2, 'tb-gold', { gold: true });
    },
    dry(S, t) {
      heading(S, 'On the slide', 14, t.y + 10, { size: 6 });
      note(S, '17 to 21 October · one frame a minute', 14, t.y + 19);
      // the cluster, drawn as it lay at 19:14
      const R = rng('cluster'), placed = [];
      for (let k = 0; k < 900 && placed.length < 120; k++) {
        const a = R() * 6.28, d = Math.sqrt(R()) * 34, x = 136 + Math.cos(a) * d * 1.05, y = t.y + 102 + Math.sin(a) * d * 0.9, r = 2.9 + R() * 0.5;
        if (x < 100 || x > 176) continue;
        if (placed.some(([px, py, pr]) => Math.hypot(px - x, py - y) < pr + r - 0.4)) continue;
        placed.push([x, y, r]);
      }
      placed.forEach(([x, y, r], i) => cyst(S, x, y, r, 'cl' + i));
      note(S, 'Drawn from the 19:14 frame: hundreds, dry and dented, each a fifth of a millimetre.', 104, t.y + 140, { size: 2.8 });
      note(S, '18 Oct, through the eyepiece: the same cysts under the orange lamp.', 12, t.y + 126, { size: 2.8, wrap: 50 });
    },
    lights(S, t) {
      write(S, 'Under changing lights', 14, t.y + 8, { size: 5, weight: 700, color: INK });
      note(S, 'The colour of the field at the start of each two-hour segment, 18 Oct 19:45 to 21 Oct 19:57.', 14, t.y + 17, { size: 3 });
      const x0 = 14, w = (166 - 14) / LIGHTS.length;
      LIGHTS.forEach((c, i) => {
        const x = x0 + i * w, box = poly([[x + 0.3, t.y + 26], [x + w - 0.3, t.y + 26], [x + w - 0.3, t.y + 46], [x + 0.3, t.y + 46]], 0.2);
        rub(S, box, box.box, { color: lampColour(c), pressure: 0.85, angle: 1.4, seed: 'sw' + i });
      });
      [['Sun 19:45', 14], ['Mon', 44], ['Tue', 94], ['Wed 19:57', 166]].forEach(([s, x], i) => note(S, s, x, t.y + 50, { size: 2.8, align: i === 3 ? 'right' : 'left' }));
      note(S, 'white · orange · sixteen hours of green · orange again · white', 14, t.y + 56, { size: 2.8 });
    },
    water(S, t) {
      heading(S, 'In the water', 14, t.y + 10, { size: 6 });
      note(S, '21 Oct 20:48 · two frames a second, then one every two', 14, t.y + 19);
      glow(S, 44, t.y + 84, 32, 22, { color: '#d9ece6', alpha: 0.3 });
      const R = rng('water');
      for (let k = 0; k < 10; k++) filament(S, 14 + R() * 66, t.y + 46 + R() * 70, 8 + R() * 14, 'fil' + k);
      [[30, 58], [38, 63], [26, 66], [60, 100], [72, 70], [20, 96], [48, 84]].forEach(([x, y], i) => cyst(S, x, t.y + y, 2.9, 'wc' + i, { wet: true }));
      [[62, 54], [40, 112]].forEach(([x, y], i) => shell(S, x, t.y + y, 2.8, 'ws' + i));
      note(S, 'Round again, they drift, clump and part.', 14, t.y + 124, { size: 3, wrap: 66 });
      note(S, 'Through the eyepiece, two frames a second: the field wobbles as the camera shifts.', 112, t.y + 112, { size: 2.7, wrap: 56 });
    },
    cracks(S, t) {
      cracked(S, 42, t.y + 56, 17, 'big-crack');
      note(S, 'The shell splits along one side. The embryo, still wrapped in a clear membrane, bulges out of the crack.', 14, t.y + 80, { size: 3, wrap: 54 });
      note(S, '22 Oct 23:48 · four hours into the hatching night, a tan body out of a split cyst.', 112, t.y + 82, { size: 2.7, wrap: 54 });
    },
    umbrella(S, t) {
      umbrella(S, 138, t.y + 38, 13, 'big-umb');
      note(S, 'Out of the shell and hanging under it in its membrane, like an umbrella. The eye is already dark.', 112, t.y + 92, { size: 3, wrap: 56 });
      note(S, '23 Oct 03:48 · another one, further out, limbs spread.', 14, t.y + 94, { size: 2.7, wrap: 58 });
    },
    nauplius(S, t) {
      nauplius(S, 44, t.y + 66, 42, -0.35, 'big-naup');
      note(S, 'The membrane breaks and it swims: one dark eye at the front, a tan body, two big oars of antennae.', 14, t.y + 110, { size: 3, wrap: 64 });
      note(S, '23 Oct, real time · a nauplius leaves its cyst, the frames cropped one to one.', 112, t.y + 110, { size: 2.7, wrap: 56 });
    },
    activity(S, t) {
      write(S, 'Activity through the hatching night', 14, t.y + 8, { size: 5, weight: 700, color: INK, fit: 152 });
      note(S, 'Median frame-to-frame motion per two-hour segment, 22 Oct 19:47 to 23 Oct 15:47.', 14, t.y + 17, { size: 3, wrap: 108 });
      const base = t.y + 80, top = t.y + 36, x0 = 14, w = 10.4, max = 0.0405;
      stroke(S, [[x0 - 2, base], [x0 + w * 10 + 2, base]], { color: '#5a5a5a', r: 0.12, straight: true, taper: false, seed: 'ax' });
      NIGHT.forEach((v, i) => {
        const h = (v / max) * (base - top), x = x0 + i * w + 1, peak = i === 6, bw = w - 2;
        const box = poly([[x, base - h], [x + bw, base - h], [x + bw, base], [x, base]], 0.2);
        rub(S, box, box.box, { color: peak ? '#d9a43a' : '#8fb8b2', pressure: 0.8, angle: 1.2, seed: 'bar' + i });
        stroke(S, [[x, base], [x, base - h], [x + bw, base - h], [x + bw, base]], { color: '#4d5653', r: 0.1, straight: true, taper: false, seed: 'bo' + i });
        if (i % 3 === 0) note(S, NIGHT_T[i], x, base + 3, { size: 2.5 });
      });
      const barTop = (i) => base - (NIGHT[i] / max) * (base - top);
      note(S, '+4 h: first one out', x0 + 3 * w, barTop(2) - 4, { size: 2.6, align: 'right' });
      note(S, '07:48: triple', x0 + 7 * w + 0.5, barTop(6) - 1, { size: 2.6 });
      note(S, 'The night itself, sixty times faster.', 126, t.y + 88, { size: 2.7, wrap: 44 });
    },
    endings(S, t) {
      heading(S, 'Endings', 14, t.y + 10, { size: 6 });
      cyst(S, 34, t.y + 66, 4.6, 'end-shut', { wet: true });
      note(S, 'By 26 Oct the field holds almost none; some never opened at all.', 14, t.y + 82, { size: 2.9, wrap: 40 });
      nauplius(S, 90, t.y + 66, 22, 0.25, 'end-naup');
      note(S, 'By 24 Oct nauplii swim through the field and out.', 72, t.y + 121, { size: 2.9, wrap: 38 });
      tweezers(S, 146, t.y + 92, 'tw');
      cyst(S, 146, t.y + 93, 2.6, 'end-picked');
      note(S, 'Through 19–21 Oct the cluster is picked apart.', 126, t.y + 101, { size: 2.9, wrap: 40 });
    },
    camera(S, t) {
      heading(S, 'What the camera did', 14, t.y + 10, { size: 6 });
      note(S, 'A second chart: the bench, not the shrimp. Red threads are what a check found when it broke.', 14, t.y + 19, { size: 3 });
      // the frozen frame, nine thousand times: a strip of film whose frames are the real one, repeated
      const fy = t.y + 90; rub(S, poly([[12, fy - 3], [58, fy - 3], [58, fy + 15], [12, fy + 15]], 0.15), [12, fy - 3, 58, fy + 15], { media: 'cover', color: '#262628', pressure: 0.9, seed: 'film' });
      for (let k = 0; k < 9; k++) for (const yy of [fy - 1.8, fy + 13.2]) rub(S, ellipse(14 + k * 5.2, yy, 0.9, 0.55, 0, 0.1), [12, yy - 1, 60, yy + 1], { media: 'cover', color: '#0b0b0c', seed: 'hole' + k + yy });
      note(S, '23 Oct 23:19 · the same frame 9,212 times, for five hours.', 14, t.y + 108, { size: 2.7, wrap: 46 });
      note(S, '4.2 GB with no index: rebuilt,\n57 minutes and 102,487 frames.', 138, t.y + 118, { size: 2.6 });
    },
    colophon(S, t) {
      write(S, 'What the walk checked', 14, t.y + 10, { size: 5, weight: 700, color: INK });
      const c = Ch.check();
      const lines = [
        ['Holds', 'no cyst swims before its shell cracks.'],
        ['Holds', 'every state has a way out, or is an ending.'],
        ['Breaks', 'every saved frame is new: the feed froze.'],
        ['Breaks', 'every file opens: three lost their index.'],
      ];
      lines.forEach(([k, s], i) => { write(S, k + ':', 14, t.y + 24 + i * 7, { size: 3.4, weight: 700, color: k === 'Breaks' ? '#8f2a20' : INK }); write(S, s, 34, t.y + 24 + i * 7, { size: 3.4, color: INK, media: 'pencil', pressure: 0.6 }); });
      note(S, c.states + ' states, ' + c.steps + ' steps · 180 hours on the bench · 303 k frames · 10.5 GB', 14, t.y + 58, { size: 2.9, wrap: 96 });
      // a ring of the days, 9 to 26 October: the timelapse days in gold, the breaks in red
      const cx = 140, cy = t.y + 70, r = 22, days = 18;
      for (let d = 0; d < days; d++) {
        const a0 = -1.5708 + (d / days) * 6.2832 + 0.03, a1 = -1.5708 + ((d + 1) / days) * 6.2832 - 0.03, day = 9 + d;
        const lapse = day >= 17, col = [21, 23].includes(day) ? '#c4453a' : lapse ? '#d9a43a' : [9, 10, 14].includes(day) ? '#9fb7b2' : '#e6dcc6';
        const arc = []; for (let k = 0; k <= 8; k++) { const a = a0 + (a1 - a0) * k / 8; arc.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); }
        stroke(S, arc, { media: 'pastel', color: col, r: 2.4, pressure: 0.85, taper: false, seed: 'ring' + d });
        if (day % 3 === 0 || day === 26) { const a = (a0 + a1) / 2; write(S, String(day), cx + Math.cos(a) * (r + 6), cy + Math.sin(a) * (r + 6), { size: 2.6, align: 'center', middle: true, color: INK, media: 'pencil' }); }
      }
      write(S, 'Oct\n2026', cx, cy, { size: 4, align: 'center', middle: true, weight: 700, color: INK });
      note(S, 'gold: timelapse days · red: the freeze and the broken files · blue-grey: test clips', 14, t.y + 106, { size: 2.6 });
    },
  };

  // draw one sheet of the wall at ppm pixels per millimetre
  function drawTile(id, ppm) {
    const t = Ch.tileAt(id);
    const S = K.Sheet({ w: Ch.WALL_W, h: t.h, y: t.y, ppm, paper: t.paper, seed: 'sheet:' + id });
    S.paper = t.paper;
    SCENES[id](S, t);
    for (const f of FIELD) if (f.tile === id) frameFor(S, f, t.y);
    for (const st of Ch.STEPS) thread(S, st);
    startDot(S, Ch.START, 'gold'); startDot(S, Ch.CAM_START, 'pale');
    for (const st of Ch.STATES) slide(S, st);
    for (const st of Ch.STEPS) tag(S, st);
    return S;
  }

  root.Wall = { drawTile, TITLE_LINES, TITLE_LAYOUT, FIELD, rounded };
})(typeof self !== 'undefined' ? self : this);
