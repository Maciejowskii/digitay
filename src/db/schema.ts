import { 
  pgTable, 
  serial, 
  varchar, 
  text, 
  integer, 
  boolean,
  timestamp,
  json
} from "drizzle-orm/pg-core";

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
  title: varchar("title", { length: 255 }).notNull(),
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
