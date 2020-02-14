import BaseComponent from "./basecomponent";
import constants     from "../constants";

class ArticlesContainer extends BaseComponent {
  constructor(props) {
    super(props.element);
    this.resultsContainer = new BaseComponent(this.element.querySelector(constants.resultsContainer));
    this.template = document.querySelector(constants.resultsTemplate);
    this.container = document.querySelector(constants.resultsCards);
    this.loggedIn = props.loggedIn;
  }

  showNews(news) {
    this.news = news;
    if (news.length === 0) {
      this.noNews();
    } else {
      this.doShowNews();
    }
  }

  doShowNews() {
  }

  noNews() {
  }

  renderNews(startNumber, pageSize) {
    const cardsContainer = document.createDocumentFragment();
    for (let i = startNumber; i < Math.min(startNumber + pageSize, this.news.length); i++) {
      cardsContainer.appendChild(this.createNewsCard(this.news[i]));
    }
    this.container.appendChild(cardsContainer);
  }

  createNewsCard(data) {
    const newCard = this.template.cloneNode(true).content;
    newCard.querySelector(constants.cardsTitle).textContent = data.title;
    newCard.querySelector(constants.cardsDescription).textContent = data.text;
    newCard.querySelector(constants.cardsAuthor).textContent = data.source;
    newCard.querySelector(constants.cardsItem).style.backgroundImage = `url(${data.image})`;
    newCard.querySelector(constants.cardsItemDate).textContent = `${data.date.getDate()} ${constants.month[data.date.getMonth()]} ${data.date.getFullYear()}`;
    const saveCardButton = newCard.querySelector(constants.cardButtons);
    if (this.loggedIn) {
      saveCardButton.classList.remove(constants.invisible);
    }
    saveCardButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.onCardClicked(data);
    });
    return newCard;
  }

  onCardClicked(data) {

  }

  clear() {
    this.resultsContainer.hide();
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  render(props) {
    if (props.isLoggedIn) {
      this.loggedIn = true;
      const cardButtons = this.container.querySelectorAll(constants.cardButtons);
      for (let cardSaveButton of cardButtons) {
        cardSaveButton.classList.remove(constants.invisible);
      }
    }
  }
}

export default ArticlesContainer
