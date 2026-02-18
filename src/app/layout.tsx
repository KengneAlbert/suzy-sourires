import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/hooks/useAuth";
import { OrganizationStructuredData } from "@/components/OrganizationStructuredData";
import { CookieBanner } from "@/components/CookieBanner";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Services d'aide à domicile en Seine-Saint-Denis`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "aide à domicile",
    "ménage",
    "assistance administrative",
    "garde d'enfants",
    "courses",
    "entretien",
    "Aulnay-sous-Bois",
    "Seine-Saint-Denis",
    "services à la personne",
    "Île-de-France",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Services d'aide à domicile en Seine-Saint-Denis`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-sans">
        <a href="#main-content" className="skip-to-content">
          Aller au contenu principal
        </a>
        <AuthProvider>
          <OrganizationStructuredData />
          <div id="main-content">{children}</div>
          <FloatingWhatsApp />
          <CookieBanner />
        </AuthProvider>
      </body>
    </html>
  );
}
