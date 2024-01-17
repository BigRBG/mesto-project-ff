
const editPopup = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__title')
const profileProfession = document.querySelector('.profile__description')


const formElEdit = document.forms['edit-profile']
const nameInput = formElEdit.elements.name
const jobInput = formElEdit.elements.description

//Функция, удаляющая класс, ответственный за открытие попапа

export function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened')
    document.removeEventListener("keydown", closeModalButton)
}

//Функция, добавляющая класс, ответственный за открытие попапа

export function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened')
    document.addEventListener("keydown", closeModalButton)
    popupElement.addEventListener("mousedown", function (e) {
        if (!e.target.closest('.popup__content')) {
            closePopup(e.target.closest('.popup'))
        }
    });
    returnName()
}

// Объявили функцию - прямая трансляция,  данные в поля для ввода берутся из введенных ранее)

export function returnName() {
    jobInput.value = profileProfession.textContent
    nameInput.value = profileName.textContent
}

// Функция, закрытия попапа кнопкой ESC

function closeModalButton(evt) {
    const popupIsOpen = document.querySelector('.popup_is-opened')
    const ESC = "Escape"
    if (evt.key === ESC && popupIsOpen !== null) {
        popupIsOpen.classList.remove("popup_is-opened");
        returnName()
    }
}

// Функция сохранения данных, веденных в поля редактирования профиля

export function handleFormSubmit(evt) {
    evt.preventDefault()

    profileName.textContent = nameInput.value
    profileProfession.textContent = jobInput.value
    closePopup(editPopup)
}