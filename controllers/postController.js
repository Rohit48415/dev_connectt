const Post = require('../models/Post');

// CREATE POST
exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        const post = await Post.create({
            title,
            content,
            author: req.user.id
        });

        res.json(post);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET ALL POSTS
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'name');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE POST (ONLY OWNER)
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not allowed" });
        }

        await post.deleteOne();

        res.json({ message: "Post deleted" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};