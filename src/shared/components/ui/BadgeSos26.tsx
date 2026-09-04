import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/utils/cn";

const badgeSosVariants = cva(
  "inline-flex items-center justify-center py-2 text-lg transition-colors font-semibold w-[14.25rem]",
  {
    variants: {
      variant: {
        // Varian "Belum Dikerjakan"
        not_started:
          "rounded-[20px] bg-white/[0.15] border border-white/20 text-white shadow-lg shadow-black/5",

        // Varian "Selesai"
        completed:
          "rounded-[20px] bg-[#4A9D55] text-white shadow-lg shadow-black/10 border-transparent",

        // Varian "Terlewat"
        overdue:
          "rounded-[20px] bg-white/[0.15] border border-white/20 text-white shadow-lg shadow-black/5",
      },
    },
    defaultVariants: {
      variant: "not_started",
    },
  },
);

export interface BadgeSosProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeSosVariants> {}

function BadgeSos({ className, variant, ...props }: BadgeSosProps) {
  return (
    <div className={cn(badgeSosVariants({ variant }), className)} {...props} />
  );
}

export { BadgeSos, badgeSosVariants };
