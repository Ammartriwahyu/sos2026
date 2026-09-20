import React from "react";
import Image from "next/image";
import SolarSystem from "@/assets/assetsos26/shared/solar-system.png";

interface HeroSectionProps {
  jenisSesi?: "caketang" | "kadep";
  showToggle?: boolean;
}

const HeroSection = ({
  jenisSesi = "caketang",
  showToggle = false,
}: HeroSectionProps) => {
  const isKadep = jenisSesi === "kadep";
  const roleName = isKadep ? "Calon Ketua Departemen" : "Calon Ketua Angkatan";

  return (
    <section className="pt-navbar relative z-10 w-full pb-8 md:pb-16 overflow-hidden">
      {/* Left Solar System */}
      <div className="absolute top-[55%] left-0 w-[300px] sm:w-[500px] lg:w-[700px] -translate-x-1/2 -translate-y-1/2 opacity-70 pointer-events-none">
        <Image
          src={SolarSystem}
          alt=""
          className="peta-spin relative w-full"
          priority
        />
      </div>

      {/* Right Solar System */}
      <div className="absolute top-[55%] right-0 w-[300px] sm:w-[500px] lg:w-[700px] translate-x-1/2 -translate-y-1/2 opacity-70 pointer-events-none">
        <Image
          src={SolarSystem}
          alt=""
          className="peta-spin peta-spin-rev relative w-full"
        />
      </div>

      <div className="mycontainer mx-auto w-full max-w-6xl relative z-10 text-center text-white flex flex-col justify-center items-center gap-8 min-h-[50vh]">
        <h2 className="w-11/12 md:w-3/4 text-2xl sm:text-3xl font-bold text-center leading-tight md:leading-snug md:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 drop-shadow-lg">
          Halo, Kenalan Yuk Sama
          <br className="hidden md:block" /> {roleName}!
        </h2>
        <p className="text-sm md:text-base text-justify md:text-center w-11/12 md:w-4/5 lg:w-2/3 text-white/90 leading-relaxed drop-shadow-md">
          {roleName} 2026 hadir sebagai sosok yang membawa semangat perubahan
          dan komitmen untuk membangun kita menjadi lebih solid, aktif, dan
          berdampak. Yuk kenali mereka lebih dekat dengan cari info visi dan
          misi, serta tujuan mereka. Karena setiap suara yang kamu berikan,
          menentukan masa depan kita bersama.
        </p>

        {/* Navigation Toggle for Caketang / Cakadep */}
        {showToggle && (
          <div className="flex flex-row justify-center gap-2 sm:gap-4 mt-6 w-full px-2 sm:px-0">
            <a
              href="/stf"
              className={`flex-1 sm:flex-none text-center px-4 py-3 sm:px-6 rounded-xl text-xs sm:text-base font-semibold transition-all flex items-center justify-center ${
                !isKadep
                  ? "bg-[var(--color-stf-primary)] text-[var(--color-stf-text)] shadow-lg shadow-[var(--color-stf-primary)]/40 border border-[var(--color-stf-primary)]"
                  : "bg-[var(--color-stf-primary)]/20 border border-[var(--color-stf-primary)]/40 text-[var(--color-stf-text)]/70 hover:bg-[var(--color-stf-primary)]/40 hover:text-[var(--color-stf-text)]"
              }`}
            >
              Calon Ketua Angkatan
            </a>
            <a
              href="/stf/kadep"
              className={`flex-1 sm:flex-none text-center px-4 py-3 sm:px-6 rounded-xl text-xs sm:text-base font-semibold transition-all flex items-center justify-center ${
                isKadep
                  ? "bg-[var(--color-stf-primary)] text-[var(--color-stf-text)] shadow-lg shadow-[var(--color-stf-primary)]/40 border border-[var(--color-stf-primary)]"
                  : "bg-[var(--color-stf-primary)]/20 border border-[var(--color-stf-primary)]/40 text-[var(--color-stf-text)]/70 hover:bg-[var(--color-stf-primary)]/40 hover:text-[var(--color-stf-text)]"
              }`}
            >
              Calon Ketua Departemen
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
