"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Calendar, User } from "lucide-react";

type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  author: string | null;
  publishedAt: Date | null;
};

// Blur placeholder for next/image
const blurDataUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAADUlEQVQyV2P4//8/AwAI/AL+X1oOigAAAABJRU5ErkJggg==";

const formatDate = (inputDate: Date | string | null) => {
  if (!inputDate) return "Wkrótce";
  
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

export const BlogBentoGrid = ({ posts }: { posts: BlogPost[] }) => {
  if (posts.length === 0) {
    return (
      <div className="py-32 flex justify-center text-zinc-500 font-medium">
        Nasza baza wiedzy wkrótce się zapełni nowymi materiałami. Wróć za chwilę!
      </div>
    );
  }

  const featuredPost = posts[0];
  const bentoPosts = posts.slice(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      
      {/* 
        FEATURED POST (Full width spanning) 
      */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="col-span-1 md:col-span-2 lg:col-span-3"
      >
        <Link 
          href={`/blog/${featuredPost.slug}`} 
          className="group relative flex flex-col md:flex-row bg-transparent rounded-none overflow-hidden border border-white/10 hover:border-primary transition-colors duration-500 w-full"
        >
          {/* Image Side */}
          <div className="relative w-full md:w-3/5 aspect-video md:aspect-auto overflow-hidden bg-white/5 border-r border-white/10">
            <Image 
              src={featuredPost.coverImage || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop"}
              alt={featuredPost.title}
              fill
              placeholder="blur"
              blurDataURL={blurDataUrl}
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover blur-[2px] scale-100 group-hover:scale-105 group-hover:blur-0 transition-all duration-700 ease-in-out"
            />
          </div>

          {/* Content Side */}
          <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-primary mb-4">
              [ NOWOŚĆ ]
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-heading font-black text-white uppercase leading-tight mb-4 group-hover:text-primary transition-colors duration-300">
              {featuredPost.title}
            </h2>
            {featuredPost.excerpt && (
              <p className="text-zinc-400 text-sm font-medium leading-relaxed mb-8 line-clamp-3">
                {featuredPost.excerpt}
              </p>
            )}
            
            <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/10">
              <div className="flex gap-4">
                 <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
                    <User className="w-4 h-4" />
                    {featuredPost.author || 'Zespół'}
                 </div>
                 <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(featuredPost.publishedAt)}</span>
                 </div>
              </div>
              <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center text-zinc-400 group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                 <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* 
        REMAINING POSTS (Grid 1/2/3 cols based on screen) 
      */}
      {bentoPosts.map((post, idx) => (
         <motion.div 
           key={post.id}
           initial={{ y: 30, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.5, delay: (idx + 1) * 0.1, ease: "easeOut" }}
           className="col-span-1"
         >
           <Link 
             href={`/blog/${post.slug}`}
             className="group relative flex flex-col h-full bg-transparent rounded-none overflow-hidden border border-white/10 hover:border-primary transition-colors duration-500"
           >
             {/* Bento Image Top */}
             <div className="relative w-full aspect-[4/3] overflow-hidden bg-white/5 border-b border-white/10">
                <Image 
                  src={post.coverImage || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop"}
                  alt={post.title}
                  fill
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover blur-[2px] scale-100 group-hover:scale-105 group-hover:blur-0 transition-all duration-700 ease-in-out"
                />
             </div>
             
             {/* Content Bottom */}
             <div className="p-8 flex flex-col flex-grow">
               <h3 className="text-2xl font-heading font-black text-white uppercase leading-snug mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-3">
                 {post.title}
               </h3>
               {post.excerpt && (
                 <p className="text-zinc-400 font-medium leading-relaxed mb-6 line-clamp-2 text-sm">
                   {post.excerpt}
                 </p>
               )}
               
               <div className="mt-auto pt-6 flex items-center justify-between text-xs font-mono tracking-widest text-zinc-500 border-t border-white/10">
                  <span>{formatDate(post.publishedAt)}</span>
                  <div className="flex items-center gap-1 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    [ CZYTAJ ] <ArrowUpRight className="w-3 h-3" />
                  </div>
               </div>
             </div>
           </Link>
         </motion.div>
      ))}

    </div>
  );
};
