(function () {
  'use strict';

  // The moving checkpoint map, static version: each fine-tuned checkpoint's
  // position after 1, 2, 5, and 10 gradient steps, in a 2D MDS embedding of
  // pairwise L2 weight distances (units are L2 distance in weight space),
  // Procrustes-aligned across steps.
  // Every trail starts at the origin (the pretrained weights, 0 steps), and
  // distances from the origin are compressed with a radially logarithmic
  // transform so nearby checkpoints stay distinguishable next to far ones.
  // Hovering a trail shows the task name and the hovered point's step count.
  var STEPS = [1, 2, 5, 10];
  // Labels match the task names used in the per-task results bar chart.
  var TASKS = [
    { id: 'flip_phone',      label: 'Flip phone upside down',      color: '#3987e5', pts: [[0.002, 0.027], [-0.088, 0.014], [-0.132, 0.026], [0.117, -0.275]] },
    { id: 'fold_paper',      label: 'Fold and crease paper',       color: '#d95926', pts: [[0.248, 0.289], [0.68, 0.719], [1.676, 1.916], [2.419, 4.42]] },
    { id: 'open_book',       label: 'Open book cover',             color: '#199e70', pts: [[-0.018, 0.041], [-0.13, 0.005], [-0.204, 0.044], [0.036, -0.462]] },
    { id: 'unzip_pouch',     label: 'Unzip pencil pouch',          color: '#c98500', pts: [[0.176, 0.129], [0.335, 0.327], [0.7, 0.66], [1.166, 0.567]] },
    { id: 'remove_vacuum',   label: 'Remove vacuum pad',           color: '#d55181', pts: [[-0.01, 0.236], [-0.192, 0.405], [-0.454, 1.211], [-0.545, 2.152]] },
    { id: 'retrieve_money',  label: 'Retrieve money from purse',  color: '#008300', pts: [[0.091, 0.055], [0.168, 0.115], [0.523, 0.118], [1.261, -0.593]] },
    { id: 'brush_cube',      label: 'Brush cube into bowl',        color: '#9085e9', pts: [[-1.0, -0.227], [-1.829, -0.378], [-4.562, -0.942], [-8.759, -1.357]] },
    { id: 'stack_cups',      label: 'Stack two small cups',        color: '#e66767', pts: [[-0.007, 0.06], [-0.065, 0.102], [-0.03, 0.283], [0.191, 0.44]] },
    { id: 'sweep_brush',     label: 'Sweep trash with brush',      color: '#279fb8', pts: [[0.134, 0.254], [0.321, 0.479], [0.562, 1.023], [0.895, 2.411]] },
    { id: 'twist_lid',       label: 'Twist lid off glass jar',     color: '#8f9a33', pts: [[0.384, -0.864], [0.8, -1.788], [1.921, -4.34], [3.219, -7.303]] }
  ];
  var W = 480;
  var H = 316;
  var PAD = 26;
  var NS = 'http://www.w3.org/2000/svg';

  // Reference radius for the log compression: radii map to
  // log10(1 + r / R0), preserving each point's angle from the origin.
  var R0 = 0.05;

  function logRadial(p) {
    var r = Math.sqrt(p[0] * p[0] + p[1] * p[1]);
    if (r === 0) return [0, 0];
    var k = Math.log10(1 + r / R0) / r;
    return [p[0] * k, p[1] * k];
  }

  function svgEl(tag, attrs) {
    var node = document.createElementNS(NS, tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    return node;
  }

  function init() {
    var root = document.getElementById('figure-ckpt-map');
    if (!root) return;

    // Display coordinates: the pretrained origin (0 steps) followed by the
    // log-radially compressed fine-tuned positions.
    TASKS.forEach(function (t) {
      t.disp = [[0, 0]].concat(t.pts.map(logRadial));
    });

    // Equal-aspect mapping of the transformed plane into the panel.
    var xs = [], ys = [];
    TASKS.forEach(function (t) {
      t.disp.forEach(function (p) { xs.push(p[0]); ys.push(p[1]); });
    });
    var xMin = Math.min.apply(null, xs), xMax = Math.max.apply(null, xs);
    var yMin = Math.min.apply(null, ys), yMax = Math.max.apply(null, ys);
    var scale = Math.min((W - 2 * PAD) / (xMax - xMin), (H - 2 * PAD) / (yMax - yMin));
    var xOff = (W - scale * (xMax - xMin)) / 2;
    var yOff = (H - scale * (yMax - yMin)) / 2;
    function x(v) { return xOff + (v - xMin) * scale; }
    function y(v) { return H - yOff - (v - yMin) * scale; }

    var svg = svgEl('svg', {
      viewBox: '0 0 ' + W + ' ' + H,
      class: 'ckpt-map-svg',
      role: 'img',
      'aria-label': 'Map of ten fine-tuned checkpoints drifting away from the pretrained weights over 1, 2, 5, and 10 gradient steps, on a radially logarithmic scale'
    });

    // Dotted reference rings: L2 distance from the pretrained weights, on the
    // same log-radial scale as the points. Drawn beneath the trails.
    var RINGS = [0.1, 1, 10];
    var rings = svgEl('g', { class: 'ckpt-rings' });
    var cx = x(0), cy = y(0);
    RINGS.forEach(function (r, i) {
      var pr = Math.log10(1 + r / R0) * scale;
      rings.appendChild(svgEl('circle', { cx: cx.toFixed(2), cy: cy.toFixed(2), r: pr.toFixed(2) }));
      var label = svgEl('text', {
        x: (cx + pr + 4).toFixed(2),
        y: (cy + 3).toFixed(2),
        'text-anchor': 'start'
      });
      label.textContent = String(r);
      rings.appendChild(label);
    });
    svg.appendChild(rings);

    // Pretraining trajectory: a dark gray curve sweeping in from the lower
    // left (a direction no fine-tuning trail occupies) into the pretrained
    // weights at the origin, labeled with its own slightly larger theta.
    // Starts just outside the viewBox so the curve visibly runs off the
    // panel's left border.
    var curveStart = [-6, 312];
    var curveCtrl = [200, 270];
    var pretrain = svgEl('g', { class: 'ckpt-pretrain' });
    var pretrainPath = svgEl('path', {
      class: 'ckpt-pretrain-curve',
      d: 'M' + curveStart[0] + ',' + curveStart[1] +
         'Q' + curveCtrl[0] + ',' + curveCtrl[1] + ' ' + cx.toFixed(2) + ',' + cy.toFixed(2)
    });
    pretrain.appendChild(pretrainPath);
    var pretrainLabel = svgEl('text', {
      class: 'ckpt-pretrain-label',
      x: 150,
      y: 293,
      'text-anchor': 'middle'
    });
    pretrainLabel.textContent = '\u03b8';
    var pretrainSub = svgEl('tspan', { class: 'ckpt-endlabel-sub', dx: 1, dy: 2 });
    pretrainSub.textContent = 'GEN-1.5 pretrain';
    pretrainLabel.appendChild(pretrainSub);
    pretrain.appendChild(pretrainLabel);
    svg.appendChild(pretrain);

    function curveAt(t) {
      var a = (1 - t) * (1 - t), b = 2 * (1 - t) * t, c = t * t;
      return [
        a * curveStart[0] + b * curveCtrl[0] + c * cx,
        a * curveStart[1] + b * curveCtrl[1] + c * cy
      ];
    }

    var hovers = [];
    TASKS.forEach(function (t) {
      var group = svgEl('g', { class: 'ckpt-task' });
      var d = t.disp.map(function (p, i) {
        return (i === 0 ? 'M' : 'L') + x(p[0]).toFixed(2) + ',' + y(p[1]).toFixed(2);
      }).join('');
      var trail = svgEl('path', { class: 'ckpt-trail', d: d, stroke: t.color });
      t.trailEl = trail;
      group.appendChild(trail);
      t.dotEls = [];
      t.disp.forEach(function (p, i) {
        if (i === 0) return; // shared pretrained origin, drawn once below
        var last = i === t.disp.length - 1;
        var dot = svgEl('circle', {
          class: last ? 'ckpt-dot ckpt-dot-final' : 'ckpt-dot',
          cx: x(p[0]).toFixed(2),
          cy: y(p[1]).toFixed(2),
          r: last ? 5 : 2.4,
          fill: t.color
        });
        t.dotEls[i] = dot;
        group.appendChild(dot);
      });
      svg.appendChild(group);
      t.groupEl = group;
      hovers.push({ task: t, el: group });
    });

    // θ-labels at each trail's 10-step endpoint: an italic theta with the task
    // name as subscript, placed just past the endpoint along the trail's
    // outward direction. Placement is best effort: candidate positions are
    // scored against already-placed labels, every other trail (sampled as
    // points), and the panel edges.
    var obstacles = [];
    TASKS.forEach(function (t) {
      for (var i = 1; i < t.disp.length; i++) {
        var ax = x(t.disp[i - 1][0]), ay = y(t.disp[i - 1][1]);
        var bx = x(t.disp[i][0]), by = y(t.disp[i][1]);
        var n = Math.max(1, Math.ceil(Math.sqrt((bx - ax) * (bx - ax) + (by - ay) * (by - ay)) / 6));
        for (var s = 0; s <= n; s++) {
          obstacles.push({ x: ax + (bx - ax) * s / n, y: ay + (by - ay) * s / n, task: t });
        }
      }
    });
    // The pretraining curve and its label are obstacles too.
    for (var ct = 0; ct <= 1; ct += 0.03) {
      var cp = curveAt(ct);
      obstacles.push({ x: cp[0], y: cp[1], task: null });
    }
    var placedBoxes = [{ x0: 95, y0: 279, x1: 205, y1: 300 }];

    function boxesOverlap(a, b) {
      return a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
    }

    function scoreBox(b, self) {
      var bad = 0;
      placedBoxes.forEach(function (p) { if (boxesOverlap(b, p)) bad += 100; });
      obstacles.forEach(function (o) {
        if (o.task === self) return;
        if (o.x > b.x0 - 2 && o.x < b.x1 + 2 && o.y > b.y0 - 2 && o.y < b.y1 + 2) bad += 1;
      });
      return bad;
    }

    // Outermost endpoints first: they sit in open space, leaving the crowded
    // center for last so its labels dodge the ones already placed.
    var ordered = TASKS.slice().sort(function (a, b) {
      var ea = a.disp[a.disp.length - 1], eb = b.disp[b.disp.length - 1];
      return (eb[0] * eb[0] + eb[1] * eb[1]) - (ea[0] * ea[0] + ea[1] * ea[1]);
    });
    ordered.forEach(function (t) {
      var e = t.disp[t.disp.length - 1];
      var ex = x(e[0]), ey = y(e[1]);
      var ux = ex - cx, uy = ey - cy;
      var uLen = Math.sqrt(ux * ux + uy * uy) || 1;
      ux /= uLen; uy /= uLen;
      var anchor = ux > 0.25 ? 'start' : ux < -0.25 ? 'end' : 'middle';
      var wBox = 9 + t.label.length * 3.9;

      var best = null, bestScore = Infinity;
      for (var g = 0; g < 4 && bestScore > 0; g++) {
        for (var pi = 0; pi < 5 && bestScore > 0; pi++) {
          var gap = 11 + g * 8;
          var perp = [0, 13, -13, 26, -26][pi];
          var px = ex + ux * gap - uy * perp;
          var py = ey + uy * gap + ux * perp + 3;
          var x0 = anchor === 'start' ? px : anchor === 'end' ? px - wBox : px - wBox / 2;
          var b = { x0: x0, y0: py - 9, x1: x0 + wBox, y1: py + 5 };
          // Clamp fully inside the panel, then score.
          var dx = Math.max(0, 3 - b.x0) + Math.min(0, W - 3 - b.x1);
          var dy = Math.max(0, 3 - b.y0) + Math.min(0, H - 3 - b.y1);
          b = { x0: b.x0 + dx, y0: b.y0 + dy, x1: b.x1 + dx, y1: b.y1 + dy };
          var score = scoreBox(b, t);
          if (score < bestScore) { bestScore = score; best = b; }
        }
      }
      placedBoxes.push(best);

      var textX = anchor === 'start' ? best.x0 : anchor === 'end' ? best.x1 : (best.x0 + best.x1) / 2;
      var label = svgEl('text', {
        class: 'ckpt-endlabel',
        x: textX.toFixed(2),
        y: (best.y0 + 9).toFixed(2),
        'text-anchor': anchor,
        fill: t.color
      });
      label.textContent = '\u03b8';
      var sub = svgEl('tspan', { class: 'ckpt-endlabel-sub', dx: 1, dy: 2 });
      sub.textContent = t.label.charAt(0).toLowerCase() + t.label.slice(1);
      label.appendChild(sub);
      t.labelEl = label;
      t.groupEl.appendChild(label);
    });

    // Shared origin marker: the pretrained weights, before any gradient steps.
    var origin = svgEl('g', { class: 'ckpt-origin' });
    var originDot = svgEl('circle', { cx: x(0).toFixed(2), cy: y(0).toFixed(2), r: 4 });
    origin.appendChild(originDot);
    svg.appendChild(origin);

    root.appendChild(svg);

    // First-load animation, triggered when the map scrolls into view: the
    // pretraining curve draws itself into the origin, then every task trail
    // draws outward together, dots fading in as their trail reaches them and
    // the theta labels last.
    var reduceMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
      var PRETRAIN_MS = 900;
      var TRAIL_AT = PRETRAIN_MS + 150;
      var TRAIL_MS = 1000;
      var LABELS_AT = TRAIL_AT + TRAIL_MS;
      var reveals = [];

      // pathLength=1 normalizes every path, so one dash unit draws it fully.
      function prepDraw(pathEl, delay, dur) {
        pathEl.setAttribute('pathLength', 1);
        pathEl.style.strokeDasharray = '1';
        pathEl.style.strokeDashoffset = '1';
        pathEl.style.transition = 'stroke-dashoffset ' + dur + 'ms ease ' + delay + 'ms';
        reveals.push(function () { pathEl.style.strokeDashoffset = '0'; });
      }

      function prepFade(fadeEl, delay, dur) {
        fadeEl.style.opacity = '0';
        fadeEl.style.transition = 'opacity ' + dur + 'ms ease ' + delay + 'ms';
        reveals.push(function () { fadeEl.style.opacity = '1'; });
      }

      prepDraw(pretrainPath, 0, PRETRAIN_MS);
      prepFade(originDot, PRETRAIN_MS - 200, 300);
      prepFade(pretrainLabel, PRETRAIN_MS - 300, 450);

      TASKS.forEach(function (t) {
        prepDraw(t.trailEl, TRAIL_AT, TRAIL_MS);
        // Time each dot to when the trail draw passes it (by length fraction).
        var cum = [0];
        for (var i = 1; i < t.disp.length; i++) {
          var dxp = x(t.disp[i][0]) - x(t.disp[i - 1][0]);
          var dyp = y(t.disp[i][1]) - y(t.disp[i - 1][1]);
          cum[i] = cum[i - 1] + Math.sqrt(dxp * dxp + dyp * dyp);
        }
        var total = cum[cum.length - 1] || 1;
        t.dotEls.forEach(function (dot, i) {
          prepFade(dot, TRAIL_AT + TRAIL_MS * (cum[i] / total) - 120, 250);
        });
        prepFade(t.labelEl, LABELS_AT, 400);
      });

      var played = false;
      function playIntro() {
        if (played) return;
        played = true;
        reveals.forEach(function (f) { f(); });
        // Restore the dots' CSS hover transition once the intro settles.
        setTimeout(function () {
          TASKS.forEach(function (t) {
            t.dotEls.forEach(function (dot) {
              dot.style.transition = '';
              dot.style.opacity = '';
            });
          });
        }, LABELS_AT + 700);
      }

      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          if (!entries.some(function (e) { return e.isIntersecting; })) return;
          io.disconnect();
          playIntro();
        }, { threshold: 0.35 });
        io.observe(root);
      } else {
        requestAnimationFrame(function () { requestAnimationFrame(playIntro); });
      }
    }

    // HTML tooltip: task name and the hovered point's gradient-step count,
    // white text on a semi-transparent black rounded rectangle.
    var tooltip = document.createElement('div');
    tooltip.className = 'ckpt-tooltip';
    var name = document.createElement('div');
    name.className = 'ckpt-tooltip-name';
    var steps = document.createElement('div');
    steps.className = 'ckpt-tooltip-steps';
    tooltip.appendChild(name);
    tooltip.appendChild(steps);
    root.appendChild(tooltip);

    var active = null;
    var activeDot = null;

    function setDot(el) {
      if (activeDot === el) return;
      if (activeDot) activeDot.classList.remove('ckpt-dot-hover');
      activeDot = el;
      if (el) el.classList.add('ckpt-dot-hover');
    }

    function setActive(hit, stepIdx) {
      if (hit && active !== hit) {
        if (active) active.el.classList.remove('ckpt-active');
        active = hit;
        hit.el.classList.add('ckpt-active');
        svg.classList.add('ckpt-dimmed');
        tooltip.classList.add('ckpt-tooltip-visible');
      }
      if (!hit) {
        if (active) active.el.classList.remove('ckpt-active');
        active = null;
        setDot(null);
        svg.classList.remove('ckpt-dimmed');
        tooltip.classList.remove('ckpt-tooltip-visible');
        return;
      }
      setDot(hit.task.dotEls[stepIdx + 1]);
      name.textContent = hit.task.label;
      steps.textContent = STEPS[stepIdx] + (STEPS[stepIdx] === 1 ? ' step' : ' steps');
    }

    svg.addEventListener('mousemove', function (ev) {
      var rect = svg.getBoundingClientRect();
      var sx = W / rect.width;
      var sy = H / rect.height;
      var mx = (ev.clientX - rect.left) * sx;
      var my = (ev.clientY - rect.top) * sy;

      // Nearest fine-tuned point across all tasks (within a radius); the
      // shared pretrained origin at index 0 is not a hover target.
      var best = null, bestIdx = 1, bestD = Infinity;
      hovers.forEach(function (h) {
        h.task.disp.forEach(function (p, i) {
          if (i === 0) return;
          var dx = x(p[0]) - mx;
          var dy = y(p[1]) - my;
          var d2 = dx * dx + dy * dy;
          if (d2 < bestD) { bestD = d2; best = h; bestIdx = i; }
        });
      });
      if (!best || bestD > 28 * 28) { setActive(null); return; }
      setActive(best, bestIdx - 1);

      var pt = best.task.disp[bestIdx];
      var left = (x(pt[0]) / W) * rect.width;
      var top = (y(pt[1]) / H) * rect.height;
      tooltip.style.left = Math.min(rect.width - 8, Math.max(8, left)) + 'px';
      tooltip.style.top = top + 'px';
      // Flip below the dot when there isn't room above it.
      tooltip.classList.toggle('ckpt-tooltip-below', top < 70);
    });
    svg.addEventListener('mouseleave', function () { setActive(null); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
