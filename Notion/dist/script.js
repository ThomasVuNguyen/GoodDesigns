const triggers = [...document.querySelectorAll(".nav-trigger")];
const dropdowns = [...document.querySelectorAll(".nav-dropdown")];
const mobileButton = document.querySelector(".mobile-menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const heroWord = document.querySelector("#hero-word");
const heroPill = document.querySelector(".ship-pill");
const heroStates = [
  { word: "Ship", background: "#d0f4d8", dot: "#1aae39" },
  { word: "Create", background: "#ffdec4", dot: "#ff6d00" },
  { word: "Build", background: "#ffe4af", dot: "#ffb110" },
  { word: "Jam", background: "#eadbfa", dot: "#9849e8" },
  { word: "Scale", background: "#bde6e4", dot: "#27918d" },
  { word: "Think", background: "#e6f3fe", dot: "#097fe8" },
];
let heroStateIndex = 0;

function closeDropdowns() {
  triggers.forEach((trigger) => trigger.setAttribute("aria-expanded", "false"));
  dropdowns.forEach((dropdown) => dropdown.classList.remove("is-open"));
}

triggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    const target = document.querySelector(`[data-dropdown="${trigger.dataset.menu}"]`);
    const shouldOpen = !target.classList.contains("is-open");
    closeDropdowns();
    if (shouldOpen) {
      trigger.setAttribute("aria-expanded", "true");
      target.classList.add("is-open");
    }
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav-dropdown")) closeDropdowns();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDropdowns();
});

mobileButton.addEventListener("click", () => {
  const open = !mobileMenu.classList.contains("is-open");
  mobileButton.setAttribute("aria-expanded", String(open));
  mobileMenu.setAttribute("aria-hidden", String(!open));
  mobileMenu.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
});

mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  mobileButton.setAttribute("aria-expanded", "false");
  mobileMenu.setAttribute("aria-hidden", "true");
  mobileMenu.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}));

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.setInterval(() => {
    heroWord.classList.add("is-changing");
    window.setTimeout(() => {
      heroStateIndex = (heroStateIndex + 1) % heroStates.length;
      const state = heroStates[heroStateIndex];
      heroWord.textContent = state.word;
      heroPill.style.backgroundColor = state.background;
      heroPill.querySelector("i").style.backgroundColor = state.dot;
      heroWord.classList.remove("is-changing");
      heroWord.style.animation = "none";
      void heroWord.offsetWidth;
      heroWord.style.animation = "";
    }, 220);
  }, 2600);
}
