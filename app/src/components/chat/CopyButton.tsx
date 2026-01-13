/**
 * Copy Button Component
 * Button to copy code to clipboard
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/theme';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TouchableOpacity
      onPress={handleCopy}
      className={`flex-row items-center px-2 py-1 rounded ${className}`}
      style={{ backgroundColor: colors.surfaceLight }}
      activeOpacity={0.7}
    >
      <Ionicons
        name={copied ? 'checkmark' : 'copy-outline'}
        size={14}
        color={copied ? colors.success : colors.textSecondary}
      />
      <Text
        className="ml-1 text-xs"
        style={{ color: copied ? colors.success : colors.textSecondary }}
      >
        {copied ? 'Copied!' : 'Copy'}
      </Text>
    </TouchableOpacity>
  );
}

export default CopyButton;
