(function () {
  'use strict';

  // Per-task success scores (%), rendered as an HTML bar chart (real DOM
  // elements, so task names and values are selectable/copyable text — see the
  // rc-* styles in gen-1.5.css). `ft` = 10 gradient steps on 5 minutes of
  // data; `ic` = in-context learning from 12 seconds of demonstration context
  // (null = evaluation still in progress). Row order is intentionally
  // arbitrary (not sorted by performance).
  var TASKS = [
    { label: 'Retrieve money from purse',   ft: 83.3, ic: 60.7 },
    { label: 'Fold and crease paper',        ft: 69.3, ic: 50 },
    { label: 'Twist lid off glass jar',      ft: 94.5, ic: 60 },
    { label: 'Stack two small cups',         ft: 75,   ic: 67 },
    { label: 'Sweep trash with brush',       ft: 99,   ic: 37.3 },
    { label: 'Open book cover',              ft: 82.7, ic: 54.7 },
    { label: 'Brush cube into bowl',         ft: 71.2, ic: 60.8 },
    { label: 'Flip phone upside down',       ft: 81,   ic: 78 },
    { label: 'Unzip pencil pouch',           ft: 86,   ic: 55.5 },
    { label: 'Remove vacuum pad',            ft: 86,   ic: 64 }
  ];

  var LEGEND = [
    { className: 'rc-swatch-ft', text: '10 gradient steps (5 min of data)' },
    { className: 'rc-swatch-ic', text: 'In-context learning (12s of demos)' }
  ];

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function makeBar(className, widthPct, valueText) {
    var bar = el('div', 'rc-bar ' + className);
    bar.style.setProperty('--rc-width', widthPct + '%');
    bar.appendChild(el('span', 'rc-value', valueText));
    return bar;
  }

  function initChart() {
    var root = document.getElementById('figure-results');
    if (!root) return;

    // Average of the in-context evals completed so far — pending tasks are
    // drawn (grayed out) at this value until their results come in.
    var completed = TASKS.filter(function (t) { return t.ic != null; });
    var pendingAvg = Math.round(
      completed.reduce(function (s, t) { return s + t.ic; }, 0) / completed.length * 10
    ) / 10;

    var legend = el('div', 'rc-legend');
    LEGEND.forEach(function (item) {
      var entry = el('span', 'rc-legend-item');
      entry.appendChild(el('span', 'rc-swatch ' + item.className));
      entry.appendChild(el('span', null, item.text));
      legend.appendChild(entry);
    });

    var rows = el('div', 'rc-rows');
    TASKS.forEach(function (t) {
      var row = el('div', 'rc-row');
      row.appendChild(el('div', 'rc-label', t.label));
      var bars = el('div', 'rc-bars');
      bars.appendChild(makeBar('rc-bar-ft', t.ft, t.ft + '%'));
      bars.appendChild(t.ic != null
        ? makeBar('rc-bar-ic', t.ic, t.ic + '%')
        : makeBar('rc-bar-pending', pendingAvg, 'TBD'));
      row.appendChild(bars);
      rows.appendChild(row);
    });

    var axis = el('div', 'rc-row rc-axis');
    axis.appendChild(el('div', 'rc-label'));
    var ticks = el('div', 'rc-axis-ticks');
    [0, 20, 40, 60, 80, 100].forEach(function (v) {
      var tick = el('span', 'rc-axis-tick', v + '%');
      tick.style.left = v + '%';
      ticks.appendChild(tick);
    });
    axis.appendChild(ticks);

    var axisTitle = el('div', 'rc-axis-title', 'Task Success Rate (%)');

    root.appendChild(legend);
    root.appendChild(rows);
    root.appendChild(axis);
    root.appendChild(axisTitle);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChart);
  } else {
    initChart();
  }
})();
