"use client";

import { X } from "lucide-react";
import { ProductForm } from "@/components/ProductForm";
import { useModal } from "@/hooks/useModal";
import type { Product } from "@/types/product";

interface ProductFormPanelProps {
  product?: Product | null;
  onClose: () => void;
  onSave: (data: Omit<Product, "id" | "created_at">) => Promise<void>;
  loading?: boolean;
}

export function ProductFormPanel({
  product,
  onClose,
  onSave,
  loading,
}: ProductFormPanelProps) {
  const { modalRef, handleKeyDown } = useModal(true, onClose);

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={product ? "Modifier le produit" : "Nouveau produit"}
      ref={modalRef}
      onKeyDown={handleKeyDown}
    >
      <div className="bg-white w-full max-w-xl h-full overflow-y-auto shadow-2xl animate-slide-in-right">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-semibold text-brand-dark">
            {product ? "Modifier le produit" : "Nouveau produit"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <ProductForm
            product={product}
            onSubmit={onSave}
            onCancel={onClose}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
