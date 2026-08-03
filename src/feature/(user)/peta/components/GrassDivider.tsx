import React from "react";
import Image from "next/image";
import Grass from "@/assets/assetsos26/shared/grass.svg";

const GrassDivider = () => {
  return (
    <div
      className="pointer-events-none relative z-20 -mb-px w-full"
      aria-hidden
    >
      <Image
        src={Grass}
        alt=""
        className="h-auto w-full select-none"
        sizes="100vw"
      />
    </div>
  );
};

export default GrassDivider;
