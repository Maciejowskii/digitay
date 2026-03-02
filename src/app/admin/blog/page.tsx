"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit2, Trash2, Calendar, User } from "lucide-react";

export default function BlogAdminPage() {
  // Mock data for UI development before hooking up Drizzle
  const posts = [
    {
      id: 1,
      title: "10 trendów w web designie na 2024 rok, które musisz znać",
      slug: "10-trendow-web-design-2024",
      author: "Maciej",
      publishedAt: "2024-03-15",
      status: "Opublikowano",
      coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Dlaczego Twoja strona potrzebuje audytu UX?",
      slug: "dlaczego-potrzebujesz-audytu-ux",
      author: "Anna",
      publishedAt: null,
      status: "Szkic",
      coverImage: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Jak SEO zmienia reguły gry w e-commerce",
      slug: "seo-w-ecommerce",
      author: "Maciej",
      publishedAt: "2024-02-28",
      status: "Opublikowano",
      coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-jakarta font-bold text-zinc-900 tracking-tight">Artykuły na blogu</h1>
          <p className="text-zinc-500 mt-1">Zarządzaj treściami publikowanymi na stornie głównej.</p>
        </div>
        
        <Link 
          href="/admin/blog/nowy"
          className="inline-flex items-center justify-center gap-2 bg-zinc-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-zinc-800 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5 text-zinc-300" />
          Utwórz nowy post
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden">
        {/* Table Header/Legend */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-100 bg-zinc-50/50 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          <div className="col-span-6 md:col-span-5">Artykuł</div>
          <div className="hidden md:block md:col-span-2">Autor</div>
          <div className="hidden md:block md:col-span-2">Data / Status</div>
          <div className="col-span-6 md:col-span-3 text-right">Akcje</div>
        </div>

        {/* List Items */}
        <div className="divide-y divide-zinc-50/80">
          {posts.map((post, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={post.id}
              className="group grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-zinc-50/80 transition-colors duration-200"
            >
              <div className="col-span-8 md:col-span-5 flex items-center gap-4">
                <div className="relative w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-100 border border-zinc-200/50">
                   <Image 
                     src={post.coverImage} 
                     alt={post.title}
                     fill
                     className="object-cover"
                     sizes="80px"
                   />
                </div>
                <div>
                  <h3 className="text-zinc-900 font-semibold line-clamp-1 group-hover:text-brand-green transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5 font-mono truncate max-w-[200px]">{post.slug}</p>
                </div>
              </div>

              <div className="hidden md:flex md:col-span-2 items-center gap-2 text-zinc-600 text-sm">
                <User className="w-4 h-4 text-zinc-400" />
                {post.author}
              </div>

              <div className="hidden md:flex flex-col md:col-span-2 gap-1.5 justify-center">
                 <div className="flex items-center gap-2 text-zinc-500 text-sm">
                    <Calendar className="w-4 h-4 text-zinc-400" />
                    {post.publishedAt ? post.publishedAt : 'Brak daty'}
                 </div>
                 <div className="flex">
                    <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                      post.status === 'Opublikowano' 
                        ? 'bg-emerald-100/50 text-emerald-700' 
                        : 'bg-amber-100/50 text-amber-700'
                    }`}>
                      {post.status}
                    </span>
                 </div>
              </div>

              {/* Actions */}
              <div className="col-span-4 md:col-span-3 flex justify-end items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                <Link 
                  href={`/admin/blog/edytuj/${post.id}`}
                  className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-white rounded-lg transition-colors shadow-sm border border-transparent hover:border-zinc-200"
                >
                  <Edit2 className="w-4 h-4" />
                </Link>
                <button 
                  className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
          
          {posts.length === 0 && (
            <div className="py-16 text-center text-zinc-500">
              <p>Brak artykułów. Utwórz swój pierwszy post!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
