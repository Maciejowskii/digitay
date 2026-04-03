import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq, ne, desc } from "drizzle-orm";
import { BlogPostReader } from "@/components/frontend/BlogPostReader";
import { MoreBlogsScroller } from "@/components/frontend/MoreBlogsScroller";
import { notFound } from "next/navigation";

// Generate dynamic metadata for SEO based on the post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const [post] = await db
    .select({ title: blogPosts.title, excerpt: blogPosts.excerpt, coverImage: blogPosts.coverImage })
    .from(blogPosts)
    .where(eq(blogPosts.slug, resolvedParams.slug))
    .limit(1);

  if (!post) {
    return { title: 'Post not found | Digitay' };
  }

  return {
    title: `${post.title} | Digitay Blog`,
    description: post.excerpt || `Czytaj najnowszy artykuł na blogu Digitay.`,
    openGraph: {
      title: `${post.title} | Digitay Blog`,
      description: post.excerpt || `Czytaj najnowszy artykuł na blogu Digitay.`,
      url: `/blog/${resolvedParams.slug}`,
    },
    twitter: {
       card: "summary",
       title: `${post.title} | Digitay`,
       description: post.excerpt || `Czytaj najnowszy artykuł na blogu Digitay.`,
    }
  };
}

export default async function SingleBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  let [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, resolvedParams.slug))
    .limit(1);

  if (!post) {
    notFound();
  }

  // Pobierz pozostale artykuly do nieskonczonej petli postow na dole strony
  const morePosts = await db.query.blogPosts.findMany({
    where: ne(blogPosts.slug, resolvedParams.slug),
    orderBy: [desc(blogPosts.publishedAt)],
    limit: 10,
  });

  return (
    <>
      <Navbar />
      <BlogPostReader post={post as any} />
      {morePosts && morePosts.length > 0 && <MoreBlogsScroller posts={morePosts} />}
      <Footer />
    </>
  );
}
