//Функция, удаляющая класс, ответственный за открытие попапа

function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleCloseModalByEsc);
  popupElement.removeEventListener("mousedown", closePopupOutsideContent);
}

//Функция, добавляющая класс, ответственный за открытие попапа

function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleCloseModalByEsc);
  popupElement.addEventListener("mousedown", closePopupOutsideContent);
}

// Функция закрытия попапа кликом, вне контента

function closePopupOutsideContent(e) {
  if (!e.target.closest(".popup__content")) {
    closePopup(e.target.closest(".popup"));
  }
}

// Функция, закрытия попапа кнопкой ESC

function handleCloseModalByEsc(evt) {
  const popupIsOpen = document.querySelector(".popup_is-opened");
  const ESC = "Escape";
  if (evt.key === ESC && popupIsOpen !== null) {
    closePopup(popupIsOpen);
  }
}

export { closePopup, openPopup };
