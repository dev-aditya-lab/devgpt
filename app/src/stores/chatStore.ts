/**
 * Chat Store
 * Zustand store for chat state management
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

import { create, StateCreator } from 'zustand';
import { chatApi, sendMessageStream } from '../services/api';
import { DEFAULT_MODEL } from '../constants/models';
import type { Chat, Message } from '../types';

interface ChatStore {
  chats: Chat[];
  currentChat: Chat | null;
  messages: Message[];
  selectedModel: string;
  isLoading: boolean;
  isSending: boolean;
  streamingContent: string;
  error: string | null;

  // Actions
  fetchChats: () => Promise<void>;
  createChat: () => Promise<Chat | null>;
  selectChat: (chatId: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  setSelectedModel: (modelId: string) => void;
  deleteChat: (chatId: string) => Promise<void>;
  clearChats: () => Promise<void>;
  clearError: () => void;
  resetCurrentChat: () => void;
}

const chatStoreCreator: StateCreator<ChatStore> = (set, get) => ({
  chats: [],
  currentChat: null,
  messages: [],
  selectedModel: DEFAULT_MODEL,
  isLoading: false,
  isSending: false,
  streamingContent: '',
  error: null,

  fetchChats: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await chatApi.getChats();
      
      if (response.success && response.data) {
        set({ chats: response.data, isLoading: false });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch chats';
      set({ error: message, isLoading: false });
    }
  },

  createChat: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const { selectedModel } = get();
      const response = await chatApi.createChat(selectedModel);
      
      if (response.success && response.data) {
        const newChat = response.data;
        set((state: ChatStore) => ({ 
          chats: [newChat, ...state.chats],
          currentChat: newChat,
          messages: [],
          isLoading: false 
        }));
        return newChat;
      }
      return null;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create chat';
      set({ error: message, isLoading: false });
      return null;
    }
  },

  selectChat: async (chatId: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await chatApi.getChat(chatId);
      
      if (response.success && response.data) {
        const chat = response.data;
        const messages: Message[] = (chat.messages || []).map((msg: Message & { _id?: string }) => ({
          id: msg._id || msg.id,
          chatId: chat.id || (chat as Chat & { _id?: string })._id || '',
          role: msg.role,
          content: msg.content,
          model: msg.model,
          createdAt: msg.createdAt,
        }));
        
        set({ 
          currentChat: { 
            ...chat, 
            id: chat.id || (chat as Chat & { _id?: string })._id || ''
          },
          messages,
          isLoading: false 
        });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load chat';
      set({ error: message, isLoading: false });
    }
  },

  sendMessage: async (content: string) => {
    const { currentChat, selectedModel, messages } = get();
    
    if (!currentChat) {
      // Create a new chat first
      const newChat = await get().createChat();
      if (!newChat) return;
    }
    
    const chatId = get().currentChat?.id;
    if (!chatId) return;

    // Add user message immediately
    const userMessage: Message = {
      id: `temp-${Date.now()}`,
      chatId,
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    };

    // Add placeholder for AI response
    const aiMessage: Message = {
      id: `temp-ai-${Date.now()}`,
      chatId,
      role: 'assistant',
      content: '',
      model: selectedModel,
      createdAt: new Date().toISOString(),
      isStreaming: true,
    };

    set({ 
      messages: [...messages, userMessage, aiMessage],
      isSending: true,
      streamingContent: '',
      error: null 
    });

    try {
      await sendMessageStream(
        chatId,
        content,
        selectedModel,
        // On chunk received
        (chunk: string) => {
          set((state: ChatStore) => ({
            streamingContent: state.streamingContent + chunk,
            messages: state.messages.map((msg: Message) => 
              msg.id === aiMessage.id 
                ? { ...msg, content: state.streamingContent + chunk }
                : msg
            ),
          }));
        },
        // On done
        () => {
          set((state: ChatStore) => ({
            isSending: false,
            messages: state.messages.map((msg: Message) =>
              msg.id === aiMessage.id
                ? { ...msg, isStreaming: false }
                : msg
            ),
            streamingContent: '',
          }));
          
          // Refresh chats list to get updated titles
          get().fetchChats();
        },
        // On error
        (error: Error) => {
          set((state: ChatStore) => ({
            isSending: false,
            error: error.message,
            messages: state.messages.filter((msg: Message) => msg.id !== aiMessage.id),
          }));
        }
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send message';
      set({ error: message, isSending: false });
    }
  },

  setSelectedModel: (modelId: string) => {
    set({ selectedModel: modelId });
  },

  deleteChat: async (chatId: string) => {
    try {
      await chatApi.deleteChat(chatId);
      
      set((state: ChatStore) => ({
        chats: state.chats.filter((c: Chat) => c.id !== chatId && (c as Chat & { _id?: string })._id !== chatId),
        currentChat: state.currentChat?.id === chatId ? null : state.currentChat,
        messages: state.currentChat?.id === chatId ? [] : state.messages,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete chat';
      set({ error: message });
    }
  },

  clearChats: async () => {
    try {
      await chatApi.clearChats();
      set({ chats: [], currentChat: null, messages: [] });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to clear chats';
      set({ error: message });
    }
  },

  clearError: () => set({ error: null }),
  
  resetCurrentChat: () => set({ currentChat: null, messages: [] }),
});

export const useChatStore = create<ChatStore>(chatStoreCreator);

export default useChatStore;
