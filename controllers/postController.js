import Post from '../models/Post.js';
import Notification from '../models/Notification.js';

// Create a new post
export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const post = new Post({ title, content, author: req.user.id });
        await post.save();

        res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        console.error('Error creating post:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fetch all posts
export const getPost = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'name email');
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a post
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to edit this post' });
        }

        post.title = title || post.title;
        post.content = content || post.content;
        await post.save();

        res.status(200).json({ message: 'Post updated successfully', post });
    } catch (error) {
        console.error('Update Post Error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a post
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to delete this post' });
        }

        await post.remove();
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Delete Post Error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a comment to a post
export const commentOnPost = async (req, res) => {
    try {
        const { postId, comment } = req.body;

        if (!comment) {
            return res.status(400).json({ message: 'Comment is required' });
        }

        const post = await Post.findById(postId).populate('author', 'name email');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.comments.push({ user: req.user.id, comment });
        await post.save();

        // Save notification for the post author
        const notification = new Notification({
            user: post.author._id,
            message: `${req.user.name} commented on your post.`,
        });
        await notification.save();

        res.status(200).json({ message: 'Comment added successfully', post });
    } catch (error) {
        console.error('Error adding comment:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Search and filter posts
export const searchAndFilterPosts = async (req, res) => {
    try {
        const { query, author, startDate, endDate, page = 1, limit = 10 } = req.query;

        // Build the filter object
        const filter = {};
        if (query) filter.$text = { $search: query };
        if (author) filter.author = author;
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) filter.createdAt.$gte = new Date(startDate);
            if (endDate) filter.createdAt.$lte = new Date(endDate);
        }

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        const posts = await Post.find(filter)
            .sort({ createdAt: -1 })
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);

        const totalPosts = await Post.countDocuments(filter);

        res.status(200).json({
            totalPosts,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalPosts / limitNumber),
            posts,
        });
    } catch (error) {
        console.error('Error searching and filtering posts:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
