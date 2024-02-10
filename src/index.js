import './index.css'
import {
    getCards,
    getInfoProfile,
    outInfoProfile,
    outCards,
    updateAvatarProfile
} from './components/api.js'

import {
    enableValidation,
    validationConfig,
    clearValidation
} from './components/validation.js'

import {
    createCard,
    deleteCard,
    likeButtonCard,
    openPopupCardImage
} from './components/card.js'

import {
    closePopup,
    openPopup,
    fillEditFormInputs,
    showSavingText,
    hideSavingText
} from './components/modal.js'

import {
    formEditAvatar,
    formElEdit,
    newPlace,
    placesList,
    editPopup,
    editPopupButton,
    closePopupProfileButton,
    closePopupButton,
    profileAddButton,
    profileAdd,
    profileName,
    profileProfession,
    profileAvatar,
    nameInput,
    jobInput,
    cardName,
    cardURL,
    popupTypeAvatar,
    AvatarUrl
} from './components/constants.js'

let userId

const promsInfoProAndCards = [getInfoProfile(), getCards()]

Promise.all(promsInfoProAndCards)
    .then(([profileData, cards]) => {                                              
        profileName.textContent = profileData.name
        profileProfession.textContent = profileData.about
        profileAvatar.style.backgroundImage = `url(${profileData.avatar})`
        userId = profileData._id

        cards.forEach((card) => {
            placesList.append(
                createCard(card, deleteCard, likeButtonCard, openPopupCardImage, userId)
            )
        })
    })
    .catch(console.error)
// Синхронизовали подгрузку карточек и информации о пользователе, прошлись по массиву из объектов, вытащили необходимые свойства и присоединили данные к DOM


// Функция для отправки данных о профиле на сервер
function patchDataServ() {
        showSavingText()
        return outInfoProfile(nameInput, jobInput)
        .then((res) => {
            profileName.textContent = res.name
            profileProfession.textContent = res.about
            closePopup(editPopup)
            
        })
        .finally(() => {
            hideSavingText()
            })
}


// Функция для отправки данных о карточке на сервер
function addServCard() {
        showSavingText()
        return outCards(cardName, cardURL)
        .then((card) => {
                placesList.prepend(
                    createCard(card, deleteCard, likeButtonCard, openPopupCardImage, userId)
                )
                closePopup(profileAdd)
            })
            .finally(() => {
                hideSavingText()
                })
}

// функция для отправки картинки профиля на сервер
function handleEditAvatar() {
        showSavingText()
        return updateAvatarProfile(AvatarUrl.value).then((data) => {
            profileAvatar.style = `background-image: url(${data.avatar})`
            closePopup(popupTypeAvatar)
            formEditAvatar.reset()
        })
        .finally(() => {
            hideSavingText()
            })
}



profileAddButton.addEventListener("click", () => {
    openPopup(profileAdd)
    newPlace.reset()
    clearValidation(newPlace, validationConfig)
})
// Повесили прослушку на ссылку кнопки добавления карточек

editPopupButton.addEventListener("click", () => {
    fillEditFormInputs()
    openPopup(editPopup)
    clearValidation(formElEdit, validationConfig)
})
// Повесили прослушку на ссылку кнопки редактирования профиля 

closePopupButton.forEach((el) => {
    el.addEventListener("click", () => {
        closePopup((el.closest('.popup')))
    })
})
// Повесели прослушку на ссылку каждого элемента псевдомассива из кнопок для закрытия(крестики)

closePopupProfileButton.addEventListener("click", fillEditFormInputs)
// Повесели прослушку, на кнопку закрытие попапа "Редактирование профиля"

profileAvatar.addEventListener("click", () => {
    formEditAvatar.reset()
    openPopup(popupTypeAvatar)
    clearValidation(popupTypeAvatar, validationConfig)
})
// Повесели прослушку, на клик по изображению аватара.

newPlace.addEventListener("submit", addServCard)
formEditAvatar.addEventListener("submit", handleEditAvatar)
formElEdit.addEventListener("submit", patchDataServ)


enableValidation(validationConfig)



