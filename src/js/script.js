"use strict";
import Api from './Api.js'
import Card from './Card.js'
import CardList from './CardList.js'
import FormValidator from './FormValidator.js'
import Popup from './Popup.js'
import UserInfo from './UserInfo.js'
import '../pages/index.css'



(function () {
  const form = document.querySelector(".popup__form");
  const placesList = document.querySelector(".places-list");
  const formNew = document.forms.new;
  const formUser = document.forms.user;
  const serverUrl = NODE_ENV === 'development' ? 'http://nomoreparties.co' : 'https://nomoreparties.co';
  const errorMessages = {
    empty: "Это обязательное поле",
    wrongLength: "Должно быть от 2 до 30 символов",
    wrongUrl: "Здесь должна быть ссылка",
  };

  const configApi = {
    baseUrl: `${serverUrl}/cohort12`,
    group: "cohort12",
    headers: {
      authorization: "15b5eef2-5460-414d-ad05-f2f2d35f06c9",
      "Content-Type": "application/json",
    },
  };

  const api = new Api(configApi);

  const userInfo = new UserInfo(
    document.querySelector(".user-info__name"),
    document.querySelector(".user-info__job"),
    document.querySelector(".user-info__photo")
  );

  const getUser = async () => {
    try {
      const user = await api.getData();
      userInfo.setUserInfo(user.name, user.about, user.avatar);
      userInfo.updateUserInfo();
      console.log(user);
    } catch (error) {
      console.log(error);
    }

  };
  getUser();

  const cardList = new CardList(placesList);

  const getCards = async () => {
    try {
      const cards = await api.getData("cards");
      const initial = [...cards].map((card) => new Card(card, openPopup, placesList).create());
      cardList.render(initial);
    } catch (error) {
      console.log(error);
    }

  };
  getCards();


  //открытие формы
  const popupButton = document.querySelector(".popup__button");
  const userInfoButton = document.querySelector(".user-info__button");
  const popup = new Popup(document.querySelector(".popup"));
  userInfoButton.addEventListener("click", function (event) {
    popup.open();
    popupButton.setAttribute("disabled", true);
  });

  //закрытие формы
  const popupClose = document.querySelector(".popup__close");
  popupClose.addEventListener("click", function (event) {
    popup.close();
    errorReset();
  });

  //добавление карточки пользователем
  function addNewCard(event) {
    event.preventDefault();
    const name = form.elements.name;
    const link = form.elements.link;
    if (name.value.length === 0 || link.value.length === 0) {
      return;
    }
    cardList.addCard(new Card({
      name: name.value,
      link: link.value
    }, openPopup, placesList).create());
    popup.close();
  }
  formNew.addEventListener("submit", addNewCard);

  //открытие формы редактирования профиля

  const editPopupButton = document.querySelector(".edit-popup__button");
  const editPopup = new Popup(document.querySelector(".edit-popup"));
  const userEditButton = document.querySelector(".user-edit__button");


  userEditButton.addEventListener("click", function () {
    editPopupInputName.value = userInfo.name;
    editPopupInputAbout.value = userInfo.job;
    editPopup.open();
  });
  //Закрыие формы ред проф
  const editPopupClose = document.querySelector(".edit-popup__close");
  editPopupClose.addEventListener("click", function () {
    editPopup.close();
    errorReset();
    editPopupButton.disabled = false;
    editPopupButton.classList.add(`popup__button_valid`);
  });

  function errorReset() {
    const errors = document.querySelectorAll(".error");
    errors.forEach((error) => {
      error.textContent = "";
    });
  }
  //добавление нового пользователя**********************************************
  const editPopupInputName = document.querySelector(".edit-popup__input_name");
  const editPopupInputAbout = document.querySelector(
    ".edit-popup__input_about"
  );
  const editPopupInputAvatar = document.querySelector(
    ".edit-popup__input_avatar"
  );

  function addNewUser(event) {
    event.preventDefault();
    const setNewUser = (name, about, avatar) => {
      userInfo.setUserInfo(name, about, avatar);
      userInfo.updateUserInfo();
      editPopup.close();
    };


    const setUser = async () => {
      try {
        const data = {
          name: editPopupInputName.value,
          about: editPopupInputAbout.value,
          avatar: editPopupInputAvatar.value,
        };
        api.setUser(data, setNewUser);
      } catch {
        console.log(error);
      }
    }
    setUser();
  }
  formUser.addEventListener("submit", addNewUser);
  // Открытие попапа по нажатию на картинку**************************************************
  const popupImageContent = document.querySelector(".popup__image-content");
  const imagePopup = new Popup(document.querySelector(".image-popup"));

  function openPopup(event) {
    console.log(33);

    if (event.target.classList.contains("place-card__image")) {
      imagePopup.open();
      popupImageContent.style = event.target.getAttribute("style");
    }
  }

  //Закрыие папопа с картинкой

  const imagePopupClose = document.querySelector(".image-popup__close");
  imagePopupClose.addEventListener("click", function (event) {
    imagePopup.close();
  });

  const validatorNew = new FormValidator(formNew, errorMessages);
  validatorNew.setEventListeners();
  const validatorUser = new FormValidator(formUser, errorMessages);
  validatorUser.setEventListeners();
})();