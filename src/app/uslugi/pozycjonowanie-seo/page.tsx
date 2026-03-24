import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SeoClientPage from "./SeoClientPage";

export const metadata = {
  title: "Pozycjonowanie SEO | Digitay",
  description: "Zaawansowane pozycjonowanie SEO. Kampanie, audyty, link building i optymalizacja, które dowożą realny zwrot z inwestycji.",
};

export default function SeoServicePage() {
  return (
    <>
      <Navbar />
      <SeoClientPage />
      <Footer />
    </>
  );
}
