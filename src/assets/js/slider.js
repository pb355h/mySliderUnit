'use strict';

{
  const images = [
    './assets/img/640480.jpg',
    './assets/img/480480.jpg',
    './assets/img/480640.jpg',
    './assets/img/640640.jpg',
    './assets/img/320240.jpg',
    './assets/img/240320.jpg',
    './assets/img/720480.jpg',
    './assets/img/240240.jpg',
    './assets/img/512512.jpg',
    './assets/img/400400c.jpg',
    // './assets/img/400400t.jpg',
  ];

  let currentIndex = 0;

  const mainImageBox = document.getElementById('mainImageBox');
  const img = document.createElement('img');
  img.src = images[currentIndex];
  img.classList.add('mainImage');
  mainImageBox.appendChild(img);

  images.forEach((image, index) => {
    const img = document.createElement('img');
    img.classList.add('thumbnail');
    img.src = image;
    const div = document.createElement('div');
    div.classList.add('thumbnail-wrapper');
    if (index === currentIndex) {
      div.classList.add('current');
    }
    div.addEventListener('mouseover', () => {
      img.src = image;
      let mainImage = document.querySelector('.mainImage');
      let thumbnailWrapper = document.querySelectorAll('.thumbnail-wrapper');
      mainImage.setAttribute('src', img.src);
      thumbnailWrapper[currentIndex].classList.remove('current');
      currentIndex = index;
      thumbnailWrapper[currentIndex].classList.add('current');
    });
    div.appendChild(img);
    document.getElementById('thumbnails').appendChild(div);
  });

  let thumbnailWrapper = document.querySelectorAll('.thumbnail-wrapper');

  const prev = document.getElementById('prev');
  prev.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = images.length - 1;
      thumbnailWrapper[0].classList.remove('current');
      thumbnailWrapper[currentIndex].classList.add('current');
    } else {
      thumbnailWrapper[currentIndex + 1].classList.remove('current');
      thumbnailWrapper[currentIndex].classList.add('current');
    }
    document.querySelectorAll('.thumbnail-wrapper')[currentIndex].click();
    let mainImage = document.querySelector('.mainImage');
    mainImage.setAttribute('src', images[currentIndex]);
  });

  const next = document.getElementById('next');
  next.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex > images.length - 1) {
      currentIndex = 0;
      thumbnailWrapper[images.length - 1].classList.remove('current');
      thumbnailWrapper[currentIndex].classList.add('current');
    } else {
      thumbnailWrapper[currentIndex - 1].classList.remove('current');
      thumbnailWrapper[currentIndex].classList.add('current');
    }
    document.querySelectorAll('.thumbnail-wrapper')[currentIndex].click();
    let mainImage = document.querySelector('.mainImage');
    mainImage.setAttribute('src', images[currentIndex]);
  });

  // スライダー再生停止ここから
  let timeoutId;

  function playSlideshow() {
    timeoutId = setTimeout(() => {
      next.click();
      playSlideshow();
    }, 1000);
  }

  let isPlaying = false;

  const play = document.getElementById('play');
  play.addEventListener('click', () => {
    if (isPlaying === false) {
      playSlideshow();
      play.textContent = 'Pause';
    } else {
      clearTimeout(timeoutId);
      play.textContent = 'Play';
    }
    isPlaying = !isPlaying;
  });

}
