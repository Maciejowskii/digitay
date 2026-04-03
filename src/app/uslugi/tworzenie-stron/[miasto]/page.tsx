import { CITIES } from "@/data/cities";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocalWebDevClientPage from "../LocalWebDevClientPage";
import { Metadata } from "next";

export function generateStaticParams() {
  return CITIES.map((city) => ({
    miasto: city.slug,
  }));
}

interface Props {
  params: Promise<{ miasto: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { miasto } = await params;
  const city = CITIES.find((c) => c.slug === miasto);
  if (!city) return { title: "Tworzenie Stron Internetowych | Digitay" };

  return {
    title: `Tworzenie Stron Internetowych ${city.name} | Designing & Development Digitay`,
    description: `Szukasz profesjonalnej strony internetowej ${city.inCity}? Budujemy nowoczesne, szybkie i zoptymalizowane pod konwersję strony www dla firm z rynku ${city.name}.`,
    openGraph: {
      title: `Tworzenie Stron Internetowych ${city.name} | Digitay`,
      description: `Nowoczesne strony www dla biznesu ${city.inCity}. Zwiększ swoją widoczność i sprzedaż z Digitay.`,
    }
  };
}

export default async function LocalServicePage({ params }: Props) {
  const { miasto } = await params;
  const city = CITIES.find((c) => c.slug === miasto);

  if (!city) {
    return <div>City not found</div>;
  }

  return (
    <>
      <Navbar />
      <LocalWebDevClientPage city={city} />
      <Footer />
    </>
  );
}
