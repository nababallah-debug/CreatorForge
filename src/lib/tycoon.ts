/**
 * Moteur du calculateur d'économie tycoon.
 * Modèle : chaque palier coûte plus cher (croissance géométrique ou linéaire)
 * et augmente les revenus du joueur (croissance géométrique ou linéaire).
 */

export interface TycoonInput {
  /** Prix du premier palier (Robux in-game). */
  startPrice: number;
  /** Mode de croissance des coûts. */
  costMode: "multiplier" | "flat";
  /** Multiplicateur (ex. 1.35) ou montant fixe ajouté par palier. */
  costGrowth: number;
  /** Revenus de base par seconde (avant tout achat). */
  baseIncome: number;
  /** Mode de croissance des revenus. */
  incomeMode: "multiplier" | "flat";
  /** Multiplicateur ou gain fixe de revenus par palier acheté. */
  incomeGrowth: number;
  /** Nombre de paliers à modéliser. */
  tiers: number;
  /** Temps de jeu moyen par jour (minutes) → estimation en jours réels. */
  minutesPerDay: number;
}

export interface TycoonRow {
  tier: number;
  cost: number;
  incomeBefore: number;
  incomeAfter: number;
  /** Secondes de jeu pour acheter ce palier (en partant de 0). */
  secondsForTier: number;
  /** Secondes cumulées depuis le début. */
  cumulativeSeconds: number;
}

export interface TycoonResult {
  rows: TycoonRow[];
  totalSeconds: number;
  realDays: number;
  finalIncome: number;
  totalCost: number;
  tips: string[];
}

export const TYCOON_PRESETS: Array<{ id: string; label: string; hint: string; input: TycoonInput }> = [
  {
    id: "fast",
    label: "Rapide",
    hint: "Session courte, progression satisfaisante",
    input: { startPrice: 25, costMode: "multiplier", costGrowth: 1.25, baseIncome: 4, incomeMode: "multiplier", incomeGrowth: 1.6, tiers: 10, minutesPerDay: 30 },
  },
  {
    id: "balanced",
    label: "Équilibré",
    hint: "Le standard des tycoons populaires",
    input: { startPrice: 50, costMode: "multiplier", costGrowth: 1.4, baseIncome: 5, incomeMode: "multiplier", incomeGrowth: 1.5, tiers: 12, minutesPerDay: 45 },
  },
  {
    id: "grind",
    label: "Grind",
    hint: "Progression longue, forte rétention",
    input: { startPrice: 100, costMode: "multiplier", costGrowth: 1.6, baseIncome: 8, incomeMode: "multiplier", incomeGrowth: 1.35, tiers: 15, minutesPerDay: 60 },
  },
];

export function computeTycoon(input: TycoonInput): TycoonResult {
  const rows: TycoonRow[] = [];
  let cumulative = 0;
  let income = Math.max(0, input.baseIncome);
  let cost = Math.max(1, input.startPrice);

  for (let i = 1; i <= input.tiers; i++) {
    if (i > 1) {
      cost =
        input.costMode === "multiplier"
          ? cost * Math.max(1.01, input.costGrowth)
          : cost + Math.max(0, input.costGrowth);
    }
    const incomeBefore = income;
    const secondsForTier = income > 0 ? cost / income : Infinity;
    cumulative += isFinite(secondsForTier) ? secondsForTier : 0;

    rows.push({
      tier: i,
      cost,
      incomeBefore,
      incomeAfter: income,
      secondsForTier,
      cumulativeSeconds: cumulative,
    });

    income =
      input.incomeMode === "multiplier"
        ? income * Math.max(1.01, input.incomeGrowth)
        : income + Math.max(0, input.incomeGrowth);
  }

  const last = rows[rows.length - 1];
  const totalSeconds = cumulative;
  const realDays =
    input.minutesPerDay > 0 ? totalSeconds / (input.minutesPerDay * 60) : Infinity;

  return {
    rows,
    totalSeconds,
    realDays,
    finalIncome: last ? last.incomeAfter : 0,
    totalCost: rows.reduce((acc, r) => acc + r.cost, 0),
    tips: buildTips(input, rows, totalSeconds),
  };
}

/** Conseils d'équilibrage rules-based, déduits des chiffres. */
function buildTips(input: TycoonInput, rows: TycoonRow[], totalSeconds: number): string[] {
  const tips: string[] = [];
  const firstTierMin = rows[0]?.secondsForTier ?? 0;
  const lastTierSec = rows[rows.length - 1]?.secondsForTier ?? 0;
  const ratio = isFinite(lastTierSec) && firstTierMin > 0 ? lastTierSec / firstTierMin : 0;

  if (firstTierMin > 120) {
    tips.push(
      "Le premier palier prend plus de 2 minutes : baissez le prix de départ ou augmentez le revenu de base pour accrocher le joueur dès les 30 premières secondes."
    );
  } else if (firstTierMin < 5) {
    tips.push(
      "Le premier palier s'achète en moins de 5 s : parfait pour le « hook » initial, mais surveillez que la suite ne traîne pas."
    );
  }

  if (ratio > 500) {
    tips.push(
      "L'écart entre le premier et le dernier palier dépasse 500× : la fin risque de devenir un mur. Réduisez la croissance des coûts ou accélérez celle des revenus."
    );
  } else if (ratio < 20 && input.tiers >= 8) {
    tips.push(
      "La progression est très plate (écart < 20×) : le jeu peut sembler trop facile. Augmentez légèrement la croissance des coûts pour créer de la tension."
    );
  }

  const totalHours = totalSeconds / 3600;
  if (totalHours > 40) {
    tips.push(
      `Temps total estimé : ${Math.round(totalHours)} h de jeu. Au-delà de ~15 h, seuls les joueurs les plus engagés finiront le tycoon — c'est voulu si vous visez la rétention longue.`
    );
  } else if (totalHours < 1) {
    tips.push(
      "Le tycoon entier se complète en moins d'une heure : envisagez plus de paliers ou un système de prestige pour prolonger la boucle."
    );
  }

  if (input.costMode === "multiplier" && input.costGrowth > 1.8) {
    tips.push(
      "Une croissance des coûts supérieure à 1,8× par palier explose très vite : testez à 1,4–1,6× pour un équilibre classique."
    );
  }

  if (tips.length === 0) {
    tips.push(
      "Courbe équilibrée : les paliers restent accessibles tout en demandant de la progression. Ajoutez des boosts temporaires (x2 revenus) pour dynamiser les sessions."
    );
  }
  return tips;
}

/* ── Export ─────────────────────────────────────────────── */

export function tycoonToCSV(input: TycoonInput, result: TycoonResult): string {
  const header = "palier;prix;revenus_avant;revenus_apres;secondes_pour_palier;secondes_cumulees";
  const lines = result.rows.map((r) =>
    [
      r.tier,
      Math.round(r.cost),
      r.incomeBefore.toFixed(2),
      r.incomeAfter.toFixed(2),
      isFinite(r.secondsForTier) ? Math.round(r.secondsForTier).toString() : "infini",
      Math.round(r.cumulativeSeconds),
    ].join(";")
  );
  return [
    `# Calculateur Tycoon CreatorForge`,
    `# Prix de depart=${input.startPrice}; croissance couts=${input.costMode}:${input.costGrowth}; revenus/sec de base=${input.baseIncome}`,
    header,
    ...lines,
  ].join("\n");
}

export function tycoonToMarkdown(input: TycoonInput, result: TycoonResult): string {
  const table = [
    "| Palier | Prix | Revenus/s après achat | Temps pour le palier | Temps cumulé |",
    "| --- | --- | --- | --- | --- |",
    ...result.rows.map((r) =>
      `| ${r.tier} | ${Math.round(r.cost).toLocaleString("fr-FR")} | ${r.incomeAfter.toFixed(1)} | ${
        isFinite(r.secondsForTier) ? `${Math.round(r.secondsForTier)} s` : "∞"
      } | ${Math.round(r.cumulativeSeconds).toLocaleString("fr-FR")} s |`
    ),
  ].join("\n");

  return [
    `# Simulation d'économie tycoon`,
    ``,
    `> Générée par CreatorForge — ${new Date().toLocaleDateString("fr-FR")}`,
    ``,
    `## Paramètres`,
    ``,
    `- Prix de départ : **${input.startPrice}**`,
    `- Croissance des coûts : **${input.costMode === "multiplier" ? `×${input.costGrowth}` : `+${input.costGrowth}`}**`,
    `- Revenus de base : **${input.baseIncome}/s**`,
    `- Croissance des revenus : **${input.incomeMode === "multiplier" ? `×${input.incomeGrowth}` : `+${input.incomeGrowth}`}**`,
    `- Paliers : **${input.tiers}**`,
    ``,
    `## Résultats`,
    ``,
    `- Temps de jeu total : **${Math.round(result.totalSeconds).toLocaleString("fr-FR")} s** (~${result.realDays.toFixed(1)} j à ${input.minutesPerDay} min/jour)`,
    `- Coût total : **${Math.round(result.totalCost).toLocaleString("fr-FR")}**`,
    `- Revenu final : **${result.finalIncome.toFixed(1)}/s**`,
    ``,
    `## Détail des paliers`,
    ``,
    table,
    ``,
    `## Conseils d'équilibrage`,
    ``,
    ...result.tips.map((t) => `- ${t}`),
  ].join("\n");
}
