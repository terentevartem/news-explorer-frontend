import BaseComponent from "./basecomponent";
import constants     from "../constants";
import EVENTS from "../events";

class ArticlesContainer extends BaseComponent {
  constructor(props) {
    super(props.element);
    this.resultsContainer = new BaseComponent(this.element.querySelector(constants.resultsContainer));
    this.template = document.querySelector(constants.resultsTemplate);
    this.container = document.querySelector(constants.resultsCards);
    this.loggedIn = props.loggedIn;
    this.errorFieldNews = this.element.querySelector('.not-found__description_error');
  }

  showNews(news) {
    this.news = news;
    if (news.length === 0) {
      this.noNews();
    } else {
      this.doShowNews();
    }
  }

  showErrorsNews(message) {
    this.errorNews();
    this.errorFieldNews.textContent = message;
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
    let isSaved = false;
    if (this.savedLinks) {
      isSaved = this.savedLinks.includes(data.title);
    }
    newCard.querySelector(constants.cardsTitle).textContent = data.title;
    newCard.querySelector(constants.cardsDescription).textContent = data.text;
    newCard.querySelector(constants.cardsAuthor).textContent = data.source;
    newCard.querySelector(constants.cardsItem).style.backgroundImage = `url(${data.image})`;
    newCard.querySelector(constants.cardsItemDate).textContent = `${data.date.getDate()} ${constants.month[data.date.getMonth()]} ${data.date.getFullYear()}`;
    const saveCardButton = newCard.querySelector(constants.cardButtons);
    const saveCardIcon = newCard.querySelector(constants.saveCardIcon);
    const savedCardIcon = newCard.querySelector(constants.savedCardIcon);
    if (this.loggedIn) {
      saveCardButton.classList.remove(constants.invisible);
    }
    if (isSaved) {
      saveCardIcon.classList.add(constants.invisible);
      savedCardIcon.classList.remove(constants.invisible);
    }
    document.addEventListener(EVENTS.savedNews, event => {
      if (event.detail.title === data.title) {
         saveCardIcon.classList.add(constants.invisible);
      savedCardIcon.classList.remove(constants.invisible);
      }
    })
    saveCardButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.onCardClicked(data);
    });
    return newCard;
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
