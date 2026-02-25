"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Maciej Kowalski",
    role: "CEO, QuickPick",
    content: "Digitay nie tylko dowiozło technologię, ale zaproponowało rozwiązania UX, które drastycznie podniosły konwersję w naszej aplikacji. Polecam z czystym sumieniem.",
    rating: 5,
  },
  {
    name: "Anna Nowak",
    role: "Marketing Director, EcoEnergy",
    content: "Współpraca była wzorowa. Proces był przejrzysty, a końcowy Landing Page wygenerował nam trzykrotnie więcej leadów w pierwszym kwartale niż stara strona przez cały rok.",
    rating: 5,
  },
  {
    name: "Tomasz Wiśniewski",
    role: "Founder, FitLife CRM",
    content: "Zrozumienie barier biznesowych to największa siła tego zespołu. Nie kodują ślepo, tylko doradzają co będzie najlepsze dla wzrostu firmy.",
    rating: 5,
  },
  {
    name: "Karolina Maj",
    role: "E-commerce Manager",
    content: "Niesamowita precyzja wokół optymalizacji czasu ładowania. Nasz nowy sklep działa błyskawicznie, a ruch z SEO rośnie z miesiąca na miesiąc.",
    rating: 5,
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 overflow-hidden">
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4">
          [ Referencje ]
        </span>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8">
          Co mówią o nas klienci?
        </h2>
        
        {/* Overlapping Avatars & 178 Opinii */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 bg-[#111A24] px-6 py-3 rounded-full border border-white/10"
        >
          <div className="flex -space-x-4">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className={`w-10 h-10 rounded-full border-2 border-[#111A24] flex items-center justify-center text-xs font-bold text-black ${
                  i === 1 ? 'bg-primary' : i === 2 ? 'bg-blue-300' : i === 3 ? 'bg-purple-300' : 'bg-yellow-300'
                }`}
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start">
             <div className="flex gap-1">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
               ))}
             </div>
             <span className="text-sm font-semibold text-white mt-0.5">178 Opinii na Clutch i Google</span>
          </div>
        </motion.div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="flex gap-6 overflow-hidden py-4 px-2" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"}}>
          <motion.div 
            className="flex gap-6 transition-all duration-700 ease-in-out"
            style={{ transform: `translateX(calc(-${activeIndex * 100}% - ${activeIndex * 1.5}rem))` }}
          >
            {testimonials.map((test, idx) => (
              <div 
                key={idx}
                className="w-full shrink-0 md:w-[600px] bg-[#111A24] border border-white/10 p-8 md:p-10 rounded-3xl"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-10">
                  "{test.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-green-300 flex items-center justify-center text-black font-bold text-lg shadow-[0_0_15px_rgba(25,163,84,0.3)]">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-bold font-heading">{test.name}</h4>
                    <p className="text-muted text-sm">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-8 bg-primary" : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
