const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { createPost, getPosts, deletePost } = require('../controllers/postController');

router.post('/', auth, createPost);
router.get('/', getPosts);
router.delete('/:id', auth, deletePost);

module.exports = router;