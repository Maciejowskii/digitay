"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Loader2, Send, ArrowUpRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";

const defaultFaqs = [
  {
    question: "Ile trwa stworzenie aplikacji?",
    answer:
      "Czas realizacji zależy od skomplikowania projektu. Proste aplikacje mobilne lub webowe MVP tworzymy w 4-8 tygodni. Większe platformy od 3 do 6 miesięcy.",
  },
  {
    question: "Jakie technologie wykorzystujecie?",
    answer:
      "Pracujemy w oparciu o najnowocześniejsze stacki technologiczne: React, Next.js, Node.js dla web, oraz React Native / Flutter dla mobile. Bezpieczeństwo i skalowalność to nasz priorytet.",
  },
  {
    question: "Czy pomagacie w pozycjonowaniu?",
    answer:
      "Tak, oferujemy kompleksowe działania SEO, od technicznych audytów, po optymalizację treści i budowanie linków, nastawione na realny zwrot z inwestycji (ROI).",
  },
];

const contactSchema = z.object({
  name: z.string().min(1, "Wymagane imię i nazwisko."),
  phone: z.string().min(1, "Wymagany numer telefonu."),
  description: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactFaqProps {
  customFaqs?: { question: string; answer: string }[];
}

export default function ContactFaq({ customFaqs }: ContactFaqProps) {
  const activeFaqs = customFaqs || defaultFaqs;
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema) as any,
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
    <section id="contact" className="relative bg-background overflow-hidden">
      {/* CTA Banner - inspired by reference "Need something built?" */}
      <div className="py-24 md:py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left: CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-heading font-black text-white leading-[1.05] tracking-tight mb-6">
                Potrzebujesz
                <br />
                kogoś do
                <br />
                <span className="text-primary">realizacji?</span>
              </h2>
              <p className="text-white/50 text-lg mb-8 leading-relaxed max-w-md">
                Nie gryziem! Skontaktuj się z nami lub wpadnij na kawę.
                Chętnie dowiemy się, w czym możemy pomóc.
              </p>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-all duration-300 group"
              >
                Umów spotkanie
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <div className="border border-white/10 rounded-2xl p-8 md:p-10 bg-white/[0.02]">
                <h3 className="text-xl font-heading font-bold text-white mb-2">
                  Nie masz czasu na kawę?
                </h3>
                <p className="text-white/40 text-sm mb-8">
                  Opisz krótko czego szukasz, odezwiemy się z pomysłami.
                </p>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-5"
                >
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-white/40 uppercase tracking-wider">
                      Imię i nazwisko
                    </label>
                    <input
                      type="text"
                      {...register("name")}
                      className={`bg-transparent border ${errors.name ? "border-red-500/50" : "border-white/10"} rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-colors text-sm placeholder:text-white/20`}
                      placeholder="Jan Kowalski"
                    />
                    {errors.name && (
                      <span className="text-red-400 text-xs mt-0.5">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-white/40 uppercase tracking-wider">
                      Email lub telefon
                    </label>
                    <input
                      type="text"
                      {...register("phone")}
                      className={`bg-transparent border ${errors.phone ? "border-red-500/50" : "border-white/10"} rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-colors text-sm placeholder:text-white/20`}
                      placeholder="+48 000 000 000"
                    />
                    {errors.phone && (
                      <span className="text-red-400 text-xs mt-0.5">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-white/40 uppercase tracking-wider">
                      Opis projektu (opcjonalnie)
                    </label>
                    <textarea
                      {...register("description")}
                      rows={3}
                      className="bg-transparent border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-colors resize-none text-sm placeholder:text-white/20"
                      placeholder="Opisz krótko swój projekt..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full font-medium text-sm py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mt-2
                      ${
                        isError
                          ? "bg-red-500/10 text-red-400 border border-red-500/30"
                          : isSuccess
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : "bg-white text-black hover:bg-primary hover:text-white"
                      }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Wysyłanie...
                      </>
                    ) : isError ? (
                      "Błąd – spróbuj ponownie"
                    ) : isSuccess ? (
                      "Wysłano pomyślnie ✓"
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Wyślij wiadomość
                      </>
                    )}
                  </button>
                  {isError && (
                    <p className="text-red-400 text-xs text-center">
                      {errorMessage}
                    </p>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <span className="text-primary text-sm tracking-widest mb-6 block">
              [ FAQ ]
            </span>
            <h3 className="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight">
              Często zadawane pytania
            </h3>
          </motion.div>

          <div className="flex flex-col">
            {activeFaqs.map((faq, idx) => (
              <div key={idx} className="border-b border-white/10">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
                >
                  <span
                    className={`text-lg md:text-xl font-heading font-semibold transition-colors pr-8 ${openFaq === idx ? "text-primary" : "text-white/70 group-hover:text-white"}`}
                  >
                    {faq.question}
                  </span>
                  <div className="shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-colors duration-300">
                    {openFaq === idx ? (
                      <Minus className="w-4 h-4 text-primary" />
                    ) : (
                      <Plus className="w-4 h-4 text-white/40 group-hover:text-white" />
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
                      <div className="pb-6 text-white/50 text-base leading-relaxed pr-16">
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
