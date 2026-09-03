'use strict';

import Config from '../util/Config';
import Util from '../util/Util';
import HtmlClass from '../util/HtmlClass';
import SmoothScroll from '../util/SmoothScroll';
import ThreeApp from './ThreeApp';
import Popover from './Popover';
import ImageLoaded from './ImageLoaded';
import Carousel from './Carousel';
import Carousel02 from './Carousel02';
import CarouselFade from './CarouselFade';
import CarouselProgress from './CarouselProgress';
import startingStyle from './startingStyle';
import Module from './Module';
import CarouselClipPath from './CarouselClipPath';
import Hover from './Hover';
import { createApp } from 'vue'
import Vue from './App.vue'

class App {
	constructor(){
		this.html = document.querySelector('html');
		this.Config = Config;
		this.Util = new Util();
	}

	render(){
		HtmlClass.render();
		SmoothScroll.render('.ss');
		new ThreeApp();
		new Popover();
		new ImageLoaded();
		new Carousel02();
		new CarouselFade();
		new CarouselProgress();
		new startingStyle();
		new Module();
		new CarouselClipPath();
		new Hover();
		const app = createApp(Vue);
		app.mount('#app');
	}
}

export default App;
