const toggleComments = (id) => {
    //toggle corresponding comment div by data attribute that matches id
    const comments = document.querySelector(`.comment-div[data-id="${id}"]`);
    if (comments) {
        comments.classList.toggle('d-none');
    } 
};

const handleAddComment = async (id, userId) => {
    const user = userId;
    const comment = document.querySelector(`#comment${id}`).value.trim();
    if (comment && user) {
        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify({ content: comment, post_id: id, author_id: user }),
                headers: { 'Content-Type': 'application/json', },
            });
            
            if (response.ok) {
                document.location.replace(`/post/${id}`);
            } else {
                console.error("there's been an error");
            }
        } catch (error) {
            console.error(error.message);
        }
    }
};

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
        const userId = event.target.getAttribute('data-user-id');
        handleAddComment(postId, userId);
    })
})