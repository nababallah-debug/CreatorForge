"use client";

import { useMemo, useState } from "react";
import {
  Workflow,
  CheckCircle2,
  AlertTriangle,
  Users,
  Copy,
  Check,
  FileCode,
} from "lucide-react";
import {
  generateDevPlan,
  devPlanToMarkdown,
  DEV_MODULES,
  type DevPlanInput,
} from "@/lib/devplan";
import { slugify, copyToClipboard } from "@/lib/export";
import { cn } from "@/lib/cn";
import { Button, Card, Field, Select, SliderField, OptionCard } from "@/components/ui/ui";
import { CopyButton, ExportButtons } from "@/components/ui/actions";

export function DevPlanGenerator() {
  const [input, setInput] = useState<DevPlanInput>({
    projectName: "MonJeu",
    genre: "Tycoon",
    teamSize: "solo",
    durationWeeks: 16,
    scope: "standard",
    modules: ["Économie (tycoon / boutique)", "Sauvegarde des joueurs"],
  });
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => generateDevPlan(input), [input]);

  const toggleModule = (m: string) => {
    setInput((prev) => ({
      ...prev,
      modules: prev.modules.includes(m)
        ? prev.modules.filter((x) => x !== m)
        : [...prev.modules, m],
    }));
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(devPlanToMarkdown(input, result));
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const teamLabels = {
    solo: { title: "Solo", desc: "Un développeur, tous les rôles" },
    small: { title: "2–3 personnes", desc: "Code + build séparés" },
    medium: { title: "4+ personnes", desc: "Équipe structurée" },
  } as const;

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      {/* ── Contrôles ─────────────────────── */}
      <Card className="h-fit lg:sticky lg:top-24">
        <h2 className="font-display text-lg font-semibold text-text">Paramètres du projet</h2>

        <div className="mt-5 space-y-5">
          <Field label="Nom du projet">
            <input
              type="text"
              value={input.projectName}
              onChange={(e) => setInput((p) => ({ ...p, projectName: e.target.value }))}
              className="w-full rounded-xl border border-border bg-surface2 px-3.5 py-2.5 text-sm text-text placeholder:text-faint focus:border-accent/60 focus:outline-none"
              placeholder="MonJeu"
            />
          </Field>

          <Field label="Genre">
            <Select
              value={input.genre}
              onChange={(e) => setInput((p) => ({ ...p, genre: e.target.value }))}
            >
              {["Tycoon", "Simulator", "Obby", "Survie", "Horreur", "RPG", "Tower Defense", "Course", "PvP", "Escape Game"].map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </Select>
          </Field>

          <Field label="Taille de l'équipe">
            <div className="space-y-2">
              {(Object.keys(teamLabels) as Array<keyof typeof teamLabels>).map((k) => (
                <OptionCard
                  key={k}
                  selected={input.teamSize === k}
                  onClick={() => setInput((p) => ({ ...p, teamSize: k }))}
                  title={teamLabels[k].title}
                  desc={teamLabels[k].desc}
                  icon={<Users className="h-4 w-4" />}
                />
              ))}
            </div>
          </Field>

          <SliderField
            label="Durée cible"
            value={input.durationWeeks}
            min={4}
            max={52}
            step={1}
            onChange={(v) => setInput((p) => ({ ...p, durationWeeks: v }))}
            format={(v) => `${v} sem.`}
          />

          <Field label="Scope">
            <div className="space-y-2">
              {(["mvp", "standard", "ambitious"] as const).map((s) => (
                <OptionCard
                  key={s}
                  selected={input.scope === s}
                  onClick={() => setInput((p) => ({ ...p, scope: s }))}
                  title={s === "mvp" ? "MVP" : s === "standard" ? "Standard" : "Ambitieux"}
                  desc={
                    s === "mvp"
                      ? "1 zone, 1 boucle, lancement rapide"
                      : s === "standard"
                      ? "2–3 zones + 1 système secondaire"
                      : "4+ zones, contenu saisonnier"
                  }
                />
              ))}
            </div>
          </Field>

          <Field label="Modules à inclure" hint="Influence l'arborescence du projet">
            <div className="space-y-2">
              {DEV_MODULES.map((m) => (
                <label
                  key={m}
                  className={cn(
                    "flex cursor-pointer items-center gap-2.5 rounded-xl border p-3 text-sm transition-all",
                    input.modules.includes(m)
                      ? "border-accent/50 bg-accent/10 text-text"
                      : "border-border bg-surface2 text-muted hover:border-border-strong"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={input.modules.includes(m)}
                    onChange={() => toggleModule(m)}
                    className="h-4 w-4 accent-[#ff8a3d]"
                  />
                  {m}
                </label>
              ))}
            </div>
          </Field>
        </div>
      </Card>

      {/* ── Résultats ─────────────────────── */}
      <div className="space-y-6">
        {/* Phases */}
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-display text-base font-semibold text-text">
              <Workflow className="h-4 w-4 text-mint" />
              Roadmap — {input.durationWeeks} semaines
            </h3>
            <CopyButton text={devPlanToMarkdown(input, result)} label="Copier le plan" variant="ghost" />
          </div>

          <div className="mt-5 space-y-4">
            {result.phases.map((p, i) => (
              <div key={p.name} className="relative">
                {i < result.phases.length - 1 && (
                  <div className="absolute left-5 top-12 h-[calc(100%-2.5rem)] w-px bg-border" aria-hidden />
                )}
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint/15 text-mint font-display text-sm font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-display text-base font-semibold text-text">{p.name}</h4>
                      <span className="rounded-full bg-surface3 px-2.5 py-0.5 text-xs text-muted">
                        Semaines {p.weekStart}–{p.weekEnd}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{p.goal}</p>
                    <ul className="mt-3 space-y-1.5">
                      {p.tasks.map((t, j) => (
                        <li key={j} className="flex gap-2 text-sm text-muted">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-faint" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Arborescence */}
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-display text-base font-semibold text-text">
              <FileCode className="h-4 w-4 text-violet" />
              Arborescence de projet
            </h3>
            <CopyButton text={result.projectTree} label="Copier" variant="ghost" />
          </div>
          <pre className="code-block mt-4">{result.projectTree}</pre>
        </Card>

        {/* Organisation + Checklist */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="flex items-center gap-2 font-display text-base font-semibold text-text">
              <Users className="h-4 w-4 text-sky" />
              Organisation d'équipe
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{result.teamNote}</p>
          </Card>

          <Card>
            <h3 className="flex items-center gap-2 font-display text-base font-semibold text-text">
              <AlertTriangle className="h-4 w-4 text-ember" />
              Risques à surveiller
            </h3>
            <ul className="mt-3 space-y-2">
              {result.risks.map((r, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                  {r}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Checklist */}
        <Card>
          <h3 className="font-display text-base font-semibold text-text">
            Checklist de lancement
          </h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {result.checklist.map((c, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-muted">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                {c}
              </li>
            ))}
          </ul>
        </Card>

        {/* Export */}
        <Card>
          <h3 className="font-display text-base font-semibold text-text">Exporter le plan</h3>
          <p className="mt-1 text-sm text-muted">
            Emporte le roadmap complet dans votre documentation.
          </p>
          <div className="mt-4">
            <ExportButtons
              options={[
                {
                  id: "md",
                  label: "Markdown (.md)",
                  filename: `plan-${slugify(input.projectName)}.md`,
                  content: devPlanToMarkdown(input, result),
                  mime: "text/markdown",
                },
                {
                  id: "txt",
                  label: "Texte (.txt)",
                  filename: `plan-${slugify(input.projectName)}.txt`,
                  content: devPlanToMarkdown(input, result),
                },
                {
                  id: "json",
                  label: "JSON (.json)",
                  filename: `plan-${slugify(input.projectName)}.json`,
                  content: JSON.stringify({ input, result }, null, 2),
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
