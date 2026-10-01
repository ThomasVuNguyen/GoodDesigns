/* Small local equivalents for controls that fal.ai fills during hydration. */
(() => {
  const base = 'https://fal.ai';
  const link = (label, path, className = '') =>
    `<a class="${className}" href="${path.startsWith('http') ? path : base + path}">${label}</a>`;

  const announcementClose = document.querySelector('button[aria-label="Dismiss announcement"]');
  const desktopHeader = document.querySelector('.navbar');
  const mobileHeader = document.querySelector('.mobile-navbar');
  const desktopSales = [...(desktopHeader?.querySelectorAll('a') || [])]
    .find((anchor) => anchor.textContent.trim() === 'Contact Sales');
  const hero = document.querySelector('h1')?.closest('.bg-brand-sky');
  const footer = document.querySelector('footer');
  const enterpriseHeading = [...document.querySelectorAll('h2')]
    .find((heading) => heading.textContent.includes('Built for enterprise scale'));
  const enterpriseBlock = enterpriseHeading?.parentElement?.parentElement?.parentElement;
  const updateHeader = () => {
    if (desktopHeader) desktopHeader.style.top = announcementClose?.isConnected && scrollY < 32 ? '32px' : '0px';
    const darkBounds = enterpriseBlock?.getBoundingClientRect();
    const overDark = !!darkBounds && darkBounds.top <= 60 && darkBounds.bottom >= 0;
    for (const header of [desktopHeader, mobileHeader]) {
      if (!header) continue;
      header.style.setProperty('--landing-nav-foreground', overDark ? '#fff' : '#0D0B00');
      header.style.color = overDark ? '#fff' : '#0D0B00';
    }
    if (desktopSales) {
      const heroEnd = hero?.getBoundingClientRect().bottom ?? 880;
      const footerStart = footer?.getBoundingClientRect().top ?? Infinity;
      desktopSales.style.backgroundColor = heroEnd > 67 || footerStart < 67 ? '#fff' : '#99edff';
    }
  };
  announcementClose?.addEventListener('click', () => {
    announcementClose.parentElement?.parentElement?.remove();
    updateHeader();
  });
  addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  const desktopMenus = {
    Products: [
      ['Model APIs', '/models'],
      ['Serverless', '/serverless'],
      ['Compute', 'https://fal.ai/docs/documentation/compute'],
    ],
    Resources: [
      ['Blog', 'https://blog.fal.ai'],
      ['Learn', '/learn'],
      ['Gen Media Report Vol. 2', '/gen-media-report-volume-2'],
      ['Events', '/events'],
      ['Grants', '/grants'],
      ['Careers', '/careers'],
    ],
  };
  let openDesktop = null;
  function closeDesktop() {
    openDesktop?.menu.remove();
    openDesktop?.button.setAttribute('aria-expanded', 'false');
    openDesktop = null;
  }
  for (const button of document.querySelectorAll('nav[aria-label="Main navigation"] button')) {
    const label = button.textContent.trim();
    if (!desktopMenus[label]) continue;
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      if (openDesktop?.button === button) return closeDesktop();
      closeDesktop();
      const menu = document.createElement('div');
      menu.className = 'fal-dropdown';
      menu.setAttribute('role', 'menu');
      menu.innerHTML = desktopMenus[label].map(([text, href]) => link(text, href)).join('');
      button.parentElement.append(menu);
      button.setAttribute('aria-expanded', 'true');
      openDesktop = { button, menu };
    });
  }
  document.addEventListener('click', (event) => {
    if (openDesktop && !openDesktop.button.parentElement.contains(event.target)) closeDesktop();
  });

  const mobileToggle = document.querySelector('button[aria-label="Open navigation menu"]');
  let mobileBackdrop = null;
  let mobilePanel = null;
  let mobileClose = null;
  function closeMobile() {
    mobileBackdrop?.remove();
    mobilePanel?.remove();
    mobileClose?.remove();
    mobileBackdrop = mobilePanel = null;
    mobileClose = null;
    document.body.classList.remove('fal-mobile-open');
    mobileToggle?.setAttribute('aria-label', 'Open navigation menu');
    mobileToggle?.setAttribute('aria-expanded', 'false');
  }
  function openMobile() {
    closeDesktop();
    mobileBackdrop = document.createElement('div');
    mobileBackdrop.className = 'fal-mobile-backdrop';
    mobileBackdrop.addEventListener('click', closeMobile);
    mobilePanel = document.createElement('div');
    mobilePanel.className = 'fal-mobile-panel';
    mobilePanel.innerHTML = `
      <nav aria-label="Mobile navigation">
        <div class="fal-menu-heading">Products</div>
        ${link('Model APIs', '/models', 'fal-menu-item fal-menu-dot')}
        ${link('Serverless', '/serverless', 'fal-menu-item fal-menu-dot')}
        ${link('Compute', 'https://fal.ai/docs/documentation/compute', 'fal-menu-item fal-menu-dot')}
        ${link('Documentation', 'https://fal.ai/docs/documentation')}
        ${link('Pricing', '/pricing')}
        ${link('Enterprise', '/enterprise')}
        <div class="fal-menu-heading">Resources</div>
        ${link('Blog', 'https://blog.fal.ai', 'fal-menu-item fal-menu-dot')}
        ${link('Learn', '/learn', 'fal-menu-item fal-menu-dot')}
        ${link('Gen Media Report Vol. 2', '/gen-media-report-volume-2', 'fal-menu-item fal-menu-dot')}
        ${link('Events', '/events', 'fal-menu-item fal-menu-dot')}
        ${link('Grants', '/grants', 'fal-menu-item fal-menu-dot')}
        ${link('Careers', '/careers', 'fal-menu-item fal-menu-dot')}
      </nav>
      <div class="fal-menu-actions">
        ${link('Login', '/login')}
        ${link('Contact Sales', '/enterprise#contact-sales')}
      </div>`;
    mobileClose = document.createElement('button');
    mobileClose.type = 'button';
    mobileClose.className = 'fal-mobile-close';
    mobileClose.setAttribute('aria-label', 'Close navigation menu');
    mobileClose.addEventListener('click', closeMobile);
    document.body.append(mobileBackdrop, mobilePanel, mobileClose);
    document.body.classList.add('fal-mobile-open');
    mobileToggle.setAttribute('aria-label', 'Close navigation menu');
    mobileToggle.setAttribute('aria-expanded', 'true');
  }
  mobileToggle?.addEventListener('click', () => mobilePanel ? closeMobile() : openMobile());
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDesktop();
      closeMobile();
      document.querySelector('.fal-privacy-dialog')?.remove();
    }
  });

  const privacy = [...document.querySelectorAll('button')]
    .find((button) => button.textContent.includes('Your Privacy Choices'));
  privacy?.addEventListener('click', () => {
    document.querySelector('.fal-privacy-dialog')?.remove();
    const dialog = document.createElement('section');
    dialog.className = 'fal-privacy-dialog';
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-label', 'Your Privacy Choices');
    dialog.innerHTML = `<h2>Your Privacy Choices</h2>
      <p>We use cookies and other tracking technologies, and allow our advertising partners to use similar technologies. You can opt out of cookie-based sales, sharing, or targeted advertising.</p>
      <p>Your choice is saved in this browser.</p>
      <button type="button" data-choice="accept">Accept All</button>
      <button type="button" data-choice="reject">Reject All</button>`;
    dialog.addEventListener('click', (event) => {
      if (event.target.closest('[data-choice]')) dialog.remove();
    });
    document.body.append(dialog);
    dialog.querySelector('button')?.focus();
  });

  // The reference uses three tiny animated canvases in the hero. Draw a
  // restrained local pixel pattern in the same locations and color family.
  const canvases = [...document.querySelectorAll('canvas')].slice(0, 3);
  const dimensions = [[10, 20], [8, 8], [10, 10]];
  let randomState = 0x5f172b;
  const random = () => {
    randomState = (Math.imul(randomState, 1664525) + 1013904223) >>> 0;
    return randomState / 0x100000000;
  };
  for (const [index, canvas] of canvases.entries()) {
    const [width, height] = dimensions[index];
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (!context) continue;
    const cells = Array.from({ length: width * height }, () => false);
    for (let cluster = 0; cluster < Math.ceil(width * height / 30); cluster++) {
      let x = Math.floor(random() * width);
      let y = Math.floor(random() * height);
      for (let step = 0; step < 4 + Math.floor(random() * 6); step++) {
        cells[y * width + x] = true;
        const direction = Math.floor(random() * 4);
        x = Math.max(0, Math.min(width - 1, x + (direction === 0 ? 1 : direction === 1 ? -1 : 0)));
        y = Math.max(0, Math.min(height - 1, y + (direction === 2 ? 1 : direction === 3 ? -1 : 0)));
      }
    }
    for (let position = 0; position < cells.length; position++) {
      if (random() < 0.16) cells[position] = true;
    }
    const paint = () => {
      context.clearRect(0, 0, width, height);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (!cells[y * width + x]) continue;
          context.fillStyle = (x * 7 + y * 3 + index) % 43 === 0 ? '#ffff52' : '#a379f7';
          context.fillRect(x, y, 1, 1);
        }
      }
    };
    paint();
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInterval(() => {
        const position = Math.floor(random() * cells.length);
        cells[position] = !cells[position];
        paint();
      }, 900 + index * 170);
    }
  }
})();
