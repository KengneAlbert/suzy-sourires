"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream px-4">
      <div className="text-center max-w-lg">
        {/* 404 visual */}
        <div className="mb-8">
          <span className="text-[10rem] leading-none font-light text-brand-rose/20 select-none">
            404
          </span>
        </div>

        <h1 className="text-3xl lg:text-4xl font-light text-brand-dark mb-4">
          Page <span className="italic">introuvable</span>
        </h1>
        <p className="text-lg text-gray-500 mb-10 leading-relaxed">
          Désolé, la page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-brand-dark text-white px-8 py-4 rounded-full hover:bg-brand-dark-light transition-colors font-medium"
          >
            <Home className="w-5 h-5" />
            Retour à l&apos;accueil
          </Link>
          <button
            onClick={() => history.back()}
            className="inline-flex items-center justify-center gap-2 border-2 border-brand-dark text-brand-dark px-8 py-4 rounded-full hover:bg-brand-dark hover:text-white transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Page précédente
          </button>
        </div>
      </div>
    </div>
  );
}
