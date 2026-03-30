"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import { useState } from "react";

export default function HomeContactForm() {
  const [formState, setFormState] = useState({ name: "", contact: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          phone: formState.contact,
          description: formState.message,
        }),
      });

      if (!response.ok) throw new Error("API error");
      setSubmitted(true);
      setFormState({ name: "", contact: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
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
    <section className="relative z-20 py-24 bg-background border-b border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start relative">
          
          {/* Lewa kolumna: Zaufanie i Adresy */}
            <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col relative z-20 min-w-0"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black tracking-tighter mb-6 leading-[0.9]">
              POROZMAWIAJMY
              <span className="text-primary">.</span>
            </h2>
            <p className="text-white/50 text-lg md:text-xl leading-relaxed mb-12 max-w-md">
              Bez zbędnych formalności. Zostaw kontakt, a nasz zespół ekspertów wróci do Ciebie z konkretami w 24 godziny.
            </p>

            <div className="space-y-10 border-l border-white/10 pl-6 lg:pl-10 relative">
              <div className="absolute top-0 -left-[1px] w-[2px] h-1/3 bg-gradient-to-b from-primary to-transparent" />
              
              <div className="group">
                <p className="text-xs font-mono uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Napisz bezpośrednio
                </p>
                <a href="mailto:kontakt@digitay.pl" className="text-xl md:text-3xl font-medium text-white/90 hover:text-primary transition-colors">
                  kontakt@digitay.pl
                </a>
              </div>

              <div className="group">
                <p className="text-xs font-mono uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Zadzwoń do nas
                </p>
                <div className="flex flex-col gap-2">
                  <a href="tel:+48733172145" className="text-xl md:text-3xl font-medium text-white/90 hover:text-primary transition-colors">
                    +48 733 172 145
                  </a>
                  <a href="tel:+48535645322" className="text-xl md:text-3xl font-medium text-white/90 hover:text-primary transition-colors">
                    +48 535 645 322
                  </a>
                </div>
              </div>

              <div className="group">
                <p className="text-xs font-mono uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Odwiedź biuro
                </p>
                <p className="text-lg text-white/70 leading-relaxed">
                  ul. Cyfrowa 2-8<br/>71-441 Szczecin, Poland
                </p>
              </div>
            </div>
          </motion.div>

          {/* Prawa kolumna: Prosty, czysty Formularz */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
                  <h3 className="text-2xl font-heading font-bold mb-8">Zostaw wiadomość</h3>
                  
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
  );
}
