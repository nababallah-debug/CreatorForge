import {
  FileCode,
  Copy,
  Check,
  ExternalLink,
  ListChecks,
  Code2,
  LayoutTemplate,
  Lightbulb,
} from "lucide-react";
import { Card, Badge, SectionHeader } from "@/components/ui/ui";
import { CopyButton } from "@/components/ui/actions";
import { Reveal } from "@/components/ui/Reveal";

/* ── Snippets Lua originaux ───────────────────── */

const SNIPPETS = [
  {
    title: "Dropper tycoon (serveur)",
    lang: "lua",
    code: `-- ServerScriptService > Systems > Dropper.luau
local RemoteEvents = game.ReplicatedStorage:WaitForChild("Remotes")
local PurchaseEvent = RemoteEvents:WaitForChild("PurchasePalier")

local PRIX_BASE = 50
local CROISSANCE = 1.4

local function getPrix(palier)
  return math.floor(PRIX_BASE * CROISSANCE ^ (palier - 1))
end

PurchaseEvent.OnServerEvent:Connect(function(player, palier)
  if typeof(palier) ~= "number" then return end

  local leaderstats = player:FindFirstChild("leaderstats")
  if not leaderstats then return end

  local monnaie = leaderstats:FindFirstChild("Monnaie")
  local paliers = leaderstats:FindFirstChild("Paliers")
  if not monnaie or not paliers then return end

  -- Validation côté serveur uniquement
  local prix = getPrix(paliers.Value + 1)
  if palier ~= paliers.Value + 1 then return end
  if monnaie.Value < prix then return end

  monnaie.Value -= prix
  paliers.Value += 1
end)`,
  },
  {
    title: "Sauvegarde DataStore (squelette)",
    lang: "lua",
    code: `-- ServerScriptService > Services > DataService.luau
local DataStoreService = game:GetService("DataStoreService")
local Players = game:GetService("Players")

local store = DataStoreService:GetDataStore("PlayerSave_v1")
local cache = {}

Players.PlayerAdded:Connect(function(player)
  local ok, data = pcall(function()
    return store:GetAsync("player_" .. player.UserId)
  end)

  if ok and data then
    cache[player.UserId] = data
  else
    cache[player.UserId] = { monnaie = 0, paliers = 0, version = 1 }
  end

  -- Créer les leaderstats
  local ls = Instance.new("Folder")
  ls.Name = "leaderstats"
  ls.Parent = player

  local monnaie = Instance.new("IntValue")
  monnaie.Name = "Monnaie"
  monnaie.Value = cache[player.UserId].monnaie
  monnaie.Parent = ls

  local paliers = Instance.new("IntValue")
  paliers.Name = "Paliers"
  paliers.Value = cache[player.UserId].paliers
  paliers.Parent = ls
end)

Players.PlayerRemoving:Connect(function(player)
  local data = cache[player.UserId]
  if data then
    pcall(function()
      store:SetAsync("player_" .. player.UserId, data)
    end)
    cache[player.UserId] = nil
  end
end)`,
  },
  {
    title: "Pattern RemoteEvent sécurisé",
    lang: "lua",
    code: `-- ReplicatedStorage > Remotes > AcheterUpgrade (RemoteEvent)
-- ServerScriptService > Systems > ShopService.luau

local Remotes = game.ReplicatedStorage:WaitForChild("Remotes")
local Acheter = Remotes:WaitForChild("AcheterUpgrade")

local COOLDOWN = 1 -- seconde entre chaque achat
local dernierAchat = {}

Acheter.OnServerEvent:Connect(function(player, upgradeId)
  -- 1. Valider le type
  if typeof(upgradeId) ~= "string" then return end

  -- 2. Rate-limit
  local now = os.clock()
  if dernierAchat[player.UserId] and now - dernierAchat[player.UserId] < COOLDOWN then
    return
  end
  dernierAchat[player.UserId] = now

  -- 3. Valider le coût et le solde
  local config = UPGRADES[upgradeId]
  if not config then return end

  local monnaie = player.leaderstats:FindFirstChild("Monnaie")
  if not monnaie or monnaie.Value < config.prix then return end

  -- 4. Appliquer
  monnaie.Value -= config.prix
  -- ... appliquer l'effet de l'upgrade
end)`,
  },
];

/* ── Config tycoon exemple ────────────────────── */

const TYCOON_CONFIG = `{
  "nom": "Tycoon Spatial",
  "devise": "Crédits",
  "paliers": [
    { "nom": "Extracteur Mk I",   "prix": 50,     "revenus": 2 },
    { "nom": "Extracteur Mk II",  "prix": 175,    "revenus": 5 },
    { "nom": "Raffinerie",        "prix": 612,    "revenus": 12 },
    { "nom": "Usine orbitale",    "prix": 2143,   "revenus": 28 },
    { "nom": "Station stellaire", "prix": 7502,   "revenus": 65 }
  ],
  "boosts": [
    { "nom": "Surcadence x2", "duree": 300, "multiplicateur": 2 },
    { "nom": "Surcadence x4", "duree": 600, "multiplicateur": 4 }
  ]
}`;

/* ── Arborescence type ────────────────────────── */

const TREE_EXAMPLE = `MonJeu/
├── ServerScriptService/
│   ├── Services/
│   │   ├── DataService.luau
│   │   └── EconomyService.luau
│   ├── Systems/
│   │   ├── Dropper.luau
│   │   └── QuestSystem.luau
│   └── ServerMain.luau
├── ReplicatedStorage/
│   ├── Remotes/
│   │   ├── AcheterUpgrade (RemoteEvent)
│   │   └── ClaimQuest (RemoteEvent)
│   ├── Modules/
│   │   └── Constants.luau
│   └── UI/
│       ├── HUD
│       └── Menus
├── StarterPlayer/
│   └── StarterPlayerScripts/
│       └── ClientMain.luau
└── Workspace/
    ├── Map/
    └── Systems/`;

/* ── Checklist qualité ────────────────────────── */

const QUALITY_CHECKLIST = [
  "0 erreur dans la console Developer Console (F9)",
  "DataStore testé : déconnexion/reconnexion sans perte",
  "Aucune confiance côté client sur les achats / gains",
  "FPS stable sur mobile (test sur vrai appareil)",
  "Tutoriel d'accueil complet en < 60 secondes",
  "Bouton mute audio + paramètres de qualité",
  "Fiche store : icône 512×512, 3+ screenshots",
  "Roadmap publique post-lancement rédigée",
];

/* ── Liens utiles ─────────────────────────────── */

const LINKS = [
  { label: "Documentation Roblox officielle", href: "https://create.roblox.com/docs" },
  { label: "DevForum Roblox", href: "https://devforum.roblox.com" },
  { label: "Créer un jeu Roblox (guide)", href: "https://create.roblox.com/docs/education" },
  { label: "Référence API Lua", href: "https://create.roblox.com/docs/reference" },
  { label: "CGU Roblox", href: "https://en.help.roblox.com/hc/articles/115004647846" },
];

async function handleCopy(text: string, setCopied: (v: boolean) => void) {
  const ok = await navigator.clipboard.writeText(text).catch(() => false);
  if (ok) {
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }
}

export default function ResourcesPage() {
  return (
    <>
      <div className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Badge tone="accent">Ressources</Badge>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
            Exemples originaux & ressources
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Snippets Lua, configs tycoon, arborescences et checklist de qualité.
            Tout est rédigé pour CreatorForge, prêt à copier-coller.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* ── Snippets Lua ─────────────────── */}
          <section>
            <SectionHeader
              kicker="Code"
              title="Snippets Lua originaux"
              description="Trois snippets prêts à l'emploi pour Roblox Studio. Adaptez-les à votre projet."
            />
            <div className="mt-8 space-y-6">
              {SNIPPETS.map((s) => (
                <Reveal key={s.title}>
                  <Card>
                    <div className="flex items-center justify-between">
                      <h3 className="flex items-center gap-2 font-display text-base font-semibold text-text">
                        <Code2 className="h-4 w-4 text-accent" />
                        {s.title}
                      </h3>
                      <CopyButton text={s.code} label="Copier le code" variant="ghost" />
                    </div>
                    <pre className="code-block mt-4">{s.code}</pre>
                  </Card>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── Config tycoon ────────────────── */}
          <section>
            <SectionHeader
              kicker="Données"
              title="Config tycoon exemple"
              description="Une structure JSON complète pour modéliser un tycoon : paliers, revenus, boosts."
            />
            <Reveal>
              <Card>
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 font-display text-base font-semibold text-text">
                    <FileCode className="h-4 w-4 text-violet" />
                    tycoon-spatial.json
                  </h3>
                  <CopyButton text={TYCOON_CONFIG} label="Copier" variant="ghost" />
                </div>
                <pre className="code-block mt-4">{TYCOON_CONFIG}</pre>
              </Card>
            </Reveal>
          </section>

          {/* ── Arborescence ─────────────────── */}
          <section>
            <SectionHeader
              kicker="Structure"
              title="Arborescence de projet type"
              description="Une organisation propre pour un jeu Roblox de taille moyenne."
            />
            <Reveal>
              <Card>
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 font-display text-base font-semibold text-text">
                    <LayoutTemplate className="h-4 w-4 text-mint" />
                    Arborescence recommandée
                  </h3>
                  <CopyButton text={TREE_EXAMPLE} label="Copier" variant="ghost" />
                </div>
                <pre className="code-block mt-4">{TREE_EXAMPLE}</pre>
              </Card>
            </Reveal>
          </section>

          {/* ── Checklist qualité ────────────── */}
          <section>
            <SectionHeader
              kicker="Qualité"
              title="Checklist avant lancement"
              description="Les 8 points à vérifier absolument avant de publier votre jeu."
            />
            <Reveal>
              <Card>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {QUALITY_CHECKLIST.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted">
                      <ListChecks className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </section>

          {/* ── Liens utiles ─────────────────── */}
          <section>
            <SectionHeader
              kicker="Documentation"
              title="Liens utiles"
              description="Les ressources officielles Roblox à garder en favori."
            />
            <Reveal>
              <Card>
                <ul className="space-y-2">
                  {LINKS.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                      >
                        <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </section>
        </div>
      </div>
    </>
  );
}
