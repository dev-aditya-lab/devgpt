import express from 'express';
import { User } from '../models/index.js';
import { protect } from '../middleware/index.js';
import { ApiError } from '../middleware/errorHandler.js';

/**
 * User Routes
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

const router = express.Router();

/**
 * @route   GET /api/user/profile
 * @desc    Get user profile
 * @access  Private
 */
router.get('/profile', protect, async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        res.json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                preferredModel: user.preferredModel,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   PUT /api/user/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/profile', protect, async (req, res, next) => {
    try {
        const { name, avatar, preferredModel } = req.body;

        const updateFields = {};
        if (name) updateFields.name = name;
        if (avatar !== undefined) updateFields.avatar = avatar;
        if (preferredModel) updateFields.preferredModel = preferredModel;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            updateFields,
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                preferredModel: user.preferredModel,
                updatedAt: user.updatedAt
            }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   PUT /api/user/password
 * @desc    Update user password
 * @access  Private
 */
router.put('/password', protect, async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            throw new ApiError('Please provide current and new password', 400);
        }

        if (newPassword.length < 6) {
            throw new ApiError('New password must be at least 6 characters', 400);
        }

        // Get user with password
        const user = await User.findById(req.user._id).select('+password');

        // Check current password
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            throw new ApiError('Current password is incorrect', 401);
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.json({
            success: true,
            message: 'Password updated successfully'
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   DELETE /api/user/account
 * @desc    Delete user account
 * @access  Private
 */
router.delete('/account', protect, async (req, res, next) => {
    try {
        // Import here to avoid circular dependency
        const { Chat, Message } = await import('../models/index.js');

        // Delete user's chats and messages
        const chats = await Chat.find({ user: req.user._id }).select('_id');
        const chatIds = chats.map(c => c._id);

        await Message.deleteMany({ chat: { $in: chatIds } });
        await Chat.deleteMany({ user: req.user._id });

        // Delete user
        await User.findByIdAndDelete(req.user._id);

        res.json({
            success: true,
            message: 'Account deleted successfully'
        });
    } catch (error) {
        next(error);
    }
});

export default router;
