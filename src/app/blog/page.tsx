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

  // Fallback Mock Data if DB is empty for user preview
  // Using fixed strings for deterministic SSR rendering vs Hydration
  const mockPosts = [
    {
      id: 991,
      slug: "brand-experience-2024",
      title: "10 trendów w web designie na 2024 rok, które musisz znać by wyprzedzić konkurencję",
      excerpt: "Wraz z postępem SI, autentyczność i storytelling wracają do łask z podwójną siłą. Zobacz jakie zjawiska zaobserwowaliśmy u największych gigantów branży, a o czym małe firmy zupełnie zapominają.",
      coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2670&auto=format&fit=crop",
      author: "Maciej",
      publishedAt: new Date("2024-03-15T12:00:00Z"),
    },
    {
      id: 992,
      slug: "dlaczego-potrzebujesz-audytu-ux",
      title: "Dlaczego Twoja strona potrzebuje audytu UX?",
      excerpt: "Niski czas spędzony na stronie bywa często objawem źle przemyślanej ścieżki poznawczej lub przeładowania interfejsu.",
      coverImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop",
      author: "Anna",
      publishedAt: new Date("2024-03-10T12:00:00Z"),
    },
    {
      id: 993,
      slug: "seo-w-ecommerce",
      title: "Jak SEO nadal zmienia reguły gry w e-commerce",
      excerpt: "Dobrze zbudowane kategorie w sklepie online potrafią po roku generować kosmiczny darmowy ruch organiczny.",
      coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      author: "Zosia",
      publishedAt: new Date("2024-03-05T12:00:00Z"),
    },
    {
      id: 994,
      slug: "szybkosc-ladowania",
      title: "Szybkość ładowania to konwersja",
      excerpt: "Optymalizuj obrazki, używaj lazy loadingu. Zobacz, jak poprawiliśmy wyniki dla naszego klienta.",
      coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
      author: "Maciej",
      publishedAt: new Date("2024-02-28T12:00:00Z"),
    }
  ];

  const dataToRender = posts.length > 0 ? posts : mockPosts;

  return (
    <main className="min-h-screen bg-zinc-50 selection:bg-brand-green/20 selection:text-brand-green">
      <Navbar />
      
      {/* Blog Page Header */}
      <section className="pt-40 pb-16 md:pt-48 md:pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <h1 className="text-5xl md:text-7xl font-jakarta font-bold text-zinc-900 tracking-tight leading-tight mb-6">
             Myśli o cyfrowym <br />
             <span className="text-brand-green">rozwoju firm.</span>
          </h1>
          <p className="text-zinc-500 text-lg md:text-xl">
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
