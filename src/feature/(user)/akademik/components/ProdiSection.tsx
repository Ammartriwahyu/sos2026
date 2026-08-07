"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prodiData } from "../data/prodiData";
import SectionTitle from "@/shared/components/SectionTitle";
import Starfield from "@/shared/components/background/Starfield";
import { ProdiTabs } from "./ProdiTabs";
import ProdiContent from "./ProdiContent";

const ProdiSection = () => {
  const [activeProdiId, setActiveProdiId] = useState("sistem_informasi");
  const rootRef = useRef<HTMLDivElement>(null);

  const activeProdi = useMemo(
    () => prodiData.find((p) => p.id === activeProdiId) ?? prodiData[0],
    [activeProdiId],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const reveal = gsap.utils.toArray<HTMLElement>(".akd-reveal");
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduce) {
        gsap.set(reveal, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(reveal, { opacity: 0, y: 32 });
      gsap.to(reveal, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="akademik-prodi-bg relative overflow-hidden py-20 md:py-28">
      <Starfield />

      <div
        ref={rootRef}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10"
      >
        <SectionTitle>Kenalin Prodi DSI</SectionTitle>

        <div className="mt-14 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-5 md:items-start md:gap-14">
          <div className="akd-reveal peta-reveal md:col-span-2">
            <ProdiTabs
              activeProdiId={activeProdiId}
              onSelectProdi={setActiveProdiId}
            />
          </div>

          <div className="akd-reveal peta-reveal md:col-span-3">
            <ProdiContent key={activeProdiId} prodi={activeProdi} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProdiSection;
