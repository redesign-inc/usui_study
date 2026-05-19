'use strict';

class CarouselFade {
	constructor(){
		this.fade();
	}

fade() {
		const version = document.querySelector('.progressVer');
		if (!version) return;

		let active = 0;
		const slider = document.querySelector('.fadeSingle02');
		const items = slider.querySelectorAll('.fadeSingle02__slide');
		console.log(items);
		const total = items.length;

		const pagination = slider.querySelector('.fadeSingle02__pagination');
		const bar = document.createElement('div');
		bar.classList.add('fadeSingle02__pagination-bar');
		pagination.appendChild(bar);

		function updateProgress() {
			const percent = ((active + 1) / total);
			bar.style.scale = `${percent} 1`;
		}

		function activeChange(index) {
			items.forEach((item, i) => {
				item.classList.toggle('active', i === index);
			});	
			active = index;
			updateProgress();
		}		
		activeChange(active);
		
		
		function nextSlide() {
			let next = (active + 1) % total;
			activeChange(next);
			if(next === 0) {
				bar.classList.add('active');
				bar.style.scale = `0 1`;
				resetbar();
			}
		}

		async function resetbar() {
			// トランジション完了を待つ
			await new Promise((resolve) => {
				bar.addEventListener('transitionend', resolve, { once: true });
			});
			// トランジション完了後にクラスを削除して新しいスケールを設定
			bar.classList.remove('active');
			bar.style.scale = `${1 / total} 1`;
		}

		setInterval(nextSlide, 2000);
	}	
}

export default CarouselFade;