import cron from 'node-cron';
import Post from '../models/Post.js'; // Ensure the correct path to your Post model

// Schedule a job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
    try {
        const now = new Date();
        const result = await Post.deleteMany({ expiresAt: { $lt: now } }); // Delete posts where `expiresAt` is less than now
        console.log(`Deleted ${result.deletedCount} expired posts`);
    } catch (error) {
        console.error('Error deleting expired posts:', error.message);
    }
});

// console.log('Cron job for deleting expired posts scheduled');
