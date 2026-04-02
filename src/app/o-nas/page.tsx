import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutPageClient from "@/components/AboutPageClient";

export const metadata = {
  title: "O nas | Digitay – Cyfrowa Agencja Marketingowa",
  description:
    "Poznaj zespół Digitay. Cyfrowa agencja marketingowa specjalizująca się w małych i średnich firmach. Budujemy produkty cyfrowe przyszłości.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <AboutPageClient />
      </main>
      <Footer />
    </>
  );
}
