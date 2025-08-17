import { useState, useCallback } from "react";

export const useAsyncRefresh = (refreshFn: () => Promise<void>) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    try {
      await refreshFn();
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, [refreshFn, isRefreshing]);

  return { refresh, isRefreshing };
};
