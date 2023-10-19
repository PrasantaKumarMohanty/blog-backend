const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String, // You might want to store the image URL or file path
  createdDate: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;