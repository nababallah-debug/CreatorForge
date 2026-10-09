"use client";

import { useMemo, useState } from "react";
import {
  Clock,
  Coins,
  TrendingUp,
  Calendar,
  Lightbulb,
  RotateCcw,
} from "lucide-react";
import {
  computeTycoon,
  tycoonToCSV,
  tycoonToMarkdown,
  TYCOON_PRESETS,
  type TycoonInput,
} from "@/lib/tycoon";
import { formatNumber, formatDuration, formatRealDays, playSecondsToRealDays } from "@/lib/format";
import { slugify } from "@/lib/export";
import { cn } from "@/lib/cn";
import { Button, Card, Field, SliderField, Select, Stat } from "@/components/ui/ui";
import { CopyButton, ExportButtons } from "@/components/ui/actions";

const DEFAULT_INPUT: TycoonInput = {
  startPrice: 50,
  costMode: "multiplier",
  costGrowth: 1.4,
  baseIncome: 5,
  incomeMode: "multiplier",
  incomeGrowth: 1.5,
  tiers: 12,
  minutesPerDay: 45,
};

export function TycoonCalculator() {
  const [input, setInput] = useState<TycoonInput>(DEFAULT_INPUT);
  const [preset, setPreset] = useState<string>("balanced");

  const result = useMemo(() => computeTycoon(input), [input]);

  const set = <K extends keyof TycoonInput>(key: K, value: TycoonInput[K]) => {
    setInput((prev) => ({ ...prev, [key]: value }));
    setPreset("custom");
  };

  const applyPreset = (id: string) => {
    const p = TYCOON_PRESETS.find((x) => x.id === id);
    if (p) {
      setInput(p.input);
      setPreset(id);
    }
  };

  const reset = () => {
    setInput(DEFAULT_INPUT);
    setPreset("balanced");
  };

  const maxCost = Math.max(...result.rows.map((r) => r.cost));

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      {/* ── Contrôles ─────────────────────── */}
      <Card className="h-fit lg:sticky lg:top-24">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-text">Paramètres</h2>
          <Button variant="ghost" onClick={reset} className="h-8 px-2.5 text-xs">
            <RotateCcw className="h-3.5 w-3.5" />
            Réinitialiser
          </Button>
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-faint">Presets</p>
          <div className="grid grid-cols-3 gap-2">
            {TYCOON_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => applyPreset(p.id)}
                className={cn(
                  "rounded-xl border p-2.5 text-left transition-all cursor-pointer",
                  preset === p.id
                    ? "border-accent/60 bg-accent/10"
                    : "border-border bg-surface2 hover:border-border-strong"
                )}
              >
                <p className={cn("text-sm font-semibold", preset === p.id ? "text-accent" : "text-text")}>
                  {p.label}
                </p>
                <p className="mt-0.5 text-[11px] leading-tight text-muted">{p.hint}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-5">
          <SliderField
            label="Prix du premier palier"
            value={input.startPrice}
            min={5}
            max={500}
            step={5}
            onChange={(v) => set("startPrice", v)}
            format={(v) => `${v} 💰`}
          />

          <Field label="Croissance des coûts">
            <div className="flex gap-2">
              <Select
                value={input.costMode}
                onChange={(e) => set("costMode", e.target.value as TycoonInput["costMode"])}
                className="w-32"
                aria-label="Mode de croissance des coûts"
              >
                <option value="multiplier">× Multiplicateur</option>
                <option value="flat">+ Montant fixe</option>
              </Select>
              <div className="flex-1">
                <SliderField
                  label=""
                  value={input.costGrowth}
                  min={input.costMode === "multiplier" ? 1.05 : 10}
                  max={input.costMode === "multiplier" ? 2.0 : 500}
                  step={input.costMode === "multiplier" ? 0.05 : 10}
                  onChange={(v) => set("costGrowth", v)}
                  format={(v) => (input.costMode === "multiplier" ? `×${v.toFixed(2)}` : `+${v}`)}
                />
              </div>
            </div>
          </Field>

          <SliderField
            label="Revenus de base / seconde"
            value={input.baseIncome}
            min={1}
            max={50}
            step={1}
            onChange={(v) => set("baseIncome", v)}
            format={(v) => `${v}/s`}
          />

          <Field label="Croissance des revenus">
            <div className="flex gap-2">
              <Select
                value={input.incomeMode}
                onChange={(e) => set("incomeMode", e.target.value as TycoonInput["incomeMode"])}
                className="w-32"
                aria-label="Mode de croissance des revenus"
              >
                <option value="multiplier">× Multiplicateur</option>
                <option value="flat">+ Gain fixe</option>
              </Select>
              <div className="flex-1">
                <SliderField
                  label=""
                  value={input.incomeGrowth}
                  min={input.incomeMode === "multiplier" ? 1.05 : 1}
                  max={input.incomeMode === "multiplier" ? 2.0 : 50}
                  step={input.incomeMode === "multiplier" ? 0.05 : 1}
                  onChange={(v) => set("incomeGrowth", v)}
                  format={(v) => (input.incomeMode === "multiplier" ? `×${v.toFixed(2)}` : `+${v}/s`)}
                />
              </div>
            </div>
          </Field>

          <SliderField
            label="Nombre de paliers"
            value={input.tiers}
            min={3}
            max={25}
            step={1}
            onChange={(v) => set("tiers", v)}
          />

          <SliderField
            label="Temps de jeu / jour"
            value={input.minutesPerDay}
            min={5}
            max={240}
            step={5}
            onChange={(v) => set("minutesPerDay", v)}
            format={(v) => `${v} min`}
          />
        </div>
      </Card>

      {/* ── Résultats ─────────────────────── */}
      <div className="space-y-6">
        {/* Résumé */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Stat
            label="Temps de jeu total"
            value={formatDuration(result.totalSeconds)}
            hint="Pour compléter tous les paliers"
            icon={<Clock className="h-4 w-4" />}
          />
          <Stat
            label="Temps réel estimé"
            value={formatRealDays(result.realDays)}
            hint={`à ${input.minutesPerDay} min/jour`}
            icon={<Calendar className="h-4 w-4" />}
          />
          <Stat
            label="Coût total"
            value={formatNumber(result.totalCost)}
            hint="Somme de tous les paliers"
            icon={<Coins className="h-4 w-4" />}
          />
          <Stat
            label="Revenu final"
            value={`${formatNumber(result.finalIncome, 1)}/s`}
            hint="Après le dernier palier"
            icon={<TrendingUp className="h-4 w-4" />}
          />
        </div>

        {/* Graphique SVG */}
        <Card>
          <h3 className="font-display text-base font-semibold text-text">
            Coût par palier <span className="text-xs font-normal text-faint">(échelle logarithmique)</span>
          </h3>
          <div className="mt-4 flex h-48 items-end gap-1.5">
            {result.rows.map((r) => {
              const h = Math.max(4, (Math.log10(r.cost + 1) / Math.log10(maxCost + 1)) * 100);
              return (
                <div key={r.tier} className="group relative flex-1">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-accent/40 to-accent transition-all duration-300 group-hover:from-accent/60 group-hover:to-accent2"
                    style={{ height: `${h}%` }}
                  />
                  <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 rounded-lg border border-border bg-surface3 px-2 py-1 text-[11px] whitespace-nowrap text-text opacity-0 transition-opacity group-hover:opacity-100">
                    Palier {r.tier} · {formatNumber(r.cost)}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-2 flex justify-between text-[11px] text-faint">
            <span>Palier 1</span>
            <span>Palier {input.tiers}</span>
          </div>
        </Card>

        {/* Tableau */}
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-semibold text-text">
              Détail des paliers
            </h3>
            <CopyButton
              text={tycoonToMarkdown(input, result)}
              label="Copier le Markdown"
              variant="ghost"
            />
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-faint">
                  <th className="pb-3 pr-4 font-medium">Palier</th>
                  <th className="pb-3 pr-4 font-medium">Prix</th>
                  <th className="pb-3 pr-4 font-medium">Revenus/s</th>
                  <th className="pb-3 pr-4 font-medium">Temps palier</th>
                  <th className="pb-3 font-medium">Temps cumulé</th>
                </tr>
              </thead>
              <tbody>
                {result.rows.map((r) => (
                  <tr key={r.tier} className="row-hover border-b border-border/50">
                    <td className="py-2.5 pr-4 font-medium text-text">{r.tier}</td>
                    <td className="py-2.5 pr-4 font-mono text-accent tabular-nums">
                      {formatNumber(r.cost)}
                    </td>
                    <td className="py-2.5 pr-4 font-mono text-mint tabular-nums">
                      {formatNumber(r.incomeAfter, 1)}/s
                    </td>
                    <td className="py-2.5 pr-4 font-mono text-muted tabular-nums">
                      {isFinite(r.secondsForTier) ? formatDuration(r.secondsForTier) : "∞"}
                    </td>
                    <td className="py-2.5 font-mono text-muted tabular-nums">
                      {formatDuration(r.cumulativeSeconds)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Conseils */}
        <Card>
          <h3 className="flex items-center gap-2 font-display text-base font-semibold text-text">
            <Lightbulb className="h-4 w-4 text-accent" />
            Conseils d'équilibrage
          </h3>
          <ul className="mt-3 space-y-2">
            {result.tips.map((tip, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {tip}
              </li>
            ))}
          </ul>
        </Card>

        {/* Export */}
        <Card>
          <h3 className="font-display text-base font-semibold text-text">Exporter les résultats</h3>
          <p className="mt-1 text-sm text-muted">
            Copie rapide ou téléchargement dans le format de votre choix.
          </p>
          <div className="mt-4">
            <ExportButtons
              options={[
                {
                  id: "md",
                  label: "Markdown (.md)",
                  filename: `tycoon-${slugify(input.costMode + "-" + input.costGrowth)}.md`,
                  content: tycoonToMarkdown(input, result),
                  mime: "text/markdown",
                },
                {
                  id: "csv",
                  label: "CSV (.csv)",
                  filename: "tycoon-simulation.csv",
                  content: tycoonToCSV(input, result),
                  mime: "text/csv",
                },
                {
                  id: "json",
                  label: "JSON (.json)",
                  filename: "tycoon-simulation.json",
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
