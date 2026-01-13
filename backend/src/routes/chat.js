import express from 'express';
import chatService from '../services/chat.service.js';
import { streamCompletion } from '../services/ai.service.js';
import { protect } from '../middleware/index.js';
import { ApiError } from '../middleware/errorHandler.js';

/**
 * Chat Routes
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

const router = express.Router();

/**
 * @route   GET /api/chat
 * @desc    Get all chats for the current user
 * @access  Private
 */
router.get('/', protect, async (req, res, next) => {
    try {
        const { limit = 50, skip = 0 } = req.query;

        const chats = await chatService.getUserChats(
            req.user._id,
            parseInt(limit),
            parseInt(skip)
        );

        res.json({
            success: true,
            count: chats.length,
            data: chats
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   POST /api/chat
 * @desc    Create a new chat
 * @access  Private
 */
router.post('/', protect, async (req, res, next) => {
    try {
        const { model } = req.body;

        const chat = await chatService.createChat(req.user._id, model);

        res.status(201).json({
            success: true,
            data: chat
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/chat/:id
 * @desc    Get a single chat with messages
 * @access  Private
 */
router.get('/:id', protect, async (req, res, next) => {
    try {
        const chat = await chatService.getChatById(req.params.id, req.user._id);

        if (!chat) {
            throw new ApiError('Chat not found', 404);
        }

        const messages = await chatService.getChatMessages(req.params.id);

        res.json({
            success: true,
            data: {
                ...chat,
                messages
            }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   POST /api/chat/:id/message
 * @desc    Send a message and get AI response (streaming)
 * @access  Private
 */
router.post('/:id/message', protect, async (req, res, next) => {
    try {
        const { content, model } = req.body;
        const chatId = req.params.id;

        if (!content) {
            throw new ApiError('Message content is required', 400);
        }

        // Verify chat belongs to user
        const chat = await chatService.getChatById(chatId, req.user._id);
        if (!chat) {
            throw new ApiError('Chat not found', 404);
        }

        // Save user message
        await chatService.addMessage(chatId, 'user', content);

        // Get chat history for context
        const messages = await chatService.getChatMessages(chatId);

        // Set up SSE for streaming
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('X-Accel-Buffering', 'no');

        // Stream AI response
        let fullResponse = '';
        const modelToUse = model || chat.model || 'llama-3.3-70b-versatile';

        try {
            for await (const chunk of streamCompletion(messages, modelToUse)) {
                fullResponse += chunk;
                res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`);
            }

            // Save complete AI response
            await chatService.addMessage(chatId, 'assistant', fullResponse, modelToUse);

            // Update chat title if this is first message pair
            if (messages.length <= 1) {
                chatService.updateChatTitle(chatId, content, modelToUse);
            }

            res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
            res.end();
        } catch (streamError) {
            console.error('Streaming error:', streamError);
            res.write(`data: ${JSON.stringify({ error: streamError.message })}\n\n`);
            res.end();
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @route   DELETE /api/chat/:id
 * @desc    Delete a chat
 * @access  Private
 */
router.delete('/:id', protect, async (req, res, next) => {
    try {
        const deleted = await chatService.deleteChat(req.params.id, req.user._id);

        if (!deleted) {
            throw new ApiError('Chat not found', 404);
        }

        res.json({
            success: true,
            message: 'Chat deleted successfully'
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   DELETE /api/chat
 * @desc    Clear all chats for current user
 * @access  Private
 */
router.delete('/', protect, async (req, res, next) => {
    try {
        const deletedCount = await chatService.clearUserChats(req.user._id);

        res.json({
            success: true,
            message: `Deleted ${deletedCount} chats`
        });
    } catch (error) {
        next(error);
    }
});

export default router;
