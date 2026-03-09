'use strict';

class Oasobi {
  constructor() {
    this.carousel();    
  }
  carousel() {
    const section = document.querySelector('.page-oasobi');
    if(!section) return;
    const text = document.querySelector('.date p');
    let date = new Date();
    const hours = date.getHours();
    if(hours === 23) {
      text.innerHTML = 'oyaasumi';
    }
  }
}

export default Oasobi;