import BaseComponent from "./basecomponent";
import MobileMenu from "./mobilemenu";
import AuthButton from "./authbutton";
import EVENTS from "../events";
import constants from "../constants";

class Header extends BaseComponent {
  constructor(props) {
    super(props.element);
    const popupMenuMobile = new MobileMenu({ element: this.element.querySelector(constants.popupMenuMobile) });
    const menuMobileButton = this.element.querySelector(constants.menuMobileButton);

    menuMobileButton.addEventListener('click', function () {
      popupMenuMobile.show();
    });

    const authButtonElement = this.element.querySelector(constants.authButtonElement);
    const authButtonElementMobile = this.element.querySelector(constants.authButtonElementMobile);
    this.authButton = [];
    if (authButtonElement) {
      this.authButton.push(new AuthButton({ element: authButtonElement }));
    }
    if (authButtonElementMobile) {
      this.authButton.push(new AuthButton({ element: authButtonElementMobile }));
    }
    this.savedNewsButton = this.element.querySelector(constants.savedNewsButton);
    this.savedNewsButtonMobile = this.element.querySelector(constants.savedNewsButtonMobile);
    this.logoutButton = this.element.querySelector(constants.logoutButton);
    this.logoutButtonMobile = this.element.querySelector(constants.logoutButtonMobile);
    this.logoutButton.addEventListener('click', function () {
      document.dispatchEvent(new Event(EVENTS.logoutClicked));
    });
    this.logoutButtonMobile.addEventListener('click', function () {
      document.dispatchEvent(new Event(EVENTS.logoutClicked));
    });
    this.userNames = this.element.querySelectorAll(constants.userNames);
  }

  render(props) {
    let isLoggedIn = props.isLoggedIn;
    let userName = props.userName;
    if (isLoggedIn) {
      this.authButton.forEach(x => x.hide());
      this.savedNewsButton.classList.remove(constants.invisible);
      this.savedNewsButtonMobile.classList.remove(constants.invisible);
      this.logoutButton.classList.remove(constants.invisible);
      this.logoutButtonMobile.classList.remove(constants.invisible);
      for (let userNameTag of this.userNames) {
        userNameTag.textContent = userName;
      }
    } else {
      this.authButton.forEach(x => x.show());
      this.savedNewsButton.classList.add(constants.invisible);
      this.savedNewsButtonMobile.classList.add(constants.invisible);
      this.logoutButton.classList.add(constants.invisible);
      this.logoutButtonMobile.classList.add(constants.invisible);
    }
  }
}

export default Header;
