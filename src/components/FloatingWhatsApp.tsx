"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const isAdmin = pathname.startsWith("/admin");

  // Appear after a short delay
  useEffect(() => {
    if (isAdmin) return;
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, [isAdmin]);

  // One-time tooltip
  useEffect(() => {
    if (!isVisible) return;
    const show = setTimeout(() => setShowTooltip(true), 2000);
    const hide = setTimeout(() => setShowTooltip(false), 8000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [isVisible]);

  if (isAdmin || !isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-end gap-3">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="relative bg-white rounded-2xl shadow-xl px-4 py-3 max-w-[220px] animate-fade-in">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="text-sm text-brand-dark">
            Besoin d&apos;aide ? <strong>Écrivez-nous</strong> sur WhatsApp 💬
          </p>
        </div>
      )}

      {/* WhatsApp button */}
      <button
        onClick={() =>
          openWhatsApp("Bonjour, je souhaite des informations sur vos services")
        }
        className="group w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Nous contacter sur WhatsApp"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>
    </div>
  );
}
