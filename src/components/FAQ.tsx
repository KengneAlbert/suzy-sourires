"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

export const faqItems = [
  {
    question: "Quels sont vos tarifs ?",
    answer:
      "Nos tarifs varient selon les services demandés et la fréquence d'intervention. Nous proposons des devis personnalisés gratuits. En moyenne, nos prestations débutent à 15€/heure pour l'aide à domicile classique. Bénéficiez de 50% de crédit d'impôt sur les services à la personne.",
  },
  {
    question: "Quels sont vos horaires d'intervention ?",
    answer:
      "Nous intervenons du lundi au vendredi de 8h à 20h, le samedi de 9h à 19h et le dimanche de 9h à 20h. Contactez-nous pour tout besoin hors de ces créneaux.",
  },
  {
    question: "Quelle est votre zone d'intervention ?",
    answer:
      "Nous intervenons principalement à Aulnay-sous-Bois et les communes environnantes : Sevran, Drancy, Le Blanc-Mesnil, Bondy, Villepinte, Tremblay-en-France, Pierrefitte-sur-Seine, Stains, Saint-Denis, Bobigny et Pantin. Contactez-nous pour vérifier votre secteur.",
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    answer:
      "Nous acceptons les paiements par chèque, virement bancaire, espèces et CESU (Chèque Emploi Service Universel). Le paiement peut être effectué après chaque intervention ou mensuellement selon vos préférences.",
  },
  {
    question: "Êtes-vous assuré et certifié ?",
    answer:
      "Oui, nous disposons d'une assurance responsabilité civile professionnelle et sommes déclarés pour les services à la personne. Cela vous permet de bénéficier des avantages fiscaux et d'une prestation en toute sécurité.",
  },
  {
    question: "Comment annuler ou modifier un rendez-vous ?",
    answer:
      "Vous pouvez annuler ou modifier votre rendez-vous en nous contactant par téléphone au moins 24h à l'avance. Nous ferons notre possible pour nous adapter à vos contraintes et trouver un nouveau créneau.",
  },
  {
    question: "Dois-je fournir le matériel pour le ménage ?",
    answer:
      "Nous pouvons utiliser votre matériel et vos produits d'entretien si vous le souhaitez. Nous pouvons également apporter nos propres produits professionnels et écologiques moyennant un léger supplément.",
  },
  {
    question: "Puis-je avoir la même personne à chaque intervention ?",
    answer:
      "Oui, nous privilégions la continuité et mettons tout en œuvre pour que ce soit la même personne qui intervienne chez vous. Cela permet d'établir une relation de confiance et de mieux connaître vos habitudes et préférences.",
  },
];

export function FAQ() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 lg:py-32 px-6 lg:px-8 bg-brand-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-3 h-3 bg-brand-rose rounded-full animate-pulse" />
            <span className="text-sm tracking-widest uppercase">
              Questions fréquentes
            </span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-light mb-6">
            Foire aux
            <span className="block font-serif italic">questions</span>
          </h2>
          <p className="text-xl text-black/70 max-w-2xl mx-auto">
            Trouvez rapidement les réponses à vos questions les plus courantes
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-3">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() =>
                  setOpenFaqIndex(openFaqIndex === index ? null : index)
                }
                aria-expanded={openFaqIndex === index}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-black/[0.02] transition-colors"
              >
                <span className="text-lg font-medium pr-8">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-brand-rose flex-shrink-0 transition-transform duration-300 ${
                    openFaqIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFaqIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-8 pb-7 pt-1">
                  <p className="text-base text-black/70 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <p className="text-lg text-black/60 mb-6">
            Vous ne trouvez pas la réponse à votre question ?
          </p>
          <button
            onClick={() =>
              openWhatsApp("Bonjour, j'ai une question sur vos services")
            }
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-10 py-5 rounded-full transition-colors text-lg font-medium"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Poser une question via WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  );
}
