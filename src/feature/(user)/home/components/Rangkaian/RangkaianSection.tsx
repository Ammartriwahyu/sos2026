"use client";

import { useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import Bintang from "@/assets/home/bintang.png";
import MaskotCewe from "@/assets/home/maskot-cewe.webp";
import { rangkaianData } from "../../data/rangkaian";
import SectionTitle from "../SectionTitle";
import PanduanCard from "./PanduanCard";
import RangkaianCard from "./RangkaianCard";
import RangkaianDecorations from "./RangkaianDecorations";

export default function RangkaianSection() {
  const ref = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40% 0px" });
  const isBottomInView = useInView(bottomRef, {
    once: true,
    margin: "0px 0px -20% 0px",
  });

  return (
    <section className="flex flex-col min-h-screen items-center justify-center bg-linear-to-b from-[#161A3D] to-[#111633] overflow-visible relative pt-24 md:pt-48 lg:pb-24 xl:pb-12 mt-[-100vh]">
      <RangkaianDecorations />

      <SectionTitle className="not-md:mb-20">RANGKAIAN</SectionTitle>
      <div
        ref={ref}
        className="w-full max-w-5xl flex flex-col md:flex-row justify-center items-center md:items-center gap-5 relative z-30 px-4"
      >
        {rangkaianData.map((item, index) => (
          <div
            key={item.id}
            className={`w-full max-w-md ${index === 1 ? "md:mt-40" : ""} rangkaian-card-base ${
              isInView ? "rangkaian-card-visible" : ""
            }`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <RangkaianCard item={item} index={index} />
          </div>
        ))}
      </div>

      <div
        ref={bottomRef}
        className="w-full max-w-5xl flex px-4 flex-col lg:flex-row justify-between items-start mt-[13.5%] relative z-20"
      >
        <div className="relative">
          <div
            className="absolute bottom-[-10%] left-[-5%] size-14 bg-[#9B7384] blur-md rounded-full animate-pulse-glow"
            style={{ animationDelay: "0.8s" }}
          />
          <Image
            src={Bintang}
            alt="Bintang"
            className={`size-20 absolute top-[-6%] right-[-6%] animate-pulse-glow`}
          />
          <PanduanCard
            className={`w-full max-w-2xl mt-6 origin-bottom-right ${isBottomInView ? "animate-chat-bubble" : "opacity-0"}`}
            style={{ animationDelay: "0.6s" }}
          />
        </div>

        <Image
          src={MaskotCewe}
          alt="Mascot SOS"
          className={`w-[15vw] h-auto object-contain select-none not-lg:scale-180 origin-bottom self-end z-20 ${isBottomInView ? "animate-mascot-spring" : "opacity-0"}`}
          draggable={false}
        />
      </div>
    </section>
  );
}
