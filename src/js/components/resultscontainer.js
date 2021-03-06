import BaseComponent     from "./basecomponent";
import ArticlesContainer from "./articlescontainer";
import EVENTS            from "../events";
import constants from "../constants";

class ResultsContainer extends ArticlesContainer {
  constructor(props) {
    super(props);
    this.showMoreButton = new BaseComponent(this.element.querySelector(constants.resultsShowMoreButton));
    this.pageSize = props.pageSize;
    this.showMoreButton.element.addEventListener('click', () => this.showMore());
    this.loading = new BaseComponent(this.element.querySelector(constants.preloaderContainer));
    this.notFound = new BaseComponent(this.element.querySelector(constants.notFoundContainer));
    this.notFoundError = new BaseComponent(this.element.querySelector(constants.notFoundContainerError));
    this.api = props.api;
    this.loggedIn = props.loggedIn;
  }

  doShowNews() {
    this.resultsContainer.show();
    this.renderNews(0, this.pageSize);
  }

  async renderNews(startNumber, pageSize) {
    if (this.loggedIn) {
      try {
        this.savedLinks = await this.api.getArticles().then(articles => {
            return articles.data.map(x => x.title)
        });
      }
      catch (err) {
        this.savedLinks = [];
        throw new Error(err.message);
      }
    }
    super.renderNews(startNumber, pageSize);
    this.currentIndex = startNumber + pageSize;
    this.currentIndex < this.news.length ? this.showMoreButton.show() : this.showMoreButton.hide();
  }

  noNews() {
    this.notFound.show();
  }

  errorNews() {
    this.notFoundError.show();
  }

  showLoading() {
    this.loading.show();
  }

  hideLoading() {
    this.loading.hide();
  }

  clear() {
    super.clear();
    this.currentIndex = 0;
    this.showMoreButton.hide();
    this.notFound.hide();
    this.notFoundError.hide();
  }

  onCardClicked(data) {
    document.dispatchEvent(new CustomEvent(EVENTS.saveNewsData, {detail: data}));
  }

  showMore() {
    this.renderNews(this.currentIndex, this.pageSize);
  }
}

export default ResultsContainer
