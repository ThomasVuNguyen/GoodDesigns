// chart.js — the model, its layout on the wall, and the check. Two charts share the wall: the life of one cyst on the
// slide, and what the camera did while it watched. Coordinates are wall millimetres (the wall is 180 mm wide).
(function (root) {
  'use strict';

  const WALL_W = 180;
  // the sheets of paper, top to bottom
  const TILES = [
    { id: 'title',    paper: 'cream', h: 232 },
    { id: 'dry',      paper: 'kraft', h: 150 },
    { id: 'lights',   paper: 'graph', h: 82 },
    { id: 'water',    paper: 'teal',  h: 132 },
    { id: 'cracks',   paper: 'navy',  h: 104 },
    { id: 'umbrella', paper: 'plum',  h: 122 },
    { id: 'nauplius', paper: 'peach', h: 140 },
    { id: 'activity', paper: 'graph', h: 104 },
    { id: 'endings',  paper: 'cream', h: 136 },
    { id: 'camera',   paper: 'black', h: 176 },
    { id: 'colophon', paper: 'sage',  h: 118 },
  ];
  let y = 0; for (const t of TILES) { t.y = y; y += t.h; }
  const WALL_H = y;
  const tileAt = (id) => TILES.find((t) => t.id === id);

  // states: x, y is the slide's centre; w, h its size. kind: state | end | bug
  const N = (id, label, x, yy, w, kind = 'state', chapter = '') => ({ id, label, x, y: yy, w, h: 15, kind, chapter });
  const T = (id) => tileAt(id).y;
  const STATES = [
    N('dry',     'Dry cyst (dormant)',         90, T('dry') + 36, 58, 'state', 'On the slide'),
    N('soak',    'Soaking, round again',       90, T('water') + 28, 60, 'state', 'In the water'),
    N('crack',   'The shell cracks (E1)',      90, T('cracks') + 16, 60, 'state', 'Hatching'),
    N('umb',     'Umbrella (E2)',              90, T('umbrella') + 16, 50, 'state', 'Hatching'),
    N('swim',    'Swimming (nauplius)',        90, T('nauplius') + 16, 58, 'state', 'Hatching'),
    N('picked',  'Picked off the slide',      146, T('endings') + 36, 48, 'end', 'Endings'),
    N('shut',    'Never hatches',              34, T('endings') + 36, 44, 'end', 'Endings'),
    N('gone',    'Swims out of the field',     90, T('endings') + 36, 56, 'end', 'Endings'),
    N('watch',   'Watching (timelapse)',       90, T('camera') + 40, 58, 'state', 'The camera'),
    N('saved',   'Two hours saved',           150, T('camera') + 70, 42, 'state', 'The camera'),
    N('frozen',  'The feed froze',             40, T('camera') + 76, 46, 'bug', 'The camera'),
    N('killed',  'Stopped mid-write',         104, T('camera') + 108, 50, 'bug', 'The camera'),
    N('rebuilt', 'Rebuilt from raw frames',   104, T('camera') + 146, 60, 'end', 'The camera'),
    N('lost',    'A file nothing can open',    40, T('camera') + 146, 54, 'end', 'The camera'),
  ];
  const S = Object.fromEntries(STATES.map((s) => [s.id, s]));
  const top = (s) => [s.x, s.y - s.h / 2], bot = (s) => [s.x, s.y + s.h / 2], left = (s) => [s.x - s.w / 2, s.y], right = (s) => [s.x + s.w / 2, s.y];

  // steps: kind gold (the way a cyst hatches), red (what broke on the bench), pale (every other step)
  // pts is the thread's route; tag is where its label hangs (null for none)
  const START = [90, T('title') + 206], CAM_START = [36, T('camera') + 40];
  const E = (from, to, label, kind, pts, tag, when) => ({ from, to, label, kind, pts, tag, when });
  const STEPS = [
    E(null, 'dry', 'cysts are shaken onto the slide', 'gold', [START, top(S.dry)], null, '17 Oct 18:37'),
    E('dry', 'dry', 'the lamp changes colour', 'pale', [[61, S.dry.y - 3], [44, S.dry.y - 6], [36, S.dry.y + 6], [44, S.dry.y + 16], [58, S.dry.y + 9], [61, S.dry.y + 4]], [30, S.dry.y + 24], '18–21 Oct'),
    E('dry', 'soak', 'water is added', 'gold', [bot(S.dry), top(S.soak)], [90, T('lights') + 66], '21 Oct 20:48'),
    E('dry', 'picked', 'a hand lifts it', 'pale', [right(S.dry), [168, S.dry.y], [174, S.dry.y + 6], [174, S.picked.y - 20], [168, S.picked.y - 14], [S.picked.x, S.picked.y - 14], top(S.picked)], [146, S.dry.y - 7], '19–21 Oct'),
    E('soak', 'shut', 'it stays shut', 'pale', [left(S.soak), [12, S.soak.y], [6, S.soak.y + 6], [6, S.shut.y - 20], [12, S.shut.y - 14], [S.shut.x, S.shut.y - 14], top(S.shut)], [32, S.soak.y + 10], ''),
    E('soak', 'crack', 'the shell cracks', 'gold', [bot(S.soak), top(S.crack)], [90, T('water') + 120], '22 Oct night'),
    E('crack', 'umb', 'the embryo pushes out', 'gold', [bot(S.crack), top(S.umb)], [90, T('cracks') + 94], '22 Oct 23:48'),
    E('umb', 'swim', 'the membrane breaks', 'gold', [bot(S.umb), top(S.swim)], [90, T('umbrella') + 112], '23 Oct'),
    E('swim', 'gone', 'it swims out of the field', 'gold', [bot(S.swim), top(S.gone)], [90, T('activity') + 92], '24 Oct 16:52'),
    E(null, 'watch', 'the camera starts', 'pale', [CAM_START, left(S.watch)], null, ''),
    E('watch', 'saved', 'two hours pass', 'pale', [right(S.watch), [150, S.watch.y], top(S.saved)], [150, S.watch.y + 13], ''),
    E('saved', 'watch', 'the next segment starts', 'pale', [[S.saved.x - 10, S.saved.y - S.saved.h / 2], [S.saved.x - 16, S.watch.y + 16], [S.watch.x + 14, S.watch.y + S.watch.h / 2]], null, ''),
    E('watch', 'frozen', 'the camera stops sending', 'red', [[S.watch.x - 18, S.watch.y + S.watch.h / 2], [S.watch.x - 26, S.frozen.y - 18], [S.frozen.x, S.frozen.y - 18], top(S.frozen)], [58, S.watch.y + 22], '23 Oct 23:19'),
    E('watch', 'killed', 'the recorder is killed', 'red', [[S.watch.x + 6, S.watch.y + S.watch.h / 2], [S.watch.x + 10, S.killed.y - 22], [S.killed.x, S.killed.y - 16], top(S.killed)], [118, S.killed.y - 22], '23 Oct'),
    E('frozen', 'watch', 'restarted', 'pale', [left(S.frozen), [12, S.frozen.y], [10, S.watch.y - 12], [S.watch.x - 22, S.watch.y - 12], [S.watch.x - 22, S.watch.y - S.watch.h / 2]], null, '24 Oct'),
    E('killed', 'rebuilt', 'raw frames re-wrapped', 'pale', [bot(S.killed), top(S.rebuilt)], [104, S.killed.y + 20], ''),
    E('killed', 'lost', 'left as it is', 'pale', [[S.killed.x - 16, S.killed.y + S.killed.h / 2], [S.killed.x - 16, S.lost.y - 16], [S.lost.x, S.lost.y - 16], top(S.lost)], [60, S.lost.y - 16], ''),
  ];

  // the check: walk every step from every state that can be reached
  function check() {
    const out = (id) => STEPS.filter((e) => e.from === id);
    const seen = new Set(), queue = STEPS.filter((e) => e.from === null).map((e) => e.to);
    while (queue.length) { const id = queue.shift(); if (seen.has(id)) continue; seen.add(id); out(id).forEach((e) => queue.push(e.to)); }
    const stuck = STATES.filter((s) => s.kind !== 'end' && !out(s.id).length).map((s) => s.label);
    const unreachable = STATES.filter((s) => !seen.has(s.id)).map((s) => s.label);
    // every way to Swimming passes The shell cracks
    const paths = []; const walk = (id, p) => { if (p.includes(id)) return; const q = p.concat(id); if (id === 'swim') { paths.push(q); return; } out(id).forEach((e) => walk(e.to, q)); };
    walk('dry', []);
    const swimAfterCrack = paths.every((p) => p.indexOf('crack') >= 0 && p.indexOf('crack') < p.indexOf('swim'));
    return { states: seen.size, steps: STEPS.length, stuck, unreachable, swimAfterCrack, swimPaths: paths.length };
  }

  root.Chart = { WALL_W, WALL_H, TILES, STATES, STEPS, START, CAM_START, check, tileAt };
})(typeof self !== 'undefined' ? self : this);
