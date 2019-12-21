import "./pages/index.css";
"use strict";
import Swiper from 'swiper';

const menuMobileButton = document.querySelector('.menu__mobile-button');
const menuMobileButtonClose = document.querySelector('.mobile-popup__button-close');

class Popup {
  constructor(popupElement) {
    this.popupElement = popupElement;
  }

  open() {
    this.popupElement.classList.add('popup_is-opened');
  }

  close() {
    this.popupElement.classList.remove('popup_is-opened');
  }
}

const popupMenuMobile = new Popup(document.querySelector('.menu__mobile'));

menuMobileButton.addEventListener('click', function () {
  popupMenuMobile.open();
});

menuMobileButtonClose.addEventListener('click', function () {
  popupMenuMobile.close();
});

const swiper = new Swiper('.swiper-container', {
  updateOnWindowResize: true,
  slidesPerView: 3,
  spaceBetween: 10,
  slidesPerGroup: 3,
  loop: false,
  loopFillGroupWithBlank: false,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    200: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 10,
    },
    767: {
      slidesPerView: 2,
      spaceBetween: 10,
      slidesPerGroup: 2,
    },
    1099: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})