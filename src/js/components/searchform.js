import BaseComponent from "./basecomponent";

class SearchForm extends BaseComponent {
  constructor(props) {
    super(props.element);
    this.timeSpan = props.timeSpan;
    this.api = props.api;
    this.results = props.results;

    this.form = this.element;
    this.form.onsubmit = this.search.bind(this);
  }

  async search(event) {
    event.preventDefault();
    this.results.clear();
    this.results.showLoading();
    const news = await this.api.getNews(this.form.queryString.value, this.timeSpan);
    this.results.hideLoading();
    this.results.showNews(news);
  }
}

export default SearchForm
