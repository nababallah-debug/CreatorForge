import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Clock3, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { Badge, Card } from "@/components/ui/ui";
import { CopyButton } from "@/components/ui/actions";

export const metadata: Metadata = {
  title: "Tarifs transparents",
  description: "Découvrez les outils gratuits de CreatorForge et les fonctionnalités premium envisagées. Aucun paiement n'est activé pour le moment.",
};

const feedbackMessage = `Bonjour CreatorForge !

Je teste les outils et voici mon retour :

Outil testé :
Ce qui m'a aidé :
Ce qui m'a bloqué ou manqué :
La fonctionnalité pour laquelle je paierais éventuellement :
Prix qui me semblerait raisonnable :

Merci !`;

const freeFeatures = [
  "Calculateur d'économie de tycoon",
  "Générateur de concepts de jeu",
  "Bibliothèque de prompts Roblox Studio",
  "Plan de développement et ressources",
  "Exports disponibles dans les outils",
];
const plannedFeatures = [
  "Projets sauvegardés dans le cloud",
  "Historique et versions de projets",
  "Simulations d'économie avancées",
  "Quota de génération IA clairement affiché",
  "Exports et modèles de projet supplémentaires",
];

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Badge tone="accent">Tarifs transparents</Badge>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
            Des outils utiles d'abord. <span className="text-gradient">Le premium ensuite.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            CreatorForge est en phase de validation. Les outils existants restent gratuits ; les prix et fonctionnalités premium ci-dessous sont des hypothèses, pas une offre de vente.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 text-sm text-text">
            <ShieldCheck className="h-5 w-5 text-accent" /> Aucun paiement, abonnement ou collecte de carte bancaire n'est activé sur cette page.
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
        <section className="grid gap-5 lg:grid-cols-2">
          <Card className="relative h-full border-mint/30">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-mint">Disponible aujourd'hui</p>
                <h2 className="mt-2 font-display text-2xl font-bold">Free</h2>
              </div>
              <div className="text-right"><p className="font-display text-4xl font-bold">0 €</p><p className="text-xs text-muted">pour toujours, pour la version actuelle</p></div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">Tous les outils actuellement présents dans le projet, sans inscription et sans clé API.</p>
            <ul className="mt-6 space-y-3">
              {freeFeatures.map((feature) => <li key={feature} className="flex gap-2 text-sm text-text"><Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" />{feature}</li>)}
            </ul>
            <Link href="/tycoon" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-accent2 to-accent px-4 py-2.5 text-sm font-semibold text-[#1a0e04] transition hover:brightness-110">Tester les outils <ArrowRight className="h-4 w-4" /></Link>
          </Card>

          <Card className="relative h-full border-accent/30 bg-gradient-to-b from-accent/5 to-transparent">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-accent">À valider avec les utilisateurs</p>
                <h2 className="mt-2 font-display text-2xl font-bold">Creator Pro</h2>
              </div>
              <div className="text-right"><p className="font-display text-4xl font-bold">4,99 €</p><p className="text-xs text-muted">/mois envisagés, non commercialisés</p></div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">Une piste de prix à tester uniquement si les fonctions correspondantes sont développées et si leur coût est maîtrisé.</p>
            <ul className="mt-6 space-y-3">
              {plannedFeatures.map((feature) => <li key={feature} className="flex gap-2 text-sm text-text"><Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{feature}</li>)}
            </ul>
            <div className="mt-8 rounded-xl border border-border bg-surface2 p-4 text-sm text-muted">
              <strong className="text-text">Pas de bouton « Acheter » :</strong> aucun de ces avantages premium n'est promis comme déjà disponible. Le tarif sera décidé après des retours réels.
            </div>
          </Card>
        </section>

        <section className="grid gap-6 md:grid-cols-[1fr_0.9fr]">
          <div>
            <Badge tone="violet">Aider à décider</Badge>
            <h2 className="mt-3 font-display text-2xl font-bold">Qu'est-ce qui te ferait vraiment gagner du temps ?</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">Les retours servent à choisir quoi construire ensuite. Ce bouton copie un modèle dans ton presse-papiers : il n'envoie rien et ne stocke aucune donnée.</p>
            <div className="mt-5"><CopyButton text={feedbackMessage} label="Copier le modèle de retour" /></div>
            <p className="mt-3 text-xs text-faint">Après copie, tu peux adapter le message et le partager dans la communauté où tu découvres CreatorForge. N'inclus pas de mot de passe, de clé API ni de donnée personnelle.</p>
          </div>
          <Card className="h-full">
            <HeartHandshake className="h-6 w-6 text-accent" />
            <h3 className="mt-3 font-display text-lg font-semibold">Le lancement gratuit</h3>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-muted">
              <li>Publier une démo avec les outils réellement fonctionnels.</li>
              <li>Montrer un cas concret : équilibrer un tycoon en moins de deux minutes.</li>
              <li>Demander à 5 à 10 créateurs de tester le calculateur et le générateur.</li>
              <li>Noter les retours et améliorer l'outil le plus utilisé.</li>
              <li>Ne tester un abonnement que lorsque plusieurs utilisateurs réclament une fonction précise.</li>
            </ol>
          </Card>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-1 h-6 w-6 shrink-0 text-accent" />
            <div>
              <h2 className="font-display text-xl font-bold">Transparence sur le produit</h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">Les générateurs actuellement livrés utilisent une logique locale et des modèles prédéfinis ; ils ne sont pas connectés à un modèle IA distant. Une éventuelle génération IA sera annoncée uniquement après mise en place d'une API sécurisée, de quotas et d'un suivi de coûts. Aucune fonction de compte, de sauvegarde cloud ou de paiement n'est proposée actuellement.</p>
              <Link href="/ai-limits" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent2">Lire les limites des outils <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
