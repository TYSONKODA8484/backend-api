import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        // Get the token from cookies
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Access Denied: No token provided' });
        }

        // Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach decoded user info to the request
        next();
    } catch (error) {
        console.error('Token verification error:', error.message);
        res.status(400).json({ message: 'Invalid Token' });
    }
};

export default authMiddleware;
