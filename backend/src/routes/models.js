import express from 'express';
import { AI_MODELS, DEFAULT_MODEL } from '../config/ai.js';

/**
 * Models Routes
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

const router = express.Router();

/**
 * @route   GET /api/models
 * @desc    Get all available AI models
 * @access  Public
 */
router.get('/', (req, res) => {
    res.json({
        success: true,
        data: {
            models: AI_MODELS,
            defaultModel: DEFAULT_MODEL
        }
    });
});

/**
 * @route   GET /api/models/:id
 * @desc    Get a specific model by ID
 * @access  Public
 */
router.get('/:id', (req, res) => {
    const model = AI_MODELS.find(m => m.id === req.params.id);

    if (!model) {
        return res.status(404).json({
            success: false,
            message: 'Model not found'
        });
    }

    res.json({
        success: true,
        data: model
    });
});

export default router;
