/**
 * AI Models Configuration
 * Available free models via Groq
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

export interface AIModel {
  id: string;
  name: string;
  description: string;
  provider: string;
  contextWindow: number;
  isDefault: boolean;
}

export const AI_MODELS: AIModel[] = [
  {
    id: 'llama-3.3-70b-versatile',
    name: 'Llama 3.3 70B',
    description: 'Best for complex coding tasks',
    provider: 'Meta',
    contextWindow: 128000,
    isDefault: true,
  },
  {
    id: 'llama-3.1-70b-versatile',
    name: 'Llama 3.1 70B',
    description: 'Great balance of speed and quality',
    provider: 'Meta',
    contextWindow: 128000,
    isDefault: false,
  },
  {
    id: 'llama-3.1-8b-instant',
    name: 'Llama 3.1 8B',
    description: 'Fast responses for simple queries',
    provider: 'Meta',
    contextWindow: 128000,
    isDefault: false,
  },
  {
    id: 'mixtral-8x7b-32768',
    name: 'Mixtral 8x7B',
    description: 'Good for diverse coding questions',
    provider: 'Mistral AI',
    contextWindow: 32768,
    isDefault: false,
  },
  {
    id: 'gemma2-9b-it',
    name: 'Gemma 2 9B',
    description: 'Efficient and capable',
    provider: 'Google',
    contextWindow: 8192,
    isDefault: false,
  },
];

export const DEFAULT_MODEL = AI_MODELS.find(m => m.isDefault)?.id || 'llama-3.3-70b-versatile';

export default AI_MODELS;
