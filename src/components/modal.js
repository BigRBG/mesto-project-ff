import {
    profileName,
    profileProfession,
    nameInput,
    jobInput
} from './constants.js'

export { closePopup, openPopup, fillEditFormInputs, showSavingText, hideSavingText }




function showSavingText() {
    const buttonSaveId = Array.from(document.querySelectorAll('.button__save'))
    buttonSaveId.forEach((button) => {
        button.textContent = 'Сохранение...'
    })
}

function hideSavingText() {
    const buttonSaveId = Array.from(document.querySelectorAll('.button__save'))
    buttonSaveId.forEach((button) => {
        button.textContent = 'Сохранить'
    })
}


//Функция, удаляющая класс, ответственный за открытие попапа

function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened')
    document.removeEventListener("keydown", closeModalButton)
    popupElement.removeEventListener("mousedown", closePopupOutsideContent)

}


//Функция, добавляющая класс, ответственный за открытие попапа

function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened')
    document.addEventListener("keydown", closeModalButton)
    popupElement.addEventListener("mousedown", closePopupOutsideContent)
}

// Функция закрытия попапа кликом, вне контента

function closePopupOutsideContent(e) {
    if (!e.target.closest('.popup__content')) {
        closePopup(e.target.closest('.popup'))
    }
};

// Объявили функцию - прямая трансляция,  данные в поля для ввода берутся из введенных ранее)

function fillEditFormInputs() {
    jobInput.value = profileProfession.textContent
    nameInput.value = profileName.textContent

}

// Функция, закрытия попапа кнопкой ESC

function closeModalButton(evt) {
    const popupIsOpen = document.querySelector('.popup_is-opened')
    const ESC = "Escape"
    if (evt.key === ESC && popupIsOpen !== null) {
        popupIsOpen.classList.remove("popup_is-opened");
    }
}

