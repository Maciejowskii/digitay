import { db } from "@/db";
import { caseStudies } from "@/db/schema";
import { eq, ne } from "drizzle-orm";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseStudyDetailClient from "@/components/CaseStudyDetailClient";

// Generate dynamic metadata for SEO based on the Case Study
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const [caseStudy] = await db
    .select({ title: caseStudies.title, clientName: caseStudies.clientName, coverImage: caseStudies.coverImage, description: caseStudies.description })
    .from(caseStudies)
    .where(eq(caseStudies.slug, resolvedParams.slug))
    .limit(1);

  if (!caseStudy) {
    return { title: 'Case Study nie znaleziona | Digitay' };
  }

  return {
    title: `${caseStudy.title} | Case Studies Digitay`,
    description: caseStudy.description || `Sprawdź jak pomogliśmy firmie ${caseStudy.clientName} osiągnąć mierzalne wyniki.`,
    openGraph: {
      title: `${caseStudy.title} - Sukces ${caseStudy.clientName} | Digitay`,
      description: caseStudy.description || `Sprawdź pełne studium przypadku współpracy z ${caseStudy.clientName}.`,
      url: `/case-study/${resolvedParams.slug}`,
    },
    twitter: {
       card: "summary",
       title: `${caseStudy.title} | Digitay`,
       description: caseStudy.description || `Jak pomogliśmy firmie ${caseStudy.clientName}`,
    }
  };
}

export default async function SingleCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const [caseStudy] = await db
    .select()
    .from(caseStudies)
    .where(eq(caseStudies.slug, resolvedParams.slug))
    .limit(1);

  if (!caseStudy) {
    notFound();
  }

  // Get next case study for navigation
  const [nextStudy] = await db
    .select({ slug: caseStudies.slug, title: caseStudies.title, clientName: caseStudies.clientName })
    .from(caseStudies)
    .where(ne(caseStudies.slug, resolvedParams.slug))
    .limit(1);

  // Serialize dates for client component
  const serializedStudy = {
    ...caseStudy,
    tags: caseStudy.tags as string[] | null,
    results: caseStudy.results as Record<string, string> | null,
    createdAt: caseStudy.createdAt,
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <CaseStudyDetailClient
          caseStudy={serializedStudy}
          nextCaseStudy={nextStudy || null}
        />
      </main>
      <Footer />
    </>
  );
}
