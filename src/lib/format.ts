/** Formateurs de nombres et de durées partagés entre les outils. */

export function formatNumber(n: number, decimals = 0): string {
  if (!isFinite(n)) return "∞";
  if (Math.abs(n) >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)} Md`;
  if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(2)} M`;
  if (Math.abs(n) >= 10_000) return `${(n / 1_000).toFixed(1)} k`;
  return n.toLocaleString("fr-FR", { maximumFractionDigits: decimals });
}

/** Formate une durée en secondes en « Xj Yh Zmin » (ou secondes si < 60 s). */
export function formatDuration(totalSeconds: number): string {
  if (!isFinite(totalSeconds)) return "∞";
  if (totalSeconds < 1) return "< 1 s";
  if (totalSeconds < 60) return `${Math.round(totalSeconds)} s`;

  const s = Math.round(totalSeconds);
  const days = Math.floor(s / 86_400);
  const hours = Math.floor((s % 86_400) / 3600);
  const minutes = Math.floor((s % 3600) / 60);

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} j`);
  if (hours > 0 && days < 30) parts.push(`${hours} h`);
  if (minutes > 0 && days === 0) parts.push(`${minutes} min`);
  if (parts.length === 0) parts.push(`${Math.round(s / 60)} min`);
  return parts.join(" ");
}

/** Convertit des secondes de jeu en jours réels selon le temps de jeu quotidien. */
export function playSecondsToRealDays(playSeconds: number, minutesPerDay: number): number {
  if (minutesPerDay <= 0) return Infinity;
  return playSeconds / (minutesPerDay * 60);
}

export function formatRealDays(days: number): string {
  if (!isFinite(days)) return "∞";
  if (days < 1) return `${Math.max(1, Math.round(days * 24))} h`;
  if (days < 30) return `${days.toFixed(1)} j`;
  if (days < 365) return `${(days / 30.4).toFixed(1)} mois`;
  return `${(days / 365).toFixed(1)} ans`;
}
