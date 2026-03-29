"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, CheckCircle2 } from "lucide-react";
import ServicesBento from "@/components/ServicesBento";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useRef } from "react";



// --- Subcomponents ---

function ServiceAccordion({ service, index, expanded, setExpanded }: { service: any, index: number, expanded: number | null, setExpanded: (val: number | null) => void }) {
  const isExpanded = expanded === index;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: (index % 5) * 0.1 }}
      className={`border-b border-white/5 overflow-hidden transition-colors duration-500 ${isExpanded ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"}`}
    >
      <button 
        onClick={() => setExpanded(isExpanded ? null : index)}
        className="w-full flex items-center justify-between py-6 md:py-8 px-4 md:px-8 group text-left"
      >
        <div className="flex items-center gap-6 md:gap-12">
          <span className={`font-mono text-sm md:text-base transition-colors duration-300 ${isExpanded ? 'text-primary' : 'text-white/20 group-hover:text-white/40'}`}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className={`text-2xl md:text-4xl lg:text-5xl font-heading font-black tracking-tight uppercase transition-all duration-300 ${isExpanded ? 'text-white translate-x-2 md:translate-x-4' : 'text-white/70 group-hover:text-white group-hover:translate-x-2'}`}>
            {service.name}
          </h3>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden md:inline-flex font-mono text-[10px] md:text-xs text-white/30 border border-white/10 px-3 py-1.5 rounded-full group-hover:border-primary/20 group-hover:text-white/60 transition-colors">
            {service.basePrice || "Więcej informacji"}
          </span>
          <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 ${isExpanded ? 'bg-primary border-primary text-white rotate-180' : 'bg-transparent text-white/50 group-hover:bg-white/5'}`}>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="px-4 md:px-8 pb-8 pt-4 md:ml-20 flex flex-col md:flex-row gap-8 lg:gap-16 items-start">
              {/* Opis krótki */}
              <div className="flex-1">
                <p className="text-white/50 text-base md:text-lg leading-relaxed mb-6">
                  {service.shortDescription || "Cyfrowe rozwiązania, które przyspieszają rozwój Twojej bazy klientów i podnoszą pozycję rynkową. Projektujemy interfejsy i architektury nastawione na jedno: mierzalne ROI."}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {['Audyt platformy', 'Nowoczesny stack', 'Ciągła optymalizacja', 'Bezpieczeństwo'].map(feature => (
                    <div key={feature} className="flex items-center gap-2 text-white/60 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
                <Link 
                  href={`/uslugi/${service.slug}`}
                  className="inline-flex items-center gap-2 bg-white text-background px-6 py-3 rounded-full font-bold text-sm lg:text-base hover:bg-white/90 transition-colors group"
                >
                  Szczegóły usługi
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>

              {/* Box graficzny / meta opcjonalny */}
              <div className="w-full md:w-1/3 aspect-video md:aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 p-6 flex flex-col justify-end relative overflow-hidden group/box">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
                <div className="absolute right-0 top-0 w-32 h-32 bg-primary/20 blur-3xl pointer-events-none rounded-full" />
                
                <h4 className="text-xl font-heading font-bold text-white mb-2 relative z-10">Startowa wycena</h4>
                <p className="font-mono text-2xl text-primary font-black relative z-10">{service.basePrice || "Indywidualnie"}</p>
                <span className="text-white/40 text-xs mt-2 uppercase tracking-wider relative z-10">Czas trwania min. 4 tyg.</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Page ───

export default function ServicesClientPage({ allServices }: { allServices: any[] }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  // Parallax Hero
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-white selection:bg-primary/30 selection:text-white pb-24 overflow-hidden">
      
      {/* ═══════════════════════════════════════════════
          MEGA HERO SECTION
      ═══════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden">
        {/* Potężne abstrakcyjne tła */}
        <div className="absolute top-0 right-0 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none animate-pulse duration-[10s]" />
        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-emerald-500/5 rounded-full blur-[150px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
        
        {/* Grid lines overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" />

        <motion.div 
          style={{ y: heroY, opacity: heroTextOpacity }}
          className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10 relative flex flex-col items-center text-center mt-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-md mb-10"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-sm tracking-[0.2em] uppercase font-bold">Ekosystem Usług</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-6xl md:text-8xl lg:text-[11vw] font-heading font-black leading-[0.85] tracking-tighter"
          >
            ARCHITEKTURA <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/30 italic font-light pr-4 pb-2">CYFROWA.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 text-white/50 text-xl md:text-2xl max-w-3xl leading-relaxed"
          >
            To nie jest zwykłe wdrożenie strony. Budujemy pełnokrwiste, zoptymalizowane pod konwersję i skalowanie platformy cyfrowe dla liderów rynku.
          </motion.p>
        </motion.div>
      </section>



      {/* ═══════════════════════════════════════════════
          BENTO GRID INTEGRATION (Existing ServicesBento)
      ═══════════════════════════════════════════════ */}
      <div className="border-t border-white/5 relative z-20">
        <ServicesBento />
      </div>

      {/* ═══════════════════════════════════════════════
          ACCORDION LIST (Skorowidz)
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative z-20 bg-background border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 md:mb-24 gap-8">
            <div>
              <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-primary uppercase mb-6 block">
                [ SKOROWIDZ TECHNOLOGICZNY ]
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white uppercase tracking-tighter leading-[0.9]">
                PEŁEN PRZEKRÓJ <br/> KOMPETENCJI.
              </h2>
            </div>
          </div>

          {/* Map through dynamic services as an accordion */}
          <div className="border-t border-white/10">
            {allServices && allServices.length > 0 ? (
              allServices.map((service, idx) => (
                <ServiceAccordion 
                  key={service._id || idx} 
                  service={service} 
                  index={idx}
                  expanded={expandedIndex}
                  setExpanded={setExpandedIndex}
                />
              ))
            ) : (
              <div className="py-24 text-center border-b border-white/5 flex flex-col items-center">
                 <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <span className="font-mono text-white/20">404</span>
                 </div>
                 <p className="text-white/40 font-mono text-sm uppercase tracking-widest">Wciąż ładujemy listę unikalnych technologii...</p>
                 <p className="text-white/20 text-xs mt-2">Brak opublikowanych usług w bazie.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BOTTOM MEGA CTA
      ═══════════════════════════════════════════════ */}
      <section className="py-32 relative border-t border-white/5 overflow-hidden flex items-center justify-center bg-black/40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-[2/1] bg-primary/10 rounded-full blur-[180px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-sm tracking-widest uppercase font-bold mb-6 block">
              Konkret. Bez domysłów.
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-8xl font-heading font-black tracking-tighter leading-[0.95] text-white mb-8">
              Skalujmy Twój <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/30 italic font-light pr-4 pb-2">biznes.</span>
            </h2>
            <p className="text-white/50 text-lg md:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto">
              Wybierz usługę, podaj szczegóły i pozwól nam przeanalizować Twoją sytuację rynkową podczas darmowego calla wstępnego.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href="/kontakt"
                className="group relative inline-flex items-center justify-center gap-3 bg-white text-background px-12 py-6 rounded-full font-bold text-lg hover:bg-white/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Rozpocznij projekt
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
    <Footer />
    </>
  );
}
