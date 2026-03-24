import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FacebookAdsClientPage from "./FacebookAdsClientPage";

export const metadata = {
  title: "Reklamy Facebook Ads | Digitay",
  description: "Kampanie Meta Ads na Facebooku i Instagramie. Prospecting, remarketing i skalowanie — precyzyjne targetowanie, które generuje leady i sprzedaż.",
};

export default function FacebookAdsServicePage() {
  return (
    <>
      <Navbar />
      <FacebookAdsClientPage />
      <Footer />
    </>
  );
}
