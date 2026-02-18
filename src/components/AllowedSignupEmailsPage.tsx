"use client";

import { Mail } from "lucide-react";
import { AdminEmailList } from "@/components/AdminEmailList";

export function AllowedSignupEmailsPage() {
  return (
    <AdminEmailList
      config={{
        table: "allowed_signup_emails",
        title: "Emails d'inscription autorisés",
        description:
          "Seuls les emails de cette liste pourront créer un compte administrateur.",
        icon: Mail,
        iconColor: "text-brand-rose",
        placeholder: "email@exemple.com",
        emptyTitle: "Aucun email autorisé pour le moment.",
        emptySubtitle: "Ajoutez des emails pour permettre l'inscription.",
        duplicateMessage: "Cet email est déjà dans la liste.",
        loadingErrorMessage:
          "Impossible de charger la liste des emails autorisés.",
        deleteTitle: "Retirer l'email",
        deleteMessage:
          'Êtes-vous sûr de vouloir retirer "{email}" de la liste ?',
        itemIcon: Mail,
        itemIconBg: "bg-blue-50",
        itemIconColor: "text-blue-500",
      }}
    />
  );
}
