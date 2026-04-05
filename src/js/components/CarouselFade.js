'use strict';

class CarouselFade {
	constructor(){
		this.fade();
	}
	fade() {
		const version = document.querySelector('.fadeSingleVer');
		if (!version) return;
		const slides = document.querySelectorAll('.fadeSingle__slide');
		const pagination = document.querySelector('.fadeSingle__pagination');

		let current = 0;
		let dots = [];
		let intervalId;

		const startInterval = () => {
			intervalId = setInterval(nextSlide, 3000);
		};

		const resetInterval = () => {
			clearInterval(intervalId);
			startInterval();
		};

		slides.forEach((slide, index) => {
			const dot = document.createElement('div');
			dot.classList.add('fadeSingle__pagination-dot');
			pagination.appendChild(dot);
			dots.push(dot);
			dot.addEventListener('click', () => {
				current = index;
				updateDisplay();
				resetInterval();
			});
		});

		const updateDisplay = () => {
			slides.forEach((slide, i) => {
				 slide.classList.toggle('active', i === current);
			});
			dots.forEach((el, i) => {
				el.classList.toggle('active', i === current);
			});
				
		};

		const nextSlide = () => {
			current = (current + 1) % slides.length;
			updateDisplay();
		};

		updateDisplay();
		setInterval(nextSlide, 3000);
	}
}

export default CarouselFade;