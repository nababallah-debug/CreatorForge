import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Lightbulb,
  BookOpen,
  Workflow,
  FolderOpen,
  Info,
  Shield,
  Zap,
  Download,
  Smartphone,
} from "lucide-react";
import { Reveal, CountUp } from "@/components/ui/Reveal";
import { Badge, Button, SectionHeader } from "@/components/ui/ui";
import CreatorJourney from "@/components/CreatorJourney";

const TOOLS = [
  {
    href: "/tycoon",
    icon: Calculator,
    title: "Calculateur Tycoon",
    desc: "Simule l'économie de ton tycoon : prix, revenus, croissance des coûts et temps nécessaire pour chaque palier.",
    tone: "text-accent bg-accent/10 border-accent/20",
  },
  {
    href: "/concepts",
    icon: Lightbulb,
    title: "Générateur de concepts",
    desc: "Génère un concept de jeu complet : genre, mécaniques, progression, objectifs et monétisation éthique.",
    tone: "text-violet bg-violet/10 border-violet/20",
  },
  {
    href: "/prompts",
    icon: BookOpen,
    title: "Bibliothèque de prompts",
    desc: "16 prompts spécialisés pour Roblox Studio : Lua, architecture, UI, performance et débugage.",
    tone: "text-sky bg-sky/10 border-sky/20",
  },
  {
    href: "/dev-plan",
    icon: Workflow,
    title: "Plan de développement",
    desc: "Génère un roadmap par phases et l'arborescence de projet adaptée à ton équipe et ton scope.",
    tone: "text-mint bg-mint/10 border-mint/20",
  },
  {
    href: "/resources",
    icon: FolderOpen,
    title: "Ressources",
    desc: "Exemples originaux : configs tycoon, snippets Lua, arborescences et checklist de qualité.",
    tone: "text-ember bg-ember/10 border-ember/20",
  },
  {
    href: "/ai-limits",
    icon: Info,
    title: "Limites de l'IA",
    desc: "Comprends ce que l'IA fait bien, ses limites connues et les bonnes pratiques pour l'utiliser.",
    tone: "text-accent2 bg-accent2/10 border-accent2/20",
  },
];

const GENRES = [
  "Tycoon", "Simulator", "Obby", "Survie", "Horreur", "RPG", "Tower Defense",
  "Course", "PvP", "Escape Game", "Construction", "Idle", "Métavers", "Stratégie",
];

const STEPS = [
  {
    n: "01",
    title: "Choisis un outil",
    desc: "Six outils spécialisés, chacun conçu pour une étape précise de la création.",
  },
  {
    n: "02",
    title: "Renseigne tes paramètres",
    desc: "Sliders, sélections et presets. Tout est calculé localement, en temps réel.",
  },
  {
    n: "03",
    title: "Copie et exporte",
    desc: "Markdown, CSV, JSON ou texte brut. Intègre directement dans Roblox Studio.",
  },
];

const FEATURES = [
  { icon: Zap, title: "100 % local", desc: "Aucun serveur, aucune clé API. Tout tourne dans ton navigateur." },
  { icon: Shield, title: "Sans inscription", desc: "Pas de compte, pas de tracking. Ouvre et crée." },
  { icon: Download, title: "Export universel", desc: "Markdown, CSV, JSON : emporte tes résultats partout." },
  { icon: Smartphone, title: "Responsive", desc: "Pensé mobile : outils utilisables sur tablette et téléphone." },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-accent/12 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute top-40 -left-32 h-64 w-64 rounded-full bg-violet/10 blur-3xl" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Badge tone="accent" className="mx-auto">
                v1.0 · Gratuit · Sans inscription
              </Badge>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 font-display text-5xl font-bold tracking-tight text-text sm:text-6xl lg:text-7xl">
                Passe de l’idée au{" "}
                <span className="text-gradient">jeu Roblox</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
                Conçois ton concept, équilibre ta progression et organise ton développement. Des outils gratuits pour avancer concrètement, sans inscription ni clé API.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/tycoon">
                  <Button variant="primary" className="w-full sm:w-auto px-6 py-3 text-base">
                    Explorer les outils
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/concepts">
                  <Button variant="secondary" className="w-full sm:w-auto px-6 py-3 text-base">
                    <Lightbulb className="h-4 w-4 text-accent" />
                    Générer une idée
                  </Button>
                </Link>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { value: 6, label: "Outils gratuits" },
                  { value: 16, label: "Prompts Studio" },
                  { value: 0, label: "Clé API requise", custom: "0" },
                  { value: 100, label: "% Local", suffix: "%" },
                ].map((s) => (
                  <div key={s.label} className="card p-4">
                    <p className="font-display text-3xl font-bold text-gradient">
                      {s.custom ? s.custom : <CountUp to={s.value} />}
                      {s.suffix && !s.custom ? <span className="text-gradient">{s.suffix}</span> : null}
                    </p>
                    <p className="mt-1 text-xs text-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Marquee genres ───────────────────────── */}
      <section className="border-y border-border bg-surface/40 py-4 overflow-hidden" aria-hidden>
        <div className="flex w-max animate-marquee gap-8">
          {[...GENRES, ...GENRES].map((g, i) => (
            <span key={i} className="flex items-center gap-8 text-sm font-medium text-faint">
              {g}
              <span className="h-1 w-1 rounded-full bg-accent/50" />
            </span>
          ))}
        </div>
      </section>

      {/* ── Grille d'outils ──────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="La boîte à outils"
          title="Tout ce qu’il faut pour avancer, étape par étape"
          description="Commence par une idée, transforme-la en plan, puis vérifie les systèmes clés avant de construire ton jeu."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t, i) => (
            <Reveal key={t.href} delay={i * 60}>
              <Link href={t.href} className="group block">
                <div className="card h-full p-6 transition-all duration-200 group-hover:-translate-y-1 group-hover:border-accent/40 group-hover:shadow-lift">
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${t.tone}`}>
                    <t.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-text group-hover:text-accent transition-colors">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{t.desc}</p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent opacity-0 transition-all duration-200 group-hover:opacity-100">
                    Ouvrir l'outil
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Espace projet et checklist persistante ─ */}
      <CreatorJourney />

      {/* ── Comment ça marche ────────────────────── */}
      <section className="border-y border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeader
            kicker="Workflow"
            title="Trois étapes, zéro friction"
            description="Pas de compte, pas de configuration. Ouvre un outil, renseigne tes paramètres, exporte le résultat."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="card relative h-full p-6">
                  <span className="font-display text-4xl font-bold text-border-strong">{s.n}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-text">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Pourquoi CreatorForge"
          title="Conçu pour être utilisé tous les jours"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 60}>
              <div className="card h-full p-5">
                <f.icon className="h-6 w-6 text-accent" />
                <h3 className="mt-3 font-display text-base font-semibold text-text">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA final ────────────────────────────── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-surface2 to-surface p-10 text-center sm:p-16">
            <div className="pointer-events-none absolute -top-20 left-1/2 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" aria-hidden />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold text-text sm:text-4xl">
                Prêt à lancer votre projet ?
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-muted">
                Commencez par simuler l'économie de votre tycoon ou générez un concept
                complet en un clic.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/tycoon">
                  <Button variant="primary" className="px-6 py-3">
                    <Calculator className="h-4 w-4" />
                    Calculateur Tycoon
                  </Button>
                </Link>
                <Link href="/dev-plan">
                  <Button variant="secondary" className="px-6 py-3">
                    <Workflow className="h-4 w-4 text-mint" />
                    Plan de développement
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
