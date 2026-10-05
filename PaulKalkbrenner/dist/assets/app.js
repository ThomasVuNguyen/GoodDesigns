const albums = {
  2025: {
    label: "2025 / LP",
    title: "The Essence",
    description: "An intimate collection shaped across years of studio work and late-night listening. Warm analog textures meet patient melodies in a record made to feel personal and expansive at once.",
  },
  2018: {
    label: "2018 / LP",
    title: "Parts of Life",
    description: "A melodic journey through reflective moments and widescreen club tracks, carrying the atmosphere of the studio into a room full of people.",
  },
  2015: {
    label: "2015 / LP",
    title: "7",
    description: "Seven chapters of electronic music, moving between bright hooks, deep grooves and the patient pulse of a long set.",
  },
};

const films = [
  { title: "Studio Session — Cronitis Boy", duration: "04:10", image: 0, id: "vWlNPNPkk1c", credit: "Live and studio films<br />A collection of moving images" },
  { title: "Dreaming On", duration: "03:50", image: 1, id: "2xP1xhbqG_4", credit: "A film about memory, movement<br />and the spaces in between" },
  { title: "Que Ce Soit Clair", duration: "02:54", image: 2, id: "YQM7DKi11ho", credit: "Paul Kalkbrenner with Stromae<br />An official music film" },
  { title: "Ninety-Two", duration: "04:59", image: 3, id: "qbXSXDv6gWU", credit: "A new frame for a familiar sound<br />Visualized in motion" },
  { title: "Kabelmann II", duration: "04:21", image: 4, id: "yNFUb79MF1I", credit: "A two-part short film<br />The story continues" },
  { title: "Kabelmann I", duration: "04:31", image: 5, id: "BaxLTiSRw4U", credit: "A two-part short film<br />The beginning" },
  { title: "Schwer", duration: "03:35", image: 6, id: "Le5AGYxPCLI", credit: "An official music film<br />A study in rhythm and weight" },
  { title: "Graf Zahl", duration: "05:36", image: 8, id: "X-J6TAdvvC4", credit: "An animated world<br />A visual collaboration" },
];

const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  siteNav.classList.toggle("is-open", open);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a") && window.matchMedia("(max-width: 700px)").matches) {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
    siteNav.classList.remove("is-open");
  }
});

document.querySelectorAll(".album-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const album = albums[tab.dataset.album];
    document.querySelectorAll(".album-tab").forEach((item) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });
    document.querySelector(".album-copy").setAttribute("aria-labelledby", tab.id);
    document.querySelector(".album-year").textContent = album.label;
    document.querySelector("#records-title").textContent = album.title;
    document.querySelector(".album-description").textContent = album.description;
  });
});

const galleryCards = [...document.querySelectorAll(".gallery-card")];
const galleryIndex = document.querySelector("#gallery-index");
let activeGallery = 0;

function drawGallery() {
  const imageOrder = Array.from({ length: 8 }, (_, offset) => (activeGallery + offset) % 9);
  galleryCards.forEach((card, index) => {
    const imageIndex = imageOrder[index];
    card.className = `gallery-card photo-cell photo-${imageIndex}${index === 4 ? " is-current" : ""}`;
    card.setAttribute("aria-label", `Gallery image ${activeGallery + 1} of 8`);
  });
  galleryIndex.textContent = String(activeGallery + 1).padStart(2, "0");
}

document.querySelector("#gallery-next").addEventListener("click", () => {
  activeGallery = (activeGallery + 1) % 8;
  drawGallery();
});
document.querySelector("#gallery-prev").addEventListener("click", () => {
  activeGallery = (activeGallery + 7) % 8;
  drawGallery();
});

function chooseFilm(index) {
  const film = films[index];
  document.querySelector("#video-index").textContent = String(index + 1).padStart(2, "0");
  document.querySelector("#video-title").textContent = film.title;
  document.querySelector("#video-credit").innerHTML = film.credit;
  const preview = document.querySelector("#video-link");
  preview.className = `video-preview photo-cell photo-${film.image}`;
  preview.href = `https://www.youtube.com/watch?v=${film.id}`;
  preview.setAttribute("aria-label", `Open ${film.title} on YouTube`);
  document.querySelectorAll(".video-thumb").forEach((button) => button.classList.toggle("is-active", Number(button.dataset.video) === index));
}

document.querySelectorAll(".video-thumb").forEach((button) => {
  button.addEventListener("click", () => chooseFilm(Number(button.dataset.video)));
});

const newsletterForm = document.querySelector("#newsletter-form");
const formMessage = document.querySelector("#form-message");
newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.querySelector("#newsletter-email").value.trim();
  const phone = document.querySelector("#newsletter-phone").value.trim();
  if (!email && !phone) {
    formMessage.dataset.state = "error";
    formMessage.textContent = "Please enter an email address or phone number.";
    return;
  }
  if (email && !document.querySelector("#newsletter-email").validity.valid) {
    formMessage.dataset.state = "error";
    formMessage.textContent = "Please check the email address and try again.";
    return;
  }
  formMessage.dataset.state = "success";
  formMessage.textContent = "Thanks — your local preview is complete.";
  newsletterForm.reset();
});

let audioContext;
let droneNodes = [];
document.querySelector(".sound-toggle").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  const turnOn = button.getAttribute("aria-pressed") !== "true";
  if (turnOn) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioContext ||= new AudioContextClass();
      await audioContext.resume();
      const gain = audioContext.createGain();
      gain.gain.value = 0.012;
      gain.connect(audioContext.destination);
      [110, 164.81, 220].forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator();
        oscillator.type = index === 1 ? "triangle" : "sine";
        oscillator.frequency.value = frequency;
        oscillator.connect(gain);
        oscillator.start();
        droneNodes.push(oscillator);
      });
      droneNodes.push(gain);
    }
  } else {
    droneNodes.forEach((node) => {
      if (typeof node.stop === "function") node.stop();
      if (typeof node.disconnect === "function") node.disconnect();
    });
    droneNodes = [];
  }
  button.setAttribute("aria-pressed", String(turnOn));
  document.querySelector(".sound-state").textContent = turnOn ? "Sound ON" : "Sound OFF";
});

drawGallery();
