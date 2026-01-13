/**
 * Auth Store
 * Zustand store for authentication state
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

import { create, StateCreator } from 'zustand';
import { authApi } from '../services/api';
import { 
  storeToken, 
  storeUser, 
  getToken, 
  getUser, 
  removeToken, 
  removeUser,
  resetTrialCount 
} from '../utils/storage';
import type { User, LoginCredentials, RegisterCredentials } from '../types';

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  initialize: () => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
  clearError: () => void;
}

const authStoreCreator: StateCreator<AuthStore> = (set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  initialize: async () => {
    try {
      const token = await getToken();
      const user = await getUser() as User | null;
      
      if (token && user) {
        // Verify token is still valid
        try {
          const response = await authApi.getMe();
          if (response.success && response.data) {
            set({ 
              user: response.data.user, 
              token, 
              isAuthenticated: true,
              isLoading: false 
            });
            return;
          }
        } catch {
          // Token invalid, clear storage
          await removeToken();
          await removeUser();
        }
      }
      
      set({ isLoading: false });
    } catch (_error) {
      set({ isLoading: false });
    }
  },

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await authApi.login(credentials);
      
      if (response.success && response.data) {
        const { user, token } = response.data;
        
        await storeToken(token);
        await storeUser(user);
        await resetTrialCount();
        
        set({ 
          user, 
          token, 
          isAuthenticated: true, 
          isLoading: false 
        });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  register: async (credentials: RegisterCredentials) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await authApi.register(credentials);
      
      if (response.success && response.data) {
        const { user, token } = response.data;
        
        await storeToken(token);
        await storeUser(user);
        await resetTrialCount();
        
        set({ 
          user, 
          token, 
          isAuthenticated: true, 
          isLoading: false 
        });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore logout API errors
    } finally {
      await removeToken();
      await removeUser();
      
      set({ 
        user: null, 
        token: null, 
        isAuthenticated: false,
        error: null 
      });
    }
  },

  updateUser: (userData: Partial<User>) => {
    const currentUser = get().user;
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      set({ user: updatedUser });
      storeUser(updatedUser);
    }
  },

  clearError: () => set({ error: null }),
});

export const useAuthStore = create<AuthStore>(authStoreCreator);

export default useAuthStore;
