"use server";

import { db } from "@/db";
import { services } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// FETCH ALL SERVICES
export async function getServices() {
  try {
    const allServices = await db.select().from(services).orderBy(desc(services.createdAt));
    return allServices;
  } catch (error) {
    console.error("Failed to fetch services:", error);
    throw new Error("Nie udało się pobrać usług.");
  }
}

// FETCH SINGLE SERVICE
export async function getServiceById(id: number) {
  try {
    const service = await db.select().from(services).where(eq(services.id, id)).limit(1);
    return service[0] || null;
  } catch (error) {
    console.error(`Failed to fetch service with id ${id}:`, error);
    throw new Error("Nie udało się pobrać usługi.");
  }
}

// CREATE SERVICE
export async function createService(data: Omit<typeof services.$inferInsert, "id" | "createdAt" | "updatedAt">) {
  try {
    const [newService] = await db.insert(services).values({
        ...data,
    }).returning();
    
    revalidatePath("/admin/services");
    revalidatePath("/uslugi");
    return newService;
  } catch (error) {
    console.error("Failed to create service:", error);
    throw new Error("Nie udało się utworzyć usługi. Sprawdź czy slug jest unikalny.");
  }
}

// UPDATE SERVICE
export async function updateService(id: number, data: Partial<typeof services.$inferInsert>) {
  try {
    const [updatedService] = await db
      .update(services)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(services.id, id))
      .returning();
      
    revalidatePath("/admin/services");
    revalidatePath("/uslugi");
    revalidatePath(`/uslugi/${updatedService.slug}`);
    return updatedService;
  } catch (error) {
    console.error(`Failed to update service ${id}:`, error);
    throw new Error("Nie udało się zaktualizować usługi.");
  }
}

// DELETE SERVICE
export async function deleteService(id: number) {
  try {
    await db.delete(services).where(eq(services.id, id));
    
    revalidatePath("/admin/services");
    revalidatePath("/uslugi");
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete service ${id}:`, error);
    throw new Error("Nie udało się usunąć usługi.");
  }
}
