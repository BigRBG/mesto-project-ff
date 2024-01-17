import { openPopup } from "./modal.js";
export { createCard, deleteCard, likeButtonCard, openPopupCardImage }

// @todo: Функция создания карточки

function createCard(item, deleteCard, likeButtonCard, openPopupCardImage) {

    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode('true');  // Из шаблона создаем копию карточки
    const cardImage = cardElement.querySelector('.card__image');                // Находим путь к изображению
    const buttonDelete = cardElement.querySelector('.card__delete-button');     // Находим в копии карточки кнопку удаления.
    const likeButton = cardElement.querySelector('.card__like-button')
    cardElement.querySelector('.card__title').textContent = item.name;          // Обращаемся к исходному массиву и присываевыем ссылку на наименования
    cardImage.src = item.link;                                                  // Обращаемся к исходному массиву и присываевыем ссылку на значение Картинки
    cardImage.alt = item.name;

    buttonDelete.addEventListener('click', deleteCard);                         // Ставим прослушку на кнопку удаления скопированной карточки
    likeButton.addEventListener('click', likeButtonCard)
    cardImage.addEventListener('click', openPopupCardImage);

    return cardElement;                                                         // возвращаем карточку с её новыми значениями и прослушкой
}


// @todo: Функция удаления карточки

function deleteCard(event) {
    const listItem = event.target.closest('.places__item');                     // Объявляем переменную, которая при выполнении события - возвращает ссылку на предмет события, который в свою очередь 
    listItem.remove();                                                          // является предметом метода closest
}

// Функцонал кнопки лайка карточки

function likeButtonCard(evt) {
    if (evt.target.classList.contains("card__like-button")) {
        evt.target.classList.toggle("card__like-button_is-active");
    }
}

// Функция открытия попапа изображения карточки

function openPopupCardImage(evt) {
    const popupImage = document.querySelector('.popup__image')
    const popupTypeImage = document.querySelector('.popup_type_image')
    const popupCaption = document.querySelector('.popup__caption')
    const cardImageTarget = evt.target.closest('.card__image')

    popupImage.alt = cardImageTarget.alt
    popupCaption.textContent = cardImageTarget.alt
    popupImage.src = cardImageTarget.src
    openPopup(popupTypeImage)
}