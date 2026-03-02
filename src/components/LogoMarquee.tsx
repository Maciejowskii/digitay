"use client";

import { motion } from "framer-motion";

export default function LogoMarquee() {
  const logos = [
    { name: "Pern", url: "/pern-logo.svg", fallback: "PERN" },
    { name: "Shopify", url: "/shopify-logo.svg", fallback: "SHOPIFY" },
    { name: "Play", url: "/play-logo.svg", fallback: "PLAY" },
    { name: "Plus", url: "/plus-logo.svg", fallback: "PLUS+" },
    { name: "Yonelle", url: "/yonelle-logo.svg", fallback: "YONELLE" },
  ];

  // Duplicate the array to create a seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-12 bg-transparent overflow-hidden flex flex-col items-center relative">


      <div className="relative w-full max-w-full overflow-hidden flex items-center">
        {/* Gradients for fading effect on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        <motion.div
          className="flex items-center w-max"
          animate={{ x: "-33.33%" }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div key={`${logo.name}-${index}`} className="flex items-center">
              <div 
                className="flex items-center justify-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-colors duration-0 min-w-[120px] px-8 cursor-pointer"
              >
                <span className="text-3xl md:text-5xl font-heading font-black text-white uppercase tracking-tighter">
                  {logo.fallback}
                </span>
              </div>
              <div className="text-white/20 font-mono text-xl mx-4 select-none">
                //
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
