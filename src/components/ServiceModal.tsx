"use client";

import { X, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { PHONE_HREF } from "@/lib/constants";
import { useModal } from "@/hooks/useModal";

interface Service {
  title: string;
  desc: string;
  image: string;
  fullDesc: string;
  details: string[];
}

interface ServiceModalProps {
  service: Service;
  serviceIndex: number;
  onClose: () => void;
  scrollToSection: (id: string) => void;
}

export function ServiceModal({
  service,
  serviceIndex,
  onClose,
  scrollToSection,
}: ServiceModalProps) {
  const { modalRef, handleKeyDown } = useModal(true, onClose);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={service.title}
      ref={modalRef}
      onKeyDown={handleKeyDown}
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[21/9] overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-brand-rose rounded-full" />
              <span className="text-sm tracking-widest uppercase text-white/80">
                Service {String(serviceIndex + 1).padStart(2, "0")}
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-light text-white mb-3">
              {service.title}
            </h2>
            <p className="text-xl text-white/90">{service.fullDesc}</p>
          </div>
        </div>
        <div className="p-8 lg:p-12">
          <h3 className="text-2xl mb-8 flex items-center gap-3">
            <span className="font-light">Ce qui est inclus</span>
            <div className="flex-1 h-px bg-black/10" />
          </h3>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {service.details.map((detail, idx) => (
              <div key={idx} className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-brand-rose flex-shrink-0 mt-0.5" />
                <p className="text-lg text-black/80 leading-relaxed">
                  {detail}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-black/10 pt-8 flex flex-col sm:flex-row gap-4">
            <a
              href={PHONE_HREF}
              className="flex-1 inline-flex items-center justify-center gap-3 bg-brand-dark text-white px-8 py-5 rounded-full hover:scale-105 transition-transform text-lg"
            >
              <span>Nous contacter</span>
              <ArrowUpRight className="w-5 h-5" />
            </a>
            <button
              onClick={() => {
                onClose();
                scrollToSection("contact");
              }}
              className="flex-1 inline-flex items-center justify-center gap-3 border-2 border-brand-dark px-8 py-5 rounded-full hover:bg-brand-dark hover:text-white transition-colors text-lg"
            >
              Demander un devis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
