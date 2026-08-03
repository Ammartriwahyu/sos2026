import React from "react";
import { cn } from "@/shared/utils/cn";
import Starfield from "./Starfield";

interface SpaceBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const SpaceBackground = ({ children, className }: SpaceBackgroundProps) => {
  return (
    <div className={cn("space-bg relative overflow-hidden", className)}>
      <Starfield />
      {children}
    </div>
  );
};

export default SpaceBackground;
