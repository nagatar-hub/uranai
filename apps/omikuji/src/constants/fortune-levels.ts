import { FortuneLevelConfig } from '../types/fortune';

export const FORTUNE_LEVELS: FortuneLevelConfig[] = [
  { level: '大吉', weight: 16, color: '#D04A32', description: '最高の運勢。すべてが順調に進む大変縁起の良い運勢です。' },
  { level: '吉',   weight: 25, color: '#E67E22', description: '良い運勢。物事がうまくいきやすい好調な運勢です。' },
  { level: '中吉', weight: 20, color: '#D4A017', description: 'やや良い運勢。堅実に進めれば良い結果が得られます。' },
  { level: '小吉', weight: 15, color: '#27AE60', description: 'ささやかな吉。小さな幸運に気づける運勢です。' },
  { level: '末吉', weight: 12, color: '#2980B9', description: '将来に向けた吉。今は準備の時期です。' },
  { level: '凶',   weight: 9,  color: '#8E44AD', description: '注意が必要な運勢。慎重に行動しましょう。' },
  { level: '大凶', weight: 3,  color: '#7F8C8D', description: '試練の時。しかし底を知れば後は上がるのみです。' },
];

export function getLevelConfig(level: string): FortuneLevelConfig {
  return FORTUNE_LEVELS.find((l) => l.level === level) ?? FORTUNE_LEVELS[0];
}
