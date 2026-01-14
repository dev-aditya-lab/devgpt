import { User, Chat, Message, ActivityLog, Blacklist, ContactSubmission } from '../models/index.js';
import { ApiError } from '../middleware/errorHandler.js';

/**
 * Get dashboard stats
 */
export const getDashboardStats = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
        totalUsers,
        newUsersToday,
        totalChats,
        chatsToday,
        totalMessages,
        messagesToday,
        newContacts
    ] = await Promise.all([
        User.countDocuments(),
        User.countDocuments({ createdAt: { $gte: today } }),
        Chat.countDocuments(),
        Chat.countDocuments({ createdAt: { $gte: today } }),
        Message.countDocuments(),
        Message.countDocuments({ createdAt: { $gte: today } }),
        ContactSubmission.countDocuments({ status: 'new' })
    ]);

    return {
        users: { total: totalUsers, today: newUsersToday },
        chats: { total: totalChats, today: chatsToday },
        messages: { total: totalMessages, today: messagesToday },
        contacts: { pending: newContacts }
    };
};

/**
 * Get analytics data (location breakdown, growth)
 */
export const getAnalytics = async () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Get location analytics from activity logs
    const locationStats = await ActivityLog.aggregate([
        { $match: { 'location.country': { $ne: null } } },
        { $group: { _id: '$location.country', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
    ]);

    // Get daily user growth for last 7 days
    const dailyGrowth = await User.aggregate([
        { $match: { createdAt: { $gte: sevenDaysAgo } } },
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ]);

    // Recent activity summary
    const recentLogins = await ActivityLog.countDocuments({
        action: 'LOGIN',
        createdAt: { $gte: sevenDaysAgo }
    });

    return {
        topCountries: locationStats.map(l => ({ country: l._id, logins: l.count })),
        dailyGrowth: dailyGrowth.map(d => ({ date: d._id, users: d.count })),
        weeklyLogins: recentLogins
    };
};

/**
 * Get users with pagination and search
 */
export const getUsers = async (page = 1, limit = 10, search = '') => {
    const query = {};
    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
        ];
    }

    const users = await User.find(query)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    const total = await User.countDocuments(query);

    return {
        users,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / limit)
        }
    };
};

/**
 * Get user details with logs and recent chats
 */
export const getUserDetails = async (userId) => {
    const user = await User.findById(userId).select('-password');
    if (!user) throw new ApiError('User not found', 404);

    const [logs, chats, chatCount, messageCount] = await Promise.all([
        ActivityLog.find({ user: userId }).sort({ createdAt: -1 }).limit(50),
        Chat.find({ user: userId }).sort({ updatedAt: -1 }).limit(10),
        Chat.countDocuments({ user: userId }),
        Message.countDocuments({ chat: { $in: await Chat.find({ user: userId }).select('_id') } })
    ]);

    return {
        user,
        logs,
        chats,
        stats: { totalChats: chatCount, totalMessages: messageCount }
    };
};

/**
 * Update user (CRUD)
 */
export const updateUserStatus = async (userId, updates) => {
    const user = await User.findById(userId);
    if (!user) throw new ApiError('User not found', 404);

    // Allowed fields to update
    if (updates.role) user.role = updates.role;
    if (typeof updates.isBanned === 'boolean') user.isBanned = updates.isBanned;
    if (updates.name) user.name = updates.name;

    await user.save();
    return user;
};

/**
 * Delete user (hard delete)
 */
export const deleteUser = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new ApiError('User not found', 404);

    // Delete user's chats and messages
    const chats = await Chat.find({ user: userId }).select('_id');
    await Message.deleteMany({ chat: { $in: chats } });
    await Chat.deleteMany({ user: userId });
    await ActivityLog.deleteMany({ user: userId });
    await User.findByIdAndDelete(userId);

    return { deleted: true };
};

/**
 * Ban IP or Device
 */
export const banIdentity = async (adminId, { type, value, reason }) => {
    if (!['ip', 'device'].includes(type)) {
        throw new ApiError('Invalid ban type', 400);
    }
    if (!value) {
        throw new ApiError('Value is required', 400);
    }

    const existing = await Blacklist.findOne({ type, value });
    if (existing) {
        throw new ApiError(`${type.toUpperCase()} is already banned`, 400);
    }

    const ban = await Blacklist.create({
        type,
        value,
        reason,
        createdBy: adminId
    });

    return ban;
};

/**
 * Get recent global chats
 */
export const getGlobalChats = async (limit = 20) => {
    return await Chat.find()
        .populate('user', 'name email avatar')
        .sort({ updatedAt: -1 })
        .limit(limit);
};

/**
 * Get contact submissions
 */
export const getContacts = async (status = null, page = 1, limit = 20) => {
    const query = status ? { status } : {};

    const contacts = await ContactSubmission.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    const total = await ContactSubmission.countDocuments(query);

    return {
        contacts,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    };
};

/**
 * Update contact status
 */
export const updateContactStatus = async (contactId, status) => {
    const contact = await ContactSubmission.findByIdAndUpdate(
        contactId,
        { status },
        { new: true }
    );
    if (!contact) throw new ApiError('Contact not found', 404);
    return contact;
};

