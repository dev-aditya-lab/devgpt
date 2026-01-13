/**
 * Auth Layout
 * Layout for authentication screens
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '../../src/constants/theme';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
