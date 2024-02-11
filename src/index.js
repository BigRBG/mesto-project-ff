import "./index.css";
import {
  getCards,
  getInfoProfile,
  setProfileInfo,
  postCard,
  updateAvatarProfile,
} from "./components/api.js";

import {
  enableValidation,
  validationConfig,
  clearValidation,
} from "./components/validation.js";

import { createCard, deleteCard, likeButtonCard } from "./components/card.js";

import { closePopup, openPopup } from "./components/modal.js";

import {
  formEditAvatar,
  formElEdit,
  formNewPlace,
  cardsContainer,
  editPopup,
  editPopupButton,
  buttonClosePopupList,
  profileAddButton,
  profileAdd,
  profileName,
  profileProfession,
  profileAvatar,
  nameInput,
  jobInput,
  cardName,
  cardURL,
  popupTypeAvatar,
  avatarUrl,
  popupImage,
  popupCaption,
  popupTypeImage,
} from "./components/constants.js";

let userId;

const promsInfoProAndCards = [getInfoProfile(), getCards()];

function openPopupCardImage(card) {
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;
  popupImage.src = card.link;
  openPopup(popupTypeImage);
}

// Синхронизовали подгрузку карточек и информации о пользователе, прошлись по массиву из объектов, вытащили необходимые свойства и присоединили данные к DOM
Promise.all(promsInfoProAndCards)
  .then(([profileData, cards]) => {
    profileName.textContent = profileData.name;
    profileProfession.textContent = profileData.about;
    profileAvatar.style.backgroundImage = `url(${profileData.avatar})`;
    userId = profileData._id;

    cards.forEach((card) => {
      cardsContainer.append(
        createCard(
          card,
          deleteCard,
          likeButtonCard,
          openPopupCardImage,
          userId,
        ),
      );
    });
  })
  .catch(console.error);

// Объявили функцию - прямая трансляция,  данные в поля для ввода берутся из введенных ранее)
function fillEditFormInputs() {
  jobInput.value = profileProfession.textContent;
  nameInput.value = profileName.textContent;
}

function showSavingText(button) {
  button.textContent = "Сохранение...";
}

function hideSavingText(button) {
  button.textContent = "Сохранить";
}

// Функция для отправки данных о профиле на сервер
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  showSavingText(evt.target.querySelector(".popup__button"));
  setProfileInfo(nameInput.value, jobInput.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileProfession.textContent = res.about;
      closePopup(editPopup);
    })
    .catch(console.error)
    .finally(() => {
      hideSavingText(evt.target.querySelector(".popup__button"));
    });
}

// Функция для отправки данных о карточке на сервер
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  showSavingText(evt.target.querySelector(".popup__button"));
  postCard(cardName.value, cardURL.value)
    .then((card) => {
      cardsContainer.prepend(
        createCard(
          card,
          deleteCard,
          likeButtonCard,
          openPopupCardImage,
          userId,
        ),
      );
      formNewPlace.reset();
      clearValidation(formNewPlace, validationConfig);
      closePopup(profileAdd);
    })
    .catch(console.error)
    .finally(() => {
      hideSavingText(evt.target.querySelector(".popup__button"));
    });
}

// функция для отправки картинки профиля на сервер
function handleEditAvatar(evt) {
  evt.preventDefault();
  showSavingText(evt.target.querySelector(".popup__button"));
  updateAvatarProfile(avatarUrl.value)
    .then((data) => {
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;
      closePopup(popupTypeAvatar);
      clearValidation(popupTypeAvatar, validationConfig);
      formEditAvatar.reset();
    })
    .catch(console.error)
    .finally(() => {
      hideSavingText(evt.target.querySelector(".popup__button"));
    });
}

// Повесили прослушку на ссылку кнопки добавления карточек
profileAddButton.addEventListener("click", () => {
  openPopup(profileAdd);
});

// Повесили прослушку на ссылку кнопки редактирования профиля
editPopupButton.addEventListener("click", () => {
  clearValidation(formElEdit, validationConfig);
  formElEdit.reset();
  fillEditFormInputs();

  openPopup(editPopup);
});

// Повесели прослушку, на клик по изображению аватара.
profileAvatar.addEventListener("click", () => {
  openPopup(popupTypeAvatar);
});

// Повесели прослушку на ссылку каждого элемента псевдомассива из кнопок для закрытия(крестики)
buttonClosePopupList.forEach((el) => {
  const popup = el.closest(".popup");
  el.addEventListener("click", () => {
    closePopup(popup);
  });
});

formNewPlace.addEventListener("submit", handleCardFormSubmit);
formEditAvatar.addEventListener("submit", handleEditAvatar);
formElEdit.addEventListener("submit", handleProfileFormSubmit);

enableValidation(validationConfig);
