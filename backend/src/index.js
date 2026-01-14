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
    healthRoutes,
    adminRoutes,
    contactRoutes
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
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

// Helper to format uptime
const formatUptime = (seconds) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);
    return `${d > 0 ? d + 'd ' : ''}${h}h ${m}m ${s}s`;
};

// Root route
app.get('/', (req, res) => {
    import('mongoose').then(({ default: mongoose }) => {
        const dbStatus = mongoose.connection.readyState;
        const statusMap = {
            0: { label: 'Disconnected', color: '#ff4b4b' },
            1: { label: 'Connected', color: '#00cc88' },
            2: { label: 'Connecting', color: '#ffaa00' },
            3: { label: 'Disconnecting', color: '#ffaa00' },
        };
        const status = statusMap[dbStatus] || { label: 'Unknown', color: '#999' };

        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>DevGPT Server Status</title>
            <style>
                body {
                    font-family: 'Segoe UI', system-ui, sans-serif;
                    background-color: #0d1117;
                    color: #c9d1d9;
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                }
                .container {
                    background: #161b22;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
                    border: 1px solid #30363d;
                    max-width: 500px;
                    width: 100%;
                }
                h1 { margin: 0 0 1.5rem; color: #58a6ff; font-size: 1.8rem; display: flex; align-items: center; gap: 10px; }
                .status-card {
                    background: #21262d;
                    border-radius: 8px;
                    padding: 1rem;
                    margin-bottom: 1rem;
                    border: 1px solid #30363d;
                }
                .status-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                }
                .status-row:last-child { margin-bottom: 0; }
                .label { color: #8b949e; font-size: 0.9rem; }
                .value { font-weight: 600; font-family: monospace; }
                .badge {
                    padding: 4px 8px;
                    border-radius: 12px;
                    font-size: 0.8rem;
                    font-weight: bold;
                    color: #0d1117;
                }
                .links { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; margin-top: 1.5rem; }
                .link-btn {
                    text-decoration: none;
                    background: #21262d;
                    color: #58a6ff;
                    padding: 0.8rem;
                    text-align: center;
                    border-radius: 6px;
                    transition: all 0.2s;
                    border: 1px solid #30363d;
                }
                .link-btn:hover { background: #30363d; border-color: #58a6ff; }
                .footer { margin-top: 1.5rem; text-align: center; font-size: 0.8rem; color: #484f58; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🚀 DevGPT Backend</h1>
                
                <div class="status-card">
                    <div class="status-row">
                        <span class="label">Database Status</span>
                        <span class="badge" style="background-color: ${status.color}">${status.label}</span>
                    </div>
                    <div class="status-row">
                        <span class="label">Host</span>
                        <span class="value">${mongoose.connection.host || 'Unknown'}</span>
                    </div>
                     <div class="status-row">
                        <span class="label">Database</span>
                        <span class="value">${mongoose.connection.name || 'Unknown'}</span>
                    </div>
                </div>

                <div class="status-card">
                    <div class="status-row">
                        <span class="label">Server Uptime</span>
                        <span class="value">${formatUptime(process.uptime())}</span>
                    </div>
                    <div class="status-row">
                        <span class="label">Environment</span>
                        <span class="value" style="color: #bc8cff">${process.env.NODE_ENV || 'development'}</span>
                    </div>
                    <div class="status-row">
                        <span class="label">Port</span>
                        <span class="value">${PORT}</span>
                    </div>
                </div>

                <div class="links">
                    <a href="/api/health" class="link-btn">🏥 Health Check</a>
                    <a href="/api/models" class="link-btn">🤖 AI Models</a>
                    <a href="/api/auth/me" class="link-btn">👤 User Profile</a>
                    <a href="/api/chat" class="link-btn">💬 Chat History</a>
                </div>

                <div class="footer">
                    v1.0.0 • Made with ❤️ by Aditya Kumar Gupta
                </div>
            </div>
            <script>
                // Auto-refresh uptime every 5 seconds
                setInterval(() => {
                    fetch('/api/health').then(r => r.json()).then(d => {
                        // Optional: Could implement live update logic here if logic was exposed
                    });
                }, 10000);
            </script>
        </body>
        </html>
        `;
        res.send(html);
    });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server only when not running as serverless function
if (process.env.VERCEL !== '1') {
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
}

// Export for Vercel serverless
export default app;

