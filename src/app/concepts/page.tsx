import { PageHeader } from "@/components/layout/PageHeader";
import { ConceptGenerator } from "@/components/tools/ConceptGenerator";

export const metadata = {
  title: "Générateur de concepts",
  description:
    "Génère un concept de jeu Roblox complet : genre, mécaniques, progression, objectifs et monétisation éthique.",
};

export default function ConceptsPage() {
  return (
    <>
      <PageHeader
        kicker="Outil · Créativité"
        title="Générateur de concepts de jeux"
        description="Combinez genres, thèmes et mécaniques pour générer un concept de jeu Roblox complet : pitch, boucle de jeu, progression, objectifs et monétisation éthique."
        badges={["100 % local", "Procédural", "Export Markdown"]}
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <ConceptGenerator />
      </div>
    </>
  );
}
