import avatar from "../images/avatar.jpg";
import { initialCards } from "./components/cards.js";
import {
  addCards,
  createCard,
  deleteCard,
  handleLike,
  popupImage,
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

const formElement = popupNewPlace.querySelector(".popup__form");
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

profileImage.style.backgroundImage = `url(${avatar})`;

// @todo: Вывести карточки на страницу
function showCards() {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard, handleLike);
    list.append(cardElement);
  });
}

// функции для редактирования профиля
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

function handleFormSubmit(evt) {
  evt.preventDefault();

  const valueName = nameInput.value;
  profileTitle.textContent = valueName;

  const valueDescription = jobInput.value;
  profileDescription.textContent = valueDescription;
}

// функция для открытия попапа изображения карточек
document.addEventListener("DOMContentLoaded", () => {
  const popupImageFn = popupImage(
    popupListImage,
    popupImageElement,
    popupTextImage,
    popupTypeImage,
  );
});
setupPopupCloseListener(popupTypeImage, popuCloseImage);

// функция удаление новый карточек
function handleDelete(cardElement) {
  cardElement.remove();
}

// вызов функции отменяяющий стандартные действия  браузера (попапа профиля и добавления места)
setupFormListener();
//  вызов функции для закрытия попапов escape и нажатием вне формы
setupPopupCloseListener(profileForm, closeButtonProfile);
setupPopupCloseListener(popupNewPlace, closeButtonPlace);

// обработчики открытия разных попапов(профиль и место)

buttonEdit.addEventListener("click", () => {
  openPopup(profileForm);
});

addButton.addEventListener("click", () => {
  openPopup(popupNewPlace);
});

showCards();

function setupFormListener() {
  popupNewPlace.addEventListener("submit", (evt) => {
    addCards(evt);
  });

  profileForm.addEventListener("submit", (evt) => {
    handleFormSubmit(evt);
  });
}

export { popupNewPlace, formElement, list, handleDelete };
