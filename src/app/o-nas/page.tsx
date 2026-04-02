import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutPageClient from "@/components/AboutPageClient";

export const metadata = {
  title: "O nas | Digitay – Software House & Agencja Kreatywna",
  description:
    "Poznaj zespół Digitay. Wyspecjalizowany software house łączący inżynierski rygor z bezkompromisowym designem. Budujemy produkty cyfrowe przyszłości.",
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
