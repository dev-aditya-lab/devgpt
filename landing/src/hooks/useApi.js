'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Generic data fetching hook with loading and error states
 * 
 * @param {Function} fetchFn - Async function that returns data
 * @param {Array} deps - Dependency array for re-fetching
 * @param {Object} options - Configuration options
 */
export function useApi(fetchFn, deps = [], options = {}) {
    const {
        immediate = true,      // Fetch immediately on mount
        debounce = 0,          // Debounce delay in ms
        onSuccess,             // Callback on successful fetch
        onError,               // Callback on error
    } = options;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(immediate);
    const [error, setError] = useState(null);

    const execute = useCallback(async (...args) => {
        setLoading(true);
        setError(null);

        try {
            const result = await fetchFn(...args);
            const responseData = result.success ? result.data : result;
            setData(responseData);
            onSuccess?.(responseData);
            return { success: true, data: responseData };
        } catch (err) {
            const errorMessage = err.message || 'An error occurred';
            setError(errorMessage);
            onError?.(err);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [fetchFn, onSuccess, onError]);

    useEffect(() => {
        if (!immediate) return;

        let timeoutId;

        if (debounce > 0) {
            timeoutId = setTimeout(() => execute(), debounce);
        } else {
            execute();
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    const refetch = useCallback(() => execute(), [execute]);

    return {
        data,
        loading,
        error,
        refetch,
        execute,
    };
}

/**
 * Hook for paginated data
 */
export function usePaginatedApi(fetchFn, initialPage = 1) {
    const [page, setPage] = useState(initialPage);
    const [search, setSearch] = useState('');

    const { data, loading, error, refetch } = useApi(
        () => fetchFn(page, search),
        [page, search],
        { debounce: 300 }
    );

    return {
        data: data?.users || data || [],
        pagination: data?.pagination || { page: 1, pages: 1, total: 0 },
        loading,
        error,
        page,
        setPage,
        search,
        setSearch,
        refetch,
    };
}
