'use strict';

/**
 currentTime:  current time
 startValue:  beginning value
 endValue: final value
 duration:  total duration
*/

const tweenFunctions = require('tween-functions');

const Ease = (currentTime, startValue, endValue, duration, easing)=>{
	let easingFunc = tweenFunctions[easing] || tweenFunctions.linear;
	return easingFunc(currentTime, startValue, endValue, duration);
};

export default Ease;
