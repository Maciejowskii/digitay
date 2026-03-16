import { db } from "@/db";
import { services } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Target, Zap, TrendingUp } from "lucide-react";
import ServicePageClient from "./ServicePageClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const [service] = await db
    .select({ name: services.name, description: services.description, slug: services.slug })
    .from(services)
    .where(eq(services.slug, resolvedParams.slug))
    .limit(1);

  if (!service) {
    return { title: 'Usługa nie znaleziona | Digitay' };
  }

  return {
    title: `${service.name} | Usługi Digitay`,
    description: service.description || `Sprawdź zaawansowane usługi cyfrowe świadczone przez Digitay.`,
    openGraph: {
      title: `${service.name} | Digitay`,
      description: service.description || `Podejmij współpracę z Digitay w zakresie ${service.name}.`,
      url: `/uslugi/${service.slug}`,
    }
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const fetchedServices = await db.select().from(services).where(eq(services.slug, resolvedParams.slug)).limit(1);
  const serviceDb = fetchedServices[0];

  if (!serviceDb) {
    notFound();
  }

  const processData = [
    { title: "Strategia & UX", desc: "Zaczynamy od zrozumienia Twojego biznesu i użytkowników.", icon: Target },
    { title: "Design & Development", desc: "Tworzymy unikalny, ultraszybki kod oparty na nowoczesnych technologiach.", icon: Zap },
    { title: "Optymalizacja & Wzrost", desc: "Testujemy, optymalizujemy i skalujemy Twoją nową cyfrową obecność.", icon: TrendingUp }
  ];
  
  const faqsData = [
    { q: "Ile trwa realizacja projektu?", a: "To zależy od specyfikacji. Zazwyczaj proces od założeń do uruchomienia to przedział między 4 a 12 tygodni intensywnej pracy inżynierskiej." },
    { q: "Jak wygląda rozliczenie?", a: "Preferujemy transparentny model. Często jest to wpłata początkowa oraz rozliczenie po konkretnych, zatwierdzonych kamieniach milowych (Milestones)." },
    { q: "Czy otrzymam wsparcie po uruchomieniu?", a: "Tak. Budujemy relacje długoterminowe. Każdy nasz produkt objęty jest ścisłym SLA i opcją stałego utrzymania." }
  ];

  return <ServicePageClient serviceData={serviceDb} process={processData} faqs={faqsData} />;
}
