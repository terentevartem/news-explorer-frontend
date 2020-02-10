import BaseComponent from "./basecomponent";
import MobileMenu    from "./mobilemenu";
import AuthButton    from "./authButton";

class Header extends BaseComponent {
  constructor(props) {
    super(props.element);
    const popupMenuMobile = new MobileMenu({element: this.element.querySelector('.menu__mobile')});
    const menuMobileButton = this.element.querySelector('.menu__mobile-button');

    menuMobileButton.addEventListener('click', function () {
      popupMenuMobile.show();
    });

    this.authButton = new AuthButton({element: this.element.querySelector('.menu-button__authorization')});
    this.savedNewsButton = this.element.querySelector('.menu-button__saved-news');
    this.loggedInDiv = this.element.querySelector('.menu-button__logout');
  }

  render(props) {
    let isLoggedIn = props.isLoggedIn;
    let userName = props.userName;
    if (isLoggedIn) {
      this.authButton.hide();
      this.savedNewsButton.classList.remove('invisible');
      this.loggedInDiv.classList.remove('invisible');
    } else {
      this.authButton.show();
      this.savedNewsButton.classList.add('invisible');
      this.loggedInDiv.classList.add('invisible');
    }

  }
}

export default Header;
