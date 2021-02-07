import { openModal } from '../modal/modal';
import { tns } from 'tiny-slider/src/tiny-slider';

export default function() {
  const thumbs = document.querySelectorAll('.tabBlock__thumbnail');

  thumbs.forEach(el => {
    el.addEventListener('click', mediaModal);
  });
}

function mediaModal() {
  if (this.classList.contains('tabBlock__thumbnail_video')) {
    showVideo.call(this);
  } else if (this.classList.contains('tabBlock__thumbnail_imgMore')) {
    showGallery.call(this);
  } else {
    showImage.call(this);
  }
}

function showImage() {
  const modal = document.querySelector('#mediaModal');
  const modalTitle = modal.querySelector('.modal__title');
  const content = modal.querySelector('.modal__content');
  const title = this.dataset.title;
  const src = this.dataset.img;
  modalTitle.innerHTML = title;
  content.innerHTML = `<div class="mediaModal__imageBox"><img src="${src}" alt="" class="mediaModal__img"></div>`;
  openModal(modal);
}

function showVideo() {
  const modal = document.querySelector('#mediaModal');
  const modalTitle = modal.querySelector('.modal__title');
  const content = modal.querySelector('.modal__content');
  const title = this.dataset.title;
  const src = this.querySelector('video').src;
  modalTitle.innerHTML = title;
  content.innerHTML = `<video class="mediaModal__video" autoplay controls><source src="${src}" type="video/mp4"></video>`;
  openModal(modal);
}

function showGallery() {
  const modal = document.querySelector('#mediaModal');
  const modalTitle = modal.querySelector('.modal__title');
  const content = modal.querySelector('.modal__content');
  const title = this.dataset.title;
  const count = this.dataset.count;
  const sources = JSON.parse(this.dataset.array);
  modalTitle.innerHTML = title;
  let html = '<div class="mediaModal__slider">';
  sources.forEach(el => {
    html += `<div class="mediaModal__slide"><img src="${el}" alt="" class="mediaModal__slideImg"></div>`;
  });
  html += `</div> <div class="mediaModal__controls">
  <img src="" class="mediaModal__arrow mediaModal__prev">
  <img src="" class="mediaModal__arrow mediaModal__next">
  </div><div class="mediaModal__slideCount">
  <span class="mediaModal__current">1</span>
  <span>/</span>
  <span class="mediaModal__all">${count}</span></div>`;
  content.innerHTML = html;

  let slider = tns({
    container: '.mediaModal__slider',
    items: 1,
    controlsContainer: '.mediaModal__controls',
    nav: false,
    loop: false
  });

  slider.events.on('indexChanged', () => {
    const index = slider.getInfo().index;
    const current = document.querySelector('.mediaModal__current');
    current.innerHTML = index + 1;
  });

  openModal(modal);
}
