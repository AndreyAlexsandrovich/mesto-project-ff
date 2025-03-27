// Функция для открытия попапа
export function openPopup(popup) {
  popup.style.display = "flex"; // Сначала делаем попап видимым
  popup.style.opacity = "0"; // Устанавливаем начальную прозрачность
  popup.style.visibility = "hidden"; // Устанавливаем начальную видимость

  setTimeout(() => {
    popup.style.opacity = "1"; // Плавно изменяем прозрачность
    popup.style.visibility = "visible"; // Плавно изменяем видимость
    popup.classList.add("popup_is-opened"); // Добавляем класс для анимации
  }, 0); // Таймаут для корректного запуска анимации
}

// Функция для закрытия попапа
export function closePopup(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.remove("popup_is-opened"); // Убираем класс открытия

    popup.style.opacity = "0"; 
    popup.style.visibility = "hidden"; 
}

// Настройка слушателей для закрытия попапа
export function setupPopupCloseListener(popup, close) {
  close.addEventListener('click', () => closePopup(popup)); // Закрытие по кнопке

  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closePopup(popup); // Закрытие по клику вне контента
    }
  });

  document.addEventListener("keydown", (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popup); // Закрытие по клавише Escape
    }
  })
}