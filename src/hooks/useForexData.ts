import { useState, useEffect, useCallback } from 'react';
import { forexDataService, ForexData } from '../services/forexDataService';

export const useForexData = () => {
  const [forexData, setForexData] = useState<ForexData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await forexDataService.getForexData();
      setForexData(data);
      setLastUpdate(new Date());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch real market data';
      setError(errorMessage);
      console.error('Error fetching real forex data:', err);
      
      // Clear any cached data if real data fails
      setForexData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshData = useCallback(() => {
    forexDataService.clearCache();
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
    
    // Auto-refresh disabled - data will only refresh when manually triggered
    // const interval = setInterval(fetchData, 30000);
    // return () => clearInterval(interval);
  }, [fetchData]);

  return {
    forexData,
    loading,
    error,
    lastUpdate,
    refreshData,
    refetch: fetchData
  };
};
