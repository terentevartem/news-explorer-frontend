class MainApi {
  constructor(props) {
    this.props = props;
  }

  async signUp(data) {
    await this.request(this.props.signUp, this.getRequestData(data));
  }

  request(url, requestData) {
    return fetch(url, requestData)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        return res.json();
      })
      .catch((err) => {
        throw new Error(err.message);
      })
  }

  getRequestData(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data)
    };
  }

  async signIn(data) {
    await this.request(this.props.signIn, this.getRequestData(data));
  }

  getUserData() {

  }

  async getArticles() {
    await this.request(this.props.createArticle);
  }

  async createArticle(data) {
    await this.request(this.props.createArticle, this.getRequestData(data));
  }

  removeArticle() {

  }
}

export default MainApi
