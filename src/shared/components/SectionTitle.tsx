"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/shared/utils/cn";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTitle = ({ children, className }: SectionTitleProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const band = root.querySelector<HTMLElement>(".section-title-band");
    const topLine = root.querySelector<HTMLElement>(".section-title-line-top");
    const bottomLine = root.querySelector<HTMLElement>(
      ".section-title-line-bottom",
    );
    const text = root.querySelector<HTMLElement>(".section-title-text");
    const glow = root.querySelector<HTMLElement>(".section-title-glow");

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduce) {
        gsap.set([band, text, glow], { opacity: 1, scale: 1 });
        gsap.set([topLine, bottomLine], { scaleX: 1 });
        return;
      }

      gsap.set(band, { opacity: 0 });
      gsap.set([topLine, bottomLine], {
        scaleX: 0,
        transformOrigin: "center center",
      });
      gsap.set(text, { opacity: 0, y: 8 });
      gsap.set(glow, { opacity: 0, scale: 0.6 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 82%", once: true },
      });

      tl.to(band, { opacity: 1, duration: 0.5, ease: "power2.out" })
        .to(
          [topLine, bottomLine],
          { scaleX: 1, duration: 0.7, ease: "power3.out" },
          "<",
        )
        .to(
          glow,
          { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" },
          "<0.1",
        )
        .to(
          text,
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "<0.1",
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={cn("w-full", className)}>
      <div className="section-title-band peta-reveal relative w-full overflow-hidden py-4 md:py-6">
        <span className="section-title-glow" aria-hidden />
        <span className="section-title-line-top absolute inset-x-0 top-0 h-px bg-putih/12" />
        <span className="section-title-line-bottom absolute inset-x-0 bottom-0 h-px bg-putih/12" />
        <h2 className="section-title-text relative text-center text-3xl font-semibold whitespace-nowrap text-putih md:text-5xl">
          {children}
        </h2>
      </div>
    </div>
  );
};

export default SectionTitle;
