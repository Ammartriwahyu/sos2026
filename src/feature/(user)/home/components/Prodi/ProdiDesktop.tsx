"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import Image from "next/image";
import { useRef } from "react";
import BookImg from "@/assets/home/buwku.webp";
import { prodiData } from "@/feature/(user)/akademik/data/prodiData";
import SpaceBackground from "@/shared/components/background/SpaceBackground";
import { cn } from "@/shared/utils/cn";
import SectionTitle from "../SectionTitle";
import ProdiCard from "./ProdiCard";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ProdiDesktop({ className }: { className?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLenis(() => ScrollTrigger.update());

  useGSAP(
    () => {
      if (!wrapperRef.current || !bookRef.current || !titleRef.current) return;
      const vh = window.innerHeight;
      const dist = wrapperRef.current.getBoundingClientRect().height - vh;
      const dynamicDuration = dist > 0 ? (vh * 0.4) / dist : 0.3;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        titleRef.current,
        { y: "-45vh", ease: "none", duration: dynamicDuration },
        0,
      );

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const f = i - 1;
        gsap.set(card, {
          xPercent: -50 + f * 10,
          x: 0,
          y: 0,
          rotate: f * 14,
          scale: 0.1,
        });
        tl.to(
          card,
          {
            xPercent: -50,
            x: `${f * 25}vw`,
            y: "-40vh",
            rotate: 0,
            scale: 0.92,
            ease: "none",
            duration: dynamicDuration,
          },
          0,
        );
      });

      tl.to({}, { duration: Math.max(0.1, 1 - dynamicDuration) });
    },
    { scope: wrapperRef },
  );

  return (
    <div
      ref={wrapperRef}
      className={cn("relative z-0 mt-[-50vh] h-[300vh]", className)}
    >
      <section
        id="prodi-section-desktop"
        className="sticky top-0 z-0 w-full h-screen overflow-hidden"
      >
        <SpaceBackground
          fullPage={false}
          className="w-full h-full flex flex-col items-center justify-end  relative overflow-hidden gap-8"
        >
          <div className="absolute bottom-0 right-[-5%] pointer-events-none flex justify-center items-center z-0">
            <div className="size-100 rounded-full bg-radial from-[#7C3AED]/35 to-transparent blur-[70px] animate-pulse-glow"></div>
            <div className="size-72 absolute bottom-[-20%] right-[-30%] opacity-20 rounded-full border border-[#06B6D4] animate-spin-float" />
          </div>
          <SectionTitle
            ref={titleRef}
            className="flex justify-center items-center"
          >
            PROGRAM STUDI
          </SectionTitle>
          <div ref={bookRef} className="relative w-64 z-10">
            <Image
              src={BookImg}
              alt="Study Program Book"
              className="w-full h-auto object-contain select-none"
              priority
              draggable="false"
            />
            {prodiData.map((item, i) => (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ zIndex: [10, 12, 11][i] }}
              >
                <ProdiCard item={item} index={i} />
              </div>
            ))}
          </div>
        </SpaceBackground>
      </section>
    </div>
  );
}
