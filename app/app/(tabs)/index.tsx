/**
 * Chat Screen
 * Main chat interface with FlashList
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ChatMessage, ChatInput, ModelSelector } from '../../src/components';
import { useChat, useTrial, useAuth } from '../../src/hooks';
import { colors } from '../../src/constants/theme';
import type { Message } from '../../src/types';

export default function ChatScreen() {
  const router = useRouter();
  const listRef = useRef<FlashList<Message>>(null);
  
  const { isAuthenticated } = useAuth();
  const { 
    currentChat,
    messages, 
    selectedModel,
    isSending,
    sendMessage,
    setSelectedModel,
    createChat,
  } = useChat();
  
  const { 
    isTrialExpired, 
    remainingUses, 
    incrementUsage,
    canUse,
  } = useTrial();

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0 && listRef.current) {
      setTimeout(() => {
        listRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  const handleSendMessage = async (content: string) => {
    if (!isAuthenticated) {
      if (!canUse) {
        Alert.alert(
          'Trial Expired',
          'You have used all your free tries. Please login to continue.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Login', onPress: () => router.push('/(auth)/login') },
          ]
        );
        return;
      }
      await incrementUsage();
    }
    
    await sendMessage(content);
  };

  const handleNewChat = async () => {
    await createChat();
  };

  const EmptyState = () => (
    <View className="flex-1 items-center justify-center px-8">
      <View 
        className="w-20 h-20 rounded-full items-center justify-center mb-6"
        style={{ backgroundColor: colors.primary + '20' }}
      >
        <Ionicons name="code-slash" size={40} color={colors.primary} />
      </View>
      <Text 
        className="text-2xl font-bold text-center mb-2"
        style={{ color: colors.text }}
      >
        Welcome to DevGPT
      </Text>
      <Text 
        className="text-base text-center mb-6"
        style={{ color: colors.textSecondary }}
      >
        Your AI-powered coding assistant. Ask me anything about code, debugging, or programming concepts!
      </Text>
      
      {!isAuthenticated && (
        <View 
          className="px-4 py-2 rounded-full"
          style={{ backgroundColor: colors.warning + '20' }}
        >
          <Text style={{ color: colors.warning }}>
            {remainingUses} free {remainingUses === 1 ? 'try' : 'tries'} remaining
          </Text>
        </View>
      )}

      <View className="mt-8 w-full">
        <Text 
          className="text-sm font-medium mb-4"
          style={{ color: colors.textMuted }}
        >
          Try asking:
        </Text>
        {[
          'How do I create a React hook?',
          'Explain async/await in JavaScript',
          'Debug this Python code...',
        ].map((suggestion, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSendMessage(suggestion)}
            className="mb-2 p-4 rounded-xl"
            style={{ 
              backgroundColor: colors.surfaceLight,
              borderWidth: 1,
              borderColor: colors.border,
            }}
            activeOpacity={0.7}
          >
            <Text style={{ color: colors.text }}>{suggestion}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView 
      edges={['top']} 
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      {/* Header */}
      <View 
        className="flex-row items-center justify-between px-4 py-3 border-b"
        style={{ 
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
        }}
      >
        <View className="flex-row items-center">
          <View 
            className="w-10 h-10 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: colors.primary }}
          >
            <Ionicons name="code-slash" size={20} color="#fff" />
          </View>
          <View>
            <Text 
              className="text-lg font-bold"
              style={{ color: colors.text }}
            >
              DevGPT
            </Text>
            <Text 
              className="text-xs"
              style={{ color: colors.textSecondary }}
            >
              {currentChat?.title || 'New Chat'}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center">
          <ModelSelector 
            selectedModel={selectedModel}
            onSelect={setSelectedModel}
            compact
          />
          <TouchableOpacity
            onPress={handleNewChat}
            className="ml-2 p-2"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      {messages.length === 0 ? (
        <EmptyState />
      ) : (
        <FlashList
          ref={listRef}
          data={messages}
          estimatedItemSize={150}
          renderItem={({ item }: { item: Message }) => <ChatMessage message={item} />}
          keyExtractor={(item: Message) => item.id}
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Input */}
      <ChatInput
        onSend={handleSendMessage}
        isSending={isSending}
        disabled={!canUse && !isAuthenticated}
        placeholder={isTrialExpired ? "Login to continue chatting..." : "Ask me anything about code..."}
      />
    </SafeAreaView>
  );
}
