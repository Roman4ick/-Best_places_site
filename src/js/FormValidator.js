"use strict";
//КЛАСС ДЛЯ ВАЛИДАЦИИ ФОРМ***********************************************************
export default class FormValidator {
  constructor(form, messages) {
    this.form = form;
    this.button = form.querySelector(".button");
    this.errorMessages = messages;
  }

  //Функция добавления/удаления ошибки с инпута
  checkInputValidity() {
    this.setSubmitButtonState();
    const inputs = [...this.form.elements];
    inputs.forEach((input) => {
      const errorElem = document.querySelector(
        `.error[data-for="${input.name}"]`
      );
      if (errorElem) {
        errorElem.textContent = input.validationMessage;
      }
    });
  }

  //Функция проверки поля на ошибки
  isValidate(input) {
    input.setCustomValidity("");
    if (input.validity.valueMissing) {
      input.setCustomValidity(this.errorMessages.empty);
      return false;
    }
    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity(this.errorMessages.wrongLength);
      return false;
    }
    if (input.validity.typeMismatch && input.type === "url") {
      input.setCustomValidity(this.errorMessages.wrongUrl);

      return false;
    }
    return input.checkValidity();
  }

  // Функци активации и деактивации кнопки
  setSubmitButtonState() {
    const [...inputs] = this.form.elements;
    if (inputs.every(
        (input) =>
        input.type === "submit" ||
        input.type === "button" ||
        this.isValidate(input)
      )) {
      console.log("Кнопка активирована");
      this.button.removeAttribute("disabled");
      this.button.classList.add(`popup__button_valid`);
      this.button.classList.remove(`popup__button_invalid`);
    } else {
      console.log("Кнопка деактивирована");
      this.button.setAttribute("disabled", true);
      this.button.classList.add(`popup__button_invalid`);
      this.button.classList.remove(`popup__button_valid`)
    }
  }

  //Функция отправки формы
  sendForm(event) {
    event.preventDefault();
    const [...inputs] = this.form.elements;
    const isValid = inputs.every(
      (input) =>
      input.type === "submit" ||
      input.type === "button" ||
      this.isValidate(input)
    );
    if (isValid) {
      console.log("Форма успешно добавлена!");
      this.form.reset();
    } else {
      console.log("Форма не прошла валидацию ");

    }
  }

  setEventListeners() {
    this.form.addEventListener("input", () => this.checkInputValidity(), true);
    this.form.addEventListener("submit", (e) => this.sendForm(e), true);
  }
}