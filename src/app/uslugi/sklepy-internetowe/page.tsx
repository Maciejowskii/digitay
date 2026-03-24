import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EcommerceClientPage from "./EcommerceClientPage";

export const metadata = {
  title: "Sklepy Internetowe | Digitay",
  description: "Projektujemy i budujemy sklepy internetowe zoptymalizowane pod konwersję. E-commerce, który sprzedaje — od konfiguracji po integracje z systemami płatności i logistyki.",
};

export default function EcommerceServicePage() {
  return (
    <>
      <Navbar />
      <EcommerceClientPage />
      <Footer />
    </>
  );
}
