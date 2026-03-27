import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPageClient from "@/components/BlogPageClient";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { lte, desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  // Pobieranie tylko opublikowanych wpisów (data mniejsza/równa obecnej)
  const posts = await db.query.blogPosts.findMany({
    where: lte(blogPosts.publishedAt, new Date()),
    orderBy: [desc(blogPosts.publishedAt)],
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#07101B] text-white">
        <BlogPageClient initialPosts={posts} />
      </main>
      <Footer />
    </>
  );
}
