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





// formSelector: '.popup__form',
// inputSelector: '.popup__input',
// submitButtonSelector: '.popup__button',
// inactiveButtonClass: 'popup__button_disabled',
// inputErrorClass: 'popup__input_type_error',
// errorClass: 'popup__error_visible'





function hasInvalidInput (inputSelectorList) {
    return inputSelectorList.some((inputSelector) => {
      return !inputSelector.validity.valid
    })
  }
  



function toggleButtonState (inputSelectorList, submitButtonSelector) {


    if (hasInvalidInput(inputSelectorList)){
      submitButtonSelector.classList.add('popup__button_disabled')
      submitButtonSelector.disabled = true
    } else {
      submitButtonSelector.disabled = false
      submitButtonSelector.classList.remove('popup__button_disabled')
    }
  }



function showInputError(formSelector, inputSelector, errorMessage) {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`)
    
    inputSelector.classList.add('popup__input_type_error')
    errorElement.classList.add('popup__error_visible')
    errorElement.textContent = errorMessage;
}


function hideInputError(formSelector, inputSelector){
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`)
    
    inputSelector.classList.remove('popup__input_type_error')
    errorElement.classList.remove('popup__error_visible')
    errorElement.textContent = "";

}



function checkInputValidity(formSelector, inputSelector){

    if (inputSelector.validity.patternMismatch) {
        // встроенный метод setCustomValidity принимает на вход строку
        // и заменяет ею стандартное сообщение об ошибке
    inputSelector.setCustomValidity(inputSelector.dataset.errorMessage);
  } else {
        // если передать пустую строку, то будут доступны
        // стандартные браузерные сообщения
    inputSelector.setCustomValidity("");
  }

    if(!inputSelector.validity.valid){
        showInputError(formSelector, inputSelector, inputSelector.validationMessage)
    }else{
        hideInputError(formSelector, inputSelector)
    }
}

function setEventListeners(formSelector){
    const inputSelectorList = Array.from(formSelector.querySelectorAll('.popup__input'))
    const submitButtonSelector = formSelector.querySelector('.popup__button')
    toggleButtonState (inputSelectorList, submitButtonSelector)
    inputSelectorList.forEach((inputSelector) => {
        inputSelector.addEventListener('input', () => {
            checkInputValidity(formSelector, inputSelector)
            toggleButtonState (inputSelectorList, submitButtonSelector)
        })
    })
}

function enableValidation(){
    const formSelectorList = Array.from(document.querySelectorAll('.popup__form'))

    formSelectorList.forEach((formSelector) => {
        formSelector.addEventListener('submit', (e) => {
            e.preventDefault();
        });
       setEventListeners(formSelector);
    })
}

enableValidation()


