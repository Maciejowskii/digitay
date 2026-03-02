"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Image as ImageIcon, CheckCircle2, Loader2, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function NewBlogPostPage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [slug, setSlug] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");

  // TipTap Instance
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Napisz porywającą historię...</p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-zinc prose-lg max-w-none focus:outline-none min-h-[400px]",
      },
    },
    onUpdate: () => {
      triggerAutosave();
    },
  });

  // Mock Autosave handler
  const triggerAutosave = () => {
    setSaveState("saving");
    setTimeout(() => {
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2000);
    }, 1200);
  };

  // Mock Image Handle
  const handleImageMock = () => {
    // In real app, this would be a file input or upload modal
    setCoverImage("https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2670&auto=format&fit=crop");
    triggerAutosave();
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-8 relative pb-20">
      
      {/* 
        LEFT COLUMN: Main Editor Area (Notion style) 
      */}
      <div className="flex-1 max-w-4xl bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-zinc-100">
        
        {/* Top Navbar Context */}
        <div className="flex items-center justify-between mb-16 border-b border-zinc-100 pb-6">
          <Link href="/admin/blog" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Wróć do listy
          </Link>

          <AnimatePresence mode="popLayout">
            {saveState === "saving" && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-zinc-400 text-sm font-medium"
              >
                <Loader2 className="w-4 h-4 animate-spin" />
                Zapisywanie...
              </motion.div>
            )}
            {saveState === "saved" && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-emerald-600 text-sm font-medium"
              >
                <CheckCircle2 className="w-4 h-4" />
                Zapisano w chmurze
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Title Field */}
        <input
          type="text"
          placeholder="Tytuł artykułu"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            // Auto-slug generator rudimentary logic
            if(!slug || saveState === 'idle') {
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
            }
            triggerAutosave();
          }}
          className="w-full text-5xl md:text-6xl font-jakarta font-bold text-zinc-900 placeholder:text-zinc-300 focus:outline-none bg-transparent mb-10"
        />

        {/* Rich Text Tiptap Component */}
        <div className="mt-8">
           <EditorContent editor={editor} />
        </div>
      </div>


      {/* 
        RIGHT COLUMN: Settings Sidebar (Floating Panel) 
      */}
      <div className="w-full md:w-80 flex-shrink-0">
        <div className="sticky top-8 bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 flex flex-col gap-8">
          
          <h3 className="font-semibold text-zinc-900 flex items-center gap-2">
            Ustawienia publikacji
          </h3>

          {/* Status Toggle */}
          <div className="bg-zinc-50 p-4 rounded-2xl flex items-center justify-between border border-zinc-100/80">
             <div>
                <p className="font-medium text-sm text-zinc-900">Status Posts</p>
                <p className="text-xs text-zinc-500">{isPublished ? 'Publiczny' : 'Szkic roboczy'}</p>
             </div>
             
             <button
               onClick={() => {
                 setIsPublished(!isPublished);
                 triggerAutosave();
               }}
               className={`relative flex w-12 h-6 rounded-full transition-colors duration-300 ${
                 isPublished ? "bg-emerald-500 justify-end" : "bg-zinc-300 justify-start"
               } items-center px-1 cursor-pointer`}
             >
               <motion.div
                 layout
                 className="w-4 h-4 rounded-full bg-white shadow-sm"
               />
             </button>
          </div>

          {/* Cover Image Upload */}
          <div className="space-y-3">
             <label className="text-sm font-medium text-zinc-700">Okładka</label>
             {coverImage ? (
                <div className="relative aspect-video rounded-xl overflow-hidden group border border-zinc-200">
                   <Image src={coverImage} alt="Cover Preview" fill className="object-cover" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <button 
                       onClick={() => {
                         setCoverImage(null);
                         triggerAutosave();
                       }}
                       className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                     >
                       <X className="w-4 h-4" />
                     </button>
                   </div>
                </div>
             ) : (
                <button 
                  onClick={handleImageMock}
                  className="w-full aspect-video rounded-xl border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center text-zinc-400 hover:text-brand-green hover:border-brand-green/50 hover:bg-brand-green/5 transition-all"
                >
                  <ImageIcon className="w-6 h-6 mb-2" />
                  <span className="text-xs font-medium">Dodaj cover (16:9)</span>
                </button>
             )}
          </div>

          {/* URL Slug */}
          <div className="space-y-3">
             <label className="text-sm font-medium text-zinc-700">Adres URL (Slug)</label>
             <div className="flex items-center text-sm border border-zinc-200 rounded-xl overflow-hidden focus-within:ring-2 ring-brand-green/20 ring-offset-1 transition-all">
                <span className="bg-zinc-50 px-3 py-2.5 text-zinc-500 border-r border-zinc-200 selection:bg-transparent">
                  /blog/
                </span>
                <input 
                  type="text" 
                  value={slug}
                  onChange={(e) => { setSlug(e.target.value); triggerAutosave(); }}
                  className="w-full px-3 py-2.5 focus:outline-none text-zinc-700 placeholder:text-zinc-300"
                  placeholder="twoj-nowy-post"
                />
             </div>
          </div>

          {/* Excerpt */}
          <div className="space-y-3">
             <div className="flex items-center justify-between">
               <label className="text-sm font-medium text-zinc-700">Zajawka / SEO</label>
               <span className="text-[10px] text-zinc-400">{excerpt.length}/160</span>
             </div>
             <textarea 
               value={excerpt}
               onChange={(e) => { setExcerpt(e.target.value); triggerAutosave(); }}
               placeholder="Krótki tekst zachęcający do przeczytania. Widoczny w Google i na kartach społecznościowych..."
               className="w-full resize-none h-28 border border-zinc-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 ring-brand-green/20 ring-offset-1 transition-all text-zinc-700"
             />
          </div>

          {/* Submit Action */}
          <button 
             className="w-full mt-2 bg-zinc-900 text-white font-medium py-3.5 rounded-xl hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-900/10 flex items-center justify-center gap-2"
          >
             {isPublished ? 'Opublikuj Zmiany' : 'Zapisz Szkic'}
          </button>
        </div>
      </div>

    </div>
  );
}
