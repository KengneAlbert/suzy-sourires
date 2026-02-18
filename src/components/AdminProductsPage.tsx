"use client";

import { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Package,
  Loader2,
  Search,
  ImageIcon,
} from "lucide-react";
import { useProductsAdmin } from "@/hooks/useProductsAdmin";
import { ProductFormPanel } from "@/components/ProductFormPanel";
import { ConfirmModal } from "@/components/ConfirmModal";
import { useToast } from "@/components/Toast";
import type { Product } from "@/types/product";

export function AdminProductsPage() {
  const { products, loading, addProduct, updateProduct, deleteProduct } =
    useProductsAdmin();
  const { toast } = useToast();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.category &&
        p.category.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const handleSave = async (data: Omit<Product, "id" | "created_at">) => {
    setSaving(true);
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, data);
        toast("Produit mis à jour avec succès");
      } else {
        await addProduct(data);
        toast("Produit ajouté avec succès");
      }
      setShowForm(false);
      setEditingProduct(null);
    } catch {
      toast("Erreur lors de l'enregistrement", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingProduct) return;
    setSaving(true);
    try {
      await deleteProduct(deletingProduct.id);
      toast(`"${deletingProduct.name}" supprimé`, "info");
      setDeletingProduct(null);
    } catch {
      toast("Erreur lors de la suppression", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-brand-dark">Produits</h2>
          <p className="text-gray-500 mt-1">
            {products.length} produit{products.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
          className="inline-flex items-center gap-2 bg-brand-dark text-white px-5 py-3 rounded-xl hover:bg-brand-dark-light transition-colors font-medium"
        >
          <Plus className="w-4 h-4" /> Nouveau produit
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un produit…"
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 outline-none transition-all"
        />
      </div>

      {/* Product list */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-brand-rose animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-500">
            {searchQuery
              ? "Aucun résultat trouvé."
              : "Aucun produit pour le moment."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((product) => {
            const allImages = product.images?.length
              ? product.images
              : product.image_url
                ? [product.image_url]
                : [];
            const mainImage = allImages[0];
            const extraCount = allImages.length - 1;

            return (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    {mainImage ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={mainImage}
                          alt={product.name}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.nextElementSibling?.classList.remove(
                              "hidden",
                            );
                          }}
                          className="w-full h-full object-cover"
                        />
                        <div className="hidden w-full h-full flex items-center justify-center absolute inset-0">
                          <Package className="w-6 h-6 text-gray-300" />
                        </div>
                        {extraCount > 0 && (
                          <span className="absolute bottom-0 right-0 bg-black/70 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-tl-md">
                            +{extraCount}
                          </span>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-6 h-6 text-gray-300" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-brand-dark truncate">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-sm font-semibold">
                        {product.price.toFixed(2)} €
                      </span>
                      {product.category && (
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                          {product.category}
                        </span>
                      )}
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          product.in_stock
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {product.in_stock ? "En stock" : "Rupture"}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <ImageIcon className="w-3 h-3" />
                        {allImages.length} image
                        {allImages.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setShowForm(true);
                      }}
                      className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      title="Modifier"
                    >
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => setDeletingProduct(product)}
                      className="w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>

                {/* Thumbnail strip (when more than 1 image) */}
                {allImages.length > 1 && (
                  <div className="mt-3 pt-3 border-t border-gray-50 flex gap-2 overflow-x-auto">
                    {allImages.map((url, idx) => (
                      <div
                        key={`${url}-${idx}`}
                        className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 bg-gray-50"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={url}
                          alt={`${product.name} ${idx + 1}`}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                          className="w-full h-full object-cover"
                        />
                        {idx === 0 && (
                          <span className="absolute bottom-0 inset-x-0 bg-brand-rose text-white text-[8px] text-center leading-tight py-px">
                            ★
                          </span>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setShowForm(true);
                      }}
                      className="w-12 h-12 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center flex-shrink-0 hover:border-brand-rose hover:bg-brand-rose/5 transition-colors"
                      title="Gérer les images"
                    >
                      <Plus className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Form panel */}
      {showForm && (
        <ProductFormPanel
          product={editingProduct}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          onSave={handleSave}
          loading={saving}
        />
      )}

      {/* Delete confirm */}
      {deletingProduct && (
        <ConfirmModal
          title="Supprimer le produit"
          message={`Êtes-vous sûr de vouloir supprimer "${deletingProduct.name}" ? Cette action est irréversible.`}
          confirmLabel="Supprimer"
          variant="danger"
          onConfirm={handleDelete}
          onCancel={() => setDeletingProduct(null)}
        />
      )}
    </div>
  );
}
