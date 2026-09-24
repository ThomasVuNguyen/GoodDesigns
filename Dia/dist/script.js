(() => {
  const mobileToggle = document.querySelector('header button[aria-label="Open menu"]');
  const mobileNav = [...document.querySelectorAll('header nav')].find((nav) => nav.className.includes('flex-grow'));
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const open = mobileToggle.getAttribute('aria-expanded') !== 'true';
      mobileToggle.setAttribute('aria-expanded', String(open));
      mobileToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      mobileToggle.classList.toggle('is-open', open);
      mobileToggle.querySelector('.local-menu-glyph').textContent = open ? '×' : '+';
      mobileToggle.style.position = 'relative';
      mobileToggle.style.zIndex = '20';
      mobileNav.style.opacity = open ? '1' : '0';
      mobileNav.style.height = open ? 'auto' : '0px';
      mobileNav.style.pointerEvents = open ? 'auto' : 'none';
      mobileNav.style.marginTop = open ? '52px' : '0';
      mobileNav.style.zIndex = '10';
    });
    mobileNav.addEventListener('click', (event) => {
      if (event.target.closest('a')) mobileToggle.click();
    });
  }

  const storyButtons = [...document.querySelectorAll('main button')].filter((button) => /^0[1-3]$/.test(button.querySelector('span')?.textContent?.trim() || button.textContent.trim().slice(0, 2)));
  storyButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      storyButtons.forEach((other, otherIndex) => {
        const selected = index === otherIndex;
        other.setAttribute('aria-pressed', String(selected));
        other.classList.toggle('bg-primary/[0.06]', selected);
        other.classList.toggle('bg-transparent', !selected);
        const expandable = other.querySelector('.grid.overflow-hidden');
        if (expandable) {
          expandable.style.gridTemplateRows = selected ? '1fr' : '0fr';
          expandable.style.opacity = selected ? '1' : '0';
        }
      });
    });
  });

  // Give the trailer affordance a local, keyboard-dismissible preview using its captured poster.
  const trailerButton = [...document.querySelectorAll('button')].find((button) => /Watch the trailer video/i.test(button.textContent));
  const heroPoster = document.querySelector('main video[poster]')?.getAttribute('poster');
  if (trailerButton && heroPoster) {
    trailerButton.addEventListener('click', () => {
      const shade = document.createElement('div');
      shade.className = 'dialog-shade';
      shade.setAttribute('role', 'presentation');
      shade.innerHTML = `<div class="dialog-card" role="dialog" aria-modal="true" aria-label="Watch the trailer"><button class="dialog-close" type="button" aria-label="Close trailer">×</button><img src="${heroPoster}" alt="Dia browser trailer preview"></div>`;
      document.body.append(shade);
      document.body.classList.add('dialog-open');
      const close = () => { shade.remove(); document.body.classList.remove('dialog-open'); trailerButton.focus(); };
      shade.querySelector('.dialog-close').addEventListener('click', close);
      shade.addEventListener('click', (event) => { if (event.target === shade) close(); });
      document.addEventListener('keydown', function onKey(event) { if (event.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); } }, { once: true });
    });
  }
})();
