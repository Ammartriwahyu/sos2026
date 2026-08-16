import Image from "next/image";
import Link from "next/link";
import LogoSoS from "@/assets/logo-sos.svg";
import CaturPattern from "@/assets/user/pembatas.svg";
import { iconSosmedData } from "@/shared/data/iconSosmedData";
import { FooterLinks } from "./FooterItems";

export const Footer = () => {
  return (
    <footer className="bg-secondary-500 text-default-dark relative z-100">
      <Image
        src={CaturPattern}
        alt="Footer Pattern"
        className="w-full h-12.5 object-cover md:h-auto"
        aria-hidden="true"
      />

      <div className="mycontainer py-22.25 md:py-14">
        <div className="flex flex-col items-center md:flex-row md:justify-around gap-8.5 md:gap-5.5">
          <div className="flex flex-col md:flex-row items-center gap-5.5 text-center md:text-left">
            <Image
              src={LogoSoS}
              alt="Logo Synergy Of Symphony"
              className="w-19.5 md:w-28"
            />
            <div className="flex flex-col gap-1.5">
              <h4 className="font-bold text-[17px] text-default-dark">
                Synergy Of Symphony & <br className="hidden md:block" /> Shaping
                The Future
              </h4>
              <p className="text-[10px] md:text-[13px] text-black">
                Embark on the Journey, Unite in Symphony
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse items-center md:flex-row md:items-start gap-4.25 md:gap-16.75 lg:gap-28">
            <FooterLinks />
            <div className="flex flex-col items-center md:items-start gap-4.25">
              <h3 className="hidden md:block font-semibold text-[14px] text-default-dark">
                Sosial Media
              </h3>
              <div className="flex justify-center md:justify-start gap-2.75">
                {iconSosmedData.map((sosmed) => (
                  <Link
                    key={sosmed.name}
                    href={sosmed.href}
                    aria-label={sosmed.name}
                    className="text-default-dark/80 hover:text-primary-500"
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

      <div className="border-t border-default-dark/50 text-center py-2.75 text-default-dark text-[10px] hover:underline hover:underline-offset-4 font-bold">
        <Link href="https://linktr.ee/pitsos25">
          Made with ❤️ by PIT SOS 2026
        </Link>
      </div>
    </footer>
  );
};
