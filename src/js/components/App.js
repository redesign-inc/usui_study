'use strict';

import Config from '../util/Config';
import Util from '../util/Util';
import HtmlClass from '../util/HtmlClass';
import SmoothScroll from '../util/SmoothScroll';
import ThreeApp from './ThreeApp';
import Carousel from './Carousel';
import Popover from './Popover';
import Oasobi from './Oasobi';

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
		new ThreeApp();
		new Carousel();
		new Popover();
		new Oasobi();
	}
	weather() {
		async function loadAreaData() {
			try {
				const response = await fetch('https://www.jma.go.jp/bosai/common/const/area.json');
				areaData = await response.json();
				populateAreaSelect();
			} catch (error) {
				console.error('エリアデータ取得エラー：', error);
			}
		}
	}
}

export default App;
