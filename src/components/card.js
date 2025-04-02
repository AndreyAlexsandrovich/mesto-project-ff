// создание карточек
function createCard(cardData, handleDelete, handleLike, handleCardImageClick) {
  const template = document.querySelector("#card-template").content;
  const itemCopy = template.querySelector(".places__item").cloneNode(true);
  itemCopy.querySelector(".card__title").textContent = cardData.name;
  itemCopy.querySelector(".card__image").src = cardData.link;
  itemCopy.querySelector(".card__image").alt = cardData.name;
  const deleteButton = itemCopy.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => {
    handleDelete(itemCopy);
  });

  const likeButton = itemCopy.querySelector(".card__like-button");

  likeButton.addEventListener("click", () => {
    handleLike(likeButton);
  });

  const imageElement = itemCopy.querySelector(".card__image");
  imageElement.addEventListener("click", () => {
    handleCardImageClick(imageElement);
  });

  return itemCopy;
}

// функция удаление новыx карточек
function handleDelete(cardElement) {
  cardElement.remove();
}

// лайк карточки
function handleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export { handleLike, createCard, handleDelete };
