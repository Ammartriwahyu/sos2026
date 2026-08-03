"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Judul "Rangkaian": teks diapit 2 garis (atas & bawah) + pencahayaan di belakang.
 * Animasi (dipicu saat masuk viewport):
 *   1. Kedua garis (berhimpit di tengah) muncul & melebar dari tengah ke kanan-kiri.
 *   2. Garis "membuka" ke atas & bawah; teks + glow muncul di antaranya.
 */
const RangkaianTitle = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const box = root.querySelector<HTMLElement>(".peta-title-box");
    const topLine = root.querySelector<HTMLElement>(".peta-title-line-top");
    const bottomLine = root.querySelector<HTMLElement>(
      ".peta-title-line-bottom",
    );
    const text = root.querySelector<HTMLElement>(".peta-title-text");
    const glow = root.querySelector<HTMLElement>(".peta-title-glow");

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduce) {
        gsap.set([topLine, bottomLine], { scaleX: 1, y: 0, xPercent: -50 });
        gsap.set([text, glow], { opacity: 1, scale: 1 });
        return;
      }

      const mid = (box?.offsetHeight ?? 48) / 2;
      // garis mulai berhimpit di tengah (di belakang teks), lebar 0
      gsap.set(topLine, { scaleX: 0, xPercent: -50, y: mid, opacity: 1 });
      gsap.set(bottomLine, { scaleX: 0, xPercent: -50, y: -mid, opacity: 1 });
      gsap.set(text, { opacity: 0 });
      gsap.set(glow, { opacity: 0, scale: 0.6 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 82%", once: true },
      });

      tl.to([topLine, bottomLine], {
        scaleX: 1,
        duration: 0.6,
        ease: "power3.out",
      })
        .to(
          [topLine, bottomLine],
          { y: 0, duration: 0.55, ease: "power2.out" },
          ">-0.05",
        )
        .to(text, { opacity: 1, duration: 0.5, ease: "power2.out" }, "<")
        .to(
          glow,
          { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" },
          "<",
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="flex w-full justify-center">
      <div className="peta-title-box relative px-10 py-3">
        <span className="peta-title-glow" aria-hidden />
        <span className="peta-title-line-top peta-reveal absolute top-0 left-1/2 h-[3px] w-64 rounded-full bg-putih/70 sm:w-80 lg:w-96" />
        <h2 className="peta-title-text peta-reveal relative text-center text-3xl font-semibold whitespace-nowrap text-putih md:text-5xl">
          Rangkaian
        </h2>
        <span className="peta-title-line-bottom peta-reveal absolute bottom-0 left-1/2 h-[3px] w-64 rounded-full bg-putih/70 sm:w-80 lg:w-96" />
      </div>
    </div>
  );
};

export default RangkaianTitle;
