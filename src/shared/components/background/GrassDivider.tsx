import React from "react";
import Image from "next/image";
import { cn } from "@/shared/utils/cn";
import Grass from "@/assets/assetsos26/shared/grass.svg";

interface GrassDividerProps {
  className?: string;
}

const GrassDivider = ({ className }: GrassDividerProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none relative z-20 -mb-px w-full",
        className,
      )}
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
