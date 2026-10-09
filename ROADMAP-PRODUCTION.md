# CreatorForge — feuille de route technique (version complète)

Cette feuille de route est un plan, pas la déclaration que les fonctionnalités sont déjà en production. À la date de cette version, CreatorForge reste une application d'outils locaux : pas de compte, de sauvegarde cloud, d'API IA distante, d'abonnement ni de paiement actif.

## Principes

- Budget de départ : 0 €. Rester sur des quotas gratuits, surveiller les limites et ne jamais activer un service payant sans accord explicite du responsable légal.
- Ne jamais inclure de secret dans le navigateur, dans Git ou dans le ZIP partagé.
- Ne pas vendre de fonctionnalité qui n'est pas développée et testée.
- Collecter le minimum de données et documenter suppression, confidentialité et conservation avant l'ouverture publique.
- Comme le créateur est mineur, faire valider par un parent/représentant légal les comptes fournisseurs, contrats, encaissements, obligations fiscales et mentions légales avant toute vente.

## Phase 0 — validation et lancement gratuit (maintenant)

1. Publier la version gratuite et vérifier les parcours desktop/mobile.
2. Tester les exports et les calculs avec des cas de référence.
3. Utiliser `/pricing` comme page transparente : le tarif Pro est une hypothèse, aucun paiement n'est activé.
4. Recueillir des retours sans formulaire de collecte serveur pour le moment. Le bouton de la page Tarifs copie un modèle de retour ; il ne transmet aucune donnée.
5. Mesurer manuellement : nombre de testeurs, outil utilisé, retour positif/négatif, demandes répétées. Ne pas installer d'analytics intrusif au démarrage.

Critère pour continuer : au moins 5 testeurs externes et 3 retours exploitables, avec au moins une fonctionnalité demandée plusieurs fois. Ce sont des objectifs internes, pas des garanties de succès.

## Phase 1 — déploiement reproductible

1. Vérifier `npm install`, `npm run typecheck`, `npm run lint` et `npm run build` en local/CI.
2. Choisir une plateforme compatible avec la version Next.js et les routes serveur réellement utilisées. Ne pas suivre l'ancien guide `@cloudflare/next-on-pages` sans validation : consulter les guides actuels Cloudflare Workers/Next.js ou utiliser une plateforme Next.js gérée.
3. Configurer les variables d'environnement uniquement dans le tableau de bord de l'hébergeur.
4. Tester le build de prévisualisation, les routes et le comportement après redémarrage.
5. Garder le dépôt et l'hébergement gratuits tant que les quotas conviennent ; le plan gratuit Supabase peut mettre en pause les projets inactifs et n'inclut pas toutes les fonctions de production.

## Phase 2 — comptes et sauvegarde cloud

Option recommandée à évaluer : Supabase Auth + PostgreSQL, avec RLS (Row Level Security).

1. Ajouter `@supabase/supabase-js` et un client navigateur utilisant uniquement l'URL et la clé publique/anon.
2. Ajouter un client serveur séparé si nécessaire ; ne jamais exposer une clé `service_role`.
3. Tables proposées : `profiles (id = auth.users.id, display_name, created_at)`, `projects (id, user_id, title, tool, data jsonb, created_at, updated_at)`.
4. Activer RLS sur chaque table. Politique obligatoire : un utilisateur ne peut lire, créer, modifier ou supprimer que les lignes dont `user_id = auth.uid()`. Vérifier les policies par tests avec deux comptes.
5. Ajouter validation de schéma, limites de taille, gestion d'erreurs et bouton de suppression/export des données.
6. Ne pas stocker de clés API, mots de passe, prompts privés sensibles ou données personnelles inutiles dans les projets.

## Phase 3 — IA distante sécurisée

1. Comparer les fournisseurs en fonction de l'accès autorisé, des conditions d'âge, des quotas gratuits, du prix par token et des conditions d'utilisation commerciale. Les tarifs gratuits peuvent changer.
2. Créer une route serveur (`/api/ai/generate`) ; la clé du fournisseur reste uniquement dans une variable secrète serveur.
3. Valider les entrées avec un schéma, limiter la longueur du prompt et la taille de réponse.
4. Authentifier l'utilisateur, limiter les requêtes par utilisateur/IP et appliquer un quota journalier côté serveur. Ne pas faire confiance à un compteur stocké dans le navigateur.
5. Gérer les erreurs, délais, quotas et coûts sans renvoyer de secrets ni journaux contenant des données privées.
6. Ajouter une mention claire indiquant que les sorties IA peuvent être incorrectes et doivent être testées.
7. Ne pas annoncer une « IA gratuite illimitée » : une API externe peut coûter de l'argent même si l'hébergement est gratuit.

## Phase 4 — fonctionnalités premium sans paiement actif

1. Définir une entité `entitlements` ou un champ d'accès premium côté serveur, sans permettre au client de s'accorder lui-même les droits.
2. Développer et tester d'abord les fonctions qui justifieraient l'abonnement : sauvegardes, historique, simulation avancée, quotas IA.
3. Prévoir une page tarifs qui décrit seulement les fonctions réellement livrées. La page actuelle indique explicitement que le prix et les fonctions Pro sont à valider.
4. Ajouter une page d'état de service et une procédure de support/suppression de compte avant l'ouverture payante.

## Phase 5 — paiements (seulement avec un adulte responsable)

1. Ne pas intégrer de faux bouton d'achat ni simuler un paiement.
2. Avant toute vente, faire vérifier par le parent/représentant légal l'éligibilité du compte de paiement, la structure juridique/fiscale et les obligations de consommation en France.
3. Si Stripe est choisi, utiliser Checkout hébergé ou une solution équivalente, avec prix configurés côté fournisseur. Ne jamais accepter un montant envoyé librement par le navigateur.
4. Créer des routes serveur pour créer une session Checkout et un endpoint webhook. Vérifier la signature du webhook.
5. Les droits premium sont modifiés uniquement après un événement webhook validé côté serveur (paiement réussi/abonnement actif) et retirés lors de l'annulation/expiration. La page de retour Checkout ne prouve pas à elle seule qu'un paiement a réussi.
6. Tester les scénarios : paiement réussi, paiement refusé, annulation, renouvellement, remboursement, webhook reçu deux fois, abonnement expiré.
7. Publier prix TTC, périodicité, conditions, politique de confidentialité, mentions légales, modalités de résiliation et contact support avant le lancement commercial.

## Architecture cible

- Interface : Next.js App Router + TypeScript + Tailwind, composants existants conservés.
- Auth et données : Supabase Auth/Postgres avec RLS, ou alternative équivalente validée.
- IA : route serveur uniquement, clé en variable d'environnement, quotas serveur.
- Paiements : fournisseur de paiement hébergé, webhooks signés et droits premium calculés côté serveur.
- Déploiement : CI qui exécute typecheck, lint et build ; secrets définis sur la plateforme, jamais dans le dépôt.

## Définition de « prêt à vendre »

- Build et tests réussis.
- Tests de sécurité RLS avec deux utilisateurs distincts.
- Clés absentes du bundle client et de l'historique Git.
- Quotas et coût maximal de l'IA connus et testés.
- Webhooks signés et idempotents, annulation/résiliation testée.
- Conditions, confidentialité, support et suppression des données opérationnels.
- Accord et implication du représentant légal pour les aspects commerciaux liés à la minorité.
