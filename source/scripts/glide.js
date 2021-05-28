import Glide from '@glidejs/glide';

function mountGlide() {

	const doc = document.querySelector('.glide')

	if (doc) {
		const glide = new Glide(doc, {
			type: 'carousel',
			startAt: 0,
			perView: 1,
			autoplay: 3000,
			hoverpause: false,
		});
		glide.mount();
	}
}

document.addEventListener("DOMContentLoaded", function (event) {
	mountGlide();
});

