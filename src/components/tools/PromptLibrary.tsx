"use client";

import { useMemo, useState } from "react";
import { Search, Copy, Check, BookOpen } from "lucide-react";
import {
  PROMPTS,
  PROMPT_CATEGORIES,
  searchPrompts,
  type PromptCategory,
} from "@/lib/prompts";
import { cn } from "@/lib/cn";
import { Button, Card, Badge } from "@/components/ui/ui";
import { CopyButton } from "@/components/ui/actions";

const CATEGORY_TONES: Record<PromptCategory, string> = {
  "Scripting Lua": "bg-accent/15 text-accent border-accent/30",
  Architecture: "bg-violet/15 text-violet border-violet/30",
  "World Building": "bg-mint/15 text-mint border-mint/30",
  "UI & UX": "bg-sky/15 text-sky border-sky/30",
  Performance: "bg-ember/15 text-ember border-ember/30",
  "Game Design": "bg-accent2/15 text-accent2 border-accent2/30",
  Débugage: "bg-surface3 text-muted border-border",
};

export function PromptLibrary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PromptCategory | "Tous">("Tous");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const results = useMemo(() => searchPrompts(query, category), [query, category]);

  const handleCopy = async (id: string, content: string) => {
    const ok = await navigator.clipboard.writeText(content).catch(() => false);
    if (ok) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    }
  };

  return (
    <div className="space-y-6">
      {/* Barre de recherche + filtres */}
      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un prompt (ex. tycoon, DataStore, UI…)"
              className="w-full rounded-xl border border-border bg-surface2 py-2.5 pl-10 pr-4 text-sm text-text placeholder:text-faint focus:border-accent/60 focus:outline-none"
              aria-label="Rechercher un prompt"
            />
          </div>
          <p className="text-sm text-muted">
            {results.length} prompt{results.length > 1 ? "s" : ""} sur {PROMPTS.length}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {(["Tous", ...PROMPT_CATEGORIES] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all cursor-pointer",
                category === c
                  ? "border-accent/60 bg-accent/10 text-accent"
                  : "border-border bg-surface2 text-muted hover:border-border-strong hover:text-text"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </Card>

      {/* Grille de prompts */}
      {results.length === 0 ? (
        <Card className="text-center py-12">
          <BookOpen className="mx-auto h-10 w-10 text-faint" />
          <p className="mt-4 text-muted">Aucun prompt trouvé pour « {query} ».</p>
          <Button variant="secondary" onClick={() => { setQuery(""); setCategory("Tous"); }} className="mt-4">
            Réinitialiser la recherche
          </Button>
        </Card>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {results.map((p) => (
            <Card key={p.id} className="flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge tone="neutral" className={CATEGORY_TONES[p.category]}>
                    {p.category}
                  </Badge>
                  <h3 className="mt-2.5 font-display text-lg font-semibold text-text">
                    {p.title}
                  </h3>
                </div>
                <CopyButton
                  text={p.content}
                  label="Copier"
                  variant="icon"
                  className="shrink-0"
                />
              </div>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted whitespace-pre-line">
                {p.content}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border pt-3">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-md bg-surface3 px-2 py-0.5 text-[11px] text-faint">
                    #{t}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
