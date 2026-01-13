/**
 * useChat Hook
 * Hook for chat functionality with streaming
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

import { useCallback } from 'react';
import { useChatStore } from '../stores/chatStore';

export function useChat() {
  const {
    chats,
    currentChat,
    messages,
    selectedModel,
    isLoading,
    isSending,
    error,
    fetchChats,
    createChat,
    selectChat,
    sendMessage,
    setSelectedModel,
    deleteChat,
    clearChats,
    clearError,
    resetCurrentChat,
  } = useChatStore();

  const handleSendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    await sendMessage(content.trim());
  }, [sendMessage]);

  const handleNewChat = useCallback(async () => {
    resetCurrentChat();
    const chat = await createChat();
    return chat;
  }, [createChat, resetCurrentChat]);

  const handleSelectChat = useCallback(async (chatId: string) => {
    await selectChat(chatId);
  }, [selectChat]);

  const handleDeleteChat = useCallback(async (chatId: string) => {
    await deleteChat(chatId);
  }, [deleteChat]);

  return {
    // State
    chats,
    currentChat,
    messages,
    selectedModel,
    isLoading,
    isSending,
    error,
    
    // Actions
    fetchChats,
    createChat: handleNewChat,
    selectChat: handleSelectChat,
    sendMessage: handleSendMessage,
    setSelectedModel,
    deleteChat: handleDeleteChat,
    clearChats,
    clearError,
    resetCurrentChat,
  };
}

export default useChat;
