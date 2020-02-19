import constants from "../constants";

class BaseComponent {
  constructor(element) {
    this.element = element;
  }

  show() {
    this.element.classList.remove(constants.invisible);
  }

  hide() {
    this.element.classList.add(constants.invisible);
  }
}

export default BaseComponent
