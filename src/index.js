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

//const domain = 'api.news-explorer.ga';
const domain = 'localhost:3000';
const protocol = `http://`;
const api = new MainApi({
  signIn: `${protocol}${domain}/signin`,
  signUp: `${protocol}${domain}/signup`,
  createArticle: `${protocol}${domain}/articles`
});
const newsApi = new NewsAPI({url: constants.newsUrl});


const buttonOptionalPopupRegistration = document.querySelector('.auth-form__optional-link-registration');
const buttonOptionalPopupLogin = document.querySelector('.auth-form__optional-link-login');
const popupLogin = new AuthForm({api, element: document.querySelector('.popup-login')});
const popupRegistration = new RegistrationForm({api, element: document.querySelector('.popup-registration')});
const results = new ResultsContainer({
  element: document.querySelector('.results'),
  pageSize: 3,
  loggedIn: false
});
const searchForm = new SearchForm({
  api: newsApi,
  element: document.querySelector('.header__search'),
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

const header = new Header({element: document.querySelector('.header')});
header.render({});
document.addEventListener(EVENTS.saveNewsData, (customEvent) => {
  api.createArticle(customEvent.detail);
});
document.addEventListener(EVENTS.authComplete, () => {
  header.render({isLoggedIn: true});
  results.render({isLoggedIn: true});
});
