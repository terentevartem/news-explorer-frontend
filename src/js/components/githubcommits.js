import BaseComponent from "./basecomponent";

class GitHubCommits extends BaseComponent {
  constructor(props) {
    super(props.element);
    this.container = props.container;
    this.template = props.template;
    this.api = props.api;
    this.swiperUpdate = props.swiperUpdate;
  }

  async render() {
    this.commits = await this.api.loadCommits();
    this.showCommits(this.commits);
  }

  showCommits(commits) {
    const commitCards = document.createDocumentFragment();
    for (let i = 0; i < commits.length; i++) {
      commitCards.appendChild(this.creatCommitCard(commits[i]));
    }
    this.container.appendChild(commitCards);
    this.swiperUpdate();
  }

  creatCommitCard(data) {
    const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа',
    'сентября', 'октября', 'ноября', 'декабря'];
    const newCard = this.template.cloneNode(true).content;
    newCard.querySelector('.commit__date').textContent = `${data.date.getDate()} ${month[data.date.getMonth()]}, ${data.date.getFullYear()}`;;
    newCard.querySelector('.commit__user-info-avatar').style.backgroundImage = `url(${data.avatar})`;
    newCard.querySelector('.commit__user-info-name-name').textContent = data.name;
    newCard.querySelector('.commit__user-info-mail').textContent = data.email;
    newCard.querySelector('.commit__text').textContent = data.message;
    return newCard;
  }
}

export default GitHubCommits
