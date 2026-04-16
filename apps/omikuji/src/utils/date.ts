const JST_OFFSET_MS = 9 * 60 * 60 * 1000;

/**
 * Get the current date in JST as 'YYYY-MM-DD'
 */
export function getJSTDateKey(date: Date = new Date()): string {
  const jstTime = new Date(date.getTime() + JST_OFFSET_MS);
  const year = jstTime.getUTCFullYear();
  const month = String(jstTime.getUTCMonth() + 1).padStart(2, '0');
  const day = String(jstTime.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Format a dateKey ('YYYY-MM-DD') for display in Japanese
 */
export function formatDateJP(dateKey: string): string {
  const [year, month, day] = dateKey.split('-');
  return `${year}年${parseInt(month)}月${parseInt(day)}日`;
}

/**
 * Get milliseconds until midnight JST
 */
export function msUntilMidnightJST(): number {
  const now = new Date();
  const jstNow = new Date(now.getTime() + JST_OFFSET_MS);
  const jstMidnight = new Date(jstNow);
  jstMidnight.setUTCHours(24, 0, 0, 0);
  return jstMidnight.getTime() - jstNow.getTime();
}

/**
 * Format milliseconds as "HH時間MM分"
 */
export function formatCountdown(ms: number): string {
  if (ms <= 0) return '引けます！';
  const totalMinutes = Math.floor(ms / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) {
    return `${hours}時間${minutes}分`;
  }
  return `${minutes}分`;
}
