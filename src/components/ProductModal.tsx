"use client";

import { X, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { openWhatsApp } from "@/lib/whatsapp";
import { useModal } from "@/hooks/useModal";
import type { Product } from "@/types/product";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { modalRef, handleKeyDown } = useModal(true, onClose);
  const mainImage = product.images?.[0] || product.image_url;
  const hasDiscount =
    product.compare_at_price && product.compare_at_price > product.price;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      ref={modalRef}
      onKeyDown={handleKeyDown}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative aspect-video overflow-hidden rounded-t-3xl">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-gray-300" />
            </div>
          )}
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          {!product.in_stock && (
            <div className="absolute bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
              Rupture de stock
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          {product.category && (
            <span className="text-xs tracking-widest uppercase text-brand-rose font-medium">
              {product.category}
            </span>
          )}
          <h2 className="text-2xl font-semibold text-brand-dark mt-2 mb-3">
            {product.name}
          </h2>

          {product.description && (
            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>
          )}

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-brand-dark">
              {product.price.toFixed(2)} €
            </span>
            {hasDiscount && (
              <span className="text-lg text-gray-400 line-through">
                {product.compare_at_price!.toFixed(2)} €
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() =>
                openWhatsApp(
                  `Bonjour, je suis intéressé(e) par : ${product.name} (${product.price.toFixed(2)} €)`,
                )
              }
              disabled={!product.in_stock}
              className="flex-1 py-3 px-6 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-brand-dark text-white hover:bg-brand-dark-light"
            >
              Commander via WhatsApp
            </button>
            <Link
              href={`/produit/${product.id}`}
              onClick={onClose}
              className="flex-1 py-3 px-6 rounded-xl font-medium border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white transition-all text-center inline-flex items-center justify-center gap-2"
            >
              Voir le produit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
