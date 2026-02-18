"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";

interface UploadOptions {
  maxSize?: number;
  allowedTypes?: string[];
}

export function useImageUpload(options: UploadOptions = {}) {
  const {
    maxSize = 5,
    allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
  } = options;

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const uploadImage = async (file: File): Promise<string | null> => {
    setError(null);
    setUploading(true);

    try {
      if (!allowedTypes.includes(file.type)) {
        throw new Error(
          `Type de fichier non autorisé. Types acceptés: ${allowedTypes.join(", ")}`,
        );
      }

      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSize) {
        throw new Error(
          `La taille du fichier doit être inférieure à ${maxSize}MB`,
        );
      }

      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 15);
      const fileExt = file.name.split(".").pop();
      const fileName = `${timestamp}-${random}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, file, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("product-images").getPublicUrl(filePath);

      return publicUrl;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erreur lors de l'upload";
      setError(errorMessage);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const uploadMultiple = async (files: File[]): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of files) {
      const url = await uploadImage(file);
      if (url) urls.push(url);
    }
    return urls;
  };

  return {
    uploadImage,
    uploadMultiple,
    uploading,
    error,
    clearError: () => setError(null),
  };
}
