document.addEventListener("DOMContentLoaded", () => { 
    const cardContainer = document.querySelector(".places__list");
    cardContainer.addEventListener("click", (evt) => { 
        if (evt.target.classList.contains("card__delete-button")) { 
            handleDelete(evt.target.closest('.places__item'))
        }
    })
});

function handleDelete(cardElement) {   
    cardElement.remove();
}

export { handleDelete };
