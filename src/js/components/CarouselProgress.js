'use strict';

class CarouselFade {
	constructor(){
		this.fade();
	}

	fade() {
		const version = document.querySelector('.progressVer');
		if (!version) return;

		const slides = document.querySelectorAll('.fadeSingle02__slide');
		const pagination = document.querySelector('.fadeSingle02__pagination');

		let current = 0;
		const total = slides.length;
		const duration = 3000;

		// bar生成
		const bar = document.createElement('div');
		bar.classList.add('fadeSingle02__pagination-bar');
		pagination.appendChild(bar);

		// constructor内かfade()の冒頭でフラグを定義
		let isInitial = true; 

		const updateProgress = () => {
			const percent = ((current + 1) / total) * 100;

			if (current === 0) {
				if (isInitial) {
					// --- 初回（初期化時）の挙動 ---
					bar.style.width = `${percent}%`;
					isInitial = false; // 2周目以降のためにフラグを折る
				} else {
					// --- 2周目以降、0に戻る時の挙動 ---
					bar.style.width = `0%`;
					bar.addEventListener('transitionend', () => {
						bar.classList.remove('active');
						setTimeout(() => {					
							bar.style.width = `${percent}%`;
						}, 100);
					}, { once: true });
				}
			} else {
				// 通常の更新（2枚目以降）
				bar.style.width = `${percent}%`;
			}

			if (current === total - 1) {
				bar.addEventListener('transitionend', () => {
					bar.classList.add('active');
				}, { once: true });
			}
		};

		const updateDisplay = () => {
			slides.forEach((slide, i) => {
				slide.classList.toggle('active', i === current);
			});
		};

		const nextSlide = () => {
			current = (current + 1) % total;
			updateDisplay();
			updateProgress();
		};

		// 初期化
		updateDisplay();
		updateProgress();

		setInterval(nextSlide, duration);
	}
}

export default CarouselFade;