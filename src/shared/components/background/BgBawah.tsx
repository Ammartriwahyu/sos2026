import React from "react";
import Image from "next/image";
import CustomAsset from "@/assets/assetsos26/decorations/bg_bawah.svg";

const ORNAMENTS_CONFIG = [
  {
    position: "bottom-0 left-1/2 -translate-x-1/2",
    opacity: "opacity-60",
  },
];

const BackgroundOrnaments = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {ORNAMENTS_CONFIG.map((item, index) => (
        <div
          key={index}
          className={`absolute w-full ${item.position} ${item.opacity}`}
        >
          <Image
            src={CustomAsset}
            alt=""
            width={2000}
            height={2000}
            className="w-full h-auto object-bottom object-cover"
            priority
          />
        </div>
      ))}
    </div>
  );
};

export default BackgroundOrnaments;
