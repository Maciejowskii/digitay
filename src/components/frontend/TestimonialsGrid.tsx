"use client";

import { motion } from "framer-motion";
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

export const TestimonialsGrid = ({ testimonials }: { testimonials: Testimonial[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial, idx) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="bg-transparent border border-white/10 p-8 flex flex-col h-full"
        >
          {/* Header with Mono details */}
          <div className="flex justify-between items-start mb-8 border-b border-white/5 pb-4">
             <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
               [ LOG // {String(idx + 1).padStart(2, '0')} ]
             </div>
             {/* Minimalist Stars */}
             <div className="flex gap-1">
               {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                 <Star key={i} className="w-3 h-3 fill-white/20 text-white/20" />
               ))}
             </div>
          </div>

          {/* Content */}
          <p className="text-zinc-300 font-serif text-lg leading-relaxed mb-10 flex-1">
            "{testimonial.content}"
          </p>

          {/* Author footer strictly matching the tech look */}
          <div className="flex items-center gap-4 mt-auto">
             <div className="relative w-10 h-10 overflow-hidden bg-white/5 grayscale">
               {testimonial.avatarUrl ? (
                 <Image 
                   src={testimonial.avatarUrl} 
                   alt={testimonial.authorName}
                   fill
                   className="object-cover"
                   sizes="40px"
                 />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-zinc-500 font-mono text-xs">
                   {testimonial.authorName.charAt(0)}
                 </div>
               )}
             </div>
             <div className="flex flex-col">
               <span className="font-mono text-xs text-white uppercase tracking-widest">{testimonial.authorName}</span>
               <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mt-1">
                 {testimonial.authorRole} {testimonial.company && `// ${testimonial.company}`}
               </span>
             </div>
          </div>
        </motion.div>
      ))}

      {testimonials.length === 0 && (
         <div className="col-span-full py-20 text-center font-mono text-zinc-600 text-sm uppercase tracking-widest">
            [ / / Brak Raportów ]
         </div>
      )}
    </div>
  );
};
