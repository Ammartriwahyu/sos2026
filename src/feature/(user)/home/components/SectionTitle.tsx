import { forwardRef } from "react";
import { cn } from "@/shared/utils/cn";
import { sectionTitleClass } from "@/shared/components/sectionTitleClass";

const SectionTitle = forwardRef<HTMLHeadingElement, React.ComponentProps<"h2">>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("z-30", sectionTitleClass, className)}
      {...props}
    />
  ),
);

SectionTitle.displayName = "SectionTitle";

export default SectionTitle;
