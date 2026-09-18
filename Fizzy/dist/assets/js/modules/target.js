function hashchange() {

  if(location.hash) {

    const hashElement = document.querySelector(location.hash);

    if(hashElement) hashElement.classList.add('target');

  }

}

export { hashchange };
