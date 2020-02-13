import BaseComponent from "./basecomponent";

class ArticlesContainer extends BaseComponent {
  constructor(props) {
    super(props.element);
    this.resultsContainer = new BaseComponent(this.element.querySelector('.results__container'));
    this.template = document.querySelector('#news_card');
    this.container = document.querySelector('.results__cards');
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
    const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа',
      'сентября', 'октября', 'ноября', 'декабря'];
    const newCard = this.template.cloneNode(true).content;
    newCard.querySelector('.cards-item__title').textContent = data.title;
    newCard.querySelector('.cards-item__description').textContent = data.text;
    newCard.querySelector('.cards-item__author').textContent = data.source;
    newCard.querySelector('.cards-item').style.backgroundImage = `url(${data.image})`;
    newCard.querySelector('.cards-item__date').textContent = `${data.date.getDate()} ${month[data.date.getMonth()]} ${data.date.getFullYear()}`;
    const saveCardButton = newCard.querySelector('.cards-item__save-button');
    if (this.loggedIn) {
      saveCardButton.classList.remove('invisible');
    }
    saveCardButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.onCardClicked(data);
    });
    /*
    newCard.querySelector(this.card.node).href = data.link;
    */
    // eslint-disable-next-line max-len
    /* if (this._saved()) {
       newCard.querySelector(this.card.icon.node).classList.add(this.card.icon.saved);
       newCard.querySelector(this.card.icon.node).setAttribute('cardID', this._position);
     }*/
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
      const cardButtons = this.container.querySelectorAll('.cards-item__save-button');
      for (let cardSaveButton of cardButtons) {
        cardSaveButton.classList.remove('invisible');
      }
    }
  }
}

export default ArticlesContainer
