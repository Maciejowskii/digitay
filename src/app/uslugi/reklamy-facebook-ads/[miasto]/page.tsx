import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES } from "@/data/cities";
import LocalFacebookAdsClientPage from "../LocalFacebookAdsClientPage";

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
    title: `Reklamy Facebook ADS ${city.name} | Social Media Marketing Digitay`,
    description: `Skuteczne kampanie na Facebooku i Instagramie dla Twojej firmy w ${city.inCity}. Docieraj do lokalnej społeczności ${city.name} i zwiększaj sprzedaż.`,
    keywords: [`facebook ads ${city.name}`, `reklama facebook ${city.name}`, `instagram ads ${city.name}`, `social media marketing ${city.name}`],
  };
}

export default async function Page({ params }: Props) {
  const { miasto } = await params;
  const city = CITIES.find((c) => c.slug === miasto);

  if (!city) {
    notFound();
  }

  return <LocalFacebookAdsClientPage city={city} />;
}
