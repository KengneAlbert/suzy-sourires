import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ServiceModal } from './ServiceModal';

const services = [
  {
    title: "Assistance administrative",
    desc: "Documents & démarches",
    image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600",
    fullDesc: "Nous vous accompagnons dans toutes vos démarches administratives pour vous simplifier la vie.",
    details: [
      "Aide à la constitution et au suivi de dossiers administratifs",
      "Accompagnement aux rendez-vous administratifs",
      "Gestion du courrier et classement de documents",
      "Aide à la déclaration d'impôts et formalités diverses",
      "Soutien dans les démarches en ligne",
      "Rédaction de courriers administratifs"
    ]
  },
  {
    title: "Services de nettoyage",
    desc: "Entretien professionnel",
    image: "https://images.pexels.com/photos/4239037/pexels-photo-4239037.jpeg?auto=compress&cs=tinysrgb&w=600",
    fullDesc: "Un intérieur propre et bien entretenu pour votre confort et votre bien-être au quotidien.",
    details: [
      "Nettoyage complet de toutes les pièces",
      "Dépoussiérage et aspiration méticuleuse",
      "Nettoyage des sols, vitres et surfaces",
      "Entretien des sanitaires et cuisine",
      "Repassage et entretien du linge",
      "Nettoyage en profondeur selon vos besoins"
    ]
  },
  {
    title: "Aide aux courses et repas",
    desc: "Courses & préparation",
    image: "https://images.pexels.com/photos/4792486/pexels-photo-4792486.jpeg?auto=compress&cs=tinysrgb&w=600",
    fullDesc: "Nous vous aidons à faire vos courses et à préparer des repas équilibrés adaptés à vos goûts.",
    details: [
      "Courses alimentaires selon vos listes et préférences",
      "Préparation de repas équilibrés et savoureux",
      "Adaptation aux régimes spécifiques (diabète, sans sel, etc.)",
      "Rangement des provisions",
      "Aide à la prise des repas si nécessaire",
      "Nettoyage de la cuisine après préparation"
    ]
  },
  {
    title: "Entretien espaces",
    desc: "Intérieur & extérieur",
    image: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=600",
    fullDesc: "Maintenance et entretien de vos espaces intérieurs et extérieurs pour un cadre de vie agréable.",
    details: [
      "Entretien du jardin et des espaces verts",
      "Tonte de pelouse et taille des haies",
      "Arrosage des plantes et fleurs",
      "Petits travaux de bricolage",
      "Entretien des terrasses et balcons",
      "Déneigement et déblaiement en hiver"
    ]
  },
  {
    title: "Assistance déménagements",
    desc: "Organisation & aide",
    image: "https://images.pexels.com/photos/7464230/pexels-photo-7464230.jpeg?auto=compress&cs=tinysrgb&w=600",
    fullDesc: "Accompagnement complet pour un déménagement serein et bien organisé.",
    details: [
      "Aide à la préparation et aux cartons",
      "Tri et organisation de vos affaires",
      "Protection des meubles et objets fragiles",
      "Chargement et déchargement",
      "Déballage et installation dans le nouveau logement",
      "Nettoyage de l'ancien et du nouveau domicile"
    ]
  },
  {
    title: "Garde d'enfants",
    desc: "Surveillance bienveillante",
    image: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600",
    fullDesc: "Garde et accompagnement de vos enfants avec attention, bienveillance et professionnalisme.",
    details: [
      "Garde d'enfants à domicile en soirée ou week-end",
      "Accompagnement aux activités scolaires et extra-scolaires",
      "Aide aux devoirs et soutien éducatif",
      "Préparation des repas et goûters",
      "Activités ludiques et éducatives",
      "Surveillance et sécurité assurées"
    ]
  }
];

interface ServicesProps {
  scrollToSection: (id: string) => void;
}

export function Services({ scrollToSection }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  useEffect(() => {
    if (selectedService !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedService]);

  return (
    <>
      <section id="services" className="py-32 px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-[#E8B4A0] rounded-full animate-pulse"></div>
              <span className="text-sm tracking-widest uppercase">Nos prestations</span>
              <span className="text-2xl animate-wiggle">✨</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-light max-w-3xl">
              Des services adaptés à
              <span className="block font-serif italic">vos besoins</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animation">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => setSelectedService(index)}
                className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#E8B4A0]/30 hover-lift hover-shine"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-[#E8B4A0]/60 transition-colors duration-500"></div>
                  <div className="absolute top-6 right-6">
                    <span className="text-6xl font-black bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
                <div className="p-8 bg-gradient-to-br from-white to-[#FDFBF7] group-hover:from-[#FDFBF7] group-hover:to-white transition-colors duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold group-hover:text-[#E8B4A0] transition-colors">{service.title}</h3>
                    <ArrowUpRight className="w-7 h-7 text-[#E8B4A0] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>
                  <p className="text-base text-black/70 font-medium">{service.desc}</p>
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
