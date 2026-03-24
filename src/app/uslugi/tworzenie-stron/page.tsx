import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WebDevClientPage from "./WebDevClientPage";

export const metadata = {
  title: "Tworzenie Stron Internetowych | Digitay",
  description: "Projektujemy i budujemy nowoczesne strony internetowe. Responsywne, zoptymalizowane pod konwersję platformy, które skalują Twój biznes.",
};

export default function WebDevServicePage() {
  return (
    <>
      <Navbar />
      <WebDevClientPage />
      <Footer />
    </>
  );
}
