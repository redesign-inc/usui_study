/**
 vanillajsにon, off, oneイベントをできます。
*/

// on
if( !Element.prototype.on ){
	window.on = Element.prototype.on = function(event, callback, options='false'){
		let eventType = event.split('.')[0];
		this.eventToggleNames = this.eventToggleNames || {};
		this.eventToggleNames[event] = {
			'callback': callback,
			'options': options
		};
		this.addEventListener(eventType, callback, options);
	};
}

// off
if( !Element.prototype.off ){
	window.off = Element.prototype.off = function(event){
		let reg = new RegExp(`${event}$`);
		for( const key in this.eventToggleNames ) {
			if( key.match(reg) ) {
				let
					eventType = key.split('.')[0],
					callback = this.eventToggleNames[key].callback,
					options = this.eventToggleNames[key].options;
				this.removeEventListener(eventType, callback, options);
				delete this.eventToggleNames[key];
			}
		}
	};
}

// one
if( !Element.prototype.one ){
	window.one = Element.prototype.one = function(event, callback, options='false'){
		let func = ()=>{
			callback();
			this.removeEventListener(event, func, options);
		};
		this.addEventListener(event, func, options);
	};
}
