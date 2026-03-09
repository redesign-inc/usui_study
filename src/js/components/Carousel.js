'use strict';

class Carousel {
	constructor() {
		this.changing = false;
		this.active = 0;
		this.slider = document.querySelector('.carousel');
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
		// active
		this.activeChange(this.active);	
		// control
		this.control();
	}
	change(number, direction) {
		if( this.changing ) return;
		const w = parseInt(getComputedStyle(this.slider).getPropertyValue('--itemW'), 10);
		const easing = getComputedStyle(this.slider).getPropertyValue('--easing');
		const duration = parseInt(getComputedStyle(this.slider).getPropertyValue('--duration'), 10);
		this.changing = true;
		let next = (this.active + direction * number) % this.length;
		if( next < 0 ) {
			next = this.length - 1;
		}
		this.activeChange(next);
		let start = this.active * w;
		if( this.active == 0 && direction < 0 ) {
			start = 100;
		} else if( this.active == this.length - 1 && direction > 0 ) {
			start = -1 * w;
		}
		const end = `${next * w}%`;
		console.log(`start:${start}`);
		console.log(`end:${end}`);
		const animation = this.container.animate([
			{
				translate: `${-1* start}% 0`
			},
			{
				translate: `${end} 0`
			},
		], {
			easing: easing,
			duration: duration,
			fill: 'forwards',
		});
		animation.onfinish = ()=>{
			this.changing = false;
			this.active = next;
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