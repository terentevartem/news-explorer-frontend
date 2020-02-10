import BaseComponent from "./basecomponent";
import EVENTS        from "../events";

class AuthButton extends BaseComponent {
  constructor(props) {
    super(props.element);
    this.element.addEventListener('click', function () {
      document.dispatchEvent(new Event(EVENTS.authButtonClicked));
    });
  }
}

export default AuthButton
