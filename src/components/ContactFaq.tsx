"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "ILE TRWA STWORZENIE APLIKACJI?",
    answer: "Czas realizacji zależy od skomplikowania projektu. Proste aplikacje mobilne lub webowe MVP tworzymy w 4-8 tygodni. Większe platformy od 3 do 6 miesięcy."
  },
  {
    question: "JAKIE TECHNOLOGIE WYKORZYSTUJECIE?",
    answer: "Pracujemy w oparciu o najnowocześniejsze stacki technologiczne: React, Next.js, Node.js dla web, oraz React Native / Flutter dla mobile. Bezpieczeństwo i skalowalność to nasz priorytet."
  },
  {
    question: "CZY POMAGACIE W POZYCJONOWANIU?",
    answer: "Tak, oferujemy kompleksowe działania SEO, od technicznych audytów, po optymalizację treści i budowanie linków, nastawione na realny zwrot z inwestycji (ROI)."
  }
];

export default function ContactFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 md:px-12 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 border border-white/10">
        
        {/* Contact Form Left Column */}
        <div className="p-8 md:p-16 border-b lg:border-b-0 lg:border-r border-white/10">
          <div className="mb-12">
            <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">
              [ KONTAKT ]
            </span>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white uppercase tracking-tighter leading-none">
              OPOWIEDZ NAM<br/>O PROJEKCIE
            </h2>
          </div>
          
          <form className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono font-medium text-white/50 uppercase tracking-widest">Imię i nazwisko</label>
              <input 
                type="text" 
                className="bg-transparent border border-white/20 rounded-none px-4 py-4 text-white focus:outline-none focus:border-white focus:ring-0 transition-colors placeholder:text-white/20 font-mono"
                placeholder="JAN KOWALSKI"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono font-medium text-white/50 uppercase tracking-widest">Numer telefonu</label>
              <input 
                type="tel" 
                className="bg-transparent border border-white/20 rounded-none px-4 py-4 text-white focus:outline-none focus:border-white focus:ring-0 transition-colors placeholder:text-white/20 font-mono"
                placeholder="+48 000 000 000"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono font-medium text-white/50 uppercase tracking-widest">Opis (opcjonalnie)</label>
              <textarea 
                rows={4}
                className="bg-transparent border border-white/20 rounded-none px-4 py-4 text-white focus:outline-none focus:border-white focus:ring-0 transition-colors resize-none placeholder:text-white/20 font-mono"
                placeholder="SZCZEGÓŁY PROJEKTU..."
              />
            </div>
            
            <button 
              type="button"
              className="mt-4 w-full bg-white text-black hover:bg-primary hover:text-white font-heading font-bold text-lg uppercase py-5 rounded-none transition-colors border border-transparent hover:border-primary"
            >
              WYŚLIJ ZAPYTANIE
            </button>
            
            <p className="text-xs text-white/40 font-mono uppercase mt-2">
              [ ODPOWIADAMY W 24H ]
            </p>
          </form>
        </div>

        {/* FAQ Right Column */}
        <div className="p-8 md:p-16 flex flex-col">
          <div className="mb-12">
            <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">
              [ FAQ ]
            </span>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white uppercase tracking-tighter leading-none">
              PYTANIA &<br/>ODPOWIEDZI
            </h2>
          </div>
          
          <div className="flex flex-col flex-1 border-t border-white/10">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="border-b border-white/10 group"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-start justify-between py-6 text-left"
                >
                  <span className={`text-xl md:text-2xl font-heading font-bold transition-colors pr-8 ${openFaq === idx ? 'text-primary' : 'text-white group-hover:text-white/80'}`}>
                    {faq.question}
                  </span>
                  <div className="mt-1 text-white shrink-0">
                    {openFaq === idx ? <Minus className="w-6 h-6 text-primary" /> : <Plus className="w-6 h-6" />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 text-white/60 font-mono text-sm leading-relaxed uppercase pr-8">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
