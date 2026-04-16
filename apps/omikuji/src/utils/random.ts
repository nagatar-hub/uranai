import { FortuneLevelConfig, FortuneLevel } from '../types/fortune';

/**
 * Pick a fortune level using weighted random selection.
 */
export function pickWeightedRandom(levels: FortuneLevelConfig[]): FortuneLevel {
  const totalWeight = levels.reduce((sum, l) => sum + l.weight, 0);
  let random = Math.random() * totalWeight;

  for (const config of levels) {
    random -= config.weight;
    if (random <= 0) {
      return config.level;
    }
  }

  return levels[levels.length - 1].level;
}

/**
 * Pick a random item from an array.
 */
export function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * Generate a simple unique ID.
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
