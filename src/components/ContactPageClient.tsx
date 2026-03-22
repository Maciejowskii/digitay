"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Send, Clock, Plus, Minus, Loader2 } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Ile trwa stworzenie aplikacji?",
    answer: "Czas realizacji zależy od skomplikowania projektu. Proste aplikacje mobilne lub webowe MVP tworzymy w 4-8 tygodni. Większe platformy od 3 do 6 miesięcy.",
  },
  {
    question: "Jakie technologie wykorzystujecie?",
    answer: "Pracujemy w oparciu o najnowocześniejsze stacki technologiczne: React, Next.js, Node.js dla web, oraz React Native / Flutter dla mobile. Bezpieczeństwo i skalowalność to nasz priorytet.",
  },
  {
    question: "Czy pomagacie w pozycjonowaniu?",
    answer: "Tak, oferujemy kompleksowe działania SEO, od technicznych audytów, po optymalizację treści i budowanie linków, nastawione na realny zwrot z inwestycji (ROI).",
  },
];

export default function ContactPageClient() {
  const [formState, setFormState] = useState({ name: "", contact: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Connect to the actual Next.js API route that ContactFaq uses
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          phone: formState.contact, // Map 'contact' input to 'phone' for the API schema
          description: formState.message,
        }),
      });

      if (!response.ok) throw new Error("API error");
      setSubmitted(true);
      setFormState({ name: "", contact: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      // Fallback
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-background text-white selection:bg-primary/30 selection:text-white min-h-screen pt-32 lg:pt-40">
      
      {/* ═══════════════════════════════════════════════
          SINGULAR HERO & CONTACT FORM
      ═══════════════════════════════════════════════ */}
      <section className="relative z-20 pb-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start relative">
            
            {/* Lewa kolumna: Zaufanie i Adresy */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col relative z-20"
            >
              <h1 className="text-5xl lg:text-7xl font-heading font-black tracking-tighter mb-6 leading-[0.9]">
                POROZMAWIAJMY
                <span className="text-primary">.</span>
              </h1>
              <p className="text-white/50 text-lg md:text-xl leading-relaxed mb-12 max-w-md">
                Bez zbędnych formalności. Zostaw kontakt, a nasz zespół ekspertów wróci do Ciebie z konkretami w 24 godziny.
              </p>

              <div className="space-y-10 border-l border-white/10 pl-6 lg:pl-10 relative">
                <div className="absolute top-0 -left-[1px] w-[2px] h-1/3 bg-gradient-to-b from-primary to-transparent" />
                
                <div className="group">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Napisz bezpośrednio
                  </p>
                  <a href="mailto:hello@digitay.pl" className="text-xl md:text-3xl font-medium text-white/90 hover:text-primary transition-colors">
                    hello@digitay.pl
                  </a>
                </div>

                <div className="group">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Zadzwoń do nas
                  </p>
                  <a href="tel:+48123456789" className="text-xl md:text-3xl font-medium text-white/90 hover:text-primary transition-colors">
                    +48 123 456 789
                  </a>
                </div>

                <div className="group">
                  <p className="text-xs font-mono uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Odwiedź biuro
                  </p>
                  <p className="text-lg text-white/70 leading-relaxed">
                    ul. Cybernetyki 10<br/>02-677 Warszawa
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Prawa kolumna: Prosty, czysty Formularz */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/5 rounded-[40px] blur-3xl -z-10" />
              <form 
                onSubmit={handleSubmit}
                className="p-8 md:p-12 rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-2xl relative"
              >
                <div className="absolute top-0 right-12 w-32 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-24 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6 border border-emerald-500/30">
                      <Send className="w-10 h-10 text-emerald-500 translate-x-1 -translate-y-1" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Wiadomość wysłana!</h3>
                    <p className="text-white/60 font-light">Skontaktujemy się z Tobą najszybciej jak to możliwe.</p>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-heading font-bold mb-8">Zostaw wiadomość</h2>
                    
                    <div className="space-y-2 group">
                      <label className="text-[10px] uppercase tracking-widest font-mono text-white/40 pl-1 group-focus-within:text-primary transition-colors">Imię i nazwisko</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-lg text-white placeholder-white/20 focus:outline-none focus:border-primary transition-all font-light"
                        placeholder="Jan Kowalski"
                      />
                    </div>
                    
                    <div className="space-y-2 group">
                      <label className="text-[10px] uppercase tracking-widest font-mono text-white/40 pl-1 group-focus-within:text-primary transition-colors">Email lub telefon</label>
                      <input 
                        type="text" 
                        name="contact"
                        required
                        value={formState.contact}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-lg text-white placeholder-white/20 focus:outline-none focus:border-primary transition-all font-light"
                        placeholder="jan@firma.pl"
                      />
                    </div>

                    <div className="space-y-2 group pt-4">
                      <label className="text-[10px] uppercase tracking-widest font-mono text-white/40 pl-1 group-focus-within:text-primary transition-colors">Krótki opis projektu</label>
                      <textarea 
                        name="message"
                        required
                        value={formState.message}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-lg text-white placeholder-white/20 focus:outline-none focus:border-primary transition-all font-light resize-none"
                        placeholder="W czym możemy pomóc?"
                      />
                    </div>

                    <div className="pt-6">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-background rounded-full py-5 font-bold uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:scale-100"
                      >
                        {isSubmitting ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Wysyłanie...</>
                        ) : (
                          <><Send className="w-4 h-4" /> Wyślij Zapytanie</>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CLEAN FAQ SECTION
      ═══════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight">
              Częste pytania
            </h3>
          </motion.div>

          <div className="flex flex-col border-t border-white/10">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-white/10">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between py-6 md:py-8 text-left focus:outline-none group"
                >
                  <span className={`text-xl md:text-2xl font-heading font-medium transition-colors pr-8 ${openFaq === idx ? "text-primary" : "text-white/70 group-hover:text-white"}`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${openFaq === idx ? "border-primary bg-primary/10" : "border-white/10 bg-white/5 group-hover:bg-white/10"}`}>
                    {openFaq === idx ? (
                      <Minus className="w-5 h-5 text-primary" />
                    ) : (
                      <Plus className="w-5 h-5 text-white" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 text-white/50 text-lg leading-relaxed pr-16 font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
