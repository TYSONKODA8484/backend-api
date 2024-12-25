import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import Notification from '../models/Notification.js';

const router = express.Router();

// Fetch user notifications
router.get('/', authMiddleware, async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Mark a notification as read
router.patch('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findById(id);

        if (!notification || notification.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        notification.read = true;
        await notification.save();

        res.status(200).json({ message: 'Notification marked as read', notification });
    } catch (error) {
        console.error('Error updating notification:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
