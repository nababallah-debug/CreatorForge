import type { ReactNode } from "react";
import { Badge } from "@/components/ui/ui";

/** En-tête standard des pages d'outils. */
export function PageHeader({
  kicker,
  title,
  description,
  badges,
  children,
}: {
  kicker: string;
  title: string;
  description: string;
  badges?: string[];
  children?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <Badge tone="accent">{kicker}</Badge>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
        {badges && (
          <div className="mt-5 flex flex-wrap gap-2">
            {badges.map((b) => (
              <span
                key={b}
                className="rounded-full border border-border bg-surface2 px-3 py-1 text-xs text-muted"
              >
                {b}
              </span>
            ))}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
