import Image from "next/image";
import BatuParallax2 from "@/assets/home/batu-parallax-2.svg";
import { memoriData } from "../../data/memori";
import SectionTitle from "../SectionTitle";
import { MemoriCard } from "./MemoriCard";
import { MemoriCarousel } from "./MemoriCarousel";

export default function MemoriFaqSection() {
  return (
    <section className="relative z-40 w-full flex flex-col items-center bg-linear-to-b from-[#0F0F23] to-[#07132D] py-32 lg:py-70 gap-12">
      <div className="absolute inset-0 pointer-events-none z-20">
        <Image
          src={BatuParallax2}
          alt="Parallax"
          className="absolute top-[-10%] md:top-[-16%] w-[150vw] max-w-none lg:w-screen left-1/2 -translate-x-1/2 select-none h-auto"
        />
      </div>

      <SectionTitle>MEMORI</SectionTitle>

      <MemoriCarousel>
        {memoriData.map(({ id, link, content, title }) => (
          <MemoriCard key={id} title={title} content={content} link={link} />
        ))}
      </MemoriCarousel>

      <div className="content-container relative w-full max-w-7xl mx-auto mt-28 z-40">
        <h4 className="text-5xl font-bold text-white text-center">FAQ</h4>
      </div>
    </section>
  );
}
