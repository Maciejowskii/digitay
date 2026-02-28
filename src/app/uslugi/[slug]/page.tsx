"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight, Plus, Target, Zap, TrendingUp, CheckCircle2 } from "lucide-react";

// Mock Data for "Tworzenie Stron"
const serviceData = {
  title: "Projektowanie i Tworzenie Stron WWW",
  subtitle: "Twoja strona nie sprzedaje? Generuje koszty, zamiast zysków?",
  description: "Zmieniamy bezużyteczne wizytówki w maszyny do generowania leadów. Projektujemy zorientowane na konwersję, błyskawiczne i piękne strony, które pracują dla Ciebie 24/7.",
  
  // Dummy base64 placeholder for Next/Image Blur
  heroImage: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2940&auto=format&fit=crop",
  
  process: [
    { title: "Strategia & UX", desc: "Zaczynamy od zrozumienia Twojego biznesu i użytkowników.", icon: Target },
    { title: "Design & Development", desc: "Tworzymy unikalny, ultraszybki kod oparty na nowoczesnych technologiach.", icon: Zap },
    { title: "Optymalizacja & Wzrost", desc: "Testujemy, optymalizujemy i skalujemy Twoją nową cyfrową obecność.", icon: TrendingUp }
  ],
  
  faqs: [
    { q: "Ile trwa realizacja projektu?", a: "Standardowy projekt strony firmowej zajmuje nam przeważnie od 4 do 6 tygodni, w zależności od złożoności funkcjonalności oraz tempa akceptacji poszczególnych etapów." },
    { q: "Czy będę mógł sam edytować treść?", a: "Oczywiście. Każda strona wdrażana jest z intuicyjnym systemem CMS (dedykowanym panelem), który pozwala na samodzielną edycję tekstów, zdjęć i dodawanie aktualności bez wiedzy technicznej." },
    { q: "Czy pomagacie z tekstami i zdjęciami?", a: "Tak! Proces ten jest częścią naszej usługi kompleksowej. Możemy zorganizować sesję zdjęciową oraz napisać perswazyjne, sprzedażowe teksty (copywriting)." }
  ]
};

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

export default function ServicePage({ params }: { params: { slug: string } }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden">
      
      {/* 
        ====================================================
        HERO SECTION
        ====================================================
      */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={textReveal} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-100 text-sm font-medium text-zinc-600 mb-8">
             <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
             Usługa Premium
          </motion.div>

          {/* Staggered Text Reveal */}
          <motion.h1 
            variants={textReveal}
            className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 mb-6 font-display" // Assuming Plus Jakarta Sans is set globally or extended in config as font-display
          >
            {serviceData.title}
          </motion.h1>

          <motion.div variants={textReveal}>
             <p className="text-xl md:text-2xl text-zinc-700 font-medium mb-4">
                {serviceData.subtitle}
             </p>
             <p className="text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed mb-10">
                {serviceData.description}
             </p>
          </motion.div>

          <motion.div variants={textReveal} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Magnetic/Organic Hover CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-zinc-900 text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-zinc-800 transition-colors shadow-lg"
            >
              Darmowa Konsultacja
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-zinc-900 border border-zinc-200 px-8 py-4 rounded-full font-medium hover:bg-zinc-50 transition-colors"
            >
              Zobacz realizacje
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Lazy Loaded Hero Image with blur placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="w-full mt-20 md:mt-32 rounded-[2rem] overflow-hidden border border-zinc-100 shadow-2xl shadow-indigo-500/5 relative aspect-video max-h-[600px] bg-zinc-100"
        >
           <Image
             src={serviceData.heroImage}
             alt={serviceData.title}
             fill
             className="object-cover"
             sizes="(max-width: 1280px) 100vw, 1280px"
             priority // Hero image should load immediately in LCP
           />
           {/* Soft glow overlay */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>
      </section>

      {/* 
        ====================================================
        PROCESS (JAK PRACUJEMY) - Scroll-Triggered Parallax
        ====================================================
      */}
      <section className="py-24 md:py-32 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4">Jak pracujemy</h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">Nasz sprawdzony 3-etapowy proces, który gwarantuje dostarczenie produktu najwyższej jakości.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
             {/* Connecting line for desktop */}
             <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-px bg-zinc-200 z-0" />

             {serviceData.process.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }} // Staggered reveal on scroll
                  className="relative z-10 flex flex-col items-center text-center group"
                >
                   {/* Parallax Icon Container */}
                   <motion.div 
                     whileHover={{ y: -5 }} // Slight hover lift
                     className="w-24 h-24 rounded-2xl bg-white border border-zinc-100 shadow-sm flex items-center justify-center mb-6 text-indigo-600 transition-colors group-hover:border-indigo-100 group-hover:bg-indigo-50/50"
                   >
                     <step.icon className="w-8 h-8" />
                   </motion.div>
                   
                   <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm w-full h-full">
                      <div className="text-indigo-600 font-bold mb-2">Krok 0{idx + 1}</div>
                      <h3 className="text-xl font-bold text-zinc-900 mb-3">{step.title}</h3>
                      <p className="text-zinc-500 leading-relaxed text-sm md:text-base">{step.desc}</p>
                   </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* 
        ====================================================
        FAQ SECTION - Animated Accordion
        ====================================================
      */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
           <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
           >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4">Najczęstsze Pytania</h2>
              <p className="text-lg text-zinc-500">Wszystko, co musisz wiedzieć przed rozpoczęciem współpracy.</p>
           </motion.div>

           <div className="flex flex-col gap-4">
              {serviceData.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;

                return (
                  <motion.div
                     key={idx}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: idx * 0.1 }}
                     className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${
                       isOpen ? "bg-zinc-50/50 border-zinc-200" : "bg-white border-zinc-100 hover:border-zinc-200"
                     }`}
                  >
                     <button
                       onClick={() => setOpenFaq(isOpen ? null : idx)}
                       className="w-full px-6 py-6 flex items-center justify-between text-left focus:outline-none"
                     >
                        <span className="font-semibold text-lg text-zinc-900 pr-8">{faq.q}</span>
                        {/* Spring Physics Rotation */}
                        <motion.div
                           animate={{ rotate: isOpen ? 45 : 0 }}
                           transition={{ type: "spring", stiffness: 200, damping: 15 }}
                           className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                              isOpen ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-500"
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
                              <div className="px-6 pb-6 text-zinc-600 leading-relaxed">
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
      <section className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="bg-zinc-900 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden"
         >
            {/* Background design elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] -translate-y-1/2" />
              <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[120px] -translate-y-1/2" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Gotowy na zmianę?</h2>
               <p className="text-zinc-400 text-lg mb-10">Porozmawiajmy o tym, jak możemy pomóc Twojej firmie rosnąć w cyfrowym świecie.</p>
               
               <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-zinc-900 px-8 py-4 rounded-full font-bold inline-flex items-center gap-2 hover:bg-zinc-100 transition-colors shadow-xl"
               >
                  Darmowa wycena
                  <Zap className="w-4 h-4 text-indigo-600" />
               </motion.button>
            </div>
         </motion.div>
      </section>

    </div>
  );
}
