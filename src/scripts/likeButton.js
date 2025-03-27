document.addEventListener("DOMContentLoaded", () => { 
    const cardContainer = document.querySelector(".places__list");
    
    cardContainer.addEventListener("click", (evt) => { 
        if (evt.target.classList.contains("card__like-button")) { 
            handleLike(evt.target)
        }
    })
});
function handleLike(likeButton) {   
  likeButton.classList.toggle("card__like-button_is-active");
}

export { handleLike };
