const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const auth = require('../utils/authorization');

//route to homepage
router.get('/', async (req, res) => {
    try { //get all post data to display on page
        const postData = await Post.findAll({
            include: [{ model: Comment }, { model: User }],
        })
        const posts = postData.map(post => post.get({ plain: true }));
        
        res.render('homepage', { posts, logged_in: req.session.logged_in, pageTitle: 'Blog City Tech' });
    } catch (error) {
        res.status(500).json(error);
    }
});

//route to login page
router.get('/login', async (req, res) => {
    try {
        res.render('login', { logged_in: req.session.logged_in, pageTitle: 'Blog City Tech' });
    } catch (error) {
        res.status(500).json(error);
    }

});

//route to dashboard
router.get('/dashboard', auth, async (req, res) => {
    try {
        const userId = req.session.user_id;
        const userData = await Post.findAll({
            where: { author_id: userId },
            include: [{ model: Comment }, { model: User }],
        });
        
        const posts = userData.map(post => post.get({ plain: true }));

        res.render('dashboard', { posts, userId, logged_in: req.session.logged_in, pageTitle: 'Your Dashboard' });
    } catch (error) {
        res.status(500).json(error);
    }
    
});

module.exports = router;
