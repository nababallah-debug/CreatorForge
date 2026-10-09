/**
 * Générateur de plan de développement + arborescence de projet Roblox.
 * Logique 100 % locale, déterministe.
 */

export interface DevPlanInput {
  projectName: string;
  genre: string;
  teamSize: "solo" | "small" | "medium";
  durationWeeks: number;
  scope: "mvp" | "standard" | "ambitious";
  modules: string[];
}

export interface Phase {
  name: string;
  weekStart: number;
  weekEnd: number;
  goal: string;
  tasks: string[];
}

export interface DevPlanResult {
  phases: Phase[];
  projectTree: string;
  checklist: string[];
  risks: string[];
  teamNote: string;
}

export const DEV_MODULES = [
  "Économie (tycoon / boutique)",
  "Sauvegarde des joueurs",
  "Système de quêtes",
  "PvP / compétitif",
  "Social (guildes / chat)",
  "UI avancée",
  "Mobile-friendly",
  "Audio & ambiance",
] as const;

const PHASE_TEMPLATES: Array<{
  name: string;
  share: number; // part de la durée totale
  goal: string;
  tasks: string[];
}> = [
  {
    name: "Conception",
    share: 0.12,
    goal: "Geler le concept, l'économie et la feuille de route",
    tasks: [
      "Rédiger le game design document (1 page par système)",
      "Modéliser l'économie (prix, revenus, croissance)",
      "Définir l'arborescence du projet et les conventions de nommage",
      "Créer le backlog technique découpé en tâches de < 1 jour",
    ],
  },
  {
    name: "Prototype",
    share: 0.18,
    goal: "Prouver que la boucle de base est fun",
    tasks: [
      "Monter la boucle core dans un place vide (greybox)",
      "Implémenter la progression minimale (1 ressource, 1 upgrade)",
      "Tester avec 3 joueurs externes et mesurer le temps de première victoire",
      "Itérer 2× sur les chiffres avant de continuer",
    ],
  },
  {
    name: "Production",
    share: 0.4,
    goal: "Construire tous les systèmes et le contenu",
    tasks: [
      "Développer les systèmes serveur (économie, data, quêtes)",
      "Construire la carte et les assets visuels par zones",
      "Implémenter l'UI complète (HUD, boutique, menus)",
      "Intégrer l'audio et l'éclairage par zone",
    ],
  },
  {
    name: "Alpha interne",
    share: 0.1,
    goal: "Premier jeu complet jouable de bout en bout",
    tasks: [
      "Assembler toutes les zones et systèmes",
      "Corriger les blockers et les crashes",
      "Session de test interne avec grille de bugs",
      "Trier le backlog restant en critique / majeur / cosmétique",
    ],
  },
  {
    name: "Bêta ouverte",
    share: 0.12,
    goal: "Valider la rétention avec de vrais joueurs",
    tasks: [
      "Publier en bêta (accès public, mode test)",
      "Collecter les métriques : session moyenne, D1/D7, drop-off",
      "Corriger les 20 bugs les plus fréquents",
      "Ajuster l'équilibrage selon les retours",
    ],
  },
  {
    name: "Polish & lancement",
    share: 0.08,
    goal: "Zéro défaut visible, store optimisé",
    tasks: [
      "Polish visuel : transitions, particules, feedback sonore",
      "Optimiser les performances (streaming, mémoire)",
      "Préparer la fiche store (icône, screenshots, description)",
      "Publier et annoncer sur les réseaux / Discord",
    ],
  },
];

const SCOPE_TASKS: Record<DevPlanInput["scope"], string> = {
  mvp: "Scope MVP : 1 zone, 1 boucle, 0 système secondaire. Tout le reste est post-lancement.",
  standard: "Scope standard : 2–3 zones, boucle complète + 1 système secondaire (quêtes ou boutique).",
  ambitious: "Scope ambitieux : 4+ zones, 2+ systèmes secondaires, contenu saisonnier dès le lancement.",
};

const TEAM_NOTES: Record<DevPlanInput["teamSize"], string> = {
  solo: "En solo, séquence strictement les phases : un seul système à la fois. Évite de construire deux zones en parallèle.",
  small: "À 2–3, séparez clairement les rôles : 1 codeur serveur, 1 codeur UI/client, 1 builder. Intégration hebdomadaire obligatoire.",
  medium: "À 4+, ajoute un chef de projet à temps partiel et des revues de code systématiques. Fixe un jour d'intégration par semaine.",
};

const RISKS = [
  "Le scope glisse : chaque nouvelle idée va dans un parking lot, pas dans le sprint.",
  "L'économie est déséquilibrée : simule les courbes avant de coder (utilise le calculateur tycoon).",
  "Le DataStore corrompt des sauvegardes : teste les migrations sur une copie de production.",
  "Les performances s'effondrent sur mobile : teste tôt sur un vrai téléphone, pas seulement l'émulateur.",
  "Le lancement arrive sans contenu suffisant : garde 20 % du planning en réserve.",
];

export function generateDevPlan(input: DevPlanInput): DevPlanResult {
  const total = Math.max(4, Math.round(input.durationWeeks));
  const phases: Phase[] = [];
  let cursor = 1;

  for (const t of PHASE_TEMPLATES) {
    const len = Math.max(1, Math.round(total * t.share));
    const weekEnd = Math.min(total, cursor + len - 1);
    phases.push({
      name: t.name,
      weekStart: cursor,
      weekEnd: Math.max(cursor, weekEnd),
      goal: t.goal,
      tasks: t.tasks,
    });
    cursor = weekEnd + 1;
  }
  // Ajuste la dernière phase pour qu'elle finisse exactement à `total`
  phases[phases.length - 1].weekEnd = total;

  const projectTree = buildProjectTree(input);
  const checklist = buildChecklist(input);

  return {
    phases,
    projectTree,
    checklist,
    risks: RISKS,
    teamNote: TEAM_NOTES[input.teamSize],
  };
}

/* ── Arborescence ─────────────────────────────────── */

function buildProjectTree(input: DevPlanInput): string {
  const hasEconomy = input.modules.includes("Économie (tycoon / boutique)");
  const hasQuests = input.modules.includes("Système de quêtes");
  const hasPvp = input.modules.includes("PvP / compétitif");
  const hasSocial = input.modules.includes("Social (guildes / chat)");
  const hasData = input.modules.includes("Sauvegarde des joueurs");

  const lines: string[] = [
    `${input.projectName || "MonJeu"}/`,
    "├── ServerScriptService/",
    "│   ├── Services/            # Initialisation, orchestration",
    "│   ├── Systems/",
  ];

  if (hasEconomy) lines.push("│   │   ├── EconomyService.luau", "│   │   └── ShopService.luau");
  if (hasQuests) lines.push("│   │   └── QuestService.luau");
  if (hasPvp) lines.push("│   │   └── MatchService.luau");
  if (hasSocial) lines.push("│   │   └── GuildService.luau");
  if (hasData) lines.push("│   │   └── DataService.luau");

  lines.push(
    "│   └── Utilities/           # Logger, cooldowns, validations",
    "├── ReplicatedStorage/",
    "│   ├── Modules/             # Code partagé client/serveur",
    "│   ├── Remotes/             # RemoteEvent & RemoteFunction",
    "│   ├── Assets/              # Meshes, textures, audio",
    "│   └── UI/",
    "│       ├── Components/      # Roact / frames réutilisables",
    "│       └── Screens/         # Menus complets",
    "├── StarterPlayer/",
    "│   ├── StarterPlayerScripts/",
    "│   │   ├── Controllers/     # Input, caméra, HUD",
    "│   │   └── ClientMain.luau",
    "│   └── StarterGui/",
    "├── Workspace/",
    "│   ├── Map/                 # Terrain, décors, spawn",
    "│   ├── Systems/             # Droppers, zones, triggers",
    "│   └── Lighting/            # Presets d'éclairage",
    "└── ServerStorage/           # Templates & outils admin",
  );

  return lines.join("\n");
}

/* ── Checklist de lancement ───────────────────────── */

function buildChecklist(input: DevPlanInput): string[] {
  const base = [
    "0 erreur dans la console Developer Console (F9)",
    "DataStore testé : déconnexion/reconnexion sans perte",
    "Aucune confiance côté client sur les achats / gains",
    "FPS stable sur mobile (test sur vrai appareil)",
    "Tutoriel d'accueil complet en < 60 secondes",
    "Bouton mute audio + paramètres de qualité",
  ];
  if (input.scope !== "mvp") {
    base.push("Système de quêtes ou de saisons actif au lancement");
  }
  base.push(
    "Fiche store : icône 512×512, 3+ screenshots, description + mots-clés",
    "Annonce de lancement préparée (Discord, réseaux, DevForum)",
    "Roadmap publique post-lancement rédigée"
  );
  return base;
}

/* ── Export Markdown ──────────────────────────────── */

export function devPlanToMarkdown(input: DevPlanInput, result: DevPlanResult): string {
  return [
    `# Plan de développement — ${input.projectName || "Projet sans nom"}`,
    ``,
    `> Généré par CreatorForge — ${new Date().toLocaleDateString("fr-FR")}`,
    ``,
    `**Genre** : ${input.genre} · **Équipe** : ${input.teamSize} · **Durée** : ${input.durationWeeks} semaines · **Scope** : ${input.scope}`,
    ``,
    SCOPE_TASKS[input.scope],
    ``,
    `## Phases`,
    ``,
    ...result.phases.map(
      (p) =>
        `### ${p.name} (semaines ${p.weekStart}–${p.weekEnd})\n\n**Objectif** : ${p.goal}\n\n` +
        p.tasks.map((t) => `- [ ] ${t}`).join("\n") +
        "\n"
    ),
    `## Arborescence de projet`,
    "",
    "```",
    result.projectTree,
    "```",
    ``,
    `## Organisation d'équipe`,
    ``,
    result.teamNote,
    ``,
    `## Checklist de lancement`,
    ``,
    ...result.checklist.map((c) => `- [ ] ${c}`),
    ``,
    `## Risques à surveiller`,
    ``,
    ...result.risks.map((r) => `- ${r}`),
  ].join("\n");
}
