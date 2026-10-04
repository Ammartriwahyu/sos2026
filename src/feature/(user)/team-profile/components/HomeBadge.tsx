import React from "react";
import Image from "next/image";
import Link from "next/link";
import LogoSos from "@/assets/assetsos26/logo-sos26.svg";
import { cn } from "@/shared/utils/cn";

interface HomeBadgeProps {
  visible: boolean;
}

const HomeBadge = ({ visible }: HomeBadgeProps) => {
  return (
    <Link
      href="/home"
      prefetch={false}
      aria-label="Kembali ke beranda Synergy of Symphony"
      tabIndex={visible ? 0 : -1}
      className={cn(
        "tp-home-badge fixed left-4 top-4 z-40 flex h-12 w-12 items-center justify-center rounded-full md:left-6 md:top-6",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <Image src={LogoSos} alt="" className="h-8 w-8" />
    </Link>
  );
};

export default HomeBadge;
