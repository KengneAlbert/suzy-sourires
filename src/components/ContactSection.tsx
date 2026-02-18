"use client";

import { useState } from "react";
import { ArrowUpRight, MessageCircle, Check, Loader2 } from "lucide-react";
import { openWhatsApp, getWhatsAppNumber } from "@/lib/whatsapp";
import { PHONE_HREF, PHONE_NUMBER, EMAIL, ADDRESS } from "@/lib/constants";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setFormStatus("sending");

    // Construire le message WhatsApp avec les infos du formulaire
    const lines = [
      `Bonjour, je suis ${formData.name.trim()}.`,
      formData.email.trim() && `Email : ${formData.email.trim()}`,
      formData.phone.trim() && `Tél : ${formData.phone.trim()}`,
      "",
      formData.message.trim(),
    ]
      .filter(Boolean)
      .join("\n");

    // Petit délai pour le feedback visuel
    setTimeout(() => {
      openWhatsApp(lines);
      setFormStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      // Reset après 5s
      setTimeout(() => setFormStatus("idle"), 5000);
    }, 400);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <div className="flex items-center gap-3 mb-6 lg:mb-8">
              <div className="w-3 h-3 bg-brand-rose rounded-full animate-bounce-slow" />
              <span className="text-sm tracking-widest uppercase">Contact</span>
            </div>
            <h2 className="text-4xl lg:text-5xl leading-tight font-light mb-8 lg:mb-12">
              Discutons de
              <span className="block font-serif italic">vos besoins</span>
            </h2>
            <p className="text-lg lg:text-xl text-black/70 leading-relaxed mb-12 lg:mb-16">
              Disponible 7 jours sur 7 pour vous accompagner
            </p>
            <div className="space-y-8 lg:space-y-10 stagger-animation">
              <button
                onClick={() =>
                  openWhatsApp(
                    "Bonjour, je souhaite en savoir plus sur vos services",
                  )
                }
                className="group block w-full text-left"
              >
                <div className="text-xs uppercase tracking-widest text-black/50 mb-3 flex items-center gap-2">
                  <span>WhatsApp</span>
                  <MessageCircle className="w-4 h-4 group-hover:text-green-500" />
                </div>
                <div className="text-2xl lg:text-3xl group-hover:text-green-500 transition-colors flex items-center gap-3">
                  {getWhatsAppNumber()}
                  <ArrowUpRight className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
              </button>
              <a href={PHONE_HREF} className="group block">
                <div className="text-xs uppercase tracking-widest text-black/50 mb-3">
                  Téléphone
                </div>
                <div className="text-2xl lg:text-3xl group-hover:text-brand-rose transition-colors">
                  {PHONE_NUMBER}
                </div>
              </a>
              <a href={`mailto:${EMAIL}`} className="group block">
                <div className="text-xs uppercase tracking-widest text-black/50 mb-3">
                  Email
                </div>
                <div className="text-xl lg:text-2xl group-hover:text-brand-rose transition-colors break-all">
                  {EMAIL}
                </div>
              </a>
              <div>
                <div className="text-xs uppercase tracking-widest text-black/50 mb-3">
                  Adresse
                </div>
                <div className="text-lg lg:text-xl whitespace-pre-line">
                  {ADDRESS}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-black/50 mb-3">
                  Horaires
                </div>
                <div className="space-y-2 text-base lg:text-lg">
                  <p>Lundi - Vendredi : 8h - 20h</p>
                  <p>Samedi : 9h - 19h</p>
                  <p>Dimanche : 9h - 20h</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 lg:p-12 rounded-3xl hover-lift animate-fade-in">
            <h3 className="text-2xl mb-6 lg:mb-8">Envoyez-nous un message</h3>

            {formStatus === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h4 className="text-xl font-medium text-brand-dark mb-2">
                  Message envoyé !
                </h4>
                <p className="text-gray-500">
                  Nous avons ouvert WhatsApp avec votre message. Merci de nous
                  contacter !
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 lg:space-y-6">
                <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs uppercase tracking-widest text-black/50 mb-3"
                    >
                      Nom <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-0 py-3 border-b-2 border-black/10 focus:border-brand-rose outline-none transition-colors bg-transparent text-lg"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs uppercase tracking-widest text-black/50 mb-3"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-0 py-3 border-b-2 border-black/10 focus:border-brand-rose outline-none transition-colors bg-transparent text-lg"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-xs uppercase tracking-widest text-black/50 mb-3"
                  >
                    Téléphone
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-0 py-3 border-b-2 border-black/10 focus:border-brand-rose outline-none transition-colors bg-transparent text-lg"
                    placeholder="Votre numéro"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs uppercase tracking-widest text-black/50 mb-3"
                  >
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-0 py-3 border-b-2 border-black/10 focus:border-brand-rose outline-none transition-colors resize-none bg-transparent text-lg"
                    placeholder="Parlez-nous de vos besoins..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="group inline-flex items-center gap-3 bg-brand-dark text-white px-8 lg:px-10 py-4 lg:py-5 rounded-full hover:scale-105 transition-transform text-lg hover-grow hover-shine disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus === "sending" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Envoyer via WhatsApp</span>
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
                <p className="text-xs text-black/40 mt-2">
                  Le message sera envoyé via WhatsApp pour un traitement plus
                  rapide.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
