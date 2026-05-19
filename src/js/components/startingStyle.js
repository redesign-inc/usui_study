'use strict';

class startingStyle {
  constructor() {
    this.startingStyle();    
  }
  startingStyle() {
    const startingStyle = document.querySelector('.starting-style');
    if(!startingStyle) return;
    const modal = startingStyle.querySelector('.modal');
    const btn = startingStyle.querySelector('.btn');
    btn.addEventListener('click', () => {
        modal.classList.toggle('is-hidden');
    });	
  }
}

export default startingStyle;