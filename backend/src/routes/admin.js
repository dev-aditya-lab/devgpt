import express from 'express';
import { protect, admin } from '../middleware/index.js';
import * as adminService from '../services/admin.service.js';
import { ActivityLog } from '../models/index.js';

const router = express.Router();

// Apply protection and admin check to all routes
router.use(protect, admin);

/**
 * @route   GET /api/admin/stats
 * @desc    Get dashboard overview stats
 */
router.get('/stats', async (req, res, next) => {
    try {
        const stats = await adminService.getDashboardStats();
        res.json({ success: true, data: stats });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/admin/analytics
 * @desc    Get analytics data (locations, growth)
 */
router.get('/analytics', async (req, res, next) => {
    try {
        const analytics = await adminService.getAnalytics();
        res.json({ success: true, data: analytics });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/admin/users
 * @desc    Get paginated users list
 */
router.get('/users', async (req, res, next) => {
    try {
        const { page, limit, search } = req.query;
        const result = await adminService.getUsers(page, limit, search);
        res.json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/admin/users/:id
 * @desc    Get user details
 */
router.get('/users/:id', async (req, res, next) => {
    try {
        const result = await adminService.getUserDetails(req.params.id);
        res.json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   PATCH /api/admin/users/:id
 * @desc    Update user
 */
router.patch('/users/:id', async (req, res, next) => {
    try {
        const updatedUser = await adminService.updateUserStatus(req.params.id, req.body);

        await ActivityLog.create({
            user: req.user._id,
            action: 'ADMIN_UPDATE_USER',
            details: { targetUser: req.params.id, updates: req.body },
            ipAddress: req.ip,
            userAgent: req.headers['user-agent']
        });

        res.json({ success: true, data: updatedUser });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   DELETE /api/admin/users/:id
 * @desc    Delete user permanently
 */
router.delete('/users/:id', async (req, res, next) => {
    try {
        await adminService.deleteUser(req.params.id);

        await ActivityLog.create({
            user: req.user._id,
            action: 'ADMIN_DELETE_USER',
            details: { deletedUserId: req.params.id },
            ipAddress: req.ip,
            userAgent: req.headers['user-agent']
        });

        res.json({ success: true, message: 'User deleted' });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   POST /api/admin/ban
 * @desc    Ban IP or Device
 */
router.post('/ban', async (req, res, next) => {
    try {
        const ban = await adminService.banIdentity(req.user._id, req.body);

        await ActivityLog.create({
            user: req.user._id,
            action: 'ADMIN_BAN_IDENTITY',
            details: ban,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent']
        });

        res.status(201).json({ success: true, data: ban });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/admin/chats
 * @desc    Get recent chats globally
 */
router.get('/chats', async (req, res, next) => {
    try {
        const chats = await adminService.getGlobalChats();
        res.json({ success: true, data: chats });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/admin/contacts
 * @desc    Get contact submissions
 */
router.get('/contacts', async (req, res, next) => {
    try {
        const { status, page, limit } = req.query;
        const result = await adminService.getContacts(status, page, limit);
        res.json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   PATCH /api/admin/contacts/:id
 * @desc    Update contact status
 */
router.patch('/contacts/:id', async (req, res, next) => {
    try {
        const contact = await adminService.updateContactStatus(req.params.id, req.body.status);
        res.json({ success: true, data: contact });
    } catch (error) {
        next(error);
    }
});

export default router;
