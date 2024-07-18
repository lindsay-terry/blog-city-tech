//custom middleware to check logged in status of user and redirect based on result
const auth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect('/api/login');
    } else {
        next();
    }
};

module.exports = auth;