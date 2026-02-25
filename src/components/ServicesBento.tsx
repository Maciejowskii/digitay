"use client";

import { motion } from "framer-motion";
import { Smartphone, ShoppingCart, TrendingUp } from "lucide-react";

export default function ServicesBento() {
  return (
    <section id="services" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
      <div className="mb-16">
        <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">
          [ Nasze usługi ]
        </span>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white max-w-2xl">
          Robimy to w czym jesteśmy <span className="text-primary">najlepsi</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {/* Card 1: Mobile Apps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="group relative bg-[#111A24] border border-white/10 rounded-3xl p-8 overflow-hidden lg:col-span-2 lg:row-span-1 min-h-[300px] flex flex-col justify-between hover:border-primary/50 transition-colors"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] group-hover:bg-primary/10 transition-colors" />
          
          <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <Smartphone className="w-7 h-7 text-white" />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3 group-hover:text-primary transition-colors">
              Aplikacje mobilne
            </h3>
            <p className="text-muted leading-relaxed max-w-md">
              Tworzymy natywne i hybrydowe aplikacje na Android i iOS, które użytkownicy kochają za płynność, design i niezawodność.
            </p>
          </div>
          
          {/* Abstract graphic */}
          <div className="absolute right-8 bottom-8 w-32 h-40 hidden md:flex items-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
             <motion.div className="w-1/3 bg-white/10 rounded-t-xl" initial={{ height: "40%" }} whileHover={{ height: "60%" }} />
             <motion.div className="w-1/3 bg-primary/40 rounded-t-xl" initial={{ height: "60%" }} whileHover={{ height: "90%" }} />
             <motion.div className="w-1/3 bg-white/20 rounded-t-xl" initial={{ height: "30%" }} whileHover={{ height: "50%" }} />
          </div>
        </motion.div>

        {/* Card 2: E-commerce */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="group relative bg-[#111A24] border border-white/10 rounded-3xl p-8 overflow-hidden min-h-[300px] flex flex-col justify-between hover:border-primary/50 transition-colors"
        >
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] group-hover:bg-blue-500/10 transition-colors" />
          
          <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <ShoppingCart className="w-7 h-7 text-white" />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-heading font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
              Sklepy Internetowe
            </h3>
            <p className="text-muted leading-relaxed">
              Projektujemy i wdrażamy szybkie, responsywne sklepy e-commerce, zoptymalizowane pod kątem maksymalnej konwersji.
            </p>
          </div>
        </motion.div>

        {/* Card 3: SEO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="group relative bg-[#111A24] border border-white/10 rounded-3xl p-8 overflow-hidden lg:col-span-3 min-h-[250px] flex flex-col md:flex-row items-start md:items-center justify-between hover:border-primary/50 transition-colors"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-colors pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10 w-full">
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2 group-hover:text-primary transition-colors">
                Pozycjonowanie Stron
              </h3>
              <p className="text-muted leading-relaxed max-w-2xl">
                Zwiększamy widoczność organiczną w Google. Prowadzimy audyty, optymalizujemy treści i budujemy autorytet domeny, by przyciągnąć kaloryczny ruch.
              </p>
            </div>
            
            <div className="hidden lg:block">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white hover:text-black hover:border-white transition-all"
              >
                Dowiedz się więcej
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
