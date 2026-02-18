"use client";

import { useState } from "react";
import { Package, Shield, Mail, LayoutDashboard } from "lucide-react";
import { AdminProductsPage } from "@/components/AdminProductsPage";
import { AdminWhitelistPage } from "@/components/AdminWhitelistPage";
import { AllowedSignupEmailsPage } from "@/components/AllowedSignupEmailsPage";

type Tab = "products" | "admins" | "emails";

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "products", label: "Produits", icon: <Package className="w-4 h-4" /> },
  {
    key: "admins",
    label: "Administrateurs",
    icon: <Shield className="w-4 h-4" />,
  },
  {
    key: "emails",
    label: "Emails autorisés",
    icon: <Mail className="w-4 h-4" />,
  },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("products");

  return (
    <div>
      {/* Dashboard header */}
      <div className="mb-8">
        <h1 className="text-3xl font-light text-brand-dark flex items-center gap-3">
          <LayoutDashboard className="w-7 h-7 text-brand-rose" />
          Tableau de bord
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.key
                ? "bg-brand-dark text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "products" && <AdminProductsPage />}
      {activeTab === "admins" && <AdminWhitelistPage />}
      {activeTab === "emails" && <AllowedSignupEmailsPage />}
    </div>
  );
}
