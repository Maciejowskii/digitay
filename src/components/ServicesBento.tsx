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
        
        {/* 01: Pozycjonowanie SEO */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-transparent group relative p-8 md:p-10 min-h-[350px] flex flex-col justify-between hover:border-brand-green/30 transition-all border border-white/10 lg:col-span-2"
        >
          <div className="absolute -bottom-6 -right-6 text-[180px] font-heading font-black text-white/5 leading-none pointer-events-none select-none tracking-tighter">01</div>
          <div className="relative z-10">
            <h3 className="text-3xl lg:text-5xl font-heading font-black text-white uppercase mb-4 tracking-tighter">Pozycjonowanie SEO</h3>
            <p className="text-[#CED0DF] font-mono text-xs max-w-md uppercase leading-relaxed">
              Strategia oparta o twarde dane. Dominacja w Google dzięki technicznym audytom i agresywnemu content marketingowi.
            </p>
          </div>
          <div className="mt-8 relative z-10 w-full h-32 border border-white/10 bg-black/40 flex items-center justify-center">
             <div className="flex gap-2">
                {[40, 70, 45, 90, 60].map((h, i) => (
                  <div key={i} className="w-4 bg-brand-green/20 border border-brand-green/40" style={{ height: `${h}%` }} />
                ))}
             </div>
          </div>
        </motion.div>

        {/* 02: Tworzenie Stron */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-transparent group relative p-8 md:p-10 min-h-[350px] flex flex-col justify-between hover:border-brand-green/30 transition-all border border-white/10"
        >
          <div className="absolute -top-6 -right-6 text-[150px] font-heading font-black text-white/5 leading-none pointer-events-none select-none tracking-tighter">02</div>
          <div className="relative z-10">
            <h3 className="text-3xl font-heading font-black text-white uppercase mb-2 tracking-tighter">Tworzenie Stron</h3>
            <p className="text-[#CED0DF] font-mono text-[10px] uppercase leading-relaxed">
              High-endowe wizytówki i landingi. Design, który hipnotyzuje i konwertuje od pierwszego kliknięcia.
            </p>
          </div>
          <div className="w-full aspect-video border border-white/10 bg-white/5 mt-8 overflow-hidden relative">
             <div className="absolute top-2 left-2 flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
             </div>
             <div className="w-[80%] h-full bg-white/5 ml-auto border-l border-white/10 p-2">
                <div className="w-full h-2 bg-white/20 mb-2" />
                <div className="w-2/3 h-2 bg-white/10" />
             </div>
          </div>
        </motion.div>

        {/* 03: Sklepy Internetowe */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-transparent group relative p-8 md:p-10 min-h-[350px] flex flex-col justify-between hover:border-brand-green/30 transition-all border border-white/10"
        >
          <div className="absolute -bottom-6 -left-6 text-[150px] font-heading font-black text-white/5 leading-none pointer-events-none select-none tracking-tighter">03</div>
          <div className="relative z-10">
            <h3 className="text-3xl font-heading font-black text-white uppercase mb-2 tracking-tighter">Sklepy <br/> Internetowe</h3>
            <p className="text-[#CED0DF] font-mono text-[10px] uppercase leading-relaxed">
              Architektura sprzedaży. Sklepy zoptymalizowane pod ułamki sekund i maksymalny koszyk zakupowy.
            </p>
          </div>
        </motion.div>

        {/* 04: Social Media */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-transparent group relative p-8 md:p-10 min-h-[350px] flex flex-col justify-between hover:border-brand-green/30 transition-all border border-white/10 lg:col-span-2"
        >
          <div className="absolute -top-6 -right-6 text-[180px] font-heading font-black text-white/5 leading-none pointer-events-none select-none tracking-tighter">04</div>
          <div className="relative z-10">
            <h3 className="text-3xl lg:text-5xl font-heading font-black text-white uppercase mb-4 tracking-tighter">Social Media</h3>
            <p className="text-[#CED0DF] font-mono text-xs max-w-md uppercase leading-relaxed">
              Budowanie społeczności zorientowanych na markę. Kreatywny content i strategie, które angażują.
            </p>
          </div>
          <div className="flex gap-4 mt-8">
             <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5" />
             <div className="flex-1 border-t border-white/10 mt-6" />
          </div>
        </motion.div>

        {/* 05: Google Ads */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-transparent group relative p-8 md:p-10 min-h-[300px] flex flex-col justify-between hover:border-brand-green/30 transition-all border border-white/10"
        >
          <div className="absolute -bottom-6 -right-6 text-[150px] font-heading font-black text-white/5 leading-none pointer-events-none select-none tracking-tighter">05</div>
          <h3 className="text-2xl font-heading font-black text-white uppercase mb-2 tracking-tighter">Google Ads</h3>
          <p className="text-[#CED0DF] font-mono text-[10px] uppercase">Natychmiastowy ruch od klientów, którzy szukają Twoich usług tu i teraz.</p>
        </motion.div>

        {/* 06: Facebook Ads */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-transparent group relative p-8 md:p-10 min-h-[300px] flex flex-col justify-between hover:border-brand-green/30 transition-all border border-white/10"
        >
          <div className="absolute -top-6 -right-6 text-[150px] font-heading font-black text-white/5 leading-none pointer-events-none select-none tracking-tighter">06</div>
          <h3 className="text-2xl font-heading font-black text-white uppercase mb-2 tracking-tighter">Facebook Ads</h3>
          <p className="text-[#CED0DF] font-mono text-[10px] uppercase">Precyzyjne targetowanie i kreacje, obok których nikt nie przejdzie obojętnie.</p>
        </motion.div>

        {/* 07: Aplikacje Webowe */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-transparent group relative p-8 md:p-10 min-h-[300px] flex flex-col justify-between hover:border-brand-green/30 transition-all border border-white/10"
        >
          <div className="absolute -bottom-6 -left-6 text-[150px] font-heading font-black text-white/5 leading-none pointer-events-none select-none tracking-tighter">07</div>
          <h3 className="text-2xl font-heading font-black text-white uppercase mb-2 tracking-tighter">Aplikacje Webowe</h3>
          <p className="text-[#CED0DF] font-mono text-[10px] uppercase">Szyte na miarę systemy SaaS i platformy optymalizujące procesy w Twojej firmie.</p>
        </motion.div>

        {/* 08: Aplikacje Mobilne */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-transparent group relative p-8 md:p-10 min-h-[350px] flex flex-col justify-between hover:border-brand-green/30 transition-all border border-white/10 lg:col-span-2"
        >
          <div className="absolute -top-6 -left-6 text-[180px] font-heading font-black text-white/5 leading-none pointer-events-none select-none tracking-tighter">08</div>
          <div className="relative z-10">
            <h3 className="text-3xl lg:text-5xl font-heading font-black text-white uppercase mb-4 tracking-tighter">Aplikacje Mobilne</h3>
            <p className="text-[#CED0DF] font-mono text-xs max-w-md uppercase leading-relaxed">
              Natywne rozwiązania dla iOS i Android. Tworzymy oprogramowanie, które użytkownicy kochają mieć w kieszeni.
            </p>
          </div>
          <div className="w-24 h-40 border border-white/20 mt-8 ml-auto overflow-hidden p-2">
             <div className="w-full h-full bg-white/5 rounded-2xl" />
          </div>
        </motion.div>

        {/* 09: Branding */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-transparent group relative p-8 md:p-10 min-h-[350px] flex flex-col justify-between hover:border-brand-green/30 transition-all border border-white/10"
        >
          <div className="absolute -bottom-6 -right-6 text-[150px] font-heading font-black text-white/5 leading-none pointer-events-none select-none tracking-tighter">09</div>
          <h3 className="text-3xl font-heading font-black text-white uppercase mb-2 tracking-tighter">Branding</h3>
          <p className="text-[#CED0DF] font-mono text-[10px] uppercase leading-relaxed">
            Tożsamość wizualna, która buduje autorytet. Od logo po pełny design system.
          </p>
        </motion.div>
        
      </div>
    </section>
  );
}
