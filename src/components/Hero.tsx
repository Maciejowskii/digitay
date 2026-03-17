"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 py-32 overflow-hidden bg-background">
      {/* 
        ====================================================
        GRID BACKGROUND - TECH BRUTALISM
        ====================================================
      */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }} 
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Top Label */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-20"
        >
          <span className="font-mono text-xs text-white/40 tracking-[0.2em] uppercase">
             Digitay // Est. 2025
          </span>
          <div className="h-[1px] w-24 bg-white/10" />
        </motion.div>

        <div className="relative">
          {/* Main Heading Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-0 select-none"
          >
            <h1 className="text-[12vw] md:text-[8vw] lg:text-[140px] font-heading font-black text-white leading-[0.85] tracking-tighter uppercase">
               Zamieniamy
            </h1>
            <h1 className="text-[12vw] md:text-[8vw] lg:text-[140px] font-heading font-black text-white leading-[0.85] tracking-tighter uppercase">
               Wizje
            </h1>
            
            <div className="flex items-baseline gap-x-3 md:gap-x-6 whitespace-nowrap overflow-visible">
              <h1 className="text-[12vw] md:text-[8vw] lg:text-[140px] font-heading font-black text-white leading-[0.9] tracking-tighter uppercase line-clamp-1">
                W
              </h1>
              <span className="text-[13vw] md:text-[9vw] lg:text-[150px] text-primary italic font-extralight tracking-tighter leading-none inline-block transform -translate-y-[0.5vw] md:-translate-y-[15px] opacity-90">
                Działające
              </span>
            </div>
            
            <h1 className="text-[12vw] md:text-[8vw] lg:text-[140px] font-heading font-black text-white leading-[0.9] tracking-tighter uppercase">
               Produkty
            </h1>
          </motion.div>

          {/* Bottom row with description and CTA */}
          <div className="mt-16 md:mt-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="max-w-sm"
            >
               <p className="text-sm md:text-base text-zinc-500 leading-relaxed font-medium uppercase tracking-tight">
                  Surowa precyzja, inżynieria kodu i design nastawiony na najwyższą konwersję. Tworzymy narzędzia cyfrowe dla liderów rynku.
               </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link 
                href="/case-study" 
                className="inline-flex items-center gap-6 bg-primary text-black px-12 py-6 font-bold uppercase text-[10px] md:text-xs tracking-[0.2em] hover:bg-white transition-all duration-500 shadow-2xl group border-none"
              >
                Zobacz realizacje
                <ArrowRightCircle className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Visual edge detail */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
