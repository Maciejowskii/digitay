"use client";

import { motion } from "framer-motion";

export default function LogoMarquee() {
  const logos = [
    { name: "Pern", fallback: "PERN" },
    { name: "Shopify", fallback: "SHOPIFY" },
    { name: "Play", fallback: "PLAY" },
    { name: "Plus", fallback: "PLUS+" },
    { name: "Yonelle", fallback: "YONELLE" },
  ];

  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden relative">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white/30 text-sm tracking-widest uppercase text-center"
        >
          Zaufali nam liderzy branży
        </motion.p>
      </div>

      <div className="relative w-full overflow-hidden flex items-center">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          className="flex items-center w-max"
          animate={{ x: "-33.33%" }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div key={`${logo.name}-${index}`} className="flex items-center">
              <div className="flex items-center justify-center opacity-20 hover:opacity-60 transition-opacity duration-500 min-w-[120px] px-8 md:px-12 cursor-default">
                <span className="text-2xl md:text-3xl font-heading font-bold text-white uppercase tracking-tight">
                  {logo.fallback}
                </span>
              </div>
              <span className="text-white/10 text-lg mx-2 select-none">
                /
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
