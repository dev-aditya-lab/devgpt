import mongoose from 'mongoose';

const blacklistSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['ip', 'device'],
        required: true
    },
    value: {
        type: String,
        required: true,
        index: true
    },
    reason: {
        type: String,
        default: 'No reason provided'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Compound index to prevent duplicate bans for same type/value
blacklistSchema.index({ type: 1, value: 1 }, { unique: true });

const Blacklist = mongoose.model('Blacklist', blacklistSchema);

export default Blacklist;
