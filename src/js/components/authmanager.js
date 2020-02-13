import EVENTS from "../events";

class AuthManager {
  constructor(props) {
    this.api = props.api;
    this.header = props.header;
    this.results = props.results;
  }

  async init() {
    await this.requestAndRenderUserData();

    document.addEventListener(EVENTS.authChanged, async (event) => {
      const isLoggedIn = event.detail.isLoggedIn;
      if (isLoggedIn) {
        this.requestAndRenderUserData();
      } else {
        this.header && this.header.render({isLoggedIn});
        this.results && this.results.render({isLoggedIn});
      }
    });

    document.addEventListener(EVENTS.logoutClicked, () => {
      this.api.singOut();
      document.dispatchEvent(new CustomEvent(EVENTS.authChanged, {detail: {isLoggedIn: false}}));
    });
  }

  async requestAndRenderUserData() {
    let userData = await this.api.getUserData().catch(() => {
    });
    const isLoggedIn = !!userData;
    const userName = userData && userData.name;
    this.header && this.header.render({isLoggedIn, userName});
    this.results && this.results.render({isLoggedIn});
  }
}

export default AuthManager
