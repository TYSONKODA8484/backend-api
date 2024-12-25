import express from 'express';
import {
    loginUser,
    registerUser,
    getProfile,
    updateProfile,
    logoutUser
} from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { validateRegistration } from '../middlewares/validationMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Authentication routes
router.post('/register', validateRegistration, registerUser); // Register route
router.post('/login', loginUser); // Login route

// Protected routes
router.get('/profile', authMiddleware, getProfile); // Get user profile

// Update profile with profile picture or other details
router.put(
    '/profile',
    authMiddleware,
    upload.single('profilePicture'), // File upload middleware
    updateProfile
);

router.post('/logout', logoutUser);


export default router;
