import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/connectDB.js'; // Ensure the correct path
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import { Server } from 'socket.io';
import http from 'http'
// import './cron/deleteExpiredPosts.js';


dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/posts', postRoutes); // Post routes

// Connect to the database
connectDB();

// Default route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error' });
});

// Start the server
app.listen(port, () => {
    console.log(`App is listening at port no ${port}`);
});


