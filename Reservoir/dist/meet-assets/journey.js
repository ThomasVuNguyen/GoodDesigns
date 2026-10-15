/* Reservoir Studio's journey ink, drawn as live SVG for Meet Reservoir.

   A port of the Graph tab's journey mode in Red Antler's Reservoir Studio (the brand's
   ink lab): the same cell shapes around each label, the same fluid stems between them,
   the same noise, and the same pour, in which the ink front travels the line and each
   cell blooms from where the stem meets it. The Studio stamps its discs on a canvas,
   blurs the field and re-thresholds it; here the discs are SVG circles under a filter
   that does the same (a Gaussian blur, then the Studio's contrast as a linear alpha
   ramp), so the ink stays crisp at any size and can be animated.

   MeetInk.journey(svg, spec) draws a journey into an <svg> and returns { frame(p), play() }.
   MeetInk.blob(svg, w, h, opts) fills an <svg> with one ink cell of the given size. */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var CONTRAST = 16; // the Studio's journey compositor

  // The Studio's seeded PRNG (mulberry32), value noise and hash, unchanged.
  function makeRng(seed) {
    var s = seed >>> 0;
    return function () {
      s |= 0; s = (s + 0x6D2B79F5) | 0;
      var t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function noise1(x, seedFn) {
    var i = Math.floor(x), f = x - i, a = seedFn(i), b = seedFn(i + 1), u = f * f * (3 - 2 * f);
    return a * (1 - u) + b * u;
  }
  function hash(seed) { return makeRng(seed * 2654435761 >>> 0)(); }
  function dlen(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
  function easeSine(t) { return (1 - Math.cos(Math.PI * t)) / 2; }
  function clamp01(v) { return Math.max(0, Math.min(1, v)); }

  var measure = document.createElement('canvas').getContext('2d');

  // A node's label box: journeyBox(), with the page's own face.
  // pad scales the cell's margin round its words (1, the Studio's own; less is a tighter pill).
  function labelBox(nd, family, pad) {
    var size = nd.size / 100, lineH = Math.round(27 * size);
    measure.font = '500 ' + Math.round(21 * size) + 'px ' + family;
    var lines = String(nd.text).split('\n');
    var widths = lines.map(function (ln) { return measure.measureText(ln).width; });
    var tw = Math.max.apply(null, widths), th = lines.length * lineH, R = (lineH * 0.62 + 9 * size) * (pad || 1);
    return { lines: lines, widths: widths, lineH: lineH, tw: tw, th: th, size: size, R: R,
             font: Math.round(21 * size), w: tw + R * 2 + 8, h: th + R * 2 + 4 };
  }

  // cellShape(): the discs that make a cell around the label's rows.
  function cellShape(nd, b, wob, rng, bead) {
    var rows = [], cy = nd.y - b.th / 2;
    b.lines.forEach(function (ln, li) { rows.push({ yc: cy + b.lineH * (li + 0.5), hh: b.lineH / 2, w: Math.max(18, b.widths[li]) }); });
    var inset = b.R * 0.8, seed = (nd.seed || 7) >>> 0, ph = (seed % 89) * 0.37;
    var nz = function (i) { return hash((seed + i * 31) >>> 0); };
    var discs = [];
    rows.forEach(function (r2, ri) {
      var R = r2.hh + inset, n = Math.max(1, Math.round(r2.w / (R * 0.55)));
      for (var i = 0; i <= n; i++) {
        var u = n ? i / n : 0.5, und = 1 + (noise1(u * 2.3 + ri * 3.1 + ph, nz) - 0.5) * 0.55 * wob;
        discs.push({ x: nd.x - r2.w / 2 + r2.w * u, y: r2.yc, r: R * und });
      }
    });
    var rB = (b.lineH * 0.30 + 5 * b.size) * bead;
    var corners = [{ x: nd.x + (rng() - 0.5) * rB, y: rows[0].yc - rows[0].hh - inset * 0.85 },
                   { x: nd.x + (rng() - 0.5) * rB, y: rows[rows.length - 1].yc + rows[rows.length - 1].hh + inset * 0.85 }];
    rows.forEach(function (r2, ri) {
      var prevW = ri > 0 ? rows[ri - 1].w : -1, nextW = ri < rows.length - 1 ? rows[ri + 1].w : -1;
      if (r2.w > prevW && r2.w > nextW) {
        corners.push({ x: nd.x + r2.w / 2 + inset * 0.85, y: r2.yc });
        corners.push({ x: nd.x - r2.w / 2 - inset * 0.85, y: r2.yc });
      }
    });
    corners.forEach(function (c2) {
      if (rng() < 0.8) discs.push({ x: c2.x + (rng() - 0.5) * rB * 0.7, y: c2.y + (rng() - 0.5) * rB * 0.7, r: rB * (0.75 + rng() * 0.5) });
    });
    return discs;
  }

  // stemPts(): the stem from a to b through its sagging vertex V, smoothed toward a curve.
  function stemPts(a, V, b, neckW, smooth) {
    var L1 = Math.hypot(V.x - a.x, V.y - a.y), L2 = Math.hypot(b.x - V.x, b.y - V.y), L = Math.max(1, L1 + L2);
    var n = Math.max(10, Math.round(L / 4)), out = [];
    for (var i = 0; i <= n; i++) {
      var t = i / n, tl = t * L, px, py, u;
      if (tl <= L1) { u = L1 ? tl / L1 : 0; px = a.x + (V.x - a.x) * u; py = a.y + (V.y - a.y) * u; }
      else { u = L2 ? (tl - L1) / L2 : 1; px = V.x + (b.x - V.x) * u; py = V.y + (b.y - V.y) * u; }
      var q = 1 - t, bx = q * q * a.x + 2 * q * t * V.x + t * t * b.x, by = q * q * a.y + 2 * q * t * V.y + t * t * b.y;
      out.push({ x: px + (bx - px) * smooth, y: py + (by - py) * smooth, r: neckW });
    }
    return out;
  }
  function vertexOf(a, b, sag) {
    var d = Math.hypot(b.x - a.x, b.y - a.y);
    return { x: (a.x + b.x) / 2 + (a.vx || 0), y: (a.y + b.y) / 2 + d * sag * 0.28 + (a.vy || 0) };
  }

  function el(name, attrs, parent) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  var uid = 0;
  function gooFilter(svg, blur) {
    var id = 'meet-goo-' + (++uid);
    var defs = svg.querySelector('defs') || el('defs', {}, svg);
    var f = el('filter', { id: id, x: '-20%', y: '-20%', width: '140%', height: '140%', 'color-interpolation-filters': 'sRGB' }, defs);
    el('feGaussianBlur', { in: 'SourceGraphic', stdDeviation: blur.toFixed(2) }, f);
    var ct = el('feComponentTransfer', {}, f);
    el('feFuncA', { type: 'linear', slope: CONTRAST, intercept: -(CONTRAST - 1) / 2 }, ct);
    return id;
  }

  /* A journey: spec = { nodes: [{ x, y, text, size, seed, vx, vy, pin: { x, y } }], ink,
     family, goo, wob, stem, smooth, sag, bead, duration, chainPins, pad, blur, pinR, cell } in the
     svg's own units (blur and pinR, when given, set the goo's blur and each city bead's radius;
     a small map wants a thin line, which the blur would otherwise floor).
     With chainPins the line runs through the pins (the places) and each cell hangs off its
     pin on a leader of its own, so cells that stand apart never close a loop. */
  function journey(svg, spec) {
    var goo = (spec.goo == null ? 55 : spec.goo) / 100, wob = (spec.wob == null ? 30 : spec.wob) / 100;
    var neckW = spec.stem || 8, smooth = (spec.smooth == null ? 70 : spec.smooth) / 100;
    var sag = (spec.sag == null ? 25 : spec.sag) / 100, bead = (spec.bead || 100) / 100;
    var g = spec.nodes;
    g.forEach(function (nd) { nd._b = labelBox(nd, spec.family, spec.pad); });
    var avgCap = g.reduce(function (s, nd) { return s + nd._b.lineH / 2 + nd._b.R * 0.8; }, 0) / g.length;
    var blur = spec.blur || Math.max(4, avgCap * (0.16 + goo * 0.34) + neckW * 0.3);
    var ink = el('g', { class: 'meet-journey', filter: 'url(#' + gooFilter(svg, blur) + ')', fill: spec.ink }, svg);
    var labels = el('g', { class: 'meet-journey-labels' }, svg);

    // The stems, with the Studio's noise on their width, and where each node sits on the line.
    var segs = [], total = 0, sPos = [0];
    function end(nd) { return spec.chainPins && nd.pin ? { x: nd.pin.x, y: nd.pin.y, vx: nd.vx, vy: nd.vy } : nd; }
    for (var i = 0; i < g.length - 1; i++) {
      var A = end(g[i]), B = end(g[i + 1]);
      var pts = stemPts(A, vertexOf(A, B, sag), B, neckW, smooth);
      var seed0 = (g[i].seed || 7) >>> 0, sph = (seed0 % 89) * 0.41, arc = 0;
      var snz = function (k2) { return hash((seed0 + k2 * 17) >>> 0); };
      for (var k = 0; k < pts.length; k++) {
        if (k > 0) arc += dlen(pts[k], pts[k - 1]);
        var nm = noise1(arc / 72 + sph, snz) - 0.5;
        pts[k].r = Math.max(blur * 0.92, neckW * (1 + nm * 1.15 * (0.55 + wob * 0.6)));
        pts[k].a = arc;
        pts[k].c = el('circle', { cx: pts[k].x.toFixed(1), cy: pts[k].y.toFixed(1), r: 0 }, ink);
      }
      segs.push({ pts: pts, L: arc, start: total });
      total += arc; sPos.push(total);
    }
    total = Math.max(1, total);
    // The line's centre, for anyone checking where it runs (the page's tests).
    svg.dataset.path = segs.map(function (sg) { return sg.pts.map(function (q) { return q.x.toFixed(1) + ',' + q.y.toFixed(1); }).join(' '); }).join(' ');
    var head = el('circle', { r: 0 }, ink);
    var grow = g.map(function (nd) { return Math.max(nd._b.w, nd._b.h) * 1.1 + 80; });
    var frontMax = total + grow[g.length - 1] + 1;

    // Each cell's discs, timed from where its stem enters it; each label in the page's face.
    g.forEach(function (nd, gi) {
      var rng = makeRng((nd.seed || 7) >>> 0);
      var from = spec.chainPins && nd.pin ? nd.pin
        : gi > 0 ? vertexOf(g[gi - 1], nd, sag) : (g[gi + 1] ? vertexOf(nd, g[gi + 1], sag) : nd);
      var dx = from.x - nd.x, dy = from.y - nd.y, dd = Math.hypot(dx, dy) || 1, m = Math.min(nd._b.w, nd._b.h) * 0.4;
      var entry = { x: nd.x + dx / dd * m, y: nd.y + dy / dd * m };
      // spec.cell, when given, draws the node's cell itself (into the ink, so its leader fuses
      // with it) and may move the node; it returns { node, tip }, tip being where the leader
      // meets the cell. Otherwise the Studio's own cell of discs.
      var art = spec.cell ? spec.cell(nd, nd._b, ink, gi) : null, discs = [], maxD = 1;
      if (art) { nd._art = art; art.node.setAttribute('transform', 'scale(0)'); }
      else discs = cellShape(nd, nd._b, wob, rng, bead);
      discs.forEach(function (d2) { d2.d = Math.hypot(d2.x - entry.x, d2.y - entry.y); if (d2.d > maxD) maxD = d2.d; });
      discs.forEach(function (d2) { d2.t = d2.d / maxD; d2.c = el('circle', { cx: d2.x.toFixed(1), cy: d2.y.toFixed(1), r: 0 }, ink); });
      nd._discs = discs;
      var reach = art && art.tip ? art.tip : nd;
      if (nd.pin && spec.pinStems === false) { // the city alone: a bead on the map
        nd._pin = [{ x: nd.pin.x, y: nd.pin.y, r: Math.max(blur * 1.25, neckW * 1.2), t: 0 }];
        nd._pin.forEach(function (p) { p.c = el('circle', { cx: p.x.toFixed(1), cy: p.y.toFixed(1), r: 0 }, ink); });
        nd._pin[0].c.setAttribute('class', 'meet-journey-anchor'); nd._pin[0].c.setAttribute('data-stop', gi);
      } else if (nd.pin) { // the city itself: a bead on the map, joined to its cell
        nd._pin = stemPts(nd.pin, { x: (nd.pin.x + reach.x) / 2, y: (nd.pin.y + reach.y) / 2 }, reach, neckW * 0.55, smooth)
          .map(function (p, pi, all) { return { x: p.x, y: p.y, r: pi === 0 ? (spec.pinR || Math.max(blur * 1.25, neckW * 1.6)) : Math.max(blur * 0.95, neckW * 0.55), t: spec.chainPins ? pi / all.length : 1 - pi / all.length }; });
        nd._pin.forEach(function (p) { p.c = el('circle', { cx: p.x.toFixed(1), cy: p.y.toFixed(1), r: 0 }, ink); });
        nd._pin[0].c.setAttribute('class', 'meet-journey-anchor'); nd._pin[0].c.setAttribute('data-stop', gi);
      }
      var b = nd._b, t = el('text', { class: 'meet-journey-label', x: nd.x.toFixed(1), 'font-size': b.font, 'text-anchor': 'middle' }, labels);
      b.lines.forEach(function (ln, li) {
        el('tspan', { x: nd.x.toFixed(1), y: (nd.y - b.th / 2 + b.lineH * (li + 0.5)).toFixed(1), 'dominant-baseline': 'central' }, t).textContent = ln;
      });
      t.style.opacity = 0;
      nd._label = t;
    });

    // One frame of the pour, p from 0 to 1: renderJourney()'s timing, unchanged.
    function frame(p) {
      var front = p >= 1 ? frontMax : easeSine(p) * frontMax, flowing = g.length > 1 && front < total - 1;
      var headAt = null;
      segs.forEach(function (sg) {
        var local = front - sg.start;
        sg.pts.forEach(function (pt) {
          var on = sg.start <= front && pt.a <= local, gap = local - pt.a;
          var tap = flowing ? (0.62 + 0.38 * Math.min(1, gap / (neckW * 6))) : 1;
          pt.c.setAttribute('r', on ? (pt.r * tap).toFixed(2) : 0);
          if (on && flowing && local < sg.L) headAt = pt;
        });
      });
      if (headAt) { head.setAttribute('cx', headAt.x.toFixed(1)); head.setAttribute('cy', headAt.y.toFixed(1)); head.setAttribute('r', (neckW * 2.05).toFixed(2)); }
      else head.setAttribute('r', 0);
      g.forEach(function (nd, gi) {
        var k = g.length > 1 ? clamp01((front - sPos[gi]) / grow[gi]) : Math.min(1, p < 1 ? p * 1.6 : 1);
        nd._discs.forEach(function (d2) {
          var f = clamp01((k * 1.18 - d2.t * 0.85) / 0.28), fs = f * f * (3 - 2 * f);
          d2.c.setAttribute('r', f <= 0.04 ? 0 : Math.max(1, d2.r * (0.15 + 0.85 * fs)).toFixed(2));
        });
        if (nd._art) {
          // The drawn cell blooms from where its leader meets it.
          var fa = clamp01((k * 1.3 - 0.35) / 0.55), sa = fa * fa * (3 - 2 * fa), tp = nd._art.tip || nd;
          nd._art.node.setAttribute('transform', sa >= 1 ? '' : 'translate(' + tp.x.toFixed(1) + ' ' + tp.y.toFixed(1) + ') scale(' + Math.max(0, sa).toFixed(3) + ') translate(' + (-tp.x).toFixed(1) + ' ' + (-tp.y).toFixed(1) + ')');
        }
        if (nd._pin) nd._pin.forEach(function (pp) {
          var f = clamp01((k * 1.3 - pp.t * 0.3) / 0.5);
          pp.c.setAttribute('r', f <= 0.04 ? 0 : (pp.r * f).toFixed(2));
        });
        var a = clamp01((k - 0.45) / 0.5);
        nd._label.style.opacity = p >= 1 ? 1 : (a * a * (3 - 2 * a)).toFixed(3);
      });
      svg.dataset.progress = p >= 1 ? '1' : String(Math.round(p * 1000) / 1000);
    }
    // animateGraph(): linear progress over the Studio's 2.3 seconds; at once under reduced motion.
    function play(done) {
      svg.dataset.started = '1';
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { frame(1); if (done) done(); return; }
      var dur = spec.duration || 2300, t0 = null;
      function tick(now) {
        if (t0 === null) t0 = now;
        var p = Math.min(1, (now - t0) / dur);
        frame(p);
        if (p < 1) requestAnimationFrame(tick); else if (done) done();
      }
      requestAnimationFrame(tick);
    }
    frame(0);
    return { frame: frame, play: play, blur: blur };
  }

  /* One ink cell filling a w x h box (the ZIP checker's bubble): cellShape()'s rows of
     discs, without a label, drawn whole. */
  function blob(svg, w, h, opts) {
    opts = opts || {};
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var pad = opts.pad == null ? 28 : opts.pad, wob = (opts.wob == null ? 30 : opts.wob) / 100;
    svg.setAttribute('viewBox', (-pad) + ' ' + (-pad) + ' ' + (w + pad * 2) + ' ' + (h + pad * 2));
    var rowH = Math.max(40, Math.min(90, h / Math.max(1, Math.round(h / 80))));
    var n = Math.max(1, Math.round(h / rowH)), lineH = h / n;
    var nd = { x: w / 2, y: h / 2, seed: opts.seed || 11 };
    var R = lineH * 0.5;
    var b = { lines: [], widths: [], lineH: lineH, th: h, size: lineH / 27, R: R * 1.1 };
    for (var i = 0; i < n; i++) { b.lines.push(''); b.widths.push(Math.max(18, w - R * 2)); }
    var discs = cellShape(nd, b, wob, makeRng(nd.seed), 1);
    var blur = Math.max(4, (lineH / 2 + b.R * 0.8) * (0.16 + 0.55 * 0.34));
    var ink = el('g', { class: 'meet-journey', filter: 'url(#' + gooFilter(svg, blur) + ')', fill: opts.ink || 'currentColor' }, svg);
    discs.forEach(function (d2) { el('circle', { cx: d2.x.toFixed(1), cy: d2.y.toFixed(1), r: d2.r.toFixed(1) }, ink); });
  }

  window.MeetInk = { journey: journey, blob: blob };
})();
