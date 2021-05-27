import Glide from '@glidejs/glide';

console.log('entrou no js do glide');

var glide = new Glide('.glide', {
  type: 'carousel',
  startAt: 0,
  perView: 1,
  autoplay: 3000,
  hoverpause: false,
});

glide.mount();
