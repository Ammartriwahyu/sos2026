"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { Children, useState } from "react";

export const MemoriCarousel = ({ children }: { children: React.ReactNode }) => {
  const items = Children.toArray(children);
  const len = items.length;
  const [idx, setIdx] = useState(len);
  const [anim, setAnim] = useState(true);
  const [dir, setDir] = useState(0);

  const shift = (d: number) => {
    if (dir) return; // Prevent spam clicking
    setAnim(true);
    setDir(d);
    setIdx((p) => p + d);
    setTimeout(() => setDir(0), 500);
  };

  return (
    <div className="flex items-center justify-center gap-2 md:gap-8 w-full max-w-7xl mx-auto">
      <button
        type="button"
        onClick={() => shift(-1)}
        className="text-white hover:text-white/80 hover:scale-110 z-10 shrink-0 cursor-pointer transition-transform duration-200"
      >
        <ChevronLeft size={48} />
      </button>

      <div
        className="relative transition-all duration-300 max-md:[--c:1] md:[--c:2] lg:[--c:3] [--w:240px] [--g:64px]"
        style={{
          width: "calc(var(--w) * var(--c) + var(--g) * (var(--c) - 1))",
        }}
      >
        <div
          data-dir={dir}
          onTransitionEnd={() => {
            if (idx <= 0 || idx >= len * 2) {
              setAnim(false);
              setIdx(len);
            }
          }}
          className={`track flex items-start gap-16 ${anim ? "transition-transform duration-500 ease-in-out" : ""}`}
          style={{
            transform: `translateX(calc(${idx} * -1 * (var(--w) + var(--g))))`,
          }}
        >
          {[...items, ...items, ...items].map((item, i) => {
            const el = item as React.ReactElement<{
              className?: string;
              style?: React.CSSProperties;
            }>;
            return React.cloneElement(el, {
              key: `${el.key || "c"}-${i}`,
              "data-dist": i - idx,
              className: `${el.props.className || ""} card`,
              style: {
                ...(el.props.style || {}),
                "--anim-delay": `${(i * 0.7) % 7}s`,
              } as React.CSSProperties,
            } as React.HTMLAttributes<HTMLElement>);
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={() => shift(1)}
        className="text-white hover:text-white/80 hover:scale-110 z-10 shrink-0 cursor-pointer transition-transform duration-200"
      >
        <ChevronRight size={48} />
      </button>
    </div>
  );
};
