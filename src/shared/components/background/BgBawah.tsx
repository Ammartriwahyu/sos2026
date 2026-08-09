import React from "react";
import Image from "next/image";
import CustomAsset from "@/assets/assetsos26/decorations/bg_bawah.svg";

interface BgBawahProps {
  gradientHeight?: string;
  className?: string;
}

const BgBawah: React.FC<BgBawahProps> = ({
  gradientHeight = "h-[160px] md:h-[110px]",
  className = "",
}) => {
  return (
    <div
      className={`pointer-events-none absolute bottom-0 left-0 w-full z-0 flex flex-col overflow-hidden ${className}`}
      aria-hidden
    >
      <div className="w-full opacity-100">
        <Image
          src={CustomAsset}
          alt=""
          width={2000}
          height={2000}

          className="w-full h-auto object-bottom object-cover"
          priority
        />
      </div>

      <div
        className={`w-full ${gradientHeight}`}
        style={{
          background: "linear-gradient(180deg, #161A3D 0%, #07132D 100%)",
        }}
      />
    </div>
  );
};

export default BgBawah;
