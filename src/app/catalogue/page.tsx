import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CatalogueClient } from "@/components/CatalogueClient";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Catalogue Parfums Chogan",
  description:
    "Découvrez notre sélection de parfums Chogan — extraits de parfum 30%, inspirés des plus grandes maisons de luxe, à des prix accessibles. Femme, Homme, Mixte, Enfants.",
  openGraph: {
    title: `Catalogue Parfums Chogan | ${SITE_NAME}`,
    description:
      "Plus de 130 parfums inspirés des grandes maisons de luxe. Qualité extrait de parfum 30%.",
  },
};

export default function CataloguePage() {
  return (
    <>
      <Navigation />
      <main className="pt-24 lg:pt-28 min-h-screen bg-brand-cream">
        <CatalogueClient />
      </main>
      <Footer />
    </>
  );
}
