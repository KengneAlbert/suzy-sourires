"use client";

import { Shield, UserCheck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AdminEmailList } from "@/components/AdminEmailList";

export function AdminWhitelistPage() {
  const { user } = useAuth();

  return (
    <AdminEmailList
      config={{
        table: "admin_users",
        title: "Administrateurs",
        description: "Gérez les comptes ayant accès au panel d'administration.",
        icon: Shield,
        iconColor: "text-brand-rose",
        placeholder: "nouveau-admin@exemple.com",
        emptyTitle: "Aucun administrateur configuré.",
        duplicateMessage: "Cet email est déjà administrateur.",
        loadingErrorMessage:
          "Impossible de charger la liste des administrateurs.",
        deleteTitle: "Retirer l'administrateur",
        deleteMessage:
          'Êtes-vous sûr de vouloir retirer "{email}" des administrateurs ?',
        itemIcon: UserCheck,
        itemIconBg: "bg-brand-rose/10",
        itemIconColor: "text-brand-rose",
        canDelete: (item) => item.email !== user?.email,
        deleteDisabledTitle: () => "Vous ne pouvez pas vous retirer",
        renderBadge: (item) =>
          item.email === user?.email ? (
            <span className="text-xs bg-brand-rose/10 text-brand-rose px-2 py-0.5 rounded-full font-medium">
              Vous
            </span>
          ) : null,
      }}
    />
  );
}
