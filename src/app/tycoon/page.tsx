import { PageHeader } from "@/components/layout/PageHeader";
import { TycoonCalculator } from "@/components/tools/TycoonCalculator";

export const metadata = {
  title: "Calculateur Tycoon",
  description:
    "Simule l'économie de ton tycoon Roblox : prix, revenus, croissance des coûts et temps nécessaire pour chaque palier.",
};

export default function TycoonPage() {
  return (
    <>
      <PageHeader
        kicker="Outil · Économie"
        title="Calculateur d'économie tycoon"
        description="Simule la courbe de progression de ton tycoon : prix des paliers, revenus par seconde, croissance des coûts et temps nécessaire. Ajuste les paramètres et exporte la simulation."
        badges={["100 % local", "Temps réel", "Export CSV / MD / JSON"]}
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <TycoonCalculator />
      </div>
    </>
  );
}
