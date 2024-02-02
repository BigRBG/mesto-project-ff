

// formSelector: '.popup__form',
// inputSelector: '.popup__input',
// submitButtonSelector: '.popup__button',
// inactiveButtonClass: 'popup__button_disabled',
// inputErrorClass: 'popup__input_type_error',
// errorClass: 'popup__error_visible'


function showInputError(formSelector, inputSelector, errorMessage) {
    const errorElement = formSelector.querySelector(`${inputSelector.id}-error`)
    
    inputSelector.classList.add('popup__input_type_error')
    errorElement.classList.add('popup__error_visible')
    errorElement.textContent = errorMessage;
}


function hideInputError(formSelector, inputSelector){
    const errorElement = formSelector.querySelector(`${inputSelector.id}-error`)
    
    inputSelector.classList.remove('popup__input_type_error')
    errorElement.classList.remove('popup__error_visible')
    errorElement.textContent = "";

}

function checkInputValidity(formSelector, inputSelector){
    if(!inputSelector.validity.valid){
        showInputError(formSelector, inputSelector, inputSelector.validitionMessage)
    }else{
        hideInputError(formSelector, inputSelector)
    }
}

function setEventListeners(formSelector){
    const inputSelectorList = Array.from(formSelector.querySelectorAll('.popup__input'))

    inputSelectorList.forEach((inputSelector) => {
        inputSelector.addEventListener('input', () => {
            checkInputValidity(formSelector, inputSelector)
        })
    })
}

function enableValidation(){
    const formSelectorList = Array.from(document.querySelector('.popup__form'))

    formSelectorList.forEach((formSelector) => {
        formSelector.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    })
}

enableValidation()
