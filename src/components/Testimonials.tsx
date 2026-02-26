"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Maciej Kowalski",
    role: "CEO, QuickPick",
    content: "DIGITAY NIE TYLKO DOWIOZŁO TECHNOLOGIĘ, ALE ZAPROPONOWAŁO ROZWIĄZANIA UX, KTÓRE DRASTYCZNIE PODNIOSŁY KONWERSJĘ W NASZEJ APLIKACJI.",
  },
  {
    name: "Anna Nowak",
    role: "Marketing Director, EcoEnergy",
    content: "KOŃCOWY LANDING PAGE WYGENEROWAŁ NAM TRZYKROTNIE WIĘCEJ LEADÓW W PIERWSZYM KWARTALE NIŻ STARA STRONA PRZEZ CAŁY ROK.",
  },
  {
    name: "Tomasz Wiśniewski",
    role: "Founder, FitLife CRM",
    content: "ZROZUMIENIE BARIER BIZNESOWYCH TO NAJWIĘKSZA SIŁA. NIE KODUJĄ ŚLEPO, TYLKO DORADZAJĄ CO BĘDZIE NAJLEPSZE DLA WZROSTU FIRMY.",
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
      <div className="border-t border-white/10 pt-12 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          <div className="md:col-span-1">
            <h2 className="text-sm font-mono tracking-widest text-white/50 uppercase mb-4">
              [ KLIENT MÓWI ]
            </h2>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-8">
            <div className="border border-white/10 p-6 flex flex-col justify-between aspect-square">
              <span className="text-xs font-mono text-white/50 uppercase">Zrealizowane<br/>Projekty</span>
              <span className="text-6xl md:text-8xl font-heading font-bold text-white tracking-tighter">178</span>
            </div>
            <div className="border border-white/10 bg-primary p-6 flex flex-col justify-between aspect-square text-black">
              <span className="text-xs font-mono uppercase font-bold">Średnia<br/>Ocena</span>
              <span className="text-6xl md:text-8xl font-heading font-bold tracking-tighter">9.3</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        {testimonials.map((test, idx) => (
          <div 
            key={idx}
            className="border-t border-white/10 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-start group"
          >
            <div className="md:col-span-3 flex items-center gap-4">
               <div className="w-16 h-16 border border-white/10 flex items-center justify-center font-heading font-bold text-xl bg-black text-white group-hover:bg-white group-hover:text-black transition-colors">
                 {test.name.charAt(0)}
               </div>
               <div>
                 <h4 className="text-white font-bold font-heading uppercase tracking-wide">{test.name}</h4>
                 <p className="text-white/40 text-xs font-mono uppercase mt-1">{test.role}</p>
               </div>
            </div>
            <div className="md:col-span-9">
              <p className="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight leading-[1.1] uppercase">
                "{test.content}"
              </p>
            </div>
          </div>
        ))}
        <div className="border-t border-white/10 w-full h-px" />
      </div>
    </section>
  );
}
