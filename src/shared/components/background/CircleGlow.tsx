import React from "react";

type ClassPositioned = {
  position: string;
  size: string;
  color?: string;
  opacity?: string;
  border?: string;
  animate?: string;
};

type PixelPositioned = {
  position?: never;
  top: string;
  left?: string;
  right?: string;
  size: string;
  color?: string;
  opacity?: string;
  border?: string;
  animate?: string;
};

type GlowItem = ClassPositioned | PixelPositioned;
type CircleItem = ClassPositioned | PixelPositioned;

type BackgroundGroup = {
  glows: GlowItem[];
  circles: CircleItem[];
};

// Mengatur posisi grup dengan jarak (gap) yang lebih renggang ke bawah
const BACKGROUND_GROUPS: BackgroundGroup[] = [
  // --- GRUP 1 ---
  {
    glows: [
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
    ],
    circles: [
      {
        position: "top-92 -left-17",
        size: "w-[135px] h-[135px]",
        border: "border-purple-300/30",
        animate: "animate-spin-slow",
      },
      {
        position: "top-15 -right-50",
        size: "w-[240px] h-[240px]",
        border: "border-indigo-200/25",
        animate: "",
      },
    ],
  },
  // --- GRUP 2 ---
  {
    glows: [
      {
        top: "1200px",
        left: "-30px",
        size: "w-[230px] h-[230px]",
        color: "var(--color-primary-dark)",
        opacity: "0.7",
      },
      {
        top: "1100px",
        right: "-70px",
        size: "w-[345px] h-[345px]",
        color: "var(--color-blue-normal)",
        opacity: "0.5",
      },
    ],
    circles: [
      {
        top: "1350px",
        left: "-17px",
        size: "w-[135px] h-[135px]",
        border: "border-purple-300/30",
        animate: "animate-spin-slow",
      },
      {
        top: "1150px",
        right: "-50px",
        size: "w-[240px] h-[240px]",
        border: "border-indigo-200/25",
        animate: "",
      },
    ],
  },
  // --- GRUP 3 ---
  {
    glows: [
      {
        top: "2400px",
        left: "-30px",
        size: "w-[230px] h-[230px]",
        color: "var(--color-primary-dark)",
        opacity: "0.7",
      },
      {
        top: "2300px",
        right: "-70px",
        size: "w-[345px] h-[345px]",
        color: "var(--color-blue-normal)",
        opacity: "0.5",
      },
    ],
    circles: [
      {
        top: "2550px",
        left: "-17px",
        size: "w-[135px] h-[135px]",
        border: "border-purple-300/30",
        animate: "animate-spin-slow",
      },
      {
        top: "2350px",
        right: "-50px",
        size: "w-[240px] h-[240px]",
        border: "border-indigo-200/25",
        animate: "",
      },
    ],
  },
];

const BackgroundGlow = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden h-full min-h-full"
      aria-hidden
    >
      {BACKGROUND_GROUPS.map((group, groupIndex) => (
        <React.Fragment key={groupIndex}>
          <div className="absolute inset-0 w-full h-full">
            {group.glows.map((g, i) => {
              const positionStyle =
                "top" in g
                  ? {
                      top: g.top,
                      ...(g.left ? { left: g.left } : {}),
                      ...(g.right ? { right: g.right } : {}),
                    }
                  : {};
              const positionClass = "position" in g ? g.position : "";

              return (
                <div
                  key={`glow-${groupIndex}-${i}`}
                  className={`absolute ${positionClass} ${g.size} rounded-full filter blur-[60px]`}
                  style={{
                    backgroundColor: g.color,
                    opacity: g.opacity,
                    ...positionStyle,
                  }}
                />
              );
            })}
          </div>

          {group.circles.map((d, i) => {
            const positionStyle =
              "top" in d
                ? {
                    top: d.top,
                    ...(d.left ? { left: d.left } : {}),
                    ...(d.right ? { right: d.right } : {}),
                  }
                : {};
            const positionClass = "position" in d ? d.position : "";

            return (
              <div
                key={`circle-${groupIndex}-${i}`}
                className={`absolute ${positionClass} ${d.size} rounded-full border border-dashed ${d.border} ${d.animate}`}
                style={{ ...positionStyle }}
              />
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BackgroundGlow;
