# CreatorForge

**La boîte à outils gratuite des créateurs de jeux Roblox.**

CreatorForge est une plateforme web professionnelle qui fournit aux développeurs
Roblox des outils concrets pour accélérer la création de leurs jeux :
calculateur d'économie, générateur de concepts, bibliothèque de prompts,
plan de développement et ressources techniques.

> **v1.0** — 100 % gratuit · Sans inscription · 100 % local (aucune donnée ne quitte le navigateur)

---

## Fonctionnalités

| Outil | Description |
| --- | --- |
| **Calculateur Tycoon** | Simule l'économie : prix, revenus/sec, croissance des coûts, temps par palier et temps réel estimé. Export CSV / Markdown / JSON. |
| **Générateur de concepts** | Génère un concept de jeu complet : pitch, boucle de jeu, mécaniques, progression, objectifs, monétisation éthique. |
| **Bibliothèque de prompts** | 16 prompts spécialisés Roblox Studio (Lua, architecture, UI, performance, débugage) avec recherche et filtres. |
| **Plan de développement** | Roadmap par phases, arborescence de projet, checklist de lancement et risques. |
| **Ressources** | Snippets Lua originaux, config tycoon exemple, arborescence type, checklist qualité. |
| **Limites IA** | Page de transparence sur ce que l'IA fait bien et ses limites connues. |

---

## Prérequis

- **Node.js** 18+ (LTS recommandé)
- **npm** 9+

---

## Installation locale

```bash
# 1. Cloner le dépôt
git clone <URL_DU_DEPOT>
cd creatorforge

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

### Scripts disponibles

```bash
npm run dev      # Serveur de développement (port 3000)
npm run build    # Build de production
npm run start    # Servir le build de production
npm run lint     # Linter le code
npm run typecheck # Vérification TypeScript
```

---

## Déploiement

Avant le déploiement, exécutez `npm run typecheck`, `npm run lint` et `npm run build`. La méthode dépend de la version Next.js et des routes serveur réellement utilisées.

- **Vercel** : voie généralement simple pour une application Next.js ; importer le dépôt et vérifier le build avant de publier.
- **Cloudflare** : la configuration recommandée pour les applications Next.js complètes évolue. Consultez le guide officiel actuel Cloudflare Workers/Next.js plutôt que de copier un ancien guide `@cloudflare/next-on-pages`. Un export statique n'est approprié que si toutes les pages et fonctions sont compatibles avec le statique.

Ne configurez pas de variable secrète dans le code ou dans Git. Utilisez `.env.example` comme liste indicative et renseignez les valeurs réelles uniquement dans votre environnement local non commité ou dans les secrets du fournisseur d'hébergement.

## Architecture

```
src/
├── app/                    # Pages Next.js (App Router)
│   ├── tycoon/             # Calculateur d'économie
│   ├── concepts/           # Générateur de concepts
│   ├── prompts/            # Bibliothèque de prompts
│   ├── dev-plan/           # Plan de développement
│   ├── resources/          # Ressources
│   ├── ai-limits/          # Limites IA
│   └── api/health/         # Health check
├── components/
│   ├── layout/             # Navbar, Footer, PageHeader
│   ├── tools/              # Composants des outils
│   └── ui/                 # Primitives UI réutilisables
├── lib/                    # Logique métier (100 % client)
│   ├── tycoon.ts           # Moteur de calcul tycoon
│   ├── concepts.ts         # Générateur de concepts
│   ├── prompts.ts          # Données des prompts
│   ├── devplan.ts          # Générateur de plan
│   ├── export.ts           # Copie / téléchargement
│   └── format.ts           # Formateurs
└── db/                     # Drizzle ORM (futur)
```

### Principes

- **100 % client** : tous les outils fonctionnent localement, sans serveur.
- **Composants réutilisables** : UI modulaire (`Button`, `Card`, `Badge`, `Field`…).
- **Sans secrets** : aucune clé API n'est intégrée au code.
- **Prêt pour l'avenir** : architecture modulaire permettant d'ajouter
  authentification, base de données et fonctionnalités premium.

---

## Évolutions prévues

Le projet ne possède actuellement **pas** de comptes, de sauvegarde cloud, d'API IA distante, d'abonnement ni de paiement actif. La page `/pricing` présente les pistes premium comme des hypothèses, sans simuler d'achat.

- [ ] Valider l'utilité auprès de vrais créateurs.
- [ ] Déployer et automatiser les vérifications du build.
- [ ] Authentification et sauvegarde cloud avec règles d'accès testées.
- [ ] API IA sécurisée côté serveur, avec quotas et contrôle des coûts.
- [ ] Fonctions premium développées avant toute vente.
- [ ] Paiements réels et webhooks seulement après vérification juridique/commerciale et implication du représentant légal.

Voir `ROADMAP-PRODUCTION.md` et `PLAN-LANCEMENT-GRATUIT.md` pour les étapes détaillées.

---

## Licence

MIT — voir [LICENSE](LICENSE).
