import { db } from "@/db";
import { caseStudies } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Generate dynamic metadata for SEO based on the Case Study
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const [caseStudy] = await db
    .select({ title: caseStudies.title, clientName: caseStudies.clientName, coverImage: caseStudies.coverImage })
    .from(caseStudies)
    .where(eq(caseStudies.slug, resolvedParams.slug))
    .limit(1);

  if (!caseStudy) {
    return { title: 'Case Study nie znaleziona | Digitay' };
  }

  return {
    title: `${caseStudy.title} | Case Studies Digitay`,
    description: `Sprawdź jak pomogliśmy firmie ${caseStudy.clientName} osiągnąć mierzalne wyniki.`,
    openGraph: {
      title: `${caseStudy.title} - Sukces ${caseStudy.clientName} | Digitay`,
      description: `Sprawdź pełne studium przypadku współpracy z ${caseStudy.clientName}.`,
      url: `/case-study/${resolvedParams.slug}`,
      images: caseStudy.coverImage ? [
        {
          url: caseStudy.coverImage,
          width: 1200,
          height: 630,
          alt: `Case study dla ${caseStudy.clientName}`,
        }
      ] : undefined,
    },
    twitter: {
       card: "summary_large_image",
       title: `${caseStudy.title} | Digitay`,
       description: `Jak pomogliśmy firmie ${caseStudy.clientName}`,
       images: caseStudy.coverImage ? [caseStudy.coverImage] : undefined,
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

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 text-white p-8 max-w-4xl mx-auto flex flex-col items-center justify-center">
         <h1 className="text-4xl font-bold mb-4">{caseStudy.title}</h1>
         <p className="text-zinc-400 mb-8">Klient: {caseStudy.clientName}</p>
         {caseStudy.coverImage && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={caseStudy.coverImage} className="w-full aspect-video object-cover rounded-xl mb-8" alt="Cover"/>
            </>
         )}
         <div className="prose prose-invert max-w-none w-full" dangerouslySetInnerHTML={{ __html: caseStudy.challenge || "" }} />
         <div className="prose prose-invert max-w-none w-full border-t border-zinc-800 pt-8 mt-8" dangerouslySetInnerHTML={{ __html: caseStudy.solution || "" }} />
      </main>
      <Footer />
    </>
  );
}
