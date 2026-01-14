import express from 'express';
import { ContactSubmission } from '../models/index.js';

const router = express.Router();

/**
 * POST /api/contact
 * Submit a contact form
 */
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const submission = await ContactSubmission.create({
            name,
            email,
            subject,
            message,
            ipAddress: req.ip || req.headers['x-forwarded-for'] || 'unknown',
            userAgent: req.headers['user-agent'] || 'unknown'
        });

        res.status(201).json({
            success: true,
            message: 'Message sent successfully',
            data: { id: submission._id }
        });
    } catch (error) {
        console.error('Contact submission error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit message'
        });
    }
});

export default router;
