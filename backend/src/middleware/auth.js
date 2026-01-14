import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

/**
 * Authentication Middleware
 * Verifies JWT token and attaches user to request
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

/**
 * Protect routes - require authentication
 */
export const protect = async (req, res, next) => {
    try {
        let token;

        // Get token from header
        if (req.headers.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this route'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from token
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if user is banned
        if (user.isBanned) {
            return res.status(403).json({
                success: false,
                message: 'Your account has been banned. Please contact support.'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error.message);
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'
        });
    }
};

/**
 * Optional authentication - attach user if token present
 * Allows both authenticated and unauthenticated access
 * BUT blocks banned users
 */
export const optionalAuth = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);

            // Block banned users
            if (user && user.isBanned) {
                return res.status(403).json({
                    success: false,
                    message: 'Your account has been banned. Please contact support.'
                });
            }

            req.user = user;
        }

        next();
    } catch (error) {
        // Token invalid, continue without user
        next();
    }
};

/**
 * Generate JWT token
 * @param {string} id - User ID
 * @returns {string} - JWT token
 */
export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });
};

export default { protect, optionalAuth, generateToken };
