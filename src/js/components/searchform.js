import BaseComponent from "./basecomponent";
import constants from '../constants';
import validator from "validator/es";

class SearchForm extends BaseComponent {
  constructor(props) {
    super(props.element);
    this.timeSpan = props.timeSpan;
    this.api = props.api;
    this.results = props.results;
    this.form = this.element;
    this.form.onsubmit = this.search.bind(this);
    this.inputs = this.element.querySelectorAll(constants.searchError);
    this.searchInputError = document.querySelector(constants.searchInputError);
    this.searchError = this.element.querySelector(constants.searchError);
    this.searchError.addEventListener('input', this.validateSearch.bind(this));
  }

  async search(event) {
    event.preventDefault();
    const data = {};

    let formIsValid = true;
    for (let input of this.inputs) {
      if (input.name == 'queryString') {
        if (!this.validateSearch({ target: input })) {
          formIsValid = false;
        }
      }
      data[input.name] = input.value;
    }

    formIsValid && this.results.clear();
    formIsValid && this.results.showLoading();

    formIsValid && this.api.getNews(this.form.queryString.value, this.timeSpan)
      .then(news => {
        this.results.hideLoading();
        this.results.showNews(news);
      }).catch(err => {
        this.results.hideLoading();
        const reason = err.message;
        this.results.showErrorsNews(reason);
      });
  }

  validateSearch(event) {
    const input = event.target;
    const isValid = validator.isLength(input.value, {min: constants.validateSearchMinLength, max: constants.validateSearchMaxLength});
    if (isValid) {
      input.classList.remove(constants.authFormInputInvalid);
      this.searchInputError.classList.add(constants.invisible);
    } else {
      if (input.value.length === 0) {
        this.searchInputError.classList.remove(constants.invisible);
      } else {
        this.searchInputError.classList.add(constants.invisible);
      }
      input.classList.add(constants.authFormInputInvalid);
    }
    return isValid;
  }
}

export default SearchForm
