import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
        index: true
    },
    title: {
        type: String,
        default: 'New Chat',
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    model: {
        type: String,
        default: 'llama-3.3-70b-versatile'
    },
    messageCount: {
        type: Number,
        default: 0
    },
    lastMessageAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for faster queries
chatSchema.index({ user: 1, updatedAt: -1 });

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
