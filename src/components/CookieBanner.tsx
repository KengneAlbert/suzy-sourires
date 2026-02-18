"use client";

import { useState, useEffect, useCallback } from "react";
import { Cookie, X } from "lucide-react";
import Link from "next/link";

const CONSENT_KEY = "cookie-consent";
type ConsentValue = "accepted" | "refused";

/**
 * Injecte le script Google Analytics uniquement après consentement.
 */
function loadGA() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!id || typeof window === "undefined") return;
  // Ne pas charger deux fois
  if (document.getElementById("ga-script")) return;

  const script = document.createElement("script");
  script.id = "ga-script";
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  script.async = true;
  document.head.appendChild(script);

  const inline = document.createElement("script");
  inline.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${id}', { anonymize_ip: true });
  `;
  document.head.appendChild(inline);
}

/**
 * Supprime les cookies GA existants quand l'utilisateur refuse.
 */
function removeGACookies() {
  const cookies = document.cookie.split(";");
  for (const c of cookies) {
    const name = c.split("=")[0].trim();
    if (name.startsWith("_ga") || name.startsWith("_gid")) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as ConsentValue | null;
    if (stored === "accepted") {
      loadGA();
    } else if (!stored) {
      // Délai pour ne pas gêner le premier rendu
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
    loadGA();
  }, []);

  const handleRefuse = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "refused");
    setVisible(false);
    removeGACookies();
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentement aux cookies"
      className="fixed bottom-0 inset-x-0 z-[150] p-4 sm:p-6 animate-slide-up"
    >
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-black/5 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex w-12 h-12 bg-brand-rose/10 rounded-xl items-center justify-center flex-shrink-0">
            <Cookie className="w-6 h-6 text-brand-rose" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-brand-dark mb-2">
              🍪 Ce site utilise des cookies
            </h2>
            <p className="text-sm text-black/60 leading-relaxed mb-5">
              Nous utilisons des cookies d&apos;analyse (Google Analytics) pour
              comprendre comment vous utilisez notre site et améliorer votre
              expérience. Vos données sont anonymisées.{" "}
              <Link
                href="/mentions-legales"
                className="underline hover:text-brand-rose transition-colors"
              >
                En savoir plus
              </Link>
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAccept}
                className="inline-flex items-center justify-center gap-2 bg-brand-dark text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-brand-dark-light transition-colors"
              >
                Tout accepter
              </button>
              <button
                onClick={handleRefuse}
                className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-600 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Refuser
              </button>
            </div>
          </div>
          <button
            onClick={handleRefuse}
            className="flex-shrink-0 p-1 text-black/30 hover:text-black/60 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
