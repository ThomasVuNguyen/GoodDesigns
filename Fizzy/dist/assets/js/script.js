import * as footer from './modules/footer.js';
import * as modal from './modules/modal.js';
import * as nav from './modules/nav.js';
import * as target from './modules/target.js';
import * as video from './modules/video.js';

document.addEventListener('DOMContentLoaded', () => {

  footer.ready();

  modal.ready();

  nav.scroll();

  target.hashchange();

  video.ready();

});

addEventListener('scroll', () => {

  nav.scroll();

});

addEventListener('load', () => {

  document.documentElement.style.scrollBehavior = 'smooth';

});
