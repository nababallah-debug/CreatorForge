import { PageHeader } from "@/components/layout/PageHeader";
import { PromptLibrary } from "@/components/tools/PromptLibrary";

export const metadata = {
  title: "Bibliothèque de prompts",
  description:
    "16 prompts spécialisés pour Roblox Studio : Lua, architecture, UI, performance et débugage.",
};

export default function PromptsPage() {
  return (
    <>
      <PageHeader
        kicker="Outil · Productivité"
        title="Bibliothèque de prompts Roblox Studio"
        description="Des prompts prêts à l'emploi pour coder plus vite : scripting Lua, architecture, UI, performance et débugage. Copiez-collez dans votre assistant IA ou utilisez-les comme cahier des charges."
        badges={["16 prompts", "7 catégories", "Recherche instantanée"]}
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <PromptLibrary />
      </div>
    </>
  );
}
