"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Sparkles, AlertCircle, ListPlus, PenTool, Edit3 } from "lucide-react";
import { generateAndScheduleBlog, createManualBlog } from "../actions";

// ... existing code ...
function getScheduledDate(startDateStr: string, index: number, frequency: "1x" | "2x" | "3x") {
  const baseDate = new Date(startDateStr);
  const scheduledDate = new Date(baseDate);

  if (frequency === "1x") {
    scheduledDate.setDate(scheduledDate.getDate() + index);
    scheduledDate.setHours(18, 0, 0, 0);
  } else if (frequency === "2x") {
    scheduledDate.setDate(scheduledDate.getDate() + Math.floor(index / 2));
    const slot = index % 2;
    if (slot === 0) scheduledDate.setHours(10, 0, 0, 0);
    if (slot === 1) scheduledDate.setHours(18, 0, 0, 0);
  } else if (frequency === "3x") {
    scheduledDate.setDate(scheduledDate.getDate() + Math.floor(index / 3));
    const slot = index % 3;
    if (slot === 0) scheduledDate.setHours(8, 0, 0, 0);
    if (slot === 1) scheduledDate.setHours(14, 0, 0, 0);
    if (slot === 2) scheduledDate.setHours(20, 0, 0, 0);
  }
  return scheduledDate;
}

export function AIBlogForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"single" | "bulk" | "manual">("single");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bulkProgress, setBulkProgress] = useState({ current: 0, total: 0, currentTopic: "" });

  const handleSingleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const topic = formData.get("topic") as string;
    const keywords = formData.get("keywords") as string;
    const publishedAt = formData.get("publishedAt") as string;

    try {
      const result = await generateAndScheduleBlog({
        topic,
        keywords,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      });

      if (result.success) {
        router.push("/admin/blog");
        router.refresh();
      } else {
        setError(result.error || "Wystąpił błąd podczas generowania.");
      }
    } catch (err) {
      setError("Wystąpił nieoczekiwany błąd. Upewnij się, że klucze API są skonfigurowane w .env.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBulkSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const topicsRaw = formData.get("bulkTopics") as string;
    const frequency = formData.get("frequency") as "1x" | "2x" | "3x";
    const startDateStr = formData.get("startDate") as string;

    const topics = topicsRaw.split('\n').map(t => t.trim()).filter(t => t.length > 0);
    
    if (topics.length === 0) {
      setError("Lista tematów jest pusta. Wklej przynajmniej jeden temat.");
      return;
    }

    setIsGenerating(true);
    setBulkProgress({ current: 0, total: topics.length, currentTopic: "" });

    let hasError = false;

    // Przetwarzanie seryjne aby nie przeciazyc serwera
    for (let i = 0; i < topics.length; i++) {
       const topic = topics[i];
       setBulkProgress(prev => ({ ...prev, currentTopic: topic }));
       const scheduledDate = getScheduledDate(startDateStr, i, frequency);
       
       try {
         const result = await generateAndScheduleBlog({
           topic: topic,
           keywords: "", // Brak zaawansowanych słów kluczowych w trybie masowym
           publishedAt: scheduledDate
         });
         
         if (!result.success) {
            setError(`Błąd przy generowaniu tematu: "${topic}". Zatrzymałem pętlę.`);
            hasError = true;
            break; 
         }
         
         setBulkProgress(prev => ({ ...prev, current: i + 1 }));
       } catch (err) {
         setError(`Wystąpił nieoczekiwany błąd serwera przy temacie: "${topic}"`);
         hasError = true;
         break;
       }
    }

    setIsGenerating(false);

    if (!hasError) {
      router.push("/admin/blog");
      router.refresh();
    }
  };

  const handleManualSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const author = formData.get("author") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const coverImage = formData.get("coverImage") as string;
    const publishedAt = formData.get("publishedAt") as string;

    try {
      const result = await createManualBlog({
        title,
        slug,
        excerpt,
        content,
        coverImage,
        author,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      });

      if (result.success) {
        router.push("/admin/blog");
        router.refresh();
      } else {
        setError(result.error || "Wystąpił błąd podczas dodawania wpisu.");
      }
    } catch (err) {
      setError("Wystąpił nieoczekiwany błąd serwera.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex bg-zinc-100 p-1 rounded-xl flex-wrap">
        <button
          type="button"
          onClick={() => setMode("single")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-sm transition-all min-w-[200px] ${mode === "single" ? "bg-white text-indigo-700 shadow" : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200/50"}`}
        >
          <Sparkles className="w-4 h-4" /> AI Pojedynczy
        </button>
        <button
          type="button"
          onClick={() => setMode("bulk")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-sm transition-all min-w-[200px] ${mode === "bulk" ? "bg-white text-indigo-700 shadow" : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200/50"}`}
        >
          <ListPlus className="w-4 h-4" /> AI Masowe
        </button>
        <button
          type="button"
          onClick={() => setMode("manual")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-sm transition-all min-w-[200px] ${mode === "manual" ? "bg-white text-indigo-700 shadow" : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200/50"}`}
        >
          <Edit3 className="w-4 h-4" /> Własny Wpis
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 border border-red-100">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {mode === "single" && (
        <form onSubmit={handleSingleSubmit} className="space-y-6">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-zinc-900 mb-2">
              Główny temat wpisu *
            </label>
            <input
              type="text"
              name="topic"
              id="topic"
              required
              autoComplete="off"
              placeholder="np. Dlaczego warto założyć firmowego bloga na Next.js?"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-zinc-900 bg-zinc-50 focus:bg-white"
            />
          </div>

          <div>
            <label htmlFor="keywords" className="block text-sm font-medium text-zinc-900 mb-2">
              Dodatkowe słowa kluczowe (opcjonalnie)
            </label>
            <input
              type="text"
              name="keywords"
              id="keywords"
              autoComplete="off"
              placeholder="np. Next.js, SEO, szybkość strony, agencja reklamowa"
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-zinc-900 bg-zinc-50 focus:bg-white"
            />
          </div>

          <div>
            <label htmlFor="publishedAt" className="block text-sm font-medium text-zinc-900 mb-2">
              Data publikacji *
            </label>
            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl mb-2 text-sm text-zinc-500">
              Jeśli wybierzesz datę z przyszłości, wpis ukaże się na blogu w wybranym dniu, 
              ale wygeneruje się teraz (przeczytasz go w koszyku).
            </div>
            <input
              type="datetime-local"
              name="publishedAt"
              id="publishedAt"
              required
              defaultValue={new Date().toISOString().slice(0, 16)}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-zinc-900 bg-zinc-50 focus:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full bg-indigo-600 text-white rounded-xl py-4 font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>AI Pisze i Szuka Zdjęć...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6" />
                <span>Generuj Wpis AI</span>
              </>
            )}
          </button>
        </form>
      )}

      {mode === "bulk" && (
        <form onSubmit={handleBulkSubmit} className="space-y-6">
          <div>
            <label htmlFor="bulkTopics" className="block text-sm font-medium text-zinc-900 mb-2">
              Lista Tematów * (Każdy temat w nowej linii)
            </label>
            <textarea
              name="bulkTopics"
              id="bulkTopics"
              required
              rows={10}
              placeholder="5 kroków do idealnego e-commerce&#10;Pozycjonowanie SEO dla początkujących&#10;Marketing Google Ads w pigułce..."
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-zinc-900 bg-zinc-50 focus:bg-white resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="frequency" className="block text-sm font-medium text-zinc-900 mb-2">
                Częstotliwość publikacji
              </label>
              <select
                name="frequency"
                id="frequency"
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-zinc-900 bg-zinc-50 focus:bg-white appearance-none"
              >
                <option value="1x">1x Dziennie (o 18:00)</option>
                <option value="2x">2x Dziennie (10:00, 18:00)</option>
                <option value="3x">3x Dziennie (8:00, 14:00, 20:00)</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-zinc-900 mb-2">
                Start od dnia
              </label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                required
                defaultValue={new Date().toISOString().slice(0, 10)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-zinc-900 bg-zinc-50 focus:bg-white"
              />
            </div>
          </div>

          <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-700 text-sm">
             <p className="font-semibold mb-1">Uwaga do Masowego Generowania</p>
             <p>Po kliknięciu przycisku proces będzie generował wpisy <b>pojedynczo</b>. Otrzymasz pasek postępu. <b>Nie zamykaj ani nie odświeżaj tej karty, dopóki całość nie dobiegnie końca.</b></p>
          </div>

          {isGenerating ? (
            <div className="space-y-4">
               <div className="w-full bg-zinc-100 rounded-full h-4 overflow-hidden">
                 <div 
                   className="bg-indigo-600 h-full transition-all duration-500 flex items-center justify-end px-2"
                   style={{ width: `${(bulkProgress.current / bulkProgress.total) * 100}%` }}
                 >
                 </div>
               </div>
               <div className="flex flex-col text-sm text-zinc-600 items-center gap-1 font-medium">
                 <span>Wygenerowano: {bulkProgress.current} z {bulkProgress.total}</span>
                 <span className="text-xs text-zinc-400">Aktualnie tworzę: "{bulkProgress.currentTopic}"</span>
               </div>
               <button type="button" disabled className="w-full bg-indigo-50 text-indigo-400 rounded-xl py-4 font-medium flex items-center justify-center gap-3 cursor-wait">
                 <Loader2 className="w-5 h-5 animate-spin" /> Trwa proces pętli...
               </button>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white rounded-xl py-4 font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center gap-3 text-lg"
            >
              <Sparkles className="w-6 h-6" />
              <span>Generuj Seryjnie</span>
            </button>
          )}

        </form>
      )}

      {mode === "manual" && (
        <form onSubmit={handleManualSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-zinc-900 mb-2">Tytuł wpisu (H1) *</label>
              <input type="text" name="title" id="title" required className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-zinc-900 bg-zinc-50 focus:bg-white" />
            </div>
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-zinc-900 mb-2">Slug URL (opcjonalny, bez spacji)</label>
              <input type="text" name="slug" id="slug" placeholder="moj-nowy-wpis" className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-zinc-900 bg-zinc-50 focus:bg-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
               <label htmlFor="author" className="block text-sm font-medium text-zinc-900 mb-2">Autor</label>
               <select name="author" id="author" className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-zinc-900 bg-zinc-50 focus:bg-white appearance-none">
                 <option value="Jakub Wolert">Jakub Wolert</option>
                 <option value="Maciej Tyra">Maciej Tyra</option>
                 <option value="Kacper Wieraszka">Kacper Wieraszka</option>
               </select>
             </div>
             <div>
               <label htmlFor="publishedAt" className="block text-sm font-medium text-zinc-900 mb-2">Data Publikacji *</label>
               <input type="datetime-local" name="publishedAt" id="publishedAt" required defaultValue={new Date().toISOString().slice(0, 16)} className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-zinc-900 bg-zinc-50 focus:bg-white" />
             </div>
          </div>

          <div>
             <label htmlFor="coverImage" className="block text-sm font-medium text-zinc-900 mb-2">Link do Zdjęcia Okładki (URL Pexels / Unsplash)</label>
             <input type="url" name="coverImage" id="coverImage" placeholder="https://..." className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-zinc-900 bg-zinc-50 focus:bg-white" />
          </div>

          <div>
             <label htmlFor="excerpt" className="block text-sm font-medium text-zinc-900 mb-2">Zajawka / Krótki opis (Excerpt) *</label>
             <textarea name="excerpt" id="excerpt" required rows={2} className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-zinc-900 bg-zinc-50 focus:bg-white resize-none"></textarea>
          </div>

          <div>
             <label htmlFor="content" className="block text-sm font-medium text-zinc-900 mb-2">Pełna Treść (Zarządzana w HTML / Znaczniki H2, H3, P) *</label>
             <textarea name="content" id="content" required rows={12} placeholder="<h2>Mój wspaniały wpis</h2><p>Treść...</p>" className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-zinc-900 bg-zinc-50 focus:bg-white resize-y font-mono text-sm"></textarea>
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full bg-zinc-900 text-white rounded-xl py-4 font-medium hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 disabled:opacity-70 flex items-center justify-center gap-3 text-lg"
          >
            {isGenerating ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <PenTool className="w-6 h-6" />
                <span>Dodaj Wpis Ręcznie</span>
              </>
            )}
          </button>
        </form>
      )}

    </div>
  );
}
