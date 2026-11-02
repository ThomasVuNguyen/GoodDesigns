// Local additions to the captured page. Internal routes point at https://www.adopt.ai; the home link
// (logo) stays here and scrolls back to the top instead.
document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('a[href]');
  if (!a) return;
  var h = a.getAttribute('href');
  if (h === 'https://www.adopt.ai/' || h === 'https://www.adopt.ai') {
    e.preventDefault();
    e.stopPropagation();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}, true);
