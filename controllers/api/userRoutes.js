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

//logout route
router.post('/logout', async (req, res) => {
    try {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

//signup route
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;