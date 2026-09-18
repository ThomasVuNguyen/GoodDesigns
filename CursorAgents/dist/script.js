// Cursor Agents Clone - Interactive Behaviors

document.addEventListener('DOMContentLoaded', () => {
  // ===== Chat Input Auto-resize =====
  const chatInput = document.getElementById('chat-input');
  if (chatInput) {
    chatInput.addEventListener('input', () => {
      chatInput.style.height = 'auto';
      chatInput.style.height = Math.min(chatInput.scrollHeight, 200) + 'px';
    });

    // Focus on click of wrapper
    const wrapper = chatInput.closest('.chat-input-wrapper');
    if (wrapper) {
      wrapper.addEventListener('click', (e) => {
        if (e.target === wrapper || e.target.classList.contains('chat-input-wrapper')) {
          chatInput.focus();
        }
      });
    }
  }

  // ===== Navigation Active State =====
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navItems.forEach(ni => ni.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // ===== Conversation Card Click =====
  const cards = document.querySelectorAll('.conversation-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      // Remove previous selection
      cards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });

  // ===== Suggestion Chips =====
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.querySelector('span').textContent;
      if (chatInput) {
        chatInput.value = text;
        chatInput.focus();
        chatInput.dispatchEvent(new Event('input'));
      }
    });
  });

  // ===== Model Selector Dropdown Toggle =====
  const modelSelector = document.getElementById('model-selector');
  if (modelSelector) {
    modelSelector.addEventListener('click', () => {
      modelSelector.classList.toggle('open');
    });
  }

  // ===== Mode Dropdown Toggle =====
  const modeDropdown = document.getElementById('mode-dropdown');
  if (modeDropdown) {
    modeDropdown.addEventListener('click', () => {
      modeDropdown.classList.toggle('open');
    });
  }

  // ===== Mic Button Animation =====
  const micBtn = document.getElementById('mic-btn');
  if (micBtn) {
    let isRecording = false;
    micBtn.addEventListener('click', () => {
      isRecording = !isRecording;
      micBtn.classList.toggle('recording', isRecording);
      if (isRecording) {
        micBtn.style.background = '#e53935';
      } else {
        micBtn.style.background = '';
      }
    });
  }

  // ===== Try Grok Bot Button =====
  const tryGrokBtn = document.getElementById('try-grok-btn');
  if (tryGrokBtn) {
    tryGrokBtn.addEventListener('click', () => {
      tryGrokBtn.classList.toggle('active');
    });
  }

  // ===== Keyboard Shortcuts =====
  document.addEventListener('keydown', (e) => {
    // Cmd/Ctrl + K to focus search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (chatInput) chatInput.focus();
    }

    // Escape to blur
    if (e.key === 'Escape') {
      document.activeElement.blur();
    }
  });

  // ===== Close dropdowns on outside click =====
  document.addEventListener('click', (e) => {
    if (modelSelector && !modelSelector.contains(e.target)) {
      modelSelector.classList.remove('open');
    }
    if (modeDropdown && !modeDropdown.contains(e.target)) {
      modeDropdown.classList.remove('open');
    }
  });

  // ===== Mobile sidebar toggle =====
  const sidebar = document.getElementById('sidebar');
  // Could add a hamburger menu button for mobile in the future
  
  // ===== Smooth scroll behavior for main content =====
  const mainScroll = document.querySelector('.main-scroll-area');
  if (mainScroll) {
    mainScroll.style.scrollBehavior = 'smooth';
  }
});
