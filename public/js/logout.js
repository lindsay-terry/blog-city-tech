//function to handle logging out
const handleLogout = async () => {
    try {
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            hearders: {'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            console.error('Error logging out.');
        }
    } catch(error) {
        console.error(error);
    }
};

//event listener for logout button
document.querySelector('#logout-btn').addEventListener('click', handleLogout);