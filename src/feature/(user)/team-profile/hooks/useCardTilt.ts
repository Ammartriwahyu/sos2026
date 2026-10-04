"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const TILT_DISABLED_QUERY =
  "(prefers-reduced-motion: reduce), (hover: none), (max-width: 767px)";
const TILT_PERSPECTIVE = 900;

export const useCardTilt = <T extends HTMLElement>(maxTilt = 12) => {
  const cardRef = useRef<T>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia(TILT_DISABLED_QUERY).matches) return;

    let rotateXTo: gsap.QuickToFunc | null = null;
    let rotateYTo: gsap.QuickToFunc | null = null;

    const ctx = gsap.context(() => {
      gsap.set(card, { transformPerspective: TILT_PERSPECTIVE });
      rotateXTo = gsap.quickTo(card, "rotationX", {
        duration: 0.5,
        ease: "power3.out",
      });
      rotateYTo = gsap.quickTo(card, "rotationY", {
        duration: 0.5,
        ease: "power3.out",
      });
    }, card);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const ratioX = (event.clientX - rect.left) / rect.width;
      const ratioY = (event.clientY - rect.top) / rect.height;

      card.style.setProperty("--tp-mx", `${ratioX * 100}%`);
      card.style.setProperty("--tp-my", `${ratioY * 100}%`);
      rotateXTo?.((0.5 - ratioY) * 2 * maxTilt);
      rotateYTo?.((ratioX - 0.5) * 2 * maxTilt);
    };

    const handleMouseLeave = () => {
      rotateXTo?.(0);
      rotateYTo?.(0);
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.style.removeProperty("--tp-mx");
      card.style.removeProperty("--tp-my");
      ctx.revert();
    };
  }, [maxTilt]);

  return cardRef;
};
