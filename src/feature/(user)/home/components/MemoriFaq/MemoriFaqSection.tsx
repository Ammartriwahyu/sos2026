import Image from "next/image";
import BatuParallax2 from "@/assets/home/batu-parallax-2.svg";
import { memoriData } from "../../data/memori";
import SectionTitle from "../SectionTitle";
import { FaqAccordion } from "./FaqAccordion";
import { FaqDecorations } from "./FaqDecorations";
import { MemoriCard } from "./MemoriCard";
import { MemoriCarousel } from "./MemoriCarousel";

export default function MemoriFaqSection() {
  return (
    <section className="relative z-40 w-full flex flex-col items-center bg-linear-to-b from-[#0F0F23] to-[#07132D] py-32 lg:py-70 gap-12">
      <div className="absolute inset-0 pointer-events-none z-20">
        <Image
          src={BatuParallax2}
          alt="Parallax"
          className="absolute top-[-3%] md:top-[-10%] w-[150vw] max-w-none lg:w-screen left-1/2 -translate-x-1/2 select-none h-auto"
        />
      </div>

      <SectionTitle>MEMORI</SectionTitle>

      <MemoriCarousel>
        {memoriData.map(({ id, link, content, title }) => (
          <MemoriCard key={id} title={title} content={content} link={link} />
        ))}
      </MemoriCarousel>

      <div className="flex flex-col relative w-full max-w-7xl mx-auto gap-12 mt-72 z-40 mb-20">
        <FaqDecorations />
        <h2 className="relative z-10 text-3xl md:text-4xl font-bold text-white text-center uppercase justify-start">
          FAQ
        </h2>
        <div className="relative z-10">
          <FaqAccordion />
        </div>
      </div>
    </section>
  );
}
