/**
 * Header Component
 * Reusable header bar
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '../../constants/theme';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
  subtitle?: string;
}

export function Header({ 
  title, 
  showBack = false,
  rightIcon,
  onRightPress,
  subtitle,
}: HeaderProps) {
  const router = useRouter();

  return (
    <View 
      className="flex-row items-center justify-between px-4 py-4 border-b"
      style={{ 
        backgroundColor: colors.surface,
        borderBottomColor: colors.border,
      }}
    >
      <View className="flex-row items-center flex-1">
        {showBack && (
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-3 p-1"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
        )}
        <View>
          <Text 
            className="text-xl font-bold"
            style={{ color: colors.text }}
          >
            {title}
          </Text>
          {subtitle && (
            <Text 
              className="text-sm"
              style={{ color: colors.textSecondary }}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {rightIcon && onRightPress && (
        <TouchableOpacity
          onPress={onRightPress}
          className="p-2"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name={rightIcon} size={24} color={colors.text} />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default Header;
