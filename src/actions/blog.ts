"use server";

import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// FETCH ALL POSTS
export async function getPosts() {
  try {
    const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
    return posts;
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    throw new Error("Nie udało się pobrać wpisów.");
  }
}

// FETCH SINGLE POST
export async function getPostById(id: number) {
  try {
    const post = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
    return post[0] || null;
  } catch (error) {
    console.error(`Failed to fetch blog post with id ${id}:`, error);
    throw new Error("Nie udało się pobrać wpisu.");
  }
}

// CREATE POST
export async function createPost(data: Omit<typeof blogPosts.$inferInsert, "id" | "createdAt" | "updatedAt">) {
  try {
    const [newPost] = await db.insert(blogPosts).values({
        ...data,
    }).returning();
    
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return newPost;
  } catch (error) {
    console.error("Failed to create blog post:", error);
    throw new Error("Nie udało się utworzyć wpisu. Sprawdź czy slug jest unikalny.");
  }
}

// UPDATE POST
export async function updatePost(id: number, data: Partial<typeof blogPosts.$inferInsert>) {
  try {
    const [updatedPost] = await db
      .update(blogPosts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
      
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    revalidatePath(`/blog/${updatedPost.slug}`);
    return updatedPost;
  } catch (error) {
    console.error(`Failed to update blog post ${id}:`, error);
    throw new Error("Nie udało się zaktualizować wpisu.");
  }
}

// DELETE POST
export async function deletePost(id: number) {
  try {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
    
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete blog post ${id}:`, error);
    throw new Error("Nie udało się usunąć wpisu.");
  }
}
