import avatar from "../images/avatar.jpg";
import { initialCards } from "./components/cards.js";
import {
  createCard,
  handleLike,
  handleDelete,
} from "./components/card.js";
import {
  openPopup,
  closePopup,
  setupPopupCloseListener,
} from "./components/modal.js";

import "./index.css";

// @todo: DOM-элементы
const popupNewPlace = document.querySelector(".popup_type_new-card");
const profileForm = document.querySelector(".popup_type_edit");

const popupPlacesForm = popupNewPlace.querySelector(".popup__form");
const popupEditProfileForm = profileForm.querySelector(".popup__form");

const addButton = document.querySelector(".profile__add-button");
const closeButtonPlace = popupNewPlace.querySelector(".popup__close");
const closeButtonProfile = profileForm.querySelector(".popup__close");
const profileImage = document.querySelector(".profile__image");
const buttonEdit = document.querySelector(".profile__edit-button");

const popupTypeImage = document.querySelector(".popup_type_image");
const popupListImage = document.querySelector(".places__list");
const popuCloseImage = popupTypeImage.querySelector(".popup__close");
const popupImageElement = popupTypeImage.querySelector("img");
const popupTextImage = popupTypeImage.querySelector(".popup__caption");

const list = document.querySelector(".places__list");

const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="description"]');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const inputCardName = popupPlacesForm.querySelector(
  ".popup__input_type_card-name"
);
const inputUrlImage = popupPlacesForm.querySelector(".popup__input_type_url");

profileImage.style.backgroundImage = `url(${avatar})`;

// добавление карточки
function addCards(evt) {
  evt.preventDefault();


  const inputCardNameElement = inputCardName.value;
  const inputUrlImageElement = inputUrlImage.value;

  if (!inputCardNameElement || !inputUrlImageElement) return;

  const newCards = createCard(
    { name: inputCardNameElement, link: inputUrlImageElement },
    handleDelete,
    handleLike,
    handleCardImageClick
  );

  list.prepend(newCards);
  popupPlacesForm.reset();
  closePopup(popupNewPlace);
}

// @todo: Вывести карточки на страницу
function showCards() {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, handleDelete, handleLike, handleCardImageClick);
    list.append(cardElement);
  });
}

showCards();

// функции для редактирования профиля
function updateProfileForm() {
  jobInput.value = profileDescription.textContent;
  nameInput.value = profileTitle.textContent;
}

function handleFormSubmitProfile(evt) {
  evt.preventDefault();

  const valueName = nameInput.value;
  profileTitle.textContent = valueName;

  const valueDescription = jobInput.value;
  profileDescription.textContent = valueDescription;
}

// функция для открытия попапа изображения карточек


// функция открытия попапа карточки
function handleCardImageClick(imageElement) {
  const imageSrc = imageElement.src;
  const imageAlt = imageElement.alt;
  const imageTitle = imageElement.closest(".card").querySelector(".card__title").textContent;

  popupImageElement.alt = imageAlt;
  popupImageElement.src = imageSrc;
  popupTextImage.textContent = imageTitle;
  openPopup(popupTypeImage);
}

setupPopupCloseListener(popupTypeImage, popuCloseImage);

// вызов функции отменяяющий стандартные действия  браузера (попапа профиля и добавления места)
setupFormListener();
//  вызов функции для закрытия попапов escape и нажатием вне формы
setupPopupCloseListener(profileForm, closeButtonProfile);
setupPopupCloseListener(popupNewPlace, closeButtonPlace);

// обработчики открытия разных попапов(профиль и место)

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
}

export { popupPlacesForm, popupNewPlace, list, handleCardImageClick };
