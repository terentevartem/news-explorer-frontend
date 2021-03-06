import MainApi from "./api/mainapi";

const constants = {
  newsUrl: 'https://newsapi.org/v2/everything?sortBy=popularity&apiKey=2e0d031a459d45f597df266e39165934&language=ru&pageSize=100',
  timeSpan: 604800000,
  gitHub: {
    url: 'https://api.github.com/repos/terentevartem/news-explorer-frontend/commits',
    maxCommits: 20
  },
  mainApi: {
    domain: 'api.news-explorer.ga',
    protocol: 'https://',
    // domain: 'localhost:3000',
    // protocol: 'http://',
    signIn: '/signin',
    signUp: '/signup',
    articles: '/articles',
    userInfo: '/users/me'
  },
  header: '.header',
  searchError: '.header__search-input',
  searchInputError: '.header__error',
  buttonOptionalPopupRegistration: '.auth-form__optional-link-registration',
  buttonOptionalPopupLogin: '.auth-form__optional-link-login',
  popupLogin: '.popup-login',
  popupRegistration: '.popup-registration',
  results: '.results',
  resultsContainer: '.results__container',
  resultsTemplate: '#news_card',
  resultsCards: '.results__cards',
  resultsPageSize: 3,
  resultsShowMoreButton: '.results__button',
  searchForm: '.header__search',
  keywordsText: '.header-page-saved-news__keywords-words',
  countText: '.header-page-saved-news__title-count',
  swiper: '.swiper',
  swiperContainer: '.swiper-container',
  swiperPagination: '.swiper-pagination',
  swiperNavigationNextEl: '.swiper-button-next',
  swiperNavigationPrevEl: '.swiper-button-prev',
  swiperWrapper: '.swiper-wrapper',
  swiperTemplate: '#commitTemplate',
  cardButtons: '.cards-item__save-button',
  saveCardIcon: '.cards-item__save-icon',
  savedCardIcon: '.cards-item__saved-icon',
  cardsTitle: '.cards-item__title',
  cardsDescription: '.cards-item__description',
  cardsAuthor: '.cards-item__author',
  cardsItem: '.cards-item',
  cardsItemDate: '.cards-item__date',
  month: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
  invisible: 'invisible',
  authForm: '.auth-form',
  authFormInput: '.auth-form__input',
  authFormInputName: '.auth-form__input_name',
  authFormError: '.auth-form__error_main',
  authFormAuthorized: 'Авторизован',
  authButton: '.mobile-popup__button-auth',
  authFormSubmitButton: '.auth-form__button',
  authFormNameError: '.auth-form__error_name',
  authFormNameRequired: '.auth-form__required_name',
  authFormEmailInput: '.auth-form__input_email',
  authFormEmailError: '.auth-form__error_email',
  authFormEmailRequired: '.auth-form__required_email',
  authFormPasswordInput: '.auth-form__input_password',
  authFormPasswordError: '.auth-form__error_password',
  authFormPasswordRequired: '.auth-form__required_password',
  authFormInputInvalid: 'auth-form__input_invalid',
  authFormButtonInvalid: 'auth-form__button_invalid',
  authFormInputInvalidAll: '.auth-form__input_invalid',
  commitDate: '.commit__date',
  commitUserAvatar: '.commit__user-info-avatar',
  commitUserName: '.commit__user-info-name-name',
  commitUserMail: '.commit__user-info-mail',
  commitText: '.commit__text',
  userNames: '.user_name',
  menuMobileButton: '.menu__mobile-button',
  popupMenuMobile: '.menu__mobile',
  authButtonElement: '.menu-button__authorization',
  authButtonElementMobile: '.mobile-popup__button-auth_auth',
  savedNewsButton: '.menu-button__saved-news',
  savedNewsButtonMobile: '.mobile-popup__button_saved',
  logoutButton: '.menu-button__logout',
  logoutButtonMobile: '.mobile-popup__button-auth_logout',
  closeButton: '.button_close',
  validateNameMinLength: 2,
  validateNameMaxLength: 30,
  validatePasswordMinLength: 8,
  validatePasswordMaxLength: 30,
  validateSearchMinLength: 1,
  validateSearchMaxLength: 30,
  preloaderContainer: '.preloader',
  notFoundContainer: '.not-found',
  notFoundContainerError: '.not-found__container_error',
  keywordsTextNoArticles: 'пока что у вас нет сохраненных статей',
  countTextNoArticles: 'нет',
  numberOfKeywords: 3,
  slidesPerViewDefault: 3,
  spaceBetweenDefault: 10,
  slidesPerGroupDefault: 3,
  slidesPerView200: 1,
  spaceBetween200: 10,
  slidesPerGroup200: 1,
  slidesPerView767: 2,
  spaceBetween767: 10,
  slidesPerGroup767: 2,
  slidesPerView1099: 3,
  spaceBetween1099: 10,
  noСommitsText: 'Не удалось загрузить коммиты',
  errorNews: 'Ошибка запроса новостей'
};

export default constants;

