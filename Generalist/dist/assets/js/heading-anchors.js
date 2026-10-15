// Appends a small anchor link to each .post-heading / .post-subheading that
// has an id. Only the icon is clickable; it fades in when the heading is
// hovered (see .heading-anchor styles).
(function () {
  var ICON_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
    '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>' +
    '<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>' +
    "</svg>";

  function init() {
    var headings = document.querySelectorAll(
      ".post-heading[id], .post-subheading[id]"
    );
    headings.forEach(function (heading) {
      var link = document.createElement("a");
      link.className = "heading-anchor";
      link.href = "#" + heading.id;
      link.setAttribute("aria-label", "Link to this section");
      link.innerHTML = ICON_SVG;
      link.addEventListener("click", function (event) {
        event.preventDefault();
        heading.scrollIntoView({ behavior: "smooth" });
        history.pushState(null, "", "#" + heading.id);
      });
      heading.appendChild(link);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
