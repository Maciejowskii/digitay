import { db } from "@/db";
import { caseStudies } from "@/db/schema";
import { desc } from "drizzle-orm";
import { CaseStudiesGrid } from "./CaseStudiesGrid";

export default async function CaseStudies() {
  let fetchedStudies: any[] = [];

  try {
    fetchedStudies = await db
      .select()
      .from(caseStudies)
      .orderBy(desc(caseStudies.createdAt))
      .limit(4);
  } catch (error) {
    console.error("Failed to fetch case studies:", error);
  }

  const mockFallback = [
    {
      id: 991,
      slug: "brand-x-growth",
      clientName: "TechFlow",
      title: "Skalowanie ruchu o 450% na nowym produkcie SaaS",
      coverImage:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      tags: ["SEO", "SaaS", "Content"],
    },
    {
      id: 992,
      slug: "ecommerce-redesign",
      clientName: "GreenStyle",
      title: "Kompletny Re-design sklepu e-commerce",
      coverImage:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop",
      tags: ["UI/UX", "E-commerce"],
    },
    {
      id: 993,
      slug: "mobile-app-launch",
      clientName: "FitManager",
      title: "Zaprojektowanie i launch aplikacji mobilnej",
      coverImage:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2574&auto=format&fit=crop",
      tags: ["React Native", "Design"],
    },
  ];

  const dataToRender =
    fetchedStudies.length > 0 ? fetchedStudies : mockFallback;

  return (
    <section className="py-24 md:py-32 relative bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-20">
          <span className="text-primary text-sm tracking-widest mb-8 block">
            [ Realizacje ]
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white tracking-tight leading-[1]">
            Ostatnie
            <br />
            <span className="text-white/40 font-light italic">realizacje.</span>
          </h2>
        </div>

        <CaseStudiesGrid caseStudies={dataToRender as any} />
      </div>
    </section>
  );
}
