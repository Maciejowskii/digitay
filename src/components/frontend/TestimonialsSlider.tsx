"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

type Testimonial = {
  id: number;
  authorName: string;
  authorRole: string | null;
  company: string | null;
  content: string;
  avatarUrl: string | null;
  rating: number | null;
};

export const TestimonialsSlider = ({ testimonials }: { testimonials: Testimonial[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Create a continuous array by multiplying items to fake infinity
  const displayItems = [...testimonials, ...testimonials, ...testimonials];

  useAnimationFrame((t, delta) => {
    // Stop the ticker completely on hover, otherwise move by -1px per frame (approx 60px/s)
    if (!isHovered) {
      // Delta is usually ~16.6ms at 60fps
      let moveBy = -0.05 * delta; 
      
      let newX = x.get() + moveBy;

      // Approximate wrap logic: If we've scrolled past the first set of items
      // We reset x to 0 seamlessly. (Assuming each card + gap is approx 400px x number of original items)
      // This is a naive calculation for visual infinity without external bounds reading
      const itemWidth = 380; // card w-80 (320px) + gap-8 (32px) = 352px + margins
      const totalWidth = itemWidth * testimonials.length;
      
      if (newX <= -totalWidth) {
        newX = newX + totalWidth;
      }
      
      x.set(newX);
    }
  });

  return (
    <div className="relative overflow-hidden py-12" ref={containerRef}>
      {/* Huge subtle quote marks in background */}
      <div className="absolute top-0 left-10 text-[20rem] font-serif leading-none text-zinc-100 select-none z-0 mt-[-100px]">
        &ldquo;
      </div>
      <div className="absolute bottom-0 right-10 text-[20rem] font-serif leading-none text-zinc-100 select-none z-0 mb-[-100px] rotate-180">
        &ldquo;
      </div>

      <motion.div
        className="flex gap-8 cursor-grab active:cursor-grabbing w-max z-10 relative px-8"
        style={{ x }}
        drag="x"
        dragConstraints={containerRef} // Restrict drag so it doesn't fly off screen
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onPointerDown={() => setIsHovered(true)}
        onPointerUp={() => setIsHovered(false)}
      >
        {displayItems.map((testimonial, idx) => (
          <motion.div
            key={`${testimonial.id}-${idx}`}
            className="w-80 md:w-96 flex-shrink-0 bg-white border border-zinc-100 p-8 rounded-3xl transition-all duration-500 ease-out"
            whileHover={{ 
              y: -8, 
              boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
            }}
          >
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Content */}
            <p className="text-zinc-700 text-lg leading-relaxed mb-8 font-medium">
              &quot;{testimonial.content}&quot;
            </p>

            {/* Author */}
            <div className="flex items-center gap-4 mt-auto">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-zinc-100 flex-shrink-0">
                {testimonial.avatarUrl ? (
                  <Image 
                    src={testimonial.avatarUrl} 
                    alt={testimonial.authorName}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-brand-green/20 text-brand-green font-bold text-lg">
                    {testimonial.authorName.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-bold text-zinc-900">{testimonial.authorName}</h4>
                <p className="text-sm text-zinc-500">
                  {testimonial.authorRole} {testimonial.company && <span className="text-brand-green font-medium">@ {testimonial.company}</span>}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {displayItems.length === 0 && (
         <div className="text-center py-10 relative z-10 text-zinc-500">
            Brak opinii do wyświetlenia.
         </div>
      )}
    </div>
  );
};
