"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";
import type { Product } from "@/types/product";

export function useProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setProducts(data || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors de la récupération des produits",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

    const subscription = supabase
      .channel("products-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => {
          fetchProducts();
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addProduct = async (product: Omit<Product, "id" | "created_at">) => {
    const { error: insertError } = await supabase
      .from("products")
      .insert(product);

    if (insertError) throw insertError;
    await fetchProducts();
  };

  const updateProduct = async (
    id: string,
    updates: Partial<Omit<Product, "id" | "created_at">>,
  ) => {
    const { error: updateError } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id);

    if (updateError) throw updateError;
    await fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (deleteError) throw deleteError;
    await fetchProducts();
  };

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}
