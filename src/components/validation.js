// добавление текста
function showInputError(formElement, element, errorMessage, validationConfig) {
  const formError = formElement.querySelector(`#${element.id}-error`);
  if (!formError) return;

  element.classList.add(validationConfig.inputErrorClass);
  formError.classList.add(validationConfig.errorClass);
  formError.textContent = errorMessage;
}


// удаления ошибок
function hideInputError(formElement, element, validationConfig) {
  const formError = formElement.querySelector(`#${element.id}-error`);
  if (!formError) return;

  element.classList.remove(validationConfig.inputErrorClass);
  formError.classList.remove(validationConfig.errorClass);
  formError.textContent = "";
}


function isValid(formElement, input, validationConfig) {
  const regEx = /^[а-яА-Яa-zA-ZЁёәіңғүұқөһӘІҢҒҮҰҚӨҺ\-\s]*$/;

  if (
    (input.name === "name" || input.name === "place-name" || input.name === "description") &&
    input.value !== ""
  ) {
    if (!regEx.test(input.value)) {
      showInputError(formElement, input, input.dataset.error, validationConfig);
      return false;
    }
  }

  if (!input.validity.valid) {
    showInputError(formElement, input, input.validationMessage, validationConfig);
    return false;
  } else {
    hideInputError(formElement, input, validationConfig);
  }
  return true;
}

function setEventListener(formElement, validationConfig) {
  const formInputs = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );

  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  formInputs.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(formElement, input, validationConfig);
      toggleButtonState(formInputs, buttonElement, validationConfig);
    });
  });

  toggleButtonState(formInputs, buttonElement, validationConfig);
}

export function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListener(formElement, validationConfig);
  });
}


function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    const regEx = /^[а-яА-Яa-zA-ZЁёәіңғүұқөһӘІҢҒҮҰҚӨҺ\-\s]*$/;

    if (
      (inputElement.name === "name" || inputElement.name === "place-name" || inputElement.name === "description") &&
      inputElement.value !== ""
    ) {
      if (!regEx.test(inputElement.value)) {
        return true;
      }
    }

    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

  // очистка полей
  export function clearValidation(formElement, validationConfig) {
    const formInputs = Array.from(
      formElement.querySelectorAll(validationConfig.inputSelector)
    );
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    formInputs.forEach((input) => {
      input.value = "";
    });
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  }