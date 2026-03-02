import { db } from "@/db";
import { caseStudies } from "@/db/schema";
import { desc } from "drizzle-orm";
import { CaseStudiesGrid } from "./CaseStudiesGrid";

export default async function CaseStudies() {
  let fetchedStudies: any[] = [];
  
  try {
    // Fetch data using Drizzle RSC
    fetchedStudies = await db
      .select()
      .from(caseStudies)
      .orderBy(desc(caseStudies.createdAt))
      .limit(4);
  } catch (error) {
    console.error("Failed to fetch case studies:", error);
  }

  // To showcase UI immediately without user having to populate DB via local Dashboard initially, we mock fallback if DB is empty
  const mockFallback = [
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
    }
  ];

  const dataToRender = fetchedStudies.length > 0 ? fetchedStudies : mockFallback;

  return (
    <section className="py-24 relative bg-transparent border-t border-white/10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-16 md:mb-24 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase mb-4 block">
              [ CASE STUDIES ]
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-white tracking-tighter leading-none uppercase">
               Ostatnie <br />
               <span className="text-zinc-500 font-light italic">realizacje.</span>
            </h2>
          </div>
        </div>
        
        <CaseStudiesGrid caseStudies={dataToRender as any} />
      </div>
    </section>
  );
}
