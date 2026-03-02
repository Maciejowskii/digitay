"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  // Text Reveal Variants
  const sentence: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const word: Variants = {
    hidden: { y: "110%", opacity: 0 },
    visible: { y: "0%", opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center bg-transparent overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      
      {/* 
        Ultra Minimalist Glow 
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-center items-center">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-brand-green/10 blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center mt-12 md:mt-24">
        
        {/* 
          Massive Typography
        */}
        <motion.h1 
          variants={sentence}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-heading font-black leading-[1] text-zinc-100 tracking-tight mb-8 w-full max-w-4xl"
        >
          <div className="overflow-hidden pb-1"><motion.span variants={word} className="inline-block">Zamieniamy pomysły</motion.span></div>
          <div className="overflow-hidden pb-1"><motion.span variants={word} className="inline-block">w działające produkty.</motion.span></div>
        </motion.h1>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl font-medium leading-relaxed mb-16"
        >
          Cyfrowa agencja i software house. Analiza, design, development i wdrożenie na najwyższym poziomie.
        </motion.p>
        
        {/* 
          Main Call To Actions 
        */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
           className="flex flex-col sm:flex-row items-center gap-6"
        >
           {/* Primary CTA: Minimalist high contrast */}
           <Link 
             href="#contact" 
             className="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold tracking-wide uppercase text-sm hover:-translate-y-1 hover:shadow-[0_10px_40px_-15px_rgba(255,255,255,0.5)] transition-all duration-300 ease-out"
           >
              Porozmawiajmy o projekcie
           </Link>

           {/* Secondary CTA: Elegant Arrow */}
           <Link href="#cases" className="group flex items-center gap-3 text-sm font-bold tracking-widest text-zinc-400 hover:text-white uppercase transition-all duration-300 py-4 px-6">
              Zobacz realizacje
              <ArrowRightCircle className="w-5 h-5 text-zinc-500 group-hover:translate-x-1 group-hover:text-white transition-all duration-300 ease-out" />
           </Link>
        </motion.div>

      </div>
    </section>
  );
}
