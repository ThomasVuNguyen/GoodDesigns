// page.js — lays the sheets down the wall and draws them as they come near, then runs the step-through mode.
(function () {
  'use strict';
  const Ch = window.Chart, W = Ch.WALL_W, H = Ch.WALL_H, $ = (id) => document.getElementById(id);
  const DARK = { teal: 1, navy: 1, black: 1, plum: 1 };
  const ALT = {
    title: 'Out of the shell. Seventeen days of brine shrimp, drawn as a statechart. Each glass slide is a state a cyst can be in; each thread is a step it can take. A gold thread is a cyst that hatches, a red thread is what broke on the bench, and a pale thread is every other step. Below, a slide scattered with dry dark cysts; one, ringed in gold, is where the thread begins.',
    dry: 'On brown kraft paper, the slide Dry cyst (dormant). To the right, a packed cluster of dented dark cysts, each a fifth of a millimetre. To the left, an eyepiece view lit orange, and a pale thread loops back: the lamp changes colour. Another pale thread runs off to the right: a hand lifts it.',
    lights: 'On graph paper, thirty-seven pastel bars, one per two-hour segment from 18 to 21 October: white, orange, sixteen hours of green, orange again, white. The gold thread crosses them to a tag: water is added.',
    water: 'On dark teal, the slide Soaking, round again. Smooth round cysts drift among pale wavy threads and a cloudy patch; two empty shells. A pale thread leaves to the left: it stays shut.',
    cracks: 'On navy, the slide The shell cracks (E1). A large dark cyst split along one side, a tan embryo bulging out of the crack inside a clear membrane.',
    umbrella: 'On plum, the slide Umbrella (E2). An open dark shell with a tan embryo hanging under it inside a clear membrane, its eye already dark.',
    nauplius: 'On peach, the slide Swimming (nauplius). A large tan nauplius with one dark eye at the front and two big feathered antennae.',
    activity: 'On graph paper, ten bars of motion through the hatching night, 22 to 23 October, rising to a gold peak at 07:48, more than triple the first.',
    endings: 'Endings, three slides. Never hatches, over a single closed cyst. Swims out of the field, over a small swimming nauplius, reached by the gold thread. Picked off the slide, over a pair of tweezers holding a cyst.',
    camera: 'On black, a second chart: what the camera did. Watching (timelapse) loops through Two hours saved. Red threads lead to The feed froze, over a film strip of the same frame repeated, and to Stopped mid-write, which leads to Rebuilt from raw frames or A file nothing can open.',
    colophon: 'What the walk checked: two rules hold and two break. A ring of the days from 9 to 26 October, gold where the timelapse ran and red on the days of the freeze and the broken files.',
  };

  // ---------- the wall
  const wall = $('wall'), marks = $('step-marks'), sheets = {};
  for (const t of Ch.TILES) {
    const el = document.createElement('div'); el.className = 'sheet' + (DARK[t.paper] ? ' dark' : ''); el.style.aspectRatio = `${W} / ${t.h}`;
    el.style.background = Kit.PAPERS[t.paper].base;
    const cv = document.createElement('canvas'); cv.setAttribute('role', 'img'); cv.setAttribute('aria-label', ALT[t.id]);
    const wait = document.createElement('div'); wait.className = 'wait'; wait.textContent = 'drawing…';
    el.append(cv, wait); wall.insertBefore(el, marks); sheets[t.id] = { el, cv, t };
  }
  // the credits and the button sit over the title sheet, in the same type, so they read as the drawing but select and click
  {
    const T = Ch.tileAt('title'), L = Wall.TITLE_LAYOUT, el = sheets.title.el, ul = document.createElement('ul'); ul.className = 'credits'; ul.setAttribute('aria-label', 'Credits');
    Wall.TITLE_LINES.forEach(([s, href, word], i) => {
      const li = document.createElement('li'); li.style.left = (L.x / W * 100) + '%'; li.style.top = ((L.y0 + i * L.lh - 0.2) / T.h * 100) + '%'; li.style.fontSize = (L.size / W * 100) + 'cqw';
      if (href && word) { const [a, b] = s.split(word); const link = document.createElement('a'); link.href = href; link.textContent = word; li.append(a, link, b); } else li.textContent = s;
      ul.append(li);
    });
    el.append(ul);
    const b = L.button, btn = document.createElement('button'); btn.type = 'button'; btn.className = 'step-open'; btn.id = 'step-open'; btn.textContent = 'Step through the chart';
    btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'stepper');
    Object.assign(btn.style, { left: b.x / W * 100 + '%', top: b.y / T.h * 100 + '%', width: b.w / W * 100 + '%', height: b.h / T.h * 100 + '%' });
    el.append(btn);
  }

  // ---------- the real frames and clips, laid into the holes the drawing leaves
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches, clips = [];
  for (const f of Wall.FIELD) {
    const t = Ch.tileAt(f.tile), el = document.createElement('figure'); el.className = 'field ' + f.kind;
    const w = f.kind === 'lens' ? f.r * 2 : f.w, h = f.kind === 'lens' ? f.r * 2 : f.h;
    Object.assign(el.style, { left: (f.x - w / 2) / W * 100 + '%', top: (f.y - h / 2) / t.h * 100 + '%', width: w / W * 100 + '%', height: h / t.h * 100 + '%', transform: f.rot ? `rotate(${f.rot}rad)` : '' });
    let m;
    if (f.src.endsWith('.mp4')) {
      m = document.createElement('video'); Object.assign(m, { muted: true, loop: true, playsInline: true, preload: 'metadata' }); m.setAttribute('muted', '');
      m.src = 'field/' + f.src + '#t=0.5'; clips.push(m);
      el.tabIndex = 0; el.setAttribute('role', 'button'); el.setAttribute('aria-label', f.alt + ' Play or pause.');
      const toggle = () => { m.dataset.user = m.paused ? 'play' : 'pause'; m.paused ? m.play().catch(() => {}) : m.pause(); };
      el.addEventListener('click', toggle); el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
    } else { m = document.createElement('img'); m.src = 'field/' + f.src; m.alt = f.alt; m.loading = 'lazy'; m.decoding = 'async'; }
    if (!f.alt && m.tagName === 'IMG') m.setAttribute('aria-hidden', 'true');
    el.append(m); sheets[f.tile].el.append(el);
  }
  // clips play while they are on screen, unless the reader asked for less motion or paused one
  const seen = new IntersectionObserver((es) => es.forEach(({ target, isIntersecting }) => {
    const v = target.querySelector('video'); if (!v) return;
    if (isIntersecting && !reduceMotion && v.dataset.user !== 'pause') v.play().catch(() => {}); else if (!isIntersecting) v.pause();
  }), { threshold: 0.25 });
  clips.forEach((v) => seen.observe(v.parentElement));

  // ---------- drawing: nearest sheets first, in a worker when the browser allows it
  const ppm = Math.min(2, window.devicePixelRatio || 1) * Math.min(960, wall.clientWidth || 960) / W;
  const queue = [], busy = new Set();
  let worker = null;
  try { worker = new Worker('render.js'); } catch (e) { worker = null; }
  const paint = (id, w, h, px) => { const { cv, el } = sheets[id]; cv.width = w; cv.height = h; cv.getContext('2d').putImageData(new ImageData(new Uint8ClampedArray(px.buffer || px), w, h), 0, 0); el.classList.add('done'); busy.delete(id); pump(); };
  if (worker) {
    worker.onmessage = ({ data }) => { if (data.error) { console.error(data.error); worker = null; busy.delete(data.id); queue.unshift(data.id); pump(); return; } paint(data.id, data.w, data.h, data.px); };
    worker.onerror = () => { worker = null; busy.clear(); pump(); };
  }
  function pump() {
    if (busy.size || !queue.length) return;
    const vy = window.scrollY + innerHeight / 2;
    queue.sort((a, b) => Math.abs(sheets[a].el.offsetTop - vy) - Math.abs(sheets[b].el.offsetTop - vy));
    const id = queue.shift(); busy.add(id);
    if (worker) worker.postMessage({ id, ppm });
    else document.fonts.ready.then(() => setTimeout(() => { const S = Wall.drawTile(id, ppm); paint(id, S.W, S.H, Kit.pixels(S)); }, 0));
  }
  document.fonts.load('400 16px "Kevin Sans"').then(() => document.fonts.load('700 16px "Kevin Sans"')).then(() => { for (const t of Ch.TILES) queue.push(t.id); pump(); });
  addEventListener('scroll', () => { if (!busy.size) pump(); }, { passive: true });

  // ---------- the chart as text
  {
    const out = (id) => Ch.STEPS.filter((e) => e.from === id), lab = (id) => Ch.STATES.find((s) => s.id === id).label, c = Ch.check();
    let html = `<p>A statechart of one brine shrimp cyst on the slide, and a second of the camera that watched it, from the MicroScope-v1 dataset (9 to 26 October 2026). Walked from each start, the charts reach ${c.states} states by ${c.steps} steps. Each state below lists the steps that leave it.</p>`;
    const groups = [...new Set(Ch.STATES.map((s) => s.chapter))];
    for (const g of groups) {
      html += `<h3>${g}</h3><dl>`;
      for (const s of Ch.STATES.filter((x) => x.chapter === g)) {
        html += `<dt>${s.label}${s.kind === 'bug' ? ' <span class="breaks">(breaks a rule)</span>' : ''}</dt>`;
        const o = out(s.id); html += o.length ? o.map((e) => `<dd>${e.label} → ${lab(e.to)}${e.when ? ` <span class="when">(${e.when})</span>` : ''}</dd>`).join('') : '<dd>the end</dd>';
      }
      html += '</dl>';
    }
    html += `<h3>What the walk found</h3><ul><li>Holds: no cyst swims before its shell cracks (${c.swimPaths} paths to Swimming, all through The shell cracks).</li><li>Holds: every state has a way out, or is an ending${c.stuck.length ? ' — except ' + c.stuck.join(', ') : ''}.</li><li>Breaks: every saved frame is new. On 23 Oct the camera froze and the recorder wrote one frame 9,212 times.</li><li>Breaks: every file opens. Three uploads lost their index; two were rebuilt from their raw frames.</li></ul>`;
    $('chart-text').innerHTML = html;
  }

  // ---------- the step-through mode
  const svg = $('step-svg'); svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  const route = $('step-route'), token = $('step-token'), spot = $('step-spot');
  const SCOPE = {
    dry:     ['img/oct17_cysts_dense.jpg', 'Hundreds of dry cysts, dented, packed edge to edge. 17 Oct 19:14.'],
    soak:    ['img/oct23_live_still.jpg', 'Round cysts in water among pale cast-off shells. 23 Oct 14:43.'],
    crack:   ['img/hatch_closeup.jpg', 'A tan body part-way out of a split cyst. 22 Oct 23:48.'],
    umb:     ['img/oct23_hatch2.jpg', 'A second embryo further out, limbs spread. 23 Oct 03:48.'],
    swim:    ['clips/live_oct23_zoom.mp4', 'Real time: a nauplius leaves its cyst. 23 Oct.'],
    gone:    ['img/oct24_nauplius.jpg', 'An elongated tan body with one dark eye. 24 Oct 16:52.'],
    picked:  ['img/oct18_cluster.jpg', 'A sparser cluster where the dense one was. 18 Oct 19:47.'],
    shut:    ['img/oct17_night.jpg', 'A cluster that does not move all night. 17 Oct 23:14.'],
    watch:   ['clips/run_oct21.mp4', 'Two frames a second, the field wobbling on the eyepiece. 21 Oct.'],
    saved:   ['img/oct18_orange.jpg', 'One segment’s first frame, under orange light. 18 Oct.'],
    frozen:  ['img/oct23_threads.jpg', 'The frozen frame: the same cyan field, 9,212 times.'],
    killed:  [null, 'No index: the 4.2 GB file will not open.'],
    rebuilt: ['clips/live_oct23_zoom.mp4', 'Rebuilt: 57 minutes, 102,487 frames, playing again.'],
    lost:    [null, 'Nothing to show: the file stays unreadable.'],
  };
  const media = {};
  function load(id) {
    const src = SCOPE[id][0]; if (!src) return null;
    if (!media[src]) {
      if (src.endsWith('.mp4')) { const v = document.createElement('video'); v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'auto'; v.src = 'field/' + src; media[src] = v; }
      else { const im = new Image(); im.decoding = 'async'; im.src = 'field/' + src; media[src] = im; }
    }
    return media[src];
  }
  let hist = [], playing = null, raf = 0;
  const S = (id) => Ch.STATES.find((s) => s.id === id);
  const out = (id) => Ch.STEPS.filter((e) => e.from === id);
  function startState() { return 'dry'; }
  function place(st) { Object.assign(spot.style, { left: ((st.x - st.w / 2 - 1.2) / W * 100) + '%', top: ((st.y - st.h / 2 - 1.2) / H * 100) + '%', width: ((st.w + 2.4) / W * 100) + '%', height: ((st.h + 2.4) / H * 100) + '%' }); }
  function pathD(pts) { const p = Wall.rounded(pts); return 'M' + p.map(([x, y]) => x.toFixed(2) + ' ' + y.toFixed(2)).join(' L'); }
  function moveToken(step, done) {
    route.setAttribute('d', pathD(step.pts)); route.style.opacity = 1;
    const L = route.getTotalLength(), t0 = performance.now(), dur = Math.min(2600, 500 + L * 9), reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tick = (now) => {
      const u = reduce ? 1 : Math.min(1, (now - t0) / dur), e = u < 0.5 ? 2 * u * u : 1 - (-2 * u + 2) ** 2 / 2, p = route.getPointAtLength(e * L);
      token.setAttribute('transform', `translate(${p.x} ${p.y})`);
      const sy = (p.y / H) * wall.offsetHeight + wall.offsetTop; if (!reduce && (sy < scrollY + 80 || sy > scrollY + innerHeight * (innerWidth < 900 ? 0.4 : 0.8))) scrollTo({ top: sy - innerHeight * 0.3 });
      if (u < 1) requestAnimationFrame(tick); else { route.style.opacity = 0.35; done && done(); }
    };
    requestAnimationFrame(tick);
  }
  function show() {
    const id = hist[hist.length - 1], st = S(id), moves = out(id);
    place(st);
    $('step-chapter').textContent = st.chapter; $('step-now').textContent = st.label; $('step-cell-note').textContent = st.kind === 'bug' ? 'This state breaks a rule.' : st.kind === 'end' ? 'An ending.' : '';
    $('step-cell').setAttribute('aria-label', SCOPE[id][1]);
    $('step-ask').textContent = moves.length ? 'What can happen next?' : 'Nothing happens after this.';
    const ul = $('step-moves'); ul.innerHTML = '';
    for (const m of moves) {
      const li = document.createElement('li'), b = document.createElement('button'); b.type = 'button'; b.className = 'move ' + m.kind;
      b.innerHTML = `<span class="swatch"></span><span class="what"></span><span class="to"></span>`;
      b.querySelector('.what').textContent = m.label; b.querySelector('.to').textContent = (m.to === id ? 'and stays ' : 'to ') + S(m.to).label + (m.when ? ' · ' + m.when : '');
      b.onclick = () => take(m); li.append(b); ul.append(li);
    }
    $('step-back').disabled = hist.length < 2;
    const tr = $('step-trail'); tr.innerHTML = ''; hist.forEach((h, i) => { const li = document.createElement('li'); li.textContent = S(h).label; if (i === hist.length - 1) li.setAttribute('aria-current', 'step'); tr.append(li); });
    $('step-live').textContent = st.label;
    for (const v of Object.values(media)) if (v.pause) v.pause();
    const m = load(id); if (m && m.play) m.play().catch(() => {});
    out(id).forEach((e) => load(e.to));
  }
  function take(step) { stopPlay(); hist.push(step.to); moveToken(step, () => {}); show(); }
  function open() {
    document.body.classList.add('stepping'); $('stepper').hidden = false; marks.hidden = false; $('step-open').setAttribute('aria-expanded', 'true');
    hist = [startState()]; const first = Ch.STEPS[0]; moveToken(first); show(); $('step-now').focus();
    cancelAnimationFrame(raf); raf = requestAnimationFrame(drawScope);
  }
  function close() { stopPlay(); document.body.classList.remove('stepping'); $('stepper').hidden = true; marks.hidden = true; $('step-open').setAttribute('aria-expanded', 'false'); cancelAnimationFrame(raf); for (const v of Object.values(media)) if (v.pause) v.pause(); $('step-open').focus(); }
  function stopPlay() { if (playing) { clearTimeout(playing); playing = null; $('step-play').textContent = 'Play'; $('step-play').setAttribute('aria-pressed', 'false'); } }
  function play() {
    if (playing) return stopPlay();
    $('step-play').textContent = 'Pause'; $('step-play').setAttribute('aria-pressed', 'true');
    const next = () => {
      const moves = out(hist[hist.length - 1]).filter((m) => m.to !== hist[hist.length - 1]);
      if (!moves.length) return stopPlay();
      const m = moves.find((x) => x.kind === 'gold') || moves.find((x) => x.kind === 'red') || moves[0];
      hist.push(m.to); moveToken(m); show(); playing = setTimeout(next, 3200);
    };
    playing = setTimeout(next, 300);
  }
  // the microscope: the real frame for this state, drifting a little under the lens, with a drawn crosshair of dust
  function drawScope(now) {
    const cv = $('step-cell'), g = cv.getContext('2d'), size = Math.round(cv.clientWidth * (devicePixelRatio || 1));
    if (cv.width !== size) { cv.width = size; cv.height = size; }
    const id = hist[hist.length - 1]; g.fillStyle = '#0c0a09'; g.fillRect(0, 0, size, size);
    const m = id && load(id), ready = m && (m.videoWidth || (m.complete && m.naturalWidth));
    if (ready) {
      const w = m.videoWidth || m.naturalWidth, h = m.videoHeight || m.naturalHeight, k = size / Math.min(w, h) * 1.12;
      const dx = Math.sin(now / 4100) * size * 0.015, dy = Math.cos(now / 5300) * size * 0.012;
      g.save(); g.filter = id === 'frozen' ? 'saturate(0.9)' : 'none'; g.drawImage(m, (size - w * k) / 2 + dx, (size - h * k) / 2 + dy, w * k, h * k); g.restore();
    } else if (id === 'killed' || id === 'lost') {
      const R = Kit.rng(id + Math.floor(now / 90)); for (let i = 0; i < 260; i++) { g.fillStyle = `rgba(200,200,200,${R() * 0.25})`; g.fillRect(R() * size, R() * size, size / 60, size / 60); }
      g.fillStyle = '#c4453a'; g.font = `700 ${size / 9}px "Kevin Sans"`; g.textAlign = 'center'; g.fillText(id === 'killed' ? 'no index' : 'unreadable', size / 2, size / 2 + size / 30);
    }
    raf = requestAnimationFrame(drawScope);
  }
  $('step-open').addEventListener('click', open);
  $('step-close').addEventListener('click', close);
  $('step-back').addEventListener('click', () => { stopPlay(); if (hist.length > 1) { hist.pop(); show(); route.style.opacity = 0; const st = S(hist[hist.length - 1]); token.setAttribute('transform', `translate(${st.x} ${st.y + st.h / 2})`); } });
  $('step-again').addEventListener('click', () => { stopPlay(); hist = [startState()]; moveToken(Ch.STEPS[0]); show(); });
  $('step-play').addEventListener('click', play);
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('stepper').hidden) close(); });
})();
