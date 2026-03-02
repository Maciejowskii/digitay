"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServicesBento from "@/components/ServicesBento";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ServicesClientPage({ allServices }: { allServices: any[] }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 overflow-hidden">
      
      {/* Huge Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24">
        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="font-mono text-xs text-white/40 tracking-widest uppercase mb-8"
        >
          // EKOSYSTEM USŁUG
        </motion.h3>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-[100px] font-heading font-black text-white leading-[0.9] tracking-tighter"
        >
          ARCHITEKTURA <br/> CYFROWA <br/> OD A DO Z.
        </motion.h1>
      </div>

      {/* Embedded Bento Grid (with its own padding and layout) */}
      <div className="-mt-16">
        <ServicesBento />
      </div>

      {/* Raw List View of Services */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-24">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 border-b border-white/10 pb-8">
          <h2 className="text-3xl md:text-5xl font-heading font-black text-white uppercase tracking-tighter">
            PEŁEN PRZEKRÓJ <br/> KOMPETENCJI
          </h2>
          <span className="font-mono text-xs tracking-widest text-primary uppercase mt-6 md:mt-0">
            [ SKOROWIDZ TECHNOLOGICZNY ]
          </span>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col border-t border-white/10"
        >
          {allServices.map((service, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Link 
                href={`/uslugi/${service.slug}`}
                className="group flex flex-col md:flex-row justify-between items-start md:items-center p-6 border-b border-white/10 hover:bg-white/5 transition-colors"
              >
                {/* Number & Title */}
                <div className="flex items-center gap-6 md:gap-12 mb-4 md:mb-0">
                  <span className="font-mono text-sm text-white/20">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-heading font-bold text-white uppercase tracking-tighter group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                </div>

                {/* Tags & Icon */}
                <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                  <div className="flex flex-wrap gap-2 md:max-w-md md:justify-end">
                      <span className="font-mono text-[10px] md:text-xs text-white/40 border border-white/10 px-3 py-1 group-hover:border-primary/30 group-hover:text-white transition-colors">
                        {service.basePrice || "Wycena indywidualna"}
                      </span>
                  </div>
                  <ArrowRight className="w-6 h-6 text-white/20 group-hover:text-primary group-hover:translate-x-2 transition-all shrink-0" />
                </div>
              </Link>
            </motion.div>
          ))}
          {allServices.length === 0 && (
             <div className="py-12 text-center text-zinc-500 font-mono text-sm uppercase">Brak opublikowanych usług w bazie.</div>
          )}
        </motion.div>
      </div>

    </main>
    <Footer />
    </>
  );
}
