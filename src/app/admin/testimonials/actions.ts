"use server";

import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function saveTestimonial(data: any) {
  try {
    const { id, ...insertData } = data;
    
    if (id) {
      await db.update(testimonials)
        .set({ ...insertData, updatedAt: new Date() })
        .where(eq(testimonials.id, id));
    } else {
      await db.insert(testimonials).values(insertData);
    }
    
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Error saving testimonial:", error);
    return { success: false, error: "Failed to save testimonial." };
  }
}

export async function deleteTestimonial(id: number) {
  try {
    await db.delete(testimonials).where(eq(testimonials.id, id));
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return { success: false, error: "Failed to delete testimonial." };
  }
}
