/**
 * Input Component
 * Styled text input
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
}

export function Input({
  label,
  error,
  leftIcon,
  isPassword = false,
  style,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const hasError = !!error;

  return (
    <View className="mb-4">
      {label && (
        <Text 
          className="text-sm font-medium mb-2"
          style={{ color: colors.text }}
        >
          {label}
        </Text>
      )}
      
      <View
        className="flex-row items-center rounded-xl px-4"
        style={{
          backgroundColor: colors.surfaceLight,
          borderWidth: 1,
          borderColor: hasError 
            ? colors.error 
            : isFocused 
              ? colors.primary 
              : colors.border,
        }}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={colors.textSecondary}
            style={{ marginRight: 12 }}
          />
        )}

        <TextInput
          className="flex-1 py-4 text-base"
          style={[
            { color: colors.text },
            style,
          ]}
          placeholderTextColor={colors.textMuted}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text 
          className="text-sm mt-1"
          style={{ color: colors.error }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

export default Input;
