import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    // URL placeholder (will be used once DB is provisioned on VPS)
    // Drizzle Kit requires DB URL for push/studio commands
    url: process.env.DATABASE_URL || "postgres://user:password@localhost:5432/digitay",
  },
  verbose: true,
  strict: true,
});
