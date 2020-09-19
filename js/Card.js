'use strict';
class Card {
  constructor(card, openPopup, placesList) {
    this.name = card.name;
    this.link = card.link;
    this.placeCard = null;
    this.openPopup = openPopup;
    this.placesList = placesList;
  }

  create() {
    if (this.placeCard) return this.placeCard;

    const placeCard = document.createElement('div');
    this.placeCard = placeCard;
    placeCard.classList.add('place-card');
    const cardImage = document.createElement('div');
    cardImage.classList.add('place-card__image');

    cardImage.style.backgroundImage = `url('${this.link}')`;
    const deleteIcon = document.createElement('button');
    deleteIcon.classList.add('place-card__delete-icon');
    const cardDescription = document.createElement('div');
    const cardName = document.createElement('h3');
    const likeIcon = document.createElement('button');
    cardDescription.classList.add('place-card__description');
    cardName.classList.add('place-card__name');
    cardName.textContent = this.name;
    likeIcon.classList.add('place-card__like-icon');
    placeCard.appendChild(cardImage);
    cardImage.appendChild(deleteIcon);
    placeCard.appendChild(cardDescription);
    cardDescription.appendChild(cardName);
    cardDescription.appendChild(likeIcon);

    likeIcon.addEventListener('click', this.like);
    deleteIcon.addEventListener('click', (event) => {
      this.remove(event, this.placesList)
    });
    cardImage.addEventListener('click', this.openPopup);

    return this.placeCard;
  }

  //лайк карточки
  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  //удаление карточки
  remove = (event, placesList) => {
    const parent = event.target.closest('.place-card');
    placesList.removeChild(parent);
    parent
      .querySelector('.place-card__like-icon')
      .removeEventListener('click', this.like);
    parent
      .querySelector('.place-card__image')
      .removeEventListener('click', this.openPopup);
    event.target.removeEventListener('click', this.remove);
  };
}