"use client";

import { Phone, MessageCircle } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants";

export function CTABanner() {
  return (
    <section className="relative py-20 lg:py-24 px-6 lg:px-8 bg-gradient-to-br from-brand-dark via-brand-dark-light to-brand-dark text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-brand-rose rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-rose rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h3 className="text-3xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-white to-brand-rose bg-clip-text text-transparent">
          Prêt à simplifier votre quotidien ?
        </h3>
        <p className="text-lg lg:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-medium">
          Contactez-nous dès maintenant pour un devis gratuit et personnalisé
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() =>
              openWhatsApp("Bonjour, j'aimerais un devis pour vos services")
            }
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-green-500 via-green-600 to-green-500 text-white px-8 sm:px-12 py-5 sm:py-6 rounded-full hover:scale-105 sm:hover:scale-110 transition-all duration-300 text-lg sm:text-xl font-bold shadow-2xl hover:shadow-green-500/50 overflow-hidden hover-shine animate-glow"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <MessageCircle className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform" />
            <span className="relative z-10">WhatsApp</span>
          </button>
          <a
            href={PHONE_HREF}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-brand-rose via-brand-rose-dark to-brand-rose text-white px-8 sm:px-12 py-5 sm:py-6 rounded-full hover:scale-105 sm:hover:scale-110 transition-all duration-300 text-lg sm:text-xl font-bold shadow-2xl hover:shadow-brand-rose/50 overflow-hidden hover-shine animate-glow"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Phone className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform" />
            <span className="relative z-10">{PHONE_NUMBER}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
