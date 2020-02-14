import BaseComponent from "./basecomponent";
import constants from "../constants";

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
    const newCard = this.template.cloneNode(true).content;
    newCard.querySelector(constants.commitDate).textContent = `${data.date.getDate()} ${constants.month[data.date.getMonth()]}, ${data.date.getFullYear()}`;;
    newCard.querySelector(constants.commitUserAvatar).style.backgroundImage = `url(${data.avatar})`;
    newCard.querySelector(constants.commitUserName).textContent = data.name;
    newCard.querySelector(constants.commitUserMail).textContent = data.email;
    newCard.querySelector(constants.commitText).textContent = data.message;
    return newCard;
  }
}

export default GitHubCommits
