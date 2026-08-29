"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { AnimatedDiv } from "@/shared/components/ui/AnimatedDiv";
import { cn } from "@/shared/utils/cn";

interface BackLinkProps {
  href?: string;
  onClick?: () => void;
  label?: string;
  className?: string;
}

const isiClass =
  "inline-flex items-center gap-1 text-white font-semibold text-lg md:text-xl transition-colors hover:text-white/80";

const BackLink = ({
  href,
  onClick,
  label = "Kembali",
  className,
}: BackLinkProps) => {
  const isi = (
    <>
      <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white shrink-0" />
      <span>{label}</span>
    </>
  );

  return (
    <AnimatedDiv
      className={cn(
        "pt-navbar relative z-10 w-full px-6 md:px-8 lg:px-32",
        className,
      )}
    >
      {href ? (
        <Link href={href} className={isiClass}>
          {isi}
        </Link>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className={cn(isiClass, "cursor-pointer bg-transparent border-none")}
        >
          {isi}
        </button>
      )}
    </AnimatedDiv>
  );
};

export default BackLink;
