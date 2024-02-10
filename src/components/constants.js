export {
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
    formEditAvatar,
    profileName,
    profileProfession,
    nameInput,
    jobInput,
    profileAvatar,
    cardName,
    cardURL,
    popupTypeAvatar,
    AvatarUrl
}

const formElEdit = document.forms['edit-profile']
const newPlace = document.forms['new-place']
const inputNewCard = newPlace['place-name']
const inputLinkCard = newPlace['link']
const formEditAvatar = document.forms['avatar'];

const placesList = document.querySelector('.places__list');

const popupTypeAvatar = document.querySelector(".popup_type_avatar")
const editPopup = document.querySelector('.popup_type_edit');
const editPopupButton = document.querySelector('.profile__edit-button');
const closePopupProfileButton = editPopup.querySelector('.popup__close')
const closePopupButton = document.querySelectorAll('.popup__close');
const profileAddButton = document.querySelector('.profile__add-button');
const profileAdd = document.querySelector('.popup_type_new-card');

const cardName = document.querySelector(".popup__input_type_card-name");
const cardURL = document.querySelector(".popup__input_type_url");
const AvatarUrl = popupTypeAvatar.querySelector(".popup__input_type_url"); // Внимание на класс

const profileAvatar = document.querySelector('.profile__image')
const profileName = document.querySelector('.profile__title')
const profileProfession = document.querySelector('.profile__description')

const nameInput = formElEdit.elements.name
const jobInput = formElEdit.elements.description

