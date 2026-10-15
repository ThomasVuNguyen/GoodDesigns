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
})();
