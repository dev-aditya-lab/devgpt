/**
 * useTrial Hook
 * Hook for trial usage tracking
 * 
 * Created by: Aditya Kumar Gupta
 * Website: devaditya.dev
 */

import { useState, useEffect, useCallback } from 'react';
import { getTrialCount, incrementTrialCount } from '../utils/storage';
import { TRIAL_LIMIT } from '../constants/api';
import { useAuthStore } from '../stores/authStore';

export function useTrial() {
  const [usageCount, setUsageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuthStore();

  const isTrialExpired = !isAuthenticated && usageCount >= TRIAL_LIMIT;
  const remainingUses = Math.max(0, TRIAL_LIMIT - usageCount);

  useEffect(() => {
    loadTrialCount();
  }, []);

  const loadTrialCount = async () => {
    try {
      const count = await getTrialCount();
      setUsageCount(count);
    } finally {
      setIsLoading(false);
    }
  };

  const incrementUsage = useCallback(async () => {
    if (isAuthenticated) return true; // Authenticated users have unlimited access
    
    if (isTrialExpired) return false;
    
    const newCount = await incrementTrialCount();
    setUsageCount(newCount);
    
    return newCount <= TRIAL_LIMIT;
  }, [isAuthenticated, isTrialExpired]);

  const canUse = isAuthenticated || !isTrialExpired;

  return {
    usageCount,
    remainingUses,
    isTrialExpired,
    isLoading,
    canUse,
    incrementUsage,
    trialLimit: TRIAL_LIMIT,
  };
}

export default useTrial;
