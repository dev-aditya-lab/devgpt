/**
 * Storage Utilities
 * AsyncStorage helpers for persistent data
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  AUTH_TOKEN: '@devgpt/auth_token',
  USER: '@devgpt/user',
  TRIAL_COUNT: '@devgpt/trial_count',
  PREFERRED_MODEL: '@devgpt/preferred_model',
};

/**
 * Store auth token
 */
export const storeToken = async (token: string): Promise<void> => {
  await AsyncStorage.setItem(KEYS.AUTH_TOKEN, token);
};

/**
 * Get auth token
 */
export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(KEYS.AUTH_TOKEN);
};

/**
 * Remove auth token
 */
export const removeToken = async (): Promise<void> => {
  await AsyncStorage.removeItem(KEYS.AUTH_TOKEN);
};

/**
 * Store user data
 */
export const storeUser = async (user: object): Promise<void> => {
  await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
};

/**
 * Get user data
 */
export const getUser = async (): Promise<object | null> => {
  const user = await AsyncStorage.getItem(KEYS.USER);
  return user ? JSON.parse(user) : null;
};

/**
 * Remove user data
 */
export const removeUser = async (): Promise<void> => {
  await AsyncStorage.removeItem(KEYS.USER);
};

/**
 * Get trial usage count
 */
export const getTrialCount = async (): Promise<number> => {
  const count = await AsyncStorage.getItem(KEYS.TRIAL_COUNT);
  return count ? parseInt(count, 10) : 0;
};

/**
 * Increment trial usage count
 */
export const incrementTrialCount = async (): Promise<number> => {
  const count = await getTrialCount();
  const newCount = count + 1;
  await AsyncStorage.setItem(KEYS.TRIAL_COUNT, newCount.toString());
  return newCount;
};

/**
 * Reset trial count (after login)
 */
export const resetTrialCount = async (): Promise<void> => {
  await AsyncStorage.removeItem(KEYS.TRIAL_COUNT);
};

/**
 * Store preferred model
 */
export const storePreferredModel = async (modelId: string): Promise<void> => {
  await AsyncStorage.setItem(KEYS.PREFERRED_MODEL, modelId);
};

/**
 * Get preferred model
 */
export const getPreferredModel = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(KEYS.PREFERRED_MODEL);
};

/**
 * Clear all app data
 */
export const clearAllData = async (): Promise<void> => {
  await AsyncStorage.multiRemove([
    KEYS.AUTH_TOKEN,
    KEYS.USER,
    KEYS.TRIAL_COUNT,
    KEYS.PREFERRED_MODEL,
  ]);
};

export default {
  storeToken,
  getToken,
  removeToken,
  storeUser,
  getUser,
  removeUser,
  getTrialCount,
  incrementTrialCount,
  resetTrialCount,
  storePreferredModel,
  getPreferredModel,
  clearAllData,
};
