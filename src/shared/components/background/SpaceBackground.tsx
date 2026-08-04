import React from "react";
import { cn } from "@/shared/utils/cn";
import Starfield from "./Starfield";
import BackgroundOrnaments from "./BgBawah";
import CircleGLow from "./CircleGlow";

interface SpaceBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const SpaceBackground = ({ children, className }: SpaceBackgroundProps) => {
  return (
    <div
      className={cn(
        "space-bg relative min-h-screen overflow-hidden flex flex-col justify-between",
        className,
      )}
    >
      <BackgroundOrnaments />
      <CircleGLow />
      <Starfield />

      <div className="relative z-10 w-full flex-1">{children}</div>
    </div>
  );
};

export default SpaceBackground;
