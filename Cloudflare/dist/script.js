/* ============================================
   CLOUDFLARE HOMEPAGE CLONE — script.js
   Handles: header scroll, mobile nav, stat counters,
   scroll-reveal animations
   ============================================ */

(function () {
  'use strict';

  // ── Header scroll state ────────────────────
  const header = document.getElementById('site-header');
  let lastScroll = 0;

  function onScroll() {
    const y = window.scrollY;
    if (y > 32) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
    lastScroll = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Mobile menu toggle ─────────────────────
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileBtn.classList.toggle('active');
      mobileNav.classList.toggle('open', isOpen);
      mobileNav.setAttribute('aria-hidden', String(!isOpen));
      mobileBtn.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('.mobile-nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileBtn.classList.remove('active');
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
        mobileBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Stat counter animation ─────────────────
  function animateCounter(el, target) {
    const duration = 2000;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statNumbers = document.querySelectorAll('.stat__number[data-count]');
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.count, 10);
          animateCounter(entry.target, target);
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  statNumbers.forEach((el) => statObserver.observe(el));

  // ── Scroll-reveal (fade-in-up) ─────────────
  const revealTargets = [
    '.section-header',
    '.product-category',
    '.solution-card',
    '.testimonial-card',
    '.dev-card',
    '.cta-card',
  ];
  const revealSelector = revealTargets.join(',');
  const revealEls = document.querySelectorAll(revealSelector);

  // Add class for CSS transition
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealEls.forEach((el) => el.classList.add('fade-in-up'));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger children within grid parents
            const parent = entry.target.parentElement;
            if (parent) {
              const siblings = Array.from(parent.children).filter((c) =>
                c.classList.contains('fade-in-up')
              );
              const idx = siblings.indexOf(entry.target);
              entry.target.style.transitionDelay = `${idx * 80}ms`;
            }
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  // ── Smooth scroll for anchor links ─────────
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
