"use server";

import { db } from "@/db";
import { caseStudies } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function saveCaseStudy(data: any) {
  try {
    const { id, ...insertData } = data;
    
    if (id) {
      await db.update(caseStudies)
        .set({ ...insertData, updatedAt: new Date() })
        .where(eq(caseStudies.id, id));
    } else {
      await db.insert(caseStudies).values(insertData);
    }
    
    revalidatePath("/admin/case-studies");
    revalidatePath("/case-studies");
    
    return { success: true };
  } catch (error) {
    console.error("Error saving case study:", error);
    return { success: false, error: "Failed to save case study." };
  }
}

export async function deleteCaseStudy(id: number) {
  try {
    await db.delete(caseStudies).where(eq(caseStudies.id, id));
    revalidatePath("/admin/case-studies");
    revalidatePath("/case-studies");
    return { success: true };
  } catch (error) {
    console.error("Error deleting case study:", error);
    return { success: false, error: "Failed to delete case study." };
  }
}
