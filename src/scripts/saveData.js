const popupEditForm = document.querySelector('.popup_type_edit');
const formElement = popupEditForm.querySelector(".popup__form");
const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="description"]');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

function handleFormSubmit(evt) {
  evt.preventDefault(); 

  const valueName = nameInput.value;
  profileTitle.textContent = valueName;

  const valueDescription = jobInput.value;
  profileDescription.textContent = valueDescription;
}

formElement.addEventListener("submit", handleFormSubmit);