import React from "react";

type Wave = {
  d: string;
  opacity: number;
  duration: string;
};

const WAVES: Wave[] = [
  {
    d: "M0,180 C120,135 240,135 360,180 C480,225 600,225 720,180 C840,135 960,135 1080,180 C1200,225 1320,225 1440,180 L1440,900 L0,900 Z",
    opacity: 0.03,
    duration: "24s",
  },
  {
    d: "M0,430 C120,370 240,370 360,430 C480,490 600,490 720,430 C840,370 960,370 1080,430 C1200,490 1320,490 1440,430 L1440,900 L0,900 Z",
    opacity: 0.045,
    duration: "30s",
  },
  {
    d: "M0,650 C120,608 240,608 360,650 C480,692 600,692 720,650 C840,608 960,608 1080,650 C1200,692 1320,692 1440,650 L1440,900 L0,900 Z",
    opacity: 0.06,
    duration: "19s",
  },
];

const SpaceWaves = () => {
  return (
    <>
      {WAVES.map((wave, i) => (
        <div
          key={i}
          className="nf404-wave-row"
          style={{ animationDuration: wave.duration }}
          aria-hidden
        >
          {[0, 1].map((copy) => (
            <svg
              key={copy}
              className="nf404-wave-svg"
              viewBox="0 0 1440 900"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d={wave.d} fill="#ffffff" opacity={wave.opacity} />
            </svg>
          ))}
        </div>
      ))}
    </>
  );
};

export default SpaceWaves;
