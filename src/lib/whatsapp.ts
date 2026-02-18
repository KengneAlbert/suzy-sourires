import {
  WHATSAPP_COUNTRY_CODE,
  WHATSAPP_NUMBER,
  PHONE_NUMBER,
} from "./constants";

/**
 * Génère un lien WhatsApp avec un message pré-rempli
 */
export function getWhatsAppLink(message = ""): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_COUNTRY_CODE}${WHATSAPP_NUMBER}${
    message ? `?text=${encodedMessage}` : ""
  }`;
}

/**
 * Ouvre WhatsApp dans un nouvel onglet
 */
export function openWhatsApp(message = ""): void {
  const url = getWhatsAppLink(message);
  window.open(url, "_blank");
}

/**
 * Retourne le numéro WhatsApp formaté pour l'affichage
 */
export function getWhatsAppNumber(): string {
  return PHONE_NUMBER;
}
