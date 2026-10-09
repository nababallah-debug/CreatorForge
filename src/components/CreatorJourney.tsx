"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Circle, ClipboardCheck, Lightbulb, RotateCcw, Sparkles, Target } from "lucide-react";

const STORAGE_KEY = "creatorforge-journey-v1";
const GENRES = ["Tycoon", "Simulator", "Obby", "Survie", "Horreur", "RPG", "Tower Defense", "PvP"];
const TASKS = [
  { id: "idea", title: "Définir le concept", detail: "Trouve une idée avec une boucle de gameplay claire.", href: "/concepts", action: "Trouver une idée" },
  { id: "economy", title: "Équilibrer la progression", detail: "Vérifie les coûts, revenus et temps d'attente.", href: "/tycoon", action: "Calculer l'économie" },
  { id: "plan", title: "Préparer les étapes", detail: "Découpe le projet en tâches réalistes.", href: "/dev-plan", action: "Créer un plan" },
  { id: "prompts", title: "Passer à la production", detail: "Utilise un prompt comme point de départ, puis teste le code.", href: "/prompts", action: "Voir les prompts" },
];

type JourneyState = { genre: string; completed: string[] };
const INITIAL: JourneyState = { genre: "Tycoon", completed: [] };

export default function CreatorJourney() {
  const [journey, setJourney] = useState<JourneyState>(INITIAL);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<JourneyState>;
        setJourney({
          genre: GENRES.includes(parsed.genre || "") ? parsed.genre! : INITIAL.genre,
          completed: Array.isArray(parsed.completed) ? parsed.completed.filter((id): id is string => TASKS.some((task) => task.id === id)) : [],
        });
      }
    } catch {
      // If local storage is unavailable or malformed, keep the in-memory defaults.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(journey)); } catch { /* Private browsing can block storage. */ }
  }, [journey, ready]);

  const percent = useMemo(() => Math.round((journey.completed.length / TASKS.length) * 100), [journey.completed.length]);
  function toggleTask(id: string) {
    setJourney((current) => ({ ...current, completed: current.completed.includes(id) ? current.completed.filter((task) => task !== id) : [...current.completed, id] }));
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="mon-projet">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/10 via-surface to-violet/10 p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent"><Sparkles className="h-3.5 w-3.5" /> TON ESPACE DE PROJET</span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-text">Transforme ton idée en plan concret.</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted">Choisis ton type de jeu, avance étape par étape et retrouve ta progression lors de ta prochaine visite sur ce navigateur.</p>
            <label htmlFor="cf-genre" className="mt-6 block text-sm font-semibold text-text">Quel type de jeu prépares-tu ?</label>
            <select id="cf-genre" value={journey.genre} onChange={(event) => setJourney((current) => ({ ...current, genre: event.target.value }))} className="mt-2 w-full rounded-xl border border-border bg-surface2 px-4 py-3 text-sm text-text outline-none transition focus:border-accent">
              {GENRES.map((genre) => <option key={genre} value={genre}>{genre}</option>)}
            </select>
            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted"><Target className="h-4 w-4 text-accent" /> Progression de ton projet</span>
              <strong className="text-text">{percent}%</strong>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface3"><div className="h-full rounded-full bg-gradient-to-r from-accent to-ember transition-all duration-300" style={{ width: `${percent}%` }} /></div>
            <p className="mt-3 text-xs text-faint">{journey.completed.length === TASKS.length ? "Bien joué : les 4 étapes sont cochées. Tu peux les réinitialiser pour un nouveau projet." : `${journey.completed.length} étape${journey.completed.length > 1 ? "s" : ""} sur ${TASKS.length} terminée${journey.completed.length > 1 ? "s" : ""}. Ta progression reste sur cet appareil.`}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div><h3 className="font-display text-xl font-bold text-text">Ta prochaine session</h3><p className="mt-1 text-sm text-muted">Une checklist simple pour éviter de rester bloqué au stade de l'idée.</p></div>
            <ClipboardCheck className="mt-1 h-6 w-6 shrink-0 text-accent" />
          </div>
          <div className="mt-5 space-y-3">
            {TASKS.map((task, index) => {
              const done = journey.completed.includes(task.id);
              return <div key={task.id} className={`rounded-2xl border p-4 transition-colors ${done ? "border-mint/20 bg-mint/5" : "border-border bg-bg/50"}`}>
                <div className="flex items-start gap-3">
                  <button type="button" aria-label={done ? `Marquer ${task.title} comme non terminé` : `Marquer ${task.title} comme terminé`} onClick={() => toggleTask(task.id)} className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${done ? "border-mint bg-mint text-bg" : "border-border-strong text-faint hover:border-accent hover:text-accent"}`}>
                    {done ? <Check className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2"><span className="text-[11px] font-bold tracking-wider text-faint">0{index + 1}</span><h4 className={`text-sm font-semibold ${done ? "text-muted line-through" : "text-text"}`}>{task.title}</h4></div>
                    <p className="mt-1 text-xs leading-5 text-muted">{task.detail}</p>
                    <Link href={task.href} className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent2">{task.action}<ArrowRight className="h-3.5 w-3.5" /></Link>
                  </div>
                </div>
              </div>;
            })}
          </div>
          <button type="button" onClick={() => setJourney((current) => ({ ...current, completed: [] }))} className="mt-4 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-xs font-medium text-muted transition hover:text-text"><RotateCcw className="h-3.5 w-3.5" /> Réinitialiser la checklist</button>
        </div>
      </div>
    </section>
  );
}
