"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/shared/utils/cn";
import PhotoStack from "./PhotoStack";
import type { RangkaianItem } from "../data/rangkaian";

const RangkaianRow = ({ item }: { item: RangkaianItem }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { reverse } = item;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const heading = root.querySelector<HTMLElement>(".peta-row-heading");
    const desc = root.querySelector<HTMLElement>(".peta-row-desc");
    const photos = root.querySelector<HTMLElement>(".peta-row-photos");

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduce) {
        gsap.set([heading, desc, photos], { opacity: 1, x: 0, y: 0 });
        return;
      }

      const textFrom = reverse ? 60 : -60;
      gsap.set([heading, desc], { opacity: 0, x: textFrom });
      gsap.set(photos, { opacity: 0, x: reverse ? -60 : 60, scale: 0.94 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
      });

      tl.to(photos, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
      })
        .to(
          heading,
          { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
          "-=0.45",
        )
        .to(
          desc,
          { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4",
        );
    }, root);

    return () => ctx.revert();
  }, [reverse]);

  const textBlock = (
    <div
      className={cn(
        "flex flex-col gap-4",
        reverse ? "md:items-end md:text-right" : "md:items-start md:text-left",
      )}
    >
      <h3
        className={cn(
          "peta-row-heading peta-reveal text-center text-3xl font-semibold text-putih md:text-5xl",
          reverse ? "md:text-right" : "md:text-left",
        )}
      >
        {item.title}
      </h3>
      <p
        className={cn(
          "peta-row-desc peta-reveal text-justify text-sm leading-relaxed text-putih/85 md:text-base",
          reverse ? "md:text-right" : "md:text-left",
        )}
      >
        {item.description}
      </p>
    </div>
  );

  const photoBlock = (
    <div className="peta-row-photos peta-reveal w-full">
      <PhotoStack photos={item.photos} alt={item.title} />
    </div>
  );

  return (
    <div
      ref={rootRef}
      className="flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-between md:gap-8"
    >
      {reverse ? (
        <>
          <div className="order-1 w-full md:order-1 md:w-[54%]">
            {photoBlock}
          </div>
          <div className="order-2 w-full md:order-2 md:w-[42%]">
            {textBlock}
          </div>
        </>
      ) : (
        <>
          <div className="order-2 w-full md:order-1 md:w-[42%]">
            {textBlock}
          </div>
          <div className="order-1 w-full md:order-2 md:w-[54%]">
            {photoBlock}
          </div>
        </>
      )}
    </div>
  );
};

export default RangkaianRow;
