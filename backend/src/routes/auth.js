import express from 'express';
import { User } from '../models/index.js';
import { generateToken, protect } from '../middleware/index.js';
import { ApiError } from '../middleware/errorHandler.js';

/**
 * Authentication Routes
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            throw new ApiError('Please provide name, email and password', 400);
        }

        // Check if user exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            throw new ApiError('Email already registered', 400);
        }

        // Create user
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password
        });

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    preferredModel: user.preferredModel,
                    createdAt: user.createdAt
                },
                token
            }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            throw new ApiError('Please provide email and password', 400);
        }

        // Find user with password
        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

        if (!user) {
            throw new ApiError('Invalid credentials', 401);
        }

        // Check password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            throw new ApiError('Invalid credentials', 401);
        }

        // Generate token
        const token = generateToken(user._id);

        res.json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    preferredModel: user.preferredModel,
                    createdAt: user.createdAt
                },
                token
            }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/auth/me
 * @desc    Get current user
 * @access  Private
 */
router.get('/me', protect, async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        res.json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    preferredModel: user.preferredModel,
                    createdAt: user.createdAt
                }
            }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (client-side token removal)
 * @access  Private
 */
router.post('/logout', protect, (req, res) => {
    res.json({
        success: true,
        message: 'Logged out successfully'
    });
});

export default router;
