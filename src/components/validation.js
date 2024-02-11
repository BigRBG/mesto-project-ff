const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function showInputError(
  validationConfig,
  formElement,
  inputElement,
  errorMessage,
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(validationConfig, formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
}

// Функция проверки валидности полей
function checkInputValidity(validationConfig, formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    // Валидное регулярное значение даст - False
    inputElement.setCustomValidity(inputElement.dataset.errorMessage); // Что приведет использованию методом setCustomValidity, специального кастомного сообщения
  } else {
    // Иначе True и результатом уже будет пустая строка, то есть, либо ошибки не будет, либо некастамизированная
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    // Поле не(!) соотвуетствует по всем параметрам валидности, то использовать функуцию раскрытия ошибки
    showInputError(
      validationConfig,
      formElement,
      inputElement,
      inputElement.validationMessage,
    );
  } else {
    // В случае соответсвтия поля и валидности, скрыть ошибку.
    hideInputError(validationConfig, formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function disableButton(validationConfig, buttonElement) {
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
  buttonElement.disabled = true;
}

function toggleButtonState(validationConfig, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    disableButton(validationConfig, buttonElement);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector),
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector,
  );

  inputList.forEach((elErrorSpan) => {
    elErrorSpan.setCustomValidity("");
    hideInputError(validationConfig, formElement, elErrorSpan);
  });

  disableButton(validationConfig, buttonElement);
}

function setEventListeners(validationConfig, formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector),
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector,
  );
  toggleButtonState(validationConfig, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(validationConfig, formElement, inputElement);
      toggleButtonState(validationConfig, inputList, buttonElement);
    });
  });
}

function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector),
  );

  formList.forEach((formElement) => {
    setEventListeners(validationConfig, formElement);
  });
}

export { enableValidation, clearValidation, validationConfig };
