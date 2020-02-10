import Popup  from './popup';
import EVENTS from '../events';

class AuthForm extends Popup {
  constructor(props) {
    super(props.element);
    document.addEventListener(EVENTS.authButtonClicked, this.show.bind(this));
    this.api = props.api;
    this.errorField = this.element.querySelector('.auth-form__error');
    this.inputs = this.element.querySelectorAll('.auth-form__input');
    console.log(this.inputs);
    this.form = this.element.querySelector('.auth-form');
    this.form.onsubmit = this.signIn.bind(this);
  }

  async signIn(event) {
    event.preventDefault();
    const data = {};
    for (let input of this.inputs) {
      data[input.name] = input.value;
    }
    await this.api.signIn(data).then(() => {
      this.errorField.textContent = 'Authorized';
      document.dispatchEvent(new Event(EVENTS.authComplete));
    }).catch(error => {
      this.errorField.textContent = error.message;
    });
  }
}

export default AuthForm;
