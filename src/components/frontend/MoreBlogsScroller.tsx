"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function MoreBlogsScroller({ posts }: { posts: any[] }) {
  if (!posts || posts.length === 0) return null;

  // Duplicate posts to ensure loop is smooth if there are too few
  const duplicatedPosts = [...posts, ...posts, ...posts, ...posts].slice(0, 10);

  return (
    <section className="py-24 md:py-32 border-t border-white/10 bg-[#07101B] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <h2 className="text-3xl md:text-5xl font-heading font-black uppercase text-white tracking-tighter">
          Zobacz <span className="text-primary">także</span>.
        </h2>
      </div>

      <div className="relative flex overflow-x-hidden w-full group">
        <motion.div
           className="flex gap-6 px-6"
           animate={{
             x: ["0%", "-50%"]
           }}
           transition={{
             repeat: Infinity,
             ease: "linear",
             duration: 60,
           }}
        >
          {duplicatedPosts.map((post, i) => (
            <Link 
               key={`${post.slug}-${i}`}
               href={`/blog/${post.slug}`}
               className="relative flex-none w-[300px] md:w-[400px] h-[350px] md:h-[450px] group/card rounded-3xl overflow-hidden border border-white/10"
            >
               <div className="absolute inset-0 z-0">
                  <Image 
                    src={post.coverImage || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80"} 
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 300px, 400px"
                    className="object-cover opacity-60 mix-blend-luminosity grayscale group-hover/card:grayscale-0 group-hover/card:scale-105 transition-all duration-[1s] ease-out"
                  />
               </div>
               
               <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
               <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 z-10" />

               <div className="relative z-20 h-full p-6 md:p-8 flex flex-col justify-end">
                  <h3 className="font-heading font-black text-xl md:text-2xl text-white uppercase tracking-tighter leading-tight group-hover/card:text-primary transition-colors duration-500 mb-3 line-clamp-3">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 text-white/50 group-hover/card:text-white transition-colors duration-300">
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover/card:border-primary group-hover/card:bg-primary group-hover/card:text-black transition-all">
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                    <span className="text-xs uppercase tracking-widest font-bold">Czytaj</span>
                  </div>
               </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
