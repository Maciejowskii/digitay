"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Send } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Ile trwa stworzenie aplikacji?",
    answer: "Czas realizacji zależy od skomplikowania projektu. Proste aplikacje mobilne lub webowe MVP tworzymy w 4-8 tygodni. Większe platformy od 3 do 6 miesięcy."
  },
  {
    question: "Jakie technologie wykorzystujecie?",
    answer: "Pracujemy w oparciu o najnowocześniejsze stacki technologiczne: React, Next.js, Node.js dla web, oraz React Native / Flutter dla mobile. Bezpieczeństwo i skalowalność to nasz priorytet."
  },
  {
    question: "Czy pomagacie w pozycjonowaniu?",
    answer: "Tak, oferujemy kompleksowe działania SEO, od technicznych audytów, po optymalizację treści i budowanie linków, nastawione na realny zwrot z inwestycji (ROI)."
  }
];

export default function ContactFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="contact" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* FAQ Left Column */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">
            [ Najczęstsze pytania ]
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8">
            Rozwiewamy wątpliwości
          </h2>
          
          <div className="flex flex-col gap-4 mt-12">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-[#111A24] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-heading font-bold text-white pr-4">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${openFaq === idx ? 'bg-primary border-primary rotate-180 text-black' : 'text-muted'}`}>
                    <ChevronDown className="w-4 h-4" />
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
                      <div className="p-6 pt-0 text-muted leading-relaxed pb-6">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form Right Column */}
        <motion.div
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-primary/5 rounded-[100px] blur-[100px] pointer-events-none -z-10" />
          
          <div className="bg-[#111A24]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px]" />
            
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
              Opowiedz nam o swoim projekcie
            </h3>
            <p className="text-muted text-sm mb-8">
              Zostaw kontakt, a umówimy się na bezpłatną konsultację i wycenę.
            </p>
            
            <form className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/80 pl-1">Imię i nazwisko</label>
                <input 
                  type="text" 
                  className="bg-transparent border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-white/20"
                  placeholder="Jan Kowalski"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/80 pl-1">Numer telefonu</label>
                <input 
                  type="tel" 
                  className="bg-transparent border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-white/20"
                  placeholder="+48 000 000 000"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/80 pl-1">Krótki opis (opcjonalnie)</label>
                <textarea 
                  rows={4}
                  className="bg-transparent border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none placeholder:text-white/20"
                  placeholder="Czego dotyczy Twój projekt?"
                />
              </div>
              
              <button 
                type="button"
                className="mt-4 w-full flex items-center justify-center gap-3 bg-primary text-black font-bold py-4 rounded-xl hover:bg-green-400 hover:shadow-[0_0_20px_rgba(25,163,84,0.4)] transition-all"
              >
                Wyślij wiadomość
                <Send className="w-5 h-5" />
              </button>
              
              <p className="text-center text-xs text-white/40 mt-2">
                Skontaktujemy się do 24 godzin w dni robocze.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
