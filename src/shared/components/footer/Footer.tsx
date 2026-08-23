"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FooterLinks } from "./FooterItems";
import { iconSosmedData } from "@/shared/data/iconSosmedData";
import { cn } from "@/shared/utils/cn";

import LogoSoS from "@/assets/assetsos26/logo-sos26.svg";

export const Footer = () => {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/home";

  return (
    <footer
      className={cn(
        "relative z-50 text-white -mt-[1px]",
        isHome ? "bg-footer-to" : "bg-footer-gradient",
      )}
    >
      <div className="mycontainer py-[12px] md:py-[56px]">
        <div className="flex flex-col items-center md:flex-row md:justify-around gap-[12px] md:gap-[22px]">
          <div className="flex flex-col md:flex-row items-center gap-[4px] md:gap-[22px] text-center md:text-left">
            <Image
              src={LogoSoS}
              alt="Logo Synergy Of Symphony"
              className="w-19.5 md:w-28"
            />
            <div className="flex flex-col gap-[6px]">
              <h4 className="font-bold text-[17px] text-white">
                Synergy Of Symphony & <br className="hidden md:block" /> Shaping
                The Future
              </h4>
              <p className="text-[10px] md:text-[13px] text-white/70">
                Embark on the Journey, Unite in Symphony
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse items-center md:flex-row md:items-start gap-4.25 md:gap-16.75 lg:gap-28">
            <FooterLinks />
            <div className="flex flex-col items-center md:items-start gap-[17px]">
              <h3 className="hidden md:block font-semibold text-[14px] text-white">
                Sosial Media
              </h3>
              <div className="flex justify-center md:justify-start gap-2.75">
                {iconSosmedData.map((sosmed) => (
                  <Link
                    key={sosmed.name}
                    href={sosmed.href}
                    aria-label={sosmed.name}
                    className="text-white/80 hover:text-violet-light-active"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={sosmed.iconSrc}
                      alt={`${sosmed.name} icon`}
                      height={Math.round(sosmed.height * 0.7)}
                      width={Math.round(sosmed.width * 0.7)}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 text-center py-[11px] text-white/80 text-[10px] hover:underline hover:underline-offset-4 font-bold">
        <Link href="https://linktr.ee/pitsos25">
          Made with ❤️ by PIT SOS 2026
        </Link>
      </div>
    </footer>
  );
};
