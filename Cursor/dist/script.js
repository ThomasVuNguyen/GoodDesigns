/* ================================================================
   CURSOR.COM CLONE – Interactions
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Switcher ---
  const themeBtns = document.querySelectorAll('.theme-btn');
  themeBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      themeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // 0 = system, 1 = light, 2 = dark
      if (i === 2) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    });
  });

  // --- Copy CLI command ---
  const copyBtn = document.querySelector('.copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('curl https://cursor.com/install -fsS');
      copyBtn.textContent = '✅';
      setTimeout(() => { copyBtn.textContent = '📋'; }, 2000);
    });
  }

  // --- Smooth Reveal on Scroll ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(section);
  });

  // Add revealed class styles
  const style = document.createElement('style');
  style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);

  // --- Mobile Menu ---
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      // Simple mobile menu toggle placeholder
      alert('Mobile menu would open here');
    });
  }

  // --- Header scroll effect ---
  let lastScroll = 0;
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
      header.style.boxShadow = '0 1px 0 rgba(38,37,30,0.06)';
    } else {
      header.style.boxShadow = 'none';
    }
    lastScroll = currentScroll;
  }, { passive: true });
});
