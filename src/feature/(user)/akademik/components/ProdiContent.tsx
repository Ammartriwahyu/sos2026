"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Prodi } from "../data/prodiData";

interface ProdiContentProps {
  prodi: Prodi;
}

const ProdiContent = ({ prodi }: ProdiContentProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="text-putih">
      <p className="mb-8 text-justify text-sm leading-relaxed text-putih/90 md:text-base md:leading-7">
        {prodi.deskripsi}
      </p>
      <h4 className="mb-5 text-lg font-bold md:text-xl">
        Adapun prospek kerja dari prodi ini sebagai berikut!
      </h4>
      <ul className="list-disc space-y-3 pl-6 text-putih/90">
        {prodi.prospek.map((item, index) => (
          <li key={index} className="text-sm md:text-base">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProdiContent;
