"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Share2,
  Check,
} from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";
import type { Product } from "@/types/product";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const allImages = product.images?.length
    ? product.images
    : product.image_url
      ? [product.image_url]
      : [];
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const hasDiscount =
    product.compare_at_price && product.compare_at_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.compare_at_price! - product.price) /
          product.compare_at_price!) *
          100,
      )
    : 0;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: product.name, url });
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link
        href="/#produits"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-dark transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Retour aux produits
      </Link>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100">
            {allImages.length > 0 ? (
              <Image
                src={allImages[currentImageIdx]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingBag className="w-20 h-20 text-gray-300" />
              </div>
            )}

            {/* Nav arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentImageIdx(
                      (prev) =>
                        (prev - 1 + allImages.length) % allImages.length,
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setCurrentImageIdx((prev) => (prev + 1) % allImages.length)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Discount badge */}
            {hasDiscount && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                -{discountPercent}%
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setCurrentImageIdx(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                    idx === currentImageIdx
                      ? "border-brand-rose ring-2 ring-brand-rose/30"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="flex flex-col">
          {product.category && (
            <span className="text-sm tracking-widest uppercase text-brand-rose font-medium mb-3">
              {product.category}
            </span>
          )}

          <h1 className="text-3xl lg:text-4xl font-light text-brand-dark mb-4">
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl font-bold text-brand-dark">
              {product.price.toFixed(2)} €
            </span>
            {hasDiscount && (
              <span className="text-xl text-gray-400 line-through">
                {product.compare_at_price!.toFixed(2)} €
              </span>
            )}
          </div>

          {/* Stock badge */}
          <div className="mb-8">
            {product.in_stock ? (
              <span className="inline-flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />{" "}
                En stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 text-red-700 bg-red-50 px-4 py-2 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-red-500 rounded-full" /> Rupture de
                stock
              </span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <div className="mb-10">
              <h2 className="text-lg font-medium text-brand-dark mb-3">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="mt-auto space-y-4">
            <button
              onClick={() =>
                openWhatsApp(
                  `Bonjour, je suis intéressé(e) par : ${product.name} (${product.price.toFixed(2)} €)`,
                )
              }
              disabled={!product.in_stock}
              className="w-full py-4 rounded-2xl text-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-brand-dark text-white hover:bg-brand-dark-light hover:scale-[1.02]"
            >
              Commander via WhatsApp
            </button>

            <button
              onClick={handleShare}
              className="w-full py-4 rounded-2xl text-lg font-medium border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-green-500" /> Lien copié !
                </>
              ) : (
                <>
                  <Share2 className="w-5 h-5" /> Partager
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
