// Interactions for the Dia Lately page, replacing the source site's Next.js + framer-motion runtime.
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('[data-local-header]');

  // ---- Mobile menu: the pill grows to the viewport height, links blur in one after another.
  const pill = header?.querySelector('.site-nav-pill[class*="800:hidden"]');
  const toggle = header?.querySelector('button[aria-controls="mobile-navigation-menu"]');
  const menu = document.getElementById('mobile-navigation-menu');
  if (pill && toggle && menu) {
    const items = [...menu.querySelectorAll(':scope > ul > li, :scope > div > *')];
    const icon = toggle.querySelector('svg');
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      pill.classList.toggle('is-open', open);
      pill.style.height = open ? 'calc(100svh - 20px)' : '52px';
      menu.style.height = open ? 'auto' : '0px';
      menu.style.opacity = open ? '1' : '0';
      menu.classList.toggle('pointer-events-none', !open);
      if (icon) icon.style.transform = open ? 'rotate(45deg)' : 'none';
      items.forEach((item, i) => {
        item.style.transitionDelay = open ? `${0.4 + i * 0.05}s` : '0s';
        item.style.opacity = open ? '1' : '0';
        item.style.filter = open ? 'blur(0px)' : 'blur(5px)';
      });
      document.documentElement.classList.toggle('local-menu-open', open);
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (event) => { if (event.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); } });
    window.matchMedia('(min-width: 800px)').addEventListener('change', (q) => { if (q.matches) setOpen(false); });

    // "Watch the trailer video": the trailer is not part of this page, so show its poster from the local homepage capture.
    const trailer = menu.querySelector('button[title="Watch the trailer video"]');
    trailer?.addEventListener('click', () => {
      setOpen(false);
      const shade = document.createElement('div');
      shade.className = 'local-dialog-shade';
      shade.setAttribute('role', 'dialog');
      shade.setAttribute('aria-modal', 'true');
      shade.setAttribute('aria-label', 'Dia trailer');
      shade.innerHTML = '<div class="local-dialog-card"><button type="button" class="local-dialog-close" aria-label="Close trailer">×</button><img src="../assets/poster-hero.webp" alt="Dia trailer poster"></div>';
      const close = () => { shade.remove(); document.removeEventListener('keydown', onKey); trailer.focus(); };
      const onKey = (event) => { if (event.key === 'Escape') close(); };
      shade.addEventListener('click', (event) => { if (event.target === shade || event.target.closest('.local-dialog-close')) close(); });
      document.addEventListener('keydown', onKey);
      document.body.append(shade);
      shade.querySelector('.local-dialog-close').focus();
    });
  }

  // ---- Desktop "Download Dia" pill: appears once the page has scrolled past one viewport.
  const download = document.querySelector('[data-download-pill]');
  if (download) {
    const update = () => download.classList.toggle('is-shown', window.scrollY > window.innerHeight);
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
  }

  // ---- Bottom "The Dia Lately / Changelog" switcher slides away while the footer is on screen.
  const bar = document.querySelector('[data-whats-new-bar]');
  const footer = document.querySelector('footer');
  if (bar && footer && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => bar.toggleAttribute('data-hidden', entry.isIntersecting)).observe(footer);
  }

  // ---- Past Issues: arrow buttons page the scroll-snap row one card at a time.
  const rail = document.querySelector('ul.snap-x');
  const prev = document.querySelector('button[aria-label="Earlier issues"]');
  const next = document.querySelector('button[aria-label="More issues"]');
  if (rail && prev && next) {
    const step = () => {
      const cards = rail.children;
      if (cards.length < 2) return rail.clientWidth;
      return cards[1].getBoundingClientRect().left - cards[0].getBoundingClientRect().left;
    };
    const sync = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      prev.disabled = rail.scrollLeft <= 1;
      next.disabled = rail.scrollLeft >= max - 1;
    };
    prev.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: reduceMotion ? 'auto' : 'smooth' }));
    next.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: reduceMotion ? 'auto' : 'smooth' }));
    rail.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync, { passive: true });
    sync();
  }

  // ---- Fade-in for the blocks the source revealed on view (closing notes and footer).
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const targets = [...document.querySelectorAll('[data-reveal]')].filter((el) => el.getBoundingClientRect().top > window.innerHeight);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        io.unobserve(entry.target);
      });
    });
    targets.forEach((el) => { el.classList.add('local-reveal'); io.observe(el); });
  }

  // Autoplay can be refused before the first interaction; retry once the video is visible.
  document.querySelectorAll('video[autoplay]').forEach((video) => {
    video.muted = true;
    const play = () => video.play().catch(() => {});
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : video.pause())).observe(video);
    } else play();
  });
})();
