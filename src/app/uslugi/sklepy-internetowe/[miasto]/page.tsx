import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES } from "@/data/cities";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocalEcommerceClientPage from "../LocalSklepyInternetoweClientPage";

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
    title: `Sklepy Internetowe ${city.name} | E-commerce Designing & Development Digitay`,
    description: `Szukasz profesjonalnego e-commerce w ${city.inCity}? Budowa sklepów internetowych dla lokalnych firm z ${city.name}. Zoptymalizowana sprzedaż i nowoczesny design.`,
    keywords: [`sklepy internetowe ${city.name}`, `budowa sklepów ${city.name}`, `e-commerce ${city.name}`, `projektowanie sklepów ${city.name}`],
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
      <LocalEcommerceClientPage city={city} />
      <Footer />
    </>
  );
}
