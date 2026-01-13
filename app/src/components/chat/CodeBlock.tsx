/**
 * CodeBlock Component
 * Syntax highlighted code block with copy button
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { CopyButton } from './CopyButton';
import { colors } from '../../constants/theme';

interface CodeBlockProps {
  code: string;
  language?: string;
}

// Simple syntax highlighting colors
const syntaxColors = {
  keyword: '#FF79C6',
  string: '#F1FA8C',
  comment: '#6272A4',
  function: '#50FA7B',
  number: '#BD93F9',
  operator: '#FF79C6',
  default: colors.text,
};

// Keywords for basic syntax highlighting
const keywords = [
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
  'class', 'export', 'import', 'from', 'default', 'async', 'await', 'try',
  'catch', 'throw', 'new', 'this', 'true', 'false', 'null', 'undefined',
  'interface', 'type', 'extends', 'implements', 'public', 'private', 'static',
  'def', 'self', 'print', 'None', 'True', 'False', 'lambda', 'with', 'as',
];

export function CodeBlock({ code, language = 'text' }: CodeBlockProps) {
  // Split code into lines for display
  const lines = code.split('\n');

  return (
    <View 
      className="my-2 rounded-lg overflow-hidden"
      style={{ backgroundColor: colors.codeBg }}
    >
      {/* Header with language and copy button */}
      <View 
        className="flex-row justify-between items-center px-3 py-2"
        style={{ backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border }}
      >
        <Text className="text-xs font-mono" style={{ color: colors.textSecondary }}>
          {language}
        </Text>
        <CopyButton text={code} />
      </View>

      {/* Code content */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="p-3"
      >
        <View>
          {lines.map((line, index) => (
            <View key={index} className="flex-row">
              {/* Line number */}
              <Text 
                className="font-mono text-xs mr-4 select-none"
                style={{ 
                  color: colors.textMuted,
                  minWidth: 24,
                  textAlign: 'right',
                }}
              >
                {index + 1}
              </Text>
              {/* Code line with basic highlighting */}
              <Text className="font-mono text-sm" style={{ color: colors.text }}>
                {highlightLine(line)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

// Basic syntax highlighting
function highlightLine(line: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = line;
  let key = 0;

  // Check for comments
  if (remaining.trim().startsWith('//') || remaining.trim().startsWith('#')) {
    return [
      <Text key={0} style={{ color: syntaxColors.comment }}>{line}</Text>
    ];
  }

  // Simple tokenization
  const tokens = remaining.split(/(\s+|[{}()\[\];,.])/);
  
  for (const token of tokens) {
    if (!token) continue;

    let color = syntaxColors.default;

    // Keywords
    if (keywords.includes(token)) {
      color = syntaxColors.keyword;
    }
    // Strings
    else if (token.startsWith('"') || token.startsWith("'") || token.startsWith('`')) {
      color = syntaxColors.string;
    }
    // Numbers
    else if (/^\d+$/.test(token)) {
      color = syntaxColors.number;
    }
    // Function calls (word followed by open paren in next token)
    else if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(token)) {
      const nextTokenIndex = tokens.indexOf(token) + 1;
      if (tokens[nextTokenIndex] === '(') {
        color = syntaxColors.function;
      }
    }

    parts.push(
      <Text key={key++} style={{ color }}>{token}</Text>
    );
  }

  return parts.length > 0 ? parts : [<Text key={0}>{line}</Text>];
}

export default CodeBlock;
