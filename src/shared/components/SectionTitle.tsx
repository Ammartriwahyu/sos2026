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
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduce) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(el, { opacity: 0, y: 16 });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <h2
      ref={ref}
      className={cn(
        "peta-reveal z-30 mx-auto w-full max-w-5xl border border-y border-[#4A3488]/15 bg-linear-to-r from-[#4A3488]/0 via-[#4A3488]/15 to-[#4A3488]/0 py-2.5 text-center text-4xl font-bold text-putih backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;
