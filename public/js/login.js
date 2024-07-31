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

//function to toggle signup form
const toggleSignUp = () => {
    const loginForm = document.querySelector('.log-in-form');
    const signupForm = document.querySelector('.sign-up-form');
    
    if (signupForm.classList.contains('d-none')) {
        loginForm.classList.add('d-none');
        signupForm.classList.remove('d-none');
    } 
    console.log("yay")
};

//function to toggle log in form
const toggleLogIn = () => {
    const loginForm = document.querySelector('.log-in-form');
    const signupForm = document.querySelector('.sign-up-form');
    
    if (loginForm.classList.contains('d-none')) {
        loginForm.classList.remove('d-none');
        signupForm.classList.add('d-none');
    } 
    console.log('noo')
};

//event listener to trigger handleLogin
document.querySelector('.log-in').addEventListener('click', handleLogin);

//event listener to toggle to signup form
document.querySelector('.toggle-sign-up').addEventListener('click', toggleSignUp);

//event listener to toggle back to log in form
document.querySelector('.toggle-log-in').addEventListener('click', toggleLogIn);