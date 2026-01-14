/**
 * Centralized API Client
 * Handles all HTTP requests with authentication and error handling
 */

import { API_BASE_URL, STORAGE_KEYS } from './constants';

class ApiError extends Error {
    constructor(message, status, data = null) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

/**
 * Get the current auth token from localStorage
 */
const getAuthToken = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
};

/**
 * Base fetch wrapper with authentication and error handling
 */
async function request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = getAuthToken();

    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new ApiError(
                data.message || 'An error occurred',
                response.status,
                data
            );
        }

        return data;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(
            error.message || 'Network error',
            0
        );
    }
}

/**
 * API Methods
 */
export const api = {
    get: (endpoint) => request(endpoint, { method: 'GET' }),
    post: (endpoint, body) => request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
    patch: (endpoint, body) => request(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
    delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};

/**
 * Admin API Endpoints
 */
export const adminApi = {
    // Auth
    login: (credentials) => api.post('/api/auth/admin-login', credentials),

    // Stats & Analytics
    getStats: () => api.get('/api/admin/stats'),
    getAnalytics: () => api.get('/api/admin/analytics'),

    // Users CRUD
    getUsers: (page = 1, search = '', limit = 10) =>
        api.get(`/api/admin/users?page=${page}&search=${encodeURIComponent(search)}&limit=${limit}`),
    getUser: (id) => api.get(`/api/admin/users/${id}`),
    updateUser: (id, data) => api.patch(`/api/admin/users/${id}`, data),
    deleteUser: (id) => api.delete(`/api/admin/users/${id}`),

    // Bans
    banIdentity: (data) => api.post('/api/admin/ban', data),

    // Chats
    getChats: (limit = 20) => api.get(`/api/admin/chats?limit=${limit}`),

    // Contacts
    getContacts: (status = '', page = 1) =>
        api.get(`/api/admin/contacts?status=${status}&page=${page}`),
    updateContact: (id, status) => api.patch(`/api/admin/contacts/${id}`, { status }),
};

/**
 * Public API (no auth required)
 */
export const publicApi = {
    submitContact: (data) => api.post('/api/contact', data),
};

export { ApiError };
