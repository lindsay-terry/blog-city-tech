const router = require('express').Router();
const { Post, User } = require('../../models');

//api/posts endpoint

//post request to create new post
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            author_id: req.body.author_id,
        });

        res.status(200).json(newPost);
    } catch(error) {
        res.status(400).json({ message: 'Error processing request' });
    }

})

module.exports = router;