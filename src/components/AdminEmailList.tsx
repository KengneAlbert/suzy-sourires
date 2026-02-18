"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Trash2,
  Loader2,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";
import { createClient } from "@/lib/supabase-browser";
import { ConfirmModal } from "@/components/ConfirmModal";
import { useToast } from "@/components/Toast";

interface AdminEmailItem {
  id: string;
  email: string;
  created_at: string;
}

interface AdminEmailListConfig {
  /** Supabase table name */
  table: string;
  /** Page title */
  title: string;
  /** Subtitle / description */
  description: string;
  /** Header icon */
  icon: LucideIcon;
  /** Icon color class (e.g. "text-brand-rose") */
  iconColor: string;
  /** Placeholder for the add input */
  placeholder: string;
  /** Empty state message */
  emptyTitle: string;
  /** Optional empty state subtitle */
  emptySubtitle?: string;
  /** Duplicate error message */
  duplicateMessage: string;
  /** Loading error message */
  loadingErrorMessage: string;
  /** Confirm delete title */
  deleteTitle: string;
  /** Confirm delete message (use {email} placeholder) */
  deleteMessage: string;
  /** Item icon */
  itemIcon: LucideIcon;
  /** Item icon bg class */
  itemIconBg: string;
  /** Item icon color class */
  itemIconColor: string;
  /** Render extra badge for an item (optional) */
  renderBadge?: (item: AdminEmailItem) => React.ReactNode;
  /** Can delete this item? (optional, default true) */
  canDelete?: (item: AdminEmailItem) => boolean;
  /** Delete button tooltip when disabled */
  deleteDisabledTitle?: (item: AdminEmailItem) => string;
}

export function AdminEmailList({ config }: { config: AdminEmailListConfig }) {
  const supabase = createClient();
  const { toast } = useToast();
  const [items, setItems] = useState<AdminEmailItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [deletingItem, setDeletingItem] = useState<AdminEmailItem | null>(null);

  const Icon = config.icon;
  const ItemIcon = config.itemIcon;

  const fetchItems = useCallback(async () => {
    const { data, error: fetchError } = await supabase
      .from(config.table)
      .select("*")
      .order("created_at", { ascending: true });

    if (fetchError) {
      setError(config.loadingErrorMessage);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  }, [config.table, config.loadingErrorMessage, supabase]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setAdding(true);
    setError(null);

    const { error: insertError } = await supabase
      .from(config.table)
      .insert({ email: email.trim().toLowerCase() });

    if (insertError) {
      setError(
        insertError.code === "23505"
          ? config.duplicateMessage
          : insertError.message,
      );
    } else {
      toast(`${email.trim().toLowerCase()} ajouté avec succès`);
      setEmail("");
      await fetchItems();
    }
    setAdding(false);
  };

  const handleDelete = async () => {
    if (!deletingItem) return;

    const { error: deleteError } = await supabase
      .from(config.table)
      .delete()
      .eq("id", deletingItem.id);

    if (deleteError) {
      setError(deleteError.message);
    } else {
      toast(`${deletingItem.email} retiré`, "info");
      await fetchItems();
    }
    setDeletingItem(null);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-brand-dark flex items-center gap-3">
          <Icon className={`w-6 h-6 ${config.iconColor}`} />
          {config.title}
        </h2>
        <p className="text-gray-500 mt-1">{config.description}</p>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Add form */}
      <form onSubmit={handleAdd} className="flex gap-3 mb-8">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={config.placeholder}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 outline-none transition-all"
          required
        />
        <button
          type="submit"
          disabled={adding || !email.trim()}
          className="inline-flex items-center gap-2 bg-brand-dark text-white px-5 py-3 rounded-xl hover:bg-brand-dark-light transition-colors font-medium disabled:opacity-50"
        >
          {adding ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          Ajouter
        </button>
      </form>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-brand-rose animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16">
          <Icon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-500">{config.emptyTitle}</p>
          {config.emptySubtitle && (
            <p className="text-gray-400 mt-2">{config.emptySubtitle}</p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const deletable = config.canDelete ? config.canDelete(item) : true;
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${config.itemIconBg}`}
                  >
                    <ItemIcon className={`w-5 h-5 ${config.itemIconColor}`} />
                  </div>
                  <div>
                    <p className="font-medium text-brand-dark">{item.email}</p>
                    <p className="text-xs text-gray-400">
                      Ajouté le{" "}
                      {new Date(item.created_at).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  {config.renderBadge?.(item)}
                </div>

                <button
                  onClick={() => setDeletingItem(item)}
                  disabled={!deletable}
                  className="w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  title={
                    !deletable && config.deleteDisabledTitle
                      ? config.deleteDisabledTitle(item)
                      : "Retirer"
                  }
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Confirm delete */}
      {deletingItem && (
        <ConfirmModal
          title={config.deleteTitle}
          message={config.deleteMessage.replace("{email}", deletingItem.email)}
          confirmLabel="Retirer"
          variant="danger"
          onConfirm={handleDelete}
          onCancel={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
}
