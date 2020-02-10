import MainApi           from "./js/api/mainapi";
import ArticlesContainer from "./js/components/articlescontainer";

const api = new MainApi({
  signIn: `${protocol}${domain}/signin`,
  signUp: `${protocol}${domain}/signup`,
  createArticle: `${protocol}${domain}/articles`
});

const results = new ArticlesContainer({
  element: document.querySelector('.results'),
  pageSize: 3,
  loggedIn: false
});

async function init() {
  const news = await api.getArticles();
  results.showNews(news);
}

init();
