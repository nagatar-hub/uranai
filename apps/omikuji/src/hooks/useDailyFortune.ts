import { useState, useEffect, useCallback } from 'react';
import { Fortune, FortuneCategory } from '../types/fortune';
import { FORTUNE_LEVELS } from '../constants/fortune-levels';
import { FORTUNE_MESSAGES } from '../constants/fortune-messages';
import { getJSTDateKey, msUntilMidnightJST } from '../utils/date';
import { pickWeightedRandom, pickRandom, generateId } from '../utils/random';
import { useFortuneStorage } from './useFortuneStorage';

export function useDailyFortune() {
  const { store, loading, addFortune, getHistory } = useFortuneStorage();
  const [todayFortune, setTodayFortune] = useState<Fortune | null>(null);
  const [countdown, setCountdown] = useState<number>(0);

  const todayKey = getJSTDateKey();
  const canDraw = !loading && store.lastDrawDateKey !== todayKey;

  // Find today's fortune from store
  useEffect(() => {
    if (!loading) {
      const existing = store.fortunes.find((f) => f.dateKey === todayKey);
      if (existing) {
        setTodayFortune(existing);
      }
    }
  }, [loading, store.fortunes, todayKey]);

  // Countdown timer
  useEffect(() => {
    if (!canDraw && !loading) {
      const update = () => setCountdown(msUntilMidnightJST());
      update();
      const interval = setInterval(update, 60_000);
      return () => clearInterval(interval);
    }
  }, [canDraw, loading]);

  const drawFortune = useCallback(async (): Promise<Fortune> => {
    const level = pickWeightedRandom(FORTUNE_LEVELS);
    const messages = FORTUNE_MESSAGES[level];

    const categories = {} as Record<FortuneCategory, string>;
    const categoryKeys: FortuneCategory[] = [
      '願望', '恋愛', '健康', '仕事', '金運',
      '学業', '旅行', '待人', '失物', '争事',
    ];

    for (const cat of categoryKeys) {
      categories[cat] = pickRandom(messages[cat]);
    }

    const fortune: Fortune = {
      id: generateId(),
      level,
      categories,
      drawnAt: new Date().toISOString(),
      dateKey: todayKey,
    };

    await addFortune(fortune);
    setTodayFortune(fortune);
    return fortune;
  }, [todayKey, addFortune]);

  return {
    loading,
    canDraw,
    todayFortune,
    countdown,
    drawFortune,
    history: getHistory(),
  };
}
