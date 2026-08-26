import { cn } from "@/shared/utils/cn";
import Starfield from "./Starfield";

interface SpaceBackgroundProps {
  children: React.ReactNode;
  className?: string;
  fullPage?: boolean;
}

const SpaceBackground = ({
  children,
  className,
  fullPage = true,
}: SpaceBackgroundProps) => {
  if (!fullPage) {
    return (
      <div className={cn("space-bg relative overflow-hidden", className)}>
        <Starfield />
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "space-bg relative min-h-screen overflow-hidden flex flex-col justify-between",
        className,
      )}
    >
      <Starfield />

      <div className="relative z-10 w-full flex-1">{children}</div>
    </div>
  );
};

export default SpaceBackground;
