'use strict';

import imageLoaded from 'imagesloaded';

class ImageLoaded {
  constructor() {
    this.imageLoaded();
  }
  imageLoaded() {
    const section = document.querySelector('.js_imagesLoaded');
    if(!section) return;
    const opening = document.querySelector('.js_imagesLoaded__opening');
    const parent = document.querySelector('.js_imagesLoaded__imgs');
    if(!opening || !parent) return;

    const imgs = [
      '/assets/imgs/0.png',
      '/assets/imgs/1.png',
      '/assets/imgs/2.png',
      '/assets/imgs/3.png',
      '/assets/imgs/4.png',
    ];
    const sets = 10000;
    for(let i = 0; i < sets; i++) {
      for(let j = 0; j < imgs.length; j++) {
        const img = document.createElement('img');
        img.src = imgs[j];
        parent.appendChild(img);
      }
    }

    const instance = imageLoaded(parent);
    let displayedPercent = 0;
    let targetPercent = 0;
    let isComplete = false;
    let rafId = null;

    const renderProgress = () => {
      if(displayedPercent < targetPercent) {
        displayedPercent += 1;
      }

      opening.textContent = `${displayedPercent}%`;

      if(displayedPercent !== targetPercent) {
        rafId = requestAnimationFrame(renderProgress);
        return;
      }

      if(isComplete && displayedPercent === 100) {
        opening.classList.add('is-loaded');
      }

      rafId = null;
    };

    const scheduleRender = () => {
      if(rafId !== null) return;
      rafId = requestAnimationFrame(renderProgress);
    };

    const updateProgress = (loadedInstance) => {
      if(!loadedInstance.images.length) return;
      targetPercent = Math.round((loadedInstance.progressedCount / loadedInstance.images.length) * 100);
      scheduleRender();
    };

    instance.on('progress', updateProgress);
    instance.on('always', function() {
      isComplete = true;
      targetPercent = 100;
      scheduleRender();
    });
  }
}

export default ImageLoaded;