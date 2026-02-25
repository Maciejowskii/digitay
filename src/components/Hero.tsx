"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-60 mix-blend-screen" />
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] opacity-40 mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start max-w-2xl"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6 backdrop-blur-md"
            >
              Twój partner technologiczny
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] text-white mb-6"
            >
              Zamieniamy <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-300">pomysły</span> w działające produkty
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-muted leading-relaxed mb-10 max-w-xl"
            >
              Wystarczy pomysł – resztą zajmiemy się my: analizą, designem, developmentem i wdrożeniem. Skup się na wizji, my zajmiemy się realizacją.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Link 
                href="#cases"
                className="group relative flex items-center justify-center gap-3 bg-white text-background px-8 py-4 rounded-full font-semibold overflow-hidden transition-transform hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">Zobacz Case Study</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gray-200 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
              </Link>
              
              <Link 
                href="tel:+48535645322"
                className="flex items-center justify-center gap-3 bg-card border border-white/5 hover:border-primary/50 text-white px-8 py-4 rounded-full font-medium transition-all hover:bg-card/80 hover:shadow-[0_0_20px_rgba(25,163,84,0.15)]"
              >
                <Phone className="w-5 h-5 text-primary" />
                <span>+48 535 645 322</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Abstract Visual / Decorative */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, type: "spring" }}
            className="hidden lg:block relative h-[600px] w-full"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Abstract Glassmorphic Dashboard Representation */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-20 w-[80%] h-[70%] glass rounded-2xl border border-white/10 shadow-2xl p-6 flex flex-col gap-4 overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="h-4 w-24 bg-white/5 rounded-full" />
                </div>
                {/* Content lines */}
                <div className="flex gap-4 h-full pt-2">
                  <div className="w-1/3 flex flex-col gap-3">
                    <div className="h-20 bg-primary/10 rounded-xl border border-primary/20 backdrop-blur-md" />
                    <div className="h-10 bg-white/5 rounded-xl" />
                    <div className="h-10 bg-white/5 rounded-xl" />
                    <div className="h-full bg-white/5 rounded-xl" />
                  </div>
                  <div className="w-2/3 flex flex-col gap-3">
                    <div className="flex gap-3 h-24">
                       <div className="w-1/2 bg-white/5 rounded-xl" />
                       <div className="w-1/2 bg-white/5 rounded-xl" />
                    </div>
                    <div className="h-full bg-gradient-to-tr from-white/5 to-primary/5 rounded-xl border border-white/5 relative overflow-hidden">
                       {/* Chart simulation */}
                       <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                          <path d="M0 100 L0 80 Q25 60 50 70 T100 40 L100 100 Z" fill="rgba(25, 163, 84, 0.2)" />
                          <path d="M0 80 Q25 60 50 70 T100 40" fill="none" stroke="#19A354" strokeWidth="2" />
                       </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Decorative floating elements */}
              <motion.div 
                animate={{ y: [0, 20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 w-40 h-40 glass rounded-2xl z-30 flex items-center justify-center border border-white/10"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">+200%</div>
                  <div className="text-xs text-muted">Wzrost konwersji</div>
                </div>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, -25, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-10 -right-5 w-32 h-32 bg-primary/20 backdrop-blur-xl border border-primary/30 rounded-full z-10"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
