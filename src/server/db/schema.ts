import {
  boolean,
  index,
  integer,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `live-stream-awards_${name}`,
);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdById: text("created_by")
      .notNull()
      .references(() => user.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow(),
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
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  role: text("role", { enum: roles }).default("user").notNull(),
});

export const session = createTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
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
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const verification = createTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
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

export const votingCriteria = [
  "Stream-Qualität",
  "Interaktivität & Community Engagement",
  "Kreativität & Originalität",
  "Unterhaltung & Charisma",
  "Konsistenz & Häufigkeit",
  "Professionalität & Auftreten",
  "Unterhaltungswert & Stimmung",
] as const;

export const streamer = createTable(
  "streamer",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    name: varchar("name", { length: 256 }),
    email: varchar("email", { length: 256 }).notNull(),
    category: text("category", { enum: categories }).notNull(),
    tiktokUsername: varchar("tiktok_username", { length: 256 }),
    headerImageUrl: varchar("header_image_url", { length: 256 }),
    bio: text("bio"),
    country: text("country", { enum: countries }).notNull(),
    followers: varchar("followers", { length: 256 }).notNull(),
    streamTimes: text("stream_times", { enum: streamTimes }).notNull(),
    hasAgency: text("has_agency", { enum: hasAgency }).notNull(),

    isVerified: boolean("is_verified").default(false).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (streamer) => ({
    userIdIdx: index("user_id_idx").on(streamer.userId),
    tiktokUsernameIdx: index("tiktok_username_idx").on(streamer.tiktokUsername),
  }),
);

export const contact = createTable("contact", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }),
  message: varchar("message", { length: 256 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const sponsor = createTable("sponsor", {
  id: serial("id").primaryKey(),
  contactName: varchar("contact_name", { length: 256 }),
  companyName: varchar("company_name", { length: 256 }),
  email: varchar("email", { length: 256 }),
  website: varchar("website", { length: 256 }),
  comments: varchar("comments", { length: 256 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reviews = createTable(
  "reviews",
  {
    id: serial("id").primaryKey(),
    streamerId: integer("streamer_id")
      .notNull()
      .references(() => streamer.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    textReview: text("text_review"),
    streamQuality: integer("stream_quality").notNull(),
    communityEngagement: integer("community_engagement").notNull(),
    creativity: integer("creativity").notNull(),
    charisma: integer("charisma").notNull(),
    consistency: integer("consistency").notNull(),
    professionalism: integer("professionalism").notNull(),
    entertainment: integer("entertainment").notNull(),

    isRated: boolean("is_rated").default(false).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (reviews) => ({
    streamerIdIdx: index("reviews_streamer_id_idx").on(reviews.streamerId),
    userIdIdx: index("reviews_user_id_idx").on(reviews.userId),
  }),
);
