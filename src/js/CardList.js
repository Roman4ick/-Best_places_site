'use strict';

export default class CardList {
  constructor(placesList) {
    this.placesList = placesList;
  }

  addCard(newCard) {
    this.placesList.appendChild(newCard);
  }

  render(cards) {
    cards.forEach(item => this.addCard(item));
  }
}