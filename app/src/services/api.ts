/**
 * API Service
 * HTTP client for backend communication
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

import { API_BASE_URL } from '../constants/api';
import { getToken } from '../utils/storage';
import type { 
  ApiResponse, 
  AuthResponse, 
  LoginCredentials, 
  RegisterCredentials,
  User,
  Chat,
  Message 
} from '../types';

/**
 * Make an authenticated API request
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = await getToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
}

// Auth API
export const authApi = {
  register: async (credentials: RegisterCredentials): Promise<ApiResponse<AuthResponse>> => {
    return apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    return apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  getMe: async (): Promise<ApiResponse<{ user: User }>> => {
    return apiRequest<{ user: User }>('/auth/me');
  },

  logout: async (): Promise<ApiResponse<void>> => {
    return apiRequest<void>('/auth/logout', { method: 'POST' });
  },
};

// User API
export const userApi = {
  getProfile: async (): Promise<ApiResponse<User>> => {
    return apiRequest<User>('/user/profile');
  },

  updateProfile: async (data: Partial<User>): Promise<ApiResponse<User>> => {
    return apiRequest<User>('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  updatePassword: async (currentPassword: string, newPassword: string): Promise<ApiResponse<void>> => {
    return apiRequest<void>('/user/password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  deleteAccount: async (): Promise<ApiResponse<void>> => {
    return apiRequest<void>('/user/account', { method: 'DELETE' });
  },
};

// Chat API
export const chatApi = {
  getChats: async (limit = 50, skip = 0): Promise<ApiResponse<Chat[]>> => {
    return apiRequest<Chat[]>(`/chat?limit=${limit}&skip=${skip}`);
  },

  createChat: async (model?: string): Promise<ApiResponse<Chat>> => {
    return apiRequest<Chat>('/chat', {
      method: 'POST',
      body: JSON.stringify({ model }),
    });
  },

  getChat: async (chatId: string): Promise<ApiResponse<Chat & { messages: Message[] }>> => {
    return apiRequest<Chat & { messages: Message[] }>(`/chat/${chatId}`);
  },

  deleteChat: async (chatId: string): Promise<ApiResponse<void>> => {
    return apiRequest<void>(`/chat/${chatId}`, { method: 'DELETE' });
  },

  clearChats: async (): Promise<ApiResponse<void>> => {
    return apiRequest<void>('/chat', { method: 'DELETE' });
  },
};

// Models API
export const modelsApi = {
  getModels: async () => {
    return apiRequest('/models');
  },

  getModel: async (modelId: string) => {
    return apiRequest(`/models/${modelId}`);
  },
};

/**
 * Send a chat message with streaming response
 * Using Server-Sent Events
 */
export async function sendMessageStream(
  chatId: string,
  content: string,
  model: string,
  onChunk: (chunk: string) => void,
  onDone: () => void,
  onError: (error: Error) => void
): Promise<void> {
  const token = await getToken();

  try {
    const response = await fetch(`${API_BASE_URL}/chat/${chatId}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ content, model }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send message');
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('No response body');
    }

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;

      const text = decoder.decode(value, { stream: true });
      const lines = text.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            
            if (data.error) {
              onError(new Error(data.error));
              return;
            }
            
            if (data.done) {
              onDone();
              return;
            }
            
            if (data.content) {
              onChunk(data.content);
            }
          } catch (e) {
            // Ignore parse errors for incomplete chunks
          }
        }
      }
    }

    onDone();
  } catch (error) {
    onError(error instanceof Error ? error : new Error('Unknown error'));
  }
}

export default {
  authApi,
  userApi,
  chatApi,
  modelsApi,
  sendMessageStream,
};
