"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images?.[0] || product.image_url;
  const hasDiscount =
    product.compare_at_price && product.compare_at_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.compare_at_price! - product.price) /
          product.compare_at_price!) *
          100,
      )
    : 0;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100">
      {/* Image */}
      <Link
        href={`/produit/${product.id}`}
        className="block relative aspect-square overflow-hidden"
      >
        {mainImage ? (
          <Image
            src={mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-gray-300" />
          </div>
        )}

        {/* Discount badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            -{discountPercent}%
          </div>
        )}

        {/* Out of stock overlay */}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-medium">
              Rupture de stock
            </span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-5">
        {product.category && (
          <span className="text-xs tracking-widest uppercase text-brand-rose font-medium">
            {product.category}
          </span>
        )}

        <Link href={`/produit/${product.id}`}>
          <h3 className="text-lg font-medium text-brand-dark mt-1 mb-2 group-hover:text-brand-rose transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {product.description && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-semibold text-brand-dark">
            {product.price.toFixed(2)} €
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              {product.compare_at_price!.toFixed(2)} €
            </span>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={() =>
            openWhatsApp(
              `Bonjour, je suis intéressé(e) par : ${product.name} (${product.price.toFixed(2)} €)`,
            )
          }
          disabled={!product.in_stock}
          className="w-full py-3 rounded-xl text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-brand-dark text-white hover:bg-brand-dark-light"
        >
          Commander via WhatsApp
        </button>
      </div>
    </div>
  );
}
