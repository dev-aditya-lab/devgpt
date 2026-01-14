import express from 'express';
import { User, ActivityLog, Blacklist } from '../models/index.js';
import { generateToken, protect } from '../middleware/index.js';
import { ApiError } from '../middleware/errorHandler.js';

/**
 * Authentication Routes
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

const router = express.Router();

// Helper to check blacklist
const checkBlacklist = async (ip, deviceId) => {
    if (ip) {
        const ipBan = await Blacklist.findOne({ type: 'ip', value: ip });
        if (ipBan) return `Your IP address has been banned: ${ipBan.reason}`;
    }
    if (deviceId) {
        const deviceBan = await Blacklist.findOne({ type: 'device', value: deviceId });
        if (deviceBan) return `Your device has been banned: ${deviceBan.reason}`;
    }
    return null;
};

// Helper to log activity
const logActivity = async (userId, action, details, req) => {
    try {
        await ActivityLog.create({
            user: userId,
            action,
            details,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent']
        });
    } catch (err) {
        console.error('Failed to log activity:', err);
    }
};

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const deviceId = req.headers['x-device-id'];
        const ip = req.ip;

        // Check blacklist
        const banReason = await checkBlacklist(ip, deviceId);
        if (banReason) {
            throw new ApiError(banReason, 403);
        }

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

        // Log activity
        logActivity(user._id, 'REGISTER', { email: user.email }, req);

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
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
        const deviceId = req.headers['x-device-id'];
        const ip = req.ip;

        // Check blacklist
        const banReason = await checkBlacklist(ip, deviceId);
        if (banReason) {
            throw new ApiError(banReason, 403);
        }

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

        // Check if user is banned specifically
        if (user.isBanned) {
            throw new ApiError('Your account has been restricted.', 403);
        }

        // Update last login
        user.lastLogin = Date.now();
        await user.save();

        // Log activity
        logActivity(user._id, 'LOGIN', {}, req);

        // Generate token
        const token = generateToken(user._id);

        res.json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
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
 * @route   POST /api/auth/admin-login
 * @desc    Login for Admin Dashboard
 * @access  Public (protected by secret code)
 */
router.post('/admin-login', async (req, res, next) => {
    try {
        const { email, password, secretCode } = req.body;

        const ADMIN_SECRET_CODE = '914212'; // Ideally from ENV

        if (secretCode !== ADMIN_SECRET_CODE) {
            throw new ApiError('Invalid Access Code', 403);
        }

        // Find user
        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

        if (!user || user.role !== 'admin') {
            throw new ApiError('Invalid Admin Credentials', 401);
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new ApiError('Invalid Admin Credentials', 401);
        }

        // Log admin login
        logActivity(user._id, 'ADMIN_LOGIN', {}, req);

        const token = generateToken(user._id);

        res.json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
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
                    role: user.role,
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
    logActivity(req.user._id, 'LOGOUT', {}, req);
    res.json({
        success: true,
        message: 'Logged out successfully'
    });
});

export default router;
