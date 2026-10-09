import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CreatorForge — Outils gratuits pour créateurs de jeux Roblox",
    template: "%s | CreatorForge",
  },
  description:
    "Outils gratuits pour créateurs Roblox : calculateur tycoon, générateur de concepts, bibliothèque de prompts et plan de développement.",
  keywords: ["Roblox", "créateur de jeux", "tycoon", "Roblox Studio", "Lua", "générateur"],
  authors: [{ name: "CreatorForge" }],
  openGraph: {
    type: "website",
    title: "CreatorForge — Outils gratuits pour créateurs Roblox",
    description:
      "Forgez votre prochain jeu Roblox : calculateur tycoon, concepts, prompts, plan de développement.",
    locale: "fr_FR",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-bg font-body text-text antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#1a0e04]"
        >
          Aller au contenu
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
