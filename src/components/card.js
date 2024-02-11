import { openPopup } from "./modal.js";
import { removeLike, deleteCardData, setLike } from "./api.js";
export { createCard, deleteCard, likeButtonCard, openPopupCardImage };

// @todo: Функция создания карточки
const cardTemplate = document.querySelector("#card-template").content;
const popupImage = document.querySelector(".popup__image");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupCaption = document.querySelector(".popup__caption");

function createCard(
  card,
  deleteCard,
  likeButtonCard,
  openPopupCardImage,
  userId,
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  cardElement.querySelector(".card__title").textContent = card.name;
  const likeCounter = cardElement.querySelector(".card__like-counter");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  likeCounter.textContent = card.likes.length;

  if (card.owner._id === userId) {
    buttonDelete.addEventListener("click", () => {
      deleteCard(card._id, cardElement);
    });
  } else {
    buttonDelete.classList.add("card__delete-button-hide");
  }
  // Сверили Id autor карточки и Id user, если true, позволяем ему удалить свою карту. False - скрываем кнопку удаления

  const isLiked = card.likes.some((like) => like._id === userId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }
  // Объявили переменную, которая сравнивает Id лайка с Id пользователя, если в павде - то при загрузке карточки зачерняет лайк.

  likeButton.addEventListener("click", () =>
    likeButtonCard(card._id, likeButton, likeCounter),
  );
  // Повесели слушател, чтобы сердце билось при клике.

  cardImage.addEventListener("click", () => openPopupCardImage(card));
  // Повесели слушатель для раскрытия высоты и ширны image карточки при клике по картинке

  return cardElement;
}

// Функция открытия попапа изображения карточки

function openPopupCardImage(card) {
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;
  popupImage.src = card.link;
  openPopup(popupTypeImage);
}

// Функция для функционирования сердца у карточек.

function likeButtonCard(cardId, likeButton, likeCounter) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active"); // Коли Правда, Толи Ложь. Если у Коли есть такой класс- то счетчик убирает лайк
  const likeIf = isLiked ? removeLike : setLike; // Если у Толи правда, значит лайк добавляется
  likeIf(cardId)
    .then((card) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = card.likes.length;
    })
    .catch(console.error);
}

// Функция - "Я твою карточку по IP(ID) вычислю и удалю"

function deleteCard(cardId, cardElement) {
  deleteCardData(cardId)
    .then(() => cardElement.remove())
    .catch(console.error);
}
