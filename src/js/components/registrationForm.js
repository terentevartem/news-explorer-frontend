import Popup     from './popup';
import validator from "validator/es";

class RegistrationForm extends Popup {
  constructor(props) {
    super(props.element);
    this.api = props.api;
    this.errorField = this.element.querySelector('.auth-form__error_main');
    this.inputs = this.element.querySelectorAll('.auth-form__input');
    this.submitButton = this.element.querySelector('.auth-form__button');

    this.form = this.element.querySelector('.auth-form');
    this.form.onsubmit = this.signUp.bind(this);
    this.nameInput = this.element.querySelector('.auth-form__input_name');
    this.nameError = this.element.querySelector('.auth-form__error_name');
    this.nameRequired = this.element.querySelector('.auth-form__required_name');
    this.emailInput = this.element.querySelector('.auth-form__input_email');
    this.emailError = this.element.querySelector('.auth-form__error_email');
    this.emailRequired = this.element.querySelector('.auth-form__required_email');
    this.passwordInput = this.element.querySelector('.auth-form__input_password');
    this.passwordError = this.element.querySelector('.auth-form__error_password');
    this.passwordRequired = this.element.querySelector('.auth-form__required_password');
    this.nameInput.addEventListener('input', this.validateName.bind(this));
    this.emailInput.addEventListener('input', this.validateEmail.bind(this));
    this.passwordInput.addEventListener('input', this.validatePassword.bind(this));
  }

  async signUp(event) {
    event.preventDefault();
    const data = {};
    for (let input of this.inputs) {
      data[input.name] = input.value;
    }
    let result = await this.api.signUp(data).catch(error => {
      this.errorField.textContent = error.message;
    });

  }

  show() {
    super.show();
    for (let input of this.inputs) {
      input.value = '';
    }
  }

  validateEmail(event) {
    const input = event.target;
    if (validator.isEmail(input.value)) {
      input.classList.remove('auth-form__input_invalid');
      this.emailError.classList.add('invisible');
      this.emailRequired.classList.add('invisible');
    } else {
      input.classList.add('auth-form__input_invalid');
      if (input.value.length === 0) {
        this.emailRequired.classList.remove('invisible');
        this.emailError.classList.add('invisible');
      } else {
        this.emailError.classList.remove('invisible');
        this.emailRequired.classList.add('invisible');
      }
    }
    this.validateForm();
  }

  validateName(event) {
    const input = event.target;
    if (validator.isLength(input.value, {min: 2, max: 30})) {
      input.classList.remove('auth-form__input_invalid');
      this.nameError.classList.add('invisible');
      this.nameRequired.classList.add('invisible');
    } else {
      if (input.value.length === 0) {
        this.nameRequired.classList.remove('invisible');
        this.nameError.classList.add('invisible');
      } else {
        this.nameError.classList.remove('invisible');
        this.nameRequired.classList.add('invisible');
      }
      input.classList.add('auth-form__input_invalid');
    }
    this.validateForm();
  }

  validatePassword(event) {
    const input = event.target;
    if (validator.isLength(input.value, {min: 2, max: 30})) {
      input.classList.remove('auth-form__input_invalid');
      this.passwordError.classList.add('invisible');
      this.passwordRequired.classList.add('invisible');
    } else {
      if (input.value.length === 0) {
        this.passwordRequired.classList.remove('invisible');
        this.passwordError.classList.add('invisible');
      } else {
        this.passwordError.classList.remove('invisible');
        this.passwordRequired.classList.add('invisible');
      }
      input.classList.add('auth-form__input_invalid');
    }
    this.validateForm();
  }

  validateForm() {
    const invalidInputs = this.element.querySelectorAll('.auth-form__input_invalid');
    if (invalidInputs.length > 0) {
      this.submitButton.classList.add('auth-form__button_invalid');
    } else {
      this.submitButton.classList.remove('auth-form__button_invalid');
    }
  }
}

export default RegistrationForm;
