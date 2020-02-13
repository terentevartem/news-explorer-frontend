import "./pages/index.css";
"use strict";
import Swiper        from 'swiper';
import constants     from "./js/constants";
import GitHubAPI     from "./js/api/githubapi";
import GitHubCommits from "./js/components/githubcommits";
import AuthManager   from "./js/components/authmanager";
import AuthForm         from './js/components/authForm';
import RegistrationForm from './js/components/registrationForm';
import Header                 from "./js/components/header";
import MainApi                from "./js/api/mainapi";
import EVENTS                 from "./js/events";

const api = new MainApi(constants.mainApi);
const header = new Header({element: document.querySelector('.header')});
const buttonOptionalPopupRegistration = document.querySelector('.auth-form__optional-link-registration');
const buttonOptionalPopupLogin = document.querySelector('.auth-form__optional-link-login');
const popupLogin = new AuthForm({api, element: document.querySelector('.popup-login')});
const popupRegistration = new RegistrationForm({api, element: document.querySelector('.popup-registration')});

async function initNews() {
  const news = await api.getArticles();
  results.showNews(news.data);
}

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
});


const gitHubAPI = new GitHubAPI({
  url: constants.gitHub.url,
  maxCommits: constants.gitHub.maxCommits
});

const gitHubCommits = new GitHubCommits({
  api: gitHubAPI,
  element: document.querySelector('.swiper'),
  swiperUpdate: swiper.update.bind(swiper),
  template: document.querySelector('#commitTemplate'),
  container: document.querySelector('.swiper-wrapper'),
});

gitHubCommits.render();
