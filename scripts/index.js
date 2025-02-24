// @todo: Темплейт карточки

const template = document.querySelector('#card-template').content;

// @todo: DOM узлы
const list = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(cardData) { 
      const itemCopy = template.querySelector('.card').cloneNode(true);
       itemCopy.querySelector(".card__title").textContent = cardData.name;
       itemCopy.querySelector(".card__image").src = cardData.link;

       return itemCopy;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) { 
   cardElement.remove()
}

// @todo: Вывести карточки на страницу

function showCards() { 
   initialCards.forEach((cardData) => { 
      const cardElement = createCard(cardData);
      const deleteButton = cardElement.querySelector('.card__delete-button');
      deleteButton.addEventListener('click', () => { 
        deleteCard(cardElement);
      })
      list.append(cardElement);
   })
}

showCards();