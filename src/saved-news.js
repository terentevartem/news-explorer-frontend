import MainApi                from "./js/api/mainapi";
import constants              from "./js/constants";
import SavedArticlesContainer from "./js/components/savedarticlescontainer";
import AuthManager            from "./js/components/authmanager";
import Header                 from "./js/components/header";
import EVENTS                 from "./js/events";
import AuthForm         from './js/components/authform';
import RegistrationForm from './js/components/registrationForm';

const api = new MainApi(constants.mainApi);
const header = new Header({element: document.querySelector(constants.header)});
const buttonOptionalPopupRegistration = document.querySelector(constants.buttonOptionalPopupRegistration);
const buttonOptionalPopupLogin = document.querySelector(constants.buttonOptionalPopupLogin);
const popupLogin = new AuthForm({api, element: document.querySelector(constants.popupLogin)});
const popupRegistration = new RegistrationForm({api, element: document.querySelector(constants.popupRegistration)});

const results = new SavedArticlesContainer({
  element: document.querySelector(constants.results),
  pageSize: constants.resultsPageSize,
  loggedIn: false,
  keywordsText: document.querySelector(constants.keywordsText),
  countText: document.querySelector(constants.countText)
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
