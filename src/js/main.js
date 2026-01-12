'use strict';
/*!
* main.js
*/

window.app = {};
// import jQuery from 'jquery';
// window.$ = window.jQuery = jQuery;
// import _ from 'lodash';
import { on, off } from './libs/eventtoggle';
// require('jquery.easing');

import App from './components/App';

app = new App();
app.render();
