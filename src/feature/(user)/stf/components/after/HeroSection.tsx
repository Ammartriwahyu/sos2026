import React from "react";
import Image from "next/image";
import SolarSystem from "@/assets/assetsos26/shared/solar-system.png";

const HeroSection = () => {
  return (
    <section className="relative z-10 w-full pt-32 pb-8 md:pt-48 md:pb-16 overflow-hidden">
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
          <br className="hidden md:block" /> Calon Ketua Angkatan!
        </h2>
        <p className="text-sm md:text-base text-justify md:text-center w-11/12 md:w-4/5 lg:w-2/3 text-white/90 leading-relaxed drop-shadow-md">
          Calon Ketua Angkatan 2026 hadir sebagai sosok yang membawa semangat
          perubahan dan komitmen untuk membangun angkatan yang lebih solid,
          aktif, dan berdampak. Yuk kenali mereka lebih dekat dengan cari info
          visi dan misi, serta tujuan mereka. Karena setiap suara yang kamu
          berikan, menentukan masa depan kita bersama.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
