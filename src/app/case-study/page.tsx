import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseStudies from "@/components/frontend/CaseStudies";
import SectionHeader from "@/components/frontend/SectionHeader";

export default function CaseStudyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#07101B] text-white pt-32 md:pt-40">
        
        {/* Header Section */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <SectionHeader 
            tag="[ PORTFOLIO / REALIZACJE ]"
            title="Case"
            titleAccent="Studies"
            description="Dowody na naszą skuteczność. Zobacz, jak rozwiązywaliśmy realne problemy naszych partnerów za pomocą technologii i designu."
          />
        </div>

        {/* Integration of CaseStudies (Server Component) */}
        <div className="pb-24">
           <CaseStudies />
        </div>

      </main>
      <Footer />
    </>
  );
}
