import BaseComponent from "./basecomponent";

class Popup extends BaseComponent {
  constructor(element) {
    super(element);
    this.closeButton = this.element.querySelector('.button_close');
    this.closeButton.onclick = this.hide.bind(this);
  }
}

export default Popup;
