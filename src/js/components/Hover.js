'use strict';

class Hover {
  constructor() {
    this.hover();
  }
  hover() {
    const txts = document.querySelectorAll(".p");
    const imgs = document.querySelectorAll("img");
    txts.forEach((txt, index) => {
      txt.addEventListener("mouseover", () => {
        imgs.forEach((img , imgIndex) => {
          img.classList.remove("is-current");
          if (index === imgIndex) {
            img.classList.add("is-current");
          }
        })
      });
    });
  }
}

export default Hover;