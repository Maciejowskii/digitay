"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ServicesBento() {
  return (
    <section id="services" className="py-32 max-w-7xl mx-auto px-6 md:px-12 border-b border-white/10 relative bg-transparent">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
        <div>
          <span className="font-mono text-xs tracking-widest text-muted uppercase mb-4 block">
            [02 // NASZE USŁUGI]
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white uppercase leading-[0.9] tracking-tighter">
            ROBIMY TO,<br /> W CZYM JESTEŚMY <br /> <span className="text-primary italic font-light tracking-normal pr-2">NAJLEPSI</span>.
          </h2>
        </div>
        <p className="text-muted max-w-xs text-sm leading-relaxed font-medium">
          Dostarczamy skalowalne produkty cyfrowe: od zaawansowanych aplikacji po infrastrukturę e-commerce.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-transparent rounded-none">
        
        {/* Service 01 */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="bg-transparent group relative p-8 md:p-12 min-h-[450px] flex flex-col justify-between hover:border-primary transition-colors duration-0 lg:col-span-2 overflow-hidden border border-white/10"
        >
          {/* Massive Structural Number */}
          <div className="absolute -bottom-12 -right-12 text-[250px] md:text-[300px] font-heading font-black text-white/5 leading-none pointer-events-none select-none tracking-tighter">
            01
          </div>
          
          <div className="relative z-10 w-full mb-8">
            <h3 className="text-3xl lg:text-5xl font-heading font-black text-white uppercase mb-4 tracking-tighter">Aplikacje Mobilne</h3>
            <p className="text-muted text-sm max-w-md font-medium leading-relaxed">
              Natywne i wieloplatformowe rozwiązania (iOS/Android). Tworzymy wydajne, bezkompromisowe oprogramowanie dla wymagających użytkowników.
            </p>
          </div>
          
          {/* High-Fidelity UI Snippet Placeholder */}
          <div className="relative z-10 w-full h-56 mt-auto border-t border-r border-white/10 bg-black/40 relative overflow-hidden flex items-end ml-12">
             <div className="text-[10px] font-mono text-white/40 absolute top-4 left-4 tracking-widest bg-black px-2 py-1">UI_SNIPPET // MOBILE APP</div>
             
             {/* Mocked UI Area */}
             <div className="w-[80%] h-[80%] bg-black border-t border-l border-r border-white/20 flex flex-col">
               <div className="flex justify-between items-center px-4 py-3 border-b border-white/10">
                 <div className="w-4 h-4 rounded-full border border-white/30" />
                 <div className="w-16 h-2 bg-white/20 rounded-full" />
                 <div className="w-4 h-4 rounded-sm border border-white/30" />
               </div>
               <div className="flex-1 p-4 flex flex-col gap-4">
                 <div className="w-full h-24 bg-white/5 border border-white/10" />
                 <div className="flex gap-4">
                   <div className="w-1/2 h-16 bg-white/5 border border-white/10" />
                   <div className="w-1/2 h-16 bg-white/5 border border-white/10" />
                 </div>
               </div>
             </div>
          </div>
        </motion.div>

        {/* Service 02 */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-transparent group relative p-8 md:p-12 min-h-[450px] flex flex-col justify-between hover:border-primary transition-colors duration-0 overflow-hidden border border-white/10"
        >
          <div className="absolute -top-16 -right-16 text-[250px] md:text-[300px] font-heading font-black text-white/5 leading-none pointer-events-none select-none tracking-tighter">
            02
          </div>
          
          <div className="relative z-10 w-full mb-8">
            <h3 className="text-3xl lg:text-5xl font-heading font-black text-white uppercase mb-4 break-words tracking-tighter">Sklepy <br/> e-Commerce</h3>
            <p className="text-muted text-sm font-medium leading-relaxed">
              Architektura konwersji. Sklepy zoptymalizowane do ułamków sekund pod kątem agresywnej sprzedaży.
            </p>
          </div>

          <div className="relative z-10 w-full h-56 mt-auto border-t border-l border-white/10 bg-black/40 flex items-center justify-center overflow-hidden mr-12 -ml-8">
            <div className="text-[10px] font-mono text-white/40 absolute bottom-4 right-4 tracking-widest bg-black px-2 py-1">UI_SNIPPET // DASHBOARD</div>
            
            {/* Mocked UI Area */}
            <div className="w-[90%] h-[90%] bg-black border border-white/20 flex p-3 gap-3">
               <div className="w-12 h-full bg-white/5 border border-white/10 flex flex-col gap-2 p-2">
                 <div className="w-full aspect-square bg-white/20" />
                 <div className="w-full aspect-square bg-white/10" />
                 <div className="w-full aspect-square bg-white/10" />
               </div>
               <div className="flex-1 h-full flex flex-col gap-3">
                 <div className="w-1/2 h-3 bg-white/20" />
                 <div className="w-full flex-1 bg-white/5 border border-white/10 p-2 flex items-end gap-2">
                    <div className="w-1/4 h-1/2 bg-white/10" />
                    <div className="w-1/4 h-3/4 bg-white/10" />
                    <div className="w-1/4 h-full bg-primary/20 border border-primary/50" />
                    <div className="w-1/4 h-1/4 bg-white/10" />
                 </div>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Service 03 */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-transparent group relative p-8 md:p-12 lg:col-span-3 min-h-[250px] flex flex-col md:flex-row items-start md:items-center justify-between hover:border-primary transition-colors duration-0 overflow-hidden border border-white/10 gap-8"
        >
          <div className="absolute top-1/2 -translate-y-1/2 left-0 md:left-20 text-[200px] md:text-[350px] font-heading font-black text-white/5 leading-none pointer-events-none select-none tracking-tighter">
            03
          </div>
          
          <div className="relative z-10 flex-1 max-w-3xl ml-auto md:text-right flex flex-col md:items-end">
            <h3 className="text-3xl md:text-6xl font-heading font-black text-white uppercase mb-4 tracking-tighter">Pozycjonowanie SEO</h3>
            <p className="text-muted text-sm font-medium leading-relaxed max-w-lg mb-8">
              Strategia oparta o twarde dane. Techniczne audyty i dominacja w wynikach wyszukiwania. Zero magii, czysta inżynieria organicznego ruchu.
            </p>
            <button className="inline-flex items-center gap-4 bg-white text-black px-10 py-5 uppercase text-sm font-bold tracking-widest hover:bg-primary transition-colors rounded-sm">
               Szczegóły oferty
               <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
