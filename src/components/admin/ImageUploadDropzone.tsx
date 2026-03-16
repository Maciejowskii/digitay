"use client";

import { useState, useCallback, useRef } from "react";
import { UploadCloud, X, Loader2, Image as ImageIcon } from "lucide-react";

type ImageUploadDropzoneProps = {
  value: string;
  onChange: (url: string) => void;
  className?: string;
};

export default function ImageUploadDropzone({ value, onChange, className = "" }: ImageUploadDropzoneProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setErrorMsg("");
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Krytyczny błąd: Plik przekracza 5MB.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Wystąpił nieznany błąd podczas uploadu.");
      }

      onChange(data.url); // Przekazanie URL do nadrzędnego formularza (np. /uploads/123.webp)
    } catch (err: any) {
      setErrorMsg(err.message || "Błąd sieciowy.");
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsHovering(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleUpload(file);
    }
  }, []);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange("");
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={onChangeInput}
        accept="image/jpeg, image/png, image/webp, image/gif, image/svg+xml"
        className="hidden"
      />

      <div
        onDragOver={(e) => { e.preventDefault(); setIsHovering(true); }}
        onDragLeave={() => setIsHovering(false)}
        onDrop={onDrop}
        onClick={() => !value && !isUploading && fileInputRef.current?.click()}
        className={`relative w-full border border-dashed transition-all flex flex-col items-center justify-center min-h-[180px] group
          ${value ? "border-zinc-300 bg-zinc-50 cursor-default" 
            : "border-zinc-400 bg-white hover:bg-zinc-50 cursor-pointer"}
          ${isHovering && !value ? "border-zinc-900 ring-4 ring-zinc-900/10 bg-zinc-50" : ""}
          ${isUploading ? "opacity-75 cursor-wait" : ""}
        `}
      >
        {isUploading ? (
          <div className="flex flex-col items-center text-zinc-900">
            <Loader2 className="w-8 h-8 animate-spin mb-3" />
            <p className="font-mono text-xs uppercase tracking-widest font-bold">Inicjacja Transferu...</p>
          </div>
        ) : value ? (
          // Przełączony stan z podglądem obrazka
          <div className="absolute inset-0 w-full h-full p-2">
            <div className="relative w-full h-full border border-zinc-200 bg-white shadow-sm flex items-center justify-center overflow-hidden group">
               {/* Używamy standardowego elementu <img> bo nie znamy dokładnych optymalizacji dla Next/Image w tym specyficznym użyciu w Adminie */}
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img src={value} alt="Podgląd uploadu" className="max-h-full max-w-full object-contain" />
               
               {/* Brutalist Overlay Button do usunięcia */}
               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={handleRemove}
                    className="flex items-center gap-2 bg-red-600 text-white font-mono text-xs tracking-widest uppercase px-4 py-3 hover:bg-red-500 transition-colors"
                  >
                     <X className="w-4 h-4" /> Usuń zasób
                  </button>
               </div>
            </div>
          </div>
        ) : (
          // Pusta strefa zrzutu
          <div className="flex flex-col items-center text-zinc-500 group-hover:text-zinc-900 transition-colors pointer-events-none p-6 text-center">
            <UploadCloud className="w-10 h-10 mb-4 stroke-[1.5]" />
            <p className="font-bold text-sm text-zinc-900 mb-1">Przeciągnij wizualizację do strefy zrzutu</p>
            <p className="font-mono text-xs uppercase tracking-widest mb-4">LUB KLIKNIJ ABY WSKAZAĆ LOKALIZACJĘ NA DYSKU</p>
            <p className="text-xs text-zinc-400">JPG, PNG, WEBP (Limit: 5MB)</p>
          </div>
        )}
      </div>
      
      {/* Alert Error */}
      {errorMsg && (
        <p className="text-red-500 font-mono text-xs uppercase mt-2">
          [ {errorMsg} ]
        </p>
      )}
    </div>
  );
}
