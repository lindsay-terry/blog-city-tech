const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const auth = require('../utils/authorization');

//route to homepage
router.get('/', async (req, res) => {
    try { //get all post data to display on page
        const postData = await Post.findAll({
            include: [{ model: Comment, include: [{ model: User, attributes: ['username']}], 
        }, { model: User }], order: [['updatedAt', 'DESC']],
        })
        const posts = postData.map(post => post.get({ plain: true }));

        const userId = req.session.user_id;
        
        res.render('homepage', { posts, userId, logged_in: req.session.logged_in, pageTitle: 'Blog City Tech' });
    } catch (error) {
        res.status(500).json(error);
    }
});

//route to view a specific post with all its comments after commenting
router.get('/post/:id', auth, async (req, res) => {
    const id = req.params.id;
    try {
        const postData = await Post.findByPk(id, {
            include: [{ model: Comment, include: [{ model: User, attributes: ['username']}],
        }, { model: User }],
        })

        if(!postData) {
            return res.status(404).render('404', {message: 'Post not found'});
        }
        const post = postData.get({ plain: true });
        
        res.render('post-page', { post, logged_in: req.session.logged_in, pageTitle: 'Blog City Tech'});
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
            order: [['updatedAt', 'DESC']],
        });
        
        const posts = userData.map(post => post.get({ plain: true }));

        res.render('dashboard', { posts, userId, logged_in: req.session.logged_in, pageTitle: 'Your Dashboard' });
    } catch (error) {
        res.status(500).json(error);
    }
    
});

module.exports = router;
