// Submits Webflow-authored forms (tagged data-bridge by the converter) to the
// site's own API routes instead of Webflow's form endpoint, then toggles the
// same .w-form-done / .w-form-fail blocks webflow.js would.
(function () {
  var first = function (form, selector) {
    var el = form.querySelector(selector);
    return el ? el.value.trim() : "";
  };
  var byName = function (form, name) {
    var el = form.elements.namedItem(name);
    return el && "value" in el ? el.value.trim() : "";
  };
  // gclid, li_fat_id and posthog_distinct_id, installed by
  // src/webflow/components/PostHogTracking.tsx.
  var attribution = function () {
    return typeof window.blacksmithFormAttribution === "function"
      ? window.blacksmithFormAttribution()
      : {};
  };

  var bridges = {
    newsletter: {
      url: "/api/newsletter",
      body: function (form) {
        return { email: first(form, 'input[type="email"]') };
      },
    },
    sandbox: {
      url: "/api/newsletter",
      body: function (form) {
        return { email: first(form, 'input[type="email"]'), list: "sandbox" };
      },
    },
    contact: {
      url: "/api/contact",
      body: function (form) {
        return {
          firstName: byName(form, "First-Name"),
          lastName: byName(form, "Last-Name"),
          workEmail: byName(form, "Work-Email"),
          company: byName(form, "Company-Name"),
          message: byName(form, "More-Details"),
          attribution: attribution(),
        };
      },
    },
    startups: {
      url: "/api/application-startups",
      body: function (form) {
        return {
          name: byName(form, "name"),
          email: byName(form, "email"),
          githubOrg: byName(form, "GitHub-Org-Name"),
        };
      },
    },
    oss: {
      url: "/api/application-oss",
      body: function (form) {
        return {
          name: byName(form, "name"),
          email: byName(form, "email"),
          reason: byName(form, "notes"),
          githubUrl: byName(form, "gitHubOrgName"),
        };
      },
    },
  };

  // Bot trap the API routes reject when filled (same as the current site's
  // forms): visually hidden and out of the tab order.
  var HONEYPOT = "website";

  // Mirrors src/lib/posthog/events.ts, which turns it into a PostHog event.
  var submitted = function (name, success) {
    document.dispatchEvent(
      new CustomEvent("marketing:form-submitted", {
        detail: { form: name, success: success },
      }),
    );
  };
  document.querySelectorAll("form[data-bridge]").forEach(function (form) {
    if (form.elements.namedItem(HONEYPOT)) return;
    var trap = document.createElement("div");
    trap.setAttribute("aria-hidden", "true");
    trap.style.cssText =
      "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none";
    trap.innerHTML =
      '<label>Website<input type="text" name="' +
      HONEYPOT +
      '" tabindex="-1" autocomplete="off"></label>';
    form.appendChild(trap);
  });

  // Bubble phase on <html>: listeners on the form itself (RevenueHero's
  // scheduler on the contact form) still run, while webflow.js's handler,
  // delegated on document, never sees the event.
  document.documentElement.addEventListener("submit", function (event) {
    var form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    var bridgeName = form.getAttribute("data-bridge") || "";
    var bridge = bridges[bridgeName];
    if (!bridge) return;
    event.preventDefault();
    event.stopPropagation();

    var wrapper = form.parentElement;
    var done = wrapper && wrapper.querySelector(".w-form-done");
    var fail = wrapper && wrapper.querySelector(".w-form-fail");
    var submit = form.querySelector('[type="submit"]');
    var label = submit ? submit.value : "";
    if (submit) {
      submit.disabled = true;
      submit.value = submit.getAttribute("data-wait") || label;
    }
    if (fail) fail.style.display = "none";

    var payload = bridge.body(form);
    payload.honeypot = byName(form, HONEYPOT);
    payload.pageUri = window.location.href;
    payload.pageName = document.title;

    fetch(bridge.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        return res.ok ? res.json() : Promise.reject(res);
      })
      .then(function () {
        form.style.display = "none";
        if (done) done.style.display = "block";
        submitted(bridgeName, true);
      })
      .catch(function () {
        if (fail) fail.style.display = "block";
        submitted(bridgeName, false);
      })
      .finally(function () {
        if (submit) {
          submit.disabled = false;
          submit.value = label;
        }
      });
  });
})();
