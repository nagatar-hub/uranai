import AsyncStorage from '@react-native-async-storage/async-storage';
import { FortuneStore } from '../types/fortune';

const STORAGE_KEY = '@omikuji_store';

const DEFAULT_STORE: FortuneStore = {
  fortunes: [],
  lastDrawDateKey: null,
};

export async function loadFortuneStore(): Promise<FortuneStore> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return DEFAULT_STORE;
  return JSON.parse(raw) as FortuneStore;
}

export async function saveFortuneStore(store: FortuneStore): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export async function clearFortuneStore(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
