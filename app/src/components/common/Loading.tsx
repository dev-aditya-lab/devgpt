/**
 * Loading Component
 * Full screen loading indicator
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { colors } from '../../constants/theme';

interface LoadingProps {
  message?: string;
}

export function Loading({ message = 'Loading...' }: LoadingProps) {
  return (
    <View 
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: colors.background }}
    >
      <ActivityIndicator size="large" color={colors.primary} />
      <Text 
        className="mt-4 text-base"
        style={{ color: colors.textSecondary }}
      >
        {message}
      </Text>
    </View>
  );
}

export default Loading;
