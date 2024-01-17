import { openPopup } from "./modal.js"; 

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];


// @todo: Функция создания карточки

export function createCard(item, deleteCard) {

  const popupTypeImage = document.querySelector('.popup_type_image');
  const popupImage = document.querySelector('.popup__image')
  const popupCaption = document.querySelector('.popup__caption')
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode('true');  // Из шаблона создаем копию карточки
  const buttonDelete = cardElement.querySelector('.card__delete-button');     // Находим в копии карточки кнопку удаления.
  const cardImage = cardElement.querySelector('.card__image');                // Находим путь к изображению
  const likeButton = cardElement.querySelector('.card__like-button')
  cardElement.querySelector('.card__image').src = item.link;                  // Обращаемся к исходному массиву и присываевыем ссылку на значение Картинки
  cardElement.querySelector('.card__image').alt = item.name;
  cardElement.querySelector('.card__title').textContent = item.name;          // Обращаемся к исходному массиву и присываевыем ссылку на наименования

  buttonDelete.addEventListener('click', deleteCard);                         // Ставим прослушку на кнопку удаления скопированной карточки
  likeButton.addEventListener('click', likeButtonCard)
 

  cardImage.addEventListener('click', function () {                           // Открытие попапа изображения карточки
    popupImage.src = item.link
    popupCaption.textContent = item.name
    openPopup(popupTypeImage);
  });
  return cardElement;                                                         // возвращаем карточку с её новыми значениями и прослушкой
}


// @todo: Функция удаления карточки

export function deleteCard(event) {
  const listItem = event.target.closest('.places__item');                     // Объявляем переменную, которая при выполнении события - возвращает ссылку на предмет события, который в свою очередь 
  listItem.remove();                                                          // является предметом метода closest
}

// Функцонал кнопки лайка карточки

export function likeButtonCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}