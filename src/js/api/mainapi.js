class MainApi {
  constructor(props) {
    this.props = props;
  }

  getUrl(url){
     return `${this.props.protocol}${this.props.domain}${url}`;
  }

  async signUp(data) {
    await this.request(this.getUrl(this.props.signUp), this.getRequestData(data));
  }

  request(url, requestData) {
    return fetch(url, requestData)
      .then(async (res) => {
        if (!res.ok) {
          const message = await res.json().then(x => x.message);
          throw new Error(message);
        }
        return await res.json();
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
        'authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    };
  }

  async signIn(data) {
    const result = await this.request(this.getUrl(this.props.signIn), this.getRequestData(data));
    if (result.token) {
      localStorage.setItem('token', result.token);
    }
  }

  singOut() {
    localStorage.removeItem('token');
  }

  getUserData() {
    const data = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': `Bearer ${localStorage.getItem('token')}`
      },
    };
    return fetch(this.getUrl(this.props.userInfo), data)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        return await res.json();
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  async getArticles() {
    const data = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': `Bearer ${localStorage.getItem('token')}`
      },
    };
    return fetch(this.getUrl(this.props.articles), data)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        return await res.json();
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  async createArticle(data) {
    return await this.request(this.getUrl(this.props.articles), this.getRequestData(data));
  }

  removeArticle(id) {
    const data = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': `Bearer ${localStorage.getItem('token')}`
      },
    };
    return fetch(this.getUrl(`${this.props.articles}/${id}`), data)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        return await res.json();
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}

export default MainApi
