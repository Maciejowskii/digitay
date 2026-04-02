import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarketingLokalnyClientPage from "./MarketingLokalnyClientPage";

export const metadata = {
  title: "Marketing Lokalny & Wizytówki Google | Digitay",
  description: "Dominacja w Mapach Google i wyszukiwarce lokalnej. Kompleksowe zarządzanie Profilem Firmy w Google, opinie i Local SEO dla Twojego biznesu.",
};

export default function MarketingLokalnyServicePage() {
  return (
    <>
      <Navbar />
      <MarketingLokalnyClientPage />
      <Footer />
    </>
  );
}
