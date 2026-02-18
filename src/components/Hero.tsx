"use client";

import { useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants";
import ImageRenovation from "../../public/images/renovation.jpg";
import ImageDemenagement from "../../public/images/demenagement.jpg";
import ImageGarde from "../../public/images/garde.jpg";
import ImageAssistance from "../../public/images/assistance.jpg";

export function Hero() {
  const scrollToSection = useCallback((id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  return (
    <section
      id="accueil"
      className="pt-32 lg:pt-44 pb-20 lg:pb-32 px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <div
              className="flex items-center gap-3 mb-6 lg:mb-8 animate-fade-in"
              style={{ animationDelay: "0.1s", animationFillMode: "both" }}
            >
              <div className="w-3 h-3 bg-brand-rose rounded-full animate-bounce-slow" />
              <span className="text-sm tracking-widest uppercase">
                Aide à domicile
              </span>
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={28}
                height={28}
                className="animate-wiggle"
              />
            </div>

            <h1
              className="text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight mb-8 lg:mb-12 animate-fade-in-up"
              style={{ animationDelay: "0.3s", animationFillMode: "both" }}
            >
              <span className="font-light">Des services qui</span>
              <span className="block font-serif italic text-[clamp(3rem,8vw,7rem)] bg-gradient-to-r from-brand-rose via-brand-rose-dark to-brand-rose bg-clip-text text-transparent">
                simplifient
              </span>
              <span className="font-bold">votre quotidien</span>
            </h1>

            <div
              className="mb-10 lg:mb-16 relative animate-fade-in-up"
              style={{ animationDelay: "0.5s", animationFillMode: "both" }}
            >
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-brand-rose to-transparent" />
              <p className="text-lg lg:text-2xl text-black/80 leading-relaxed mb-8 font-medium">
                Parce qu&apos;un sourire ne coûte rien mais apporte beaucoup,
                nous vous accompagnons avec bienveillance et professionnalisme.
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
              style={{ animationDelay: "0.7s", animationFillMode: "both" }}
            >
              <a
                href={PHONE_HREF}
                className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-brand-rose via-brand-rose-dark to-brand-rose text-white px-8 sm:px-12 py-5 sm:py-6 rounded-full hover:scale-105 sm:hover:scale-110 transition-all duration-300 text-base sm:text-lg font-bold shadow-2xl hover:shadow-brand-rose/50 overflow-hidden hover-shine"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-rose-dark via-brand-rose to-brand-rose-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10">{PHONE_NUMBER}</span>
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <button
                onClick={() => scrollToSection("services")}
                className="inline-flex items-center justify-center gap-3 border-2 border-brand-dark px-8 sm:px-10 py-5 sm:py-6 rounded-full hover:bg-gradient-to-r hover:from-brand-dark hover:to-brand-dark-light hover:text-white hover:scale-105 transition-all duration-300 text-base sm:text-lg font-medium hover:border-transparent hover-grow"
              >
                Découvrir
              </button>
            </div>
          </div>

          {/* Image grid — visible from tablet up */}
          <div
            className="hidden md:block animate-fade-in-up"
            style={{ animationDelay: "0.6s", animationFillMode: "both" }}
          >
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              <div className="space-y-4 lg:space-y-6">
                <div className="group relative aspect-square rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <Image
                    src={ImageRenovation}
                    alt="Aide à domicile"
                    fill
                    sizes="(max-width: 1024px) 25vw, 300px"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <Image
                    src={ImageDemenagement}
                    alt="Services professionnels"
                    fill
                    sizes="(max-width: 1024px) 25vw, 300px"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-4 lg:space-y-6 pt-8 lg:pt-12">
                <div className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <Image
                    src={ImageGarde}
                    alt="Accompagnement personnalisé"
                    fill
                    sizes="(max-width: 1024px) 25vw, 300px"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="group relative aspect-square rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <Image
                    src={ImageAssistance}
                    alt="Services à domicile"
                    fill
                    sizes="(max-width: 1024px) 25vw, 300px"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
