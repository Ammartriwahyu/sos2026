"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import {
  INTRO_BAND_INTERVAL,
  INTRO_CUES,
  INTRO_TIME_SCALE,
} from "../data/motion";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export const useIntroSequence = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const lenis = useLenis();

  useEffect(() => {
    const root = overlayRef.current;
    if (!root) return;

    const pick = <T extends Element = HTMLElement>(selector: string) =>
      root.querySelector<T>(selector);
    const pickAll = (selector: string) =>
      gsap.utils.toArray<HTMLElement>(root.querySelectorAll(selector));

    const space = pick(".tp-intro-space");
    const spark = pick(".tp-intro-spark");
    const burst = pick(".tp-intro-burst");
    const stars = pickAll(".tp-intro-star");
    const flyers = pickAll(".tp-intro-flyer");
    const streaks = pickAll(".tp-streak");
    const nebulae = pickAll(".tp-intro-nebula");
    const solar = pick(".tp-intro-solar");
    const content = pick(".tp-intro-content");
    const glow = pick(".tp-intro-glow-wrap");
    const rings = pickAll(".tp-intro-ring");
    const logo = pick(".tp-intro-logo");
    const chars = pickAll(".tp-char");
    const shine = pick(".tp-intro-shine");
    const subtitle = pick(".tp-intro-subtitle");
    const underline = pick(".tp-intro-underline");
    const bands = pickAll(".tp-intro-band");
    const count = pick(".tp-intro-count");
    const countNumber = pick(".tp-intro-count-number");
    const flash = pick(".tp-intro-flash");

    const finalCount = countNumber?.textContent ?? "";

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(REDUCED_MOTION_QUERY).matches;

      if (reduce) {
        setIsVisible(false);
        return;
      }

      const cue = INTRO_CUES;
      const reach = Math.hypot(window.innerWidth, window.innerHeight);
      const starX = (_index: number, star: HTMLElement) =>
        Math.cos(Number(star.dataset.angle)) *
        Number(star.dataset.radius) *
        window.innerWidth *
        0.58;
      const starY = (_index: number, star: HTMLElement) =>
        Math.sin(Number(star.dataset.angle)) *
        Number(star.dataset.radius) *
        window.innerHeight *
        0.58;
      const flyerX = (_index: number, flyer: HTMLElement) =>
        Math.cos(Number(flyer.dataset.angle)) * reach * 0.7;
      const flyerY = (_index: number, flyer: HTMLElement) =>
        Math.sin(Number(flyer.dataset.angle)) * reach * 0.7;

      const tl = gsap.timeline({ onComplete: () => setIsVisible(false) });
      tl.timeScale(INTRO_TIME_SCALE);
      timelineRef.current = tl;

      Object.entries(cue).forEach(([label, time]) => tl.addLabel(label, time));

      tl.fromTo(
        spark,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" },
        cue.void,
      )
        .to(
          spark,
          {
            scale: 1.8,
            duration: 0.28,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1,
          },
          cue.void + 0.3,
        )
        .to(
          spark,
          { scale: 0.1, duration: 0.12, ease: "power4.in" },
          cue.bigBang - 0.12,
        );

      tl.set(spark, { opacity: 0 }, cue.bigBang)
        .fromTo(
          burst,
          { scale: 0, opacity: 1 },
          {
            scale: 1,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out",
            immediateRender: false,
          },
          cue.bigBang,
        )
        .fromTo(
          space,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          cue.bigBang,
        )
        .fromTo(
          stars,
          { x: 0, y: 0, scale: 0, opacity: 0 },
          {
            x: starX,
            y: starY,
            scale: 1,
            opacity: 1,
            duration: 1.3,
            ease: "expo.out",
            stagger: { amount: 0.3, from: "random" },
          },
          cue.bigBang,
        )
        .fromTo(
          streaks,
          { x: 0, scaleX: 0.05, opacity: 0 },
          {
            x: reach,
            scaleX: 1,
            opacity: 1,
            duration: 0.8,
            ease: "expo.out",
            stagger: { amount: 0.6, from: "random" },
          },
          cue.bigBang,
        );

      tl.fromTo(
        flyers,
        { x: 0, y: 0, scale: 0.2, opacity: 0 },
        {
          x: flyerX,
          y: flyerY,
          scale: 2.6,
          opacity: 1,
          duration: 0.5,
          ease: "power2.in",
          repeat: 1,
          stagger: { amount: 0.4, from: "random" },
        },
        cue.flyThrough,
      )
        .to(
          stars,
          {
            x: (index: number, star: HTMLElement) => starX(index, star) * 1.3,
            y: (index: number, star: HTMLElement) => starY(index, star) * 1.3,
            duration: 1.4,
            ease: "sine.inOut",
          },
          cue.flyThrough,
        )
        .fromTo(
          solar,
          { xPercent: 80, yPercent: -45, rotation: -60, opacity: 0 },
          {
            xPercent: 0,
            yPercent: 0,
            rotation: 0,
            opacity: 0.75,
            duration: 1.4,
            ease: "power3.out",
          },
          cue.flyThrough,
        )
        .fromTo(
          nebulae,
          { xPercent: (index: number) => (index ? 45 : -45), opacity: 0 },
          {
            xPercent: (index: number) => (index ? -12 : 12),
            opacity: 1,
            duration: 1.4,
            ease: "sine.inOut",
          },
          cue.flyThrough,
        );

      tl.to(
        solar,
        { opacity: 0.22, scale: 0.86, duration: 1, ease: "power2.inOut" },
        cue.logo,
      )
        .fromTo(
          glow,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.6, ease: "power2.out" },
          cue.logo + 0.1,
        )
        .fromTo(
          logo,
          { scale: 0, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.7, ease: "back.out(1.8)" },
          cue.logo,
        )
        .fromTo(
          rings,
          { scale: 0.3, opacity: 0.9 },
          {
            scale: 7,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.2,
            immediateRender: false,
          },
          cue.logo + 0.15,
        );

      tl.fromTo(
        chars,
        {
          opacity: 0,
          y: 60,
          rotateX: -90,
          transformOrigin: "50% 100%",
          transformPerspective: 700,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.55,
          ease: "back.out(1.4)",
          stagger: 0.035,
        },
        cue.title,
      ).fromTo(
        shine,
        { "--tp-shine": "-20%", opacity: 1 },
        {
          "--tp-shine": "120%",
          duration: 0.55,
          ease: "power2.inOut",
          immediateRender: false,
        },
        cue.title + 0.85,
      );

      tl.fromTo(
        subtitle,
        { autoAlpha: 0, letterSpacing: "1.4em" },
        {
          autoAlpha: 1,
          letterSpacing: "0.3em",
          duration: 0.7,
          ease: "power3.out",
        },
        cue.subtitle,
      ).fromTo(
        underline,
        { scaleX: 0, autoAlpha: 1 },
        { scaleX: 1, duration: 0.6, ease: "power3.inOut" },
        cue.subtitle + 0.2,
      );

      bands.forEach((band, index) => {
        const at = cue.divisions + index * INTRO_BAND_INTERVAL;
        const label = band.querySelector<HTMLElement>(".tp-intro-band-label");

        tl.fromTo(
          band,
          { xPercent: -130, skewX: -14, autoAlpha: 1 },
          { xPercent: 0, duration: 0.2, ease: "power3.out" },
          at,
        )
          .fromTo(
            label,
            { scale: 1.6, skewX: 14, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.14, ease: "power2.out" },
            at + 0.06,
          )
          .to(
            band,
            { xPercent: 130, duration: 0.2, ease: "power3.in" },
            at + 0.34,
          );
      });

      if (countNumber) {
        const counter = { value: 0 };
        countNumber.textContent = "0";

        tl.to(
          counter,
          {
            value: Number(finalCount),
            duration: 0.5,
            ease: "power1.out",
            onUpdate: () => {
              countNumber.textContent = String(Math.round(counter.value));
            },
          },
          cue.count,
        );
      }

      tl.fromTo(
        count,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" },
        cue.count,
      );

      tl.to(
        content,
        { scale: 0.2, opacity: 0, duration: 0.4, ease: "power3.in" },
        cue.curtain,
      )
        .to(
          stars,
          { x: 0, y: 0, scale: 0, duration: 0.4, ease: "power3.in" },
          cue.curtain,
        )
        .to(
          [solar, ...nebulae],
          { scale: 0.2, opacity: 0, duration: 0.4, ease: "power3.in" },
          cue.curtain,
        )
        .fromTo(
          flash,
          { opacity: 0 },
          { opacity: 1, duration: 0.07, ease: "none" },
          cue.curtain + 0.38,
        )
        .to(
          flash,
          { opacity: 0, duration: 0.45, ease: "power2.out" },
          cue.curtain + 0.45,
        )
        .to(
          root,
          { yPercent: -100, duration: 0.6, ease: "power3.inOut" },
          cue.curtain + 0.45,
        );
    }, root);

    return () => {
      timelineRef.current = null;
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (!lenis || !isVisible) return;
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

    lenis.stop();

    return () => {
      lenis.start();
    };
  }, [lenis, isVisible]);

  const skip = useCallback(() => {
    timelineRef.current?.progress(1);
  }, []);

  return { overlayRef, isVisible, skip };
};
