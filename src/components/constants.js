export {
  formElEdit,
  formNewPlace,
  inputNewCard,
  inputLinkCard,
  cardsContainer,
  editPopup,
  editPopupButton,
  closePopupProfileButton,
  buttonClosePopupList,
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
  avatarUrl,
  popupImage,
  popupCaption,
  popupTypeImage,
};

const formElEdit = document.forms["edit-profile"];
const formNewPlace = document.forms["new-place"];
const inputNewCard = formNewPlace["place-name"];
const inputLinkCard = formNewPlace["link"];
const formEditAvatar = document.forms["avatar"];

const cardsContainer = document.querySelector(".places__list");

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupTypeAvatar = document.querySelector(".popup_type_avatar");
const editPopup = document.querySelector(".popup_type_edit");
const editPopupButton = document.querySelector(".profile__edit-button");
const closePopupProfileButton = editPopup.querySelector(".popup__close");
const buttonClosePopupList = document.querySelectorAll(".popup__close");
const profileAddButton = document.querySelector(".profile__add-button");
const profileAdd = document.querySelector(".popup_type_new-card");

const cardName = document.querySelector(".popup__input_type_card-name");
const cardURL = document.querySelector(".popup__input_type_url");
const avatarUrl = popupTypeAvatar.querySelector(".popup__input_type_url"); // Внимание на класс

const profileAvatar = document.querySelector(".profile__image");
const profileName = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__description");

const nameInput = formElEdit.elements.name;
const jobInput = formElEdit.elements.description;
