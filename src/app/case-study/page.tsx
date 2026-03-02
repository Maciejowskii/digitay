import { db } from "@/db";
import { caseStudies } from "@/db/schema";
import { desc } from "drizzle-orm";
import { CaseStudiesGrid } from "@/components/frontend/CaseStudiesGrid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic"; // Ensure it fetches fresh data

export default async function CaseStudyPage() {
  let dataToRender: any[] = [];
  
  try {
    // Fetch data using Drizzle ORM
    const fetchedStudies = await db
      .select()
      .from(caseStudies)
      .orderBy(desc(caseStudies.createdAt));
      
    dataToRender = fetchedStudies;
  } catch (error) {
    console.error("Failed to fetch case studies:", error);
  }

  // Fallback mock data if DB is empty or fails
  if (dataToRender.length === 0) {
    dataToRender = [
      {
        id: 991,
        slug: "brand-x-growth",
        clientName: "TechFlow",
        title: "Skalowanie ruchu o 450% na nowym produkcie SaaS",
        coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        tags: ["SEO", "SaaS", "Content"],
      },
      {
        id: 992,
        slug: "ecommerce-redesign",
        clientName: "GreenStyle",
        title: "Kompletny Re-design sklepu e-commerce",
        coverImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop",
        tags: ["UI/UX", "E-commerce"],
      },
      {
        id: 993,
        slug: "b2b-platform",
        clientName: "Logistics Pro",
        title: "Platforma B2B optymalizująca łańcuchy dostaw",
        coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop",
        tags: ["Web App", "Next.js", "System"],
      }
    ];
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 overflow-hidden">
      
      {/* Huge Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24">
        <h3 className="font-mono text-xs text-white/40 tracking-widest uppercase mb-8">
          // PORTFOLIO PROJEKTÓW
        </h3>
        <h1 className="text-5xl sm:text-7xl lg:text-[100px] font-heading font-black text-white leading-[0.9] tracking-tighter fade-in-up">
          DOWODY, <br/> NIE OBIETNICE.
        </h1>
        <p className="text-zinc-500 font-mono text-sm max-w-2xl mt-8 leading-relaxed uppercase fade-in-up" style={{ animationDelay: '0.1s' }}>
          Przejrzyj nasze ostatnie wdrożenia. Poznaj architekturę, wyzwania i realne wyniki metryk biznesowych dostarczonych dla naszych partnerów.
        </p>
      </div>

      {/* Grid wrapper using the existing CaseStudiesGrid aesthetic */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-white/10 pt-16">
        <CaseStudiesGrid caseStudies={dataToRender as any} />
      </div>

    </main>
    <Footer />
    </>
  );
}
