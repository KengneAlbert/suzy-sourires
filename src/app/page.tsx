"use client";

import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ProductsSection } from "@/components/ProductsSection";
import { BeforeAfterGallery } from "@/components/BeforeAfterGallery";
import { Philosophy } from "@/components/Philosophy";
import { AboutSection } from "@/components/AboutSection";
import { CoverageArea } from "@/components/CoverageArea";
import { FAQ } from "@/components/FAQ";
import { Testimonials } from "@/components/Testimonials";
import { CTABanner } from "@/components/CTABanner";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { RevealSection } from "@/components/RevealSection";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />

        <RevealSection direction="scale">
          <CTABanner />
        </RevealSection>

        <RevealSection direction="up">
          <Services />
        </RevealSection>

        <RevealSection direction="up">
          <ProcessSteps />
        </RevealSection>

        <RevealSection direction="up">
          <ProductsSection />
        </RevealSection>

        <RevealSection direction="left">
          <BeforeAfterGallery />
        </RevealSection>

        <RevealSection direction="right">
          <Testimonials />
        </RevealSection>

        <RevealSection direction="left">
          <Philosophy />
        </RevealSection>

        <RevealSection direction="up">
          <AboutSection />
        </RevealSection>

        <RevealSection direction="right">
          <CoverageArea />
        </RevealSection>

        <RevealSection direction="up">
          <FAQ />
        </RevealSection>

        <RevealSection direction="up">
          <ContactSection />
        </RevealSection>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
