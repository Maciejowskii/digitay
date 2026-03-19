import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesBento from "@/components/ServicesBento";
import LogoMarquee from "@/components/LogoMarquee";
import ContactFaq from "@/components/ContactFaq";
import SectionHeader from "@/components/frontend/SectionHeader";

const servicesFaqs = [
  {
    question: "JAK WYGLĄDA PROCES WSPÓŁPRACY?",
    answer: "Zaczynamy od dogłębnej analizy Twoich celów. Następnie przechodzimy do strategii, projektowania UI/UX, a na końcu do wdrożenia i optymalizacji. Cały proces jest transparentny, a Ty masz stały dostęp do postępów w projekcie."
  },
  {
    question: "JAK MIERZYMY EFEKTYWNOŚĆ DZIAŁAŃ?",
    answer: "Skupiamy się na twardych metrykach: wzroście ruchu organicznego, liczbie leadów i docelowej konwersji sprzedaży. Korzystamy z zaawansowanych narzędzi analitycznych, aby każda złotówka wydana na marketing miała uzasadnienie biznesowe."
  },
  {
    question: "ILE KOSZTUJĄ USŁUGI AGENCJI?",
    answer: "Nasze wyceny są zawsze indywidualne i zależą od zakresu prac oraz celów biznesowych. Przygotowujemy transparentne oferty, które odzwierciedlają realny nakład pracy naszych ekspertów i planowany zwrot z inwestycji."
  }
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#07101B] text-white pt-32 md:pt-40">
        
        {/* Usługi Hero Section */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto mb-24">
          <SectionHeader 
            title="Jaki obszar współpracy"
            titleAccent="Cię interesuje?"
            description="Od pozycjonowania i tworzenia stron, po zaawansowane aplikacje webowe i kampanie reklamowe. Dostarczamy kompleksowe rozwiązania, które skalują Twój biznes w cyfrowym świecie."
            centered
          />
          
          <div className="flex justify-center -mt-12 mb-20">
             <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full backdrop-blur-sm animate-pulse">
                <div className="w-2 h-2 rounded-full bg-brand-green" />
                <span className="font-mono text-xs text-white/70 tracking-widest uppercase">271 Zadowolonych klientów</span>
             </div>
          </div>
        </section>

        {/* Sekcja Zaufania */}
        <section className="pb-32">
          <div className="max-w-7xl mx-auto px-6 mb-12">
             <h3 className="font-mono text-[10px] text-white/30 tracking-[0.3em] uppercase text-center mb-8">
               [ ZAUFALI NAM NAJLEPSI W BRANŻY ]
             </h3>
          </div>
          <LogoMarquee />
        </section>

        {/* Główna Siatka Usług */}
        <section className="bg-transparent border-t border-white/10">
          <ServicesBento />
        </section>

        {/* Sekcja FAQ Usługowe + Kontakt */}
        <section className="bg-transparent">
          <ContactFaq customFaqs={servicesFaqs} />
        </section>

      </main>
      <Footer />
    </>
  );
}
