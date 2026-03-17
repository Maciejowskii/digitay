import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesBento from "@/components/ServicesBento";
import SectionHeader from "@/components/frontend/SectionHeader";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#07101B] text-white pt-32 md:pt-40">
        
        {/* Header Section */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <SectionHeader 
            title="Nasze"
            titleAccent="Usługi"
            description="Budujemy architekturę cyfrową przyszłości. Od strategii, przez design, aż po zaawansowany kod – dostarczamy rozwiązania, które skalują biznesy."
            centered
          />
        </div>

        {/* Bento Grid section */}
        <section className="bg-transparent border-t border-white/10">
          <ServicesBento />
        </section>

      </main>
      <Footer />
    </>
  );
}
