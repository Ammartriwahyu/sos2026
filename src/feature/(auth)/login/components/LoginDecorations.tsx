import React from "react";
import Image from "next/image";
import SolarSystem from "@/assets/assetsos26/shared/solar-system.png";
import CirclePurple from "@/assets/assetsos26/shared/circle-purple.svg";

const LoginDecorations = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Glow Center */}
      <div className="peta-glow left-1/2 top-1/2 h-[45%] w-[55%] -translate-x-1/2 -translate-y-1/2" />

      {/* Left Solar System */}
      <div className="absolute top-[42%] left-0 w-[400px] sm:w-[600px] lg:w-[800px] -translate-x-1/2 -translate-y-1/2">
        <div className="peta-glow inset-0 h-full w-full opacity-70" />
        <Image
          src={SolarSystem}
          alt=""
          className="peta-spin relative w-full"
          priority
        />
      </div>

      {/* Right Solar System */}
      <div className="absolute top-[42%] right-0 w-[400px] sm:w-[600px] lg:w-[800px] translate-x-1/2 -translate-y-1/2">
        <div className="peta-glow inset-0 h-full w-full opacity-70" />
        <Image
          src={SolarSystem}
          alt=""
          className="peta-spin peta-spin-rev relative w-full"
        />
      </div>

      {/* Bottom Left Small Circle */}
      <div className="absolute left-[5%] bottom-[15%] w-[100px] sm:w-[150px] lg:w-[180px]">
        <div className="peta-glow inset-0 h-full w-full opacity-50" />
        <Image src={CirclePurple} alt="" className="relative w-full" />
      </div>
    </div>
  );
};

export default LoginDecorations;
