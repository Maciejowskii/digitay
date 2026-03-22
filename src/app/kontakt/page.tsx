import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactPageClient from "@/components/ContactPageClient";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#07101B] text-white">
        <ContactPageClient />
      </main>
      <Footer />
    </>
  );
}
