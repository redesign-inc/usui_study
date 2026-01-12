'use strict';

import Config from '../util/Config';
import Util from '../util/Util';
import HtmlClass from '../util/HtmlClass';
import SmoothScroll from '../util/SmoothScroll';

class App {
	constructor(){
		this.html = document.querySelector('html');
		this.Config = Config;
		this.Util = new Util();
	}

	render(){
		HtmlClass.render();
		SmoothScroll.render('.ss');
	}
}

export default App;
