/**
 * History Screen
 * Chat history list
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert,
  RefreshControl,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useChat, useAuth } from '../../src/hooks';
import { colors } from '../../src/constants/theme';
import type { Chat } from '../../src/types';

export default function HistoryScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { 
    chats, 
    isLoading, 
    fetchChats, 
    selectChat,
    deleteChat,
    clearChats,
  } = useChat();

  useEffect(() => {
    if (isAuthenticated) {
      fetchChats();
    }
  }, [isAuthenticated]);

  const handleSelectChat = async (chatId: string) => {
    await selectChat(chatId);
    router.push('/(tabs)');
  };

  const handleDeleteChat = (chatId: string, title: string) => {
    Alert.alert(
      'Delete Chat',
      `Are you sure you want to delete "${title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => deleteChat(chatId),
        },
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Chats',
      'Are you sure you want to delete all your chat history? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: () => clearChats(),
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  if (!isAuthenticated) {
    return (
      <SafeAreaView 
        edges={['top']} 
        style={{ flex: 1, backgroundColor: colors.background }}
      >
        <View className="flex-1 items-center justify-center px-8">
          <View 
            className="w-20 h-20 rounded-full items-center justify-center mb-6"
            style={{ backgroundColor: colors.surfaceLight }}
          >
            <Ionicons name="lock-closed" size={40} color={colors.textMuted} />
          </View>
          <Text 
            className="text-xl font-bold text-center mb-2"
            style={{ color: colors.text }}
          >
            Login Required
          </Text>
          <Text 
            className="text-base text-center mb-6"
            style={{ color: colors.textSecondary }}
          >
            Sign in to view and manage your chat history
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/(auth)/login')}
            className="px-8 py-4 rounded-xl"
            style={{ backgroundColor: colors.primary }}
            activeOpacity={0.7}
          >
            <Text className="text-base font-semibold text-white">
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const ChatItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      onPress={() => handleSelectChat(item.id || (item as any)._id)}
      onLongPress={() => handleDeleteChat(item.id || (item as any)._id, item.title)}
      className="mx-4 mb-3 p-4 rounded-xl"
      style={{ 
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
      }}
      activeOpacity={0.7}
    >
      <View className="flex-row items-start">
        <View 
          className="w-10 h-10 rounded-lg items-center justify-center mr-3"
          style={{ backgroundColor: colors.primary + '20' }}
        >
          <Ionicons name="chatbubble" size={18} color={colors.primary} />
        </View>
        <View className="flex-1">
          <Text 
            className="text-base font-medium mb-1"
            style={{ color: colors.text }}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={12} color={colors.textMuted} />
            <Text 
              className="text-sm ml-1"
              style={{ color: colors.textMuted }}
            >
              {formatDate(item.lastMessageAt || item.createdAt)}
            </Text>
            <Text 
              className="text-sm ml-3"
              style={{ color: colors.textMuted }}
            >
              {item.messageCount || 0} messages
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleDeleteChat(item.id || (item as any)._id, item.title)}
          className="p-2"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="trash-outline" size={18} color={colors.error} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView 
      edges={['top']} 
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      {/* Header */}
      <View 
        className="flex-row items-center justify-between px-4 py-4 border-b"
        style={{ 
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
        }}
      >
        <Text 
          className="text-xl font-bold"
          style={{ color: colors.text }}
        >
          Chat History
        </Text>
        {chats.length > 0 && (
          <TouchableOpacity
            onPress={handleClearAll}
            className="flex-row items-center"
          >
            <Ionicons name="trash-bin-outline" size={18} color={colors.error} />
            <Text 
              className="ml-1 text-sm"
              style={{ color: colors.error }}
            >
              Clear All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Chat List */}
      {chats.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <View 
            className="w-16 h-16 rounded-full items-center justify-center mb-4"
            style={{ backgroundColor: colors.surfaceLight }}
          >
            <Ionicons name="chatbubbles-outline" size={32} color={colors.textMuted} />
          </View>
          <Text 
            className="text-lg font-medium text-center mb-2"
            style={{ color: colors.text }}
          >
            No chats yet
          </Text>
          <Text 
            className="text-base text-center"
            style={{ color: colors.textSecondary }}
          >
            Start a conversation to see your history here
          </Text>
        </View>
      ) : (
        <FlashList
          data={chats}
          estimatedItemSize={80}
          renderItem={({ item }: { item: Chat }) => <ChatItem item={item} />}
          keyExtractor={(item: Chat) => item.id || (item as Chat & { _id?: string })._id || ''}
          contentContainerStyle={{ paddingVertical: 16 }}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={fetchChats}
              tintColor={colors.primary}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
