/**
 * Profile Screen
 * User profile and settings
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth, useTrial } from '../../src/hooks';
import { ModelSelector } from '../../src/components/ui/ModelSelector';
import { useChatStore } from '../../src/stores/chatStore';
import { colors } from '../../src/constants/theme';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const { remainingUses, trialLimit } = useTrial();
  const { selectedModel, setSelectedModel } = useChatStore();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };

  const handleOpenLink = (url: string) => {
    Linking.openURL(url);
  };

  const MenuItem = ({ 
    icon, 
    title, 
    subtitle,
    onPress,
    rightElement,
    danger = false,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
    danger?: boolean;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress && !rightElement}
      className="flex-row items-center p-4 mb-2 rounded-xl"
      style={{ 
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
      }}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View 
        className="w-10 h-10 rounded-lg items-center justify-center mr-3"
        style={{ backgroundColor: danger ? colors.error + '20' : colors.primary + '20' }}
      >
        <Ionicons 
          name={icon} 
          size={20} 
          color={danger ? colors.error : colors.primary} 
        />
      </View>
      <View className="flex-1">
        <Text 
          className="text-base font-medium"
          style={{ color: danger ? colors.error : colors.text }}
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
      {rightElement || (onPress && (
        <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
      ))}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView 
      edges={['top']} 
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View 
          className="items-center p-6 rounded-2xl mb-6"
          style={{ backgroundColor: colors.surface }}
        >
          <View 
            className="w-24 h-24 rounded-full items-center justify-center mb-4"
            style={{ backgroundColor: colors.primary }}
          >
            {isAuthenticated ? (
              <Text className="text-4xl font-bold text-white">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </Text>
            ) : (
              <Ionicons name="person" size={48} color="#fff" />
            )}
          </View>
          
          {isAuthenticated ? (
            <>
              <Text 
                className="text-xl font-bold mb-1"
                style={{ color: colors.text }}
              >
                {user?.name}
              </Text>
              <Text 
                className="text-base"
                style={{ color: colors.textSecondary }}
              >
                {user?.email}
              </Text>
            </>
          ) : (
            <>
              <Text 
                className="text-xl font-bold mb-1"
                style={{ color: colors.text }}
              >
                Guest User
              </Text>
              <Text 
                className="text-base mb-4"
                style={{ color: colors.textSecondary }}
              >
                {remainingUses}/{trialLimit} free tries remaining
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/(auth)/login')}
                className="px-8 py-3 rounded-xl"
                style={{ backgroundColor: colors.primary }}
                activeOpacity={0.7}
              >
                <Text className="text-base font-semibold text-white">
                  Login / Sign Up
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Settings */}
        <Text 
          className="text-sm font-semibold mb-3 px-1"
          style={{ color: colors.textMuted }}
        >
          SETTINGS
        </Text>

        <View className="mb-4">
          <Text 
            className="text-sm mb-2 px-1"
            style={{ color: colors.textSecondary }}
          >
            Default AI Model
          </Text>
          <ModelSelector
            selectedModel={selectedModel}
            onSelect={setSelectedModel}
          />
        </View>

        {/* About */}
        <Text 
          className="text-sm font-semibold mb-3 mt-4 px-1"
          style={{ color: colors.textMuted }}
        >
          ABOUT
        </Text>

        <MenuItem
          icon="information-circle-outline"
          title="About DevGPT"
          subtitle="Version 1.0.0"
          onPress={() => router.push('/about')}
        />

        <MenuItem
          icon="globe-outline"
          title="Developer Website"
          subtitle="devaditya.dev"
          onPress={() => handleOpenLink('https://devaditya.dev')}
        />

        <MenuItem
          icon="logo-github"
          title="GitHub"
          subtitle="github.com/dev-aditya-lab"
          onPress={() => handleOpenLink('https://github.com/dev-aditya-lab')}
        />

        <MenuItem
          icon="mail-outline"
          title="Contact Developer"
          subtitle="hello@devaditya.dev"
          onPress={() => handleOpenLink('mailto:hello@devaditya.dev')}
        />

        {/* Account Actions */}
        {isAuthenticated && (
          <>
            <Text 
              className="text-sm font-semibold mb-3 mt-4 px-1"
              style={{ color: colors.textMuted }}
            >
              ACCOUNT
            </Text>

            <MenuItem
              icon="log-out-outline"
              title="Logout"
              onPress={handleLogout}
              danger
            />
          </>
        )}

        {/* Footer */}
        <View className="items-center mt-8 mb-4">
          <Text 
            className="text-sm"
            style={{ color: colors.textMuted }}
          >
            Made with ❤️ by Aditya Kumar Gupta
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
