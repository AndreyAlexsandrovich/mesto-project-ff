const card1 = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg", import.meta.url);
const card2 = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg", import.meta.url);
const card3 = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg", import.meta.url);
const card4 = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg", import.meta.url);
const card5 = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg", import.meta.url);
const card6 = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg", import.meta.url);

const initialCards = [
    {
      name: "Архыз",
      link: card1,
    },
    {
      name: "Челябинская область",
      link: card2,
    },
    {
      name: "Иваново",
      link: card3,
    },
    {
      name: "Камчатка",
      link: card4,
    },
    {
      name: "Холмогорский район",
      link: card5,
    },
    {
      name: "Байкал",
      link: card6,
    }
];

export { initialCards };