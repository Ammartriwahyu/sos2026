"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTOPLAY_MS = 3500;

const FlashbackCarousel = ({ photos }: { photos: StaticImageData[] }) => {
  const n = photos.length;
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragXRef = useRef<number | null>(null);

  const go = useCallback(
    (dir: number) => setCurrent((c) => (c + dir + n) % n),
    [n],
  );

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setCurrent((c) => (c + 1) % n),
      AUTOPLAY_MS,
    );
  }, [n]);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;
    startAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoplay]);

  // navigasi manual → reset timer autoplay
  const navigate = (dir: number) => {
    go(dir);
    startAutoplay();
  };

  const getCardStyle = (i: number): React.CSSProperties => {
    let pos = (i - current) % n;
    if (pos > n / 2) pos -= n;
    if (pos < -n / 2) pos += n;
    const abs = Math.abs(pos);
    const sign = Math.sign(pos);

    if (abs === 0) {
      return { transform: "translateX(0) scale(1)", opacity: 1, zIndex: 30 };
    }
    if (abs === 1) {
      return {
        transform: `translateX(${sign * 62}%) scale(0.86)`,
        opacity: 0.72,
        zIndex: 20,
      };
    }
    if (abs === 2) {
      return {
        transform: `translateX(${sign * 118}%) scale(0.7)`,
        opacity: 0,
        zIndex: 10,
      };
    }
    return {
      transform: `translateX(${sign * 120}%) scale(0.5)`,
      opacity: 0,
      zIndex: 0,
    };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragXRef.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragXRef.current === null) return;
    const dx = e.clientX - dragXRef.current;
    dragXRef.current = null;
    if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1);
  };

  return (
    <div className="relative mx-auto w-full max-w-6xl px-12 sm:px-16">
      <div
        className="relative h-[210px] touch-pan-y select-none sm:h-[290px] md:h-[350px] lg:h-[400px]"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        role="group"
        aria-roledescription="carousel"
        aria-label="Kilas Dibalik SOS"
      >
        {photos.map((photo, i) => (
          <div
            key={i}
            className="peta-card absolute top-1/2 left-1/2 aspect-[3/2] w-[70%] -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out sm:w-[56%] md:w-[50%] lg:w-[46%]"
            style={getCardStyle(i)}
            aria-hidden={i !== current}
          >
            <Image
              src={photo}
              alt={`Kilas Dibalik SOS ${i + 1}`}
              fill
              sizes="(max-width: 768px) 62vw, 480px"
              className="object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="Sebelumnya"
        className="absolute top-1/2 left-0 z-40 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-putih backdrop-blur-sm transition hover:bg-white/20 sm:h-12 sm:w-12"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={() => navigate(1)}
        aria-label="Berikutnya"
        className="absolute top-1/2 right-0 z-40 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-putih backdrop-blur-sm transition hover:bg-white/20 sm:h-12 sm:w-12"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};

export default FlashbackCarousel;
