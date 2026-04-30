const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middlewares/authMiddleware');

router.get('/login', (req, res) => {
    res.render('pages/login');
});

router.get('/register', (req, res) => {
    res.render('pages/register');
});

router.get('/dashboard', auth, async (req, res) => {
    const posts = await Post.find().populate('author', 'name');
    res.render('pages/dashboard', { posts });
});

router.get('/create', auth, (req, res) => {
    res.render('pages/createPost');
});

router.get('/logout', (req, res) => {
    res.clearCookie("token");
    res.redirect('/login');
});

module.exports = router;