import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { ProductDetailClient } from "./ProductDetailClient";
import { ProductStructuredData } from "@/components/ProductStructuredData";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SITE_NAME } from "@/lib/constants";
import type { Product } from "@/types/product";

interface PageProps {
  params: { id: string };
}

async function getProduct(id: string): Promise<Product | null> {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  return data;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const product = await getProduct(params.id);

  if (!product) {
    return { title: "Produit introuvable" };
  }

  const mainImage = product.images?.[0] || product.image_url;

  return {
    title: product.name,
    description:
      product.description ||
      `${product.name} — Découvrez ce produit chez ${SITE_NAME}.`,
    openGraph: {
      title: product.name,
      description: product.description || undefined,
      images: mainImage
        ? [{ url: mainImage, width: 800, height: 800, alt: product.name }]
        : [],
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <main className="pt-20">
        <ProductStructuredData product={product} />
        <ProductDetailClient product={product} />
      </main>
      <Footer />
    </>
  );
}
