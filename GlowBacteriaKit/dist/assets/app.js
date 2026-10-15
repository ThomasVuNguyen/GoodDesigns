// Remembers ticked steps and the results notes in this browser only.
(() => {
  const KEY = 'glow-kit-protocol:v1';
  let state = {};
  try {
    state = JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {}

  const save = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {}
  };

  const checks = document.querySelectorAll('.check');
  checks.forEach((box) => {
    box.checked = Boolean(state[box.id]);
    box.addEventListener('change', () => {
      state[box.id] = box.checked;
      save();
    });
  });

  const notes = document.getElementById('record');
  if (notes) {
    notes.value = state.notes || '';
    notes.addEventListener('input', () => {
      state.notes = notes.value;
      save();
    });
  }

  // When the pages fill the screen, hide the home button while scrolling down
  // so it never sits over the page for long; it returns on any scroll up.
  const home = document.querySelector('.home');
  const page = document.querySelector('.page');
  if (home && page) {
    let lastY = scrollY;
    addEventListener('scroll', () => {
      const y = scrollY;
      const crowded = page.getBoundingClientRect().left < home.getBoundingClientRect().right + 12;
      home.classList.toggle('is-hidden', crowded && y > lastY && y > 60);
      lastY = y;
    }, { passive: true });
  }
})();
