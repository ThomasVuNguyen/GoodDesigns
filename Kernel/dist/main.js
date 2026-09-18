/* ========== KERNEL CLONE — INTERACTIONS ========== */

document.addEventListener('DOMContentLoaded', () => {
  // ---- MOBILE MENU ----
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // ---- DROPDOWN NAVIGATION ----
  const dropdownBtns = document.querySelectorAll('[data-dropdown]');
  dropdownBtns.forEach(btn => {
    const panelId = 'dropdown-' + btn.dataset.dropdown;
    const panel = document.getElementById(panelId);
    if (!panel) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = panel.classList.contains('open');
      // Close all dropdowns first
      document.querySelectorAll('.dropdown-panel').forEach(p => p.classList.remove('open'));
      document.querySelectorAll('[data-dropdown]').forEach(b => b.setAttribute('aria-expanded', 'false'));
      if (!isOpen) {
        panel.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-panel').forEach(p => p.classList.remove('open'));
    document.querySelectorAll('[data-dropdown]').forEach(b => b.setAttribute('aria-expanded', 'false'));
  });

  // ---- PRODUCTS DRAG SCROLL ----
  const productsScroll = document.getElementById('products-scroll');
  if (productsScroll) {
    let isDown = false;
    let startX;
    let scrollLeft;

    productsScroll.addEventListener('mousedown', (e) => {
      isDown = true;
      productsScroll.classList.add('dragging');
      startX = e.pageX - productsScroll.offsetLeft;
      scrollLeft = productsScroll.scrollLeft;
    });

    productsScroll.addEventListener('mouseleave', () => {
      isDown = false;
      productsScroll.classList.remove('dragging');
    });

    productsScroll.addEventListener('mouseup', () => {
      isDown = false;
      productsScroll.classList.remove('dragging');
    });

    productsScroll.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - productsScroll.offsetLeft;
      const walk = (x - startX) * 1.5;
      productsScroll.scrollLeft = scrollLeft - walk;
    });
  }

  // ---- BENCHMARK TABS ----
  const benchTabs = document.querySelectorAll('.bench-tab');
  const benchBars = document.getElementById('bench-bars');
  const benchDesc = document.getElementById('bench-description');
  const benchLink = document.getElementById('bench-link');

  const benchData = {
    throughput: {
      description: 'per-action speed inside a running session, measured by computesdk.',
      link: 'https://www.computesdk.com/benchmarks/browsers/browser-throughput/',
      bars: [
        { name: 'browser use', value: '3.61 actions/sec', width: '56.14%', type: 'transparent' },
        { name: 'browserbase', value: '4.00 actions/sec', width: '62.21%', type: 'muted' },
        { name: 'kernel', value: '6.43 actions/sec', width: '100%', type: 'green' }
      ]
    },
    coldstart: {
      description: 'time to first browser ready, measured by computesdk.',
      link: 'https://www.computesdk.com/benchmarks/browsers/browser-cold-start/',
      bars: [
        { name: 'browserbase', value: '7.87s', width: '100%', type: 'muted' },
        { name: 'browser use', value: '5.46s', width: '69.38%', type: 'transparent' },
        { name: 'kernel', value: '0.03s', width: '0.38%', type: 'green' }
      ]
    }
  };

  benchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      benchTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-pressed', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-pressed', 'true');

      const key = tab.dataset.bench;
      const data = benchData[key];
      if (!data || !benchBars || !benchDesc || !benchLink) return;

      benchDesc.textContent = data.description;
      benchLink.href = data.link;

      benchBars.innerHTML = data.bars.map(bar => `
        <div class="bar-row">
          <div class="bar-fill bar-${bar.type}" style="width: ${bar.width}"></div>
          <div class="bar-text" style="width: ${bar.width}">
            <span class="body-02">${bar.name}</span>
            <span class="body-02">${bar.value}</span>
          </div>
        </div>
      `).join('');
    });
  });

  // ---- SOLUTIONS TABS ----
  const solutionTabs = document.querySelectorAll('.solutions-tab');
  solutionTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      solutionTabs.forEach(t => {
        t.classList.remove('active');
        t.querySelector('span').className = '';
      });
      tab.classList.add('active');
      tab.querySelector('span').className = 'underlined';
    });
  });

  // ---- COPY PROMPT BUTTON ----
  const copyBtn = document.getElementById('copy-prompt-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        const res = await fetch('/prompt.md');
        const text = await res.text();
        await navigator.clipboard.writeText(text);
        const label = copyBtn.querySelector('.cta-label-text');
        if (label) {
          const orig = label.textContent;
          label.textContent = 'copied!';
          setTimeout(() => { label.textContent = orig; }, 2000);
        }
      } catch {
        // Fallback — open the URL
        window.open('/prompt.md', '_blank');
      }
    });
  }
});
