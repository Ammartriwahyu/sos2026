import React from "react";
import { cn } from "@/shared/utils/cn";

type Ribbon = {
  top: string;
  height: number;
  d: string;
  opacity: number;
  duration: string;
  bobDuration: string;
  blur: number;
  reverse?: boolean;
};

// Pita aurora yang undulasi horizontal (bukan ombak yang menumpuk di bawah).
const BAND_A =
  "M0,120 C240,50 480,190 720,120 C960,50 1200,190 1440,120 L1440,210 C1200,280 960,140 720,210 C480,280 240,140 0,210 Z";
const BAND_B =
  "M0,150 C300,70 520,230 720,150 C920,70 1140,230 1440,150 L1440,240 C1140,300 920,170 720,240 C520,300 300,170 0,240 Z";

// Warna --color-bg-secondary (#ECE5DB) yang ditransparankan.
const RIBBONS: Ribbon[] = [
  {
    top: "8%",
    height: 240,
    d: BAND_A,
    opacity: 0.07,
    duration: "18s",
    bobDuration: "7s",
    blur: 14,
  },
  {
    top: "34%",
    height: 280,
    d: BAND_B,
    opacity: 0.055,
    duration: "24s",
    bobDuration: "9s",
    blur: 20,
    reverse: true,
  },
  {
    top: "56%",
    height: 250,
    d: BAND_A,
    opacity: 0.05,
    duration: "21s",
    bobDuration: "8s",
    blur: 16,
  },
];

const AuroraWaves = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {RIBBONS.map((r, i) => (
        <div
          key={i}
          className={cn("peta-aurora", r.reverse && "peta-aurora-rev")}
          style={{
            top: r.top,
            height: r.height,
            animationDuration: r.duration,
            filter: `blur(${r.blur}px)`,
          }}
        >
          {[0, 1].map((copy) => (
            <svg
              key={copy}
              className="peta-aurora-svg"
              viewBox="0 0 1440 300"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ "--peta-bob-dur": r.bobDuration } as React.CSSProperties}
            >
              <path
                d={r.d}
                fill="var(--color-bg-secondary)"
                opacity={r.opacity}
              />
            </svg>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AuroraWaves;
