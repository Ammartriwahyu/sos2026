import React from "react";
import StarDust from "./StarDust";
import { round, seeded } from "../data/motion";

const PARTICLE_COUNT = 12;

const AmbientLayer = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="tp-breath tp-breath-a" />
      <div className="tp-breath tp-breath-b" />
      <StarDust count={46} seed={11} />
      {Array.from({ length: PARTICLE_COUNT }, (_, index) => (
        <span
          key={index}
          className="tp-particle"
          style={
            {
              left: `${round(seeded(index, 31) * 100)}%`,
              "--tp-particle-size": `${round(3 + seeded(index, 32) * 4)}px`,
              "--tp-particle-dur": `${round(26 + seeded(index, 33) * 24)}s`,
              "--tp-particle-delay": `${round(seeded(index, 34) * -40)}s`,
            } as React.CSSProperties
          }
        />
      ))}
      <div className="tp-vignette" />
    </div>
  );
};

export default AmbientLayer;
