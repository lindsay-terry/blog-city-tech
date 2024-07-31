//function to toggle signup form
const toggleSignUp = () => {
    const loginForm = document.querySelector('.log-in-form');
    const signupForm = document.querySelector('.sign-up-form');
    
    if (signupForm.classList.contains('d-none')) {
        loginForm.classList.add('d-none');
        signupForm.classList.remove('d-none');
    } 
};

//function to toggle log in form
const toggleLogIn = () => {
    const loginForm = document.querySelector('.log-in-form');
    const signupForm = document.querySelector('.sign-up-form');
    
    if (loginForm.classList.contains('d-none')) {
        loginForm.classList.remove('d-none');
        signupForm.classList.add('d-none');
    } 
};

//function to handle logging in
const handleLogin = async (event) => {
    event.preventDefault();

    //get access to form elements
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    const message = document.querySelector('#message-area');

    try {
        if (username && password) {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                const errorMessage = await response.json();
                message.textContent = errorMessage.message;
            }
        }
    } catch (error) {
        message.textContent = error;
    }
};

//function to handle signing up
const handleSignup = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#new-username').value.trim();
    const password = document.querySelector('#new-password').value.trim();
    const message = document.querySelector('#message-area-2');

    try {
        //verify password length
        if (password.length < 8) {
            message.textContent = 'Passwords must be at least 8 characters in length.';
            return;
        }
        const response = await fetch('/api/users/', {
            method: 'POST',
            headers: { 'Content-Tupe': 'application/json' },
            body: JSON.stringify({ username, password }),
        })

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            const errorMessage = await response.json();
            message.textContent = errorMessage.message;
        }
    } catch (error) {
        message.textContent = error;
    }
}

//event listener to trigger handleLogin
document.querySelector('.log-in').addEventListener('click', handleLogin);

//event listener to toggle to signup form
document.querySelector('.toggle-sign-up').addEventListener('click', toggleSignUp);

//event listener to toggle back to log in form
document.querySelector('.toggle-log-in').addEventListener('click', toggleLogIn);