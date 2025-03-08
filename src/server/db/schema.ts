import { sql } from "drizzle-orm";
import { index, int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

import { integer } from "drizzle-orm/sqlite-core";
/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator(
  (name) => `live-stream-awards_${name}`,
);

export const posts = createTable(
  "post",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name", { length: 256 }),
    createdById: text("created_by", { length: 255 })
      .notNull()
      .references(() => user.id),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updatedAt", { mode: "timestamp" }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    createdByIdIdx: index("created_by_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const roles = ["admin", "user", "streamer"] as const;

export const user = createTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),

  role: text("role", { enum: roles }).default("user").notNull(),
});

export const session = createTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = createTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = createTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});

export const categories = [
  "Real-Life",
  "Gaming",
  "Music",
  "Entertainment",
  "Sport",
  "Business",
  "Comedy",
  "Newcomer",
] as const;
export const countries = ["Deutschland", "Österreich", "Schweiz"] as const;
export const streamTimes = ["Täglich", "Am Wochenende", "Wöchentlich"] as const;
export const hasAgency = ["Ja", "Nein"] as const;

export const streamer = createTable("streamer", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  name: text("name", { length: 256 }),
  email: text("email", { length: 256 }).notNull(),
  category: text("category", { enum: categories }).notNull(),
  tiktokUrl: text("tiktok_url", { length: 256 }),
  headerImageUrl: text("header_image_url", { length: 256 }),
  bio: text("bio", { length: 256 }),
  country: text("country", { enum: countries }).notNull(),
  followers: text("followers", { length: 256 }).notNull(),
  streamTimes: text("stream_times", { enum: streamTimes }).notNull(),
  hasAgency: text("has_agency", { enum: hasAgency }).notNull(),

  votes: text("votes", { length: 256 }).notNull(),

  isVerified: integer("is_verified", { mode: "boolean" })
    .default(false)
    .notNull(),

  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
});
