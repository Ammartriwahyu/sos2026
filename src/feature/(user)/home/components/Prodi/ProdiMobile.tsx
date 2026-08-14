"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import Image from "next/image";
import { useRef, useState } from "react";
import BookImg from "@/assets/home/buwku.webp";
import { prodiData } from "@/feature/(user)/akademik/data/prodiData";
import SpaceBackground from "@/shared/components/background/SpaceBackground";
import { cn } from "@/shared/utils/cn";
import SectionTitle from "../SectionTitle";
import ProdiCard from "./ProdiCard";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ProdiMobile({ className }: { className?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const cardOuterRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [cardOrder, setCardOrder] = useState([0, 1, 2]);
  const [dragX, setDragX] = useState(0);
  const startX = useRef<number | null>(null);

  useLenis(() => ScrollTrigger.update());

  useGSAP(
    () => {
      if (!wrapperRef.current || !bookRef.current || !titleRef.current) return;
      const vh = window.innerHeight;
      const dist = wrapperRef.current.getBoundingClientRect().height - vh;
      const dynamicDuration = dist > 0 ? (vh * 0.5) / dist : 0.3;

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
        { y: "-50vh", ease: "none", duration: dynamicDuration },
        0,
      );

      cardOuterRefs.current.forEach((card) => {
        if (!card) return;
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          x: "0%",
          y: 0,
          rotate: 0,
          scale: 0.1,
        });
        tl.to(
          card,
          {
            xPercent: -50,
            yPercent: -50,
            x: "0%",
            y: "-36vh",
            rotate: 0,
            scale: 1,
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

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    setDragX(e.clientX - startX.current);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    if (dragX > 50) {
      setCardOrder((p) => [p[2], p[0], p[1]]);
    } else if (dragX < -50) {
      setCardOrder((p) => [p[1], p[2], p[0]]);
    }

    startX.current = null;
    setDragX(0);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={wrapperRef}
      className={cn("relative z-0 mt-[-50vh] h-[300vh]", className)}
    >
      <section
        id="prodi-section-mobile"
        className="sticky top-0 z-0 w-full h-screen overflow-hidden"
      >
        <SpaceBackground className="w-full h-full flex flex-col items-center justify-end pb-4 relative overflow-hidden gap-4">
          <div className="absolute bottom-0 right-[-5%] pointer-events-none flex justify-center items-center z-0">
            <div className="size-50 rounded-full bg-radial from-[#7C3AED]/35 to-transparent blur-[70px] animate-pulse-glow"></div>
            <div className="size-42 absolute bottom-[-20%] right-[-30%] opacity-20 rounded-full border border-[#06B6D4] animate-spin-float" />
          </div>
          <SectionTitle
            ref={titleRef}
            className="flex justify-center items-center"
          >
            PROGRAM STUDI
          </SectionTitle>
          <div ref={bookRef} className="relative w-48 z-10">
            <Image
              src={BookImg}
              alt="Study Program Book"
              className="w-full h-auto object-contain select-none"
              priority
              draggable="false"
            />
            {prodiData.map((item, i) => {
              const stackIdx = cardOrder.indexOf(i);
              const isFront = stackIdx === 0;

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardOuterRefs.current[i] = el;
                  }}
                  className="absolute top-1/2 left-1/2"
                  style={{ zIndex: 30 - stackIdx * 10 }}
                >
                  <div
                    className={`origin-bottom ${isFront ? "cursor-grab active:cursor-grabbing" : ""}`}
                    style={{
                      transform: `translate(${isFront ? dragX : 0}px, ${stackIdx * -50}px) scale(${1 - stackIdx * 0.08})`,
                      opacity: 1 - stackIdx * 0.2,
                      transition:
                        startX.current !== null && isFront
                          ? "none"
                          : "transform 0.4s ease, opacity 0.4s ease",
                    }}
                    onPointerDown={isFront ? handlePointerDown : undefined}
                    onPointerMove={isFront ? handlePointerMove : undefined}
                    onPointerUp={isFront ? handlePointerUp : undefined}
                    onPointerCancel={isFront ? handlePointerUp : undefined}
                  >
                    <ProdiCard item={item} index={i} />
                  </div>
                </div>
              );
            })}
          </div>
        </SpaceBackground>
      </section>
    </div>
  );
}
