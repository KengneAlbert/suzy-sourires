import { Phone } from 'lucide-react';

export function CTABanner() {
  return (
    <section className="relative py-24 px-8 lg:px-16 bg-gradient-to-br from-[#2D2A26] via-[#3D3A36] to-[#2D2A26] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#E8B4A0] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#E8B4A0] rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-[1400px] mx-auto text-center relative z-10">
        <h3 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-white to-[#E8B4A0] bg-clip-text text-transparent">
          Prêt à simplifier votre quotidien ?
        </h3>
        <p className="text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-medium">
          Contactez-nous dès maintenant pour un devis gratuit et personnalisé
        </p>
        <a
          href="tel:0781324474"
          className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#E8B4A0] via-[#D4A090] to-[#E8B4A0] text-white px-12 py-6 rounded-full hover:scale-110 transition-all duration-300 text-xl font-bold shadow-2xl hover:shadow-[#E8B4A0]/50 overflow-hidden hover-shine animate-glow"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <Phone className="w-6 h-6 relative z-10 group-hover:rotate-12 group-hover:animate-shake transition-transform" />
          <span className="relative z-10">07 81 32 44 74</span>
          <span className="text-2xl relative z-10 group-hover:animate-bounce-slow">📞</span>
        </a>
      </div>
    </section>
  );
}
