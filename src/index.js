import './index.css';
import { initialCards } from './components/cards.js';
// import { enableValidation } from './components/validation.js'
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



const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}


function showInputError(validationConfig, formSelector, inputSelector, errorMessage) {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`)
    inputSelector.classList.add(validationConfig.inputErrorClass)
    errorElement.classList.add(validationConfig.errorClass)
    errorElement.textContent = errorMessage;
}


function hideInputError(validationConfig, formSelector, inputSelector){

    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`)
    inputSelector.classList.remove(validationConfig.inputErrorClass)
    errorElement.classList.remove(validationConfig.errorClass)
    errorElement.textContent = "";

}

function checkInputValidity(formSelector, inputSelector){
    if (inputSelector.validity.patternMismatch) {
    inputSelector.setCustomValidity(inputSelector.dataset.errorMessage);
  } else {
    inputSelector.setCustomValidity("");
  }
    if (!inputSelector.validity.valid){
        showInputError(validationConfig, formSelector, inputSelector, inputSelector.validationMessage)
    }else{
        hideInputError(validationConfig, formSelector, inputSelector)
    }
}


function hasInvalidInput (inputSelectorList) {
    return inputSelectorList.some((inputSelector) => {
      return !inputSelector.validity.valid
    })
  }
  



function toggleButtonState (validationConfig, inputSelectorList, submitButtonSelector) {
    if (hasInvalidInput(inputSelectorList)){
      submitButtonSelector.classList.add(validationConfig.inactiveButtonClass)
      submitButtonSelector.disabled = true
    } else {
      submitButtonSelector.disabled = false
      submitButtonSelector.classList.remove(validationConfig.inactiveButtonClass)
    }
  }


function setEventListeners(validationConfig, formSelector){
    const inputSelectorList = Array.from(formSelector.querySelectorAll(validationConfig.inputSelector))
    const submitButtonSelector = formSelector.querySelector(validationConfig.submitButtonSelector)
    toggleButtonState (validationConfig, inputSelectorList, submitButtonSelector)
    
    inputSelectorList.forEach((inputSelector) => {
        inputSelector.addEventListener('input', () => {
            checkInputValidity(formSelector, inputSelector)
            toggleButtonState (validationConfig, inputSelectorList, submitButtonSelector)
        })
    })
}

function enableValidation(validationConfig){
    const formSelectorList = Array.from(document.querySelectorAll(validationConfig.formSelector))
    
    formSelectorList.forEach((formSelector) => {

        formSelector.addEventListener('submit', (e) => {
            e.preventDefault();
        });
       setEventListeners(validationConfig, formSelector);
    })
}


enableValidation(validationConfig); 


