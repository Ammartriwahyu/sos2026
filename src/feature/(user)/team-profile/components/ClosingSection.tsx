"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GroundDecoration from "@/assets/assetsos26/decorations/bg_bawah.svg";
import Maskot from "@/assets/assetsos26/illustrasions/maskot.svg";
import MaskotCewe from "@/assets/assetsos26/illustrasions/maskot_cewe.svg";
import {
  divisions,
  getDivisionAccentStyle,
  teamMembers,
  teamPhoto,
} from "../data/teamMembers";

const ORBIT_TURN = 240;
const CLOSING_TEXT = `Dari sketsa pertama sampai baris kode terakhir, website ini lahir dari kolaborasi ${teamMembers.length} orang yang percaya bahwa ospek yang berkesan dimulai dari pengalaman yang dibuat sepenuh hati. Selamat datang di Sistem Informasi, sampai jumpa di orbit berikutnya!`;

const accentByDivision = Object.fromEntries(
  divisions.map((division) => [division.id, getDivisionAccentStyle(division)]),
);

const ClosingSection = () => {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const track = root.querySelector<HTMLElement>(".tp-closing-track");
    const stage = root.querySelector<HTMLElement>(".tp-closing-stage");
    const frame = root.querySelector<HTMLElement>(".tp-closing-frame");
    const impact = root.querySelector<HTMLElement>(".tp-impact");
    const heading = root.querySelector<HTMLElement>(".tp-closing-heading");
    const orbiters = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll(".tp-orbiter"),
    );
    const arms = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll(".tp-orbiter-arm"),
    );
    const avatars = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll(".tp-avatar"),
    );
    const words = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll(".tp-closing-word"),
    );
    const ground = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll(".tp-closing-ground-item"),
    );

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduce) {
        gsap.set([frame, heading, ...words, ...ground], {
          opacity: 1,
          x: 0,
          y: 0,
        });
        return;
      }

      const baseAngle = (index: number) => (index * 360) / orbiters.length;

      gsap.set(orbiters, { rotation: baseAngle });
      gsap.set(avatars, {
        rotation: (index: number) => -baseAngle(index),
        xPercent: -50,
        yPercent: -50,
      });

      gsap.fromTo(
        stage,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: track,
            start: "top 85%",
            end: "top 10%",
            scrub: true,
          },
        },
      );

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: track,
          start: "top 60%",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      tl.fromTo(
        orbiters,
        { rotation: baseAngle },
        {
          rotation: (index: number) => baseAngle(index) + ORBIT_TURN,
          duration: 0.6,
        },
        0,
      )
        .fromTo(
          avatars,
          { rotation: (index: number) => -baseAngle(index) },
          {
            rotation: (index: number) => -baseAngle(index) - ORBIT_TURN,
            duration: 0.6,
          },
          0,
        )
        .fromTo(arms, { xPercent: 115 }, { xPercent: 78, duration: 0.4 }, 0)
        .to(
          arms,
          { xPercent: 0, duration: 0.18, stagger: 0.008, ease: "power3.in" },
          0.4,
        )
        .to(
          avatars,
          { scale: 0.2, opacity: 0, duration: 0.1, stagger: 0.008 },
          0.5,
        )
        .fromTo(
          frame,
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.14, ease: "back.out(1.6)" },
          0.52,
        )
        .fromTo(
          impact,
          { opacity: 0, scale: 0.6 },
          { opacity: 0.9, scale: 1.4, duration: 0.05 },
          0.6,
        )
        .to(impact, { opacity: 0, duration: 0.12 }, 0.65)
        .fromTo(
          heading,
          { opacity: 0, y: 40, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.1, ease: "back.out(1.6)" },
          0.64,
        )
        .fromTo(
          words,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.05, stagger: 0.006 },
          0.72,
        )
        .to({}, { duration: 0.01 }, 0.99);

      gsap.fromTo(
        ground,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ground[0],
            start: "top 98%",
            end: "top 55%",
            scrub: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="tp-closing relative overflow-x-clip">
      <div className="tp-closing-track relative h-[220vh]">
        <div className="tp-closing-sticky sticky top-0 flex h-screen flex-col items-center justify-center px-4">
          <div className="tp-closing-stage relative w-full max-w-[min(86vw,46rem)]">
            <div className="tp-impact" aria-hidden />

            <div className="tp-closing-frame relative rounded-3xl p-2 md:p-3">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                <Image
                  src={teamPhoto}
                  alt="Foto bersama tim developer web Synergy of Symphony 2026"
                  fill
                  sizes="(min-width: 1024px) 736px, 86vw"
                  className="object-cover object-[50%_70%]"
                />
              </div>
            </div>

            <div
              className="tp-closing-orbit pointer-events-none absolute left-1/2 top-1/2"
              aria-hidden
            >
              {teamMembers.map((member) => (
                <div key={member.id} className="tp-orbiter">
                  <div className="tp-orbiter-arm">
                    <div
                      className="tp-avatar"
                      style={accentByDivision[member.division]}
                    >
                      <Image
                        src={member.photo}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover object-[50%_35%]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h2 className="tp-closing-heading mt-8 text-center font-upanddownnormal text-4xl leading-tight text-putih md:mt-10 md:text-6xl">
            Made With Synergy
          </h2>
          <p className="mt-4 flex max-w-2xl flex-wrap justify-center gap-x-[0.3em] text-center font-poppins text-sm leading-relaxed text-putih/85 md:text-base">
            {CLOSING_TEXT.split(" ").map((word, index) => (
              <span key={index} className="tp-closing-word inline-block">
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="tp-closing-ground relative">
        <div className="relative z-10 flex items-end justify-center gap-10 px-4">
          <Image
            src={Maskot}
            alt=""
            aria-hidden
            draggable={false}
            className="tp-closing-ground-item h-[150px] w-auto md:h-[220px]"
          />
          <Image
            src={MaskotCewe}
            alt=""
            aria-hidden
            draggable={false}
            className="tp-closing-ground-item h-[150px] w-auto md:h-[220px]"
          />
        </div>
        <Image
          src={GroundDecoration}
          alt=""
          aria-hidden
          sizes="100vw"
          className="-mt-6 h-auto w-full select-none"
        />
        <p className="tp-closing-credit px-4 pb-10 pt-6 text-center font-poppins text-xs uppercase tracking-[0.3em] text-putih/70">
          Synergy of Symphony 2026 · Departemen Sistem Informasi
        </p>
      </div>
    </section>
  );
};

export default ClosingSection;
