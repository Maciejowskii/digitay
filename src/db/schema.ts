import { 
  pgTable, 
  serial, 
  varchar, 
  text, 
  integer, 
  boolean,
  timestamp,
  json,
  primaryKey
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import type { AdapterAccountType } from "next-auth/adapters";

// --- Helpers ---
const timestamps = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
};

// --- Tables ---

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  basePrice: varchar("base_price", { length: 100 }), // Using varchar for flexibility e.g. "od 2000 PLN"
  isPublished: boolean("is_published").default(false).notNull(),
  iconName: varchar("icon_name", { length: 100 }), // To match lucide-react icon names
  ...timestamps,
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  authorName: varchar("author_name", { length: 255 }).notNull(),
  authorRole: varchar("author_role", { length: 255 }),
  company: varchar("company", { length: 255 }),
  content: text("content").notNull(),
  avatarUrl: text("avatar_url"),
  rating: integer("rating").default(5),
  isFeatured: boolean("is_featured").default(false).notNull(),
  ...timestamps,
});

export const caseStudies = pgTable("case_studies", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  clientName: varchar("client_name", { length: 255 }).notNull(),
  clientLogo: text("client_logo"), // Path to client logo image
  clientUrl: text("client_url"), // Client website URL
  brandColor: varchar("brand_color", { length: 50 }), // Client brand color hex
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"), // Short description for cards/listings
  category: varchar("category", { length: 100 }), // Web Development, Design, Marketing, Mobile
  challenge: text("challenge"),
  solution: text("solution"),
  results: json("results"), // Allow storing structured results like { "Growth": "+150%", "Time": "3 months" }
  coverImage: text("cover_image"),
  tags: json("tags"), // Storing array of strings e.g. ["SEO", "Web Design"]
  isPublished: boolean("is_published").default(false).notNull(),
  ...timestamps,
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(), // Long-form content (markdown or rich text HTML)
  coverImage: text("cover_image"),
  author: varchar("author", { length: 255 }),
  publishedAt: timestamp("published_at"), // Can be null if it's a draft mapped to isPublished theoretically
  ...timestamps,
});

export const directories = pgTable("directories", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  name: varchar("name", { length: 255 }),
  isVerified: boolean("is_verified").default(false).notNull(),
  notes: text("notes"),
  ...timestamps,
});

// --- Auth.js Tables ---

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  password: text("password"), // Added for Credentials Provider
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ]
);
