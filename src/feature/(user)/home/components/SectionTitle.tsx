import { forwardRef } from "react";
import { cn } from "@/shared/utils/cn";

const SectionTitle = forwardRef<HTMLHeadingElement, React.ComponentProps<"h2">>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        "w-full text-4xl max-w-5xl py-2.5 bg-linear-to-r from-[#4A3488]/0 via-[#4A3488]/15 to-[#4A3488]/0 border-y border border-[#4A3488]/15 text-center text-putih font-bold backdrop-blur-sm z-30",
        className,
      )}
      {...props}
    />
  ),
);

SectionTitle.displayName = "SectionTitle";

export default SectionTitle;
