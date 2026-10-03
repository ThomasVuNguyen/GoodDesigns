// A small CAD-style HUD; the scene, packet motion, and playback live in WebGL.
export function createExplorePanel(stage) {
  const panel = document.createElement('section');
  panel.className = 'explorePanel';
  panel.hidden = true;
  panel.inert = true;
  panel.setAttribute('aria-label', 'How Muse Home Link works');
  panel.innerHTML = `
    <div class="exploreSceneLabels" aria-hidden="true"></div>`;
  stage.append(panel);
  if (!document.querySelector('link[data-home-link-explore-style]')) {
    const css = document.createElement('link');
    css.rel = 'stylesheet'; css.href = new URL('./viewer-explore.css', import.meta.url).href; css.dataset.homeLinkExploreStyle = '';
    document.head.append(css);
  }
  const labelsContainer = panel.querySelector('.exploreSceneLabels');
  const labelElements = new Map();
  let mode = null;
  let disposed = false;
  let state = { labels: [], playing: true, networkOpacity: 0 };

  function paint() {
    const opacity = Math.max(0, Math.min(1, Number(state.networkOpacity) || 0));
    panel.hidden = !mode && opacity < .001;
    panel.style.opacity = String(opacity);
    if (panel.hidden) return;

    const bounds = stage.getBoundingClientRect();
    const canvas = stage.querySelector('[data-home-link-canvas]');
    if (!canvas || !bounds.width || !bounds.height) return;
    const rect = canvas.getBoundingClientRect();
    const seen = new Set();
    for (const item of state.labels || []) {
      if (!item || item.id == null) continue;
      const id = String(item.id); seen.add(id);
      let label = labelElements.get(id);
      if (!label) {
        label = document.createElement('span'); label.className = 'exploreSceneLabel'; label.inert = true;
        labelsContainer.append(label); labelElements.set(id, label);
      }
      if (label.textContent !== item.text) label.textContent = item.text || id;
      const x = rect.left - bounds.left + item.x * rect.width;
      const y = rect.top - bounds.top + item.y * rect.height;
      const visible = Number.isFinite(x) && Number.isFinite(y) && item.x >= 0 && item.x <= 1 && item.y >= 0 && item.y <= 1 && x >= 5 && x <= bounds.width - 5 && y >= 12 && y <= bounds.height - 30;
      label.hidden = !visible;
      if (visible) {
        label.style.left = `${x}px`; label.style.top = `${y}px`;
        const labelWidth = label.getBoundingClientRect().width;
        let edge = 'center';
        if (labelWidth > 0 && x - labelWidth / 2 < 5) edge = 'left';
        else if (labelWidth > 0 && x + labelWidth / 2 > bounds.width - 5) edge = 'right';
        if (label.dataset.edge !== edge) label.dataset.edge = edge;
      }
    }
    labelElements.forEach((label, id) => { if (!seen.has(id)) label.hidden = true; });
    const staggered = new Set();
    for (const row of [['cloud', 'router', 'bridge'], ['lamp', 'sensor', 'audio']]) {
      const labels = row.map(id => labelElements.get(id)).filter(label => label && !label.hidden);
      if (labels.length !== 3) continue;
      const boxes = labels.map(label => {
        const x = Number.parseFloat(label.style.left);
        const width = label.getBoundingClientRect().width;
        if (label.dataset.edge === 'left') return { left: x, right: x + width };
        if (label.dataset.edge === 'right') return { left: x - width, right: x };
        return { left: x - width / 2, right: x + width / 2 };
      });
      if (boxes[0].right + 2 > boxes[1].left || boxes[1].right + 2 > boxes[2].left) {
        staggered.add(row[1]);
      }
    }
    labelElements.forEach((label, id) => {
      if (staggered.has(id)) {
        if (label.dataset.stagger !== 'true') label.dataset.stagger = 'true';
      } else if (label.dataset.stagger) delete label.dataset.stagger;
    });
  }
  const handleScene = event => {
    state = { ...state, ...event.detail };
    paint();
  };
  stage.addEventListener('home-link-scene', handleScene);
  const repaintAfterFonts = () => { if (!disposed) paint(); };
  document.fonts?.ready.then(repaintAfterFonts);
  document.fonts?.addEventListener?.('loadingdone', repaintAfterFonts);

  function reset() {
    mode = null;
    state = { labels: [], playing: false, networkOpacity: 0 };
    panel.hidden = true;
    panel.inert = true;
    panel.style.opacity = '0';
    panel.setAttribute('aria-hidden', 'true');
    labelsContainer.replaceChildren();
    labelElements.clear();
  }

  return {
    show(next) {
      mode = next === 'connections' ? next : null;
      panel.inert = !mode;
      panel.setAttribute('aria-hidden', String(!mode));
      if (mode) {
        panel.dataset.mode = mode;
      }
      paint();
    },
    reset,
    dispose() {
      disposed = true;
      reset();
      stage.removeEventListener('home-link-scene', handleScene);
      document.fonts?.removeEventListener?.('loadingdone', repaintAfterFonts);
    },
  };
}
