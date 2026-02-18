"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    location: "Aulnay-sous-Bois",
    rating: 5,
    text: "Suzy et son équipe s'occupent de notre ménage hebdomadaire depuis 6 mois. La maison est toujours impeccable et elles sont d'une ponctualité irréprochable. Je recommande à 100% !",
    service: "Nettoyage",
  },
  {
    name: "Fatima B.",
    location: "Sevran",
    rating: 5,
    text: "Grâce à Suzy Sourires, j'ai enfin pu monter mon dossier de retraite. L'assistance administrative est un vrai soulagement quand on ne maîtrise pas bien les démarches en ligne.",
    service: "Assistance administrative",
  },
  {
    name: "Amina K.",
    location: "Villepinte",
    rating: 5,
    text: "Je fais appel à elles pour la garde de mes enfants le mercredi. Ils adorent leur nounou ! Je pars travailler l'esprit tranquille. Un service humain et fiable.",
    service: "Garde d'enfants",
  },
  {
    name: "Linda T.",
    location: "Livry-Gargan",
    rating: 4,
    text: "Très satisfaite du service de courses et préparation de repas pour ma mère. Elles prennent le temps de s'adapter à ses goûts et à son régime. Un vrai plus au quotidien.",
    service: "Aide aux courses",
  },
  {
    name: "Nadia R.",
    location: "Le Blanc-Mesnil",
    rating: 5,
    text: "Cela fait un an que Suzy intervient chez nous pour le ménage et l'entretien du jardin. Toujours souriante, toujours efficace. Elle est devenue indispensable à notre famille !",
    service: "Nettoyage & entretien",
  },
  {
    name: "Camille D.",
    location: "Aulnay-sous-Bois",
    rating: 5,
    text: "Elles nous ont aidés pour notre déménagement : cartons, tri, nettoyage de l'ancien appartement… Tout a été fait avec soin. Un vrai gain de temps et de stress en moins !",
    service: "Aide au déménagement",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < count
              ? "fill-amber-400 text-amber-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  // Affiche 1 avis mobile, 2 tablette, 3 desktop — on gère via CSS
  const totalSlides = testimonials.length;

  const prev = () => setCurrent((c) => (c === 0 ? totalSlides - 1 : c - 1));
  const next = () => setCurrent((c) => (c === totalSlides - 1 ? 0 : c + 1));

  // Pour le carousel: indices visibles (1 mobile, 2 md, 3 lg)
  const getVisible = (offset: number) =>
    testimonials[(current + offset) % totalSlides];

  return (
    <section id="temoignages" className="py-24 lg:py-32 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-3 h-3 bg-brand-rose rounded-full animate-bounce-slow" />
            <span className="text-sm tracking-widest uppercase">
              Témoignages
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-light mb-6">
            Ce que disent
            <span className="block font-serif italic">nos clientes</span>
          </h2>
          <p className="text-lg lg:text-xl text-black/70 max-w-2xl mx-auto">
            La satisfaction de nos clientes est notre plus belle récompense
          </p>
        </div>

        {/* Rating summary */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <Stars count={5} />
          <span className="text-lg font-medium text-brand-dark">
            {(
              testimonials.reduce((sum, t) => sum + t.rating, 0) /
              testimonials.length
            ).toFixed(1)}
          </span>
          <span className="text-black/50 text-sm">
            — {testimonials.length} avis
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[0, 1, 2].map((offset) => {
            const t = getVisible(offset);
            return (
              <div
                key={`${current}-${offset}`}
                className={`bg-brand-cream rounded-2xl p-8 relative animate-fade-in ${
                  offset === 1 ? "hidden md:block" : ""
                } ${offset === 2 ? "hidden lg:block" : ""}`}
              >
                <Quote className="w-8 h-8 text-brand-rose/20 absolute top-6 right-6" />
                <Stars count={t.rating} />
                <p className="mt-4 mb-6 text-black/70 leading-relaxed text-[15px]">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-brand-dark">{t.name}</p>
                    <p className="text-xs text-black/40">{t.location}</p>
                  </div>
                  <span className="text-xs bg-brand-rose/10 text-brand-rose px-3 py-1 rounded-full">
                    {t.service}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-brand-rose/10 hover:border-brand-rose transition-colors"
            aria-label="Avis précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-brand-rose w-6"
                    : "bg-black/15 hover:bg-black/30"
                }`}
                aria-label={`Aller à l'avis ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-brand-rose/10 hover:border-brand-rose transition-colors"
            aria-label="Avis suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
