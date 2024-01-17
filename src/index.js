import './index.css';
import { initialCards, createCard, deleteCard } from './components/cards.js';
import { handleFormSubmit, closePopup, openPopup, returnName } from './components/modal.js';


const formElEdit = document.forms['edit-profile']
const newPlace = document.forms['new-place']
const inputNewCard = newPlace['place-name']
const inputLinkCard = newPlace['link']



const placesList = document.querySelector('.places__list');


const editPopup = document.querySelector('.popup_type_edit');
const editPopupButton = document.querySelector('.profile__edit-button');
const closePopupProfileButton = editPopup.querySelector('.popup__close')
const closePopupButton = document.querySelectorAll('.popup__close');
const profileAddButton = document.querySelector('.profile__add-button');
const profileAdd = document.querySelector('.popup_type_new-card');



// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
    placesList.append(createCard(item, deleteCard));
});

// Повесили прослушку на ссылку кнопки добавления карточек
profileAddButton.addEventListener("click", () => {
    openPopup(profileAdd)

})

// Повесили прослушку на ссылку кнопки редактирования карточки 
editPopupButton.addEventListener("click", () => {
    openPopup(editPopup)
})

// Повесели прослушку на ссылку каждого элемента псевдомассива из кнопок для закрытия(крестики)
closePopupButton.forEach((el) => {
    el.addEventListener("click", () => {
        closePopup((el.closest('.popup')))
    })
})


// Повесели прослушку на ссылку к форме 
formElEdit.addEventListener("submit", handleFormSubmit)

// Добавили прослушку, на кнопку закрытие попапа "Редактирование профиля"
closePopupProfileButton.addEventListener("click", returnName)

// Объявили функцию, которая собирает добвленную карточку

function createNewCard(evt) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode('true');
    const newCard = createCard(initialCards[0], deleteCard)

    evt.preventDefault()

    initialCards.unshift({ name: inputNewCard.value, link: inputLinkCard.value })


    cardElement.insertBefore(newCard, cardElement.firstChild);

    closePopup(profileAdd)
    placesList.append(createCard(initialCards[0], deleteCard));
    newPlace.reset()
}


// Повесели прослушку на ссылку к модальному окну, попапа добавления карточек
newPlace.addEventListener("submit", createNewCard)




