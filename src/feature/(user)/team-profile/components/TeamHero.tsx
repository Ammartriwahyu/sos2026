"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SolarSystem from "@/assets/assetsos26/shared/solar-system.png";
import Maskot from "@/assets/assetsos26/illustrasions/maskot.svg";
import MaskotCewe from "@/assets/assetsos26/illustrasions/maskot_cewe.svg";
import StarDust from "./StarDust";
import { divisions, teamMembers } from "../data/teamMembers";

const MOUSE_PARALLAX_MAX = 18;
const MOUSE_PARALLAX_QUERY = "(min-width: 768px) and (hover: hover)";
const STATEMENT = `${teamMembers.length} orang. ${divisions.length} divisi. Satu website untuk maba Sistem Informasi.`;

const TeamHero = () => {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const layers = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll(".tp-hero-layer"),
    );
    const movers = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll(".tp-hero-mouse"),
    );
    const copy = root.querySelector<HTMLElement>(".tp-hero-copy");
    const hint = root.querySelector<HTMLElement>(".tp-hero-hint");
    const statement = root.querySelector<HTMLElement>(".tp-hero-statement");
    const words = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll(".tp-hero-word"),
    );

    let handleMouseMove: ((event: MouseEvent) => void) | null = null;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduce) {
        gsap.set([...layers, copy, hint, statement, ...words], {
          opacity: 1,
          x: 0,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      layers.forEach((layer) => {
        tl.to(layer, { yPercent: Number(layer.dataset.shift), duration: 1 }, 0);
      });

      tl.fromTo(
        copy,
        { yPercent: 0, scale: 1, opacity: 1, filter: "blur(0px)" },
        {
          yPercent: -55,
          scale: 0.72,
          opacity: 0,
          filter: "blur(10px)",
          duration: 0.2,
        },
        0,
      )
        .set(statement, { opacity: 1 }, 0.12)
        .fromTo(
          words,
          { opacity: 0, y: 50, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.08,
            stagger: 0.018,
            ease: "back.out(1.6)",
          },
          0.14,
        )
        .to(
          statement,
          { scale: 1.12, yPercent: -30, opacity: 0, duration: 0.22 },
          0.5,
        );

      gsap.to(hint, {
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=140",
          scrub: true,
        },
      });

      if (!window.matchMedia(MOUSE_PARALLAX_QUERY).matches) return;

      const quickMovers = movers.map((mover) => ({
        depth: Number(mover.dataset.depth),
        xTo: gsap.quickTo(mover, "x", { duration: 0.8, ease: "power3.out" }),
        yTo: gsap.quickTo(mover, "y", { duration: 0.8, ease: "power3.out" }),
      }));

      handleMouseMove = (event: MouseEvent) => {
        const ratioX = (event.clientX / window.innerWidth - 0.5) * 2;
        const ratioY = (event.clientY / window.innerHeight - 0.5) * 2;

        quickMovers.forEach(({ depth, xTo, yTo }) => {
          xTo(ratioX * MOUSE_PARALLAX_MAX * depth);
          yTo(ratioY * MOUSE_PARALLAX_MAX * depth);
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
    }, root);

    return () => {
      if (handleMouseMove) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      ctx.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="tp-hero-track relative h-[180vh]">
      <div className="tp-hero-sticky sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div
          className="tp-hero-layer pointer-events-none absolute inset-0"
          data-shift="10"
          aria-hidden
        >
          <div className="tp-hero-mouse absolute -inset-6" data-depth="0.15">
            <StarDust count={36} seed={21} />
          </div>
        </div>

        <div
          className="tp-hero-layer pointer-events-none absolute inset-0"
          data-shift="18"
          aria-hidden
        >
          <div className="tp-hero-mouse absolute inset-0" data-depth="0.35">
            <div className="tp-nebula tp-nebula-a" />
            <div className="tp-nebula tp-nebula-b" />
          </div>
        </div>

        <div
          className="tp-hero-layer pointer-events-none absolute inset-0"
          data-shift="30"
          aria-hidden
        >
          <div
            className="tp-hero-mouse absolute left-1/2 top-1/2 w-[135vw] max-w-[980px] -translate-x-1/2 -translate-y-1/2 opacity-45 md:w-[72vw]"
            data-depth="0.6"
          >
            <Image
              src={SolarSystem}
              alt=""
              priority
              className="peta-spin peta-spin-slow h-auto w-full"
            />
          </div>
        </div>

        <div
          className="tp-hero-layer pointer-events-none absolute inset-0"
          data-shift="-12"
          aria-hidden
        >
          <div className="tp-hero-mouse absolute inset-0" data-depth="1">
            <Image
              src={Maskot}
              alt=""
              draggable={false}
              className="maskot-bob absolute bottom-[4%] left-[3%] h-[150px] w-auto sm:h-[220px] lg:left-[8%] lg:h-[320px]"
            />
            <Image
              src={MaskotCewe}
              alt=""
              draggable={false}
              className="maskot-bob-alt absolute bottom-[4%] right-[3%] h-[150px] w-auto sm:h-[220px] lg:right-[8%] lg:h-[320px]"
            />
          </div>
        </div>

        <div className="tp-hero-copy relative z-10 flex flex-col items-center px-4 pb-36 text-center md:pb-16">
          <p className="font-poppins text-xs font-semibold uppercase tracking-[0.35em] text-secondary-500 md:text-sm">
            Behind The Scenes · SOS 2026
          </p>
          <h1 className="tp-hero-title mt-5 font-upanddownnormal text-5xl leading-[1.05] text-putih sm:text-6xl md:text-8xl lg:text-[8.5vw]">
            The Crew Behind
            <br />
            The Symphony
          </h1>
          <p className="mt-6 max-w-xl font-poppins text-sm leading-relaxed text-putih/85 md:text-lg">
            Kenalan sama tim developer web yang merancang, membangun, dan
            menjaga website Synergy of Symphony 2026 tetap mengorbit.
          </p>
        </div>

        <p className="tp-hero-statement pointer-events-none absolute inset-0 z-10 flex flex-wrap content-center items-center justify-center gap-x-[0.3em] px-6 text-center font-upanddownnormal text-4xl leading-tight text-putih sm:text-5xl md:px-[12vw] md:text-7xl">
          {STATEMENT.split(" ").map((word, index) => (
            <span key={index} className="tp-hero-word inline-block">
              {word}
            </span>
          ))}
        </p>

        <div
          className="tp-hero-hint pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-poppins text-xs uppercase tracking-[0.3em] text-secondary-500"
          aria-hidden
        >
          <span>Scroll ke bawah</span>
          <span className="flex h-9 w-5 justify-center rounded-full border border-secondary-500/70 pt-1.5">
            <span className="tp-bob h-2 w-1 rounded-full bg-secondary-500" />
          </span>
        </div>
      </div>
    </section>
  );
};

export default TeamHero;
