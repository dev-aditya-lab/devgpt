/**
 * useAuth Hook
 * Hook for authentication functionality
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

import { useCallback } from 'react';
import { useAuthStore } from '../stores/authStore';
import type { LoginCredentials, RegisterCredentials } from '../types';

export function useAuth() {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    initialize,
    login,
    register,
    logout,
    updateUser,
    clearError,
  } = useAuthStore();

  const handleLogin = useCallback(async (credentials: LoginCredentials) => {
    try {
      await login(credentials);
      return true;
    } catch {
      return false;
    }
  }, [login]);

  const handleRegister = useCallback(async (credentials: RegisterCredentials) => {
    try {
      await register(credentials);
      return true;
    } catch {
      return false;
    }
  }, [register]);

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    initialize,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    updateUser,
    clearError,
  };
}

export default useAuth;
