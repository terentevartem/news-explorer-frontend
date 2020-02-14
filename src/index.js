"use strict";
import "./pages/index.css";
import '../node_modules/swiper/css/swiper.min.css';
import Header           from './js/components/header';
import AuthForm         from './js/components/authForm';
import RegistrationForm from './js/components/registrationForm';
import MainApi          from './js/api/mainapi';
import EVENTS           from "./js/events";
import constants        from "./js/constants";
import NewsAPI          from "./js/api/newsapi";
import SearchForm       from "./js/components/searchform";
import ResultsContainer from "./js/components/resultscontainer";
import AuthManager      from "./js/components/authmanager";
import contains from "validator/es/lib/contains";

const api = new MainApi(constants.mainApi);
const newsApi = new NewsAPI({url: constants.newsUrl});

const header = new Header({element: document.querySelector(constants.header)});
const buttonOptionalPopupRegistration = document.querySelector(constants.buttonOptionalPopupRegistration);
const buttonOptionalPopupLogin = document.querySelector(constants.buttonOptionalPopupLogin);
const popupLogin = new AuthForm({api, element: document.querySelector(constants.popupLogin)});
const popupRegistration = new RegistrationForm({api, element: document.querySelector(constants.popupRegistration)});
const results = new ResultsContainer({
  api,
  element: document.querySelector(constants.results),
  pageSize: 3,
  loggedIn: false
});
const searchForm = new SearchForm({
  api: newsApi,
  element: document.querySelector(constants.searchForm),
  timeSpan: constants.timeSpan,
  results: results
});


buttonOptionalPopupRegistration.addEventListener('click', function () {
  popupRegistration.show();
  popupLogin.hide();
});

buttonOptionalPopupLogin.addEventListener('click', function () {
  popupLogin.show();
  popupRegistration.hide();
});

const authManager = new AuthManager({
  header, api, results
});
authManager.init();

document.addEventListener(EVENTS.saveNewsData, (customEvent) => {
  api.createArticle(customEvent.detail);
});


