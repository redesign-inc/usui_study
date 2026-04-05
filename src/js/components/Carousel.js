'use strict';

class Carousel {
	constructor(){
		this.changing = false;
		this.active = 0;
		this.slider = document.querySelector('.carousel');
		if(!this.slider) return;
		this.container = this.slider.querySelector('.carousel__container');
		this.items;
		this.length = this.container.querySelectorAll('.carousel__slide').length;
		this.prev = this.slider.querySelector('.carousel__prev');
		this.next = this.slider.querySelector('.carousel__next');
		this.init();
	}
	init(){
		const group = this.container.querySelector('.carousel__inner');
		for( let i=0;i<2;i++ ) {
			const clone = group.cloneNode(true);
			this.container.appendChild(clone);
		}
		this.items = this.container.querySelectorAll('.carousel__slide');
		// 初期位置: アクティブスライドを中央に
		this.w = parseInt(getComputedStyle(this.slider).getPropertyValue('--itemW'), 10);
		const toCenterPos = (index) => 50 - this.w * (index + 0.5);
		this.container.animate(
			[
				{ 
					translate: `${toCenterPos(this.active)}% 0` 
				}
			],
			{
				duration: 0, fill: 'forwards' 
			}
		);
		// active
		this.activeChange(this.active);
		// control
		this.control();
	}
	change(number, direction) {
		if( this.changing ) return;
		const easing = getComputedStyle(this.slider).getPropertyValue('--easing');
		const duration = parseInt(getComputedStyle(this.slider).getPropertyValue('--duration'), 10);
		this.changing = true;
		let nextIndex = (this.active + direction * number) % this.length;
		if( nextIndex < 0 ) {
			nextIndex = this.length - 1;
		}
		this.activeChange(nextIndex);
		// アクティブスライドを画面中央に配置: translate = (50 - w*(N + 0.5))%
		// 2番目のinnerが0-100%、1番目が-100-0%、3番目が100-200%
		const toCenterPos = (index) => 50 - this.w * (index + 0.5);
		let startPos = toCenterPos(this.active);
		let endPos = toCenterPos(nextIndex);
		// ラップ時: 隣のinnerのスライドへ遷移
		if( this.active === 0 && direction < 0 ) {
			// 先頭→末尾: 2番目の0 → 1番目の4
			startPos = toCenterPos(0);
			endPos = toCenterPos(this.length - 1) + 100; // 1番目のinner
		} else if( this.active === this.length - 1 && direction > 0 ) {
			// 末尾→先頭: 2番目の4 → 3番目の0
			startPos = toCenterPos(this.length - 1);
			endPos = toCenterPos(0) - 100; // 3番目のinner
		}
		const isWrapPrev = this.active === 0 && direction < 0;
		const isWrapNext = this.active === this.length - 1 && direction > 0;

		const animation = this.container.animate([
			{
				translate: `${startPos}% 0`
			},
			{
				translate: `${endPos}% 0`
			},
		], {
			easing: easing,
			duration: duration,
			fill: 'forwards',
		});
		animation.onfinish = ()=>{
			this.changing = false;
			this.active = nextIndex;
			const toCenter = (i) => 50 - this.w * (i + 0.5);
			if( isWrapNext ) {
				this.container.animate(
				[
					{
						 translate: `${endPos}% 0` 
					},
					{
						translate: `${toCenter(0)}% 0`
					},
				], 
				{
					duration: 0,
					fill: 'forwards'
				});
			}
		};
	}
	activeChange(index) {
		this.items.forEach((item)=>{
			if( item.classList.contains('active') ) {
				item.classList.remove('active');
			}
			if( item.dataset.index == index ) {
				item.classList.add('active');
			}
		});
	};
	control() {
		// swipe
		let touched = false;
		let startX = 0;
		let diffX = 0;
		const touchstart = (x)=>{
			touched = true;
			startX = x;
		};
		const touchmove = (x)=>{
			if( !touched ) return;
			diffX = x - startX;
		};
		const touchend = ()=>{
			if( !touched ) return;
			touched = false;
			if( diffX > 100 ) {
				this.change(1, -1);
			} else if( diffX < -100 ) {
				this.change(1, 1);
			}
			diffX = 0;
		};
		this.slider.addEventListener('pointerdown', (e)=>{
			if( e.pointerType != 'mouse' ) return;
			touchstart(e.clientX);
		});
		this.slider.addEventListener('pointermove', (e)=>{
			if( e.pointerType != 'mouse' ) return;
			touchmove(e.clientX);
		});
		this.slider.addEventListener('pointerup', (e)=>{
			if( e.pointerType != 'mouse' ) return;
			touchend();
		});
		this.slider.addEventListener('pointerleave', (e)=>{
			if( e.pointerType != 'mouse' ) return;
			touchend();
		});
		this.slider.addEventListener('touchstart', (e)=>{
			touchstart(e.changedTouches[0].clientX);
		});
		this.slider.addEventListener('touchmove', (e)=>{
			touchmove(e.changedTouches[0].clientX);
		});
		this.slider.addEventListener('touchend', (e)=>{
			touchend();
		});
		this.slider.addEventListener('touchcancel', (e)=>{
			touchend();
		});
		this.prev.addEventListener('click', () => {
			this.change(1, -1);
		});
		this.next.addEventListener('click', () => {
			this.change(1, 1);
		});
		const handleKeyDown = (event) => {
			if (this.changing) return;
			if (event.key === 'ArrowLeft') {
				this.change(1, -1);
			} else if (event.key === 'ArrowRight') {
				this.change(1, 1);
			}
		}
		document.addEventListener('keydown', handleKeyDown)		
	}
}

export default Carousel;