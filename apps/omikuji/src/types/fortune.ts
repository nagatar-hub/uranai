export type FortuneLevel = '大吉' | '吉' | '中吉' | '小吉' | '末吉' | '凶' | '大凶';

export type FortuneCategory =
  | '願望'
  | '恋愛'
  | '健康'
  | '仕事'
  | '金運'
  | '学業'
  | '旅行'
  | '待人'
  | '失物'
  | '争事';

export interface Fortune {
  id: string;
  level: FortuneLevel;
  categories: Record<FortuneCategory, string>;
  drawnAt: string; // ISO 8601
  dateKey: string; // 'YYYY-MM-DD' (JST)
}

export interface FortuneStore {
  fortunes: Fortune[];
  lastDrawDateKey: string | null;
}

export interface FortuneLevelConfig {
  level: FortuneLevel;
  weight: number;
  color: string;
  description: string;
}
