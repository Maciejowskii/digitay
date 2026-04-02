import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES } from "@/data/cities";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocalSEOClientPage from "../LocalSEOClientPage";

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
    title: `Pozycjonowanie SEO ${city.name} | Designing & Development Digitay`,
    description: `Szukasz skutecznego pozycjonowania w ${city.inCity}? Wyprzedź konkurencję na rynku ${city.name}. Profesjonalne SEO, audyt techniczny i link building dla lokalnych biznesów.`,
    keywords: [`pozycjonowanie seo ${city.name}`, `seo ${city.name}`, `pozycjonowanie stron ${city.name}`, `audyt seo ${city.name}`],
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
      <LocalSEOClientPage city={city} />
      <Footer />
    </>
  );
}
