"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Heart,
  Shield,
  Phone,
  MapPin,
  CheckCircle2,
  Home,
  Users,
  ClipboardList,
  Truck,
  Baby,
  TreePine,
} from "lucide-react";
import { PHONE_NUMBER, PHONE_HREF, SITE_NAME, EMAIL } from "@/lib/constants";

/* ─── Step data ─── */
const services = [
  {
    icon: ClipboardList,
    title: "Assistance administrative",
    desc: "Documents, démarches, courrier… on s'occupe de tout.",
    color: "from-rose-400 to-pink-500",
  },
  {
    icon: Home,
    title: "Services de nettoyage",
    desc: "Un intérieur impeccable pour votre bien-être quotidien.",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: Users,
    title: "Aide aux courses & repas",
    desc: "Courses, préparation de repas équilibrés adaptés à vos goûts.",
    color: "from-emerald-400 to-teal-500",
  },
  {
    icon: TreePine,
    title: "Entretien espaces",
    desc: "Jardin, terrasse, bricolage — un cadre de vie agréable.",
    color: "from-sky-400 to-blue-500",
  },
  {
    icon: Truck,
    title: "Aide au déménagement",
    desc: "Organisation complète pour un déménagement serein.",
    color: "from-violet-400 to-purple-500",
  },
  {
    icon: Baby,
    title: "Garde d'enfants",
    desc: "Surveillance bienveillante et activités éducatives.",
    color: "from-pink-400 to-rose-500",
  },
];

const coverageAreas = [
  "Aulnay-Sous-Bois",
  "Sevran",
  "Drancy",
  "Le Blanc-Mesnil",
  "Bondy",
  "Villepinte",
  "Tremblay-en-France",
  "Livry-Gargan",
  "Noisy-le-Sec",
  "Bobigny",
  "Pantin",
  "Romainville",
];

const values = [
  {
    icon: Heart,
    title: "Bienveillance",
    text: "Chaque intervention est réalisée avec cœur et attention.",
  },
  {
    icon: Shield,
    title: "Confiance",
    text: "Des intervenants qualifiés et des prestations transparentes.",
  },
  {
    icon: Sparkles,
    title: "Excellence",
    text: "Un souci du détail pour dépasser vos attentes.",
  },
];

const TOTAL_STEPS = 5;

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (target: number, dir?: "next" | "prev") => {
      if (isAnimating || target === step) return;
      setIsAnimating(true);
      setDirection(dir ?? (target > step ? "next" : "prev"));
      // Small delay lets the exit animation start before we swap content
      setTimeout(() => {
        setStep(target);
        setIsAnimating(false);
      }, 350);
    },
    [isAnimating, step],
  );

  const next = useCallback(() => {
    if (step < TOTAL_STEPS - 1) goTo(step + 1, "next");
  }, [step, goTo]);

  const prev = useCallback(() => {
    if (step > 0) goTo(step - 1, "prev");
  }, [step, goTo]);

  /* Keyboard nav */
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [next, prev]);

  /* Touch swipe support */
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 60) {
      if (diff > 0) next();
      else prev();
    }
  };

  return (
    <div
      className="min-h-screen bg-brand-cream flex flex-col overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ─── Top bar ─── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-brand-cream/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 h-16">
          <Link
            href="/"
            className="font-serif italic text-xl flex items-center gap-2 hover:text-brand-rose transition-colors"
          >
            <Image src="/images/logo.png" alt="Logo" width={28} height={28} />
            {SITE_NAME}
          </Link>
          <Link
            href="/"
            className="text-sm text-black/50 hover:text-black transition-colors"
          >
            Passer l&apos;introduction →
          </Link>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-black/5">
          <div
            className="h-full bg-gradient-to-r from-brand-rose to-brand-rose-dark transition-all duration-700 ease-out"
            style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </header>

      {/* ─── Content ─── */}
      <div
        ref={containerRef}
        className="flex-1 pt-20 pb-28 flex items-center justify-center px-6"
      >
        <div
          key={step}
          className={`w-full max-w-5xl mx-auto transition-all duration-500 ease-out ${
            isAnimating
              ? direction === "next"
                ? "opacity-0 translate-x-12"
                : "opacity-0 -translate-x-12"
              : "opacity-100 translate-x-0"
          }`}
        >
          {step === 0 && <StepWelcome />}
          {step === 1 && <StepValues />}
          {step === 2 && <StepServices />}
          {step === 3 && <StepCoverage />}
          {step === 4 && <StepCTA />}
        </div>
      </div>

      {/* ─── Bottom nav ─── */}
      <footer className="fixed bottom-0 inset-x-0 bg-brand-cream/80 backdrop-blur-xl border-t border-black/5">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 h-20">
          <button
            onClick={prev}
            disabled={step === 0}
            className="flex items-center gap-2 text-sm font-medium disabled:opacity-0 disabled:pointer-events-none hover:text-brand-rose transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Précédent
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Étape ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === step
                    ? "w-8 h-3 bg-brand-rose"
                    : i < step
                      ? "w-3 h-3 bg-brand-rose/40"
                      : "w-3 h-3 bg-black/10"
                }`}
              />
            ))}
          </div>

          {step < TOTAL_STEPS - 1 ? (
            <button
              onClick={next}
              className="flex items-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-full text-sm font-medium hover:scale-105 transition-transform hover-shine"
            >
              Suivant <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-2 bg-gradient-to-r from-brand-rose to-brand-rose-dark text-white px-6 py-3 rounded-full text-sm font-medium hover:scale-105 transition-transform hover-shine"
            >
              Découvrir <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   STEP 0 — Welcome
   ═══════════════════════════════════════════════════════════ */
function StepWelcome() {
  return (
    <div className="text-center">
      {/* Decorative circles */}
      <div className="relative inline-block mb-10">
        <div className="absolute -inset-8 bg-brand-rose/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="relative w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-2xl shadow-brand-rose/30 animate-scale-in">
          <Image
            src="/images/logo.png"
            alt={SITE_NAME}
            width={80}
            height={80}
          />
        </div>
      </div>

      <h1
        className="text-5xl lg:text-7xl font-light mb-6 animate-fade-in-up"
        style={{ animationDelay: "0.15s", animationFillMode: "both" }}
      >
        Bienvenue chez
        <span className="block font-serif italic bg-gradient-to-r from-brand-rose via-brand-rose-dark to-brand-rose bg-clip-text text-transparent mt-2">
          {SITE_NAME}
        </span>
      </h1>

      <p
        className="text-xl lg:text-2xl text-black/60 max-w-xl mx-auto leading-relaxed mb-12 animate-fade-in-up"
        style={{ animationDelay: "0.35s", animationFillMode: "both" }}
      >
        Des services à domicile pensés pour{" "}
        <strong className="text-brand-dark">simplifier votre quotidien</strong>{" "}
        avec bienveillance et professionnalisme.
      </p>

      <div
        className="flex flex-wrap justify-center gap-4 animate-fade-in-up"
        style={{ animationDelay: "0.55s", animationFillMode: "both" }}
      >
        {["Bienveillance", "Proximité", "Professionnalisme"].map((word) => (
          <span
            key={word}
            className="px-5 py-2 bg-white rounded-full text-sm font-medium shadow-sm border border-brand-rose/20"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   STEP 1 — Our values
   ═══════════════════════════════════════════════════════════ */
function StepValues() {
  return (
    <div>
      <div
        className="text-center mb-14 animate-fade-in-up"
        style={{ animationFillMode: "both" }}
      >
        <span className="inline-flex items-center gap-2 text-sm tracking-widest uppercase mb-4 text-brand-rose">
          <Sparkles className="w-4 h-4" /> Nos valeurs
        </span>
        <h2 className="text-4xl lg:text-6xl font-light">
          Ce qui nous
          <span className="block font-serif italic">anime</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {values.map((v, i) => (
          <div
            key={v.title}
            className="group bg-white rounded-3xl p-8 lg:p-10 text-center hover:shadow-2xl transition-all duration-300 hover-lift animate-fade-in-up border border-transparent hover:border-brand-rose/20"
            style={{
              animationDelay: `${0.15 + i * 0.15}s`,
              animationFillMode: "both",
            }}
          >
            <div className="w-16 h-16 rounded-2xl bg-brand-rose/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-brand-rose/20 transition-all duration-300">
              <v.icon className="w-7 h-7 text-brand-rose" />
            </div>
            <h3 className="text-2xl font-bold mb-3">{v.title}</h3>
            <p className="text-black/60 text-lg leading-relaxed">{v.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   STEP 2 — Services
   ═══════════════════════════════════════════════════════════ */
function StepServices() {
  return (
    <div>
      <div
        className="text-center mb-14 animate-fade-in-up"
        style={{ animationFillMode: "both" }}
      >
        <span className="inline-flex items-center gap-2 text-sm tracking-widest uppercase mb-4 text-brand-rose">
          ✨ Nos services
        </span>
        <h2 className="text-4xl lg:text-6xl font-light">
          Tout ce dont vous avez
          <span className="block font-serif italic">besoin</span>
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s, i) => (
          <div
            key={s.title}
            className="group relative bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover-lift animate-fade-in-up overflow-hidden"
            style={{
              animationDelay: `${0.1 + i * 0.1}s`,
              animationFillMode: "both",
            }}
          >
            {/* Gradient accent */}
            <div
              className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${s.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />
            <div className="flex items-start gap-4">
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg`}
              >
                <s.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-brand-rose transition-colors">
                  {s.title}
                </h3>
                <p className="text-black/60 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   STEP 3 — Coverage area
   ═══════════════════════════════════════════════════════════ */
function StepCoverage() {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="animate-fade-in-up" style={{ animationFillMode: "both" }}>
        <span className="inline-flex items-center gap-2 text-sm tracking-widest uppercase mb-4 text-brand-rose">
          <MapPin className="w-4 h-4" /> Zone d&apos;intervention
        </span>
        <h2 className="text-4xl lg:text-5xl font-light mb-6">
          Nous intervenons
          <span className="block font-serif italic">près de chez vous</span>
        </h2>
        <p className="text-lg text-black/60 leading-relaxed mb-8">
          Basés à Aulnay-sous-Bois, nous couvrons toute la Seine-Saint-Denis et
          ses alentours pour être au plus proche de vous.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {coverageAreas.map((area, i) => (
            <div
              key={area}
              className="flex items-center gap-2 text-sm animate-fade-in"
              style={{
                animationDelay: `${0.2 + i * 0.05}s`,
                animationFillMode: "both",
              }}
            >
              <CheckCircle2 className="w-4 h-4 text-brand-rose flex-shrink-0" />
              <span>{area}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="relative animate-fade-in-up"
        style={{ animationDelay: "0.3s", animationFillMode: "both" }}
      >
        <div className="absolute -inset-4 bg-gradient-to-br from-brand-rose/20 to-transparent rounded-[2rem] blur-2xl" />
        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Zone d'intervention Seine-Saint-Denis"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          {/* Floating pin badge */}
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md rounded-2xl px-5 py-3 shadow-lg flex items-center gap-3 animate-float">
            <div className="w-10 h-10 rounded-full bg-brand-rose/20 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-brand-rose" />
            </div>
            <div>
              <p className="font-bold text-sm">Seine-Saint-Denis</p>
              <p className="text-xs text-black/50">93 — Île-de-France</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   STEP 4 — CTA / Contact
   ═══════════════════════════════════════════════════════════ */
function StepCTA() {
  return (
    <div className="text-center">
      <div
        className="inline-flex items-center gap-3 bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-medium mb-10 animate-scale-in"
        style={{ animationFillMode: "both" }}
      >
        <CheckCircle2 className="w-4 h-4" />
        Vous êtes prêt !
      </div>

      <h2
        className="text-4xl lg:text-6xl font-light mb-6 animate-fade-in-up"
        style={{ animationDelay: "0.15s", animationFillMode: "both" }}
      >
        Prêt à simplifier
        <span className="block font-serif italic bg-gradient-to-r from-brand-rose via-brand-rose-dark to-brand-rose bg-clip-text text-transparent">
          votre quotidien ?
        </span>
      </h2>

      <p
        className="text-xl text-black/60 max-w-lg mx-auto leading-relaxed mb-12 animate-fade-in-up"
        style={{ animationDelay: "0.3s", animationFillMode: "both" }}
      >
        Contactez-nous dès maintenant pour un devis gratuit et personnalisé.
        Notre équipe est à votre écoute !
      </p>

      <div
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up"
        style={{ animationDelay: "0.45s", animationFillMode: "both" }}
      >
        <a
          href={PHONE_HREF}
          className="group inline-flex items-center gap-3 bg-gradient-to-r from-brand-rose via-brand-rose-dark to-brand-rose text-white px-10 py-5 rounded-full text-lg font-bold shadow-2xl shadow-brand-rose/30 hover:scale-105 transition-all duration-300 hover-shine"
        >
          <Phone className="w-5 h-5" />
          {PHONE_NUMBER}
        </a>
        <Link
          href="/"
          className="inline-flex items-center gap-3 border-2 border-brand-dark px-8 py-5 rounded-full font-medium hover:bg-brand-dark hover:text-white transition-all duration-300"
        >
          Voir le site complet
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Trust cards */}
      <div
        className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto animate-fade-in-up"
        style={{ animationDelay: "0.6s", animationFillMode: "both" }}
      >
        {[
          { label: "Devis gratuit", icon: "📋" },
          { label: "Sans engagement", icon: "🤝" },
          { label: "Réponse rapide", icon: "⚡" },
        ].map((t) => (
          <div
            key={t.label}
            className="flex items-center justify-center gap-2 bg-white rounded-2xl py-4 px-5 shadow-sm text-sm font-medium"
          >
            <span className="text-lg">{t.icon}</span>
            {t.label}
          </div>
        ))}
      </div>
    </div>
  );
}
