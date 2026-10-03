// Dimensions from the appearance STEP; silicon from esp32/sdkconfig.defaults. Electronics and indicator color are illustrative.
export function createSpecCallouts(stage) {
  const overlay = document.createElement('section');
  overlay.className = 'specCallouts'; overlay.hidden = true;
  overlay.inert = true;
  overlay.setAttribute('aria-label', 'Home Link dimensions and hardware details');
  overlay.innerHTML = `<svg class="specLeaders" aria-hidden="true"><g><path/><circle r="2.5"/></g><g><path/><circle r="2.5"/></g><g><path/><circle r="2.5"/></g><g><path/><circle r="2.5"/></g></svg>
    <div class="specLabel specEnclosure"><span>01 / ENCLOSURE</span><strong>35 × 42 × 10 mm</strong><small>Overall dimensions</small></div>
    <div class="specLabel specIndicator"><span>02 / INDICATOR</span><strong>LED</strong><small>Pairing and device status</small></div>
    <div class="specLabel specConnector"><span>03 / CONNECTOR</span><strong>USB-C</strong><small>Connector</small></div>
    <div class="specLabel specChip"><span>04 / SILICON</span><strong>ESP32-C5</strong><small>RISC-V · 240 MHz</small><small>8 MB PSRAM · 8 MB flash</small><small>Wi-Fi 6 2.4/5 GHz · BLE 5</small></div>`;
  stage.append(overlay);
  const svg = overlay.querySelector('svg');
  const groups = [...svg.querySelectorAll('g')];
  const labels = [...overlay.querySelectorAll('.specLabel')];
  let active = false, latest = null, opacity = 0;
  function syncVisibility() {
    overlay.hidden = !active && opacity < .001;
    overlay.style.opacity = String(opacity);
    overlay.setAttribute('aria-hidden', String(!active));
  }
  function paint(points) {
    const bounds = stage.getBoundingClientRect(), canvas = stage.querySelector('[data-home-link-canvas]');
    if (!canvas || !bounds.width || !bounds.height || overlay.hidden) return;
    const rect = canvas.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${bounds.width} ${bounds.height}`);
    groups.forEach((group, i) => {
      const [x, y] = points[i] || [];
      const endX = rect.left - bounds.left + x * rect.width, endY = rect.top - bounds.top + y * rect.height;
      const visible = Number.isFinite(endX) && Number.isFinite(endY) && x >= 0 && x <= 1 && y >= 0 && y <= 1;
      labels[i].hidden = !visible; group.style.display = visible ? '' : 'none';
      if (!visible) return;
      // Keep the callout near its projected hardware point, rather than a stage edge.
      const box = labels[i];
      box.style.right = 'auto'; box.style.bottom = 'auto';
      const size = box.getBoundingClientRect();
      const clamp = (value, extent, limit) => Math.max(12, Math.min(value, limit - extent - 12));
      const leftSide = i === 0 || i === 3;
      const left = leftSide ? endX - size.width - (i === 3 ? 150 : 24) : endX + 24;
      const top = i === 0 ? endY - size.height / 2 : i === 1 ? endY - size.height - 18 : endY + 18;
      box.style.left = `${clamp(left, size.width, bounds.width)}px`;
      box.style.top = `${clamp(top, size.height, bounds.height)}px`;
      const label = labels[i].getBoundingClientRect();
      const startX = (leftSide ? label.right : label.left) - bounds.left;
      const startY = label.top - bounds.top + label.height / 2;
      const elbowX = startX + (leftSide ? 12 : -12);
      group.querySelector('path').setAttribute('d', `M${startX} ${startY}H${elbowX}L${endX} ${endY}`);
      group.querySelector('circle').setAttribute('cx', endX);
      group.querySelector('circle').setAttribute('cy', endY);
    });
  }
  const handleSpecPoints = event => {
    latest = event.detail;
    if (active || opacity > .001) paint(latest);
  };
  const handleScene = event => {
    opacity = Math.max(0, Math.min(1, Number(event.detail.specOpacity) || 0));
    syncVisibility();
    if (latest && !overlay.hidden) paint(latest);
  };
  stage.addEventListener('home-link-spec-points', handleSpecPoints);
  stage.addEventListener('home-link-scene', handleScene);

  function reset() {
    active = false;
    latest = null;
    opacity = 0;
    overlay.hidden = true;
    overlay.inert = true;
    overlay.style.opacity = '0';
    overlay.setAttribute('aria-hidden', 'true');
    groups.forEach(group => { group.style.display = 'none'; });
    labels.forEach(label => { label.hidden = true; });
  }

  return {
    show(enabled) {
      active = enabled;
      overlay.inert = !active;
      syncVisibility();
      if (latest && !overlay.hidden) paint(latest);
    },
    reset,
    dispose() {
      reset();
      stage.removeEventListener('home-link-spec-points', handleSpecPoints);
      stage.removeEventListener('home-link-scene', handleScene);
    },
  };
}
