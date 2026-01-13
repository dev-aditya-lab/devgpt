/**
 * About Screen
 * App info and author credits
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
  Linking,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../src/constants/theme';
import { AI_MODELS } from '../src/constants/models';

export default function AboutScreen() {
  const router = useRouter();

  const author = {
    name: 'Aditya Kumar Gupta',
    email: 'hello@devaditya.dev',
    website: 'https://devaditya.dev',
    github: 'https://github.com/dev-aditya-lab',
  };

  const handleOpenLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView 
      edges={['top', 'bottom']} 
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      {/* Header */}
      <View 
        className="flex-row items-center px-4 py-4 border-b"
        style={{ 
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-4"
        >
          <Ionicons name="close" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text 
          className="text-xl font-bold"
          style={{ color: colors.text }}
        >
          About DevGPT
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* App Logo */}
        <View className="items-center mb-8">
          <Image 
            source={require('../../assets/icon.png')}
            className="w-28 h-28 mb-4"
            resizeMode="contain"
          />
          <Text 
            className="text-2xl font-bold"
            style={{ color: colors.text }}
          >
            DevGPT
          </Text>
          <Text 
            className="text-base"
            style={{ color: colors.textSecondary }}
          >
            AI-Powered Coding Assistant
          </Text>
          <View 
            className="px-3 py-1 mt-2 rounded-full"
            style={{ backgroundColor: colors.accent + '20' }}
          >
            <Text style={{ color: colors.accent }}>Version 1.0.0</Text>
          </View>
        </View>

        {/* Description */}
        <View 
          className="p-4 rounded-xl mb-6"
          style={{ 
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text 
            className="text-base leading-6"
            style={{ color: colors.text }}
          >
            DevGPT is a powerful AI coding assistant built with React Native and 
            powered by Groq's ultra-fast inference. Get instant help with coding 
            questions, debugging, code explanations, and more.
          </Text>
        </View>

        {/* Features */}
        <Text 
          className="text-sm font-semibold mb-3 px-1"
          style={{ color: colors.textMuted }}
        >
          FEATURES
        </Text>
        
        <View 
          className="rounded-xl mb-6 overflow-hidden"
          style={{ 
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          {[
            { icon: 'flash', title: 'Ultra-fast AI responses' },
            { icon: 'code-slash', title: 'Syntax highlighted code blocks' },
            { icon: 'copy', title: 'One-tap code copying' },
            { icon: 'hardware-chip', title: '5 free AI models' },
            { icon: 'moon', title: 'Beautiful dark theme' },
            { icon: 'cloud-offline', title: 'Offline chat history' },
          ].map((feature, index) => (
            <View 
              key={index}
              className="flex-row items-center p-4"
              style={{ 
                borderBottomWidth: index < 5 ? 1 : 0,
                borderBottomColor: colors.border,
              }}
            >
              <View 
                className="w-8 h-8 rounded-lg items-center justify-center mr-3"
                style={{ backgroundColor: colors.primary + '20' }}
              >
                <Ionicons 
                  name={feature.icon as any} 
                  size={16} 
                  color={colors.primary} 
                />
              </View>
              <Text style={{ color: colors.text }}>{feature.title}</Text>
            </View>
          ))}
        </View>

        {/* Available Models */}
        <Text 
          className="text-sm font-semibold mb-3 px-1"
          style={{ color: colors.textMuted }}
        >
          AVAILABLE AI MODELS
        </Text>
        
        <View 
          className="rounded-xl mb-6 overflow-hidden"
          style={{ 
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          {AI_MODELS.map((model, index) => (
            <View 
              key={model.id}
              className="flex-row items-center p-4"
              style={{ 
                borderBottomWidth: index < AI_MODELS.length - 1 ? 1 : 0,
                borderBottomColor: colors.border,
              }}
            >
              <View 
                className="w-8 h-8 rounded-lg items-center justify-center mr-3"
                style={{ backgroundColor: colors.accentPurple + '20' }}
              >
                <Ionicons name="hardware-chip" size={16} color={colors.accentPurple} />
              </View>
              <View className="flex-1">
                <Text 
                  className="text-base font-medium"
                  style={{ color: colors.text }}
                >
                  {model.name}
                </Text>
                <Text 
                  className="text-sm"
                  style={{ color: colors.textSecondary }}
                >
                  {model.provider}
                </Text>
              </View>
              {model.isDefault && (
                <View 
                  className="px-2 py-1 rounded"
                  style={{ backgroundColor: colors.accent + '20' }}
                >
                  <Text 
                    className="text-xs"
                    style={{ color: colors.accent }}
                  >
                    Default
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Author */}
        <Text 
          className="text-sm font-semibold mb-3 px-1"
          style={{ color: colors.textMuted }}
        >
          CREATED BY
        </Text>
        
        <View 
          className="p-4 rounded-xl mb-6"
          style={{ 
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <View className="flex-row items-center mb-4">
            <View 
              className="w-16 h-16 rounded-full items-center justify-center mr-4"
              style={{ backgroundColor: colors.primary }}
            >
              <Text className="text-2xl font-bold text-white">AG</Text>
            </View>
            <View>
              <Text 
                className="text-lg font-bold"
                style={{ color: colors.text }}
              >
                {author.name}
              </Text>
              <Text style={{ color: colors.textSecondary }}>
                Full Stack Developer
              </Text>
            </View>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => handleOpenLink(author.website)}
              className="flex-row items-center py-3"
              style={{ borderBottomWidth: 1, borderBottomColor: colors.border }}
            >
              <Ionicons name="globe-outline" size={20} color={colors.primary} />
              <Text 
                className="ml-3"
                style={{ color: colors.primary }}
              >
                devaditya.dev
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleOpenLink(author.github)}
              className="flex-row items-center py-3"
              style={{ borderBottomWidth: 1, borderBottomColor: colors.border }}
            >
              <Ionicons name="logo-github" size={20} color={colors.text} />
              <Text 
                className="ml-3"
                style={{ color: colors.text }}
              >
                github.com/dev-aditya-lab
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleOpenLink(`mailto:${author.email}`)}
              className="flex-row items-center py-3"
            >
              <Ionicons name="mail-outline" size={20} color={colors.text} />
              <Text 
                className="ml-3"
                style={{ color: colors.text }}
              >
                {author.email}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View className="items-center py-6">
          <Text 
            className="text-sm"
            style={{ color: colors.textMuted }}
          >
            Made with ❤️ in India
          </Text>
          <Text 
            className="text-xs mt-1"
            style={{ color: colors.textMuted }}
          >
            © 2024 Aditya Kumar Gupta. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
