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
      className={`w-12 h-12 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-600 hover:text-white hover:bg-zinc-900 transition-colors duration-300 ${colorClass || ''}`}
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
    <div className="bg-white min-h-screen selection:bg-brand-green/20 selection:text-brand-green">
      {/* 
        Reading Progress Bar (Fixed Top)
      */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-brand-green transform-origin-left z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
      />

      {/* Basic Navigation Return */}
      <div className="absolute top-10 left-6 md:left-12 z-40">
        <Link href="/blog" className="flex items-center gap-2 text-white bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full font-medium transition-colors text-sm">
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
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.publishedAt)}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-jakarta font-bold text-white leading-[1.1] tracking-tight">
              {post.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* 
        Content Body (Tailwind Typography Reader) 
      */}
      <div className="relative bg-white z-30">
        <div className="max-w-prose mx-auto px-6 py-20 md:py-32">
          
          {/* Prose Content Container */}
          <article 
             className="prose prose-zinc prose-lg md:prose-xl max-w-none 
                        prose-headings:font-jakarta prose-headings:font-bold prose-headings:tracking-tight 
                        prose-p:leading-relaxed prose-p:text-zinc-600
                        prose-a:text-brand-green prose-a:no-underline hover:prose-a:text-brand-green/80
                        prose-blockquote:border-l-4 prose-blockquote:border-brand-green prose-blockquote:bg-brand-green/5 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-zinc-800 prose-blockquote:font-medium
                        prose-img:rounded-3xl prose-img:shadow-xl prose-img:border prose-img:border-zinc-100"
             dangerouslySetInnerHTML={{ __html: post.content }} 
          />

          {/* 
            Author & Share Footer 
          */}
          <hr className="my-16 border-zinc-100" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-xl font-bold text-brand-green flex-shrink-0 border-2 border-brand-green/20">
                 {post.author ? post.author.charAt(0) : "D"}
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-green uppercase tracking-wider mb-1">Autor</p>
                <h4 className="text-xl font-bold text-zinc-900">{post.author || "Zespół Digitay"}</h4>
                <p className="text-zinc-500">Specjalista ds. marketingu</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
               <span className="text-sm font-semibold text-zinc-400 mr-2 uppercase tracking-wide">Podaj dalej</span>
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
