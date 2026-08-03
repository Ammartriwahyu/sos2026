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

const BAND_A =
  "M0,110 C220,10 460,210 720,110 C980,10 1220,210 1440,110 L1440,205 C1220,300 980,110 720,205 C460,300 220,110 0,205 Z";
const BAND_B =
  "M0,145 C260,25 500,255 720,145 C940,25 1180,255 1440,145 L1440,235 C1180,300 940,130 720,235 C500,300 260,130 0,235 Z";

const RIBBONS: Ribbon[] = [
  {
    top: "6%",
    height: 260,
    d: BAND_A,
    opacity: 0.09,
    duration: "13s",
    bobDuration: "5s",
    blur: 12,
  },
  {
    top: "32%",
    height: 300,
    d: BAND_B,
    opacity: 0.07,
    duration: "17s",
    bobDuration: "6s",
    blur: 18,
    reverse: true,
  },
  {
    top: "54%",
    height: 270,
    d: BAND_A,
    opacity: 0.06,
    duration: "15s",
    bobDuration: "5.5s",
    blur: 14,
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
