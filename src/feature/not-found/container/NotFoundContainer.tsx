"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SpaceWaves from "../components/SpaceWaves";
import FloatingRocks from "../components/FloatingRocks";
import PurpleCurtain from "../components/PurpleCurtain";
import NotFoundText from "../components/NotFoundText";
import FlyingRocket from "../components/FlyingRocket";
import { wavePath } from "../waveShape";

/**
 * Halaman 404 — SATU timeline GSAP mengatur roket, ombak (clipPath), dan teks 404
 * dari SATU state bersama, sehingga semuanya tertarik BERBARENGAN.
 * Kecepatan tarik: cepat masuk → MELAMBAT di tengah layar (jeda) → cepat keluar.
 */
const NotFoundContainer = () => {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const rocket = root.querySelector<HTMLElement>(".nf404-rocket");
    const wavePathEl = root.querySelector<SVGPathElement>("#nf404-wave-path");
    const content = root.querySelector<HTMLElement>(".nf404-content");
    const contentFloat = root.querySelector<HTMLElement>(
      ".nf404-content-float",
    );
    const chars = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll(".nf404-char"),
    );
    const tagline = root.querySelector<HTMLElement>(".nf404-tagline");
    const cta = root.querySelector<HTMLElement>(".nf404-cta");

    // state bersama: rx = translateX ekor roket (vw), wp = puncak ombak (fraksi lebar)
    const st = { rx: -18, wp: -0.18 };
    const t0 = performance.now();
    const apply = () => {
      const t = (performance.now() - t0) / 1000; // fase waktu → ombak beriak
      if (rocket) rocket.style.transform = `translateX(${st.rx}vw)`;
      if (wavePathEl) wavePathEl.setAttribute("d", wavePath(st.wp, t));
      // 404 mengikuti roket (offset tetap 112vw) → tertarik berbarengan, berhenti di tengah
      if (content)
        content.style.transform = `translateX(${Math.min(0, st.rx - 112)}vw)`;
    };

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduce) {
        st.rx = 112;
        st.wp = 1.9;
        apply();
        gsap.set([tagline, cta], { autoAlpha: 1, y: 0 });
        if (rocket) rocket.style.opacity = "0";
        return;
      }

      gsap.set(content, { autoAlpha: 1 });
      gsap.set([tagline, cta], { autoAlpha: 0, y: 16 });
      apply();

      const tl = gsap.timeline();

      // === FASE TARIK: cepat → melambat di TENGAH (jeda) → cepat keluar ===
      tl.to(
        st,
        {
          rx: 46,
          wp: 0.46,
          duration: 1.3,
          ease: "power2.out",
          onUpdate: apply,
        },
        0,
      )
        // segmen tengah lambat = "delay" di tengah layar
        .to(
          st,
          { rx: 64, wp: 0.64, duration: 1.5, ease: "none", onUpdate: apply },
          ">",
        )
        .to(
          st,
          {
            rx: 112,
            wp: 1.12,
            duration: 1.3,
            ease: "power2.in",
            onUpdate: apply,
          },
          ">",
        );
      const pullEnd = 4.1;

      // Huruf "404" bergelombang berjalan (stagger) saat masuk & melewati tengah
      if (chars.length) {
        tl.to(
          chars,
          {
            keyframes: [
              { yPercent: -46 },
              { yPercent: 0 },
              { yPercent: 30 },
              { yPercent: 0 },
            ],
            duration: 1.35,
            ease: "sine.inOut",
            repeat: 1,
            stagger: { each: 0.16 },
          },
          1.4,
        );
      }

      // === FASE SELESAI: roket keluar & hilang, ombak menutup penuh ===
      tl.to(
        st,
        { rx: 150, duration: 0.9, ease: "power1.in", onUpdate: apply },
        pullEnd,
      )
        .to(
          st,
          { wp: 1.9, duration: 1.0, ease: "power1.in", onUpdate: apply },
          pullEnd,
        )
        .to(
          rocket,
          { opacity: 0, duration: 0.5, ease: "power1.in" },
          pullEnd + 0.25,
        );

      // 404 mengambang (di elemen anak agar tak bentrok dgn posisi x dari apply)
      tl.to(
        contentFloat,
        {
          y: "-=14",
          duration: 2.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        },
        pullEnd + 0.1,
      );
      tl.to(
        tagline,
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
        pullEnd + 0.5,
      ).to(
        cta,
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
        pullEnd + 0.7,
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main className="nf404-root" ref={rootRef}>
      <div className="nf404-navy">
        <SpaceWaves />
      </div>
      <FloatingRocks />
      <PurpleCurtain />
      <NotFoundText />
      <FlyingRocket />
    </main>
  );
};

export default NotFoundContainer;
