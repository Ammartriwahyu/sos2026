import React from "react";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/shared/utils/cn";
import Base from "@/assets/assetsos26/akademik/base.svg";

interface LogoOnBaseProps {
  logo: StaticImageData;
  alt: string;
  float?: boolean;
  className?: string;
  priority?: boolean;
}

const LogoOnBase = ({
  logo,
  alt,
  float = false,
  className,
  priority = false,
}: LogoOnBaseProps) => {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="peta-glow inset-x-[12%] bottom-[8%] top-[42%] opacity-70" />
      <Image
        src={Base}
        alt=""
        className="relative w-full select-none"
        priority={priority}
      />
      <Image
        src={logo}
        alt={alt}
        priority={priority}
        className={cn(
          "absolute bottom-[34%] left-1/2 w-[64%] select-none",
          float ? "akademik-float" : "-translate-x-1/2",
        )}
      />
    </div>
  );
};

export default LogoOnBase;
