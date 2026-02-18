"use client";

import { useState, useCallback, useRef } from "react";
import {
  Upload,
  X,
  Loader2,
  ImageIcon,
  Star,
  GripVertical,
  AlertTriangle,
} from "lucide-react";
import { useImageUpload } from "@/hooks/useImageUpload";

interface ImageUploadInputProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
}

export function ImageUploadInput({
  value,
  onChange,
  maxImages = 5,
}: ImageUploadInputProps) {
  const { uploadImage, uploading } = useImageUpload();
  const [dragActive, setDragActive] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Ref pour avoir la valeur à jour dans handleFiles (évite le stale closure)
  const valueRef = useRef(value);
  valueRef.current = value;

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const remaining = maxImages - valueRef.current.length;
      const toUpload = fileArray.slice(0, remaining);

      for (const file of toUpload) {
        const url = await uploadImage(file);
        if (url) {
          // Utiliser valueRef.current pour avoir la valeur à jour
          const updated = [...valueRef.current, url];
          onChange(updated);
        }
      }
    },
    [maxImages, uploadImage, onChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      if (e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragActive(false);
  }, []);

  const removeImage = useCallback(
    (index: number) => {
      onChange(value.filter((_, i) => i !== index));
    },
    [value, onChange],
  );

  const setAsMain = useCallback(
    (index: number) => {
      if (index === 0) return;
      const newImages = [...value];
      const [moved] = newImages.splice(index, 1);
      newImages.unshift(moved);
      onChange(newImages);
    },
    [value, onChange],
  );

  // Drag & drop reorder entre images
  const handleImageDragStart = useCallback((index: number) => {
    setDraggedIndex(index);
  }, []);

  const handleImageDragOver = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      e.stopPropagation();
      if (draggedIndex !== null && draggedIndex !== index) {
        setDragOverIndex(index);
      }
    },
    [draggedIndex],
  );

  const handleImageDrop = useCallback(
    (e: React.DragEvent, targetIndex: number) => {
      e.preventDefault();
      e.stopPropagation();
      if (draggedIndex === null || draggedIndex === targetIndex) {
        setDraggedIndex(null);
        setDragOverIndex(null);
        return;
      }
      const newImages = [...value];
      const [moved] = newImages.splice(draggedIndex, 1);
      newImages.splice(targetIndex, 0, moved);
      onChange(newImages);
      setDraggedIndex(null);
      setDragOverIndex(null);
    },
    [draggedIndex, value, onChange],
  );

  const handleImageDragEnd = useCallback(() => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  }, []);

  const handleImageError = useCallback((url: string) => {
    setBrokenImages((prev) => new Set(prev).add(url));
  }, []);

  return (
    <div className="space-y-4">
      {/* Image count */}
      {value.length > 0 && (
        <p className="text-sm text-gray-500">
          {value.length} image{value.length > 1 ? "s" : ""} • Glissez pour
          réordonner
        </p>
      )}

      {/* Preview grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {value.map((url, idx) => (
            <div
              key={`${url}-${idx}`}
              draggable
              onDragStart={() => handleImageDragStart(idx)}
              onDragOver={(e) => handleImageDragOver(e, idx)}
              onDrop={(e) => handleImageDrop(e, idx)}
              onDragEnd={handleImageDragEnd}
              className={`
                relative aspect-square rounded-xl overflow-hidden group border-2 transition-all cursor-grab active:cursor-grabbing
                ${dragOverIndex === idx ? "border-brand-rose scale-105 shadow-lg" : draggedIndex === idx ? "border-brand-rose/50 opacity-50" : "border-gray-200 hover:border-gray-300"}
              `}
            >
              {brokenImages.has(url) ? (
                /* Fallback pour images cassées */
                <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center gap-2 p-2">
                  <AlertTriangle className="w-8 h-8 text-amber-400" />
                  <span className="text-[10px] text-gray-500 text-center leading-tight">
                    Image introuvable
                  </span>
                </div>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={url}
                  alt={`Image ${idx + 1}`}
                  onError={() => handleImageError(url)}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              )}

              {/* Overlay on hover/touch */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />

              {/* Drag handle */}
              <div className="absolute top-2 left-2 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow">
                <GripVertical className="w-4 h-4 text-gray-600" />
              </div>

              {/* Delete button */}
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                title="Supprimer cette image"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Set as main button (only for non-first images) */}
              {idx > 0 && (
                <button
                  type="button"
                  onClick={() => setAsMain(idx)}
                  className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-2 py-1.5 rounded-lg flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shadow hover:bg-white"
                  title="Définir comme image principale"
                >
                  <Star className="w-3 h-3" /> Principale
                </button>
              )}

              {/* Main badge */}
              {idx === 0 && (
                <span className="absolute bottom-2 left-2 text-xs bg-brand-rose text-white px-2.5 py-1 rounded-full font-medium shadow">
                  ★ Principale
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload zone */}
      {value.length < maxImages && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
            ${dragActive ? "border-brand-rose bg-brand-rose/5 scale-[1.02]" : "border-gray-300 hover:border-brand-rose/50 hover:bg-gray-50"}
            ${uploading ? "pointer-events-none opacity-60" : ""}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-brand-rose animate-spin" />
              <p className="text-gray-600">Téléversement en cours…</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                {dragActive ? (
                  <ImageIcon className="w-7 h-7 text-brand-rose" />
                ) : (
                  <Upload className="w-7 h-7 text-gray-400" />
                )}
              </div>
              <div>
                <p className="text-gray-700 font-medium">
                  Glissez vos images ici ou{" "}
                  <span className="text-brand-rose underline">parcourir</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  PNG, JPG, WebP • Max 5 Mo • {value.length}/{maxImages} images
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
