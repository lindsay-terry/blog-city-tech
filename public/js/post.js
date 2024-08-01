//function to reveal new post form
const togglePostForm = () => {
    const form = document.getElementById('new-post');
    form.classList.remove('d-none');
    form.scrollIntoView({ behavior: 'smooth' });
}

//function to hide new post form again
const toggleBack = () => {
    const form = document.getElementById('new-post');
    form.classList.add('d-none');
}

//function to handle submitting new pot
const handleCreatePost = async (id) => {
    const title = document.getElementById('post-title').value.trim();
    const postBody = document.getElementById('post-content').value.trim();

    if (!title || !postBody ) {
        document.getElementById('message-div').textContent = '*Please fill in all fields';
    } else if (title && postBody) {
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                body: JSON.stringify({ title: title, content: postBody, author_id: `${id}` }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                document.getElementById('message-div').textContent = "There's been an error processing your request.  Please try again.";
            }
        } catch(error) {
            console.error(error);
            document.getElementById('message-div').textContent = error.message;
        }
    }
};

//event listener to submit new post
document.querySelector('#submit-post').addEventListener('click', function (event) {
    const userId = event.target.getAttribute('data-id');
    handleCreatePost(userId);
})

//event listener to toggle new post form
document.querySelector('#new-post-btn').addEventListener('click', togglePostForm);

//event listener to toggle back to invisible
document.querySelector('#cancel-post').addEventListener('click', toggleBack);