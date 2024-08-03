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

});

//get request for specific post data
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {

        });
        res.status(200).json(postData);
    } catch (error) {
        res.status(404).json({ message: 'Post data not found.' });
    }
});

//route to edit posts
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.findByPk(id);
        if (!post) {
            res.status(404).json({ message: 'Post not found with that ID!' });
            return;
        }
        const updatedPost = await post.update({
            title: req.body.title,
            content: req.body.content,
            author_id: req.body.author_id,
        });
        res.status(200).json({ message: 'Post updated successfully!' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

module.exports = router;