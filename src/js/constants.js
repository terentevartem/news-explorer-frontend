import MainApi from "./api/mainapi";

const constants = {
  newsUrl: 'https://newsapi.org/v2/everything?sortBy=popularity&apiKey=2e0d031a459d45f597df266e39165934&language=ru&pageSize=100',
  timeSpan: 604800000,
  gitHub: {
    url: 'https://api.github.com/repos/terentevartem/news-explorer-frontend/commits',
    maxCommits: 20
  },
  mainApi: {
    // domain: 'api.news-explorer.ga',
    domain: 'localhost:3000',
    protocol: 'http://',
    signIn: '/signin',
    signUp: '/signup',
    articles: '/articles',
    userInfo: '/users/me'
  }
};

export default constants;
