// VisiMisiSection.tsx

"use client";
import React from "react";
import CaketangCard from "./CaketangCard";
import { Caketang } from "@/api/services/user/stf";
import Dummy from "@/assets/assetsos26/shared/picture-template.webp";
import Image from "next/image";
import { formatText } from "@/lib/utils";
import Starfield from "@/shared/components/background/Starfield";

interface VisiMisiSectionProps {
  caketangList: Caketang[];
  isLoading: boolean;
  error: string | null;
  activeCardId: string | null;
  setActiveCardId: (id: string) => void;
}

const VisiMisiSection = ({
  caketangList,
  activeCardId,
  setActiveCardId,
}: VisiMisiSectionProps) => {
  const activeCaketang = caketangList?.find(
    (caketang: Caketang) => caketang.id_caketang === activeCardId,
  );

  return (
    <section className="relative w-full overflow-hidden">
      {/* Decorative Glow & Circles */}
      {/* Kiri Atas */}
      <div className="absolute top-0 md:top-20 left-0 -translate-x-1/2 w-[20rem] h-[20rem] md:w-[25rem] md:h-[25rem] rounded-full border-[1px] border-dashed border-white/20 z-0 pointer-events-none flex items-center justify-center">
        <div className="w-32 h-32 md:w-48 md:h-48 bg-[#6543A7]/40 blur-[50px] md:blur-[70px] rounded-full animate-pulse"></div>
      </div>

      {/* Kanan Bawah */}
      <div className="absolute bottom-0 md:bottom-20 right-0 translate-x-1/2 w-[20rem] h-[20rem] md:w-[25rem] md:h-[25rem] rounded-full border-[1px] border-dashed border-white/20 z-0 pointer-events-none flex items-center justify-center">
        <div
          className="w-32 h-32 md:w-48 md:h-48 bg-[#6543A7]/40 blur-[50px] md:blur-[70px] rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <Starfield />

      <div className="mx-auto flex w-full flex-col relative z-10 items-center justify-center py-16 md:py-24 px-4 gap-20 md:gap-32 text-white lg:px-8 md:px-12 xl:px-24">
        {/* Cards Row */}
        <div className="flex w-full flex-nowrap justify-center gap-4 md:gap-12 lg:gap-20">
          {caketangList?.map((caketang: Caketang) => (
            <CaketangCard
              key={caketang.id_caketang}
              data={caketang}
              isActive={caketang.id_caketang === activeCardId}
              onClick={() => setActiveCardId(caketang.id_caketang)}
            />
          ))}
        </div>

        {/* Detail Section */}
        {activeCaketang && (
          <div className="grid grid-cols-1 lg:grid-cols-12 w-full gap-10 md:gap-16 items-start">
            {/* Left: Photo */}
            <div className="col-span-1 lg:col-span-4 flex flex-col justify-center items-center gap-2 md:gap-4 px-4 md:px-0">
              <div className="flex flex-col w-full max-w-sm md:max-w-md rounded-t-[4rem] md:rounded-t-[5rem] rounded-b-xl overflow-hidden shadow-2xl bg-[#C4BCEB]">
                <div className="w-full pt-1.5 md:pt-2 px-1.5 md:px-2 pb-1.5 md:pb-2">
                  <Image
                    src={Dummy}
                    width={400}
                    height={400}
                    alt="Foto Caketang"
                    className="w-full h-72 sm:h-80 md:h-96 lg:h-[26rem] object-cover rounded-t-[3.5rem] md:rounded-t-[4.5rem] rounded-b-lg"
                  />
                </div>
              </div>

              {/* Separate Name Container */}
              <div className="flex flex-col w-full max-w-sm md:max-w-md rounded-b-[1.5rem] md:rounded-b-[2rem] rounded-t-none shadow-xl bg-[#B084D1] justify-center items-center px-4 py-4 md:py-6 text-center">
                <p className="text-white font-bold text-lg sm:text-xl md:text-2xl uppercase leading-tight">
                  {activeCaketang.nama}
                </p>
              </div>
            </div>

            {/* Right: Details (Prodi, Visi, Misi) */}
            <div className="col-span-1 lg:col-span-8 flex flex-col gap-10">
              <h4 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold text-center lg:text-left leading-tight">
                {activeCaketang.prodi}
              </h4>

              <div className="flex flex-col gap-4">
                <h5 className="text-xl md:text-2xl font-bold text-white/90">
                  Visi :
                </h5>
                {activeCaketang.visi &&
                  formatText(activeCaketang.visi).map((line, index) => (
                    <p
                      key={index}
                      className="text-lg md:text-xl leading-8 font-normal text-justify text-white/80"
                    >
                      {line}
                    </p>
                  ))}
              </div>

              <div className="flex flex-col gap-4">
                <h5 className="text-xl md:text-2xl font-bold text-white/90">
                  Misi :
                </h5>
                <div className="flex flex-col gap-2">
                  {activeCaketang.misi &&
                    formatText(activeCaketang.misi).map((line, index) => (
                      <p
                        key={index}
                        className="text-lg md:text-xl leading-8 font-normal text-justify text-white/80"
                      >
                        {line}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VisiMisiSection;
