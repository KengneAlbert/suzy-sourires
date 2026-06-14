"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import {
  Search,
  X,
  Sparkles,
  Droplets,
  ShoppingBag,
  Filter,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CATALOGUE } from "@/data/chogan";
import type { Gender, Tier, ChoganProduct } from "@/data/chogan";
import { openWhatsApp } from "@/lib/whatsapp";
import { createClient } from "@/lib/supabase-browser";
import type { Product } from "@/types/product";

// ─── Types ───────────────────────────────────────────────────────────────────

type Tab = "chogan" | "produits";

// ─── Chogan config ───────────────────────────────────────────────────────────

const GENDER_LABELS: Record<Gender | "tous", string> = {
  tous: "Tous",
  femme: "Femme",
  homme: "Homme",
  mixte: "Mixte",
  enfants: "Enfants",
};

const TIER_LABELS: Record<Tier | "tous", string> = {
  tous: "Toutes gammes",
  standard: "Standard",
  luxe: "Luxe",
  luxury: "Luxury",
};

const TIER_STYLE: Record<Tier, { badge: string; bar: string; btn: string }> = {
  standard: {
    badge: "bg-brand-rose/10 text-brand-rose border-brand-rose/30",
    bar: "bg-gradient-to-r from-brand-rose to-brand-rose-dark",
    btn: "bg-brand-rose hover:bg-brand-rose-dark text-white",
  },
  luxe: {
    badge: "bg-amber-50 text-amber-700 border-amber-300",
    bar: "bg-gradient-to-r from-amber-400 to-amber-600",
    btn: "bg-amber-500 hover:bg-amber-600 text-white",
  },
  luxury: {
    badge: "bg-violet-50 text-violet-700 border-violet-300",
    bar: "bg-gradient-to-r from-violet-500 to-violet-700",
    btn: "bg-violet-600 hover:bg-violet-700 text-white",
  },
};

const GENDER_STYLE: Record<Gender, string> = {
  femme: "bg-pink-50 text-pink-600 border-pink-200",
  homme: "bg-sky-50 text-sky-600 border-sky-200",
  mixte: "bg-teal-50 text-teal-600 border-teal-200",
  enfants: "bg-orange-50 text-orange-600 border-orange-200",
};

// ─── Filter pill ─────────────────────────────────────────────────────────────

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
        active
          ? "bg-brand-dark text-white shadow-md"
          : "bg-white text-black/60 border border-black/10 hover:border-brand-dark/40 hover:text-brand-dark"
      }`}
    >
      {children}
    </button>
  );
}

// ─── Chogan card ─────────────────────────────────────────────────────────────

function ChoganCard({ product }: { product: ChoganProduct }) {
  const style = TIER_STYLE[product.tier];
  const lowestPrice = Math.min(...product.prices.map((p) => p.price));

  const handleOrder = () => {
    const msg = [
      "Bonjour, je souhaite commander un parfum Chogan :",
      `• Code : ${product.code}`,
      `• Parfum : ${product.name}${product.brand ? ` (inspiré de ${product.name} — ${product.brand})` : ""}`,
      "• Format souhaité : ?",
      "",
      "Merci !",
    ].join("\n");
    openWhatsApp(msg);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-black/5">
      <div className={`h-1.5 w-full ${style.bar}`} />
      <div className="p-5 flex flex-col flex-1 gap-4">
        {/* Badges */}
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-xs font-bold tracking-widest text-black/40 bg-black/5 px-2 py-0.5 rounded">
            {product.code}
          </span>
          <div className="flex items-center gap-1.5">
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full border ${GENDER_STYLE[product.gender]}`}
            >
              {GENDER_LABELS[product.gender]}
            </span>
            {product.tier !== "standard" && (
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${style.badge}`}
              >
                {TIER_LABELS[product.tier]}
              </span>
            )}
          </div>
        </div>

        {/* Name */}
        <div>
          <h3 className="text-lg font-bold text-brand-dark leading-tight group-hover:text-brand-rose transition-colors">
            {product.name}
          </h3>
          {product.brand && (
            <p className="text-sm text-black/50 mt-0.5 font-medium italic">
              Inspiré de {product.brand}
            </p>
          )}
        </div>

        {/* Prices */}
        <div className="space-y-1.5 text-sm">
          {product.prices.map((p) => (
            <div key={p.label} className="flex justify-between items-center">
              <span className="text-black/60">{p.label}</span>
              <span className="font-semibold text-brand-dark tabular-nums">
                {p.price.toFixed(2).replace(".", ",")} €
              </span>
            </div>
          ))}
        </div>

        {product.hasGelDouche && (
          <div className="flex items-center gap-1.5 text-xs text-brand-rose/80">
            <Droplets className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Gel douche & crème corps disponibles</span>
          </div>
        )}

        <div className="mt-auto pt-2">
          <button
            onClick={handleOrder}
            className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${style.btn}`}
          >
            Commander — à partir de{" "}
            {lowestPrice.toFixed(2).replace(".", ",")} €
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Supabase product card ────────────────────────────────────────────────────

function ShopCard({ product }: { product: Product }) {
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
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5 flex flex-col">
      <Link
        href={`/produit/${product.id}`}
        className="block relative aspect-[4/3] overflow-hidden"
      >
        {mainImage ? (
          <Image
            src={mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-gray-300" />
          </div>
        )}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            -{discountPercent}%
          </div>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-1 gap-3">
        {product.category && (
          <span className="text-xs tracking-widest uppercase text-brand-rose font-medium">
            {product.category}
          </span>
        )}
        <Link href={`/produit/${product.id}`}>
          <h3 className="font-semibold text-brand-dark group-hover:text-brand-rose transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        {product.short_description && (
          <p className="text-sm text-black/50 line-clamp-2">
            {product.short_description}
          </p>
        )}
        <div className="flex items-center gap-2 mt-auto pt-1">
          <span className="text-lg font-bold text-brand-dark">
            {product.price.toFixed(2).replace(".", ",")} €
          </span>
          {hasDiscount && (
            <span className="text-sm text-black/30 line-through">
              {product.compare_at_price!.toFixed(2).replace(".", ",")} €
            </span>
          )}
        </div>
        <button
          onClick={() =>
            openWhatsApp(
              `Bonjour, je suis intéressé(e) par : ${product.name} (${product.price.toFixed(2)} €)`,
            )
          }
          disabled={!product.in_stock}
          className="w-full py-2.5 rounded-xl text-sm font-semibold bg-brand-dark text-white hover:bg-brand-dark-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {product.in_stock ? "Commander via WhatsApp" : "Rupture de stock"}
        </button>
      </div>
    </div>
  );
}

// ─── Chogan tab ───────────────────────────────────────────────────────────────

function ChoganTab() {
  const [gender, setGender] = useState<Gender | "tous">("tous");
  const [tier, setTier] = useState<Tier | "tous">("tous");
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      CATALOGUE.filter((p) => {
        if (gender !== "tous" && p.gender !== gender) return false;
        if (tier !== "tous" && p.tier !== tier) return false;
        if (search.trim()) {
          const q = search.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.brand?.toLowerCase().includes(q) ||
            p.code.toLowerCase().includes(q)
          );
        }
        return true;
      }),
    [gender, tier, search],
  );

  const genders: (Gender | "tous")[] = [
    "tous",
    "femme",
    "homme",
    "mixte",
    "enfants",
  ];
  const tiers: (Tier | "tous")[] = ["tous", "standard", "luxe", "luxury"];

  return (
    <>
      {/* Filters */}
      <div className="sticky top-[8.5rem] lg:top-40 z-20 bg-brand-cream/95 backdrop-blur-md py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-b border-black/5 mb-6">
        <div className="relative max-w-sm mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
          <input
            type="text"
            placeholder="Rechercher par nom, marque, code…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-black/10 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-rose/30 focus:border-brand-rose/50 placeholder:text-black/30"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black/30 hover:text-black/60"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          {genders.map((g) => (
            <Pill key={g} active={gender === g} onClick={() => setGender(g)}>
              {GENDER_LABELS[g]}
            </Pill>
          ))}
          <div className="w-px h-8 bg-black/10 self-center mx-1 hidden sm:block" />
          {tiers.map((t) => (
            <Pill key={t} active={tier === t} onClick={() => setTier(t)}>
              {t === "luxury" ? (
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Luxury
                </span>
              ) : (
                TIER_LABELS[t]
              )}
            </Pill>
          ))}
        </div>
      </div>

      <p className="text-sm text-black/40 mb-6">
        {filtered.length} parfum{filtered.length > 1 ? "s" : ""}
        {search && ` pour « ${search} »`}
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-xl text-black/40">Aucun résultat.</p>
          <button
            onClick={() => {
              setSearch("");
              setGender("tous");
              setTier("tous");
            }}
            className="mt-4 text-sm text-brand-rose underline underline-offset-2"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <ChoganCard key={p.code} product={p} />
          ))}
        </div>
      )}
    </>
  );
}

// ─── Produits tab ─────────────────────────────────────────────────────────────

const supabase = createClient();

function ProduitsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from("products")
        .select("*")
        .eq("in_stock", true)
        .order("created_at", { ascending: false });
      if (err) throw err;
      setProducts(data ?? []);
    } catch {
      setError("Impossible de charger les produits.");
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
        new Set(products.map((p) => p.category).filter(Boolean) as string[]),
      ),
    ],
    [products],
  );

  const filtered = useMemo(() => {
    let list =
      activeCategory === "all"
        ? products
        : products.filter((p) => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q),
      );
    }
    return list;
  }, [products, activeCategory, search]);

  if (error) {
    return (
      <div className="text-center py-24">
        <AlertCircle className="w-14 h-14 text-red-300 mx-auto mb-4" />
        <p className="text-lg text-black/50 mb-4">{error}</p>
        <button
          onClick={fetchProducts}
          className="inline-flex items-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-xl hover:opacity-80 transition-opacity text-sm font-medium"
        >
          <RefreshCw className="w-4 h-4" /> Réessayer
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Filters */}
      <div className="sticky top-[8.5rem] lg:top-40 z-20 bg-brand-cream/95 backdrop-blur-md py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-b border-black/5 mb-6">
        <div className="relative max-w-sm mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
          <input
            type="text"
            placeholder="Rechercher un produit…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-black/10 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-rose/30 focus:border-brand-rose/50 placeholder:text-black/30"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black/30 hover:text-black/60"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {categories.length > 1 && (
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <Pill
                key={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === "all" ? (
                  <span className="flex items-center gap-1.5">
                    <Filter className="w-3.5 h-3.5" /> Tous
                  </span>
                ) : (
                  cat
                )}
              </Pill>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden animate-pulse"
            >
              <div className="aspect-[4/3] bg-gray-100" />
              <div className="p-5 space-y-3">
                <div className="h-3 bg-gray-100 rounded w-1/3" />
                <div className="h-4 bg-gray-100 rounded w-2/3" />
                <div className="h-6 bg-gray-100 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24">
          <ShoppingBag className="w-14 h-14 text-black/20 mx-auto mb-4" />
          <p className="text-lg text-black/40">Aucun produit disponible.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-black/40 mb-6">
            {filtered.length} produit{filtered.length > 1 ? "s" : ""}
            {search && ` pour « ${search} »`}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p) => (
              <ShopCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function CatalogueClient() {
  const [tab, setTab] = useState<Tab>("chogan");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      {/* Hero */}
      <div className="py-10 lg:py-14 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-2.5 h-2.5 bg-brand-rose rounded-full animate-bounce-slow" />
          <span className="text-xs tracking-widest uppercase text-black/50">
            Notre sélection
          </span>
        </div>
        <h1 className="text-5xl lg:text-6xl font-light mb-4">
          Notre
          <span className="font-serif italic block text-brand-rose">
            catalogue
          </span>
        </h1>
        <p className="text-lg text-black/60 max-w-xl mx-auto leading-relaxed">
          Parfums Chogan de qualité extrait 30% et produits sélectionnés pour
          votre quotidien.
        </p>
      </div>

      {/* Tab bar */}
      <div className="sticky top-20 lg:top-24 z-30 bg-brand-cream/95 backdrop-blur-md -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pt-3 pb-0 border-b border-black/10">
        <div className="flex gap-1 max-w-xs">
          <button
            onClick={() => setTab("chogan")}
            className={`flex-1 py-3 text-sm font-semibold transition-all border-b-2 ${
              tab === "chogan"
                ? "border-brand-rose text-brand-rose"
                : "border-transparent text-black/50 hover:text-black/80"
            }`}
          >
            Parfums Chogan
          </button>
          <button
            onClick={() => setTab("produits")}
            className={`flex-1 py-3 text-sm font-semibold transition-all border-b-2 ${
              tab === "produits"
                ? "border-brand-rose text-brand-rose"
                : "border-transparent text-black/50 hover:text-black/80"
            }`}
          >
            Nos Produits
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {tab === "chogan" ? <ChoganTab /> : <ProduitsTab />}
      </div>

      {/* Disclaimer Chogan */}
      {tab === "chogan" && (
        <p className="text-xs text-black/25 text-center mt-12 max-w-2xl mx-auto">
          Les marques mentionnées sont des marques déposées appartenant à leurs
          propriétaires respectifs. Nos parfums sont des créations indépendantes
          qui s&apos;en inspirent.
        </p>
      )}
    </div>
  );
}
