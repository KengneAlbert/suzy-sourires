"use client";

import { useState, useEffect } from "react";
import { Loader2, Save, X } from "lucide-react";
import { ImageUploadInput } from "@/components/ImageUploadInput";
import type { Product } from "@/types/product";

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (data: Omit<Product, "id" | "created_at">) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const CATEGORIES = [
  "Blanchiment",
  "Hygiène dentaire",
  "Accessoires",
  "Kits",
  "Soins",
  "Autre",
];

export function ProductForm({
  product,
  onSubmit,
  onCancel,
  loading = false,
}: ProductFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [compareAtPrice, setCompareAtPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [inStock, setInStock] = useState(true);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description || "");
      setPrice(String(product.price));
      setCompareAtPrice(
        product.compare_at_price ? String(product.compare_at_price) : "",
      );
      setCategory(product.category || "");
      setInStock(product.in_stock);

      // Fusionner image_url dans le tableau images pour que toutes les images
      // soient visibles dans l'éditeur d'images
      const existingImages = product.images || [];
      const mainUrl = product.image_url || "";
      setImageUrl(mainUrl);

      if (existingImages.length > 0) {
        // Si image_url existe et n'est pas déjà dans le tableau, l'ajouter en premier
        if (mainUrl && !existingImages.includes(mainUrl)) {
          setImages([mainUrl, ...existingImages]);
        } else {
          setImages(existingImages);
        }
      } else if (mainUrl) {
        // Pas de tableau images mais une image_url → la mettre comme première image
        setImages([mainUrl]);
      } else {
        setImages([]);
      }
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await onSubmit({
      name: name.trim(),
      description: description.trim() || null,
      price: parseFloat(price),
      compare_at_price: compareAtPrice ? parseFloat(compareAtPrice) : null,
      category: category.trim() || null,
      image_url: images[0] || imageUrl || null,
      images: images.length > 0 ? images : null,
      in_stock: inStock,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nom du produit <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Kit Blanchiment Premium"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 outline-none transition-all"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description détaillée du produit…"
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 outline-none transition-all resize-none"
        />
      </div>

      {/* Price row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prix (€) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="29.90"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 outline-none transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prix barré (€)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={compareAtPrice}
            onChange={(e) => setCompareAtPrice(e.target.value)}
            placeholder="39.90"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Catégorie
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 outline-none transition-all bg-white"
        >
          <option value="">— Aucune —</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Images
        </label>
        <ImageUploadInput value={images} onChange={setImages} maxImages={5} />
      </div>

      {/* Stock toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setInStock(!inStock)}
          className={`relative w-12 h-7 rounded-full transition-colors ${
            inStock ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
              inStock ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        <span className="text-sm text-gray-700">
          {inStock ? "En stock" : "Rupture de stock"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <X className="w-4 h-4" /> Annuler
        </button>
        <button
          type="submit"
          disabled={loading || !name.trim() || !price}
          className="flex-1 py-3 rounded-xl bg-brand-dark text-white hover:bg-brand-dark-light transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {product ? "Modifier" : "Créer"}
        </button>
      </div>
    </form>
  );
}
