"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BarChart3, Users, Zap } from "lucide-react";
import Image from "next/image";

const cases = [
  {
    title: "QuickPick",
    description: "Kompleksowe wdrożenie e-commerce B2B wraz z aplikacją mobilną do szybkiego skanowania produktów.",
    metric: "+200 000 zł",
    metricLabel: "Dodatkowego przychodu w Q1",
    tag: "E-commerce & App",
    icon: <Zap className="w-5 h-5 text-yellow-400" />
  },
  {
    title: "FitLife CRM",
    description: "System do zarządzania siecią siłowni i rezerwacji online. Zastąpienie 4 niezależnych narzędzi.",
    metric: "45%",
    metricLabel: "Więcej rezerwacji online",
    tag: "Custom Software",
    icon: <Users className="w-5 h-5 text-blue-400" />
  },
  {
    title: "EcoEnergy",
    description: "Optymalizacja procesu i wdrożenie Landing Page ze wsparciem SEO dla branży OZE.",
    metric: "3x",
    metricLabel: "Wzrost konwersji z leadów",
    tag: "Web Design & SEO",
    icon: <BarChart3 className="w-5 h-5 text-primary" />
  }
];

export default function CaseStudies() {
  return (
    <section id="cases" className="py-24 max-w-7xl mx-auto px-6 md:px-12 bg-background border-t border-white/5">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">
            [ Case study ]
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white max-w-xl">
            Sprawdź nasze <span className="text-primary">realizacje</span>
          </h2>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-background font-semibold hover:bg-white/90 transition-colors"
        >
          Wszystkie projekty
          <ArrowUpRight className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cases.map((study, idx) => (
          <motion.div
            key={study.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="group relative bg-[#111A24] rounded-3xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300"
          >
            {/* Image Placeholder with gradient overlay */}
            <div className="h-48 relative overflow-hidden bg-white/5">
              <div className="absolute inset-0 bg-gradient-to-t from-[#111A24] to-transparent z-10" />
              {/* Abstract pattern instead of image */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/40 via-background to-background group-hover:scale-110 duration-700" />
              
              <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-medium text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {study.tag}
              </div>
            </div>

            <div className="p-8 pt-0 relative z-20">
              <h3 className="text-2xl font-heading font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {study.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-8">
                {study.description}
              </p>
              
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all">
                <div className="mt-1 bg-white/10 p-2 rounded-lg">
                  {study.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-white font-heading">
                    {study.metric}
                  </div>
                  <div className="text-xs text-muted mt-1 font-medium">
                    {study.metricLabel}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-3xl pointer-events-none transition-colors" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
