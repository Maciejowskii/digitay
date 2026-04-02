import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES } from "@/data/cities";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocalMarketingLokalnyClientPage from "../LocalMarketingLokalnyClientPage";

interface Props {
  params: Promise<{ miasto: string }>;
}

export async function generateStaticParams() {
  return CITIES.map((city) => ({
    miasto: city.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { miasto } = await params;
  const city = CITIES.find((c) => c.slug === miasto);
  
  if (!city) return { title: "Nie znaleziono" };

  return {
    title: `Marketing Lokalny ${city.name} | Designing & Development Digitay`,
    description: `Zdominuj lokalny rynek w ${city.inCity}. Kompleksowa optymalizacja wizytówek Google, Lokalne SEO i zarządzanie opiniami dla firm z ${city.name}.`,
    keywords: [`marketing lokalny ${city.name}`, `pozycjonowanie lokalne ${city.name}`, `wizytówka google ${city.name}`, `seo ${city.name}`],
  };
}

export default async function Page({ params }: Props) {
  const { miasto } = await params;
  const city = CITIES.find((c) => c.slug === miasto);

  if (!city) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <LocalMarketingLokalnyClientPage city={city} />
      <Footer />
    </>
  );
}
