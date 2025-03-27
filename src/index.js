import { initialCards } from "./scripts/cards.js";
import editForm from "./scripts/editForm.js";
import addCard from "./scripts/addCard.js";
import popupImage from './scripts/popupImage.js';

import "./index.css";
import avatar from "../images/avatar.jpg";

const profileImage = document.querySelector(".profile__image");
profileImage.style.backgroundImage = `url(${avatar})`;

// @todo: Темплейт карточки
const template = document.querySelector("#card-template").content;
// @todo: DOM узлы
export const list = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {
  const itemCopy = template.querySelector(".card").cloneNode(true);
  itemCopy.querySelector(".card__title").textContent = cardData.name;
  itemCopy.querySelector(".card__image").src = cardData.link;
  itemCopy.querySelector(".card__image").alt = cardData.name;

  const deleteButton = itemCopy.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCard(itemCopy);
  });

  return itemCopy;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
function showCards() {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard);
    list.append(cardElement);
  });
}

showCards();
