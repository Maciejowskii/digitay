import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LogoMarquee from "@/components/LogoMarquee";
import SectionHeader from "@/components/frontend/SectionHeader";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#07101B] text-white pt-32 md:pt-40">
        
        {/* Hero Section */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto pb-24">
          <SectionHeader 
            tag="// O NAS / MISJA"
            title="Kim"
            titleAccent="jesteśmy?"
            description=""
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-12">
            <p className="text-xl md:text-2xl font-heading font-bold text-white uppercase leading-tight">
              Digitay to software house nowej generacji, gdzie inżynierski rygor spotyka się z bezkompromisowym designem.
            </p>
            <p className="text-[#CED0DF] font-mono text-sm md:text-base leading-relaxed uppercase">
              Nasza misja jest prosta: budować produkty cyfrowe, które nie tylko działają, ale dominują na rynku. Wierzymy w surową efektywność, nowoczesne technologie i design, który sprzedaje. Każda linia kodu, którą piszemy, ma jeden cel – wzrost Twojego biznesu.
            </p>
          </div>
        </section>

        {/* Social Proof Section using LogoMarquee */}
        <section className="py-24 border-y border-white/10 bg-white/5">
          <div className="max-w-7xl mx-auto px-6 mb-12">
             <h3 className="font-mono text-[10px] text-white/40 tracking-[0.3em] uppercase text-center mb-8">
               [ ZAUFALI NAM ]
             </h3>
          </div>
          <LogoMarquee />
        </section>

        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-black text-white uppercase tracking-tighter mb-8">
              WIERZYMY W <span className="text-brand-green">JAKOŚĆ</span>, NIE ILOŚĆ.
            </h2>
            <p className="text-zinc-500 font-mono text-sm max-w-2xl mx-auto uppercase">
               Nie jesteśmy masową fabryką stron. Jesteśmy butikowym studiem, które skupia się na dostarczaniu rozwiązań premium dla tych, którzy wymagają więcej.
            </p>
        </section>

      </main>
      <Footer />
    </>
  );
}
