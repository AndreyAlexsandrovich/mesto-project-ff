import { openPopup, setupPopupCloseListener } from "./popup.js";

export function popupImage() {
  const overImage = document.querySelector(".popup_type_image");
  const templateImage = document.querySelector(".places__list");
  const closeImage = overImage.querySelector(".popup__close");
  const popupImageElement = overImage.querySelector("img");
  const textImage = overImage.querySelector(".popup__caption");

  templateImage.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("card__image")) {
const card = evt.target.closest(".card");

      const imageSrc = evt.target.src;
      const imageTitle = card.querySelector(".card__title").textContent;
      popupImageElement.src = imageSrc;
      textImage.textContent = imageTitle;
      openPopup(overImage);
    }
  });

  setupPopupCloseListener(overImage, closeImage);
}

popupImage();
