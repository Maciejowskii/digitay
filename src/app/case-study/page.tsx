import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db } from "@/db";
import { caseStudies } from "@/db/schema";
import { desc } from "drizzle-orm";
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
      .orderBy(desc(caseStudies.createdAt));
  } catch (error) {
    console.error("Failed to fetch case studies:", error);
  }

  const mockFallback = [
    {
      id: 991,
      slug: "brand-x-growth",
      clientName: "TechFlow",
      title: "Skalowanie ruchu o 450% na nowym produkcie SaaS",
      description:
        "Kompleksowa strategia SEO i content marketingu dla startupu technologicznego, która przyniosła wzrost organicznego ruchu o 450% w 6 miesięcy.",
      coverImage:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      tags: ["SEO", "SaaS", "Content Marketing"],
      category: "Marketing",
    },
    {
      id: 992,
      slug: "ecommerce-redesign",
      clientName: "GreenStyle",
      title: "Kompletny re-design sklepu e-commerce",
      description:
        "Przebudowa platformy e-commerce od podstaw, z nowym systemem designu i zoptymalizowanym lejkiem zakupowym. Wzrost konwersji o 180%.",
      coverImage:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop",
      tags: ["UI/UX", "E-commerce", "Next.js"],
      category: "Web Development",
    },
    {
      id: 993,
      slug: "mobile-app-launch",
      clientName: "FitManager",
      title: "Zaprojektowanie i launch aplikacji mobilnej",
      description:
        "Aplikacja mobilna dla sieci fitness klubów z systemem rezerwacji, planami treningowymi i social features. 15K pobrań w pierwszym miesiącu.",
      coverImage:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2574&auto=format&fit=crop",
      tags: ["React Native", "Design", "Mobile"],
      category: "Mobile",
    },
    {
      id: 994,
      slug: "saas-dashboard",
      clientName: "DataPulse",
      title: "Dashboard analityczny dla platformy SaaS",
      description:
        "Zaawansowany dashboard z real-time danymi, customowymi wykresami i systemem alertów. Zwiększenie retencji użytkowników o 35%.",
      coverImage:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
      tags: ["React", "TypeScript", "Analytics"],
      category: "Web Development",
    },
    {
      id: 995,
      slug: "brand-identity",
      clientName: "NovaBrew",
      title: "Pełna identyfikacja wizualna i strona WWW",
      description:
        "Od logo przez system designu po responsywną stronę internetową. Spójna marka premium dla sieci kawiarni specialty.",
      coverImage:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2670&auto=format&fit=crop",
      tags: ["Branding", "Web Design", "UI/UX"],
      category: "Design",
    },
  ];

  const dataToRender =
    fetchedStudies.length > 0 ? fetchedStudies : mockFallback;

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <CaseStudyPageClient caseStudies={dataToRender} />
      </main>
      <Footer />
    </>
  );
}
