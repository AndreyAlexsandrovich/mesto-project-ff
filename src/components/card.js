import { list, formElement, popupNewPlace } from "../index.js";
import { openPopup, closePopup, setupPopupCloseListener } from "./modal.js";
import { initialCards } from "./cards.js";

// добавление карточки
function addCards(evt) {
  evt.preventDefault();

  const inputCardName = formElement.querySelector(
    ".popup__input_type_card-name"
  ).value;
  const inputUrlImage = formElement.querySelector(
    ".popup__input_type_url"
  ).value;
  const imageAlt = formElement.querySelector("img").alt;
  if (!inputUrlImage || !inputCardName) return;

  const newCards = createCard(
    {name: inputCardName,
      link: inputUrlImage,
      alt: imageAlt,
    },
    deleteCard,
    handleLike
  )

  list.prepend(newCards)
  formElement.reset();
  closePopup(popupNewPlace);
}

// создание карточек
function createCard(cardData, deleteCard, handleLike) {
  const template = document.querySelector("#card-template").content;
  const itemCopy = template.querySelector(".places__item").cloneNode(true);
  itemCopy.querySelector(".card__title").textContent = cardData.name;
  itemCopy.querySelector(".card__image").src = cardData.link;
  itemCopy.querySelector(".card__image").alt = cardData.name;
  const deleteButton = itemCopy.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => {
    deleteCard(itemCopy);
  });

  const likeButton = itemCopy.querySelector(".card__like-button");

  likeButton.addEventListener("click", () => {
    handleLike(likeButton);
  });

  return itemCopy;
}

  function popupImage(listImage, imageElement, textImage, typeImage) {
    listImage.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("card__image")) {
        const card = evt.target.closest(".card");
  
        const imageSrc = evt.target.src;
        const imageAlt = evt.target.alt;
        const imageTitle = card.querySelector(".card__title").textContent;
        imageElement.alt = imageAlt;
        imageElement.src = imageSrc;
        textImage.textContent = imageTitle;
        openPopup(typeImage);
      }
    });
  }

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}
// лайк карточки
function handleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export { addCards, handleLike, createCard, deleteCard, popupImage };
