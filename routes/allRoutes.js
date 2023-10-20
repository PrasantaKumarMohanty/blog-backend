const express = require('express');
const router = express.Router();
const {
    signup,
    login
} = require('../controllers/userController');

const {
    createBlog,
    getAllBlogs,
    editBlog,
    deleteBlog,
    getBlogById
} = require('../controllers/blogController');

router.get('/', (req, res) => {
    res.send('Welcome here!');
});

// User Auth
router.post('/signup', signup);
router.post('/login', login);

// Blogs
router.post('/add-blog', createBlog);
router.get('/all-blogs', getAllBlogs);
router.put('/edit-blog/:id', editBlog);
router.delete('/delete-blog/:id', deleteBlog);
router.get('/search-blog/:id', getBlogById);

module.exports = router;