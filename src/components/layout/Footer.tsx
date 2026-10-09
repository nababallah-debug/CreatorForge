import Link from "next/link";
import { Anvil, Rocket } from "lucide-react";

const TOOL_LINKS = [
  { href: "/tycoon", label: "Calculateur Tycoon" },
  { href: "/concepts", label: "Générateur de concepts" },
  { href: "/prompts", label: "Bibliothèque de prompts" },
  { href: "/dev-plan", label: "Plan de développement" },
];

const META_LINKS = [
  { href: "/resources", label: "Ressources" },
  { href: "/ai-limits", label: "Limites de l'IA" },
  { href: "/pricing", label: "Tarifs et feuille de route" },
  { href: "https://create.roblox.com/docs", label: "Docs Roblox (externe)" },
  { href: "https://devforum.roblox.com", label: "DevForum (externe)" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-b from-accent2 to-ember">
                <Anvil className="h-4.5 w-4.5 text-[#1a0e04]" strokeWidth={2.4} />
              </span>
              <span className="font-display text-base font-bold text-text">
                Creator<span className="text-gradient">Forge</span>
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              La boîte à outils gratuite des créateurs Roblox. Les outils actuels fonctionnent localement, sans inscription ni clé API.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-faint">Outils</p>
            <ul className="mt-3 space-y-2">
              {TOOL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-faint">Ressources</p>
            <ul className="mt-3 space-y-2">
              {META_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-faint">
            © {new Date().getFullYear()} CreatorForge — Fabriqué pour la communauté Roblox.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-faint">
            <Rocket className="h-3.5 w-3.5" />
            Propulsé par Next.js · Hébergeable gratuitement
          </p>
        </div>
      </div>
    </footer>
  );
}
