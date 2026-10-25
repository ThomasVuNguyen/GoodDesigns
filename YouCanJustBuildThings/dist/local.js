/* Local static interactions for the cloned page */
(function () {
  'use strict';

  /* ── Mobile menu toggle ── */
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.getElementById('site-navigation');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
      nav.classList.toggle('open', !open);
      document.body.classList.toggle('menu-open', !open);
    });
  }

  /* ── Selection pill for nav and sort tabs ── */
  function movePill(container) {
    const active = container.querySelector('.active, [aria-current]');
    const pill = container.querySelector('.selection-pill');
    if (!active || !pill) return;
    const cRect = container.getBoundingClientRect();
    const aRect = active.getBoundingClientRect();
    pill.style.left = (aRect.left - cRect.left) + 'px';
    pill.style.top = (aRect.top - cRect.top) + 'px';
    pill.style.width = aRect.width + 'px';
    pill.style.height = aRect.height + 'px';
  }

  document.querySelectorAll('.has-selection-pill').forEach(movePill);
  window.addEventListener('resize', () => {
    document.querySelectorAll('.has-selection-pill').forEach(movePill);
  });

  /* ── Sort tabs (top/newest) — just visual, no API ── */
  document.querySelectorAll('.tabs a[data-sort]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      link.closest('.tabs').querySelectorAll('a').forEach(a => {
        a.classList.remove('active');
        a.removeAttribute('aria-current');
      });
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
      movePill(link.closest('.tabs'));
    });
  });

  /* ── Upvote buttons (local only, no persistence) ── */
  document.querySelectorAll('button.vote').forEach(btn => {
    btn.addEventListener('click', () => {
      const pressed = btn.getAttribute('aria-pressed') === 'true';
      btn.setAttribute('aria-pressed', String(!pressed));
      btn.classList.toggle('voted', !pressed);
      const span = btn.querySelector('span');
      if (span) {
        const n = parseInt(span.textContent, 10) || 0;
        span.textContent = pressed ? n - 1 : n + 1;
      }
    });
  });

  /* ── Card navigation (click row → navigate to link) ── */
  document.querySelectorAll('[data-card-navigation]').forEach(row => {
    row.addEventListener('click', e => {
      if (e.target.closest('a, button')) return;
      const link = row.querySelector('[data-card-link]');
      if (link) window.open(link.href, '_self');
    });
    row.style.cursor = 'pointer';
  });

  /* ── Search bar (filter projects locally) ── */
  const searchForm = document.getElementById('search');
  const queryInput = document.getElementById('query');
  if (searchForm && queryInput) {
    searchForm.addEventListener('submit', e => e.preventDefault());
    queryInput.addEventListener('input', () => {
      const q = queryInput.value.toLowerCase().trim();
      document.querySelectorAll('.project-row').forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = !q || text.includes(q) ? '' : 'none';
      });
      const visible = document.querySelectorAll('.project-row:not([style*="display: none"])').length;
      const status = document.querySelector('#results [role="status"]');
      if (status) status.textContent = `Showing ${visible} projects.`;
    });
  }

  /* ── Filters toggle ── */
  const filtersToggle = document.querySelector('[data-toggle-filters]');
  const filtersPanel = document.getElementById('project-filters');
  if (filtersToggle && filtersPanel) {
    filtersToggle.addEventListener('click', () => {
      const open = filtersToggle.getAttribute('aria-expanded') === 'true';
      filtersToggle.setAttribute('aria-expanded', String(!open));
      filtersPanel.classList.toggle('open', !open);
    });
  }

  /* ── Hero device image hover parallax (simplified) ── */
  const scene = document.getElementById('hardware-scene');
  if (scene) {
    const devices = scene.querySelectorAll('.hero-static-device img');
    scene.addEventListener('mousemove', e => {
      const rect = scene.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      devices.forEach((d, i) => {
        const factor = 6 + i * 4;
        d.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    });
    scene.addEventListener('mouseleave', () => {
      devices.forEach(d => { d.style.transform = ''; });
    });
  }

  /* ── Smooth scroll to #projects ── */
  document.querySelectorAll('a[href="#projects"], a[href="/#projects"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById('projects');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();
