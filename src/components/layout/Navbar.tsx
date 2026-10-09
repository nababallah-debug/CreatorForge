"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Anvil, Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { href: "/tycoon", label: "Calculateur Tycoon" },
  { href: "/concepts", label: "Générateur de concepts" },
  { href: "/prompts", label: "Bibliothèque de prompts" },
  { href: "/dev-plan", label: "Plan de développement" },
  { href: "/resources", label: "Ressources" },
  { href: "/ai-limits", label: "Limites IA" },
  { href: "/pricing", label: "Tarifs" },
];

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="CreatorForge — Accueil">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-b from-accent2 to-ember shadow-glow transition-transform duration-200 group-hover:scale-105">
        <Anvil className="h-5 w-5 text-[#1a0e04]" strokeWidth={2.4} />
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-text">
        Creator<span className="text-gradient">Forge</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-bg/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === l.href
                  ? "bg-surface3 text-text"
                  : "text-muted hover:bg-surface2 hover:text-text"
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/concepts"
            className="ml-2 inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-accent2 to-accent px-4 py-2 text-sm font-semibold text-[#1a0e04] transition-all hover:brightness-110 glow-accent"
          >
            <Sparkles className="h-4 w-4" />
            Générer une idée
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-bg/95 backdrop-blur-xl lg:hidden">
          <div className="space-y-1 px-4 py-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-lg px-3 py-2.5 text-sm font-medium",
                  pathname === l.href
                    ? "bg-surface3 text-accent"
                    : "text-muted hover:bg-surface2 hover:text-text"
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
