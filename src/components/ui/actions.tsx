"use client";

import { useState } from "react";
import { Check, Copy, Download, FileJson, FileText } from "lucide-react";
import { cn } from "@/lib/cn";
import { copyToClipboard, downloadFile } from "@/lib/export";

/* ── Bouton copier avec feedback ────────────────── */

export function CopyButton({
  text,
  label = "Copier",
  className,
  variant = "outline",
}: {
  text: string;
  label?: string;
  className?: string;
  variant?: "outline" | "ghost" | "icon";
}) {
  const [copied, setCopied] = useState(false);

  const handle = async () => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handle}
        aria-label={copied ? "Copié" : `Copier ${label}`}
        title={copied ? "Copié !" : "Copier"}
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-all hover:text-accent hover:border-accent/50 cursor-pointer",
          copied && "text-mint border-mint/50",
          className
        )}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    );
  }

  return (
    <button
      onClick={handle}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-all cursor-pointer",
        variant === "ghost"
          ? "border-transparent text-muted hover:text-text hover:bg-surface2"
          : "border-border text-muted hover:text-text hover:border-accent/50",
        copied && "text-mint border-mint/50",
        className
      )}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copié !" : label}
    </button>
  );
}

/* ── Menu d'export (txt / md / json / csv) ──────── */

export interface ExportOption {
  id: string;
  label: string;
  filename: string;
  content: string;
  mime?: string;
}

export function ExportButtons({
  options,
  className,
}: {
  options: ExportOption[];
  className?: string;
}) {
  const [done, setDone] = useState<string | null>(null);

  const handle = (opt: ExportOption) => {
    downloadFile(opt.filename, opt.content, opt.mime ?? "text/plain");
    setDone(opt.id);
    setTimeout(() => setDone(null), 1800);
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => handle(opt)}
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface2 px-3.5 py-2 text-sm font-medium text-muted transition-all hover:text-text hover:border-accent/50 cursor-pointer"
        >
          {done === opt.id ? (
            <Check className="h-4 w-4 text-mint" />
          ) : opt.id === "json" || opt.id === "csv" ? (
            <FileJson className="h-4 w-4" />
          ) : (
            <FileText className="h-4 w-4" />
          )}
          {done === opt.id ? "Téléchargé !" : opt.label}
          <Download className="h-3.5 w-3.5 opacity-60" />
        </button>
      ))}
    </div>
  );
}
