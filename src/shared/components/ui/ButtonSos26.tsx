import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

interface AktivitasButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

const AktivitasButton = forwardRef<HTMLButtonElement, AktivitasButtonProps>(
  ({ className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "flex w-full justify-center items-center rounded-2xl",
          "px-[12px] py-[12px] text-base font-bold text-white",
          "transition-all duration-300",

          "bg-[#605992] hover:bg-[#524c7f] active:bg-[#453f6c]",

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
