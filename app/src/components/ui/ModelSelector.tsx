/**
 * ModelSelector Component
 * Dropdown to select AI model
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal,
  FlatList,
  Pressable,
  GestureResponderEvent,
  ListRenderItemInfo,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/theme';
import { AI_MODELS, type AIModel } from '../../constants/models';

interface ModelSelectorProps {
  selectedModel: string;
  onSelect: (modelId: string) => void;
  compact?: boolean;
}

export function ModelSelector({ 
  selectedModel, 
  onSelect,
  compact = false 
}: ModelSelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);
  
  const currentModel = AI_MODELS.find(m => m.id === selectedModel) || AI_MODELS[0];

  const handleSelect = (model: AIModel) => {
    onSelect(model.id);
    setModalVisible(false);
  };

  if (compact) {
    return (
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="flex-row items-center px-3 py-2 rounded-lg"
        style={{ backgroundColor: colors.surfaceLight }}
        activeOpacity={0.7}
      >
        <Ionicons name="hardware-chip-outline" size={16} color={colors.primary} />
        <Text 
          className="ml-2 text-sm font-medium"
          style={{ color: colors.text }}
          numberOfLines={1}
        >
          {currentModel?.name}
        </Text>
        <Ionicons name="chevron-down" size={14} color={colors.textMuted} />
        
        <ModelModal 
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          selectedModel={selectedModel}
          onSelect={handleSelect}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="flex-row items-center justify-between p-4 rounded-xl"
        style={{ 
          backgroundColor: colors.surfaceLight,
          borderWidth: 1,
          borderColor: colors.border,
        }}
        activeOpacity={0.7}
      >
        <View className="flex-row items-center flex-1">
          <View 
            className="w-10 h-10 rounded-lg items-center justify-center mr-3"
            style={{ backgroundColor: colors.primary + '20' }}
          >
            <Ionicons name="hardware-chip" size={20} color={colors.primary} />
          </View>
          <View className="flex-1">
            <Text 
              className="text-base font-medium"
              style={{ color: colors.text }}
            >
              {currentModel?.name}
            </Text>
            <Text 
              className="text-sm"
              style={{ color: colors.textSecondary }}
            >
              {currentModel?.description}
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-down" size={20} color={colors.textMuted} />
      </TouchableOpacity>

      <ModelModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedModel={selectedModel}
        onSelect={handleSelect}
      />
    </View>
  );
}

interface ModelModalProps {
  visible: boolean;
  onClose: () => void;
  selectedModel: string;
  onSelect: (model: AIModel) => void;
}

function ModelModal({ visible, onClose, selectedModel, onSelect }: ModelModalProps) {
  const renderItem = ({ item }: ListRenderItemInfo<AIModel>) => (
    <TouchableOpacity
      onPress={() => onSelect(item)}
      className="flex-row items-center p-4 rounded-xl mb-2"
      style={{
        backgroundColor: item.id === selectedModel 
          ? colors.primary + '20' 
          : colors.surfaceLight,
        borderWidth: item.id === selectedModel ? 1 : 0,
        borderColor: colors.primary,
      }}
      activeOpacity={0.7}
    >
      <View 
        className="w-10 h-10 rounded-lg items-center justify-center mr-3"
        style={{ backgroundColor: colors.primary + '20' }}
      >
        <Ionicons 
          name="hardware-chip" 
          size={20} 
          color={item.id === selectedModel ? colors.primary : colors.textSecondary} 
        />
      </View>
      <View className="flex-1">
        <View className="flex-row items-center">
          <Text 
            className="text-base font-medium"
            style={{ color: colors.text }}
          >
            {item.name}
          </Text>
          {item.isDefault && (
            <View 
              className="ml-2 px-2 py-0.5 rounded"
              style={{ backgroundColor: colors.accent + '20' }}
            >
              <Text 
                className="text-xs font-medium"
                style={{ color: colors.accent }}
              >
                Default
              </Text>
            </View>
          )}
        </View>
        <Text 
          className="text-sm mt-0.5"
          style={{ color: colors.textSecondary }}
        >
          {item.description}
        </Text>
        <Text 
          className="text-xs mt-1"
          style={{ color: colors.textMuted }}
        >
          {item.provider} • {(item.contextWindow / 1000).toFixed(0)}k context
        </Text>
      </View>
      {item.id === selectedModel && (
        <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
      )}
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable 
        className="flex-1 justify-end"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        onPress={onClose}
      >
        <Pressable 
          className="rounded-t-3xl p-6"
          style={{ backgroundColor: colors.surface }}
          onPress={(e: GestureResponderEvent) => e.stopPropagation()}
        >
          <View className="flex-row items-center justify-between mb-6">
            <Text 
              className="text-xl font-bold"
              style={{ color: colors.text }}
            >
              Select AI Model
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={AI_MODELS}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default ModelSelector;
