import ArticlesContainer from "./articlescontainer";
import EVENTS            from "../events";
import constants from "../constants";

class SavedArticlesContainer extends ArticlesContainer {
  constructor(props) {
    super(props);
    this.keywordsText = props.keywordsText;
    this.countText = props.countText;
  }

  noNews() {
    this.keywordsText.textContent = constants.keywordsTextNoArticles;
    this.countText.textContent = constants.countTextNoArticles;
  }

  doShowNews() {
    this.resultsContainer.show();
    this.news.forEach(news => news.date = new Date(news.date));
    this.showKeywords(this.news);
    this.renderNews(0, this.news.length);
  }

  showKeywords(news) {
    this.keywordsText.textContent = this.prepareKeywords(news);
    this.countText.textContent = this.news.length;
  }

  prepareKeywords(news) {
    const keywordsMap = {};
    news.forEach(news => {
      const keyword = news.keyword;
      if (!keywordsMap.hasOwnProperty(keyword)) {
        keywordsMap[keyword] = 0;
      }
      keywordsMap[keyword]++;
    });
    const keywordsArray = [];
    for (let keyword in keywordsMap) {
      keywordsArray.push({keyword, count: [keywordsMap[keyword]]});
    }
    const sortedKeywords = keywordsArray.sort((a, b) => b.count - a.count);
    const array = sortedKeywords.map(a => a.keyword);
    if (array.length < constants.numberOfKeywords) {
      return array.join(', ');
    }
    let words = array.splice(0, 2).join(', ');
    if (array.length > 0) {
      words += ` и ${array.length} другим`;
    }
    return words;
  }

  removeById(id) {
    for (let i = 0; i < this.news.length; i++) {
      if (this.news[i]._id === id) {
        this.news.splice(i, 1);
        this.clear();
        this.showNews(this.news);
        break;
      }
    }
  }

  onCardClicked(data) {
    document.dispatchEvent(new CustomEvent(EVENTS.deleteNewsData, {detail: data}));
  }
}

export default SavedArticlesContainer
