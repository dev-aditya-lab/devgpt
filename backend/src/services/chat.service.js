import { Chat, Message } from '../models/index.js';
import { generateChatTitle } from './ai.service.js';

/**
 * Chat Service - Business logic for chat operations
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

/**
 * Create a new chat for a user
 * @param {string|null} userId - User ID (optional)
 * @param {string} modelId - Initial model ID
 * @returns {Promise<Chat>} - Created chat
 */
export const createChat = async (userId, modelId = 'llama-3.3-70b-versatile') => {
    const chat = new Chat({
        user: userId, // Can be null
        title: 'New Chat',
        model: modelId
    });

    await chat.save();
    return chat;
};

/**
 * Get all chats for a user
 * @param {string} userId - User ID
 * @param {number} limit - Max chats to return
 * @param {number} skip - Number to skip (pagination)
 * @returns {Promise<Array>} - Array of chats
 */
export const getUserChats = async (userId, limit = 50, skip = 0) => {
    if (!userId) return []; // Guests don't have saved chats list

    return await Chat.find({ user: userId })
        .sort({ updatedAt: -1 })
        .limit(limit)
        .skip(skip)
        .lean();
};

/**
 * Get a single chat by ID
 * @param {string} chatId - Chat ID
 * @param {string|null} userId - User ID (for authorization)
 * @returns {Promise<Chat|null>} - Chat or null
 */
export const getChatById = async (chatId, userId) => {
    // If userId provided, check ownership. If not, check if chat has no user (guest chat)
    const query = { _id: chatId };
    if (userId) {
        query.user = userId;
    } else {
        query.user = null;
    }

    // Allow accessing guest chats even if logged in? 
    // Usually logged in users should only see their own.
    // But if a user created a chat while logged out, they might want to see it?
    // For now, strict: Logged in -> Own chats. Guest -> Guest chats.

    return await Chat.findOne(query).lean();
};

/**
 * Get messages for a chat
 * @param {string} chatId - Chat ID
 * @param {number} limit - Max messages to return
 * @returns {Promise<Array>} - Array of messages
 */
export const getChatMessages = async (chatId, limit = 100) => {
    return await Message.find({ chat: chatId })
        .sort({ createdAt: 1 })
        .limit(limit)
        .lean();
};

/**
 * Add a message to a chat
 * @param {string} chatId - Chat ID
 * @param {string} role - Message role (user/assistant)
 * @param {string} content - Message content
 * @param {string} model - Model used (for assistant messages)
 * @returns {Promise<Message>} - Created message
 */
export const addMessage = async (chatId, role, content, model = null) => {
    const message = new Message({
        chat: chatId,
        role,
        content,
        model
    });

    await message.save();

    // Update chat metadata
    await Chat.findByIdAndUpdate(chatId, {
        lastMessageAt: new Date(),
        $inc: { messageCount: 1 }
    });

    return message;
};

/**
 * Update chat title based on first message
 * @param {string} chatId - Chat ID
 * @param {string} firstMessage - First user message
 * @param {string} modelId - Model to use for title generation
 */
export const updateChatTitle = async (chatId, firstMessage, modelId) => {
    try {
        const title = await generateChatTitle(firstMessage, modelId);
        await Chat.findByIdAndUpdate(chatId, { title });
    } catch (error) {
        console.error('Failed to generate chat title:', error.message);
        // Keep default title on error
    }
};

/**
 * Delete a chat and its messages
 * @param {string} chatId - Chat ID
 * @param {string} userId - User ID (for authorization)
 * @returns {Promise<boolean>} - Success status
 */
export const deleteChat = async (chatId, userId) => {
    const chat = await Chat.findOne({ _id: chatId, user: userId });

    if (!chat) {
        return false;
    }

    // Delete all messages in the chat
    await Message.deleteMany({ chat: chatId });

    // Delete the chat
    await Chat.deleteOne({ _id: chatId });

    return true;
};

/**
 * Clear all chats for a user
 * @param {string} userId - User ID
 * @returns {Promise<number>} - Number of deleted chats
 */
export const clearUserChats = async (userId) => {
    const chats = await Chat.find({ user: userId }).select('_id');
    const chatIds = chats.map(c => c._id);

    // Delete all messages
    await Message.deleteMany({ chat: { $in: chatIds } });

    // Delete all chats
    const result = await Chat.deleteMany({ user: userId });

    return result.deletedCount;
};

export default {
    createChat,
    getUserChats,
    getChatById,
    getChatMessages,
    addMessage,
    updateChatTitle,
    deleteChat,
    clearUserChats
};
