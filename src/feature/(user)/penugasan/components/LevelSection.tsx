"use client"; // 1. Tandai sebagai Client Component

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";
import { MahasiswaLevel } from "../types";
import { cn } from "@/shared/utils/cn";

interface LevelSectionProps {
  level: MahasiswaLevel | null;
}

export const LevelSection = ({ level }: LevelSectionProps) => {
  const [progressValue, setProgressValue] = React.useState(0);
  const percentage = React.useMemo(() => {
    if (!level || level.max_level === 0) {
      return 0;
    }
    return (level.level / level.max_level) * 100;
  }, [level]);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgressValue(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  if (!level) {
    return null;
  }

  const progressMessage =
    level.level === 0
      ? "Kerjakan penugasan untuk membuka level"
      : `Selamat! kamu telah mengumpulkan ${level.level} dari ${level.max_level} penugasan.`;

  return (
    <div
      className={cn(
        "w-full max-w-[714px] min-h-[166px] mx-auto flex flex-col justify-center items-center",
        "p-6 md:p-[32px]",
        "rounded-[12px] border border-white/20",
        "bg-gradient-to-b from-white/[0.22] to-white/[0.08]",
        "shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]",
      )}
    >
      <div className="w-full flex flex-col items-center justify-center gap-4">
        {/* Header & Deskripsi */}
        <div className="flex flex-col items-center text-center w-full">
          <p className="text-white font-semibold text-2xl drop-shadow-sm mb-4">
            Level {level.level}
          </p>
          <p className="text-white/90 font-medium text-base mb-4">
            {progressMessage}
          </p>
        </div>

        {/* Level Bar */}
        <ProgressPrimitive.Root
          className={cn(
            "relative w-full max-w-[650px] h-[24px] overflow-hidden rounded-[20px]",
            "bg-white/20",
          )}
        >
          <ProgressPrimitive.Indicator
            className={cn(
              "relative h-full w-full flex-1 transition-transform duration-1000 ease-out",
              "overflow-hidden rounded-[20px]",
            )}
            style={{
              transform: `translateX(-${100 - progressValue}%)`,
              background: "linear-gradient(180deg, #0A0B26 0%, #1C1D4A 100%)",
            }}
          >
            <div
              className={cn(
                "absolute inset-0",
                "bg-gradient-to-r from-transparent via-white/20 to-transparent",
                "animate-shimmer-bar",
              )}
            />
          </ProgressPrimitive.Indicator>
        </ProgressPrimitive.Root>
      </div>
    </div>
  );
};

export default LevelSection;
