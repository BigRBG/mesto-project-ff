import './index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, likeButtonCard, openPopupCardImage } from './components/card.js';
import { handleProfileFormSubmit, closePopup, openPopup, fillEditFormInputs } from './components/modal.js';
import {
    formElEdit,
    newPlace,
    inputNewCard,
    inputLinkCard,
    placesList,
    editPopup,
    editPopupButton,
    closePopupProfileButton,
    closePopupButton,
    profileAddButton,
    profileAdd
} from './components/constants.js'

// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
    placesList.append(createCard(item, deleteCard, likeButtonCard, openPopupCardImage));
});

// Повесили прослушку на ссылку кнопки добавления карточек
profileAddButton.addEventListener("click", () => {
    openPopup(profileAdd)

})

// Повесили прослушку на ссылку кнопки редактирования карточки 
editPopupButton.addEventListener("click", () => {
    fillEditFormInputs()
    openPopup(editPopup)
})

// Повесели прослушку на ссылку каждого элемента псевдомассива из кнопок для закрытия(крестики)
closePopupButton.forEach((el) => {
    el.addEventListener("click", () => {
        closePopup((el.closest('.popup')))
    })
})


// Повесели прослушку на ссылку к форме 
formElEdit.addEventListener("submit", handleProfileFormSubmit)

// Добавили прослушку, на кнопку закрытие попапа "Редактирование профиля"
closePopupProfileButton.addEventListener("click", fillEditFormInputs)

// Объявили функцию, которая собирает добвленную карточку

function createNewCard(evt) {
    const plusCard = { name: inputNewCard.value, link: inputLinkCard.value }
    const newCard = createCard(plusCard, deleteCard, likeButtonCard, openPopupCardImage)

    evt.preventDefault()

    closePopup(profileAdd)
    placesList.prepend(newCard);
    newPlace.reset()
}


// Повесели прослушку на ссылку к модальному окну, попапа добавления карточек
newPlace.addEventListener("submit", createNewCard)





