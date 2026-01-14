import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Can be null for failed login attempts by unknown users if we decide to track that
    },
    action: {
        type: String,
        required: true,
        index: true
    },
    details: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    ipAddress: {
        type: String,
        default: null
    },
    location: {
        country: { type: String, default: null },
        city: { type: String, default: null },
        region: { type: String, default: null },
        timezone: { type: String, default: null }
    },
    userAgent: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: '90d' } // Auto-delete logs after 90 days to save space
    }
}, {
    timestamps: true
});

// Index for efficient querying of user history
activityLogSchema.index({ user: 1, createdAt: -1 });

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

export default ActivityLog;
