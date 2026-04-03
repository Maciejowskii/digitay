"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit2, Trash2, Calendar, User, Loader2, ExternalLink } from "lucide-react";
import { deletePost } from "@/actions/blog";
import { useTransition } from "react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  author: string | null;
  publishedAt: Date | null;
  coverImage: string | null;
};

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: number) => {
    if (confirm("Czy na pewno chcesz usunąć ten wpis? To nieodwracalne.")) {
      startTransition(async () => {
        try {
          await deletePost(id);
        } catch (error) {
          alert("Wystąpił błąd podczas usuwania wpisu.");
        }
      });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-heading font-black text-zinc-900 tracking-tighter uppercase">Artykuły na blogu</h1>
          <p className="text-zinc-500 mt-1 font-medium">Zarządzaj treściami publikowanymi na blogu.</p>
        </div>
        
        <Link 
          href="/admin/blog/new"
          className="inline-flex items-center justify-center gap-2 bg-zinc-900 text-white px-5 py-2.5 rounded-none font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          UTWÓRZ NOWY
        </Link>
      </div>

      <div className="bg-white rounded-none shadow-sm border border-zinc-200 overflow-hidden relative">
        {isPending && (
          <div className="absolute inset-0 z-50 bg-white/50 backdrop-blur-sm flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-zinc-900" />
          </div>
        )}

        {/* Table Header/Legend */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-200 bg-zinc-50 font-mono text-xs font-semibold text-zinc-500 uppercase tracking-widest">
          <div className="col-span-6 md:col-span-5">Artykuł</div>
          <div className="hidden md:block md:col-span-2">Autor</div>
          <div className="hidden md:block md:col-span-2">Data / Status</div>
          <div className="col-span-6 md:col-span-3 text-right">Akcje</div>
        </div>

        {/* List Items */}
        <div className="divide-y divide-zinc-100">
          {posts.map((post, idx) => {
            const isPublished = post.publishedAt !== null && new Date(post.publishedAt) <= new Date();
            
            return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={post.id}
              className="group grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-zinc-50 transition-colors duration-200"
            >
              <div className="col-span-8 md:col-span-5 flex items-center gap-4">
                <div className="relative w-16 h-12 md:w-20 md:h-14 overflow-hidden flex-shrink-0 bg-zinc-100 border border-zinc-200">
                   {post.coverImage ? (
                     <Image 
                       src={post.coverImage} 
                       alt={post.title}
                       fill
                       className="object-cover"
                       sizes="80px"
                     />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-zinc-300">Img</div>
                   )}
                </div>
                <div>
                  <h3 className="text-zinc-900 font-bold line-clamp-1 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5 font-mono truncate max-w-[200px]">{post.slug}</p>
                </div>
              </div>

              <div className="hidden md:flex md:col-span-2 items-center gap-2 text-zinc-600 text-sm font-medium">
                <User className="w-4 h-4 text-zinc-400" />
                {post.author || "Brak"}
              </div>

              <div className="hidden md:flex flex-col md:col-span-2 gap-1.5 justify-center">
                 <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
                    <Calendar className="w-4 h-4 text-zinc-400" />
                    {post.publishedAt ? format(new Date(post.publishedAt), 'dd MMM yyyy', { locale: pl }) : 'Brak daty'}
                 </div>
                 <div className="flex">
                    <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border ${
                      isPublished 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {isPublished ? "PUBLIKACJA" : "SZKIC"}
                    </span>
                 </div>
              </div>

              {/* Actions */}
              <div className="col-span-4 md:col-span-3 flex justify-end items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                  className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors border border-transparent hover:border-zinc-300"
                  title="Podgląd posta"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
                <Link 
                  href={`/admin/blog/edytuj/${post.id}`}
                  className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors border border-transparent hover:border-zinc-300"
                  title="Edytuj post"
                >
                  <Edit2 className="w-4 h-4" />
                </Link>
                <button 
                  onClick={() => handleDelete(post.id)}
                  disabled={isPending}
                  className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors border border-transparent hover:border-red-200 disabled:opacity-50"
                  title="Usuń post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )})}
          
          {posts.length === 0 && (
            <div className="py-16 text-center text-zinc-500 font-medium">
              <p>Brak artykułów w bazie. Utwórz swój pierwszy post!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
