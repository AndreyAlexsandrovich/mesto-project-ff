import { openPopup, setupPopupCloseListener, closePopup } from "./popup.js";
import { list } from "../index.js";
import { handleLike } from "./likeButton.js";
import { handleDelete } from "./deleteButton.js";
const openAddCard = document.querySelector(".popup_type_new-card");
const formElement = openAddCard.querySelector(".popup__form");
const addButton = document.querySelector(".profile__add-button");
const closeButton = openAddCard.querySelector(".popup__close");

addButton.addEventListener("click", () => {
  openPopup(openAddCard);
});

formElement.addEventListener("submit", addCards);

setupPopupCloseListener(openAddCard, closeButton);

export function addCards(evt) {
  const inputName = formElement.querySelector(
    ".popup__input_type_card-name"
  ).value;
  const inputImage = formElement.querySelector(".popup__input_type_url").value;

  evt.preventDefault();

  if (!inputImage || !inputName) {
    return;
  }

  list.insertAdjacentHTML(
    "afterbegin",
    ` <li class="places__item card">
    <img class="card__image" src=${inputImage} alt="" />
    <button type="button" class="card__delete-button"></button>
    <div class="card__description">
      <h2 class="card__title">
      ${inputName}
      </h2>
      <button type="button" class="card__like-button"></button>
    </div>
  </li>`
  );

  formElement.reset();

  closePopup(openAddCard);
}