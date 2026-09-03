'use strict';

class Carousel02 {
	constructor(){
		// this.init();

	}
	init(){
      const groups = document.querySelectorAll('.carousel02__group');
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      let currentIndex = 0;

      // 表示切り替え関数
      function updateCarousel(index) {
        groups.forEach((group, i) => {
          if (i === index) {
            group.classList.add('active');
          } else {
            group.classList.remove('active');
          }
        });
      }

      // 「次へ」ボタンクリック
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % groups.length;
        updateCarousel(currentIndex);
      });

      // 「前へ」ボタンクリック
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + groups.length) % groups.length;
        updateCarousel(currentIndex);
      });
	}
}

export default Carousel02;