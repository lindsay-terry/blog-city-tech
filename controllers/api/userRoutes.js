const router = require('express').Router();
const { User } = require('../../models');

//login route
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username }});
        if (!userData) {
            res.status(404).json({ message: 'Incorrect username or password.  Please try again'});
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(404).json({ message: 'Incorrect username or password.  Please try again'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (error) {
        res.status(500).json({ message: 'There has been an error.  Please try again'});
    }
});

module.exports = router;