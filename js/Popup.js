'use strict';

class Popup {
  constructor(element) {
    this.element = element;
  }

  open() {
    this.element.classList.add('popup_is-opened');
  }

  close() {
    this.element.classList.remove('popup_is-opened');
  }
}
