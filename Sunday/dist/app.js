const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const shell = document.querySelector("header > div");
const menuButton = document.getElementById("menu-button");
const scrim = document.getElementById("menu-scrim");
const toc = document.getElementById("toc-pill");
const hero = document.querySelector('[data-header-type="hero"]');
const heroClip = hero?.querySelector("[style*='entry-progress']");

function setMenu(open) {
  if (!shell || !menuButton) return;
  menuButton.setAttribute("aria-expanded", open ? "true" : "false");
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menuButton.classList.toggle("is-open", open);
  const bars = menuButton.querySelectorAll("span");
  if (open) {
    shell.style.width = "var(--menu-width-open)";
    shell.style.height = "auto";
    const height = shell.scrollHeight;
    shell.style.height = "60px";
    requestAnimationFrame(() => {
      shell.style.height = height + "px";
    });
    scrim?.classList.remove("invisible");
    scrim?.classList.add("is-open");
    bars.forEach((bar, index) => {
      bar.style.top = "50%";
      bar.style.bottom = "auto";
      bar.style.transform = `translateX(-50%) translateY(-50%) rotate(${index === 0 ? 45 : -45}deg)`;
    });
  } else {
    shell.style.width = "var(--menu-width-closed)";
    shell.style.height = "60px";
    scrim?.classList.remove("is-open");
    scrim?.classList.add("invisible");
    if (bars[0]) {
      bars[0].style.top = "42%";
      bars[0].style.bottom = "auto";
      bars[0].style.transform = "translateX(-50%) translateY(-50%)";
    }
    if (bars[1]) {
      bars[1].style.top = "auto";
      bars[1].style.bottom = "42%";
      bars[1].style.transform = "translateX(-50%) translateY(50%)";
    }
  }
}

menuButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});
scrim?.addEventListener("click", () => setMenu(false));

document.querySelectorAll("button[aria-controls]").forEach((button) => {
  button.addEventListener("click", () => {
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    if (!panel) return;
    const open = button.getAttribute("aria-expanded") === "true";
    const icon = button.querySelector("[aria-hidden]");
    if (open) {
      panel.style.height = "0px";
      panel.style.opacity = "0.6";
      button.setAttribute("aria-expanded", "false");
      if (icon) icon.style.transform = "none";
    } else {
      panel.style.height = "auto";
      const height = panel.scrollHeight;
      panel.style.height = "0px";
      requestAnimationFrame(() => {
        panel.style.height = height + "px";
        panel.style.opacity = "1";
      });
      button.setAttribute("aria-expanded", "true");
      if (icon) icon.style.transform = "rotate(180deg)";
    }
  });
});

function syncToc() {
  if (!toc) return;
  const show = window.scrollY > 500 && window.innerWidth >= 640;
  toc.style.transform = show ? "none" : "translateX(200%)";
  if (!toc.classList.contains("is-open")) toc.style.height = "130px";
  const sections = [...document.querySelectorAll("[data-toc-section]")];
  const dots = [...toc.querySelectorAll(".toc-indicators li")];
  const marker = window.scrollY + window.innerHeight * 0.35;
  let current = 0;
  sections.forEach((section, index) => {
    if (section.offsetTop <= marker) current = index;
  });
  dots.forEach((dot, index) => dot.classList.toggle("is-current", index === current));
}

toc?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    toc.classList.remove("is-open");
    toc.style.width = "var(--toc-width-closed)";
    toc.style.height = "130px";
    return;
  }
  const open = toc.classList.toggle("is-open");
  toc.style.width = open ? "min(420px, calc(100vw - 48px))" : "var(--toc-width-closed)";
  toc.style.height = open ? "auto" : "130px";
});

function syncHero() {
  if (!hero || !heroClip || !motionOk) return;
  const start = hero.offsetTop;
  const distance = Math.max(hero.offsetHeight - window.innerHeight, 1);
  const progress = Math.min(1, Math.max(0, (window.scrollY - start) / distance));
  heroClip.style.setProperty("--entry-progress", progress.toFixed(3));
  heroClip.style.setProperty("--exit-progress", Math.max(0, (progress - 0.55) / 0.45).toFixed(3));
}

function syncDesign() {
  const track = document.querySelector('[style*="--tx"]');
  if (!track || window.innerWidth < 1024) {
    if (track) track.style.setProperty("--tx", "0px");
    return;
  }
  const stage = track.closest(".sticky")?.parentElement;
  if (!stage) return;
  const extra = Math.max(0, track.scrollWidth - window.innerWidth + 48);
  stage.style.height = `calc(100vh + ${extra}px)`;
  const rect = stage.getBoundingClientRect();
  const total = stage.offsetHeight - window.innerHeight;
  const passed = Math.min(Math.max(-rect.top, 0), total);
  const progress = total ? passed / total : 0;
  track.style.setProperty("--tx", `${-extra * progress}px`);
}

document.querySelectorAll("media-controller").forEach((player) => {
  const video = player.querySelector("video");
  if (!video) return;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  const mark = () => player.classList.toggle("is-playing", !video.paused && video.readyState >= 2);
  video.addEventListener("play", mark);
  video.addEventListener("pause", mark);
  player.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  });
});

const videos = [...document.querySelectorAll("video")];
const videoWatcher = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (!motionOk) return;
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
  },
  { threshold: 0.35 },
);
videos.forEach((video) => videoWatcher.observe(video));

const hats = [
  ["Bucket hat", "For everyday use", "/assets/images/hat-bucket.jpg"],
  ["Headset", "For noisy conditions", "/assets/images/hat-headset.jpg"],
  ["Terrace Hat", "For extra style points", "/assets/images/hat-terrace.jpg"],
  ["Study Buddy", "For late school nights", "/assets/images/hat-study.jpg"],
];

const voteRoot = document.createElement("div");
voteRoot.id = "vote-overlay";
voteRoot.innerHTML = `
  <button id="vote-close" type="button" aria-label="Close poll">×</button>
  <div id="vote-stage">
    <div id="vote-copy"><h2>Memo wears many hats.</h2><p>Which should it wear next?</p></div>
    <div id="hat-rail"></div>
    <button id="vote-next" type="button" disabled>Select and continue</button>
  </div>`;
document.body.appendChild(voteRoot);
const rail = voteRoot.querySelector("#hat-rail");
hats.forEach(([title, subtitle, src]) => {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "hat-card";
  card.innerHTML = `<img alt="${title}" src="${src}"><strong>${title}</strong><span>${subtitle}</span>`;
  card.addEventListener("click", () => {
    rail.querySelectorAll(".hat-card").forEach((item) => item.classList.remove("is-selected"));
    card.classList.add("is-selected");
    voteRoot.querySelector("#vote-next").disabled = false;
  });
  rail.appendChild(card);
});

function closeVote() {
  voteRoot.classList.remove("is-open");
}
voteRoot.querySelector("#vote-close").addEventListener("click", closeVote);
voteRoot.querySelector("#vote-next").addEventListener("click", () => {
  const picked = rail.querySelector(".is-selected strong")?.textContent || "that hat";
  voteRoot.querySelector("#vote-copy").innerHTML =
    `<h2>Noted.</h2><p>Memo will try on the ${picked.toLowerCase()}.</p>`;
  voteRoot.querySelector("#vote-next").hidden = true;
});
document.querySelector("#vote-label")?.closest("button")?.addEventListener("click", () => {
  voteRoot.classList.add("is-open");
});

const subscribe = document.createElement("div");
subscribe.id = "subscribe-dialog";
subscribe.innerHTML = `
  <div id="subscribe-card" role="dialog" aria-labelledby="subscribe-title">
    <button id="subscribe-close" type="button" aria-label="Close">×</button>
    <h2 id="subscribe-title">Sign up to our newsletter</h2>
    <form>
      <input type="email" required placeholder="Email address" aria-label="Email address">
      <button type="submit">Subscribe</button>
    </form>
  </div>`;
document.body.appendChild(subscribe);
document.querySelector("#subscribe-label")?.closest("button")?.addEventListener("click", () => {
  subscribe.classList.add("is-open");
  subscribe.querySelector("input")?.focus();
});
subscribe.querySelector("#subscribe-close").addEventListener("click", () => subscribe.classList.remove("is-open"));
subscribe.addEventListener("click", (event) => {
  if (event.target === subscribe) subscribe.classList.remove("is-open");
});
subscribe.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  subscribe.querySelector("#subscribe-card").innerHTML =
    `<h2 id="subscribe-title">You're on the list.</h2><p class="label-1">This copy keeps the signup on this page.</p>`;
});

const dayCopy = {
  day: "The sun is out. The dishes can wait.",
  night: "Time to power down and rest, Memo's still on duty.",
};
function paintWeather() {
  const line = document.getElementById("weather-line");
  const pills = document.getElementById("weather-pills");
  if (!line || !pills) return;
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type) => parts.find((part) => part.type === type)?.value;
  const hour = Number(get("hour"));
  line.textContent = hour >= 19 || hour < 6 ? dayCopy.night : dayCopy.day;
  const date = `${get("weekday")}, ${get("month")} ${get("day")}`;
  pills.innerHTML = ["date", "place", "temp"]
    .map((key) => `<span data-pill="${key}"></span>`)
    .join("");
  pills.querySelector('[data-pill="date"]').textContent = date;
  pills.querySelector('[data-pill="place"]').textContent = "Redwood City, CA";
  pills.querySelector('[data-pill="temp"]').textContent = "☀ 71°F";
}
paintWeather();

function onScroll() {
  syncToc();
  syncHero();
  syncDesign();
}
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  setMenu(false);
  closeVote();
  subscribe.classList.remove("is-open");
  if (toc?.classList.contains("is-open")) {
    toc.classList.remove("is-open");
    toc.style.width = "var(--toc-width-closed)";
    toc.style.height = "130px";
  }
});
