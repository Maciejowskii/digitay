"use client";

import { motion } from "framer-motion";

export default function LogoMarquee() {
  const logos = [
    { name: "Pern", url: "/pern-logo.svg", fallback: "PERN" },
    { name: "Shopify", url: "/shopify-logo.svg", fallback: "Shopify" },
    { name: "Play", url: "/play-logo.svg", fallback: "play" },
    { name: "Plus", url: "/plus-logo.svg", fallback: "plus+" },
    { name: "Yonelle", url: "/yonelle-logo.svg", fallback: "YONELLE" },
  ];

  // Duplicate the array to create a seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-16 border-y border-white/5 bg-background overflow-hidden flex flex-col items-center">
      <div className="text-sm font-medium text-muted mb-8 uppercase tracking-widest px-6 text-center">
        Zaufali nam najlepsi w branży
      </div>
      
      <div className="relative w-full max-w-full overflow-hidden flex items-center">
        {/* Gradients for fading effect on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        <motion.div
          className="flex items-center gap-16 md:gap-24 w-max"
          animate={{ x: "-33.33%" }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div 
              key={`${logo.name}-${index}`} 
              className="flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 min-w-[120px]"
            >
              <span className="text-2xl md:text-3xl font-heading font-bold text-white uppercase tracking-wider">
                {logo.fallback}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
