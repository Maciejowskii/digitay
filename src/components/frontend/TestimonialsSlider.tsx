"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function TestimonialsSlider({ testimonials }: { testimonials: any[] }) {
  // Duplicate array slightly to ensure we have enough items for a nice slider look
  // even if there are only 3-4 testimonials
  const displayItems = [...testimonials, ...testimonials];

  return (
    <div className="relative w-full overflow-hidden py-12 -mx-4 px-4 md:-mx-12 md:px-12">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 40,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {displayItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="w-[320px] md:w-[450px] shrink-0 p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary/20 transition-all duration-500 group relative overflow-hidden"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-500" />

            {/* Rating */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < (item.rating || 5)
                      ? "text-primary fill-primary"
                      : "text-white/10"
                  }`}
                />
              ))}
            </div>

            {/* Content */}
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8 min-h-[120px]">
              "{item.content}"
            </p>

            {/* Author info */}
            <div className="flex items-center gap-4 mt-auto">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-primary/20 blur-sm scale-0 group-hover:scale-100 transition-transform duration-500" />
                <img
                  src={item.avatarUrl || `https://ui-avatars.com/api/?name=${item.authorName}&background=0A131F&color=19A354`}
                  alt={item.authorName}
                  className="w-12 h-12 rounded-full object-cover relative z-10 border border-white/10 group-hover:border-primary/50 transition-colors"
                />
              </div>
              <div className="text-left">
                <p className="text-white font-medium text-sm">
                  {item.authorName}
                </p>
                <p className="text-primary/70 text-xs">
                  {item.authorRole} {item.company && ` • ${item.company}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
