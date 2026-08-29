"use client";

import React, { useCallback, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";

interface PhotoStackProps {
  photos: [StaticImageData, StaticImageData];
  alt?: string;
}

type Slot = { xPercent: number; yPercent: number; rotate: number; z: number };

const FRONT: Slot = { xPercent: 0, yPercent: 0, rotate: -5, z: 20 };
const BACK: Slot = { xPercent: 24, yPercent: 28, rotate: 8, z: 10 };

const PhotoStack = ({ photos, alt = "Dokumentasi" }: PhotoStackProps) => {
  const cardsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const topRef = useRef(0);
  const animatingRef = useRef(false);

  const layout = useCallback((animate: boolean) => {
    cardsRef.current.forEach((el, i) => {
      if (!el) return;
      const s = i === topRef.current ? FRONT : BACK;
      const vars = {
        xPercent: s.xPercent,
        yPercent: s.yPercent,
        rotation: s.rotate,
        zIndex: s.z,
        scale: 1,
      };
      if (animate) {
        gsap.to(el, { ...vars, duration: 0.42, ease: "power3.out" });
      } else {
        gsap.set(el, vars);
      }
    });
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      cardsRef.current.forEach((el, i) => {
        if (el) gsap.set(el, { ...(i === 0 ? FRONT : BACK) });
      });
    }
    layout(false);
  }, [layout]);

  const shuffle = (clicked: number) => {
    if (animatingRef.current) return;
    const n = cardsRef.current.length;
    const newTop =
      clicked === topRef.current ? (topRef.current + 1) % n : clicked;
    const rising = cardsRef.current[newTop];
    if (!rising) return;
    animatingRef.current = true;

    gsap
      .timeline({
        onComplete: () => {
          animatingRef.current = false;
        },
      })
      .set(rising, { zIndex: 30 })
      .to(rising, {
        yPercent: BACK.yPercent - 26,
        scale: 1.06,
        duration: 0.22,
        ease: "power2.out",
      })
      .add(() => {
        topRef.current = newTop;
      })
      .to(
        cardsRef.current,
        {
          xPercent: (idx: number) =>
            idx === topRef.current ? FRONT.xPercent : BACK.xPercent,
          yPercent: (idx: number) =>
            idx === topRef.current ? FRONT.yPercent : BACK.yPercent,
          rotation: (idx: number) =>
            idx === topRef.current ? FRONT.rotate : BACK.rotate,
          zIndex: (idx: number) => (idx === topRef.current ? FRONT.z : BACK.z),
          scale: 1,
          duration: 0.4,
          ease: "power3.out",
        },
        ">-0.02",
      );
  };

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[540px]">
      {photos.map((photo, i) => (
        <button
          key={i}
          type="button"
          ref={(el) => {
            cardsRef.current[i] = el;
          }}
          onClick={() => shuffle(i)}
          aria-label={`${alt} ${i + 1} — klik untuk menukar tumpukan foto`}
          className="peta-card absolute top-0 left-0 aspect-[3/2] w-[80%] cursor-pointer border-[6px] md:border-[8px] border-putih/15 bg-clip-padding focus:outline-none focus-visible:ring-2 focus-visible:ring-putih/70"
        >
          <Image
            src={photo}
            alt={`${alt} ${i + 1}`}
            fill
            sizes="(max-width: 768px) 80vw, 340px"
            className="object-cover"
            draggable={false}
          />
        </button>
      ))}
    </div>
  );
};

export default PhotoStack;
