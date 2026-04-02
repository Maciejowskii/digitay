import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES } from "@/data/cities";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocalGoogleAdsClientPage from "../LocalGoogleAdsClientPage";

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
    title: `Kampanie Google ADS ${city.name} | Reklama w wyszukiwarce Digitay`,
    description: `Szukasz szybkich efektów? Kampanie Google Ads w ${city.inCity} dla Twojej firmy. Precyzyjne targetowanie na rynek ${city.name} i natychmiastowe konwersje.`,
    keywords: [`google ads ${city.name}`, `reklama google ${city.name}`, `reklama w wyszukiwarce ${city.name}`, `kampanie ads ${city.name}`],
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
      <LocalGoogleAdsClientPage city={city} />
      <Footer />
    </>
  );
}
