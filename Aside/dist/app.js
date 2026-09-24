(() => {
  document.querySelectorAll('[style*="opacity:0"]').forEach((node) => {
    node.style.opacity = '1';
    node.style.transform = 'none';
  });

  const nav = document.querySelector('nav');
  const menuButton = nav?.querySelector('[aria-label="Open menu"]');
  const navList = nav?.querySelector('ul');

  const destinations = {
    Features: [
      ['Browser agent', '#browser-agent'],
      ['Password Manager', '#password-manager'],
      ['Memory', '#memory'],
    ],
    'Use cases': [
      ['Operations', 'https://aside.com/use-cases/operations'],
      ['Hiring Teams', 'https://aside.com/use-cases/hiring-teams'],
      ['Sales', 'https://aside.com/use-cases/sales'],
      ['Developers', 'https://aside.com/use-cases/developers'],
      ['Researchers', 'https://aside.com/use-cases/researchers'],
    ],
    Resources: [
      ['Blog', 'https://aside.com/blog'],
      ['Changelog', 'https://docs.aside.com/changelog/components'],
      ['Docs', 'https://docs.aside.com'],
      ['Community', 'https://discord.com'],
    ],
  };

  for (const [label, id] of [
    ['Anything you do in a browser', 'browser-agent'],
    ['Memory that knows what you’re working on.', 'memory'],
    ['Password that', 'password-manager'],
  ]) {
    const heading = [...document.querySelectorAll('h2, h3')].find((node) =>
      node.textContent.includes(label),
    );
    heading?.closest('section, article, [data-section]')?.setAttribute('id', id);
    if (heading && !heading.closest('section, article, [data-section]')) heading.id = id;
  }

  const closePopover = () => {
    nav?.querySelector('.aside-popover')?.remove();
    nav?.querySelectorAll('[data-slot="dropdown-menu-trigger"]').forEach((button) => {
      button.setAttribute('aria-expanded', 'false');
    });
  };

  nav?.querySelectorAll('[data-slot="dropdown-menu-trigger"]').forEach((button) => {
    button.addEventListener('click', () => {
      const label = button.textContent.trim();
      const wasOpen = button.getAttribute('aria-expanded') === 'true';
      closePopover();
      if (wasOpen) return;

      const popover = document.createElement('div');
      popover.className = 'aside-popover';
      popover.setAttribute('role', 'menu');
      for (const [text, href] of destinations[label] ?? []) {
        const link = document.createElement('a');
        link.textContent = text;
        link.href = href;
        link.setAttribute('role', 'menuitem');
        popover.append(link);
      }
      button.setAttribute('aria-expanded', 'true');
      nav.append(popover);
    });
  });

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    navList?.classList.toggle('aside-mobile-open', open);
  });

  document.addEventListener('click', (event) => {
    if (nav && !nav.contains(event.target)) closePopover();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closePopover();
      navList?.classList.remove('aside-mobile-open');
      menuButton?.setAttribute('aria-expanded', 'false');
      menuButton?.setAttribute('aria-label', 'Open menu');
    }
  });
})();
