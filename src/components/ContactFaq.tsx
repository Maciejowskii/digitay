"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

const contactSchema = z.object({
  name: z.string().min(1, "BŁĄD: Wymagane imię i nazwisko."),
  phone: z.string().min(1, "BŁĄD: Wymagany numer telefonu."),
  description: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsError(false);
    setErrorMessage("");
    setIsSuccess(false);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || "Nieznany błąd serwera.");
      }

      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error: any) {
      console.error("Formularz Błąd:", error);
      setIsError(true);
      setErrorMessage(error.message || "Błąd sieci.");
      setTimeout(() => setIsError(false), 5000);
    }
  };

  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 md:px-12 py-24 bg-transparent border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Left Column: Headers & FAQ */}
        <div className="flex flex-col">
          <div className="mb-12">
            <span className="text-primary font-mono text-xs tracking-widest uppercase mb-4 block">
              [ FAQ & KONTAKT ]
            </span>
            <h2 className="text-5xl md:text-7xl font-heading font-black text-white uppercase tracking-tighter leading-none">
              ZACZNIJMY<br/>ROZMOWĘ.
            </h2>
            <p className="font-mono text-white/50 text-sm mt-6 max-w-md leading-relaxed uppercase">
              Masz pytania dotyczące projektu, estymacji kosztów lub wyboru technologii? Sprawdź odpowiedzi poniżej lub wypełnij formularz.
            </p>
          </div>
          
          <div className="flex flex-col flex-1 border-t border-white/10">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="border-b border-white/10 group"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-start justify-between py-6 text-left focus:outline-none"
                >
                  <span className={`text-xl md:text-2xl font-heading font-bold transition-colors pr-8 ${openFaq === idx ? 'text-primary' : 'text-zinc-300 group-hover:text-white'}`}>
                    {faq.question}
                  </span>
                  <div className="mt-1 shrink-0 transition-colors duration-300">
                    {openFaq === idx ? <Minus className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5 text-zinc-500 group-hover:text-white" />}
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
                      <div className="pb-8 text-zinc-400 font-mono text-sm leading-relaxed uppercase pr-8">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="flex flex-col justify-center">
          <div className="border border-white/10 p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <h3 className="font-mono text-xs text-white/30 mb-8 uppercase tracking-widest">
              // TERMINAL KONTAKTOWY
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono font-medium text-white/50 uppercase tracking-widest">Imię i nazwisko</label>
                <input 
                  type="text" 
                  {...register("name")}
                  className={`bg-transparent border ${errors.name ? 'border-red-500/50' : 'border-white/10'} px-4 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-zinc-700 font-mono text-sm`}
                  placeholder="_JAN KOWALSKI"
                />
                {errors.name && <span className="text-red-400 font-mono text-xs uppercase mt-1">{errors.name.message}</span>}
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono font-medium text-white/50 uppercase tracking-widest">Email lub numer telefonu</label>
                <input 
                  type="text" 
                  {...register("phone")}
                  className={`bg-transparent border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} px-4 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-zinc-700 font-mono text-sm`}
                  placeholder="_+48 000 000 000"
                />
                {errors.phone && <span className="text-red-400 font-mono text-xs uppercase mt-1">{errors.phone.message}</span>}
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono font-medium text-white/50 uppercase tracking-widest">Opis (opcjonalnie)</label>
                <textarea 
                  {...register("description")}
                  rows={4}
                  className="bg-transparent border border-white/10 px-4 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none placeholder:text-zinc-700 font-mono text-sm"
                  placeholder="_SZCZEGÓŁY PROJEKTU..."
                />
              </div>
              
              <div className="mt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-mono font-bold text-sm tracking-widest uppercase py-5 transition-colors border flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-wait
                    ${isError 
                      ? 'bg-red-500/10 text-red-500 border-red-500/50 hover:bg-red-500/20' 
                      : isSuccess 
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/50 hover:bg-emerald-500/20' 
                        : 'bg-white text-black border-transparent hover:bg-zinc-200'
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      WYSYŁANIE...
                    </>
                  ) : isError ? (
                     <>
                        [ BŁĄD TRANSMISJI ]
                     </>
                  ) : isSuccess ? (
                    <>
                      [ TRANSMISJA UDANA ]
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      INICJUJ POŁĄCZENIE
                    </>
                  )}
                </button>
                {isError && (
                   <p className="text-red-400 font-mono text-xs uppercase text-center mt-4">
                     {errorMessage} // Spróbuj ponownie lub napisz przez email.
                   </p>
                )}
              </div>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
