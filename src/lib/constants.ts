// ─── Coordonnées ───
export const PHONE_NUMBER = "07 81 32 44 74";
export const PHONE_HREF = "tel:0781324474";
export const EMAIL = "suzysourires31@gmail.com";
export const ADDRESS = "29 Rue du Dr Fleming\n93600 Aulnay-Sous-Bois";

// ─── WhatsApp ───
export const WHATSAPP_COUNTRY_CODE = "33";
export const WHATSAPP_NUMBER = "781324474";

// ─── Site ───
export const SITE_NAME = "Suzy Sourires";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://suzy-sourires.com";
export const SITE_DESCRIPTION =
  "Services d'aide à domicile à Aulnay-sous-Bois et en Seine-Saint-Denis : ménage, assistance administrative, garde d'enfants, courses et entretien. Professionnalisme et bienveillance.";

// ─── Localisation ───
export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=29+Rue+du+Dr+Fleming+93600+Aulnay-sous-Bois";

// ─── Horaires ───
export const BUSINESS_HOURS = [
  { days: "Lundi – Vendredi", hours: "8h00 – 20h00" },
  { days: "Samedi", hours: "9h00 – 19h00" },
  { days: "Dimanche", hours: "9h00 – 20h00" },
];

// ─── Réseaux sociaux (renseigner quand les profils sont créés) ───
export const INSTAGRAM_URL: string | null = null;
export const FACEBOOK_URL: string | null = null;

// ─── Sécurité ───
export const SESSION_INACTIVITY_MS = 15 * 60 * 1000; // 15 minutes
export const SESSION_WARNING_MS = 1 * 60 * 1000; // 1 minute avant déconnexion
export const MIN_PASSWORD_LENGTH = 8;
