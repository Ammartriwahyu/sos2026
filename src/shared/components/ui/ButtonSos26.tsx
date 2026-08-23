import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

interface AktivitasButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "primary" | "outline";
}

const AktivitasButton = forwardRef<HTMLButtonElement, AktivitasButtonProps>(
  ({ className, children, disabled, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "flex w-full justify-center items-center rounded-2xl",

          "px-[12px] py-[12px] text-base font-bold text-white gap-2",
          "transition-all duration-300",

          variant === "primary" && [
            "bg-[#605992] hover:bg-[#524c7f] active:bg-[#453f6c]",
          ],
          variant === "outline" && [
            "bg-[#2A1F5C]/50 border border-[#605992]",
            "hover:bg-[#2A1F5C]/80 active:bg-[#2A1F5C]",
          ],

          "outline-none focus:outline-none focus-visible:outline-none",
          "focus:ring-2 focus:ring-[#7b72b3]",
          "active:ring-0",

          "disabled:cursor-not-allowed disabled:bg-neutral-500/50 disabled:text-white/60",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

AktivitasButton.displayName = "AktivitasButton";

export default AktivitasButton;
