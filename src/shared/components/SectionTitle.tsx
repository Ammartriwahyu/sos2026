"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/shared/utils/cn";

interface SectionTitleProps {
  /** Teks judul — cukup ganti ini untuk memakai di halaman lain. */
  children: React.ReactNode;
  className?: string;
}

/**
 * Judul section reusable: teks di tengah diapit garis tipis yang memanjang penuh
 * ke kiri & kanan, dengan titik kecil di ujung kiri dan pencahayaan di belakang
 * teks. Garis tumbuh dari tengah melebar ke kanan-kiri saat masuk viewport.
 *
 * Pemakaian: <SectionTitle>Rangkaian</SectionTitle>
 */
const SectionTitle = ({ children, className }: SectionTitleProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const leftLine = root.querySelector<HTMLElement>(
      ".section-title-line-left",
    );
    const rightLine = root.querySelector<HTMLElement>(
      ".section-title-line-right",
    );
    const dot = root.querySelector<HTMLElement>(".section-title-dot");
    const text = root.querySelector<HTMLElement>(".section-title-text");
    const glow = root.querySelector<HTMLElement>(".section-title-glow");

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduce) {
        gsap.set([leftLine, rightLine], { scaleX: 1 });
        gsap.set([text, glow, dot], { opacity: 1, scale: 1 });
        return;
      }

      gsap.set(leftLine, { scaleX: 0, transformOrigin: "right center" });
      gsap.set(rightLine, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(dot, { opacity: 0, scale: 0 });
      gsap.set(text, { opacity: 0, y: 6 });
      gsap.set(glow, { opacity: 0, scale: 0.6 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 82%", once: true },
      });

      tl.to([leftLine, rightLine], {
        scaleX: 1,
        duration: 0.7,
        ease: "power3.out",
      })
        .to(
          dot,
          { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" },
          "<",
        )
        .to(
          text,
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.35",
        )
        .to(
          glow,
          { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" },
          "<",
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn("flex w-full items-center gap-3 sm:gap-4", className)}
    >
      <span className="section-title-dot peta-reveal size-2.5 shrink-0 rounded-full bg-putih/25 ring-1 ring-putih/40" />

      <span className="section-title-line-left peta-reveal h-px flex-1 rounded-full bg-putih/25" />

      <div className="section-title-box relative shrink-0 px-3">
        <span className="section-title-glow" aria-hidden />
        <h2 className="section-title-text relative text-center text-3xl font-semibold whitespace-nowrap text-putih md:text-5xl">
          {children}
        </h2>
      </div>

      <span className="section-title-line-right peta-reveal h-px flex-1 rounded-full bg-putih/25" />
    </div>
  );
};

export default SectionTitle;
