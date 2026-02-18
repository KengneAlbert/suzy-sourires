"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { PHONE_HREF, SITE_NAME } from "@/lib/constants";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Fermer le menu mobile avec Escape
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <nav
      className="fixed top-0 w-full bg-brand-cream/90 backdrop-blur-xl z-50"
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 lg:h-24">
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <Image
              src="/images/Logo.png"
              alt={SITE_NAME}
              width={40}
              height={40}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="text-xl lg:text-2xl font-serif italic group-hover:text-brand-rose transition-colors">
              {SITE_NAME}
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12">
            <button
              onClick={() => scrollToSection("services")}
              className="text-sm hover:opacity-60 transition-all hover:scale-110"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("produits")}
              className="text-sm hover:opacity-60 transition-all hover:scale-110"
            >
              Produits
            </button>
            <button
              onClick={() => scrollToSection("apropos")}
              className="text-sm hover:opacity-60 transition-all hover:scale-110"
            >
              À propos
            </button>
            <a
              href={PHONE_HREF}
              className="text-sm bg-brand-dark text-white px-6 py-3 rounded-full hover:scale-105 transition-transform hover-shine"
            >
              Nous contacter
            </a>
          </div>

          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu with overlay */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-20 bg-black/30 z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="lg:hidden bg-brand-cream border-t border-black/5 relative z-50">
            <div className="px-6 py-8 space-y-6">
              <button
                onClick={() => {
                  scrollToSection("services");
                  setIsMenuOpen(false);
                }}
                className="block text-lg hover:opacity-60 transition-opacity"
              >
                Services
              </button>
              <button
                onClick={() => {
                  scrollToSection("produits");
                  setIsMenuOpen(false);
                }}
                className="block text-lg hover:opacity-60 transition-opacity"
              >
                Produits
              </button>
              <button
                onClick={() => {
                  scrollToSection("apropos");
                  setIsMenuOpen(false);
                }}
                className="block text-lg hover:opacity-60 transition-opacity"
              >
                À propos
              </button>
              <a
                href={PHONE_HREF}
                className="block text-sm bg-brand-dark text-white px-6 py-3 rounded-full text-center"
              >
                Nous contacter
              </a>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
