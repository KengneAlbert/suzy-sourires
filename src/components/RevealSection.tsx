"use client";

import { type ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type RevealDirection = "up" | "left" | "right" | "scale";

interface RevealSectionProps {
  children: ReactNode;
  direction?: RevealDirection;
  stagger?: boolean;
  className?: string;
  delay?: number;
  threshold?: number;
}

const directionClass: Record<RevealDirection, string> = {
  up: "reveal",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
};

/**
 * Wrapper qui anime ses enfants au scroll via IntersectionObserver.
 */
export function RevealSection({
  children,
  direction = "up",
  stagger = false,
  className = "",
  delay = 0,
  threshold = 0.15,
}: RevealSectionProps) {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>({ threshold });

  return (
    <div
      ref={ref}
      className={`${directionClass[direction]} ${stagger ? "reveal-stagger" : ""} ${isVisible ? "visible" : ""} ${className}`}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
