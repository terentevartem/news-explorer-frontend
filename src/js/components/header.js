import BaseComponent from "./basecomponent";
import MobileMenu    from "./mobilemenu";
import AuthButton    from "./authbutton";
import EVENTS        from "../events";
import constants from "../constants";

class Header extends BaseComponent {
  constructor(props) {
    super(props.element);
    const popupMenuMobile = new MobileMenu({element: this.element.querySelector(constants.popupMenuMobile)});
    const menuMobileButton = this.element.querySelector(constants.menuMobileButton);

    menuMobileButton.addEventListener('click', function () {
      popupMenuMobile.show();
    });

    const authButtonElement = this.element.querySelector(constants.authButtonElement);
    if (authButtonElement) {
      this.authButton = new AuthButton({element: authButtonElement});
    }
    this.savedNewsButton = this.element.querySelector(constants.savedNewsButton);
    this.logoutButton = this.element.querySelector(constants.logoutButton);
    this.logoutButton.addEventListener('click', function () {
      document.dispatchEvent(new Event(EVENTS.logoutClicked));
    });
    this.userNames = this.element.querySelectorAll(constants.userNames);
  }

  render(props) {
    let isLoggedIn = props.isLoggedIn;
    let userName = props.userName;
    if (isLoggedIn) {
      if (this.authButton) {
        this.authButton.hide();
      }
      this.savedNewsButton.classList.remove(constants.invisible);
      this.logoutButton.classList.remove(constants.invisible);
      for (let userNameTag of this.userNames) {
        userNameTag.textContent = userName;
      }
    } else {
      if (this.authButton) {
        this.authButton.show();
      }
      this.savedNewsButton.classList.add(constants.invisible);
      this.logoutButton.classList.add(constants.invisible);
    }
  }
}

export default Header;
