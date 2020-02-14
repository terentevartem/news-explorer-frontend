import Popup      from "./popup";
import AuthButton from "./authbutton";
import constants from "../constants";

class MobileMenu extends Popup {
  constructor(props) {
    super(props.element);
    new AuthButton({element: this.element.querySelector(constants.authButton)});
  }
}

export default MobileMenu
