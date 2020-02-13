import MainApi                from "./js/api/mainapi";
import constants              from "./js/constants";
import SavedArticlesContainer from "./js/components/savedArticlesContainer";
import AuthManager            from "./js/components/authmanager";
import Header                 from "./js/components/header";
import EVENTS                 from "./js/events";
import AuthForm         from './js/components/authForm';
import RegistrationForm from './js/components/registrationForm';

const api = new MainApi(constants.mainApi);
const header = new Header({element: document.querySelector('.header')});
const buttonOptionalPopupRegistration = document.querySelector('.auth-form__optional-link-registration');
const buttonOptionalPopupLogin = document.querySelector('.auth-form__optional-link-login');
const popupLogin = new AuthForm({api, element: document.querySelector('.popup-login')});
const popupRegistration = new RegistrationForm({api, element: document.querySelector('.popup-registration')});

const results = new SavedArticlesContainer({
  element: document.querySelector('.results'),
  pageSize: 3,
  loggedIn: false,
  keywordsText: document.querySelector('.header-page-saved-news__keywords-words'),
  countText: document.querySelector('.header-page-saved-news__title-count')
});

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
  header, api, results
});
authManager.init().then(initNews);

document.addEventListener(EVENTS.deleteNewsData, async (customEvent) => {
  const id = customEvent.detail._id;
  await api.removeArticle(id);
  results.removeById(id);
});
