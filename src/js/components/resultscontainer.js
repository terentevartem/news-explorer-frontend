import BaseComponent     from "./basecomponent";
import ArticlesContainer from "./articlescontainer";
import EVENTS            from "../events";

class ResultsContainer extends ArticlesContainer {
  constructor(props) {
    super(props);
    this.showMoreButton = new BaseComponent(this.element.querySelector('.results__button'));
    this.pageSize = props.pageSize;
    this.showMoreButton.element.addEventListener('click', () => this.showMore());
    this.loading = new BaseComponent(this.element.querySelector('.preloader__container'));
    this.notFound = new BaseComponent(this.element.querySelector('.not-found__container'));
  }

  doShowNews() {
    this.resultsContainer.show();
    this.renderNews(0, this.pageSize);
  }

  renderNews(startNumber, pageSize) {
    super.renderNews(startNumber, pageSize);
    this.currentIndex = startNumber + pageSize;
    this.currentIndex < this.news.length ? this.showMoreButton.show() : this.showMoreButton.hide();
  }

  noNews() {
    this.notFound.show();
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
  }

  onCardClicked(data) {
    document.dispatchEvent(new CustomEvent(EVENTS.saveNewsData, {detail: data}));
  }

  showMore() {
    this.renderNews(this.currentIndex, this.pageSize);
  }
}

export default ResultsContainer
