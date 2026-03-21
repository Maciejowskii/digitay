"use client";

import { motion } from "framer-motion";

export default function LogoMarquee() {
  const logosRow1 = [
    "PERN",
    "SHOPIFY",
    "PLAY",
    "PLUS+",
    "YONELLE",
    "TECHFLOW",
    "GREENSTYLE",
  ];
  const logosRow2 = [
    "AGILE",
    "INNOWACJA",
    "DESIGN",
    "ROZWÓJ",
    "PARTNERSTWO",
    "SKALOWANIE",
    "E-COMMERCE",
  ];

  const duplicatedRow1 = [...logosRow1, ...logosRow1, ...logosRow1];
  const duplicatedRow2 = [...logosRow2, ...logosRow2, ...logosRow2];

  return (
    <section className="py-24 md:py-32 bg-background overflow-hidden relative border-y border-white/5">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Row 1 - Left to Right */}
      <div className="relative w-full overflow-hidden flex items-center mb-8">
        <motion.div
          className="flex items-center w-max"
          animate={{ x: "-33.33%" }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedRow1.map((logo, index) => (
            <div key={`row1-${index}`} className="flex items-center">
               <div className="px-8 md:px-12 cursor-default">
                 <span className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-transparent hover:text-white transition-colors duration-500 uppercase tracking-tighter whitespace-nowrap"
                      style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}>
                   {logo}
                 </span>
               </div>
               <span className="text-primary/20 text-3xl mx-2 font-black">•</span>
             </div>
           ))}
         </motion.div>
       </div>
 
       {/* Row 2 - Right to Left */}
       <div className="relative w-full overflow-hidden flex items-center">
         <motion.div
           className="flex items-center w-max"
           animate={{ x: ["-33.33%", "0%"] }}
           transition={{
             duration: 45,
             repeat: Infinity,
             ease: "linear",
           }}
         >
           {duplicatedRow2.map((text, index) => (
             <div key={`row2-${index}`} className="flex items-center">
               <div className="px-8 md:px-12 cursor-default">
                 <span className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white/5 hover:text-primary transition-colors duration-500 uppercase tracking-tighter whitespace-nowrap">
                   {text}
                 </span>
               </div>
               <span className="text-white/10 text-3xl mx-2 font-black">✦</span>
             </div>
           ))}
        </motion.div>
      </div>

      {/* Decorative center piece */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center opacity-40 mix-blend-overlay pointer-events-none">
        <span className="text-xs tracking-[0.5em] text-white uppercase font-mono mb-2">
          Digitay
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white to-transparent" />
      </div>
    </section>
  );
}
