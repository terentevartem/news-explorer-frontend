import Popup  from './popup';
import EVENTS from '../events';
import constants from '../constants';

class AuthForm extends Popup {
  constructor(props) {
    super(props.element);
    document.addEventListener(EVENTS.authButtonClicked, this.show.bind(this));
    this.api = props.api;
    this.errorField = this.element.querySelector(constants.authFormError);
    this.inputs = this.element.querySelectorAll(constants.authFormInput);
    this.form = this.element.querySelector(constants.authForm);
    this.form.onsubmit = this.signIn.bind(this);
  }

  show() {
    super.show();
    for (let input of this.inputs) {
      input.value = '';
    }
  }

  async signIn(event) {
    event.preventDefault();
    const data = {};
    for (let input of this.inputs) {
      data[input.name] = input.value;
    }
    await this.api.signIn(data).then(() => {
      this.errorField.textContent = constants.authFormAuthorized;
      document.dispatchEvent(new CustomEvent(EVENTS.authChanged, {detail: {isLoggedIn: true}}));
      this.hide();
    }).catch(error => {
      this.errorField.textContent = error.message;
    });
  }
}

export default AuthForm;
