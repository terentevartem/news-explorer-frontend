import Popup      from "./popup";
import AuthButton from "./authButton";

class MobileMenu extends Popup {
  constructor(props) {
    super(props.element);
    new AuthButton({element: this.element.querySelector('.mobile-popup__button-auth')});
  }
}

export default MobileMenu
