import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error.message); // Debugging
        res.status(500).json({ message: 'Server error' });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password are required' });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token in an httpOnly cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict',
            maxAge: 3600000, // 1 hour
        });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in user:', error.message); // Debugging
        res.status(500).json({ message: 'Server error' });
    }
};


export const getProfile = async (req,res) =>{
    try {
        const user = await User.findById(req.body.id).select('-password')
        res.status(200).json(user);
    } catch (error) {
        console.error('Get Profile Error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};


export const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.file) {
            user.profilePicture = req.file.path; // Save the file path
        }

        const { name, email } = req.body;
        user.name = name || user.name;
        user.email = email || user.email;
        await user.save();

        res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture, // Include the file path
            },
        });
    } catch (error) {
        console.error('Update Profile Error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

export const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
};

