"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import React from "react";

const cases = [
  {
    title: "QuickPick B2B Platform",
    year: "2024",
    client: "QuickPick SA",
    metric1: "+200k",
    metric1Label: "PLN W Q1",
    metric2: "85%",
    metric2Label: "Mniej Błędów",
    tag: "E-commerce & App",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "FitLife CRM Ecosystem",
    year: "2023",
    client: "FitLife Group",
    metric1: "45%",
    metric1Label: "Więcej rezerwacji",
    metric2: "4",
    metric2Label: "Zastąpione aplikacje",
    tag: "Custom Software",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "EcoEnergy Organic Growth",
    year: "2024",
    client: "EcoEnergy Sp z o.o.",
    metric1: "3x",
    metric1Label: "Wzrost CVR",
    metric2: "Top 3",
    metric2Label: "Wyniki Google",
    tag: "SEO & Web Design",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function CaseStudies() {
  return (
    <section id="cases" className="py-32 border-b border-white/10 bg-[#07101B]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header section  */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <span className="font-mono text-xs tracking-widest text-muted uppercase mb-4 block">
              [03 // CASE STUDIES]
            </span>
            <h2 className="text-5xl md:text-7xl font-heading font-black text-white uppercase tracking-tighter leading-[0.9]">
              WYNIKI, NIE <br className="hidden md:block"/> <span className="text-primary italic font-light tracking-normal">OBIETNICE.</span>
            </h2>
          </div>
          
          <motion.button 
            whileHover={{ backgroundColor: "#ffffff" }}
            className="flex items-center gap-4 border border-white/20 bg-background px-8 py-5 uppercase text-xs font-bold tracking-widest hover:bg-white hover:text-black hover:border-white transition-colors duration-0 rounded-none shrink-0"
          >
            Pełne portfolio
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 border border-white/10">
          
          {/* Featured Large Case Study (Left) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="bg-[#07101B] p-8 md:p-12 lg:row-span-2 flex flex-col group hover:bg-[#0A131F] transition-colors duration-0 relative overflow-hidden"
          >
            {/* Top Info row */}
            <div className="flex justify-between items-start font-mono text-xs text-muted uppercase tracking-widest mb-12 border-b border-white/10 pb-4">
               <div>{cases[0].client}</div>
               <div>{cases[0].year}</div>
            </div>

            {/* Content Container */}
            <div className="flex-1 flex flex-col justify-end relative z-10">
               <h3 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tighter mb-8 max-w-sm">
                 {cases[0].title}
               </h3>
               
               <div className="mb-12">
                 <div className="text-[100px] md:text-[140px] font-heading font-black leading-none text-white tracking-tighter group-hover:text-primary transition-colors duration-0">
                   {cases[0].metric1}
                 </div>
                 <div className="font-mono text-sm uppercase tracking-widest text-muted mt-2 ml-2">
                   {cases[0].metric1Label}
                 </div>
               </div>
            </div>

            {/* Media Reveal on Hover */}
            <div className="w-full h-72 border border-white/10 bg-black overflow-hidden relative grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
               <div className="absolute top-4 right-4 bg-black border border-white/10 px-3 py-1 font-mono text-[10px] text-white/50 z-10 uppercase">{cases[0].tag}</div>
               <img src={cases[0].image} alt="Case study visual" className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-300 group-hover:scale-105" />
            </div>
            
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="w-12 h-12 border border-primary flex items-center justify-center bg-black hover:bg-primary hover:text-black text-primary transition-colors cursor-pointer">
                  <ArrowUpRight className="w-6 h-6" />
               </div>
            </div>
          </motion.div>

          {/* Grid Right: Smaller Case Study 1 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#07101B] p-8 md:p-10 flex flex-col justify-between group hover:bg-[#0A131F] transition-colors duration-0 relative overflow-hidden"
          >
            {/* Top Info row */}
            <div className="flex justify-between items-start font-mono text-xs text-muted uppercase tracking-widest mb-8 border-b border-white/10 pb-4">
               <div>{cases[1].client}</div>
               <div className="flex items-center gap-4">
                 <span>{cases[1].tag}</span>
                 <span>{cases[1].year}</span>
               </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-end justify-between relative z-10 mb-8">
               <h3 className="text-3xl font-heading font-black text-white uppercase tracking-tighter max-w-[250px]">
                 {cases[1].title}
               </h3>
               
               <div className="text-right">
                 <div className="text-6xl md:text-8xl font-heading font-black leading-none text-white tracking-tighter group-hover:text-primary transition-colors duration-0">
                   {cases[1].metric1}
                 </div>
                 <div className="font-mono text-[10px] uppercase tracking-widest text-muted mt-1">
                   {cases[1].metric1Label}
                 </div>
               </div>
            </div>

            <div className="w-full h-40 border border-white/10 bg-black overflow-hidden relative grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 mt-auto">
               <img src={cases[1].image} alt="Case study visual" className="w-full h-full object-cover opacity-50 mix-blend-luminosity group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-300 group-hover:scale-105" />
            </div>
          </motion.div>

          {/* Grid Right: Smaller Case Study 2 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#07101B] p-8 md:p-10 flex flex-col justify-between group hover:bg-[#0A131F] transition-colors duration-0 relative overflow-hidden"
          >
            {/* Top Info row */}
            <div className="flex justify-between items-start font-mono text-xs text-muted uppercase tracking-widest mb-8 border-b border-white/10 pb-4">
               <div>{cases[2].client}</div>
               <div className="flex items-center gap-4">
                 <span>{cases[2].tag}</span>
                 <span>{cases[2].year}</span>
               </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-end justify-between relative z-10 mb-8">
               <h3 className="text-3xl font-heading font-black text-white uppercase tracking-tighter max-w-[250px]">
                 {cases[2].title}
               </h3>
               
               <div className="text-right">
                 <div className="text-6xl md:text-8xl font-heading font-black leading-none text-white tracking-tighter group-hover:text-primary transition-colors duration-0">
                   {cases[2].metric1}
                 </div>
                 <div className="font-mono text-[10px] uppercase tracking-widest text-muted mt-1">
                   {cases[2].metric1Label}
                 </div>
               </div>
            </div>

            <div className="w-full h-40 border border-white/10 bg-black overflow-hidden relative grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 mt-auto">
               <img src={cases[2].image} alt="Case study visual" className="w-full h-full object-cover opacity-50 mix-blend-luminosity group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-300 group-hover:scale-105" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
