/**
 * Générateur de concepts de jeux Roblox.
 * Banques de données originales + combinaison procédurale.
 * Aucun appel réseau : tout est calculé localement.
 */

export interface ConceptSeeds {
  genre: string;
  theme: string;
}

export interface GameConcept {
  name: string;
  genre: string;
  theme: string;
  pitch: string;
  coreLoop: string[];
  mechanics: string[];
  progression: string;
  objectives: string[];
  monetization: string[];
  usp: string;
  audience: string;
  nameAlternatives: string[];
}

/* ── Banques de données ───────────────────────────────── */

export const GENRES = [
  "Tycoon",
  "Simulator",
  "Obby / Parkour",
  "Survie",
  "Horreur",
  "RPG d'aventure",
  "Tower Defense",
  "Course",
  "PvP / Arène",
  "Escape Game",
  "Construction libre",
  "Idle / Clicker",
] as const;

export const THEMES = [
  "Station spatiale abandonnée",
  "Royaumont médiéval maudit",
  "Mégapole cyberpunk",
  "Archipel tropical",
  "Volcan en éruption",
  "Base sous-marine",
  "Forêt enchantée",
  "Colonie martienne",
  "Monde du candy",
  "Temple maya englouti",
  "Ville miniaturisée",
  "Dimension onirique",
] as const;

const PITCH_TEMPLATES: Array<(g: string, t: string) => string> = [
  (g, t) =>
    `Un ${g.toLowerCase()} situé dans ${t}. Les joueurs commencent avec presque rien et doivent coopérer ou rivaliser pour gravir les échelons avant que l'événement cyclique ne remette tout en question.`,
  (g, t) =>
    `Dans ${t}, chaque session de ${g.toLowerCase()} génère une carte légèrement différente : ressources, raccourcis et menaces changent à chaque partie pour maintenir la tension.`,
  (g, t) =>
    `${g} réinventé dans un décor de ${t} : la progression se joue autant dans l'exploration du décor que dans la montée en puissance du joueur.`,
];

const LOOP_TEMPLATES: Array<(g: string) => string[]> = [
  (g) => [
    "Explorer la zone de départ et récupérer la première ressource-clé",
    `Investir dans une amélioration qui débloque une zone de ${g.toLowerCase()} plus risquée`,
    "Revendre ou transformer le butin pour financer l'étape suivante",
    "Débloquer un raccourci qui accélère les runs futurs",
  ],
  (g) => [
    "Compléter un contrat court (2–4 min) pour gagner la monnaie de base",
    "Choisir une spécialisation parmi 3 rôles complémentaires",
    `Affronter un défi de ${g.toLowerCase()} en fin de session pour un bonus multiplié`,
    "Rejouer avec un malus optionnel pour du multiplicateur de gains",
  ],
];

const MECHANICS_BANK: Record<string, string[]> = {
  collection: [
    "Ressources rares cachées dans des zones dangereuses",
    "Bestiaire à compléter avec bonus de set",
    "Coffres à code partagés entre joueurs du serveur",
  ],
  combat: [
    "Combats à compétences avec esquive et parades",
    "Boss multi-phases mécaniques toutes les 30 secondes",
    "Arènes hebdomadaires avec classement serveur",
  ],
  craft: [
    "Chaîne de craft en 3 étapes avec découverte de recettes",
    "Atelier personnalisable visible par les autres joueurs",
    "Objets légendaires nécessitant une coopération de 4 joueurs",
  ],
  social: [
    "Guildes avec territoires défendables",
    "Marché aux enchères entre joueurs",
    "Mini-jeux créés par la communauté",
  ],
  exploration: [
    "Carte révélée progressivement par l'exploration",
    "Portails secrets déclenchés par des énigmes d'observation",
    "Journal de bord racontant la lore du monde",
  ],
  prestige: [
    "Système de prestige : recommencer avec un multiplicateur permanent",
    "Titres et skins débloqués par les accomplissements",
    "Saisonnier : un reset compétitif tous les 90 jours",
  ],
};

const PROGRESSION_BANK: Array<(g: string) => string> = [
  (g) =>
    `Niveaux 1–50 avec un « mur » au niveau 25 franchissable uniquement en ${g.toLowerCase()} en équipe. Chaque palier de 10 niveaux débloque un quartier du monde.`,
  (g) =>
    `Arbre de compétences à 3 branches (offensif, économique, utilitaire). Les points se gagnent en jouant au ${g.toLowerCase()}, pas en achetant.`,
  (g) =>
    `Progression par réputation auprès de 4 factions : monter auprès de l'une fait baisser les autres, ce qui crée des choix stratégiques récurrents.`,
];

const OBJECTIVES_BANK: Array<(g: string) => string[]> = [
  (g) => [
    `Atteindre le rang Légende en ${g.toLowerCase()}`,
    "Compléter la collection de 120 objets rares",
    "Battre le boss final en moins de 10 minutes",
  ],
  (g) => [
    "Construire un empire valant 1 M de monnaie in-game",
    "Devenir le leader de la saison sur le classement",
    "Découvrir les 5 fins cachées du scénario",
  ],
];

const MONETIZATION = [
  "Pass de saison à 2 paliers (gratuit + premium) cosmétique uniquement",
  "Packs de skins thématiques, jamais de pay-to-win",
  "Boosts de gains achetables avec la monnaie gagnée en jeu (échangeables contre des Robux via DevEx)",
  "Coffres à butin garantis : le joueur voit exactement ce qu'il obtient",
];

const USPS: Array<(g: string, t: string) => string> = [
  (g, t) => `La boucle de ${g.toLowerCase()} la plus accessible du genre, posée dans un décor de ${t} immédiatement lisible.`,
  (g, t) => `Un mélange rare : ${g.toLowerCase()} + exploration narrative dans ${t}, avec un run de 15 minutes parfait pour le public Roblox.`,
  (g, t) => `Chaque partie de ${g.toLowerCase()} est différente grâce à une génération procédurale douce inspirée de ${t}.`,
];

const AUDIENCES = [
  "Joueurs 8–14 ans qui découvrent le genre",
  "Vétérans de tycoons/simulateurs en quête de profondeur",
  "Joueurs mobiles : sessions courtes, reprise facile",
  "Communautés de roleplay cherchant un cadre immersif",
];

const NAME_PARTS: Record<string, { pre: string[]; suf: string[] }> = {
  default: {
    pre: ["Forge", "Nova", "Iron", "Echo", "Prime", "Zenith", "Atlas", "Vortex", "Cinder", "Lumen"],
    suf: ["Craft", "Tycoon", "Empire", "Saga", "Legends", "Works", "Rise", "Frontier", "Labs", "Odyssey"],
  },
};

/* ── Générateur ───────────────────────────────────────── */

function pick<T>(arr: readonly T[] | T[], seed: number, salt = 0): T {
  return arr[(seed + salt * 7) % arr.length];
}

function shuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = (seed + i * 31) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateConcept(seeds: ConceptSeeds, seed?: number): GameConcept {
  const s = seed ?? Math.floor(Math.random() * 1_000_000);
  const genre = seeds.genre;
  const theme = seeds.theme;

  const pitch = pick(PITCH_TEMPLATES, s)(genre, theme);
  const coreLoop = pick(LOOP_TEMPLATES, s, 1)(genre);

  const mechanicKeys = shuffle(Object.keys(MECHANICS_BANK), s).slice(0, 3);
  const mechanics = mechanicKeys.flatMap((k, i) => pick(MECHANICS_BANK[k], s, i + 2));

  const progression = pick(PROGRESSION_BANK, s, 5)(genre);
  const objectives = pick(OBJECTIVES_BANK, s, 6)(genre);
  const monetization = shuffle(MONETIZATION, s).slice(0, 3);
  const usp = pick(USPS, s, 8)(genre, theme);
  const audience = pick(AUDIENCES, s, 9);

  const parts = NAME_PARTS.default;
  const name = `${pick(parts.pre, s, 10)} ${pick(parts.suf, s, 11)}`;
  const nameAlternatives = [
    `${pick(parts.pre, s, 12)} ${pick(parts.suf, s, 13)}`,
    `${theme.split(" ")[0]} ${pick(parts.suf, s, 14)}`,
    `${pick(parts.pre, s, 15)} ${genre === "Tycoon" ? "Industries" : "Chronicles"}`,
  ];

  return {
    name,
    genre,
    theme,
    pitch,
    coreLoop,
    mechanics,
    progression,
    objectives,
    monetization,
    usp,
    audience,
    nameAlternatives,
  };
}

/* ── Export Markdown ──────────────────────────────────── */

export function conceptToMarkdown(c: GameConcept): string {
  return [
    `# Concept : ${c.name}`,
    ``,
    `> Généré par CreatorForge — ${new Date().toLocaleDateString("fr-FR")}`,
    ``,
    `**Genre** : ${c.genre} · **Thème** : ${c.theme} · **Public cible** : ${c.audience}`,
    ``,
    `## Pitch`,
    ``,
    c.pitch,
    ``,
    `## Boucle de jeu principale`,
    ``,
    ...c.coreLoop.map((step, i) => `${i + 1}. ${step}`),
    ``,
    `## Mécaniques clés`,
    ``,
    ...c.mechanics.map((m) => `- ${m}`),
    ``,
    `## Progression`,
    ``,
    c.progression,
    ``,
    `## Objectifs long terme`,
    ``,
    ...c.objectives.map((o) => `- ${o}`),
    ``,
    `## Monétisation (cosmétique, éthique)`,
    ``,
    ...c.monetization.map((m) => `- ${m}`),
    ``,
    `## Proposition unique`,
    ``,
    c.usp,
    ``,
    `## Noms alternatifs`,
    ``,
    ...c.nameAlternatives.map((n) => `- ${n}`),
  ].join("\n");
}
