"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-16 flex flex-col justify-center border-b border-white/10 bg-grid-pattern overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10">
        
        {/* Top Label */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs tracking-widest text-muted uppercase mb-8 flex items-center gap-4"
        >
          <span>DIGITAY // EST. 2025</span>
          <div className="h-px bg-white/20 flex-1 max-w-[150px]" />
        </motion.div>

        {/* Massive Typography */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[140px] font-heading font-black leading-[0.85] text-white uppercase max-w-[1200px] mb-12 tracking-tighter mix-blend-difference"
        >
          ZAMIENIAMY WIZJE <br/>
          W <span className="italic font-light text-primary">Działające</span> <br/>
          PRODUKTY
        </motion.h1>

        {/* Content & Action */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 mb-20">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg text-muted max-w-md font-medium leading-relaxed"
          >
            Surowa precyzja, inżynieria kodu i design nastawiony na najwyższą konwersję. Tworzymy narzędzia cyfrowe dla liderów rynku.
          </motion.p>
          
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link 
              href="#cases"
              className="group inline-flex items-center gap-4 bg-primary text-[#07101B] px-10 py-5 text-sm font-bold tracking-widest uppercase rounded-sm transition-colors hover:bg-white"
            >
              Zobacz realizacje
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Video Reel Placeholder (Raw Media Container) */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.5 }}
           className="w-full aspect-[21/9] bg-[#0A131F] border border-white/10 rounded-none relative group cursor-pointer overflow-hidden flex items-center justify-center transition-colors hover:border-white/30"
        >
           {/* Visual inside the Raw Media Container */}
           <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300">
               <div className="w-full h-full opacity-40 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity" />
               <div className="text-white/20 font-mono text-4xl font-bold uppercase tracking-widest absolute z-0 select-none pointer-events-none">RAW MEDIA REEL</div>
           </div>
           
           {/* Center Play Button indicator */}
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="w-24 h-24 bg-black border border-white/20 flex items-center justify-center group-hover:border-primary transition-colors duration-300 rounded-none">
                 <Play className="w-10 h-10 text-white fill-white ml-2 group-hover:text-primary transition-colors duration-300" />
              </div>
           </div>
           
           {/* Target Corners */}
           <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20 m-4 pointer-events-none" />
           <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/20 m-4 pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/20 m-4 pointer-events-none" />
           <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20 m-4 pointer-events-none" />

           {/* Info Label overlay */}
           <div className="absolute bottom-6 right-8 px-4 py-2 bg-black border border-white/10 text-xs font-mono text-white/70 uppercase z-10 rounded-none">
             REC // SHOWREEL 01
           </div>
        </motion.div>

      </div>
    </section>
  );
}
