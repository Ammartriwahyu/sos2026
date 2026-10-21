"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MemberCard from "./MemberCard";
import {
  MEMBER_BEAT_VH,
  MEMBER_EXIT_TAIL,
  ROLE_INTRO_VH,
} from "../data/motion";
import { getDivisionAccentStyle } from "../data/teamMembers";
import { useMediaQuery } from "../hooks/useMediaQuery";
import type { DivisionMeta, TeamMember } from "../types";

interface DivisionSectionProps {
  meta: DivisionMeta;
  members: TeamMember[];
  order: number;
  total: number;
}

const WIDE_QUERY = "(min-width: 768px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const LIVE_CLASS = "tp-division-live";
const CARD_SPIN = 220;
const CARD_TRAVEL_PERCENT = 95;

const formatOrder = (value: number) => String(value).padStart(2, "0");

const DivisionSection = ({
  meta,
  members,
  order,
  total,
}: DivisionSectionProps) => {
  const rootRef = useRef<HTMLElement>(null);
  const isWide = useMediaQuery(WIDE_QUERY, true);
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const memberCount = members.length;

  useEffect(() => {
    const root = rootRef.current;
    const pin = root?.querySelector<HTMLElement>(".tp-division-pin");
    if (!root || !pin) return;

    gsap.registerPlugin(ScrollTrigger);

    const pick = (selector: string) =>
      root.querySelector<HTMLElement>(selector);
    const pickAll = (selector: string) =>
      gsap.utils.toArray<HTMLElement>(root.querySelectorAll(selector));

    const ambient = pick(".tp-ambient");
    const orderMark = pick(".tp-division-order");
    const orderText = pick(".tp-division-order-text");
    const roleTrack = pick(".tp-role-track");
    const roleInner = pick(".tp-role-inner");
    const roleGlow = pick(".tp-role-glow");
    const eyebrow = pick(".tp-role-eyebrow");
    const roleChars = pickAll(".tp-role-char");
    const roleLine = pick(".tp-role-line");
    const tagline = pick(".tp-role-tagline");
    const description = pick(".tp-role-desc");
    const descriptionWords = pickAll(".tp-role-word");
    const memberItems = pickAll(".tp-member");

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(REDUCED_MOTION_QUERY).matches;

      if (reduce) {
        gsap.set([roleInner, ...memberItems], { opacity: 1, x: 0, y: 0 });
        return;
      }

      root.classList.add(LIVE_CLASS);

      const roleSpan = ROLE_INTRO_VH / 100;
      const beat = MEMBER_BEAT_VH / 100;
      const totalSpan =
        roleSpan + (memberItems.length + MEMBER_EXIT_TAIL) * beat;
      const inRole = (fraction: number) => fraction * roleSpan;
      const inBeat = (fraction: number) => fraction * beat;

      gsap.fromTo(
        orderMark,
        { y: 140, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        },
      );

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${totalSpan * window.innerHeight}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        ambient,
        { xPercent: -16, scale: 0.9 },
        { xPercent: 16, scale: 1.2, duration: totalSpan },
        0,
      )
        .fromTo(
          orderText,
          { yPercent: 12, scale: 1, opacity: 1 },
          { yPercent: -14, scale: 1.12, duration: inRole(0.74) },
          0,
        )
        .fromTo(
          roleGlow,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1.25, duration: inRole(0.6) },
          0,
        )
        .fromTo(
          eyebrow,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: inRole(0.12), ease: "power2.out" },
          inRole(0.02),
        )
        .fromTo(
          roleChars,
          { yPercent: 125, rotation: 9 },
          {
            yPercent: 0,
            rotation: 0,
            duration: inRole(0.22),
            stagger: inRole(0.012),
            ease: "power3.out",
          },
          inRole(0.05),
        )
        .fromTo(
          roleLine,
          { scaleX: 0 },
          { scaleX: 1, duration: inRole(0.24), ease: "power2.inOut" },
          inRole(0.2),
        )
        .fromTo(
          tagline,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: inRole(0.12), ease: "power2.out" },
          inRole(0.32),
        )
        .fromTo(
          descriptionWords,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: inRole(0.08),
            stagger: inRole(0.006),
            ease: "power2.out",
          },
          inRole(0.38),
        )
        .to(
          [eyebrow, roleLine, tagline, description],
          {
            opacity: 0,
            y: -24,
            duration: inRole(0.12),
            stagger: inRole(0.015),
            ease: "power1.inOut",
          },
          inRole(0.72),
        )
        .to(
          [orderText, roleGlow],
          { opacity: 0, duration: inRole(0.2), ease: "power1.inOut" },
          inRole(0.76),
        )
        .to(
          roleTrack,
          { yPercent: -41, duration: inRole(0.24), ease: "power2.inOut" },
          inRole(0.76),
        )
        .to(
          roleInner,
          {
            scale: isWide ? 0.36 : 0.58,
            duration: inRole(0.24),
            ease: "power2.inOut",
          },
          inRole(0.76),
        );

      memberItems.forEach((item, index) => {
        const at = roleSpan + index * beat;
        const inner = item.querySelector(".tp-member-inner");
        const slot = item.querySelector(".tp-card-slot");
        const identity = item.querySelector(".tp-identity");
        const identityItems = item.querySelectorAll(".tp-identity-item");
        const nameWords = item.querySelectorAll(".tp-identity-word");

        tl.fromTo(
          item,
          { xPercent: -CARD_TRAVEL_PERCENT },
          { xPercent: 0, duration: inBeat(0.36), ease: "power2.out" },
          at,
        )
          .fromTo(
            slot,
            {
              rotationY: -CARD_SPIN,
              rotationZ: -10,
              scale: 0.55,
              transformPerspective: 1400,
            },
            {
              rotationY: 0,
              rotationZ: 0,
              scale: 1,
              duration: inBeat(0.36),
              ease: "power2.out",
            },
            at,
          )
          .fromTo(
            slot,
            { opacity: 0 },
            { opacity: 1, duration: inBeat(0.06) },
            at,
          )
          .fromTo(
            inner,
            { "--tp-shift": 1 },
            { "--tp-shift": 0, duration: inBeat(0.14), ease: "power2.inOut" },
            at + inBeat(0.34),
          )
          .fromTo(
            slot,
            { "--tp-lit": 0 },
            { "--tp-lit": 1, duration: inBeat(0.14), ease: "power2.out" },
            at + inBeat(0.36),
          )
          .to(
            slot,
            { "--tp-lit": 0, duration: inBeat(0.12), ease: "power1.inOut" },
            at + inBeat(0.76),
          )
          .set(identity, { opacity: 1 }, at + inBeat(0.36))
          .fromTo(
            identityItems,
            { opacity: 0, y: 26 },
            {
              opacity: 1,
              y: 0,
              duration: inBeat(0.1),
              stagger: inBeat(0.035),
              ease: "power2.out",
            },
            at + inBeat(0.37),
          )
          .fromTo(
            nameWords,
            { opacity: 0, yPercent: 90 },
            {
              opacity: 1,
              yPercent: 0,
              duration: inBeat(0.12),
              stagger: inBeat(0.03),
              ease: "power3.out",
            },
            at + inBeat(0.4),
          )
          .to(
            identity,
            {
              opacity: 0,
              y: -32,
              duration: inBeat(0.12),
              ease: "power1.inOut",
            },
            at + inBeat(0.76),
          )
          .to(
            inner,
            { "--tp-shift": 1, duration: inBeat(0.12), ease: "power2.inOut" },
            at + inBeat(0.78),
          )
          .to(
            item,
            {
              xPercent: CARD_TRAVEL_PERCENT,
              duration: inBeat(0.34),
              ease: "power2.in",
            },
            at + inBeat(0.88),
          )
          .to(
            slot,
            {
              rotationY: CARD_SPIN,
              rotationZ: 10,
              scale: 0.55,
              duration: inBeat(0.34),
              ease: "power2.in",
            },
            at + inBeat(0.88),
          )
          .to(slot, { opacity: 0, duration: inBeat(0.05) }, at + inBeat(1.17));
      });

      tl.to({}, { duration: 0.01 }, totalSpan - 0.01);
    }, root);

    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      root.classList.remove(LIVE_CLASS);
    };
  }, [isWide, prefersReducedMotion, memberCount]);

  return (
    <section
      ref={rootRef}
      id={`divisi-${meta.id}`}
      data-division={meta.id}
      aria-labelledby={`judul-divisi-${meta.id}`}
      style={getDivisionAccentStyle(meta)}
      className="tp-division relative"
    >
      <div className="tp-division-pin">
        <div className="tp-ambient" aria-hidden />
        <span className="tp-division-order" aria-hidden>
          <span className="tp-division-order-text">{formatOrder(order)}</span>
        </span>

        <header className="tp-role">
          <div className="tp-role-track">
            <div className="tp-role-inner">
              <div className="tp-role-glow" aria-hidden />
              <p className="tp-role-eyebrow font-poppins text-xs font-semibold uppercase tracking-[0.4em] text-putih/80 md:text-base">
                Divisi {formatOrder(order)} / {formatOrder(total)}
              </p>
              <h2
                id={`judul-divisi-${meta.id}`}
                aria-label={meta.label}
                className="tp-role-title mt-4 flex flex-wrap justify-center gap-x-[0.28em] font-upanddownnormal"
              >
                {meta.label.split(" ").map((word, wordIndex) => (
                  <span key={wordIndex} className="tp-role-mask" aria-hidden>
                    {word.split("").map((char, charIndex) => (
                      <span key={charIndex} className="tp-role-char">
                        {char}
                      </span>
                    ))}
                  </span>
                ))}
              </h2>
              <span className="tp-role-line" aria-hidden />
              <p className="tp-role-tagline font-poppins text-sm font-semibold uppercase tracking-[0.3em] md:text-xl">
                {meta.tagline}
              </p>
              <p className="tp-role-desc mx-auto mt-5 flex max-w-2xl flex-wrap justify-center gap-x-[0.3em] font-poppins text-sm leading-relaxed text-putih/85 md:text-lg">
                {meta.description.split(" ").map((word, index) => (
                  <span key={index} className="tp-role-word">
                    {word}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </header>

        <ul className="tp-members">
          {members.map((member, index) => (
            <li key={member.id} className="tp-member">
              <div className="tp-member-inner">
                <MemberCard member={member} divisionLabel={meta.label} />
                <div className="tp-identity">
                  <p className="tp-identity-item tp-identity-meta font-poppins text-xs font-semibold uppercase tracking-[0.3em] md:text-sm">
                    {formatOrder(index + 1)} / {formatOrder(memberCount)}
                  </p>
                  <p className="tp-identity-name font-upanddownnormal">
                    {member.fullName.split(" ").map((word, wordIndex) => (
                      <span key={wordIndex} className="tp-identity-mask">
                        <span className="tp-identity-word">{word}</span>
                      </span>
                    ))}
                  </p>
                  <span className="tp-identity-item tp-identity-rule" />
                  <p className="tp-identity-item tp-identity-role font-poppins text-sm font-semibold uppercase tracking-[0.2em] md:text-lg">
                    {meta.label}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default DivisionSection;
