// ── CreatorForge — Schéma de base de données ─────────────────────────────
//
// Ce fichier est un point d'entrée pour Drizzle ORM.
// En V1, l'application est 100 % client-side : aucune table n'est utilisée.
//
// Les tables ci-dessous sont COMMENTÉES et prêtes à être décommentées
// lorsque vous ajouterez l'authentification et les fonctionnalités premium.
//
// Pour appliquer le schéma :
//   npx drizzle-kit push
//
// ── Exemple de tables futures ──────────────────────────────────────────────
//
// import { pgTable, serial, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";
//
// export const users = pgTable("users", {
//   id: serial("id").primaryKey(),
//   clerkId: text("clerk_id").unique().notNull(),
//   email: text("email").unique().notNull(),
//   username: text("username").unique(),
//   createdAt: timestamp("created_at").defaultNow(),
// });
//
// export const savedProjects = pgTable("saved_projects", {
//   id: serial("id").primaryKey(),
//   userId: integer("user_id").references(() => users.id).notNull(),
//   name: text("name").notNull(),
//   type: text("type").notNull(), // 'tycoon' | 'concept' | 'devplan'
//   data: text("data").notNull(), // JSON
//   isPublic: boolean("is_public").default(false),
//   createdAt: timestamp("created_at").defaultNow(),
// });
//
// export const premiumSubscriptions = pgTable("premium_subscriptions", {
//   id: serial("id").primaryKey(),
//   userId: integer("user_id").references(() => users.id).notNull(),
//   stripeCustomerId: text("stripe_customer_id").unique(),
//   stripeSubscriptionId: text("stripe_subscription_id").unique(),
//   plan: text("plan").notNull(), // 'pro' | 'team'
//   status: text("status").notNull(), // 'active' | 'canceled' | 'past_due'
//   currentPeriodEnd: timestamp("current_period_end"),
//   createdAt: timestamp("created_at").defaultNow(),
// });

export {};
