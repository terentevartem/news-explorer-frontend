class BaseComponent {
  constructor(element) {
    this.element = element;
  }

  show() {
    this.element.classList.remove('invisible');
  }

  hide() {
    this.element.classList.add('invisible');
  }
}

export default BaseComponent
