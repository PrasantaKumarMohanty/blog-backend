const Blog = require('../models/blogModel');
const Pusher = require('pusher');
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
});

async function createBlog(req, res) {
    const { title, description, image } = req.body;

    try {
        const newBlog = await Blog.create({ title, description, image });
        // Trigger a Pusher event
        pusher.trigger('blog', 'new-blog', { blog: newBlog });
        console.log('Pusher event triggered:', newBlog);
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// async function createBlog(req, res) {
//     const { title, description, image } = req.body;

//     try {
//         const newBlog = await Blog.create({ title, description, image });
//         res.status(201).json(newBlog);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

async function getAllBlogs(req, res) {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function editBlog(req, res) {
    const blogId = req.params.id;
    const { title, description, image } = req.body;

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, { title, description, image }, { new: true });

        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deleteBlog(req, res) {
    const blogId = req.params.id;

    try {
        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async function getBlogById(req, res) {
    const blogId = req.params.id;

    try {
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createBlog,
    getAllBlogs,
    editBlog,
    deleteBlog,
    getBlogById
};
