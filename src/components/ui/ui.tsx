import type { ReactNode, SelectHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/* ── Button ─────────────────────────────────────── */

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

export function Button({
  variant = "secondary",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  const styles: Record<ButtonVariant, string> = {
    primary:
      "bg-gradient-to-b from-accent2 to-accent text-[#1a0e04] font-semibold hover:brightness-110 active:brightness-95 glow-accent",
    secondary:
      "bg-surface3 text-text border border-border-strong hover:border-accent/60 hover:bg-surface2",
    ghost: "text-muted hover:text-text hover:bg-surface2",
    outline: "border border-border-strong text-muted hover:text-text hover:border-accent/50",
  };
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:pointer-events-none",
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* ── Card ───────────────────────────────────────── */

export function Card({
  className,
  children,
  hover = false,
}: {
  className?: string;
  children: ReactNode;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "card p-6",
        hover && "transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ── Badge ──────────────────────────────────────── */

const BADGE_TONES = {
  accent: "bg-accent/15 text-accent border-accent/30",
  violet: "bg-violet/15 text-violet border-violet/30",
  mint: "bg-mint/15 text-mint border-mint/30",
  sky: "bg-sky/15 text-sky border-sky/30",
  neutral: "bg-surface3 text-muted border-border",
} as const;

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: keyof typeof BADGE_TONES;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase",
        BADGE_TONES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/* ── Section (en-tête de section réutilisable) ──── */

export function SectionHeader({
  kicker,
  title,
  description,
  className,
}: {
  kicker: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
        {kicker}
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-3 text-base leading-relaxed text-muted">{description}</p>}
    </div>
  );
}

/* ── Stat (carte métrique) ──────────────────────── */

export function Stat({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-faint">{label}</p>
        {icon && <span className="text-accent">{icon}</span>}
      </div>
      <p className="mt-2 font-display text-2xl font-bold text-text tabular-nums">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

/* ── Champs de formulaire ───────────────────────── */

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text">{label}</label>
      {children}
      {hint && <p className="text-xs text-faint">{hint}</p>}
    </div>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-xl border border-border bg-surface2 px-3.5 py-2.5 text-sm text-text placeholder:text-faint transition-colors focus:border-accent/60 focus:outline-none",
        props.className
      )}
    />
  );
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "w-full appearance-none rounded-xl border border-border bg-surface2 px-3.5 py-2.5 text-sm text-text transition-colors focus:border-accent/60 focus:outline-none cursor-pointer",
        props.className
      )}
    />
  );
}

export function SliderField({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-text">{label}</label>
        <span className="rounded-md bg-surface3 px-2 py-0.5 font-mono text-xs text-accent tabular-nums">
          {format ? format(value) : value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{ ["--fill" as string]: `${fill}%` }}
        aria-label={label}
      />
    </div>
  );
}

/* ── Option card (radio / checkbox visuel) ──────── */

export function OptionCard({
  selected,
  onClick,
  title,
  desc,
  icon,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  desc?: string;
  icon?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-all duration-150 cursor-pointer",
        selected
          ? "border-accent/60 bg-accent/10"
          : "border-border bg-surface2 hover:border-border-strong"
      )}
    >
      {icon && <span className={cn("mt-0.5 shrink-0", selected ? "text-accent" : "text-faint")}>{icon}</span>}
      <span>
        <span className={cn("block text-sm font-semibold", selected ? "text-text" : "text-text/90")}>
          {title}
        </span>
        {desc && <span className="mt-0.5 block text-xs leading-relaxed text-muted">{desc}</span>}
      </span>
    </button>
  );
}
