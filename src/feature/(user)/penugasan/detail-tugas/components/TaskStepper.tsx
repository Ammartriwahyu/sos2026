import React from "react";
import { cn } from "@/shared/utils/cn";

interface TaskStepperProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
}

export const TaskStepper = ({
  activeStep,
  setActiveStep,
}: TaskStepperProps) => {
  return (
    <div className="w-full max-w-[200px] md:max-w-[280px] mx-auto">
      <div className="relative">
        {/* Garis Penghantar (Background & Progress) */}
        <div className="absolute top-6 md:top-7 left-0 right-0 mx-8 md:mx-10 h-1 -translate-y-1/2 z-0">
          {/* Garis latar belakang menggunakan warna #DED6F9 */}
          <div className="w-full h-full bg-[#DED6F9] rounded-full" />
          {/* Garis progress terisi penuh ungu #9B7EDE jika activeStep >= 2 */}
          <div
            className="absolute top-0 left-0 h-full bg-[#9B7EDE] rounded-full transition-all duration-300"
            style={{ width: activeStep >= 2 ? "100%" : "0%" }}
          />
        </div>

        <div className="relative flex justify-between items-start">
          {/* Step 1 */}
          <div
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => setActiveStep(1)}
          >
            <div
              className={cn(
                "w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-medium text-sm md:text-lg transition-colors z-10",
                activeStep >= 1 ? "bg-[#9B7EDE]" : "bg-[#DED6F9]",
              )}
            >
              1
            </div>
            <p
              className={cn(
                "font-medium transition-colors text-center text-xs md:text-base",
                activeStep >= 1 ? "text-[#9B7EDE]" : "text-[#DED6F9]",
              )}
            >
              Detail Tugas
            </p>
          </div>

          {/* Step 2 */}
          <div
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => setActiveStep(2)}
          >
            <div
              className={cn(
                "w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-medium text-sm md:text-lg transition-colors z-10",
                activeStep === 2 ? "bg-[#9B7EDE]" : "bg-[#DED6F9]",
              )}
            >
              2
            </div>
            <p
              className={cn(
                "font-medium transition-colors text-center text-xs md:text-base",
                activeStep === 2 ? "text-[#9B7EDE]" : "text-[#DED6F9]",
              )}
            >
              Pengumpulan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
