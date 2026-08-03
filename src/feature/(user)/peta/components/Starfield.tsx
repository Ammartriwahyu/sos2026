import React from "react";
import Image from "next/image";
import Star from "@/assets/assetsos26/shared/star.svg";

interface StarConfig {
  top: string;
  left: string;
  size: number;
  floatDur: number;
  twDur: number;
  delay: number;
}

// Posisi ditetapkan manual (bukan random) agar tidak terjadi hydration mismatch
// dan tetap konsisten antar-render.
const STARS: StarConfig[] = [
  { top: "8%", left: "6%", size: 16, floatDur: 6.5, twDur: 3.2, delay: 0 },
  { top: "14%", left: "88%", size: 12, floatDur: 5.5, twDur: 3.8, delay: 0.6 },
  { top: "20%", left: "46%", size: 10, floatDur: 7, twDur: 2.8, delay: 1.1 },
  { top: "30%", left: "18%", size: 22, floatDur: 6, twDur: 4.2, delay: 0.3 },
  { top: "33%", left: "72%", size: 14, floatDur: 5.8, twDur: 3.5, delay: 1.4 },
  { top: "44%", left: "4%", size: 18, floatDur: 7.2, twDur: 3, delay: 0.9 },
  { top: "48%", left: "94%", size: 12, floatDur: 6.4, twDur: 4, delay: 0.2 },
  { top: "56%", left: "60%", size: 10, floatDur: 5.6, twDur: 2.6, delay: 1.7 },
  { top: "62%", left: "30%", size: 16, floatDur: 6.8, twDur: 3.6, delay: 0.5 },
  { top: "70%", left: "84%", size: 20, floatDur: 6.2, twDur: 4.4, delay: 1.2 },
  { top: "74%", left: "12%", size: 12, floatDur: 5.4, twDur: 3.1, delay: 0.8 },
  { top: "82%", left: "50%", size: 14, floatDur: 7.4, twDur: 2.9, delay: 1.5 },
  { top: "88%", left: "76%", size: 10, floatDur: 6.1, twDur: 3.7, delay: 0.4 },
  { top: "90%", left: "26%", size: 16, floatDur: 5.9, twDur: 4.1, delay: 1.0 },
];

const Starfield = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      {STARS.map((s, i) => (
        <span
          key={i}
          className="peta-star"
          style={
            {
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              "--peta-float-dur": `${s.floatDur}s`,
              "--peta-tw-dur": `${s.twDur}s`,
              "--peta-delay": `${s.delay}s`,
            } as React.CSSProperties
          }
        >
          <Image src={Star} alt="" width={s.size} height={s.size} />
        </span>
      ))}
    </div>
  );
};

export default Starfield;
