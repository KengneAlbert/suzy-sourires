import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  SITE_NAME,
  SITE_URL,
  EMAIL,
  PHONE_NUMBER,
  ADDRESS,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mentions légales & CGV",
  description: `Mentions légales, conditions générales de vente et politique de confidentialité de ${SITE_NAME}.`,
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div className="bg-white border-b border-black/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-black/50 hover:text-brand-rose transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
          <h1 className="text-4xl lg:text-5xl font-light text-brand-dark">
            Mentions légales{" "}
            <span className="font-serif italic">&amp; CGV</span>
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="space-y-12 lg:space-y-16">
          {/* ─── 1. Mentions légales ─── */}
          <Section title="1. Mentions légales">
            <H3>Éditeur du site</H3>
            <P>
              <strong>Nom :</strong> {SITE_NAME}
            </P>
            <P>
              <strong>Statut :</strong> Auto-entrepreneur / Micro-entreprise
            </P>
            <P>
              <strong>Adresse :</strong> {ADDRESS.replace("\n", ", ")}
            </P>
            <P>
              <strong>Téléphone :</strong>{" "}
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                className="underline hover:text-brand-rose transition-colors"
              >
                {PHONE_NUMBER}
              </a>
            </P>
            <P>
              <strong>Email :</strong>{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="underline hover:text-brand-rose transition-colors"
              >
                {EMAIL}
              </a>
            </P>
            {/* Remplacez ci-dessous par vos vrais numéros */}
            <P>
              <strong>SIRET :</strong> En cours d&apos;immatriculation
            </P>

            <H3>Hébergement</H3>
            <P>
              Le site {SITE_URL} est hébergé par <strong>Vercel Inc.</strong>,
              440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
            </P>

            <H3>Directeur de la publication</H3>
            <P>Suzy — joignable à l&apos;adresse {EMAIL}.</P>
          </Section>

          {/* ─── 2. Conditions générales de vente ─── */}
          <Section id="cgv" title="2. Conditions générales de vente (CGV)">
            <H3>2.1 Objet</H3>
            <P>
              Les présentes CGV régissent les prestations de services
              d&apos;aide à domicile et les ventes de produits proposées par{" "}
              {SITE_NAME}.
            </P>

            <H3>2.2 Prix</H3>
            <P>
              Les prix sont indiqués en euros TTC. {SITE_NAME} se réserve le
              droit de modifier ses tarifs à tout moment ; les produits et
              services seront facturés sur la base des prix en vigueur au moment
              de la confirmation de la commande.
            </P>

            <H3>2.3 Commandes et paiement</H3>
            <P>
              Les commandes sont passées par WhatsApp, téléphone ou en personne.
              Le paiement s&apos;effectue au moment de la prestation ou de la
              livraison du produit, selon les modalités convenues (espèces,
              virement, carte bancaire).
            </P>

            <H3>2.4 Droit de rétractation</H3>
            <P>
              Conformément à l&apos;article L.221-18 du Code de la consommation,
              le client dispose d&apos;un délai de{" "}
              <strong>14 jours calendaires</strong> à compter de la réception du
              produit pour exercer son droit de rétractation, sans avoir à
              justifier de motif.
            </P>
            <P>
              Ce droit ne s&apos;applique pas aux prestations de services de
              soins pleinement exécutées avant la fin du délai de rétractation,
              avec l&apos;accord du client (article L.221-28 du Code de la
              consommation).
            </P>
            <P>
              Pour exercer ce droit, contactez-nous par email à{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="underline hover:text-brand-rose transition-colors"
              >
                {EMAIL}
              </a>{" "}
              ou par téléphone au {PHONE_NUMBER}.
            </P>

            <H3>2.5 Livraison</H3>
            <P>
              Les produits sont remis en main propre lors de la prestation à
              domicile ou livrés dans la zone de couverture. Les délais de
              livraison sont indicatifs.
            </P>

            <H3>2.6 Garantie et responsabilité</H3>
            <P>
              Tous les produits vendus bénéficient de la garantie légale de
              conformité (articles L.217-4 et suivants du Code de la
              consommation) et de la garantie des vices cachés (articles 1641 et
              suivants du Code civil).
            </P>

            <H3>2.7 Réclamations et litiges</H3>
            <P>
              Pour toute réclamation, contactez-nous à {EMAIL}. En cas de litige
              non résolu, le client peut recourir à un médiateur de la
              consommation conformément aux articles L.611-1 et suivants du Code
              de la consommation.
            </P>
          </Section>

          {/* ─── 3. Politique de confidentialité ─── */}
          <Section id="confidentialite" title="3. Politique de confidentialité">
            <H3>3.1 Données collectées</H3>
            <P>
              Nous ne collectons que les données strictement nécessaires au
              traitement de vos demandes : nom, email, numéro de téléphone et
              message via le formulaire de contact.
            </P>

            <H3>3.2 Finalités</H3>
            <P>
              Vos données sont utilisées uniquement pour répondre à vos
              demandes, assurer le suivi des prestations et la gestion de la
              relation client. Elles ne sont jamais cédées ni vendues à des
              tiers.
            </P>

            <H3>3.3 Durée de conservation</H3>
            <P>
              Les données sont conservées pendant la durée de la relation
              commerciale et jusqu&apos;à 3 ans après le dernier contact,
              conformément aux obligations légales.
            </P>

            <H3>3.4 Vos droits</H3>
            <P>
              Conformément au RGPD et à la loi Informatique et Libertés, vous
              disposez d&apos;un droit d&apos;accès, de rectification, de
              suppression, de limitation, de portabilité et d&apos;opposition
              sur vos données. Pour exercer ces droits, contactez-nous à{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="underline hover:text-brand-rose transition-colors"
              >
                {EMAIL}
              </a>
              .
            </P>

            <H3>3.5 Cookies</H3>
            <P>
              Ce site utilise uniquement des cookies techniques essentiels au
              fonctionnement (authentification admin). Aucun cookie publicitaire
              ou de suivi n&apos;est utilisé.
            </P>
          </Section>

          {/* ─── 4. Propriété intellectuelle ─── */}
          <Section title="4. Propriété intellectuelle">
            <P>
              L&apos;ensemble du contenu du site (textes, images, logo, mise en
              page) est la propriété exclusive de {SITE_NAME} et est protégé par
              le droit français et international de la propriété intellectuelle.
              Toute reproduction, même partielle, est interdite sans
              autorisation écrite préalable.
            </P>
          </Section>

          {/* ─── Date ─── */}
          <div className="pt-8 border-t border-black/10">
            <P>
              <em>
                Dernière mise à jour :{" "}
                {new Date().toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </em>
            </P>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ─── Composants utilitaires ─── */

function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8">
      <h2 className="text-2xl lg:text-3xl font-light text-brand-dark mb-6">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-semibold text-brand-dark mt-6 mb-2">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-base leading-relaxed text-black/70">{children}</p>;
}
