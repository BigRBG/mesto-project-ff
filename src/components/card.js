import { openPopup } from "./modal.js"
import { decCounter, deleteCardData, incCounter } from "./api.js"
export { createCard, deleteCard, likeButtonCard, openPopupCardImage }

// @todo: Функция создания карточки

function createCard(card, deleteCard, likeButtonCard, openPopupCardImage, userId) {


  const cardTemplate = document.querySelector('#card-template').content
  const cardElement = cardTemplate.querySelector('.card').cloneNode('true')
  const cardImage = cardElement.querySelector('.card__image')
  const buttonDelete = cardElement.querySelector('.card__delete-button')
  const likeButton = cardElement.querySelector('.card__like-button')
  cardElement.querySelector('.card__title').textContent = card.name
  const likeCounter = cardElement.querySelector(".card__like-counter")

  cardImage.src = card.link
  cardImage.alt = card.name
  likeCounter.textContent = card.likes.length

 console.log(userId)
 console.log(card.owner)
  if (card.owner._id === userId) {
    buttonDelete.addEventListener("click", () => {
      deleteCard(card._id, cardElement)
    })
  } else {
    buttonDelete.classList.add("card__delete-button-hide")
  }
  // Сверили Id автора карточки и Id пользователя, если автор карточки и есть пользователь, позволяем ему удалить свою карту. В ином случае, скрываем кнопку удаления, чтобы глаза не мазолила.
  
  const likeON = card.likes.some((like) => like._id === userId) 
  if (likeON) {
    likeButton.classList.add("card__like-button_is-active")
  }
  // Объявили переменную, которая сравнивает Id лайка с Id пользователя, если в павде - то при загрузке карточки зачерняет лайк. 

  likeButton.addEventListener("click", () =>
    likeButtonCard(card._id, likeButton, likeCounter)
  )
  // Повесели слушател, чтобы сердце билось при клике. 
  
  cardImage.addEventListener("click", (evt) => openPopupCardImage(evt))
  // Повесели слушатель для раскрытия высоты и ширны image карточки при клике по картинке

  return cardElement
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

// Функция для функционирования сердца у карточек.

function likeButtonCard(cardId, likeButton, likeCounter) {
  const likeON = likeButton.classList.contains("card__like-button_is-active")   // Коли Правда, Толи Ложь. Если у Коли есть такой класс- то счетчик убирает лайк
  const likeIf = likeON ? decCounter : incCounter                               // Если у Толи правда, значит лайк добавляется
  likeIf(cardId)                                                                
    .then((card) => {
      likeButton.classList.toggle("card__like-button_is-active")         
      likeCounter.textContent = card.likes.length
    })
    .catch(console.error)
}

// Функция - "Я твою карточку по IP(ID) вычислю и удалю"

function deleteCard(cardId, cardElement) {
  deleteCardData(cardId)
    .then(() => cardElement.remove())
    .catch(console.error)
}

