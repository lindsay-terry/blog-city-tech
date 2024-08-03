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

// function to fetch data to add existing post data to edit form
const fetchPostData = async (id) => {
    const postId = id;
    if(!postId) {
        document.getElementById('edit-message-div').textContent = 'Error.  Post ID is missing.';
    } else {
        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'GET',
            });

            if (response.ok) {
                const post = await response.json();
                const id = post.id;
                const title = post.title;
                const content = post.content;
                return { id, title, content };
            } else {
                document.getElementById('edit-message-div').textContent = 'Error fetching post data.  Please try again.';
            }
        } catch (error) {
            document.getElementById('edit-message-div').textContent = error.message;
        }
    }
};

//function to handle editing post
const handleEditPost = async (id, user) => {
    const postId = id;
    const userId = user;

    const title = document.querySelector('#edit-title').value.trim();
    const content = document.querySelector('#edit-content').value.trim();

    if(!postId) {
        document.getElementById('edit-message-div').textContent = 'Error. Post ID is missing.';
    } else if (title && content) {
        try {
            const response = await fetch(`api/posts/${postId}`, {
                method: 'PUT',
                body: JSON.stringify({ title: title, content: content, author_id: userId }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                document.getElementById('edit-message-div').textContent = 'Error updating post.';
            }
        } catch (error) {
            document.getElementById('edit-message-div').textContent = error.message;
        }
    } document.getElementById('edit-message-div').textContent = 'Please fill out title and content fields';
};

const handleDeletePost = async (id) => {
    if (!id) {
        document.getElementById('edit-message-div').textContent = 'Error. Post ID is missing.';
    } else {
        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                document.getElementById('edit-message-div').textContent = 'Error deleting post';
            }
        } catch (error) {
            document.getElementById('edit-message-div').textContent = error.message;
        }
    }
};

//event listener to submit edits to post
document.querySelector('#edit-post').addEventListener('click', function(event){
    const id = event.target.getAttribute('data-id');
    const userId = event.target.getAttribute('data-user-id');
    handleEditPost(id, userId);
});

//event listener to submit to delete a post
document.querySelector('#delete-post').addEventListener('click', function(event){
    const id = event.target.getAttribute('data-id');
    handleDeletePost(id);
});

//event listener to open edit post form
document.addEventListener('click', async function(event) {
    const card = event.target.closest('.card');
    if (card) {
        const postId = card.getAttribute('data-id');
        //retrieve data from post to be edited
        const postData = await fetchPostData(postId);

        if (postData) {
            //set data-id attribute to access post ID in later functions
            document.querySelector('#edit-post').setAttribute('data-id', postData.id);
            document.querySelector('#delete-post').setAttribute('data-id', postData.id);
            //use data from fetch to fill in form
            document.querySelector('#edit-title').value = postData.title;
            document.querySelector('#edit-content').value = postData.content;
            //make form visible and hide everything else
            document.querySelector('.post-container').classList.add('d-none');
            document.querySelector('#edit-post-form').classList.remove('d-none');
        } else {
            console.error('Failed to fetch post data');
        }
    } else {
        console.error('No card data found');
    }
});

//event listener to submit new post
document.querySelector('#submit-post').addEventListener('click', function (event) {
    const userId = event.target.getAttribute('data-id');
    handleCreatePost(userId);
});

//event listener to toggle new post form
document.querySelector('#new-post-btn').addEventListener('click', togglePostForm);

//event listener to toggle back to invisible
document.querySelector('#cancel-post').addEventListener('click', toggleBack);