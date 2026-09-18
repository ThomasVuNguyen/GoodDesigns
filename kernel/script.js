/* ================================================================
   KERNEL.SH CLONE — JavaScript Interactions
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ── Sticky header shadow on scroll ─────────────────────────
  const header = document.getElementById('site-header');
  
  const handleScroll = () => {
    if (window.scrollY > 200) {
      header.style.boxShadow = '0 1px 0 rgba(0,0,0,0.06)';
    } else {
      header.style.boxShadow = 'none';
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ── Benchmark tab switching ────────────────────────────────
  const benchTabs = document.querySelectorAll('.bench-tab');
  
  const coldStartData = [
    { label: 'browser use', value: '8.2s', width: '100%', highlight: false },
    { label: 'browserbase', value: '3.1s', width: '55%', highlight: false },
    { label: 'kernel', value: '0.9s', width: '22%', highlight: true },
  ];

  const throughputData = [
    { label: 'browser use', value: '3.61 actions/sec', width: '55%', highlight: false },
    { label: 'browserbase', value: '4.00 actions/sec', width: '68%', highlight: false },
    { label: 'kernel', value: '6.43 actions/sec', width: '100%', highlight: true },
  ];

  benchTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      benchTabs.forEach(t => t.classList.remove('bench-tab--active'));
      tab.classList.add('bench-tab--active');

      const isColdStart = tab.textContent.trim() === 'cold start';
      const data = isColdStart ? coldStartData : throughputData;

      const barsContainer = document.querySelector('.benchmark-bars');
      const bars = barsContainer.querySelectorAll('.bench-bar');

      bars.forEach((bar, i) => {
        const d = data[i];
        bar.querySelector('.bench-bar-label').textContent = d.label;
        bar.querySelector('.bench-bar-value').textContent = d.value;
        
        // Animate width
        bar.style.transition = 'width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        bar.style.width = d.width;
        
        if (d.highlight) {
          bar.classList.add('bench-bar--highlight');
          bar.classList.remove('bench-bar--small', 'bench-bar--medium');
          bar.classList.add('bench-bar--large');
        } else {
          bar.classList.remove('bench-bar--highlight', 'bench-bar--large');
          if (i === 0) {
            bar.classList.add('bench-bar--small');
          } else {
            bar.classList.add('bench-bar--medium');
          }
        }
      });
    });
  });

  // ── Solution tab highlighting ──────────────────────────────
  const solTabs = document.querySelectorAll('.sol-tab');
  
  solTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      solTabs.forEach(t => {
        t.style.background = '';
        t.style.fontWeight = '';
      });
      tab.style.background = 'rgba(0,0,0,0.04)';
      tab.style.fontWeight = '500';
    });
  });

  // ── Scroll-based reveal animations ─────────────────────────
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealElements = document.querySelectorAll(
    '.feature-card, .customer-card, .friend-card, .benchmark-card, .customer-story'
  );

  // Set initial state
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation delay
        const delay = Array.from(revealElements).indexOf(entry.target) % 4 * 100;
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));

  // ── Copy prompt button ─────────────────────────────────────
  const copyBtn = document.querySelector('.prompt-copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const span = copyBtn.querySelector('span');
      const originalText = span.textContent;
      span.textContent = 'copied!';
      setTimeout(() => {
        span.textContent = originalText;
      }, 2000);
    });
  }

  // ── Smooth scroll for nav links ────────────────────────────
  document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#') {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});
