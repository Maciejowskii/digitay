"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogPageClient({ initialPosts = [] }: { initialPosts?: any[] }) {
  const displayPosts = initialPosts.length > 0 ? initialPosts.map(p => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    tag: "AI // BIZNES", // tymczasowo, bo nie mamy kategorii w schemacie DB, a design tego wymaga
    date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('pl-PL', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase() : "",
    image: p.coverImage || "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=2670&auto=format&fit=crop"
  })) : [];
  return (
    <div className="bg-background text-white selection:bg-primary/30 selection:text-white min-h-screen overflow-hidden">
      
      {/* ═══════════════════════════════════════════════
          FLAT & FUNCTIONAL PREMIUM HERO
      ═══════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-32">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-primary/10 rounded-full blur-[180px] -translate-y-1/2 translate-x-1/3 pointer-events-none animate-pulse duration-[10s]" />
        <div className="absolute top-1/2 left-0 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-blue-500/5 rounded-full blur-[150px] -translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,#000_20%,transparent_100%)]" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10 relative flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-sm tracking-[0.2em] uppercase font-bold">Baza Wiedzy</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-5xl md:text-7xl lg:text-[9vw] xl:text-[10vw] font-heading font-black leading-[0.85] tracking-tighter"
          >
            ARTYKUŁY<span className="text-primary">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 text-white/50 text-lg md:text-2xl max-w-2xl leading-relaxed"
          >
            Dzielimy się wiedzą o inżynierii, marketingu i designie. Poznaj nasze strategie budowania liderów w cyfrowym świecie.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          EDITORIAL GRID SECTION
      ═══════════════════════════════════════════════ */}
      <section className="relative z-20 pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8 auto-rows-[450px]">
            
            {displayPosts.length === 0 && (
              <div className="col-span-1 md:col-span-2 lg:col-span-6 flex items-center justify-center p-12 lg:p-24 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                <p className="text-white/50 text-xl md:text-2xl font-light text-center">Brak wygenerowanych lub opublikowanych artykułów. Zaglądnij tu później!</p>
              </div>
            )}

            {displayPosts.map((post: any, idx: number) => {
              // Pierwszy post jest wyróżniony (Featured)
              const isFeatured = idx === 0;
              // Drugi post zajmuje 3 kolumny (Pół siatki w dużym ekranie)
              // Trzeci zajmuje 3 kolumny
              const colSpanClass = isFeatured 
                ? "md:col-span-2 lg:col-span-6 row-span-1 lg:row-span-1" 
                : "md:col-span-1 lg:col-span-2";

              return (
                <Link
                  href={`/blog/${post.slug}`}
                  key={idx}
                  className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm flex flex-col justify-end p-8 md:p-10 ${colSpanClass}`}
                >
                  {/* Dynamic Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
                  
                  {/* Hover Glow Edge */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

                  {/* Image Background */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover opacity-60 mix-blend-luminosity grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
                    />
                  </div>

                  {/* Content */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="relative z-20"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-primary font-mono text-xs tracking-widest uppercase font-bold px-3 py-1 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md">
                        {post.tag}
                      </span>
                      <span className="text-white/60 font-mono text-xs uppercase">{post.date}</span>
                    </div>

                    <h3 className={`font-heading font-black text-white uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors duration-500 mb-4 ${isFeatured ? 'text-4xl md:text-5xl lg:text-6xl max-w-4xl' : 'text-2xl md:text-3xl'}`}>
                      {post.title}
                    </h3>
                    
                    <p className={`text-[#CED0DF] font-light leading-relaxed line-clamp-2 ${isFeatured ? 'text-lg md:text-xl max-w-2xl' : 'text-base'}`}>
                      {post.excerpt}
                    </p>

                    <div className="mt-8 flex items-center gap-3 text-white/50 group-hover:text-white transition-colors duration-300">
                      <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-black transition-all">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                      <span className="text-xs uppercase tracking-widest font-bold">Czytaj artykuł</span>
                    </div>
                  </motion.div>
                </Link>
              );
            })}

          </div>
        </div>
      </section>
    </div>
  );
}
