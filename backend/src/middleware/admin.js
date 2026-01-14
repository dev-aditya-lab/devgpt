import { ApiError } from './errorHandler.js';

/**
 * Middleware to check if user is admin
 */
export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        next(new ApiError('Not authorized as an admin', 403));
    }
};
