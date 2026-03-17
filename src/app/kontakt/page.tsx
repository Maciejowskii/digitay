import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFaq from "@/components/ContactFaq";
import SectionHeader from "@/components/frontend/SectionHeader";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#07101B] text-white pt-32 md:pt-40">
        
        {/* Header Section */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <SectionHeader 
            tag="// POŁĄCZMY SIŁY"
            title="Skontaktuj"
            titleAccent="się z nami"
            description="Masz pomysł na projekt? Potrzebujesz wsparcia technologicznego? Wypełnij formularz poniżej, a nasz zespół wróci do Ciebie z konkretami w 24h."
          />
        </div>

        {/* Contact Form & FAQ Section */}
        <div className="pb-24">
           <ContactFaq />
        </div>

      </main>
      <Footer />
    </>
  );
}
