class MainApi {
  constructor(options) {
    this.options = options;
  }
  signup() {

  }

  signin(loginData) {
    let body = JSON.stringify(loginData);
    let requestData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: body
    };
    return fetch(this.options.login, requestData)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json();
      })
      .catch((err) => {
        throw new Error(err.message);
      })

  }
  getUserData() {

  }
  getArticles() {

  }
  createArticle() {

  }
  removeArticle() {

  }
}