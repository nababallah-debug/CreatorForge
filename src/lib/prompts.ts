/**
 * Bibliothèque de prompts spécialisés pour Roblox Studio.
 * Prompts originaux, rédigés pour être collés dans un assistant IA
 * ou utilisés comme cahier des charges technique.
 */

export type PromptCategory =
  | "Scripting Lua"
  | "Architecture"
  | "World Building"
  | "UI & UX"
  | "Performance"
  | "Game Design"
  | "Débugage";

export interface StudioPrompt {
  id: string;
  title: string;
  category: PromptCategory;
  tags: string[];
  content: string;
}

export const PROMPT_CATEGORIES: PromptCategory[] = [
  "Scripting Lua",
  "Architecture",
  "World Building",
  "UI & UX",
  "Performance",
  "Game Design",
  "Débugage",
];

export const PROMPTS: StudioPrompt[] = [
  {
    id: "tycoon-core",
    title: "Système de drop tycoon (Lua)",
    category: "Scripting Lua",
    tags: ["tycoon", "boucle", "server"],
    content: `Écris un script serveur Roblox (Script dans ServerScriptService) pour un tycoon :
- Un « dropper » accorde une ressource toutes les N secondes au joueur qui l'a acheté.
- Le prix de chaque palier suit une croissance géométrique : prix = prixBase * multiplicateur^(palier-1).
- Les achats passent par RemoteEvent, la validation du solde se fait côté serveur uniquement.
- Utilise une table de leaderstats avec deux valeurs : monnaie et nombre de paliers.
- Code pro commenté, sans exploit possible (aucune confiance côté client).`,
  },
  {
    id: "datastore-save",
    title: "Sauvegarde fiable avec DataStoreService",
    category: "Scripting Lua",
    tags: ["data", "sauvegarde", "server"],
    content: `Écris un module de sauvegarde Roblox en Lua :
- Utilise DataStoreService avec une clé par joueur ("player_" .. userId).
- Charge les données à PlayerAdded avec pcall et une valeur par défaut.
- Sauvegarde à PlayerRemoving ET toutes les 90 secondes via un loop.
- Gère l'échec du chargement : ne pas kick le joueur, loguer l'erreur, repartir des valeurs par défaut.
- Inclus un système de version de schéma (data.version) pour les migrations futures.`,
  },
  {
    id: "remote-pattern",
    title: "Pattern RemoteEvent sécurisé",
    category: "Architecture",
    tags: ["remote", "sécurité", "validation"],
    content: `Explique et code le pattern « server-authoritative » pour Roblox :
- Un seul RemoteEvents folder dans ReplicatedStorage, un événement par action.
- Côté serveur : valider le joueur, la distance, le cooldown et le coût avant d'appliquer l'effet.
- Montrer un exemple complet : achat d'un upgrade (validation solde → débit → application → feedback client).
- Lister les 5 erreurs de validation les plus fréquentes chez les débutants.`,
  },
  {
    id: "module-structure",
    title: "Arborescence de projet propre",
    category: "Architecture",
    tags: ["structure", "organisation", "dossier"],
    content: "Propose une arborescence complète de projet Roblox Studio pour un jeu de type tycoon/simulator :\n- ServerScriptService (services, systèmes, data)\n- ReplicatedStorage (modules partagés, assets, UI)\n- StarterPlayer (StarterPlayerScripts, StarterGui)\n- Workspace (map, droppers, spawn)\nPour chaque dossier : son rôle, ce qu'il ne doit JAMAIS contenir, et une convention de nommage (PascalCase pour les modules, camelCase pour les variables).",
  },
  {
    id: "lighting-build",
    title: "Lighting cinématique rapide",
    category: "World Building",
    tags: ["lumière", "atmosphère", "terrain"],
    content: `Guide-moi pour un éclairage soigné dans Roblox Studio sans être un pro de la 3D :
- Réglages de Lighting (Technology, Brightness, ExposureCompensation, Ambient, OutdoorAmbient).
- Utiliser ColorCorrection et Atmosphere pour une ambiance cohérente (ex. : coucher de soleil cyberpunk).
- Placer 3–5 points lumineux stratégiques plutôt que d'en mettre partout.
- Vérifier la lisibilité : le joueur doit toujours voir le chemin critique.
Donne 3 presets de valeurs concrètes (jour, nuit, néon).`,
  },
  {
    id: "ui-roact",
    title: "UI réactive avec Roact",
    category: "UI & UX",
    tags: ["ui", "roact", "hooks"],
    content: `Crée une interface HUD en Roact (ou Roact Hooks) pour un tycoon :
- Compteur de monnaie animé (tween du nombre lors des gains).
- Bouton d'achat qui affiche le prix, se désactive si le solde est insuffisant, et montre un cooldown.
- Feedback visuel au clic (scale + couleur) et toast de confirmation.
- Respecte les safe zones mobile (UIInset / ScreenInsets).
Code commenté avec les bonnes pratiques de composition Roact.`,
  },
  {
    id: "streaming-opti",
    title: "Optimisation streaming & mémoire",
    category: "Performance",
    tags: ["performance", "streaming", "fps"],
    content: `Audite et optimise un jeu Roblox qui fait baisser le FPS :
- Activer StreamingEnabled et expliquer le modèle de streaming (64 studs par défaut, ajustement).
- Identifier les tueurs de FPS : trop de Parts non-anchored, MeshPart lourds, scripts qui bouclent toutes les frames, GUI non-Wrapping.
- Remplacer les boucles heartbeats par des tâches événementielles ou des intervals ajustables.
- Expliquer quand utiliser Model vs Folder, et l'impact de CollisionFidelity sur la physique.
Donne une checklist de 10 points à vérifier avant un lancement.`,
  },
  {
    id: "balancing-tycoon",
    title: "Équilibrage d'un tycoon",
    category: "Game Design",
    tags: ["tycoon", "équilibrage", "économie"],
    content: `Aide-moi à équilibrer l'économie d'un tycoon Roblox :
- Objectif : le premier palier en < 30 s, le tycoon complet en 2–4 h de jeu.
- Propose une formule de croissance des coûts (géométrique 1,35–1,5×) et de croissance des revenus.
- Calcule un tableau de 10 paliers avec prix, revenus et temps cumulé estimé.
- Intègre des boosts temporaires (x2 pendant 5 min) et un système de prestige.
Explique l'impact de chaque paramètre sur la sensation de progression.`,
  },
  {
    id: "debug-print",
    title: "Débuguer sans casser le jeu",
    category: "Débugage",
    tags: ["debug", "logs", "erreurs"],
    content: `Apprends-moi à débuguer efficacement dans Roblox Studio :
- Utiliser print() avec des préfixes contextuels et la commande F9 (Developer Console).
- Lire une stack trace : identifier la ligne, le script, et le sens de l'erreur.
- Techniques : assertions légères, mode « debug » toggleable, visualisation des hitboxes avec des Parts temporaires.
- Les erreurs les plus fréquentes : nil sur Instance:FindFirstChild, attendre un objet avant qu'il existe, indexation de client sur le serveur.
Donne un snippet de fonction debugLog() activable par un booléen.`,
  },
  {
    id: "quest-system",
    title: "Système de quêtes journalières",
    category: "Scripting Lua",
    tags: ["quêtes", "daily", "server"],
    content: `Code un système de quêtes journalières pour Roblox :
- 3 quêtes aléatoires chaque jour (ex. : collecter 50 ressources, gagner 3 courses, visiter 2 zones).
- Reset à minuit (os.date avec fuseau ou timestamp serveur).
- Suivi de la progression côté serveur, récompense annoncée, claim par RemoteEvent.
- Données sauvegardées : quête du jour, progression, date du dernier reset.
Structure en module réutilisable avec une table de configuration des quêtes possibles.`,
  },
  {
    id: "shop-pass",
    title: "Boutique & Game Passes",
    category: "Scripting Lua",
    tags: ["monétisation", "gamepass", "shop"],
    content: `Crée une boutique Roblox propre :
- Achat de Game Pass avec PromptGamePassPurchase, vérification via UserOwnsGamePassAsync avec pcall et cache mémoire.
- Déboursement de la monnaie premium (Robux → monnaie in-game) via ProductService et ProcessReceipt.
- UI de boutique : liste des offres, états (possédé / achetable / erreur), feedback d'achat.
- Rappel des règles Roblox : pas de pay-to-win, pas de promesse de Robux gratuits, respect des CGU.`,
  },
  {
    id: "mobile-friendliness",
    title: "Rendre son jeu mobile-friendly",
    category: "Game Design",
    tags: ["mobile", "touch", "accessibilité"],
    content: `Adapte un jeu Roblox pour les joueurs mobiles :
- Boutons tactiles assez grands (min 44 px), pas de clics rapides requis.
- UI adaptative : détecter la taille d'écran, repositionner les HUD, utiliser ScreenInsets.
- Gameplay : viser une main, caméra automatique, distances de clic raccourcies.
- Tester avec le device emulator de Studio (F1 → Test → Device).
Checklist de 12 points avant de considérer le jeu « mobile-ready ».`,
  },
  {
    id: "audio-atmo",
    title: "Design sonore immersif",
    category: "World Building",
    tags: ["audio", "ambiance", "musique"],
    content: `Crée une ambiance sonore cohérente dans Roblox :
- Choisir des IDs audio libres de droits (ou assets achetés) et les insérer en StreamingMode.
- Musique de fond en boucle douce (volume 0.3), sons d'ambiance spatialisés (RollOffMaxDistance).
- SFX pour les actions clés (achat, gain, alerte) avec un volume qui ne couvre pas la musique.
- Respecter les règles de modération audio Roblox et offrir un bouton mute dans les paramètres.`,
  },
  {
    id: "onboarding-tutorial",
    title: "Tutoriel d'accueil sans friction",
    category: "UI & UX",
    tags: ["onboarding", "tutoriel", "rétention"],
    content: `Designe le premier tour d'un jeu Roblox (onboarding) :
- Objectif : le joueur comprend la boucle en 60 secondes, sans texte long.
- Séquence : spawn → indicateur visuel (flèche/beacon) → première action guidée → récompense immédiate → débloqué.
- UI : bulles contextuelles avec « Suivant », bouton skip, mémorisation de l'achèvement en datastore.
- Applique la règle des 3 : 3 écrans max, 3 actions à apprendre, 3 secondes entre chaque étape.`,
  },
  {
    id: "anti-exploit",
    title: "Checklist anti-exploit",
    category: "Débugage",
    tags: ["sécurité", "exploit", "serveur"],
    content: `Liste les vulnérabilités classiques d'un jeu Roblox et comment les corriger :
- Ne jamais faire confiance au client : valider distance, vitesse, cooldown, coût côté serveur.
- Sécuriser les RemoteEvents (nommer clairement, ne pas exposer de fonctions génériques).
- Rate-limiter les appels distants par joueur, détecter les comportements anormaux.
- Protéger le DataStore (jamais de write non validé, versionner le schéma).
Fournir un snippet de « guard » générique pour les RemoteEvents avec validation minimale.`,
  },
  {
    id: "release-checklist",
    title: "Checklist avant publication",
    category: "Game Design",
    tags: ["publication", "store", "qualité"],
    content: `Génère la checklist complète avant de publier un jeu sur Roblox :
- Technique : 0 erreur console, FPS stable, DataStore testé, mobile-friendly.
- Store : icône 512×512, 3–5 screenshots, description avec mots-clés, tags pertinents, genre correct.
- Légale : CGU Roblox, politique de confidentialité si data collectée, modération des assets.
- Communauté : message de bienvenue, serveur Discord, roadmap publique.
Organise par ordre de priorité avec des cases à cocher.`,
  },
];

export function searchPrompts(query: string, category: PromptCategory | "Tous"): StudioPrompt[] {
  const q = query.trim().toLowerCase();
  return PROMPTS.filter((p) => {
    const matchCategory = category === "Tous" || p.category === category;
    const matchQuery =
      q.length === 0 ||
      p.title.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.content.toLowerCase().includes(q);
    return matchCategory && matchQuery;
  });
}
