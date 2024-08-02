const toggleComments = (id) => {
    //toggle corresponding comment div by data attribute that matches id
    const comments = document.querySelector(`.comment-div[data-id="${id}"]`);
    if (comments) {
        comments.classList.toggle('d-none');
    } 
}

//listen for a click inside a .card element and get the data-id of the card
document.addEventListener('click', function(event) {
    const card = event.target.closest('.card');
    if (card) {
        const cardId = card.getAttribute('data-id');
        toggleComments(cardId);
    }
})