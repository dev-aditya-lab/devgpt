import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database.js';
import { notFound, errorHandler } from './middleware/index.js';
import {
    authRoutes,
    userRoutes,
    chatRoutes,
    modelsRoutes,
    healthRoutes
} from './routes/index.js';

/**
 * DevGPT Backend Server
 * AI Coding Assistant API
 * 
 * Created by: Aditya Kumar Gupta
 * Email: hello@devaditya.dev
 * Website: https://devaditya.dev
 * GitHub: https://github.com/dev-aditya-lab
 */

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to database
connectDatabase();

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging in development
if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.path}`);
        next();
    });
}

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/models', modelsRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({
        name: 'DevGPT API',
        version: '1.0.0',
        description: 'AI Coding Assistant Backend',
        author: {
            name: 'Aditya Kumar Gupta',
            email: 'hello@devaditya.dev',
            website: 'https://devaditya.dev',
            github: 'https://github.com/dev-aditya-lab'
        },
        endpoints: {
            health: '/api/health',
            auth: '/api/auth',
            user: '/api/user',
            chat: '/api/chat',
            models: '/api/models'
        }
    });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║                                                        ║
║   🚀 DevGPT Backend Server                             ║
║   ────────────────────────────────────────────         ║
║   Port: ${PORT}                                           ║
║   Mode: ${process.env.NODE_ENV || 'development'}                                  ║
║                                                        ║
║   Created by: Aditya Kumar Gupta                       ║
║   Website: https://devaditya.dev                       ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
  `);
});

export default app;
