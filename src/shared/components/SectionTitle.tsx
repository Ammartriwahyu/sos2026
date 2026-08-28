"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/shared/utils/cn";
import { sectionTitleClass } from "@/shared/components/sectionTitleClass";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2";
  animated?: boolean;
}

const SectionTitle = ({
  children,
  className,
  as = "h2",
  animated = true,
}: SectionTitleProps) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const Heading = as;

  useEffect(() => {
    const el = ref.current;
    if (!el || !animated) return;

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
  }, [animated]);

  return (
    <Heading
      ref={ref}
      className={cn(
        "z-30",
        animated && "peta-reveal",
        sectionTitleClass,
        className,
      )}
    >
      {children}
    </Heading>
  );
};

export default SectionTitle;
