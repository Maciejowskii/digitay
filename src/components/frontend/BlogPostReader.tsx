"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, User, Calendar, Facebook, Linkedin, Link2 } from "lucide-react";
import { useRef, useState } from "react";

type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  author: string | null;
  publishedAt: Date | null;
};

const blurDataUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAADUlEQVQyV2P4//8/AwAI/AL+X1oOigAAAABJRU5ErkJggg==";

const formatDate = (inputDate: Date | string | null) => {
  if (!inputDate) return "";
  
  const date = new Date(inputDate);
  const day = date.getUTCDate();
  const months = [
    "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
    "lipca", "sierpnia", "września", "października", "listopada", "grudnia"
  ];
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  
  return `${day} ${month} ${year}`;
};

// Organic Hover Share Button
function ShareButton({ icon: Icon, onClick, colorClass }: { icon: any, onClick?: () => void, colorClass?: string }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      className={`w-12 h-12 flex items-center justify-center rounded-none border border-white/10 bg-white/5 text-zinc-400 hover:text-black hover:bg-primary transition-colors duration-300 ${colorClass || ''}`}
    >
      <Icon className="w-5 h-5 pointer-events-none" />
    </motion.button>
  );
}

export const BlogPostReader = ({ post }: { post: BlogPost }) => {
  const { scrollYProgress } = useScroll();
  
  // Parallax setup for the cover image
  const coverYParams = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const coverOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="bg-transparent min-h-screen">
      {/* 
        Reading Progress Bar (Fixed Top)
      */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary transform-origin-left z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
      />

      {/* Basic Navigation Return */}
      <div className="absolute top-10 left-6 md:left-12 z-40">
        <Link href="/blog" className="flex items-center gap-2 text-white bg-black/50 border border-white/10 hover:bg-primary hover:text-black backdrop-blur-md px-4 py-2 rounded-none font-mono tracking-widest uppercase transition-colors text-xs">
           <ArrowLeft className="w-4 h-4" />
           Powrót do Wpisów
        </Link>
      </div>

      {/* 
        Hero Parallax Section 
      */}
      <div className="relative w-full h-[60vh] md:h-[75vh] flex items-end justify-center overflow-hidden bg-zinc-900">
        <motion.div 
          className="absolute inset-0 w-full h-[120%]" // Extra height to allow parallax travel
          style={{ y: coverYParams, opacity: coverOpacity }}
        >
          <Image 
            src={post.coverImage || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop"}
            alt={post.title}
            fill
            priority
            placeholder="blur"
            blurDataURL={blurDataUrl}
            className="object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/40 to-transparent z-10" />
        </motion.div>

        <div className="relative z-20 container max-w-4xl mx-auto px-6 pb-20 md:pb-24">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="flex flex-wrap items-center gap-4 text-zinc-300 font-medium text-sm md:text-base mb-6">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author || "Zespół Digitay"}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.publishedAt)}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black uppercase text-white leading-[1.1] tracking-tighter">
              {post.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* 
        Content Body (Tailwind Typography Reader) 
      */}
      <div className="relative bg-transparent border-t border-white/10 z-30">
        <div className="max-w-prose mx-auto px-6 py-20 md:py-32">
          
          {/* Prose Content Container */}
          <article 
             className="prose prose-invert prose-lg md:prose-xl max-w-none 
                        prose-headings:font-heading prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase 
                        prose-p:leading-relaxed prose-p:text-zinc-400
                        prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary/80
                        prose-blockquote:border-l-2 prose-blockquote:border-primary prose-blockquote:bg-white/5 prose-blockquote:p-6 prose-blockquote:rounded-none prose-blockquote:not-italic prose-blockquote:text-zinc-300 prose-blockquote:font-mono
                        prose-img:rounded-none prose-img:shadow-2xl prose-img:border prose-img:border-white/10"
             dangerouslySetInnerHTML={{ __html: post.content }} 
          />

          {/* 
            Author & Share Footer 
          */}
          <hr className="my-16 border-white/10" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-sm bg-white/5 flex items-center justify-center text-xl font-bold text-primary flex-shrink-0 border border-white/10">
                 {post.author ? post.author.charAt(0) : "D"}
              </div>
              <div>
                <p className="text-xs font-mono text-primary uppercase tracking-widest mb-1">[ AUTOR ]</p>
                <h4 className="text-xl font-heading font-black uppercase text-white">{post.author || "Zespół Digitay"}</h4>
                <p className="text-zinc-500 font-medium">Specjalista ds. digital</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
               <span className="text-xs font-mono text-zinc-500 mr-2 uppercase tracking-widest">[ UDOSTĘPNIJ ]</span>
               <ShareButton icon={Facebook} />
               <ShareButton icon={Linkedin} />
               <ShareButton icon={Link2} />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
