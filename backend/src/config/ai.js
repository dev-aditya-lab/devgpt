/**
 * Available AI Models Configuration
 * All models are free to use via Groq API
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

export const AI_MODELS = [
    {
        id: 'llama-3.3-70b-versatile',
        name: 'Llama 3.3 70B',
        description: 'Best for complex coding tasks with high accuracy',
        provider: 'Meta',
        contextWindow: 128000,
        isDefault: true
    },
    {
        id: 'llama-3.1-70b-versatile',
        name: 'Llama 3.1 70B',
        description: 'Great balance of speed and quality',
        provider: 'Meta',
        contextWindow: 128000,
        isDefault: false
    },
    {
        id: 'llama-3.1-8b-instant',
        name: 'Llama 3.1 8B',
        description: 'Fast responses for simple queries',
        provider: 'Meta',
        contextWindow: 128000,
        isDefault: false
    },
    {
        id: 'mixtral-8x7b-32768',
        name: 'Mixtral 8x7B',
        description: 'Good for diverse coding questions',
        provider: 'Mistral AI',
        contextWindow: 32768,
        isDefault: false
    },
    {
        id: 'gemma2-9b-it',
        name: 'Gemma 2 9B',
        description: 'Efficient and capable for general tasks',
        provider: 'Google',
        contextWindow: 8192,
        isDefault: false
    }
];

export const DEFAULT_MODEL = AI_MODELS.find(m => m.isDefault)?.id || 'llama-3.3-70b-versatile';

/**
 * System prompt for the coding assistant
 */
export const SYSTEM_PROMPT = `You are DevGPT, an expert AI coding assistant created by Aditya Kumar Gupta (devaditya.dev).

Your capabilities:
- Write clean, efficient, and well-documented code
- Debug and fix code issues
- Explain complex programming concepts clearly
- Suggest best practices and optimizations
- Support multiple programming languages

Guidelines:
- Always provide complete, working code examples
- Use proper formatting with code blocks and syntax highlighting
- Be concise but thorough in explanations
- If unsure, acknowledge limitations honestly
- Format code using markdown code blocks with language specification

Remember: You're helping developers write better code. Be helpful, accurate, and professional.`;
