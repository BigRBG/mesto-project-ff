


export {
// Экспорт в Index JS
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
    profileAdd,
// Экспорт в modal JS
    profileName,
    profileProfession,
    nameInput,
    jobInput
}

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

const profileName = document.querySelector('.profile__title')
const profileProfession = document.querySelector('.profile__description')
const nameInput = formElEdit.elements.name
const jobInput = formElEdit.elements.description