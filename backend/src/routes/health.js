import express from 'express';

/**
 * Health Check Route
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

const router = express.Router();

/**
 * @route   GET /api/health
 * @desc    Health check endpoint
 * @access  Public
 */
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'DevGPT API is running',
        timestamp: new Date().toISOString(),
        author: {
            name: 'Aditya Kumar Gupta',
            email: 'hello@devaditya.dev',
            website: 'https://devaditya.dev',
            github: 'https://github.com/dev-aditya-lab'
        }
    });
});

export default router;
