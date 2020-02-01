import "./pages/index.css";
"use strict";
import '../node_modules/swiper/css/swiper.min.css';

const buttonPopupLogin = document.querySelector('.menu-button__authorization');
const buttonOptionalPopupRegistration = document.querySelector('.auth-form__optional-link-registration');
const buttonOptionalPopupLogin = document.querySelector('.auth-form__optional-link-login');
const closeButtonPopup = document.querySelector('.popup-auth__button-close');
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

const popupLogin = new Popup(document.querySelector('.popup-login'));
const popupRegistration = new Popup(document.querySelector('.popup-registration'));
const popupMenuMobile = new Popup(document.querySelector('.menu__mobile'));

buttonPopupLogin.addEventListener('click', function () {
  popupLogin.open();
});

closeButtonPopup.addEventListener('click', function () {
  popupLogin.close();
  popupRegistration.close();
});

buttonOptionalPopupRegistration.addEventListener('click', function () {
  popupRegistration.open();
  popupLogin.close();
});

buttonOptionalPopupLogin.addEventListener('click', function () {
  popupLogin.open();
  popupRegistration.close();
});

menuMobileButton.addEventListener('click', function () {
  popupMenuMobile.open();
});

menuMobileButtonClose.addEventListener('click', function () {
  popupMenuMobile.close();
});

