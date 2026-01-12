'use strict';

const HtmlClass = {
	render(){
		if( app.Util.ua() ) app.html.classList.add(app.Util.ua());
		if( app.Util.ua() == 'ie10' || app.Util.ua() == 'ie11' ) app.html.classList.add('isIE');
		if( app.Util.isMS() ) app.html.classList.add('isMS');
		if( !app.Util.touch() ) app.html.classList.add('notouch');
	}
};

export default HtmlClass;
