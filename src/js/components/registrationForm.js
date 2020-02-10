import Popup from './popup';

class RegistrationForm extends Popup {
  constructor(props) {
    super(props.element);
    this.api = props.api;
    this.errorField = this.element.querySelector('.error');
    this.inputs = this.element.querySelectorAll('.auth-form__input');

    console.log(this.inputs);
    this.form = this.element.querySelector('.auth-form');
    this.form.onsubmit = this.signUp.bind(this);
  }

  async signUp(event) {
    event.preventDefault();
    const data = {};
    for (let input of this.inputs) {
      data[input.name] = input.value;
    }
    let result = await this.api.signUp(data).catch( error => {
      this.errorField.textContent = error.message;
    });
  }
}

export default RegistrationForm;
