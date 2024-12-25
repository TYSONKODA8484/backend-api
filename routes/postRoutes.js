import express from 'express';
import {
    createPost,
    getPost,
    updatePost,
    deletePost,
    commentOnPost,
    searchAndFilterPosts,
} from '../controllers/postController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protected routes
router.post('/', authMiddleware, createPost); // Create a new post
router.put('/:id', authMiddleware, updatePost); // Update a post
router.delete('/:id', authMiddleware, deletePost); // Delete a post
router.post('/comment', authMiddleware, commentOnPost); // Comment on a post
router.get('/search', authMiddleware, searchAndFilterPosts); // Search and filter posts

// Public routes
router.get('/', getPost); // Get all posts

export default router;
