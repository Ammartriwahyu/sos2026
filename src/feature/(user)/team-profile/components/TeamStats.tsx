"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STATS_PIN_VH } from "../data/motion";
import {
  divisions,
  getDivisionAccentStyle,
  getMembersByDivision,
  teamMembers,
} from "../data/teamMembers";

const TOTAL_ACCENT_STYLE = {
  "--tp-accent": "var(--color-putih)",
  "--tp-accent-deep": "var(--color-accent-purple)",
  "--tp-accent-soft": "var(--color-putih)",
} as React.CSSProperties;

const stats = [
  {
    id: "total",
    value: teamMembers.length,
    label: "Anggota Tim",
    style: TOTAL_ACCENT_STYLE,
  },
  ...divisions.map((division) => ({
    id: division.id,
    value: getMembersByDivision(division.id).length,
    label: division.label,
    style: getDivisionAccentStyle(division),
  })),
];

const TeamStats = () => {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const heading = root.querySelector<HTMLElement>(".tp-stats-heading");
    const lead = root.querySelector<HTMLElement>(".tp-stats-lead");
    const cards = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll(".tp-stat"),
    );
    const orbits = gsap.utils.toArray<SVGCircleElement>(
      root.querySelectorAll(".tp-orbit-path"),
    );
    const spinners = gsap.utils.toArray<SVGGElement>(
      root.querySelectorAll(".tp-orbit-spin"),
    );
    const values = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll(".tp-stat-value"),
    );
    const showFinalValues = () => {
      values.forEach((value) => {
        value.textContent = value.dataset.value ?? "";
      });
    };

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduce) {
        gsap.set([heading, lead, ...cards], { opacity: 1, x: 0, y: 0 });
        return;
      }

      gsap.fromTo(
        heading,
        { opacity: 0, yPercent: 80, scale: 0.8 },
        {
          opacity: 1,
          yPercent: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
            end: "top 15%",
            scrub: true,
          },
        },
      );
      gsap.fromTo(
        lead,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 55%",
            end: "top top",
            scrub: true,
          },
        },
      );

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${(STATS_PIN_VH / 100) * window.innerHeight}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        cards,
        { opacity: 0, y: 70, scale: 0.7 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.22,
          stagger: 0.07,
          ease: "back.out(1.5)",
        },
        0.02,
      )
        .fromTo(
          orbits,
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 0.4,
            stagger: 0.07,
            ease: "power1.inOut",
          },
          0.1,
        )
        .fromTo(
          spinners,
          { rotation: -90, svgOrigin: "100 100" },
          { rotation: 270, duration: 0.95 },
          0,
        );

      values.forEach((value, index) => {
        const counter = { current: 0 };
        value.textContent = "0";

        tl.to(
          counter,
          {
            current: Number(value.dataset.value),
            duration: 0.42,
            ease: "power1.out",
            onUpdate: () => {
              value.textContent = String(Math.round(counter.current));
            },
          },
          0.14 + index * 0.07,
        );
      });

      tl.to({}, { duration: 0.01 }, 0.99);
    }, root);

    ScrollTrigger.sort();

    return () => {
      ctx.revert();
      showFinalValues();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="tp-stats relative flex min-h-screen flex-col items-center justify-center px-4 py-16"
    >
      <h2 className="tp-stats-heading text-center font-upanddownnormal text-5xl leading-tight text-putih md:text-7xl lg:text-8xl">
        Tim Dalam Angka
      </h2>
      <p className="tp-stats-lead mx-auto mt-5 max-w-2xl text-center font-poppins text-sm leading-relaxed text-putih/85 md:text-lg">
        Tiga divisi, satu orbit. Dari papan desain sampai server, semuanya
        dikerjakan bareng supaya maba Sistem Informasi 2026 dapat pengalaman
        terbaik.
      </p>

      <ul className="tp-stats-list mt-10 grid grid-cols-2 gap-5 md:mt-16 md:gap-10 lg:grid-cols-4">
        {stats.map((stat) => (
          <li
            key={stat.id}
            style={stat.style}
            className="tp-stat relative flex aspect-square w-[38vw] max-w-[230px] flex-col items-center justify-center gap-1 text-center"
          >
            <svg
              viewBox="0 0 200 200"
              className="tp-orbit pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden
            >
              <circle className="tp-orbit-track" cx="100" cy="100" r="92" />
              <g className="tp-orbit-spin">
                <circle
                  className="tp-orbit-path"
                  cx="100"
                  cy="100"
                  r="92"
                  pathLength={1}
                />
                <circle className="tp-orbit-planet" cx="100" cy="8" r="6" />
              </g>
            </svg>
            <span
              className="tp-stat-value font-upanddownnormal text-6xl leading-none md:text-7xl"
              data-value={stat.value}
            >
              {stat.value}
            </span>
            <span className="max-w-[70%] font-poppins text-xs font-medium text-putih/90 md:text-sm">
              {stat.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TeamStats;
