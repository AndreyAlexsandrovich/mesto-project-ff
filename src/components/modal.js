let currentPopup = null;
// Функция для открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  currentPopup = popup;
  document.addEventListener("keydown", closeEscPopup);
  
}

// Функция для закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  currentPopup = null;
  document.removeEventListener("keydown", closeEscPopup);
}

function closeEscPopup(evt) {
  if (evt.key === "Escape") {
    closePopup(currentPopup);
  }
}

function setupPopupCloseListener(popup, close) {
  close.addEventListener("click", () => closePopup(popup));
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
}

export { openPopup, closePopup, setupPopupCloseListener };
