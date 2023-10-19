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

// const Pusher = require('pusher');
// const pusher = new Pusher({
//   appId: process.env.PUSHER_APP_ID,
//   key: process.env.PUSHER_KEY,
//   secret: process.env.PUSHER_SECRET,
//   cluster: process.env.PUSHER_CLUSTER,
//   useTLS: true
// });

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

// Pusher
// router.post('/trigger-event', (req, res) => {
//     const { channel, event, data } = req.body;

//     pusher.trigger(channel, event, data)
//         .then(() => {
//             res.json({ message: 'Event triggered successfully' });
//         })
//         .catch(error => {
//             res.status(500).json({ message: 'Error triggering event', error: error.message });
//         });
// });


module.exports = router;