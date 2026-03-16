"use client";

import { useState, useEffect } from "react";
import { getDirectories, addDirectory, toggleVerification, deleteDirectory } from "@/actions/directories";
import { Trash2, CheckCircle, XCircle, Plus, ExternalLink, Globe } from "lucide-react";

export default function KatalogiPage() {
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newLink, setNewLink] = useState({ url: "", name: "", notes: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchLinks();
  }, []);

  async function fetchLinks() {
    setLoading(true);
    const data = await getDirectories();
    setLinks(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newLink.url) return;

    setIsSubmitting(true);
    const res = await addDirectory(newLink);
    if (res.success) {
      setNewLink({ url: "", name: "", notes: "" });
      await fetchLinks();
    }
    setIsSubmitting(false);
  }

  async function handleToggle(id: number, currentStatus: boolean) {
    const res = await toggleVerification(id, currentStatus);
    if (res.success) {
      await fetchLinks();
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Czy na pewno chcesz usunąć ten link?")) return;
    const res = await deleteDirectory(id);
    if (res.success) {
      await fetchLinks();
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Globe className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Katalogi Firm</h1>
          </div>
          <p className="text-zinc-500 max-w-2xl leading-relaxed">
            Wewnętrzne narzędzie do zarządzania i weryfikacji linków z katalogów firm. 
            Ta strona jest ukryta i służy wyłącznie do celów administracyjnych.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Form */}
          <section className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] sticky top-8">
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-600" />
                Dodaj nowy link
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">URL Katalogu</label>
                  <input
                    type="url"
                    required
                    placeholder="https://example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm"
                    value={newLink.url}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">Nazwa (opcjonalnie)</label>
                  <input
                    type="text"
                    placeholder="np. Panorama Firm"
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm"
                    value={newLink.name}
                    onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">Notatki (opcjonalnie)</label>
                  <textarea
                    rows={3}
                    placeholder="Dodatkowe informacje..."
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm resize-none"
                    value={newLink.notes || ""}
                    onChange={(e) => setNewLink({ ...newLink, notes: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-zinc-900 text-white py-3 rounded-xl font-medium hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-zinc-200"
                >
                  {isSubmitting ? "Dodawanie..." : "Dodaj do listy"}
                </button>
              </form>
            </div>
          </section>

          {/* List Content */}
          <section className="lg:col-span-2">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-zinc-100 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : links.length === 0 ? (
              <div className="bg-white border border-dashed border-zinc-200 rounded-2xl p-12 text-center">
                <p className="text-zinc-500">Brak dodanych katalogów. Dodaj pierwszy link obok.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {links.map((link) => (
                  <div
                    key={link.id}
                    className="bg-white p-5 rounded-2xl border border-zinc-100 shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-zinc-900 truncate">
                            {link.name || "Bez nazwy"}
                          </h3>
                          {link.isVerified ? (
                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                              <CheckCircle className="w-3 h-3" /> Zweryfikowano
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                              <XCircle className="w-3 h-3" /> Oczekuje
                            </span>
                          )}
                        </div>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors break-all"
                        >
                          {link.url}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        {link.notes && (
                          <p className="text-xs text-zinc-500 mt-2 line-clamp-2 italic">
                            "{link.notes}"
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleToggle(link.id, link.isVerified)}
                          className={`p-2 rounded-lg transition-colors ${
                            link.isVerified 
                              ? "text-emerald-600 hover:bg-emerald-50" 
                              : "text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600"
                          }`}
                          title={link.isVerified ? "Oznacz jako niezweryfikowany" : "Oznacz jako zweryfikowany"}
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(link.id)}
                          className="p-2 text-zinc-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Usuń"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
