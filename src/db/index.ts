import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

// Create a postgres connection client
const client = postgres(connectionString, { prepare: false });

// Init Drizzle ORM
export const db = drizzle(client, { schema });
