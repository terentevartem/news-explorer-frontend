import BaseComponent     from "./basecomponent";
import ArticlesContainer from "./articlescontainer";

class ResultsContainer extends ArticlesContainer {
  constructor(props) {
    super(props);
    this.showMoreButton = new BaseComponent(this.element.querySelector('.results__button'));
    this.pageSize = props.pageSize;
    this.showMoreButton.element.addEventListener('click', () => this.showMore());
    this.loading = new BaseComponent(this.element.querySelector('.preloader__container'));
    this.notFound = new BaseComponent(this.element.querySelector('.not-found__container'));
  }

  showNews(news) {
    this.news = news;
    if (news.length === 0) {
      this.notFound.show();
    } else {
      this.resultsContainer.show();
      this.renderNews(0, this.pageSize);
    }
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

  showMore() {
    this.renderNews(this.currentIndex, this.pageSize);
  }
}

export default ResultsContainer
