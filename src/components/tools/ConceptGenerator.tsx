"use client";

import { useMemo, useState } from "react";
import {
  Lightbulb,
  RefreshCw,
  Target,
  TrendingUp,
  Users,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import {
  generateConcept,
  conceptToMarkdown,
  GENRES,
  THEMES,
  type GameConcept,
} from "@/lib/concepts";
import { slugify, copyToClipboard } from "@/lib/export";
import { Button, Card, Field, Select, Badge } from "@/components/ui/ui";
import { ExportButtons } from "@/components/ui/actions";

export function ConceptGenerator() {
  const [genre, setGenre] = useState<string>(GENRES[0]);
  const [theme, setTheme] = useState<string>(THEMES[0]);
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1_000_000));
  const [copied, setCopied] = useState(false);

  const concept: GameConcept = useMemo(
    () => generateConcept({ genre, theme }, seed),
    [genre, theme, seed]
  );

  const regenerate = () => setSeed(Math.floor(Math.random() * 1_000_000));

  const handleCopy = async () => {
    const ok = await copyToClipboard(conceptToMarkdown(concept));
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      {/* ── Contrôles ─────────────────────── */}
      <Card className="h-fit lg:sticky lg:top-24">
        <h2 className="font-display text-lg font-semibold text-text">Paramètres</h2>

        <div className="mt-5 space-y-5">
          <Field label="Genre de jeu">
            <Select value={genre} onChange={(e) => setGenre(e.target.value)}>
              {GENRES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </Select>
          </Field>

          <Field label="Thème / décor">
            <Select value={theme} onChange={(e) => setTheme(e.target.value)}>
              {THEMES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </Select>
          </Field>

          <Button variant="primary" onClick={regenerate} className="w-full">
            <RefreshCw className="h-4 w-4" />
            Générer un concept
          </Button>

          <p className="text-xs leading-relaxed text-faint">
            Chaque clic produit une combinaison unique. Le nom, la boucle de jeu,
            les mécaniques et les objectifs sont générés procéduralement.
          </p>
        </div>
      </Card>

      {/* ── Résultat ─────────────────────── */}
      <div className="space-y-6">
        {/* Carte principale */}
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute -top-16 right-0 h-48 w-48 rounded-full bg-violet/10 blur-3xl" aria-hidden />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="violet">{concept.genre}</Badge>
              <Badge tone="neutral">{concept.theme}</Badge>
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
              {concept.name}
            </h2>
            <p className="mt-3 text-sm text-faint">Public cible : {concept.audience}</p>

            <div className="mt-6 rounded-xl border border-border bg-surface2 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-faint">Pitch</p>
              <p className="mt-2 text-base leading-relaxed text-text">{concept.pitch}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="secondary" onClick={regenerate}>
                <RefreshCw className="h-4 w-4" />
                Autre version
              </Button>
              <Button variant="outline" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4 text-mint" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copié !" : "Copier le concept"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Boucle de jeu */}
        <Card>
          <h3 className="flex items-center gap-2 font-display text-base font-semibold text-text">
            <Sparkles className="h-4 w-4 text-violet" />
            Boucle de jeu principale
          </h3>
          <ol className="mt-4 space-y-3">
            {concept.coreLoop.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet/15 text-xs font-bold text-violet">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-muted">{step}</p>
              </li>
            ))}
          </ol>
        </Card>

        {/* Mécaniques */}
        <Card>
          <h3 className="font-display text-base font-semibold text-text">Mécaniques clés</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {concept.mechanics.map((m, i) => (
              <span
                key={i}
                className="rounded-full border border-border bg-surface2 px-3 py-1.5 text-sm text-text"
              >
                {m}
              </span>
            ))}
          </div>
        </Card>

        {/* Progression + Objectifs */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="flex items-center gap-2 font-display text-base font-semibold text-text">
              <TrendingUp className="h-4 w-4 text-mint" />
              Progression
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{concept.progression}</p>
          </Card>
          <Card>
            <h3 className="flex items-center gap-2 font-display text-base font-semibold text-text">
              <Target className="h-4 w-4 text-accent" />
              Objectifs long terme
            </h3>
            <ul className="mt-3 space-y-2">
              {concept.objectives.map((o, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {o}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Monétisation + USP */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="flex items-center gap-2 font-display text-base font-semibold text-text">
              <Users className="h-4 w-4 text-sky" />
              Monétisation éthique
            </h3>
            <ul className="mt-3 space-y-2">
              {concept.monetization.map((m, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
                  {m}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="font-display text-base font-semibold text-text">
              Proposition unique
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{concept.usp}</p>
            <div className="mt-4 border-t border-border pt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-faint">
                Noms alternatifs
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {concept.nameAlternatives.map((n, i) => (
                  <span key={i} className="rounded-md bg-surface3 px-2 py-1 text-xs text-muted">
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Export */}
        <Card>
          <h3 className="font-display text-base font-semibold text-text">Exporter le concept</h3>
          <p className="mt-1 text-sm text-muted">
            Emporte le concept dans votre documentation ou votre GDD.
          </p>
          <div className="mt-4">
            <ExportButtons
              options={[
                {
                  id: "md",
                  label: "Markdown (.md)",
                  filename: `concept-${slugify(concept.name)}.md`,
                  content: conceptToMarkdown(concept),
                  mime: "text/markdown",
                },
                {
                  id: "txt",
                  label: "Texte (.txt)",
                  filename: `concept-${slugify(concept.name)}.txt`,
                  content: conceptToMarkdown(concept),
                },
                {
                  id: "json",
                  label: "JSON (.json)",
                  filename: `concept-${slugify(concept.name)}.json`,
                  content: JSON.stringify(concept, null, 2),
                  mime: "application/json",
                },
              ]}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
