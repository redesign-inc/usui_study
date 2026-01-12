'use strict';

class Util {
	constructor(){}

	ua(){
		let ua = window.navigator.userAgent.toLowerCase();
		if( ua.indexOf('msie 10') != -1 ) {
			return 'ie10';
		} else if( ua.indexOf('trident/7.0') != -1 ) {
			return 'ie11';
		} else if( ua.indexOf('edge') != -1 ) {
			return 'edge';
		} else if( ua.indexOf('chrome') != -1 ) {
			return 'chrome';
		} else if( ua.indexOf('firefox') != -1 ) {
			return 'firefox';
		} else if( ua.indexOf('safari') != -1 ) {
			return 'safari';
		} else if( ua.indexOf('opera') != -1 ) {
			return 'opera';
		} else if( ua.indexOf('gecko') != -1 ) {
			return 'gecko';
		} else {
			return '';
		}
	}

	os(){
		let platform = navigator.platform;
		if( platform.indexOf('Win') != -1 ) {
			return 'windows';
		} else if( platform.indexOf('Mac') != -1 ) {
			return 'mac';
		} else {
			return 'other';
		}
	}

	isMS(){
		return ( this.ua() == 'ie10' || this.ua() == 'ie11' || this.ua() == 'edge' )? true : false;
	}

	touch(){
		let ua = window.navigator.userAgent;
		return ( ua.indexOf('iPhone') != -1 || ua.indexOf('iPod') != -1 || ua.indexOf('iPad') != -1 || ua.indexOf('Android') != -1 )? true : false;
	}

	pointer(type){
		let isPointer = ( 'onpointerenter' in document )? true : false;
		if( type == 'enter' ) {
			return ( isPointer )? 'pointerenter' : 'mouseenter';
		} else if( type == 'leave' ) {
			return ( isPointer )? 'pointerleave' : 'mouseleave';
		} else if( type == 'move' ) {
			return ( isPointer )? 'pointermove' : 'mousemove';
		} else if( type == 'down' ) {
			return ( isPointer )? 'pointerdown' : 'mousedown';
		} else if( type == 'up' ) {
			return ( isPointer )? 'pointerup' : 'mouseup';
		} else if( type == 'click' ) {
			return ( isPointer && !this.touch() )? 'pointerdown' : 'click';
		}
	}

	sy(){
		return document.documentElement.scrollTop || document.body.scrollTop;
	}

	ww(){
		return window.innerWidth || document.documentElement.clientWidth;
	}

	wh(){
		return document.documentElement.clientHeight || window.innerHeight;
	}

	offset(el){
		let
			rect = el.getBoundingClientRect(),
			win = el.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	}

	resize(callback, id=''){
		let
			timerID,
			event = ( this.touch() )? 'orientationchange' : 'resize';
		window.on(event+id, ()=>{
			clearTimeout(timerID);
			timerID = setTimeout(callback, 100);
		});
	}

	layoutType(){
		if( this.ww() > app.Config.breakPoint.sp && this.ww() <= app.Config.breakPoint.tb ) {
			return 'TB';
		} else if( this.ww() <= app.Config.breakPoint.sp ) {
			return 'SP';
		} else {
			return 'PC';
		}
	}

	layoutChange(callback, id=''){
		let prevLayoutType = this.layoutType();
		this.resize(()=>{
			let type = this.layoutType();
			if( type != prevLayoutType ) callback();
			prevLayoutType = type;
		}, id);
	}

	fontsize(){
		return parseFloat(window.getComputedStyle(app.html).getPropertyValue('font-size'));
	}
};

export default Util;
