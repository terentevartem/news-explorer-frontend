import "./pages/index.css";
"use strict";
import Swiper        from 'swiper';
import constants     from "./js/constants";
import GitHubAPI     from "./js/api/githubapi";
import GitHubCommits from "./js/components/githubcommits";
import AuthManager   from "./js/components/authmanager";
import AuthForm         from './js/components/authform';
import RegistrationForm from './js/components/registrationForm';
import Header                 from "./js/components/header";
import MainApi                from "./js/api/mainapi";
import EVENTS                 from "./js/events";

const api = new MainApi(constants.mainApi);
const header = new Header({element: document.querySelector(constants.header)});
const buttonOptionalPopupRegistration = document.querySelector(constants.buttonOptionalPopupRegistration);
const buttonOptionalPopupLogin = document.querySelector(constants.buttonOptionalPopupLogin);
const popupLogin = new AuthForm({api, element: document.querySelector(constants.popupLogin)});
const popupRegistration = new RegistrationForm({api, element: document.querySelector(constants.popupRegistration)});


buttonOptionalPopupRegistration.addEventListener('click', function () {
  popupRegistration.show();
  popupLogin.hide();
});

buttonOptionalPopupLogin.addEventListener('click', function () {
  popupLogin.show();
  popupRegistration.hide();
});

const authManager = new AuthManager({
  header, api
});
authManager.init();

const swiper = new Swiper(constants.swiperContainer, {
  updateOnWindowResize: true,
  slidesPerView: constants.slidesPerViewDefault,
  spaceBetween: constants.spaceBetweenDefault,
  slidesPerGroup: constants.slidesPerGroupDefault,
  loop: false,
  loopFillGroupWithBlank: false,
  pagination: {
    el: constants.swiperPagination,
    clickable: true,
  },
  breakpoints: {
    200: {
      slidesPerView: constants.slidesPerView200,
      slidesPerGroup: constants.slidesPerGroup200,
      spaceBetween: constants.spaceBetween200,
    },
    767: {
      slidesPerView: constants.slidesPerView767,
      spaceBetween: constants.spaceBetween767,
      slidesPerGroup: constants.slidesPerGroup767,
    },
    1099: {
      slidesPerView: constants.slidesPerView1099,
      spaceBetween: constants.spaceBetween1099,
    },
  },
  navigation: {
    nextEl: constants.swiperNavigationNextEl,
    prevEl: constants.swiperNavigationPrevEl,
  },
});


const gitHubAPI = new GitHubAPI({
  url: constants.gitHub.url,
  maxCommits: constants.gitHub.maxCommits
});

const gitHubCommits = new GitHubCommits({
  api: gitHubAPI,
  element: document.querySelector(constants.swiper),
  swiperUpdate: swiper.update.bind(swiper),
  template: document.querySelector(constants.swiperTemplate),
  container: document.querySelector(constants.swiperWrapper),
});

gitHubCommits.render();
