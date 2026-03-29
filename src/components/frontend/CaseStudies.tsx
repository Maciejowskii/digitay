import { db } from "@/db";
import { caseStudies } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { CaseStudiesGrid } from "./CaseStudiesGrid";

export default async function CaseStudies() {
  let fetchedStudies: any[] = [];

  try {
    fetchedStudies = await db
      .select()
      .from(caseStudies)
      .where(eq(caseStudies.isPublished, true))
      .orderBy(desc(caseStudies.createdAt))
      .limit(4);
  } catch (error) {
    console.error("Failed to fetch case studies:", error);
  }

  if (fetchedStudies.length === 0) {
    return null; // Don't render the section if no case studies
  }

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

        <CaseStudiesGrid caseStudies={fetchedStudies as any} />
      </div>
    </section>
  );
}
