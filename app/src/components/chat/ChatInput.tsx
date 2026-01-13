/**
 * ChatInput Component
 * Input bar for sending messages
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/theme';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  isSending?: boolean;
  placeholder?: string;
}

export function ChatInput({ 
  onSend, 
  disabled = false, 
  isSending = false,
  placeholder = "Ask me anything about code..." 
}: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled && !isSending) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const canSend = message.trim().length > 0 && !disabled && !isSending;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View 
        className="px-4 py-3 border-t"
        style={{ 
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        }}
      >
        <View 
          className="flex-row items-end rounded-2xl px-4 py-2"
          style={{ 
            backgroundColor: colors.surfaceLight,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <TextInput
            className="flex-1 text-base max-h-32 py-2"
            style={{ 
              color: colors.text,
              lineHeight: 22,
            }}
            placeholder={placeholder}
            placeholderTextColor={colors.textMuted}
            value={message}
            onChangeText={setMessage}
            multiline
            editable={!disabled}
            returnKeyType="default"
            blurOnSubmit={false}
          />

          <TouchableOpacity
            onPress={handleSend}
            disabled={!canSend}
            className="ml-2 w-10 h-10 rounded-full items-center justify-center"
            style={{
              backgroundColor: canSend ? colors.primary : colors.surface,
              opacity: canSend ? 1 : 0.5,
            }}
            activeOpacity={0.7}
          >
            {isSending ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Ionicons 
                name="send" 
                size={18} 
                color={canSend ? '#fff' : colors.textMuted} 
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default ChatInput;
