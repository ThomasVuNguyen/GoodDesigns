(() => {
  let context;
  let voices = [];
  let master;

  const startAmbientTone = async () => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return false;
    if (!context) context = new AudioContextClass();
    if (context.state === "suspended") await context.resume();
    if (!master) {
      master = context.createGain();
      master.gain.value = 0.0001;
      master.connect(context.destination);
      for (const frequency of [110, 164.81]) {
        const oscillator = context.createOscillator();
        const voice = context.createGain();
        oscillator.type = "sine";
        oscillator.frequency.value = frequency;
        voice.gain.value = 0.45;
        oscillator.connect(voice).connect(master);
        oscillator.start();
        voices.push(oscillator);
      }
    }
    master.gain.cancelScheduledValues(context.currentTime);
    master.gain.setTargetAtTime(0.018, context.currentTime, 0.35);
    return true;
  };

  const stopAmbientTone = () => {
    if (!context || !master) return;
    master.gain.cancelScheduledValues(context.currentTime);
    master.gain.setTargetAtTime(0.0001, context.currentTime, 0.12);
    const oldVoices = voices;
    voices = [];
    window.setTimeout(() => {
      for (const voice of oldVoices) {
        try { voice.stop(); } catch {}
      }
      master?.disconnect();
      master = null;
    }, 450);
  };

  const updateTopNavigation = () => {
    document.documentElement.toggleAttribute("data-local-at-top", window.scrollY < 2);
  };
  window.addEventListener("scroll", updateTopNavigation, { passive: true });
  window.addEventListener("pageshow", updateTopNavigation);
  window.addEventListener("load", updateTopNavigation);
  updateTopNavigation();

  document.addEventListener("click", async (event) => {
    const video = event.target.closest(".archive-inner__main-visual[data-watch-video]");
    if (video) {
      event.preventDefault();
      event.stopImmediatePropagation();
      window.open(video.dataset.watchVideo, "_blank", "noopener,noreferrer");
      return;
    }

    const sound = event.target.closest(".sound-button__wrap");
    if (sound) {
      event.preventDefault();
      const on = sound.dataset.localSound !== "on";
      sound.dataset.localSound = on ? "on" : "off";
      sound.dataset.soundActive = String(on);
      sound.setAttribute("aria-pressed", String(on));
      if (on) {
        const available = await startAmbientTone();
        if (!available) { sound.dataset.localSound = "off"; sound.dataset.soundActive = "false"; sound.setAttribute("aria-pressed", "false"); }
      } else stopAmbientTone();
      return;
    }

    const placeholder = event.target.closest('a[href="#recordings"]');
    if (placeholder?.matches(".button")) event.preventDefault();
  }, true);

  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.closest(".newsletter, .footer")) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    for (const input of form.querySelectorAll("input")) input.value = "";
    const wrapper = form.closest(".w-form");
    const success = wrapper?.querySelector(".w-form-done");
    const failure = wrapper?.querySelector(".w-form-fail");
    if (success) { form.hidden = true; success.style.display = "block"; }
    if (failure) failure.style.display = "none";
  }, true);
})();
