import BaseComponent from "./basecomponent";
import constants from "../constants";

class Popup extends BaseComponent {
  constructor(element) {
    super(element);
    this.closeButton = this.element.querySelector(constants.closeButton);
    this.closeButton.onclick = this.hide.bind(this);
  }
}

export default Popup;
