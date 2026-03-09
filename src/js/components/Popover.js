'use strict';

class Carousel {
  constructor() {
    // this.carousel();    
  }
  carousel() {
    function updatePosition() {
      // ボタンの位置を取得して、ポップオーバーの位置を計算
      const button = document.querySelector('.popover__open');
      const rect = button.getBoundingClientRect();
      const popover = document.querySelector('.popover__content');
      popover.style.top = `${rect.bottom + 8}px`;
      popover.style.left = `${rect.left}px`;
    }
    updatePosition();
  }
}

export default Carousel;