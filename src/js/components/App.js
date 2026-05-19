'use strict';

import Config from '../util/Config';
import Util from '../util/Util';
import HtmlClass from '../util/HtmlClass';
import SmoothScroll from '../util/SmoothScroll';
import ThreeApp from './ThreeApp';
import Popover from './Popover';
import Oasobi from './Oasobi';
import Carousel from './Carousel';
import CarouselFade from './CarouselFade';
import CarouselProgress from './CarouselProgress';
import startingStyle from './startingStyle';
import Module from './Module';
import CarouselClipPath from './CarouselClipPath';

class App {
	constructor(){
		this.html = document.querySelector('html');
		this.Config = Config;
		this.Util = new Util();
		this.weather;
	}

	render(){
		HtmlClass.render();
		SmoothScroll.render('.ss');
		// new ThreeApp();
		new Popover();
		new Oasobi();
		new Carousel();
		new CarouselFade();
		new CarouselProgress();
		new startingStyle();
		new Module();
		new CarouselClipPath();
	}
}

export default App;
