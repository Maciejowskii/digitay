"use server";

import { db } from "@/db";
import { directories } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// FETCH ALL DIRECTORIES
export async function getDirectories() {
  try {
    const data = await db.select().from(directories).orderBy(desc(directories.createdAt));
    return data;
  } catch (error) {
    console.error("Failed to fetch directories:", error);
    return [];
  }
}

// ADD DIRECTORY
export async function addDirectory(data: { url: string; name?: string; notes?: string }) {
  try {
    const [newDir] = await db.insert(directories).values({
      url: data.url,
      name: data.name,
      notes: data.notes,
    }).returning();
    
    revalidatePath("/katalogi");
    return { success: true, data: newDir };
  } catch (error) {
    console.error("Failed to add directory:", error);
    return { success: false, error: "Nie udało się dodać linku." };
  }
}

// TOGGLE VERIFICATION
export async function toggleVerification(id: number, currentStatus: boolean) {
  try {
    await db
      .update(directories)
      .set({ isVerified: !currentStatus, updatedAt: new Date() })
      .where(eq(directories.id, id));
      
    revalidatePath("/katalogi");
    return { success: true };
  } catch (error) {
    console.error(`Failed to toggle verification for ${id}:`, error);
    return { success: false, error: "Nie udało się zmienić statusu." };
  }
}

// DELETE DIRECTORY
export async function deleteDirectory(id: number) {
  try {
    await db.delete(directories).where(eq(directories.id, id));
    
    revalidatePath("/katalogi");
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete directory ${id}:`, error);
    return { success: false, error: "Nie udało się usunąć linku." };
  }
}
