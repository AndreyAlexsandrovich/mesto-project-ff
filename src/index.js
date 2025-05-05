import { enableValidation } from "./components/validation.js";
import { createCard, handleDelete } from "./components/card.js";
import {
  openPopup,
  closePopup,
  setupPopupCloseListener,
} from "./components/modal.js";
import { clearValidation } from "./components/validation.js";
import { validationConfig } from "./components/validationConfig.js";

import {
  loadCards,
  loadUserData,
  updateLoadUser,
  createNewCard,
  updateAvatar,
} from "./api.js";

import "./index.css";

// @todo: DOM-элементы
const popupNewPlace = document.querySelector(".popup_type_new-card");
const profileForm = document.querySelector(".popup_type_edit");
const popupProfileAvatar = document.querySelector(".popup_type_avatar");
const avatar = document.querySelector(".profile__image");

const popupPlacesForm = popupNewPlace.querySelector(".popup__form");
const popupEditProfileForm = profileForm.querySelector(".popup__form");
const popupAvatar = popupProfileAvatar.querySelector(".popup__form");

const addButton = document.querySelector(".profile__add-button");
const closeButtonPlace = popupNewPlace.querySelector(".popup__close");
const closeButtonProfile = profileForm.querySelector(".popup__close");
const closeButtonAvatar = popupProfileAvatar.querySelector(".popup__close");
const profileImage = document.querySelector(".profile__image");
const buttonEdit = document.querySelector(".profile__edit-button");

const popupTypeImage = document.querySelector(".popup_type_image");
const popupListImage = document.querySelector(".places__list");
const popuCloseImage = popupTypeImage.querySelector(".popup__close");
const popupImageElement = popupTypeImage.querySelector("img");
const popupTextImage = popupTypeImage.querySelector(".popup__caption");
const avatarUrlInput = popupProfileAvatar.querySelector(
  ".popup__input_type_url"
);

const saveButtonPlace = popupNewPlace.querySelector(".popup__button");
const saveButtonProfile = profileForm.querySelector(".popup__button");
const saveButtonAvatar = popupProfileAvatar.querySelector(".popup__button");

const list = document.querySelector(".places__list");

const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="description"]');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const inputCardName = popupPlacesForm.querySelector(
  ".popup__input_type_card-name"
);
const inputUrlImage = popupPlacesForm.querySelector(".popup__input_type_url");
let userId;
Promise.all([loadUserData(), loadCards()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    list.innerHTML = "";

    userId = userData._id;

    cards.forEach((cardData) => {
      const cardElement = createCard(cardData, handleCardImageClick, userId);
      list.append(cardElement);
    });
  })
  .catch((err) => console.log(err));

function renderLoading(button, isLoading, loadingText = "Сохранение...") {
  if (isLoading) {
    button.textContent = loadingText;
    button.disabled = true;
  } else {
    button.textContent = button.dataset.defaultText;
    button.disabled = true;
  }
}

saveButtonProfile.dataset.defaultText = saveButtonProfile.textContent;
saveButtonPlace.dataset.defaultText = saveButtonPlace.textContent;
saveButtonAvatar.dataset.defaultText = saveButtonAvatar.textContent;

// смена аватарки пользователя на сервер
function handleAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(saveButtonAvatar, true);
  const avatarUrl = avatarUrlInput.value;

  updateAvatar(avatarUrl)
    .then((userData) => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(popupProfileAvatar);
      popupAvatar.reset();
      clearValidation(popupAvatar, validationConfig);
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => { 
      renderLoading(saveButtonAvatar, false);
    })
}

popupAvatar.addEventListener("submit", handleAvatarSubmit);

function addCards(evt) {
  evt.preventDefault();
  renderLoading(saveButtonPlace, true, "Создание...");
  const cardName = inputCardName.value;
  const cardLink = inputUrlImage.value;

  if (!cardName || !cardLink) return;

  createNewCard(cardName, cardLink)
    .then((newCardData) => {
      if (!newCardData.owner || !newCardData.owner._id) {
        newCardData.owner = { _id: userId };
      }
      const cardElement = createCard(newCardData, handleCardImageClick, userId);
      list.prepend(cardElement);
      popupPlacesForm.reset();
      clearValidation(popupPlacesForm, validationConfig);
      closePopup(popupNewPlace);
    })
    .catch((err) => {
      console.error("Ошибка при добавлении карточки:", err);
    })
    .finally(() => { 
      renderLoading(saveButtonPlace, false, "Создать");
    })
}

// функции для редактирования профиля
function updateProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  // очистка форм
  clearValidation(profileForm, validationConfig);
}

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  renderLoading(saveButtonProfile, true);
  const valueName = nameInput.value;
  const valueDescription = jobInput.value;

  updateLoadUser(valueName, valueDescription)
    .then((updateUser) => {
      profileTitle.textContent = updateUser.name;
      profileDescription.textContent = updateUser.about;
      closePopup(profileForm);
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => { 
      renderLoading(saveButtonProfile, false);
    })
}

// функция для открытия попапа изображения карточек

// функция открытия попапа карточки
function handleCardImageClick(imageElement) {
  const imageSrc = imageElement.src;
  const imageAlt = imageElement.alt;
  const imageTitle = imageElement
    .closest(".card")
    .querySelector(".card__title").textContent;

  popupImageElement.alt = imageAlt;
  popupImageElement.src = imageSrc;
  popupTextImage.textContent = imageTitle;
  openPopup(popupTypeImage);
}

setupPopupCloseListener(popupTypeImage, popuCloseImage);

// вызов функции отменяяющий стандартные действия  браузера (попапа профиля и добавления места)
setupFormListener();
//  вызов функций для закрытия попапов escape и нажатием вне формы
setupPopupCloseListener(profileForm, closeButtonProfile);
setupPopupCloseListener(popupNewPlace, closeButtonPlace);
setupPopupCloseListener(popupProfileAvatar, closeButtonAvatar);

// обработчики открытия разных попапов(профиль и место)

avatar.addEventListener("click", () => {
  openPopup(popupProfileAvatar);
});

popupProfileAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();
});

buttonEdit.addEventListener("click", () => {
  updateProfileForm();
  openPopup(profileForm);
});

addButton.addEventListener("click", () => {
  openPopup(popupNewPlace);
});

function setupFormListener() {
  popupPlacesForm.addEventListener("submit", (evt) => {
    addCards(evt);
  });

  popupEditProfileForm.addEventListener("submit", (evt) => {
    handleFormSubmitProfile(evt);
    closePopup(profileForm);
  });

  // валидация формы
  enableValidation(validationConfig);
}

export { popupPlacesForm, popupNewPlace, list };
