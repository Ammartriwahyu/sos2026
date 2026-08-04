import React from "react";

const GLOW_ELEMENTS = [
  {
    position: "top-76 -left-30",
    size: "w-[230px] h-[230px]",
    color: "var(--color-primary-dark)",
    opacity: "0.7",
  },
  {
    position: "top-0 -right-70",
    size: "w-[345px] h-[345px]",
    color: "var(--color-blue-normal)",
    opacity: "0.5",
  },
];

const BackgroundGlow = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0">
        {GLOW_ELEMENTS.map((g, i) => (
          <div
            key={i}
            className={`absolute ${g.position} ${g.size} rounded-full filter blur-[60px]`}
            style={{
              backgroundColor: g.color,
              opacity: g.opacity,
            }}
          />
        ))}
      </div>

      <div className="absolute top-92 -left-17 w-[135px] h-[135px] rounded-full border border-dashed border-purple-300/30 animate-spin-slow" />
      <div className="absolute top-15 -right-50 w-[240px] h-[240px] rounded-full border border-dashed border-indigo-200/25" />
    </div>
  );
};

export default BackgroundGlow;
