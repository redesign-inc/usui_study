'use strict';

import { FunctionController } from "three/examples/jsm/libs/lil-gui.module.min.js";

class Module {
	constructor(){
		this.init();
	}
	init() {
		// async function getMessage() {
		// 	return "こんにちは！";
		// }
		// async function showMessgae() {
		// 	const message = await getMessage();
		// 	console.log(message);
		// }
		// showMessgae();	

		async function getM() {
			return 'a';
		}
		async function showM() {
			const m = await getM();
		}
		showM();
	}
}

export default Module;