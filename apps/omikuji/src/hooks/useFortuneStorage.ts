import { useState, useEffect, useCallback } from 'react';
import { Fortune, FortuneStore } from '../types/fortune';
import { loadFortuneStore, saveFortuneStore } from '../utils/storage';

export function useFortuneStorage() {
  const [store, setStore] = useState<FortuneStore>({
    fortunes: [],
    lastDrawDateKey: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFortuneStore()
      .then(setStore)
      .finally(() => setLoading(false));
  }, []);

  const addFortune = useCallback(async (fortune: Fortune) => {
    setStore((prev) => {
      const updated: FortuneStore = {
        fortunes: [fortune, ...prev.fortunes],
        lastDrawDateKey: fortune.dateKey,
      };
      saveFortuneStore(updated);
      return updated;
    });
  }, []);

  const getHistory = useCallback((): Fortune[] => {
    return store.fortunes;
  }, [store.fortunes]);

  return {
    store,
    loading,
    addFortune,
    getHistory,
  };
}
