import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesPageClient from "@/components/ServicesPageClient";

export const metadata = {
  title: "Usługi | Digitay – Strony, Aplikacje, Marketing",
  description:
    "Strony internetowe, aplikacje webowe i mobilne, SEO, Google Ads i UI/UX design. Kompleksowe rozwiązania cyfrowe dla ambitnych firm.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <ServicesPageClient />
      </main>
      <Footer />
    </>
  );
}
