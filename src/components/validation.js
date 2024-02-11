export { enableValidation, clearValidation, validationConfig };

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
  formSelector,
  inputSelector,
  errorMessage,
) {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(validationConfig, formSelector, inputSelector) {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
}

// Функция проверки валидности полей
function checkInputValidity(validationConfig, formSelector, inputSelector) {
  if (inputSelector.validity.patternMismatch) {
    // Валидное регулярное значение даст - False
    inputSelector.setCustomValidity(inputSelector.dataset.errorMessage); // Что приведет использованию методом setCustomValidity, специального кастомного сообщения
  } else {
    // Иначе True и результатом уже будет пустая строка, то есть, либо ошибки не будет, либо некастамизированная
    inputSelector.setCustomValidity("");
  }
  if (!inputSelector.validity.valid) {
    // Поле не(!) соотвуетствует по всем параметрам валидности, то использовать функуцию раскрытия ошибки
    showInputError(
      validationConfig,
      formSelector,
      inputSelector,
      inputSelector.validationMessage,
    );
  } else {
    // В случае соответсвтия поля и валидности, скрыть ошибку.
    hideInputError(validationConfig, formSelector, inputSelector);
  }
}

function hasInvalidInput(inputSelectorList) {
  return inputSelectorList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
}

function toggleButtonState(
  validationConfig,
  inputSelectorList,
  submitButtonSelector,
) {
  if (hasInvalidInput(inputSelectorList)) {
    submitButtonSelector.classList.add(validationConfig.inactiveButtonClass);
    submitButtonSelector.disabled = true;
  } else {
    submitButtonSelector.disabled = false;
    submitButtonSelector.classList.remove(validationConfig.inactiveButtonClass);
  }
}

function clearValidation(formSelector, validationConfig) {
  const inputList = Array.from(
    formSelector.querySelectorAll(validationConfig.inputSelector),
  );
  const submitButtonSelector = formSelector.querySelector(
    validationConfig.submitButtonSelector,
  );

  inputList.forEach((elErrorSpan) => {
    hideInputError(validationConfig, formSelector, elErrorSpan);
    elErrorSpan.setCustomValidity("");
  });

  toggleButtonState(validationConfig, inputList, submitButtonSelector);
}

function setEventListeners(validationConfig, formSelector) {
  const inputSelectorList = Array.from(
    formSelector.querySelectorAll(validationConfig.inputSelector),
  );
  const submitButtonSelector = formSelector.querySelector(
    validationConfig.submitButtonSelector,
  );
  toggleButtonState(validationConfig, inputSelectorList, submitButtonSelector);

  inputSelectorList.forEach((inputSelector) => {
    inputSelector.addEventListener("input", () => {
      checkInputValidity(validationConfig, formSelector, inputSelector);
      toggleButtonState(
        validationConfig,
        inputSelectorList,
        submitButtonSelector,
      );
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
