import {
  CheckCircle2,
  AlertTriangle,
  Shield,
  Brain,
  Eye,
  Wrench,
} from "lucide-react";
import { Card, Badge, SectionHeader } from "@/components/ui/ui";
import { Reveal } from "@/components/ui/Reveal";

const STRENGTHS = [
  {
    icon: Brain,
    title: "Idéation rapide",
    desc: "Générer 10 concepts en 30 secondes pour explorer le champ des possibles.",
  },
  {
    icon: Wrench,
    title: "Point de départ technique",
    desc: "Des snippets Lua et des patterns architecture prêts à adapter.",
  },
  {
    icon: Eye,
    title: "Vision d'ensemble",
    desc: "Un roadmap et une arborescence pour structurer votre projet dès le départ.",
  },
];

const LIMITS = [
  {
    title: "Hallucinations possibles",
    desc: "L'IA peut inventer des API Roblox qui n'existent pas. Vérifiez toujours dans la documentation officielle avant d'intégrer du code.",
  },
  {
    title: "Pas de test réel",
    desc: "Un snippet généré n'a jamais été exécuté. Testez-le dans un place de test avant de l'utiliser en production.",
  },
  {
    title: "Contexte limité",
    desc: "Les outils ne connaissent pas votre projet. Les résultats sont génériques et doivent être adaptés à votre cas précis.",
  },
  {
    title: "Pas de vision créative",
    desc: "L'IA ne remplace pas votre instinct de game designer. Utilisez les concepts comme des amorces, pas comme des vérités.",
  },
];

const BEST_PRACTICES = [
  "Vérifiez toute API Lua dans la documentation officielle Roblox",
  "Testez chaque snippet dans un place isolé avant de l'intégrer",
  "Ne partagez jamais de données personnelles ou de clés API avec un assistant IA",
  "Gardez votre GDD comme source de vérité, pas les sorties IA",
  "Utilisez l'IA pour explorer, décidez vous-même",
  "Documentez vos choix : pourquoi ce palier, pourquoi cette croissance",
];

const NOT_REPLACED = [
  "Votre vision créative et votre goût de game designer",
  "Le test réel avec des joueurs humains",
  "L'équilibrage fin qui se fait en playtest",
  "La communauté que vous construisez autour de votre jeu",
];

export default function AiLimitsPage() {
  return (
    <>
      <div className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Badge tone="accent">Transparence</Badge>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
            Limites des résultats générés par IA
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            CreatorForge utilise l'IA pour vous faire gagner du temps,
            pas pour remplacer votre jugement. Voici exactement ce que ces
            outils font bien — et ce qu'ils ne font pas.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* ── Forces ─────────────────────── */}
          <section>
            <SectionHeader
              kicker="Ce qui marche"
              title="L'IA excelle pour"
            />
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {STRENGTHS.map((s, i) => (
                <Reveal key={s.title} delay={i * 60}>
                  <Card className="h-full">
                    <s.icon className="h-6 w-6 text-mint" />
                    <h3 className="mt-3 font-display text-base font-semibold text-text">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── Limites ────────────────────── */}
          <section>
            <SectionHeader
              kicker="Ce qu'il faut savoir"
              title="Limites connues"
            />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {LIMITS.map((l, i) => (
                <Reveal key={l.title} delay={i * 60}>
                  <Card className="h-full border-ember/20">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-ember" />
                      <div>
                        <h3 className="font-display text-base font-semibold text-text">
                          {l.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{l.desc}</p>
                      </div>
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── Bonnes pratiques ───────────── */}
          <section>
            <SectionHeader
              kicker="Bonnes pratiques"
              title="Comment bien utiliser ces outils"
            />
            <Reveal>
              <Card>
                <ul className="space-y-3">
                  {BEST_PRACTICES.map((b, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                      {b}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </section>

          {/* ── Ce que l'IA ne remplace pas ──── */}
          <section>
            <SectionHeader
              kicker="Votre rôle"
              title="Ce que l'IA ne remplace pas"
            />
            <Reveal>
              <Card className="border-accent/30 bg-gradient-to-b from-accent/5 to-transparent">
                <ul className="space-y-3">
                  {NOT_REPLACED.map((n, i) => (
                    <li key={i} className="flex gap-3 text-sm text-text">
                      <Shield className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {n}
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
