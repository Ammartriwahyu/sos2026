"use client";

import { useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import SolarSystem from "@/assets/assetsos26/shared/solar-system.png";
import BatuParallax from "@/assets/home/batu-parallax.svg";
import SpaceBackground from "@/shared/components/background/SpaceBackground";
import { kegiatanData } from "../../data/kegiatan";
import KegiatanCard from "./KegiatanCard";

export default function Kegiatan() {
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(cardsContainerRef, {
    once: true,
    margin: "0px 0px -25% 0px",
  });

  return (
    <section aria-labelledby="activity-heading" className="relative w-full">
      <h2 id="activity-heading" className="sr-only">
        Activities
      </h2>
      <SpaceBackground className="relative z-10 pt-56 pb-18 w-full flex flex-col justify-center items-center overflow-visible">
        <div className="absolute lg:bottom-[-60%] left-[50%] lg:left-[-50%] -translate-x-1/2 size-100 md:size-150 lg:size-200">
          <div className="peta-glow inset-0 h-full w-full opacity-70" />
          <Image
            src={SolarSystem}
            alt="Solar Ring"
            className="peta-spin peta-spin-rev relative w-full"
          />
        </div>
        <div
          className="absolute top-[-5%] md:top-[-20%] left-0 w-[200%] lg:w-[102%] pointer-events-none select-none"
          style={{ animation: "slideUpFade 1.2s ease-out 1.5s both" }}
        >
          <Image
            src={BatuParallax}
            alt="Parallax Rock"
            className="w-full h-auto"
          />
        </div>
        <div
          ref={cardsContainerRef}
          className="mx-auto w-full max-w-270 flex flex-col md:flex-row justify-between relative z-10 gap-8 lg:gap-0 p-4"
        >
          {kegiatanData.map((item, index) => (
            <div
              key={item.id}
              className={`w-full max-w-125 ${index % 2 === 0 ? "fade-tilt-left" : "fade-tilt-right"} ${isVisible ? "fade-tilt-visible" : ""}`}
            >
              <KegiatanCard item={item} />
            </div>
          ))}
        </div>
      </SpaceBackground>
    </section>
  );
}
