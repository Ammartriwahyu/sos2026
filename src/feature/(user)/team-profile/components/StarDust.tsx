import React from "react";
import { cn } from "@/shared/utils/cn";
import { round, seeded } from "../data/motion";

interface StarDustProps {
  count: number;
  seed: number;
  className?: string;
}

const StarDust = ({ count, seed, className }: StarDustProps) => {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden
    >
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className="tp-star"
          style={
            {
              top: `${round(seeded(index, seed) * 100)}%`,
              left: `${round(seeded(index, seed + 1) * 100)}%`,
              "--tp-star-size": `${round(1 + seeded(index, seed + 2) * 2.4)}px`,
              "--tp-star-dur": `${round(2.4 + seeded(index, seed + 3) * 3.6)}s`,
              "--tp-star-delay": `${round(seeded(index, seed + 4) * -6)}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};

export default StarDust;
