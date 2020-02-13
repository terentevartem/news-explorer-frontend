import BaseComponent from "./basecomponent";
import MobileMenu    from "./mobilemenu";
import AuthButton    from "./authButton";
import EVENTS        from "../events";

class Header extends BaseComponent {
  constructor(props) {
    super(props.element);
    const popupMenuMobile = new MobileMenu({element: this.element.querySelector('.menu__mobile')});
    const menuMobileButton = this.element.querySelector('.menu__mobile-button');

    menuMobileButton.addEventListener('click', function () {
      popupMenuMobile.show();
    });

    const authButtonElement = this.element.querySelector('.menu-button__authorization');
    if (authButtonElement) {
      this.authButton = new AuthButton({element: authButtonElement});
    }
    this.savedNewsButton = this.element.querySelector('.menu-button__saved-news');
    this.logoutButton = this.element.querySelector('.menu-button__logout');
    this.logoutButton.addEventListener('click', function () {
      document.dispatchEvent(new Event(EVENTS.logoutClicked));
    });
    this.userNames = this.element.querySelectorAll('.user_name');
  }

  render(props) {
    let isLoggedIn = props.isLoggedIn;
    let userName = props.userName;
    if (isLoggedIn) {
      if (this.authButton) {
        this.authButton.hide();
      }
      this.savedNewsButton.classList.remove('invisible');
      this.logoutButton.classList.remove('invisible');
      for (let userNameTag of this.userNames) {
        userNameTag.textContent = userName;
      }
    } else {
      if (this.authButton) {
        this.authButton.show();
      }
      this.savedNewsButton.classList.add('invisible');
      this.logoutButton.classList.add('invisible');
    }
  }
}

export default Header;
