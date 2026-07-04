import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import AboutBg from "../../public/images/about-bg.jpg";
import Fondatrice from "../../public/images/fondatrice.jpg";
import { PHONE_HREF } from "@/lib/constants";

const stats = [
  { value: "+50", label: "Clients satisfaits" },
  { value: "2+", label: "Ans d'expérience" },
  { value: "5", label: "Services proposés" },
  { value: "98%", label: "Taux de satisfaction" },
];

export function AboutSection() {
  return (
    <section
      id="apropos"
      className="py-24 lg:py-32 px-6 lg:px-8 bg-brand-dark text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <Image
          src={AboutBg}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Heading + stats */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 bg-brand-rose rounded-full animate-pulse" />
              <span className="text-sm tracking-widest uppercase text-white/60">
                Pourquoi nous choisir
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl leading-tight font-light mb-12">
              Une approche
              <span className="block font-serif italic">humaine</span>
              et professionnelle
            </h2>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="border border-white/10 rounded-2xl p-6 hover:border-brand-rose/40 transition-colors"
                >
                  <div className="text-4xl font-bold text-brand-rose mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Founder photo + text + CTA */}
          <div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-10 shadow-2xl">
              <Image
                src={Fondatrice}
                alt="Fondatrice de Suzy Sourires à Aulnay-sous-Bois"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 to-transparent" />
            </div>

            <div className="space-y-6 text-lg text-white/80 leading-relaxed">
              <p>
                Suzy Sourires a été créé en 2024 à{" "}
                <strong className="text-white">Aulnay-sous-Bois</strong>,
                en Seine-Saint-Denis, avec la conviction que chaque personne
                mérite un accompagnement bienveillant et professionnel à
                domicile.
              </p>
              <p>
                Nous intervenons dans tout le{" "}
                <strong className="text-white">93</strong> pour vous proposer
                des services personnalisés : ménage, assistance administrative,
                garde d&apos;enfants, courses et déménagements.
              </p>
            </div>

            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 mt-8 bg-brand-rose hover:bg-brand-rose-dark text-white px-8 py-4 rounded-full font-medium transition-colors"
            >
              Nous contacter
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
