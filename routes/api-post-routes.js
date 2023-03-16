const express = require('express');
const {
    getPost,
    deletePost,
    getPosts,
    editPost,
    addPost,
} = require('../controllers/api-post-controller');

const router = express.Router();

// Get All Posts
router.get('/api/posts', getPosts);
// Add new Post
router.post('/api/post', addPost);
// Get Post by Id
router.get('/api/post/:id', getPost);
// Delete Post by Id
router.delete('/api/post/:id', deletePost);
// Update Post by Id
router.put('/api/post/:id', editPost);


module.exports = router;