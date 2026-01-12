'use strict';

import Ease from './Ease';

class SmoothScroll {
	constructor(){
		this.scrollEl = ()=>{
			if('scrollingElement' in document) return document.scrollingElement;
			if(navigator.userAgent.indexOf('WebKit') != -1) return document.body;
			return document.documentElement;
		};
		this.duration = {
			normal: 500,
			fast: 100
		};
	}

	render(els, offset=0){
		document.querySelectorAll(els).forEach((el)=>{
			let anc = el.getAttribute('href');
			el.on('click', (e)=>{
				e.preventDefault();
				this.scroll(anc, offset);
			}, false);
		});
	}

	scroll(anc, offset=0, speed='normal'){
		let target = document.querySelector(anc);
		if( !target ) return;
		let
			timerID,
			scrollMarginTop = parseFloat(window.getComputedStyle(target).getPropertyValue('scroll-margin-top')),
			pos = app.Util.offset(target).top - offset - scrollMarginTop,
			startTime = Date.now(),
			currentTime,
			startPos = app.Util.sy(),
			tick = ()=>{
				timerID = window.requestAnimationFrame(tick);
				currentTime = Date.now() - startTime;
				if( currentTime < this.duration[speed] ) {
					scrollTo(0, Ease(currentTime, startPos, pos, this.duration[speed], app.Config.ease.tween));
				} else {
					scrollTo(0, pos);
					window.cancelAnimationFrame(timerID);
				}
			};
		pos = ( pos < 0 )? 0 : pos;
		tick();
	}
};

export default new SmoothScroll();
