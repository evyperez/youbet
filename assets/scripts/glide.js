import Glide from '@glidejs/glide';

function mountGlide() {
  const doc = document.querySelector('.glide');
  if (doc) {
    const glide = new Glide(doc, {
      type: 'slider',
      startAt: 0,
      perView: 3,
      hoverpause: false,
      gap: 24,
      bound: true,
      breakpoints: {
        1280: {
          perView: 3,
        },
        1000: {
          perView: 2,
        },
        670: {
          perView: 1,
        },
      },
    });
    glide.mount();
  }
}

document.addEventListener('DOMContentLoaded', function(event) {
  mountGlide();
});
