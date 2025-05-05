import { likeUser, unlikeUser, deleteCard } from "../api.js";

// создание карточек
function createCard(cardData, handleCardImageClick, userId) {
  const template = document.querySelector("#card-template").content;
  const itemCopy = template.querySelector(".places__item").cloneNode(true);
  const imageElement = itemCopy.querySelector(".card__image");
  itemCopy.querySelector(".card__title").textContent = cardData.name;
  imageElement.alt = cardData.name;
  imageElement.src = cardData.link;
  const deleteButton = itemCopy.querySelector(".card__delete-button");
  const likeCount = itemCopy.querySelector(".like-count");
  const likeButton = itemCopy.querySelector(".card__like-button");

  likeCount.textContent = cardData.likes.length;
  if (cardData.owner._id !== userId) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.addEventListener("click", () => {
      deleteCard(cardData._id)
        .then(() => {
          itemCopy.remove();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    });
  }

  if (cardData.likes.some((user) => user._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => {
    const liked = likeButton.classList.contains("card__like-button_is-active");
    const apiMethod = liked ? unlikeUser : likeUser;
    apiMethod(cardData._id)
      .then((updatedCard) => {
        likeCount.textContent = updatedCard.likes.length;
        likeButton.classList.toggle("card__like-button_is-active");
        cardData.likes = updatedCard.likes;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  });

  imageElement.addEventListener("click", () => {
    handleCardImageClick(imageElement);
  });

  return itemCopy;
}

// функция удаление новыx карточек
function handleDelete(cardElement) {
  cardElement.remove();
}

export { createCard, handleDelete };
