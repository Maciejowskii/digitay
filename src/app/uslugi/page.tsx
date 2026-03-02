import { db } from "@/db";
import { services } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import ServicesClientPage from "./ServicesClientPage";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const allServices = await db
    .select()
    .from(services)
    .where(eq(services.isPublished, true))
    .orderBy(desc(services.createdAt));

  return <ServicesClientPage allServices={allServices} />;
}
