"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Filter, ShoppingBag, AlertCircle, RefreshCw } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types/product";

const supabase = createClient();

export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from("products")
        .select("*")
        .eq("in_stock", true)
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setProducts(data ?? []);
    } catch {
      setError("Impossible de charger les produits. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const categories = useMemo(
    () => [
      "all",
      ...Array.from(
        new Set(
          products
            .map((p) => p.category)
            .filter((c): c is string => Boolean(c)),
        ),
      ),
    ],
    [products],
  );

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? products
        : products.filter((p) => p.category === activeCategory),
    [products, activeCategory],
  );

  return (
    <section id="produits" className="py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm tracking-widest uppercase text-brand-rose font-medium mb-4">
            Boutique
          </span>
          <h2 className="text-4xl lg:text-5xl font-light text-brand-dark mb-6">
            Nos <span className="italic">produits</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Une sélection de soins professionnels pour sublimer votre sourire au
            quotidien.
          </p>
        </div>

        {/* Category filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-brand-dark text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat === "all" ? (
                  <span className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5" /> Tous
                  </span>
                ) : (
                  cat
                )}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {error ? (
          <div className="text-center py-20">
            <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500 mb-4">{error}</p>
            <button
              onClick={fetchProducts}
              className="inline-flex items-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-xl hover:bg-brand-dark-light transition-colors font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              Réessayer
            </button>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="aspect-square bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-5 bg-gray-200 rounded w-2/3" />
                  <div className="h-6 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">
              Aucun produit disponible pour le moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
