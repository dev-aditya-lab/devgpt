import { ChatGroq } from '@langchain/groq';
import { HumanMessage, SystemMessage, AIMessage } from '@langchain/core/messages';
import { SYSTEM_PROMPT, DEFAULT_MODEL, AI_MODELS } from '../config/ai.js';

/**
 * AI Service - LangChain + Groq Integration
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

/**
 * Create a Groq chat model instance
 * @param {string} modelId - The model ID to use
 * @returns {ChatGroq} - The chat model instance
 */
export const createChatModel = (modelId = DEFAULT_MODEL) => {
    const model = AI_MODELS.find(m => m.id === modelId);

    if (!model) {
        throw new Error(`Invalid model ID: ${modelId}`);
    }

    return new ChatGroq({
        apiKey: process.env.GROQ_API_KEY,
        model: modelId,
        temperature: 0.7,
        maxTokens: 4096,
        streaming: true
    });
};

/**
 * Convert message history to LangChain format
 * @param {Array} messages - Array of message objects with role and content
 * @returns {Array} - LangChain message objects
 */
export const formatMessages = (messages) => {
    return messages.map(msg => {
        switch (msg.role) {
            case 'system':
                return new SystemMessage(msg.content);
            case 'user':
                return new HumanMessage(msg.content);
            case 'assistant':
                return new AIMessage(msg.content);
            default:
                return new HumanMessage(msg.content);
        }
    });
};

/**
 * Generate a chat completion (non-streaming)
 * @param {Array} messages - Message history
 * @param {string} modelId - Model to use
 * @returns {Promise<string>} - AI response content
 */
export const generateCompletion = async (messages, modelId = DEFAULT_MODEL) => {
    const chatModel = createChatModel(modelId);

    const formattedMessages = [
        new SystemMessage(SYSTEM_PROMPT),
        ...formatMessages(messages)
    ];

    const response = await chatModel.invoke(formattedMessages);
    return response.content;
};

/**
 * Generate a streaming chat completion
 * @param {Array} messages - Message history
 * @param {string} modelId - Model to use
 * @returns {AsyncGenerator} - Stream of tokens
 */
export async function* streamCompletion(messages, modelId = DEFAULT_MODEL) {
    const chatModel = createChatModel(modelId);

    const formattedMessages = [
        new SystemMessage(SYSTEM_PROMPT),
        ...formatMessages(messages)
    ];

    const stream = await chatModel.stream(formattedMessages);

    for await (const chunk of stream) {
        if (chunk.content) {
            yield chunk.content;
        }
    }
}

/**
 * Generate a chat title based on the first message
 * @param {string} firstMessage - The first user message
 * @param {string} modelId - Model to use
 * @returns {Promise<string>} - Generated title
 */
export const generateChatTitle = async (firstMessage, modelId = DEFAULT_MODEL) => {
    const chatModel = createChatModel(modelId);

    const messages = [
        new SystemMessage('Generate a short, concise title (max 5 words) for a chat that starts with this message. Return only the title, nothing else.'),
        new HumanMessage(firstMessage)
    ];

    const response = await chatModel.invoke(messages);
    return response.content.slice(0, 100); // Limit to 100 chars
};

export default {
    createChatModel,
    formatMessages,
    generateCompletion,
    streamCompletion,
    generateChatTitle
};
