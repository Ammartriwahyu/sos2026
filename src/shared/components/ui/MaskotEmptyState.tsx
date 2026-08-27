import Image from "next/image";
import Maskot from "@/assets/assetsos26/illustrasions/maskot.svg";
import MaskotCewe from "@/assets/assetsos26/illustrasions/maskot_cewe.svg";
import { cn } from "@/shared/utils/cn";

interface MaskotEmptyStateProps {
  message: string;
  className?: string;
}

const maskotClass =
  "shrink-0 object-contain w-[104px] h-[224px] sm:w-[124px] sm:h-[266px] lg:w-[172px] lg:h-[370px]";

const MaskotEmptyState = ({ message, className }: MaskotEmptyStateProps) => {
  return (
    <div
      className={cn(
        "relative z-10 mt-2 flex w-full flex-col items-center gap-6 px-4 py-2 sm:mt-10 sm:flex-row sm:items-start sm:justify-center sm:gap-5 sm:py-0 lg:mt-32 lg:gap-12",
        className,
      )}
    >
      <div className="maskot-callout order-1 flex w-full max-w-[360px] items-center justify-center rounded-2xl border border-accent-violet/40 bg-accent-purple/40 px-6 py-5 backdrop-blur-sm sm:order-2 sm:mt-10 sm:max-w-[420px] sm:flex-1 sm:px-8 sm:py-6 lg:mt-20">
        <p className="text-center text-base font-semibold leading-relaxed text-white sm:text-lg lg:text-xl">
          {message}
        </p>
      </div>

      <div className="order-2 flex w-full items-end justify-center gap-10 sm:contents">
        <Image
          src={Maskot}
          alt=""
          aria-hidden
          draggable={false}
          className={cn(maskotClass, "maskot-bob sm:order-1")}
        />
        <Image
          src={MaskotCewe}
          alt=""
          aria-hidden
          draggable={false}
          className={cn(maskotClass, "maskot-bob-alt sm:order-3")}
        />
      </div>
    </div>
  );
};

export default MaskotEmptyState;
