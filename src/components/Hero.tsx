import { ArrowUpRight } from 'lucide-react';

interface HeroProps {
  scrollToSection: (id: string) => void;
}

export function Hero({ scrollToSection }: HeroProps) {
  return (
    <section id="accueil" className="pt-56 pb-32 px-8 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 bg-[#E8B4A0] rounded-full animate-bounce-slow"></div>
              <span className="text-sm tracking-widest uppercase">Aide à domicile</span>
              <div className="text-2xl animate-wiggle">😊</div>
            </div>

            <h1 className="text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tight mb-12">
              <span className="font-light">Des services qui</span>
              <span className="block font-serif italic text-[clamp(3.5rem,9vw,8rem)] bg-gradient-to-r from-[#E8B4A0] via-[#D4A090] to-[#E8B4A0] bg-clip-text text-transparent">simplifient</span>
              <span className="font-bold">votre quotidien</span>
            </h1>

            <div className="mb-16 relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#E8B4A0] to-transparent"></div>
              <p className="text-2xl text-black/80 leading-relaxed mb-8 font-medium">
                Parce qu'un sourire ne coûte rien mais apporte beaucoup, nous vous accompagnons avec bienveillance et professionnalisme.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="tel:0781324474"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#E8B4A0] via-[#D4A090] to-[#E8B4A0] text-white px-12 py-6 rounded-full hover:scale-110 transition-all duration-300 text-lg font-bold shadow-2xl hover:shadow-[#E8B4A0]/50 overflow-hidden hover-shine"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4A090] via-[#E8B4A0] to-[#D4A090] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10">07 81 32 44 74</span>
                <ArrowUpRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <button
                onClick={() => scrollToSection('services')}
                className="inline-flex items-center gap-3 border-2 border-[#2D2A26] px-10 py-6 rounded-full hover:bg-gradient-to-r hover:from-[#2D2A26] hover:to-[#3D3A36] hover:text-white hover:scale-105 transition-all duration-300 text-lg font-medium hover:border-transparent hover-grow"
              >
                Découvrir
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="group relative aspect-square rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <img
                    src="https://images.pexels.com/photos/6195276/pexels-photo-6195276.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Aide à domicile"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#E8B4A0]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <img
                    src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Services professionnels"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#E8B4A0]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
              <div className="space-y-6 pt-12">
                <div className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <img
                    src="https://images.pexels.com/photos/6195299/pexels-photo-6195299.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Accompagnement personnalisé"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#E8B4A0]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="group relative aspect-square rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <img
                    src="https://images.pexels.com/photos/5206952/pexels-photo-5206952.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Services à domicile"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#E8B4A0]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
