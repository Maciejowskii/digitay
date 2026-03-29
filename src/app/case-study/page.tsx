import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db } from "@/db";
import { caseStudies } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import CaseStudyPageClient from "@/components/CaseStudyPageClient";

export const metadata = {
  title: "Case Studies | Digitay – Nasze realizacje",
  description:
    "Zobacz nasze najlepsze realizacje. Strony internetowe, aplikacje webowe, e-commerce i kampanie marketingowe dla ambitnych firm.",
};

export default async function CaseStudyPage() {
  let fetchedStudies: any[] = [];

  try {
    fetchedStudies = await db
      .select()
      .from(caseStudies)
      .where(eq(caseStudies.isPublished, true))
      .orderBy(desc(caseStudies.createdAt));
  } catch (error) {
    console.error("Failed to fetch case studies:", error);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <CaseStudyPageClient caseStudies={fetchedStudies} />
      </main>
      <Footer />
    </>
  );
}
