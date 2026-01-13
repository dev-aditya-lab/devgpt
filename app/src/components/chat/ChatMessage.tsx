/**
 * ChatMessage Component
 * Single chat message with Markdown rendering
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

import React, { useMemo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CodeBlock } from './CodeBlock';
import { colors } from '../../constants/theme';
import type { Message } from '../../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isStreaming = message.isStreaming && message.content === '';

  const renderedContent = useMemo(() => {
    return renderMarkdown(message.content);
  }, [message.content]);

  return (
    <View 
      className={`py-4 px-4 ${isUser ? 'items-end' : 'items-start'}`}
    >
      <View className="flex-row items-start max-w-[90%]">
        {/* Avatar */}
        {!isUser && (
          <View 
            className="w-8 h-8 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: colors.primary }}
          >
            <Ionicons name="code-slash" size={16} color="#fff" />
          </View>
        )}

        {/* Message bubble */}
        <View
          className="flex-1 rounded-2xl px-4 py-3"
          style={{
            backgroundColor: isUser ? colors.primary : colors.surface,
            borderWidth: isUser ? 0 : 1,
            borderColor: colors.border,
            maxWidth: isUser ? undefined : '100%',
          }}
        >
          {isStreaming ? (
            <View className="flex-row items-center">
              <ActivityIndicator size="small" color={colors.primary} />
              <Text 
                className="ml-2 text-sm"
                style={{ color: colors.textSecondary }}
              >
                Thinking...
              </Text>
            </View>
          ) : (
            <View>
              {renderedContent}
            </View>
          )}
        </View>

        {/* User avatar */}
        {isUser && (
          <View 
            className="w-8 h-8 rounded-full items-center justify-center ml-3"
            style={{ backgroundColor: colors.accentPurple }}
          >
            <Ionicons name="person" size={16} color="#fff" />
          </View>
        )}
      </View>

      {/* Model indicator for AI messages */}
      {!isUser && message.model && (
        <View className="flex-row items-center mt-1 ml-11">
          <Ionicons name="hardware-chip-outline" size={10} color={colors.textMuted} />
          <Text className="ml-1 text-xs" style={{ color: colors.textMuted }}>
            {message.model.split('-').slice(0, 2).join(' ')}
          </Text>
        </View>
      )}
    </View>
  );
}

/**
 * Simple Markdown renderer
 * Handles code blocks, inline code, bold, italic, and links
 */
function renderMarkdown(content: string): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  const lines = content.split('\n');
  let inCodeBlock = false;
  let codeBlockContent = '';
  let codeBlockLanguage = '';
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for code block start/end
    if (line?.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLanguage = line.slice(3).trim() || 'text';
        codeBlockContent = '';
      } else {
        inCodeBlock = false;
        elements.push(
          <CodeBlock 
            key={key++} 
            code={codeBlockContent.trim()} 
            language={codeBlockLanguage} 
          />
        );
        codeBlockContent = '';
        codeBlockLanguage = '';
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent += (codeBlockContent ? '\n' : '') + line;
      continue;
    }

    // Regular line - render with inline formatting
    if (line) {
      elements.push(
        <Text 
          key={key++} 
          className="text-base leading-6 mb-1"
          style={{ color: colors.text }}
        >
          {renderInlineMarkdown(line)}
        </Text>
      );
    } else if (i > 0 && lines[i - 1]) {
      // Empty line after content = paragraph break
      elements.push(<View key={key++} className="h-2" />);
    }
  }

  // Handle unclosed code blocks
  if (inCodeBlock && codeBlockContent) {
    elements.push(
      <CodeBlock 
        key={key++} 
        code={codeBlockContent.trim()} 
        language={codeBlockLanguage} 
      />
    );
  }

  return elements;
}

/**
 * Render inline markdown (bold, italic, inline code)
 */
function renderInlineMarkdown(text: string): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  // Simple patterns
  const patterns = [
    { regex: /`([^`]+)`/, style: { backgroundColor: colors.codeBg, color: colors.accent, fontFamily: 'monospace' } },
    { regex: /\*\*([^*]+)\*\*/, style: { fontWeight: 'bold' as const } },
    { regex: /\*([^*]+)\*/, style: { fontStyle: 'italic' as const } },
    { regex: /__([^_]+)__/, style: { fontWeight: 'bold' as const } },
    { regex: /_([^_]+)_/, style: { fontStyle: 'italic' as const } },
  ];

  while (remaining.length > 0) {
    let matched = false;

    for (const pattern of patterns) {
      const match = remaining.match(pattern.regex);
      if (match && match.index !== undefined) {
        // Add text before match
        if (match.index > 0) {
          elements.push(
            <Text key={key++}>{remaining.slice(0, match.index)}</Text>
          );
        }

        // Add formatted text
        elements.push(
          <Text key={key++} style={pattern.style}>
            {match[1]}
          </Text>
        );

        remaining = remaining.slice((match.index) + match[0].length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      // No more patterns, add remaining text
      elements.push(<Text key={key++}>{remaining}</Text>);
      break;
    }
  }

  return elements.length > 0 ? elements : [<Text key={0}>{text}</Text>];
}

export default ChatMessage;
