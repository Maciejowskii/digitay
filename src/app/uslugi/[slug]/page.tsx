"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight, Plus, Target, Zap, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { db } from "@/db";
import { services } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

// --- Animations ---
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const textReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

export default async function ServicePage({ params }: { params: { slug: string } }) {
  // Fetch from DB
  const fetchedServices = await db.select().from(services).where(eq(services.slug, params.slug)).limit(1);
  const serviceDb = fetchedServices[0];

  if (!serviceDb) {
    notFound();
  }

  // Still mocking static sections that aren't dynamic in DB schema yet
  const processData = [
    { title: "Strategia & UX", desc: "Zaczynamy od zrozumienia Twojego biznesu i użytkowników.", icon: Target },
    { title: "Design & Development", desc: "Tworzymy unikalny, ultraszybki kod oparty na nowoczesnych technologiach.", icon: Zap },
    { title: "Optymalizacja & Wzrost", desc: "Testujemy, optymalizujemy i skalujemy Twoją nową cyfrową obecność.", icon: TrendingUp }
  ];
  const faqsData = [
    { q: "Ile trwa realizacja projektu?", a: "To zależy od specyfikacji. Zazwyczaj proces od założeń do uruchomienia to przedział między 4 a 12 tygodni intensywnej pracy inżynierskiej." },
    { q: "Jak wygląda rozliczenie?", a: "Preferujemy transparentny model. Często jest to wpłata początkowa oraz rozliczenie po konkretnych, zatwierdzonych kamieniach milowych (Milestones)." },
    { q: "Czy otrzymam wsparcie po uruchomieniu?", a: "Tak. Budujemy relacje długoterminowe. Każdy nasz produkt objęty jest ścisłym SLA i opcją stałego utrzymania." }
  ];

  return <ServicePageClient serviceData={serviceDb} process={processData} faqs={faqsData} />;
}

// Client Component Wrapper
function ServicePageClient({ serviceData, process, faqs }: { serviceData: any, process: any, faqs: any }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
    <Navbar />
    <div className="bg-transparent min-h-screen font-sans selection:bg-primary/20 selection:text-white overflow-hidden">
      
      {/* 
        ====================================================
        HERO SECTION - TECH BRUTALISM
        ====================================================
      */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto relative z-10"
        >
          <motion.div variants={textReveal} className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/5 font-mono text-xs tracking-widest text-primary uppercase mb-8">
             <span className="w-1.5 h-1.5 rounded-none bg-primary animate-pulse" />
             [ USŁUGA PREMIUM ]
          </motion.div>

          {/* Staggered Text Reveal */}
          <motion.h1 
            variants={textReveal as any}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-black uppercase text-white tracking-tighter mb-6 leading-[0.9] break-words"
          >
            {serviceData.name}
          </motion.h1>

          <motion.div variants={textReveal as any}>
             <p className="text-xl md:text-2xl text-white font-medium mb-4 uppercase tracking-tight">
                ZBUDUJEMY TO RAZEM.
             </p>
             <p className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
                {serviceData.description || "Skontaktuj się z nami w celu omówienia szczegółów tej zaawansowanej usługi."}
             </p>
          </motion.div>

          <motion.div variants={textReveal} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Magnetic/Organic Hover CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-8 py-5 rounded-none font-bold uppercase text-xs tracking-widest flex items-center gap-4 hover:bg-primary transition-colors shadow-lg"
            >
              Darmowa Konsultacja
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent text-white border border-white/20 px-8 py-5 rounded-none font-bold uppercase text-xs tracking-widest hover:bg-white/5 hover:border-white/40 transition-colors"
            >
              Zobacz realizacje
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="w-full mt-20 md:mt-32 rounded-none overflow-hidden border border-white/10 relative aspect-[21/9] max-h-[600px] bg-white/5"
        >
           <Image
             src={"https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2940&auto=format&fit=crop"} // Default hero generic for now
             alt={serviceData.name}
             fill
             className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 grayscale hover:grayscale-0"
             sizes="(max-width: 1280px) 100vw, 1280px"
             priority // Hero image should load immediately in LCP
           />
           {/* Soft glow overlay */}
           <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </motion.div>
      </section>

      {/* 
        ====================================================
        PROCESS (JAK PRACUJEMY)
        ====================================================
      */}
      <section className="py-24 md:py-32 border-y border-white/10 relative overflow-hidden">
        {/* CSS GRID Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }} />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between md:items-end mb-20 gap-8"
          >
            <div>
              <span className="font-mono text-xs tracking-widest text-primary uppercase mb-4 block">
                [ PROCES OPERACYJNY ]
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black uppercase text-white tracking-tighter leading-none">
                JAK PRACUJEMY.
              </h2>
            </div>
            <p className="text-sm text-zinc-400 font-medium max-w-sm">Nasz sprawdzony 3-etapowy proces, który gwarantuje dostosowanie się do reżimu technologicznego najwyższej jakości.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10 relative">
             {process.map((step: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }} // Staggered reveal on scroll
                  className={`bg-black/40 p-8 md:p-12 relative flex flex-col items-start border-b md:border-b-0 md:border-r border-white/10 last:border-b-0 last:border-r-0 hover:bg-white/5 transition-colors duration-500`}
                >
                   {/* Giant faded number */}
                   <div className="absolute top-4 right-4 text-[100px] md:text-[150px] font-heading font-black text-white/5 leading-none pointer-events-none select-none tracking-tighter">
                      0{idx + 1}
                   </div>
                   
                   <div className="relative z-10 w-full">
                       <div className="w-16 h-16 border border-white/10 bg-black flex items-center justify-center mb-8 text-primary">
                         <step.icon className="w-6 h-6" />
                       </div>
                       
                       <h3 className="text-2xl font-heading font-black text-white uppercase mb-4 tracking-tighter">{step.title}</h3>
                       <p className="text-zinc-400 leading-relaxed text-sm font-medium">{step.desc}</p>
                   </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* 
        ====================================================
        FAQ SECTION
        ====================================================
      */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
           <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
           >
              <h2 className="text-4xl md:text-6xl font-heading font-black uppercase text-white tracking-tighter mb-6">PYTANIA / FAQ</h2>
              <p className="text-sm font-mono text-zinc-500 uppercase tracking-widest">[ CO MUSISZ WIEDZIEĆ PRZED STARTEM ]</p>
           </motion.div>

           <div className="flex flex-col border-t border-white/10">
              {faqs.map((faq: any, idx: number) => {
                const isOpen = openFaq === idx;

                return (
                  <motion.div
                     key={idx}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: idx * 0.1 }}
                     className={`border-b border-white/10 overflow-hidden transition-colors duration-300 ${
                       isOpen ? "bg-white/5" : "bg-transparent hover:bg-white/5"
                     }`}
                  >
                     <button
                       onClick={() => setOpenFaq(isOpen ? null : idx)}
                       className="w-full px-6 py-8 flex items-center justify-between text-left focus:outline-none"
                     >
                        <span className="font-heading font-bold uppercase text-lg md:text-xl text-white pr-8 tracking-tighter">{faq.q}</span>
                        {/* Spring Physics Rotation */}
                        <motion.div
                           animate={{ rotate: isOpen ? 45 : 0 }}
                           transition={{ type: "spring", stiffness: 200, damping: 15 }}
                           className={`flex-shrink-0 w-8 h-8 rounded-none border flex items-center justify-center transition-colors ${
                              isOpen ? "bg-primary border-primary text-black" : "bg-transparent border-white/10 text-zinc-500"
                           }`}
                        >
                           <Plus className="w-4 h-4" />
                        </motion.div>
                     </button>
                     
                     <AnimatePresence>
                        {isOpen && (
                           <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                           >
                              <div className="px-6 pb-8 text-zinc-400 font-medium leading-relaxed text-sm md:text-base border-t border-white/5 pt-6 mt-2 mx-6">
                                 {faq.a}
                              </div>
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </motion.div>
                );
              })}
           </div>
        </div>
      </section>

      {/* 
        ====================================================
        BOTTOM CTA
        ====================================================
      */}
      <section className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/10 relative">
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="bg-primary p-12 md:p-24 text-center relative overflow-hidden rounded-none"
         >
            {/* Background design elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '2rem 2rem' }} />
            
            <div className="absolute font-heading font-black text-black/10 text-[20vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none tracking-tighter whitespace-nowrap">
               START NOW
            </div>

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
               <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-black uppercase mb-6 tracking-tighter leading-none">Gotowy na zmianę?</h2>
               <p className="text-black/70 font-bold mb-10 max-w-md uppercase tracking-tight">Porozmawiajmy o tym, jak możemy pomóc Twojej firmie rosnąć w cyfrowym świecie.</p>
               
               <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black text-white px-10 py-5 font-bold uppercase text-sm tracking-widest inline-flex items-center gap-4 hover:bg-black/80 transition-colors shadow-2xl"
               >
                  Darmowa wycena
                  <ArrowRight className="w-5 h-5 text-primary" />
               </motion.button>
            </div>
         </motion.div>
      </section>

    </div>
    <Footer />
    </>
  );
}
