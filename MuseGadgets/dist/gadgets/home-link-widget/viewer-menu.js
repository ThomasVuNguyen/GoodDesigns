import { getRenderSettings, setRenderSettings } from './viewer.js';
import { createExplorePanel } from './viewer-explore.js';
import { createSpecCallouts } from './viewer-specs.js';
const stage = document.querySelector('.hardwareStage');
if (stage) {
  const menu = document.createElement('div');
  menu.className = 'cadMenu';
  menu.innerHTML = `<div class="cadViews" role="group" aria-label="Explore Home Link">
      <button type="button" data-view="solid"><span class="cadViewLabel">Device</span></button>
      <button type="button" data-view="wireframe" title="Illustrative electronics schematic; the CAD models enclosure and connector details only"><span class="cadViewLabel">What’s inside</span></button>
      <button type="button" data-view="connections"><span class="cadViewLabel">Connection</span></button>
      <span class="cadViewIndicator" aria-hidden="true" hidden></span>
    </div>
    <div class="cadViewerStatus" role="status" aria-live="polite">
      <span data-viewer-status></span>
      <button type="button" data-viewer-retry hidden>Reload preview</button>
    </div>`;
  stage.append(menu);
  const scene = stage.querySelector('.viewerScene');
  const exploration = createExplorePanel(scene);
  const specSheet = createSpecCallouts(scene);
  const viewButtons = [...menu.querySelectorAll('[data-view]')];
  const viewRow = menu.querySelector('.cadViews');
  const viewIndicator = menu.querySelector('.cadViewIndicator');
  let disposed = false;
  const status = menu.querySelector('.cadViewerStatus');
  const statusText = menu.querySelector('[data-viewer-status]');
  const retryButton = menu.querySelector('[data-viewer-retry]');
  stage.append(status);
  function setText(element, value) {
    if (element.textContent !== value) element.textContent = value;
  }

  function positionViewIndicator(animate = true) {
    if (disposed) return;
    const selected = viewButtons.find(button => button.getAttribute('aria-pressed') === 'true' && !button.disabled);
    if (!selected) {
      viewIndicator.hidden = true;
      viewRow.removeAttribute('data-indicator-ready');
      return;
    }
    const row = viewRow.getBoundingClientRect();
    const label = selected.querySelector('.cadViewLabel').getBoundingClientRect();
    if (!label.width || !label.height) return;
    // Keep layout/font changes immediate; only a mode change gets the spring.
    viewIndicator.toggleAttribute('data-animated', animate && !viewIndicator.hidden);
    viewIndicator.style.width = `${label.width}px`;
    viewIndicator.style.transform = `translate3d(${label.left - row.left}px, ${label.bottom - row.top + 2}px, 0)`;
    viewIndicator.hidden = false;
    viewRow.setAttribute('data-indicator-ready', '');
  }

  function showUnavailable(state) {
    delete stage.dataset.displayMode;
    menu.dataset.unavailable = state;
    viewButtons.forEach(button => {
      button.disabled = true;
      button.setAttribute('aria-pressed', 'false');
    });
    positionViewIndicator(false);
    exploration.reset();
    specSheet.reset();
    status.hidden = state !== 'error';
    retryButton.hidden = state !== 'error';
    setText(statusText, state === 'error' ? 'Interactive preview unavailable. Static preview shown.' : '');
  }

  function sync() {
    const viewerState = stage.querySelector('[data-home-link-viewer]')?.dataset.viewerState || 'loading';
    if (viewerState === 'loading' || viewerState === 'error') {
      showUnavailable(viewerState);
      return;
    }
    delete menu.dataset.unavailable;
    status.hidden = true;
    retryButton.hidden = true;
    const settings = getRenderSettings();
    stage.dataset.displayMode = settings.viewMode;
    viewButtons.forEach(button => {
      button.disabled = false;
      const selected = button.dataset.view === settings.viewMode;
      button.setAttribute('aria-pressed', String(selected));
    });
    positionViewIndicator();
    exploration.show(settings.viewMode);
    specSheet.show(settings.viewMode === 'wireframe');
  }

  viewButtons.forEach(button => button.addEventListener('click', () => {
    setRenderSettings({ viewMode: button.dataset.view });
  }));
  retryButton.addEventListener('click', () => { window.location.reload(); });
  window.addEventListener('home-link-render-settings', sync);
  const stateObserver = new MutationObserver(sync);
  const replacementObserver = new MutationObserver(() => {
    const viewer = scene.querySelector('[data-home-link-viewer]');
    if (!viewer) return;
    replacementObserver.disconnect();
    stateObserver.observe(viewer, {
      attributes: true,
      attributeFilter: ['data-viewer-state'],
    });
    sync();
  });
  const initialViewer = scene.querySelector('[data-home-link-viewer]');
  if (initialViewer) {
    stateObserver.observe(initialViewer, {
      attributes: true,
      attributeFilter: ['data-viewer-state'],
    });
  }
  sync();
  const viewResizeObserver = new ResizeObserver(() => positionViewIndicator(false));
  viewResizeObserver.observe(viewRow);
  viewButtons.forEach(button => viewResizeObserver.observe(button.querySelector('.cadViewLabel')));
  document.fonts.ready.then(() => positionViewIndicator(false));
  if (!initialViewer) {
    replacementObserver.observe(scene, { childList: true, subtree: true });
  }
  const handlePageHide = event => {
    if (event.persisted) return;
    disposed = true;
    viewResizeObserver.disconnect();
    stateObserver.disconnect();
    replacementObserver.disconnect();
    window.removeEventListener('home-link-render-settings', sync);
    exploration.dispose();
    specSheet.dispose();
    window.removeEventListener('pagehide', handlePageHide);
  };
  window.addEventListener('pagehide', handlePageHide);
}
