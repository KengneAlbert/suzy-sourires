"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ServiceModal } from "./ServiceModal";
import ImageMarche from "../../public/images/marche.jpg";

const services = [
  {
    title: "Assistance administrative",
    desc: "Documents & démarches",
    image:
      "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600",
    fullDesc:
      "Nous vous accompagnons dans toutes vos démarches administratives pour vous simplifier la vie.",
    details: [
      "Aide à la constitution et au suivi de dossiers administratifs",
      "Accompagnement aux rendez-vous administratifs",
      "Gestion du courrier et classement de documents",
      "Aide à la déclaration d'impôts et formalités diverses",
      "Soutien dans les démarches en ligne",
      "Rédaction de courriers administratifs",
    ],
  },
  {
    title: "Services de nettoyage",
    desc: "Entretien professionnel",
    image:
      "https://images.pexels.com/photos/4239037/pexels-photo-4239037.jpeg?auto=compress&cs=tinysrgb&w=600",
    fullDesc:
      "Un intérieur propre et bien entretenu pour votre confort et votre bien-être au quotidien.",
    details: [
      "Nettoyage complet de toutes les pièces",
      "Dépoussiérage et aspiration méticuleuse",
      "Nettoyage des sols, vitres et surfaces",
      "Entretien des sanitaires et cuisine",
      "Repassage et entretien du linge",
      "Nettoyage en profondeur selon vos besoins",
    ],
  },
  {
    title: "Aide aux courses et repas",
    desc: "Courses & préparation",
    image: ImageMarche,
    fullDesc:
      "Nous vous aidons à faire vos courses et à préparer des repas équilibrés adaptés à vos goûts.",
    details: [
      "Courses alimentaires selon vos listes et préférences",
      "Préparation de repas équilibrés et savoureux",
      "Adaptation aux régimes spécifiques",
      "Rangement des provisions",
      "Aide à la prise des repas si nécessaire",
      "Nettoyage de la cuisine après préparation",
    ],
  },
  {
    title: "Entretien espaces",
    desc: "Intérieur & extérieur",
    image:
      "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=600",
    fullDesc:
      "Maintenance et entretien de vos espaces intérieurs et extérieurs pour un cadre de vie agréable.",
    details: [
      "Entretien du jardin et des espaces verts",
      "Tonte de pelouse et taille des haies",
      "Arrosage des plantes et fleurs",
      "Petits travaux de bricolage",
      "Entretien des terrasses et balcons",
      "Déneigement et déblaiement en hiver",
    ],
  },
  {
    title: "Assistance déménagements",
    desc: "Organisation & aide",
    image:
      "https://images.pexels.com/photos/7464230/pexels-photo-7464230.jpeg?auto=compress&cs=tinysrgb&w=600",
    fullDesc:
      "Accompagnement complet pour un déménagement serein et bien organisé.",
    details: [
      "Aide à la préparation et aux cartons",
      "Tri et organisation de vos affaires",
      "Protection des meubles et objets fragiles",
      "Chargement et déchargement",
      "Déballage et installation",
      "Nettoyage de l'ancien et du nouveau domicile",
    ],
  },
  {
    title: "Garde d'enfants",
    desc: "Surveillance bienveillante",
    image:
      "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600",
    fullDesc:
      "Garde et accompagnement de vos enfants avec attention et professionnalisme.",
    details: [
      "Garde d'enfants à domicile en soirée ou week-end",
      "Accompagnement aux activités scolaires",
      "Aide aux devoirs et soutien éducatif",
      "Préparation des repas et goûters",
      "Activités ludiques et éducatives",
      "Surveillance et sécurité assurées",
    ],
  },
];

export function Services() {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const scrollToSection = useCallback((id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    if (selectedService !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedService]);

  return (
    <>
      <section id="services" className="py-24 lg:py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-brand-rose rounded-full animate-spin-slow" />
              <span className="text-sm tracking-widest uppercase">
                Nos services
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-light max-w-3xl">
              Des prestations adaptées
              <span className="block font-serif italic">à vos besoins</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animation">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => setSelectedService(index)}
                className="group cursor-pointer relative bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover-lift hover-shine"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 text-white/70 mb-3">
                    <div className="w-2 h-2 bg-brand-rose rounded-full" />
                    <span className="text-xs uppercase tracking-widest">
                      {service.desc}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-light text-white">
                      {service.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {selectedService !== null && (
        <ServiceModal
          service={services[selectedService]}
          serviceIndex={selectedService}
          onClose={() => setSelectedService(null)}
          scrollToSection={scrollToSection}
        />
      )}
    </>
  );
}
