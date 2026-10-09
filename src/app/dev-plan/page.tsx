import { PageHeader } from "@/components/layout/PageHeader";
import { DevPlanGenerator } from "@/components/tools/DevPlanGenerator";

export const metadata = {
  title: "Plan de développement",
  description:
    "Génère un roadmap par phases et l'arborescence de projet adaptée à ton équipe et ton scope.",
};

export default function DevPlanPage() {
  return (
    <>
      <PageHeader
        kicker="Outil · Organisation"
        title="Plan de développement & arborescence"
        description="Génère un roadmap réaliste par phases, l'arborescence de projet Roblox, la checklist de lancement et les risques à surveiller."
        badges={["Roadmap", "Arborescence", "Checklist", "Export Markdown"]}
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <DevPlanGenerator />
      </div>
    </>
  );
}
