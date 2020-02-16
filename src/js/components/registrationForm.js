import Popup     from './popup';
import validator from "validator/es";
import constants from '../constants';

class RegistrationForm extends Popup {
  constructor(props) {
    super(props.element);
    this.api = props.api;
    this.errorField = this.element.querySelector(constants.authFormError);
    this.inputs = this.element.querySelectorAll(constants.authFormInput);
    this.submitButton = this.element.querySelector(constants.authFormSubmitButton);
    this.form = this.element.querySelector(constants.authForm);
    this.form.onsubmit = this.signUp.bind(this);
    this.nameInput = this.element.querySelector(constants.authFormInputName);
    this.nameError = this.element.querySelector(constants.authFormNameError);
    this.nameRequired = this.element.querySelector(constants.authFormNameRequired);
    this.emailInput = this.element.querySelector(constants.authFormEmailInput);
    this.emailError = this.element.querySelector(constants.authFormEmailError);
    this.emailRequired = this.element.querySelector(constants.authFormEmailRequired);
    this.passwordInput = this.element.querySelector(constants.authFormPasswordInput);
    this.passwordError = this.element.querySelector(constants.authFormPasswordError);
    this.passwordRequired = this.element.querySelector(constants.authFormPasswordRequired);
    this.nameInput.addEventListener('input', this.validateName.bind(this));
    this.emailInput.addEventListener('input', this.validateEmail.bind(this));
    this.passwordInput.addEventListener('input', this.validatePassword.bind(this));
  }

  async signUp(event) {
    event.preventDefault();
    const data = {};

    let formIsValid = true;



    for (let input of this.inputs) {
      if (input.name == 'email') {
        if (!this.validateEmail({ target: input })) {
          formIsValid = false;
        }
      }
      if (input.name == 'password' ) {
        if (!this.validatePassword({ target: input }) && formIsValid) {
          formIsValid = false
        }
      }
      if (input.name == 'name' ) {
        if (!this.validateName({ target: input }) && formIsValid) {
          formIsValid = false
        }
      }
      data[input.name] = input.value;
    }
    formIsValid && this.api.signUp(data).then(() => {
      this.errorField.textContent = '';
      this.hide();
    }).catch(error => {
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
    const isValid = validator.isEmail(input.value);
    if (isValid) {
      input.classList.remove(constants.authFormInputInvalid);
      this.emailError.classList.add(constants.invisible);
      this.emailRequired.classList.add(constants.invisible);
    } else {
      input.classList.add(constants.authFormInputInvalid);
      if (input.value.length === 0) {
        this.emailRequired.classList.remove(constants.invisible);
        this.emailError.classList.add(constants.invisible);
      } else {
        this.emailError.classList.remove(constants.invisible);
        this.emailRequired.classList.add(constants.invisible);
      }
    }
    return isValid;
  }

  validateName(event) {
    const input = event.target;
    const isValid = validator.isLength(input.value, {min: constants.validateNameMinLength, max: constants.validateNameMaxLength});
    if (isValid) {
      input.classList.remove(constants.authFormInputInvalid);
      this.nameError.classList.add(constants.invisible);
      this.nameRequired.classList.add(constants.invisible);
    } else {
      if (input.value.length === 0) {
        this.nameRequired.classList.remove(constants.invisible);
        this.nameError.classList.add(constants.invisible);
      } else {
        this.nameError.classList.remove(constants.invisible);
        this.nameRequired.classList.add(constants.invisible);
      }
      input.classList.add(constants.authFormInputInvalid);
    }
    this.validateForm();
    return isValid;
  }

  validatePassword(event) {
    const input = event.target;
    const isValid = validator.isLength(input.value, {min: constants.validatePasswordMinLength, max: constants.validatePasswordMaxLength});
    if (isValid) {
      input.classList.remove(constants.authFormInputInvalid);
      this.passwordError.classList.add(constants.invisible);
      this.passwordRequired.classList.add(constants.invisible);
    } else {
      if (input.value.length === 0) {
        this.passwordRequired.classList.remove(constants.invisible);
        this.passwordError.classList.add(constants.invisible);
      } else {
        this.passwordError.classList.remove(constants.invisible);
        this.passwordRequired.classList.add(constants.invisible);
      }
      input.classList.add(constants.authFormInputInvalid);
    }
    this.validateForm();
    return isValid;
  }

  validateForm() {
    const invalidInputs = this.element.querySelectorAll(constants.authFormInputInvalidAll);
    if (invalidInputs.length > 0) {
      this.submitButton.classList.add(constants.authFormButtonInvalid);
      this.submitButton.disabled = true;
    } else {
      this.submitButton.classList.remove(constants.authFormButtonInvalid);
      this.submitButton.disabled = false;
    }
  }
}

export default RegistrationForm;
