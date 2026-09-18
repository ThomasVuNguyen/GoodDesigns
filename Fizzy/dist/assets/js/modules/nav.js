function scroll() {

  const nav = document.querySelector('.nav');

  if(nav) {

    if(scrollY > 0) {

      nav.classList.add('nav--stuck');

    } else {

      nav.classList.remove('nav--stuck');

    }

  }

}

export { scroll };
