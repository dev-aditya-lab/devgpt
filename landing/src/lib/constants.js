/**
 * Application Constants
 * Centralized configuration values
 */

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Admin Panel Configuration
export const ADMIN_SECRET_CODE_LENGTH = 6;
export const PAGINATION_DEFAULT_LIMIT = 10;

// Local Storage Keys
export const STORAGE_KEYS = {
    ADMIN_TOKEN: 'adminToken',
    ADMIN_USER: 'adminUser',
};

// Route Paths
export const ROUTES = {
    ADMIN_LOGIN: '/appadmin/login',
    ADMIN_DASHBOARD: '/appadmin',
    ADMIN_USERS: '/appadmin/users',
    ADMIN_CHATS: '/appadmin/chats',
};
