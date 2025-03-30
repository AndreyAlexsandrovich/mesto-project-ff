// Функция для открытия попапа
 function openPopup(popup) {
    popup.style.display = "flex"; 
    popup.style.opacity = "0"; 
    popup.style.visibility = "hidden"; 
    setTimeout(() => {
      popup.style.opacity = "1";
      popup.style.visibility = "visible"; 
      popup.classList.add("popup_is-opened"); 
    }, 0); 
  }
  
  // Функция для закрытия попапа
   function closePopup(popup) {
    popup.classList.add("popup_is-animated");
    popup.classList.remove("popup_is-opened"); 
  
      popup.style.opacity = "0"; 
      popup.style.visibility = "hidden"; 
  }
  
  
   function setupPopupCloseListener(popup, close) {
    close.addEventListener('click', () => closePopup(popup)); 
  
    popup.addEventListener("click", (evt) => {
      if (evt.target === popup) {
        closePopup(popup); 
      }
    });
  
    document.addEventListener("keydown", (evt) => {
      if (evt.key === 'Escape') {
        closePopup(popup); 
      }
    })
  }

  export {openPopup, closePopup, setupPopupCloseListener}