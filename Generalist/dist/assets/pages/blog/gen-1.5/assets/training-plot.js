(function () {
  'use strict';

  // Next action prediction error on a held-out validation set over the
  // course of GEN-1.5 pretraining, exactly as plotted in the figure. Each
  // point is [fraction of the training run, value].
  // Rendered as an inline SVG line chart (tp-* styles in gen-1.5.css).
  var DATA = [[0.0015, 21.427], [0.006, 18.216], [0.0105, 17.729], [0.0165, 17.057], [0.021, 16.891], [0.027, 16.504], [0.0315, 16.479], [0.0375, 16.486], [0.042, 16.031], [0.048, 16.008], [0.054, 15.99], [0.0585, 15.871], [0.0645, 15.763], [0.069, 15.603], [0.075, 15.585], [0.0795, 15.739], [0.084, 15.41], [0.09, 15.422], [0.0945, 15.484], [0.099, 15.432], [0.1049, 15.305], [0.1094, 15.283], [0.1139, 15.382], [0.1184, 15.213], [0.1244, 15.005], [0.1304, 15.236], [0.1349, 15.077], [0.1394, 15.24], [0.1439, 15.09], [0.1484, 15.043], [0.1529, 15.051], [0.1574, 15.016], [0.1634, 15.014], [0.1679, 15.09], [0.1724, 15.009], [0.1769, 15.018], [0.1814, 15.062], [0.1859, 15.107], [0.1904, 14.941], [0.1964, 14.912], [0.2009, 14.81], [0.2054, 14.821], [0.2099, 14.869], [0.2144, 14.743], [0.2189, 14.848], [0.2249, 14.853], [0.2354, 14.705], [0.2429, 14.672], [0.2504, 14.579], [0.2579, 14.64], [0.2654, 14.667], [0.2729, 14.682], [0.2804, 14.571], [0.2879, 14.542], [0.2954, 14.592], [0.3028, 14.646], [0.3103, 14.567], [0.3178, 14.591], [0.3253, 14.606], [0.3328, 14.422], [0.3403, 14.508], [0.3478, 14.484], [0.3553, 14.313], [0.3628, 14.484], [0.3703, 14.425], [0.3778, 14.388], [0.3853, 14.471], [0.3928, 14.526], [0.4003, 14.348], [0.4078, 14.353], [0.4153, 14.317], [0.4228, 14.356], [0.4303, 14.373], [0.4378, 14.416], [0.4453, 14.256], [0.4528, 14.404], [0.4603, 14.157], [0.4678, 14.183], [0.4753, 14.338], [0.4828, 14.301], [0.4903, 14.318], [0.4978, 14.276], [0.5052, 14.302], [0.5127, 14.275], [0.5202, 14.267], [0.5277, 14.343], [0.5352, 14.256], [0.5427, 14.221], [0.5502, 14.163], [0.5577, 14.264], [0.5652, 14.223], [0.5727, 14.153], [0.5802, 14.148], [0.5877, 14.199], [0.5952, 14.055], [0.6027, 14.163], [0.6102, 14.154], [0.6177, 14.178], [0.6252, 14.206], [0.6327, 14.109], [0.6402, 14.196], [0.6477, 14.067], [0.6552, 14.2], [0.6627, 14.13], [0.6702, 14.202], [0.6777, 14.106], [0.6852, 14.352], [0.6927, 14.352], [0.7001, 14.19], [0.7076, 14.185], [0.7151, 14.095], [0.7226, 14.173], [0.7301, 14.163], [0.7376, 14.14], [0.7451, 14.193], [0.7526, 14.187], [0.7601, 14.1], [0.7676, 14.172], [0.7751, 14.102], [0.7826, 14.08], [0.7871, 14.102], [0.7931, 13.56], [0.8051, 13.425], [0.8126, 13.42], [0.8204, 13.445], [0.8282, 13.397], [0.836, 13.175], [0.8438, 13.226], [0.8516, 13.258], [0.8594, 13.196], [0.8672, 13.207], [0.875, 13.319], [0.8828, 13.231], [0.8906, 13.252], [0.8966, 13.215], [0.9019, 13.144], [0.9139, 13.184], [0.9214, 13.057], [0.9289, 13.02], [0.9364, 13.07], [0.9436, 13.043], [0.9481, 13.004], [0.9541, 13.022], [0.9586, 12.951], [0.9664, 13.047], [0.9739, 12.963], [0.9808, 12.944], [0.9868, 12.948], [0.9928, 12.301], [0.9982, 11.907], [1, 11.862]];

  var W = 720;
  var H = 352;
  var PAD = { top: 16, right: 16, bottom: 64, left: 82 };

  var SVG_NS = 'http://www.w3.org/2000/svg';

  function svgEl(tag, attrs) {
    var node = document.createElementNS(SVG_NS, tag);
    for (var k in attrs) node.setAttribute(k, attrs[k]);
    return node;
  }

  function initChart() {
    var root = document.getElementById('figure-training');
    if (!root || !DATA.length) return;

    var PTS = DATA;

    var xMax = PTS[PTS.length - 1][0];
    // Snug axis range around the data, with a gridline every 2 units.
    var yMin = 11;
    var yMax = 22;

    var plotW = W - PAD.left - PAD.right;
    var plotH = H - PAD.top - PAD.bottom;

    function x(frac) { return PAD.left + (frac / xMax) * plotW; }
    function y(v) { return PAD.top + (1 - (v - yMin) / (yMax - yMin)) * plotH; }

    var svg = svgEl('svg', {
      viewBox: '0 0 ' + W + ' ' + H,
      role: 'img',
      'aria-label': 'Line chart: next action prediction error on validation data declining over the course of GEN-1.5 pretraining.'
    });

    // Bottom axis line at the edge of the range, gridlines at labeled ticks.
    svg.appendChild(svgEl('line', {
      class: 'tp-axis-line',
      x1: PAD.left, x2: W - PAD.right, y1: y(yMin), y2: y(yMin)
    }));

    // Horizontal gridlines + y tick labels.
    for (var tv = 12; tv <= yMax; tv += 2) {
      svg.appendChild(svgEl('line', {
        class: 'tp-gridline',
        x1: PAD.left, x2: W - PAD.right, y1: y(tv), y2: y(tv)
      }));
      var yLabel = svgEl('text', {
        class: 'tp-tick', x: PAD.left - 8, y: y(tv) + 3.5, 'text-anchor': 'end'
      });
      yLabel.appendChild(document.createTextNode((tv / 10).toFixed(1) + ' × 10'));
      var sup = svgEl('tspan', { class: 'tp-tick-sup', dy: -5 });
      sup.textContent = '\u22122';
      yLabel.appendChild(sup);
      svg.appendChild(yLabel);
    }

    // Vertical gridlines + x tick labels at calendar month boundaries, as
    // shown on the figure's x-axis. Training progress maps linearly onto the
    // training window; the first tick is clamped to the plot origin.
    var T0 = Date.UTC(2025, 11, 15);
    var T1 = Date.UTC(2026, 7, 1);
    var MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (var k = 0; k < 9; k++) {
      var monthStart = Date.UTC(2025, 11 + k, 1);
      var fracAtMonth = Math.max(((monthStart - T0) / (T1 - T0)) * xMax, 0);
      if (k > 0) {
        svg.appendChild(svgEl('line', {
          class: 'tp-gridline',
          x1: x(fracAtMonth), x2: x(fracAtMonth), y1: PAD.top, y2: H - PAD.bottom
        }));
      }
      // Skip labels that would collide with the origin label.
      if (k > 0 && fracAtMonth / xMax < 0.06) continue;
      var monthIdx = (11 + k) % 12;
      var xLabel = svgEl('text', {
        class: 'tp-tick', x: x(fracAtMonth), y: H - PAD.bottom + 16, 'text-anchor': 'middle'
      });
      xLabel.textContent = MONTH_NAMES[monthIdx];
      svg.appendChild(xLabel);
      // First and last ticks carry the year on a second line below the month.
      if (k === 0 || k === 8) {
        var yearLabel = svgEl('text', {
          class: 'tp-tick', x: x(fracAtMonth), y: H - PAD.bottom + 33, 'text-anchor': 'middle'
        });
        yearLabel.textContent = k === 0 ? '2025' : '2026';
        svg.appendChild(yearLabel);
      }
    }

    // y-axis line.
    svg.appendChild(svgEl('line', {
      class: 'tp-axis-line',
      x1: PAD.left, x2: PAD.left, y1: PAD.top, y2: H - PAD.bottom
    }));

    // Axis titles.
    var xTitle = svgEl('text', {
      class: 'tp-axis-title', x: PAD.left + plotW / 2, y: H - 12, 'text-anchor': 'middle'
    });
    xTitle.textContent = 'Month';
    svg.appendChild(xTitle);

    var yTitle = svgEl('text', {
      class: 'tp-axis-title',
      x: -(PAD.top + plotH / 2), y: 14, 'text-anchor': 'middle',
      transform: 'rotate(-90)'
    });
    yTitle.textContent = 'Next Action Prediction Error (Validation)';
    svg.appendChild(yTitle);

    // The data line.
    var d = PTS.map(function (p, i) {
      return (i === 0 ? 'M' : 'L') + x(p[0]).toFixed(2) + ',' + y(p[1]).toFixed(2);
    }).join('');
    var path = svgEl('path', { class: 'tp-line', d: d });
    svg.appendChild(path);

    // A small dot per data point and a larger marker on the final point.
    var dots = [];
    for (var i = 0; i < PTS.length; i++) {
      var dot = svgEl('circle', {
        class: 'tp-dot', r: 1.75, cx: x(PTS[i][0]).toFixed(2), cy: y(PTS[i][1]).toFixed(2)
      });
      dots.push(dot);
      svg.appendChild(dot);
    }

    var endDot = svgEl('circle', { class: 'tp-end-dot', r: 4.5 });
    svg.appendChild(endDot);

    function nearestIndex(frac) {
      var lo = 0, hi = PTS.length - 1;
      while (hi - lo > 1) {
        var mid = (lo + hi) >> 1;
        if (PTS[mid][0] < frac) lo = mid; else hi = mid;
      }
      return (frac - PTS[lo][0] < PTS[hi][0] - frac) ? lo : hi;
    }

    // Markers for moments of algorithmic improvement: a text label offset
    // from the curve, with a connector line running to the data point.
    var ANNOTATIONS = [
      { label: 'Phase 1', at: 0,      dx: 36, dy: 0,   anchor: 'start' },
      { label: 'Phase 2', at: 0.7886, dx: 0,  dy: -26, anchor: 'middle' },
      { label: 'Phase 3', at: 0.9895, dx: 0,  dy: -32, anchor: 'end' }
    ];
    var annots = ANNOTATIONS.map(function (a) {
      var idx = nearestIndex(a.at);
      var px = x(PTS[idx][0]);
      var py = y(PTS[idx][1]);
      var lx = px + a.dx;
      var ly = py + a.dy;
      var group = svgEl('g', { class: 'tp-annot' });
      group.appendChild(svgEl('line', {
        class: 'tp-annot-line', x1: px, y1: py, x2: lx, y2: ly
      }));
      // Horizontal connectors get the text beside the line end, vertically
      // centered; vertical/diagonal ones get it above or below the line end.
      var tx = lx, ty;
      if (a.dy === 0) {
        tx = lx + (a.dx >= 0 ? 6 : -6);
        ty = ly + 4;
      } else {
        ty = ly + (a.dy < 0 ? -5 : 13);
      }
      var text = svgEl('text', {
        class: 'tp-annot-text',
        x: tx,
        y: ty,
        'text-anchor': a.anchor
      });
      text.textContent = a.label;
      group.appendChild(text);
      svg.appendChild(group);
      return { el: group, text: text };
    });

    // Hover affordances: a marker dot on the line and an HTML tooltip with
    // the value at the data point nearest the cursor.
    var marker = svgEl('circle', { class: 'tp-marker', r: 4 });
    svg.appendChild(marker);

    var hitArea = svgEl('rect', {
      x: PAD.left, y: PAD.top, width: plotW, height: plotH, fill: 'transparent'
    });
    svg.appendChild(hitArea);

    root.appendChild(svg);

    // Rounded pill behind each annotation label. Sized from the rendered
    // text, so it has to run after the SVG is attached to the document.
    annots.forEach(function (a) {
      var bb = a.text.getBBox();
      var padX = 7, padY = 4;
      a.el.insertBefore(svgEl('rect', {
        class: 'tp-annot-pill',
        x: (bb.x - padX).toFixed(2),
        y: (bb.y - padY).toFixed(2),
        width: (bb.width + padX * 2).toFixed(2),
        height: (bb.height + padY * 2).toFixed(2),
        rx: 6, ry: 6
      }), a.text);
    });

    var tooltip = document.createElement('div');
    tooltip.className = 'tp-tooltip';
    root.appendChild(tooltip);

    function nearestPoint(frac) {
      var lo = 0, hi = PTS.length - 1;
      while (hi - lo > 1) {
        var mid = (lo + hi) >> 1;
        if (PTS[mid][0] < frac) lo = mid; else hi = mid;
      }
      return (frac - PTS[lo][0] < PTS[hi][0] - frac) ? PTS[lo] : PTS[hi];
    }

    hitArea.addEventListener('mousemove', function (e) {
      var svgRect = svg.getBoundingClientRect();
      var scale = svgRect.width / W;
      var mx = (e.clientX - svgRect.left) / scale;
      var p = nearestPoint(((mx - PAD.left) / plotW) * xMax);
      var px = x(p[0]);
      var py = y(p[1]);

      marker.setAttribute('cx', px);
      marker.setAttribute('cy', py);
      marker.classList.add('tp-visible');

      var rootRect = root.getBoundingClientRect();
      tooltip.innerHTML = (p[1] / 10).toFixed(2) + ' &times; 10<sup>&minus;2</sup>';
      tooltip.style.left = (svgRect.left - rootRect.left + px * scale) + 'px';
      tooltip.style.top = (svgRect.top - rootRect.top + py * scale - 10) + 'px';
      tooltip.classList.add('tp-visible');
    });

    hitArea.addEventListener('mouseleave', function () {
      marker.classList.remove('tp-visible');
      tooltip.classList.remove('tp-visible');
    });

    // Show the complete chart immediately.
    function showFinalState() {
      dots.forEach(function (dot) { dot.classList.add('tp-visible'); });
      annots.forEach(function (a) { a.el.classList.add('tp-visible'); });
      var last = PTS[PTS.length - 1];
      endDot.setAttribute('cx', x(last[0]));
      endDot.setAttribute('cy', y(last[1]));
      endDot.classList.add('tp-visible');
    }

    showFinalState();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChart);
  } else {
    initChart();
  }
})();
