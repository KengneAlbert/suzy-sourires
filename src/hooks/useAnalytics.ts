"use client";

import { useEffect } from "react";

export function useAnalytics() {
  useEffect(() => {
    const trackPageView = () => {
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag(
          "config",
          process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
          {
            page_path: window.location.pathname,
            page_title: document.title,
          },
        );
      }
    };
    trackPageView();
  }, []);
}

export function trackEvent(
  eventName: string,
  eventData: Record<string, unknown> = {},
) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, eventData);
  }
}

export const analyticsEvents = {
  viewProduct: (productId: string, productName: string, price: number) =>
    trackEvent("view_product", {
      product_id: productId,
      product_name: productName,
      price,
    }),
  clickCTA: (ctaName: string) => trackEvent("click_cta", { cta_name: ctaName }),
  submitContact: (method: string) => trackEvent("contact_submit", { method }),
  navigateSection: (sectionName: string) =>
    trackEvent("navigate_section", { section: sectionName }),
};
