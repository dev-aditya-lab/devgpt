'use client';

import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/api';
import { STORAGE_KEYS, ROUTES } from '@/lib/constants';

/**
 * Auth Context
 */
const AuthContext = createContext(null);

/**
 * Auth Provider Component
 */
export function AuthProvider({ children }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check auth status on mount
    useEffect(() => {
        const checkAuth = () => {
            try {
                const token = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
                const userStr = localStorage.getItem(STORAGE_KEYS.ADMIN_USER);

                if (token && userStr) {
                    const userData = JSON.parse(userStr);
                    if (userData.role === 'admin') {
                        setUser(userData);
                    } else {
                        throw new Error('Not authorized');
                    }
                }
            } catch (e) {
                localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
                localStorage.removeItem(STORAGE_KEYS.ADMIN_USER);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Login function
    const login = useCallback(async (credentials) => {
        setError(null);
        setIsLoading(true);

        try {
            const response = await adminApi.login(credentials);

            if (response.success) {
                const { token, user: userData } = response.data;
                localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, token);
                localStorage.setItem(STORAGE_KEYS.ADMIN_USER, JSON.stringify(userData));
                setUser(userData);
                router.push(ROUTES.ADMIN_DASHBOARD);
                return { success: true };
            }
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    // Logout function
    const logout = useCallback(() => {
        localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.ADMIN_USER);
        setUser(null);
        router.push(ROUTES.ADMIN_LOGIN);
    }, [router]);

    const value = {
        user,
        isLoading,
        isAuthenticated: !!user,
        error,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * useAuth Hook
 */
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
