const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const auth = require('../utils/authorization');

//route to homepage
router.get('/', async (req, res) => {
    res.render('homepage');
})

//route to login page
router.get('/login', async (req, res) => {
    res.render('login');
})

//route to dashboard
router.get('/dashboard', auth, async (req, res) => {
    res.render('dashboard');
})

module.exports = router;
