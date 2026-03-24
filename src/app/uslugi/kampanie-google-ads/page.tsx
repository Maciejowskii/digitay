import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleAdsClientPage from "./GoogleAdsClientPage";

export const metadata = {
  title: "Kampanie Google Ads | Digitay",
  description: "Precyzyjne kampanie Google Ads — Search, PMax, YouTube. Setup, optymalizacja i skalowanie reklam, które generują realny zwrot z inwestycji.",
};

export default function GoogleAdsServicePage() {
  return (
    <>
      <Navbar />
      <GoogleAdsClientPage />
      <Footer />
    </>
  );
}
