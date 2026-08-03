import React from "react";
import Image from "next/image";
import SolarSystem from "@/assets/assetsos26/shared/solar-system.png";
import CirclePurple from "@/assets/assetsos26/shared/circle-purple.svg";

/**
 * Dekorasi luar angkasa untuk section Rangkaian:
 * - Kiri: 1 solar-system (setengah keluar layar) berputar seperti roda.
 * - Kanan: solar-system (atas, setengah keluar layar) + circle-purple (bawah).
 * - Pencahayaan lembut di tengah ketiga aset.
 */
const SolarDecorations = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Glow tengah di antara ketiga aset */}
      <div className="peta-glow left-1/2 top-1/2 h-[45%] w-[55%] -translate-x-1/2 -translate-y-1/2" />

      {/* KIRI: solar-system, setengah keluar dari tepi kiri (posisi lebih ke bawah) */}
      <div className="absolute top-[45%] left-0 w-[340px] -translate-x-1/2 sm:w-[420px] lg:w-[520px]">
        <div className="peta-glow inset-0 h-full w-full opacity-70" />
        <Image
          src={SolarSystem}
          alt=""
          className="peta-spin relative w-full"
          priority
        />
      </div>

      {/* KANAN ATAS: solar-system, setengah keluar dari tepi kanan */}
      <div className="absolute top-[4%] right-0 w-[320px] translate-x-1/2 sm:w-[400px] lg:w-[500px]">
        <div className="peta-glow inset-0 h-full w-full opacity-70" />
        <Image
          src={SolarSystem}
          alt=""
          className="peta-spin peta-spin-rev relative w-full"
        />
      </div>

      {/* KANAN BAWAH: circle-purple (tanpa rotasi, cukup diberi glow di tengah) */}
      <div className="absolute right-0 bottom-[14%] w-[150px] translate-x-1/3 sm:w-[190px] lg:w-[240px]">
        <div className="peta-glow inset-0 h-full w-full opacity-70" />
        <Image src={CirclePurple} alt="" className="relative w-full" />
      </div>
    </div>
  );
};

export default SolarDecorations;
