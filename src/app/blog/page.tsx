import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { desc, isNotNull } from "drizzle-orm";
import { BlogBentoGrid } from "@/components/frontend/BlogBentoGrid";

export const metadata = {
  title: "Blog & Baza Wiedzy | Digitay",
  description: "Zbiór wiedzy, wskazówek i analiz trendów ze świata Web Designu, SEO i Kampanii reklamowych prowadzony przez zespół Digitay.",
};

export default async function PublicBlogPage() {
  let posts: any[] = [];
  
  try {
    // Fetch only published posts (e.g. ones with a publishedAt date physically present, or you could add 'status' field to DB)
    // Assuming 'publishedAt' being NOT NULL means it's published based on our initial schema.
    posts = await db
      .select()
      .from(blogPosts)
      .where(isNotNull(blogPosts.publishedAt))
      .orderBy(desc(blogPosts.publishedAt));
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
  }

  const dataToRender = posts;

  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      
      {/* Blog Page Header */}
      <section className="pt-40 pb-16 md:pt-48 md:pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white tracking-tighter leading-none mb-6 uppercase">
             Myśli o cyfrowym <br />
             <span className="text-primary italic font-light lowercase">rozwoju firm.</span>
          </h1>
          <p className="text-zinc-400 font-mono text-sm uppercase md:text-base tracking-wide leading-relaxed">
             Dzielimy się naszą wiedzą, studiami przypadków i spostrzeżeniami dotyczącymi Web Designu, SEO i marketingu B2B. Uczymy, jak od zera zbudować silną pozycję online.
          </p>
        </div>

        {/* The Interactive Bento Grid component taking data from RSC */}
        <BlogBentoGrid posts={dataToRender} />
      </section>

      <Footer />
    </main>
  );
}
