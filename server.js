import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/connectDB.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import { Server } from 'socket.io';
import http from 'http';
import notificationRoutes from './routes/notificationRoutes.js';
import cookieParser from 'cookie-parser';
import { swaggerUi, swaggerSpec } from './config/swagger.js';

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/notifications', notificationRoutes);

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

// Create HTTP server for Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: '*', // Allow any origin for testing
        methods: ['GET', 'POST'],
    },
});

// Socket.IO Events
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('sendNotification', (data) => {
        console.log('Notification received:', data);
        socket.broadcast.emit('receiveNotification', {
            message: `Broadcast: ${data.message}`,
        });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Start the server
server.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
