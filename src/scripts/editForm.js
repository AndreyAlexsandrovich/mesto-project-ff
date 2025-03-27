import handleFormSubmit from './saveData.js';
import {openPopup, setupPopupCloseListener} from './popup.js';
const buttonEdit = document.querySelector(".profile__edit-button");
const popupEditForm = document.querySelector('.popup_type_edit');
const closeButton = popupEditForm.querySelector(".popup__close");


buttonEdit.addEventListener('click', () => { 
  openPopup(popupEditForm);
});

setupPopupCloseListener(popupEditForm, closeButton);