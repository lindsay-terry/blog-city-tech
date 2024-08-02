const toggleComments = (id) => {
    //toggle corresponding comment div by data attribute that matches id
    const comments = document.querySelector(`.comment-div[data-id="${id}"]`);
    if (comments) {
        comments.classList.toggle('d-none');
    } 
};

const handleAddComment = async (id) => {
    
}

//listen for a click inside a .card element and get the data-id of the card
document.addEventListener('click', function(event) {
    const card = event.target.closest('.card');
    if (card) {
        const cardId = card.getAttribute('data-id');
        toggleComments(cardId);
    }
});

//event listener to submit comment
document.querySelectorAll('.submit-comment').forEach(button => {
    button.addEventListener('click', function(event) {
        const postId= event.target.getAttribute('data-id');
        handleAddComment(postId);
    })
})