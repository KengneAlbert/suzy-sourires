"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Hook pour rendre une modale accessible :
 * - Fermeture avec Escape
 * - Verrouillage du scroll body
 * - Focus trap (le focus reste dans la modale)
 * - Restauration du focus à la fermeture
 */
export function useModal(isOpen: boolean, onClose: () => void) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Sauvegarder le focus précédent et bloquer le scroll
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";

      // Focus le premier élément focusable de la modale
      requestAnimationFrame(() => {
        const el = modalRef.current;
        if (!el) return;
        const focusable = el.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        focusable?.focus();
      });
    }

    return () => {
      document.body.style.overflow = "unset";
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  // Escape + focus trap
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }

      if (e.key !== "Tab") return;

      const el = modalRef.current;
      if (!el) return;

      const focusableElements = el.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  return { modalRef, handleKeyDown };
}
