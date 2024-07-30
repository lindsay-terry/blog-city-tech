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

//event listener to trigger handleLogin
document.querySelector('.log-in').addEventListener('click', handleLogin);

//event listener to trigger handle signup