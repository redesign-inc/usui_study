'use strict';


class Module {
	constructor(){
		this.square();
	}
	square() {
		const areas = document.querySelectorAll('[data-scroll]');
		const border = document.querySelector('.square-border');
		for (let i = 0; i < 9; i++) {
			const clone = border.cloneNode(true);
			border.parentNode.appendChild(clone);			
		}
		const square = document.querySelector('.square'); 
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				const index = Number(entry.target.dataset.scroll);
				const className = `is-scrolled${String(index + 1).padStart(2, '0')}`;
				square.classList.toggle(className, entry.isIntersecting);
			});
		}, {
			rootMargin: '-50% 0px -50% 0px'
		});
		areas.forEach(area => observer.observe(area));
	}
}

export default Module;