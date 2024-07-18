const router = require('express').Router();
const auth = require('../utils/authorization');

router.get('/', auth, async (req, res) => {
    res.render('dashboard');
})

module.exports = router;