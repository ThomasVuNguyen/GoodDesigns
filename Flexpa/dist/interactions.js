(() => {
  const flexpa = (path) => path.startsWith("http") ? path : "https://www.flexpa.com" + path;
  const productItems = [
    ["Consent", "Digital-native patient Consent SDK", "/consent", "/images/icons/cursor-icon.svg"],
    ["Records", "Real-time health records API", "/records", "/images/icons/files-icon.svg"],
    ["Network", "3-in-1 network for patient access", "/network", "/images/icons/globe-icon.svg"],
    ["SMART Health Links", "FHIR-native data sharing via QR codes", "/smart-health-cards", "/images/icons/qr-code-icon.svg"],
    ["App for Patients", "Get your own health records fast", "/app", "/images/icons/patient-icon.svg"],
    ["Health Tools for Agents", "Find health tools for any agent", "/agents", "/images/icons/documentation-icon.svg"]
  ];
  const solutionItems = [
    ["Legal", "Streamline case record collection", "/solutions/legal", "/images/icons/legal-icon.svg"],
    ["Benefits Navigation", "Automate benefits verification", "/solutions/benefits-navigation", "/images/icons/benefits-icon.svg"],
    ["Clinical Research Org", "Accelerate trial participant screening", "/solutions/clinical-research", "/images/icons/clinical-icon.svg"],
    ["Payers", "Streamline payer operations", "/solutions/payers", "/images/icons/payers-icon.svg"],
    ["Providers", "Enhance Care Delivery", "/solutions/providers", "/images/icons/providers-icon.svg"]
  ];
  const resourceItems = [
    ["API Documentation", "Reference documentation", "https://www.flexpa.com/docs", "/images/icons/documentation-icon.svg"],
    ["Developer Portal", "Access the Flexpa Developer Portal", "https://portal.flexpa.com", "/images/icons/portal-icon.svg"],
    ["Data Access Comparison", "Compare claims sources", "/data-access-comparison", "/images/icons/getting-started-icon.svg"],
    ["Blog", "Our latest news", "/blog", "/images/icons/blog-icon.svg"]
  ];

  const itemMarkup = (item) =>
    '<a class="flex gap-5 p-2 rounded-lg transition-all duration-300 ease-out transform-gpu hover:bg-sage-50 hover:scale-[1.02] hover:-translate-y-[2px] hover:shadow-sm group" href="' + flexpa(item[2]) + '">' +
      '<div class="flex-shrink-0 w-12 h-12 bg-lime-300 rounded-lg flex items-center justify-center transition-transform duration-300 ease-out transform-gpu group-hover:scale-[1.05] relative overflow-hidden">' +
        '<img alt="" loading="eager" width="42" height="42" class="transition-transform duration-300 group-hover:scale-[1.05] relative z-10" src="' + item[3] + '">' +
      '</div><div class="flex flex-col"><span class="font-semibold text-lg leading-tight text-forest-900 transition-colors duration-300 group-hover:text-forest-800">' + item[0] +
      '</span><span class="text-sage-600 text-md leading-tight transition-colors duration-300 group-hover:text-sage-700">' + item[1] + '</span></div></a>';

  const panelMarkup = (title, items, width, rowMajor) =>
    '<div class="absolute left-0 right-0 top-full mt-1 dropdown-content" style="display:none">' +
      '<div class="relative"><div class="absolute left-1/2 -translate-x-1/2 w-[' + width + 'px] bg-white rounded-lg shadow-lg shadow-forest-300/45 z-50 overflow-hidden border border-forest-50">' +
        '<div class="p-8"><div class="flex flex-col gap-6"><h3 class="text-xl font-semibold text-sage-600">' + title + '</h3>' +
          (rowMajor
            ? '<div class="grid grid-cols-2 gap-x-8 gap-y-0.5">' + items.map(itemMarkup).join("") + '</div>'
            : '<div class="grid grid-cols-2 gap-x-8"><div class="flex flex-col gap-0.5">' + items.slice(0, Math.ceil(items.length / 2)).map(itemMarkup).join("") +
              '</div><div class="flex flex-col gap-0.5">' + items.slice(Math.ceil(items.length / 2)).map(itemMarkup).join("") + '</div></div>') +
        '</div></div></div></div></div>';

  const resourcePanelMarkup = () =>
    '<div class="absolute left-0 right-0 top-full mt-1 dropdown-content" style="display:none">' +
      '<div class="relative"><div class="absolute left-1/2 -translate-x-1/2 w-[840px] bg-white rounded-lg shadow-lg shadow-forest-300/45 z-50 overflow-hidden border border-forest-50">' +
        '<div class="p-8"><div class="grid grid-cols-2 gap-x-8"><h3 class="text-xl font-semibold text-sage-600">Resources</h3><h3 class="text-xl font-semibold text-sage-600">Featured</h3></div>' +
          '<div class="mt-6 grid grid-cols-2 gap-x-8"><div class="flex flex-col gap-0.5">' + resourceItems.map(itemMarkup).join("") + '</div>' +
            '<div class="flex flex-col"><a class="block transform-gpu" href="' + flexpa("/kill-the-clipboard") + '">' +
              '<div class="bg-forest-900 px-6 py-11 rounded-lg text-white relative overflow-hidden transition-all duration-500 ease-out transform-gpu group">' +
                '<div class="absolute inset-0 opacity-20 transition-all duration-500 group-hover:opacity-30"><img alt="" loading="eager" class="object-cover transform-gpu transition-transform duration-500 group-hover:scale-110" src="/images/blog/fallback.png" style="position:absolute;height:100%;width:100%;inset:0px"></div>' +
                '<div class="flex flex-col gap-2 relative z-10 transition-transform duration-500 transform-gpu group-hover:[transform:translate3d(0px,0px,10px)_scale(0.98)]">' +
                  '<span class="font-semibold text-2xl">Flexpa pledges to Kill the Clipboard as an early adopter of the CMS Aligned Network</span>' +
                  '<span class="font-semibold text-2xl text-lime-300 transition-colors duration-500 group-hover:text-lime-200">August 2025</span>' +
                '</div></div></a></div></div></div></div></div>';

  const nav = document.querySelector("nav");
  if (nav) {
    const buttons = [...nav.querySelectorAll("button")];
    const dropdowns = [
      ["Products", "Products", productItems, 840],
      ["Solutions", "By Company Type", solutionItems, 840, true]
    ];
    const menuStates = [];

    const closeDropdowns = () => {
      menuStates.forEach(({ button, panel }) => {
        panel.style.display = "none";
        button.setAttribute("aria-expanded", "false");
        button.classList.remove("bg-lime-300", "text-forest-900");
        button.classList.add("text-white");
        const caret = button.querySelector("img");
        if (caret) caret.classList.remove("rotate-180", "brightness-0");
      });
    };

    for (const [label, title, items, width, rowMajor] of dropdowns) {
      const button = buttons.find((candidate) => candidate.innerText.trim() === label);
      if (!button) continue;
      const holder = button.parentElement;
      holder.insertAdjacentHTML("beforeend", label === "Resources" ? resourcePanelMarkup() : panelMarkup(title, items, width, rowMajor));
      const panel = holder.querySelector(".dropdown-content");
      const state = { button, panel };
      menuStates.push(state);
      button.setAttribute("aria-expanded", "false");
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        const shouldOpen = panel.style.display === "none";
        closeDropdowns();
        if (shouldOpen) {
          panel.style.display = "block";
          button.setAttribute("aria-expanded", "true");
          button.classList.remove("text-white");
          button.classList.add("bg-lime-300", "text-forest-900");
          const caret = button.querySelector("img");
          if (caret) caret.classList.add("rotate-180", "brightness-0");
        }
      });
    }
    const resourcesButton = buttons.find((candidate) => candidate.innerText.trim() === "Resources");
    if (resourcesButton) {
      resourcesButton.parentElement.insertAdjacentHTML("beforeend", resourcePanelMarkup());
      const panel = resourcesButton.parentElement.querySelector(".dropdown-content");
      menuStates.push({ button: resourcesButton, panel });
      resourcesButton.setAttribute("aria-expanded", "false");
      resourcesButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const shouldOpen = panel.style.display === "none";
        closeDropdowns();
        if (shouldOpen) {
          panel.style.display = "block";
          resourcesButton.setAttribute("aria-expanded", "true");
          resourcesButton.classList.remove("text-white");
          resourcesButton.classList.add("bg-lime-300", "text-forest-900");
          const caret = resourcesButton.querySelector("img");
          if (caret) caret.classList.add("rotate-180", "brightness-0");
        }
      });
    }

    const mobileButton = buttons.find((candidate) => candidate.innerText.trim() === "Open main menu");
    if (mobileButton) {
      const mobilePanel = document.createElement("div");
      mobilePanel.className = "mobile-menu-panel";
      mobilePanel.hidden = true;
      const mobileGroup = (title, items) =>
        '<section class="mobile-menu-group"><h2>' + title + '</h2>' +
        items.map((item) =>
          '<a class="mobile-menu-item" href="' + flexpa(item[2]) + '"><span class="mobile-menu-icon"><img alt="" src="' + item[3] + '"></span>' +
          '<span><strong>' + item[0] + '</strong><small>' + item[1] + '</small></span></a>'
        ).join("") + '</section>';
      mobilePanel.innerHTML =
        mobileGroup("Products", productItems) +
        mobileGroup("Solutions", solutionItems) +
        mobileGroup("Resources", resourceItems) +
        '<div class="mobile-menu-links"><a href="' + flexpa("/app") + '">Try it yourself →</a><a href="' + flexpa("/kill-the-clipboard") + '">Kill The Clipboard</a><a href="' + flexpa("/pricing") + '">Pricing</a></div>';
      nav.append(mobilePanel);
      const originalToggle = mobileButton.innerHTML;
      const closeIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
      mobileButton.setAttribute("aria-expanded", "false");
      mobileButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const open = mobilePanel.hidden;
        mobilePanel.hidden = !open;
        mobileButton.setAttribute("aria-expanded", String(open));
        mobileButton.setAttribute("aria-label", open ? "Close main menu" : "Open main menu");
        mobileButton.innerHTML = open ? closeIcon : originalToggle;
      });
    }

    document.addEventListener("click", (event) => {
      if (!nav.contains(event.target)) closeDropdowns();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeDropdowns();
        if (mobileButton && mobileButton.getAttribute("aria-expanded") === "true") mobileButton.click();
      }
    });
  }

  const answers = {
    "Is it really free?": "Yes, completely free for patients. No costs, no subscriptions, no hidden fees. Your right to access your health data is protected by federal law under the CMS Patient Access Rule (CMS-9115), the ONC Cures Act Final Rule, and TEFCA Individual Access Services.",
    "How does it connect to my data?": "Flexpa connects to health plans, EHRs, and national exchanges using secure OAuth 2.0. You log in directly with your provider or insurer. We never see or store your credentials. Data flows through federally-mandated APIs like the Patient Access API, ONC-certified FHIR endpoints, and TEFCA exchanges.",
    "What data can I see and share?": "Medications, allergies, conditions, lab results, immunizations, procedures, visit history, insurance coverage, claims, and Explanations of Benefits. Whether it comes from your health plan, your doctor's EHR, or a national exchange, it all shows up in one place.",
    "Is my data safe?": "Absolutely. Your data is encrypted in transit and at rest. SMART Health Links are passcode-protected with expiration controls, and you can revoke access anytime. We are HIPAA compliant, SOC II certified, and signatories to the CARIN Code of Conduct.",
    "Is there a mobile app?": "Yes! Flexpa is on the App Store for iPhone and Google Play for Android. You can also use it in your browser on any device, no install required.",
    "Who is Flexpa?": "Flexpa is a health data interoperability company and TEFCA participant. We connect to health plans, EHR systems, and national exchanges so patients can access and share their records. This is our free, patient-facing portal built on the same infrastructure trusted by healthcare companies nationwide."
  };
  const faqButtons = [...document.querySelectorAll("button")].filter((button) => Object.hasOwn(answers, button.innerText.trim()));
  faqButtons.forEach((button) => {
    button.setAttribute("aria-expanded", "false");
    button.addEventListener("click", () => {
      const row = button.parentElement;
      const wasOpen = button.getAttribute("aria-expanded") === "true";
      faqButtons.forEach((other) => {
        other.setAttribute("aria-expanded", "false");
        other.parentElement.querySelector(".faq-answer")?.remove();
        const caret = other.querySelector("img");
        if (caret) caret.classList.remove("rotate-180");
      });
      if (!wasOpen) {
        const answer = document.createElement("div");
        answer.className = "faq-answer mt-4 text-lg text-gray-700 pr-8";
        answer.textContent = answers[button.innerText.trim()];
        row.append(answer);
        button.setAttribute("aria-expanded", "true");
        const caret = button.querySelector("img");
        if (caret) caret.classList.add("rotate-180");
      }
    });
  });

  document.querySelectorAll("img").forEach((image) => {
    image.loading = "eager";
  });
})();
