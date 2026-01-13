/**
 * TypeScript Type Definitions
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferredModel: string;
  createdAt: string;
  updatedAt?: string;
}

// Auth types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

// Chat types
export interface Message {
  id: string;
  chatId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  model?: string;
  createdAt: string;
  isStreaming?: boolean;
}

export interface Chat {
  id: string;
  title: string;
  model: string;
  messageCount: number;
  lastMessageAt: string;
  createdAt: string;
  messages?: Message[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Trial tracking
export interface TrialState {
  usageCount: number;
  isTrialExpired: boolean;
}
