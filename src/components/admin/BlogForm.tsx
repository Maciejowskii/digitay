"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createPost, updatePost } from "@/actions/blog";
import { Loader2, ArrowLeft, Save, Eye } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import RichTextEditor from "./RichTextEditor";
import ImageUploadDropzone from "./ImageUploadDropzone";

type BlogPostType = {
  id?: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  author: string | null;
  publishedAt: Date | null;
};

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove non-word characters
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/-+/g, "-"); // Replace multiple dashes with single dash
}

export default function BlogForm({ initialData }: { initialData?: BlogPostType }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isEditing = !!initialData?.id;

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    coverImage: initialData?.coverImage || "",
    author: initialData?.author || "Zespół Digitay",
    publishedAt: initialData?.publishedAt 
        ? format(new Date(initialData.publishedAt), "yyyy-MM-dd'T'HH:mm") 
        : "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: value,
      // Auto-generate slug and excerpt if empty when title changes (only on Create)
      ...(name === "title" && !isEditing 
          ? { slug: generateSlug(value) } 
          : {})
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const payload = {
          title: formData.title,
          slug: formData.slug,
          excerpt: formData.excerpt || null,
          content: formData.content,
          coverImage: formData.coverImage || null,
          author: formData.author || null,
          publishedAt: formData.publishedAt ? new Date(formData.publishedAt) : null,
        };

        if (isEditing && initialData.id) {
          await updatePost(initialData.id, payload);
          alert("Wpis zaktualizowany pomyślnie.");
        } else {
          await createPost(payload);
          alert("Wpis utworzony pomyślnie.");
        }
        
        router.push("/admin/blog");
      } catch (error: any) {
        alert(error.message || "Wystąpił błąd zapisu.");
      }
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/admin/blog"
          className="p-2 border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-black text-zinc-900 uppercase tracking-tighter">
            {isEditing ? `Edycja Wpisu` : "Nowy Wpis"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 border border-zinc-300 shadow-sm relative">
        {isPending && (
          <div className="absolute inset-0 z-50 bg-white/50 backdrop-blur-sm flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-zinc-900" />
          </div>
        )}

        {/* Informacje Główne */}
        <div className="space-y-6">
          <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-600 border-b border-zinc-300 pb-2">Informacje główne</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900">Tytuł</label>
              <input
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border border-zinc-400 rounded-none focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors placeholder:text-zinc-600"
                placeholder="Np. 10 trendów Web Designu..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900">Slug (URL)</label>
              <input
                required
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full p-3 border border-zinc-400 rounded-none focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors font-mono text-xs placeholder:text-zinc-600"
                placeholder="Np. 10-trendow-web-designu"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900">Treść zajawki (Zalecane)</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 border border-zinc-400 rounded-none focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors placeholder:text-zinc-600"
                placeholder="Widoczne na karcie wpisu na ekranie bloga..."
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900">Zdjęcie okładkowe</label>
              <ImageUploadDropzone 
                value={formData.coverImage || ""}
                onChange={(url) => setFormData(prev => ({ ...prev, coverImage: url }))}
              />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900">Autor</label>
                <input
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full p-3 border border-zinc-400 rounded-none focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors placeholder:text-zinc-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900">Data publikacji (Opcjonalnie)</label>
                <input
                  type="datetime-local"
                  name="publishedAt"
                  value={formData.publishedAt}
                  onChange={handleChange}
                  className="w-full p-3 border border-zinc-400 rounded-none focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors placeholder:text-zinc-600"
                />
                <p className="text-xs text-zinc-700 font-mono">Brak daty = Szkic (niewidoczny publicznie)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-6">
          <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-600 border-b border-zinc-300 pb-2">Zawartość Artykułu</h3>
          
          <div className="space-y-2">
             <RichTextEditor 
               value={formData.content} 
               onChange={(val) => setFormData(prev => ({ ...prev, content: val }))} 
               placeholder="Zacznij pisać swój artykuł..." 
             />
          </div>
        </div>

        {/* CTA */}
        <div className="pt-8 border-t border-zinc-200 flex justify-between items-center">
          {isEditing && formData.slug && (
            <button
              type="button"
              onClick={() => window.open(`/blog/${formData.slug}`, '_blank')}
              className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 font-bold uppercase tracking-widest text-xs transition-colors"
            >
              <Eye className="w-4 h-4" />
              Podgląd na żywo
            </button>
          )}
          {!isEditing && <div />}
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 bg-zinc-900 text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isEditing ? "Aktualizuj wpis" : "Zapisz nowy wpis"}
          </button>
        </div>
      </form>
    </div>
  );
}
